export const referendaStats = `
            WITH 

            referendum_data AS (

              SELECT
                index AS referendum_index
              , preimage_id
              , index
              , status
              , created_at::timestamp AS created_at
              , ended_at::timestamp AS ended_at
              , DATE_PART('day', ended_at::timestamp - created_at::timestamp) + 
                DATE_PART('hour', ended_at::timestamp - created_at::timestamp) / 24 AS vote_duration
              , total_issuance::decimal(38,0) / 1000000000000 AS total_issuance
              , (threshold ->> 'type') AS threshold_type
              FROM referendum
              WHERE NOT (index::text = ANY ($1) )

            ),

            referendum_timeline_flatten AS (

              SELECT
                index AS referendum_index
              , (status_history_flatten ->> 'status')::text AS status
              , (status_history_flatten ->> 'timestamp')::timestamp AS timestamp
              FROM referendum, 
              jsonb_array_elements(status_history) AS status_history_flatten
              WHERE NOT (index::text = ANY ($1) )

            ),

            timeline_executed AS (

              SELECT 
                referendum_index
              , timestamp as executed_at
              FROM referendum_timeline_flatten
              WHERE status = 'Executed'
            
            ), 

            timeline_passed AS (

              SELECT 
                referendum_index
              , timestamp as passed_at
              FROM referendum_timeline_flatten
              WHERE status = 'Passed'
            
            ), 

            timeline_not_passed AS (

              SELECT 
                referendum_index
              , timestamp as not_passed_at
              FROM referendum_timeline_flatten
              WHERE status = 'NotPassed'
            
            ), 

            timeline_cancelled AS (

              SELECT 
                referendum_index
              , timestamp as cancelled_at
              FROM referendum_timeline_flatten
              WHERE status = 'Cancelled'
            
            ), 

            refined_timeline AS (

              SELECT * 
              FROM timeline_executed
              FULL OUTER JOIN timeline_passed
                USING (referendum_index)
              FULL OUTER JOIN timeline_not_passed
                USING (referendum_index)
              FULL OUTER JOIN timeline_cancelled
                USING (referendum_index)

            ),

            refined_referendum AS (
              
              SELECT *
              , vote_duration / 4 As vote_duration_1_4
              , vote_duration / 2 As vote_duration_1_2
              , vote_duration * 3 / 4 As vote_duration_3_4
              FROM referendum_data

            ),

            vote_sequence AS (

              SELECT 
                *
              , ROW_NUMBER() OVER (PARTITION BY referendum_index, voter ORDER BY timestamp desc) as seq
              FROM vote
              WHERE NOT (referendum_index::text = ANY ($1) )

            ),

            valid_vote AS (

              SELECT 
                voter
              , referendum_index
              , decision
              , CASE WHEN lock_period = 0 THEN 0.1
                     WHEN lock_period = 4 THEN 3
                     WHEN lock_period = 8 THEN 4
                     WHEN lock_period = 16 THEN 5
                     WHEN lock_period = 32 THEN 6
                     ELSE lock_period 
                END AS conviction
              , (balance ->> 'value')::bigint AS balance_value
              , (balance ->> 'aye')::bigint AS balance_aye
              , (balance ->> 'nay')::bigint AS balance_nay
              , DATE_PART('day', v.timestamp - r.created_at) + 
                DATE_PART('hour', v.timestamp - r.created_at) / 24 As voting_time
              , v.timestamp
              FROM vote_sequence AS v
              LEFT JOIN refined_referendum AS r
                USING(referendum_index)
              WHERE seq = 1

            ),

            ref_seq AS (

              SELECT
                voter
              , referendum_index
              , ROW_NUMBER() OVER (PARTITION BY voter order by timestamp) as referendum_seq
              FROM valid_vote

            ),

            new_ref AS (

              SELECT 
                voter
              , referendum_index
              from ref_seq
              where referendum_seq = 1

            ),

            refined_votes AS (

              SELECT 
                v.referendum_index
              , voter
              , decision
              , CASE WHEN v.referendum_index = n.referendum_index THEN 1
                     ELSE 0 
                END AS is_new_account
              , conviction
              , balance_value
              , balance_aye
              , balance_nay
              , CASE WHEN voting_time < vote_duration_1_4 
                          THEN '0/4 - 1/4 vote duration'
                     WHEN voting_time >= vote_duration_1_4 AND voting_time < vote_duration_1_2 
                          THEN '1/4 - 1/2 vote duration'
                     WHEN voting_time >= vote_duration_1_2 AND voting_time < vote_duration_3_4 
                          THEN '1/2 - 3/4 vote duration'       
                     WHEN voting_time >= vote_duration_3_4
                          THEN '3/4 - 4/4 vote duration'    
                END AS voting_time_group
              FROM valid_vote AS v     
              LEFT JOIN new_ref AS n
                USING (voter)
              LEFT JOIN refined_referendum as r
                ON v.referendum_index = r.referendum_index

            ),

            pre_calculation AS (

              SELECT 
                referendum_index
              , decision
              , COUNT(*) AS count
              , SUM(CASE WHEN decision = 'yes' THEN COALESCE(balance_value / 1000000000000, 0) + COALESCE(balance_aye / 1000000000000, 0)
                         ELSE  COALESCE(balance_value / 1000000000000, 0) + COALESCE(balance_nay / 1000000000000, 0) END)
                AS voted_amount
              , AVG(conviction) AS conviction_mean
              , PERCENTILE_DISC(0.5) WITHIN GROUP (ORDER BY conviction DESC) AS conviction_median
              FROM refined_votes
              group by 1, 2

            ),
            
            aye_calculation AS (
            
              SELECT 
                referendum_index
              , SUM(count) AS count_aye
              , SUM(voted_amount) AS voted_amount_aye
              , SUM(conviction_mean) AS conviction_mean_aye
              , SUM(conviction_median) AS conviction_median_aye
              FROM pre_calculation
              WHERE decision in ('yes', 'abstain')
              GROUP BY 1
            
            ),

            nay_calculation AS (

              SELECT 
                referendum_index
              , SUM(count) AS count_nay
              , SUM(voted_amount) AS voted_amount_nay
              , SUM(conviction_mean) AS conviction_mean_nay
              , SUM(conviction_median) AS conviction_median_nay
              FROM pre_calculation
              WHERE decision in ('no', 'abstain')
              GROUP BY 1

            ),

            voting_time_groups AS (

              SELECT
                referendum_index
              , SUM(CASE WHEN voting_time_group = '0/4 - 1/4 vote duration' THEN
                         CASE WHEN decision = 'abstain' THEN 2
                              ELSE 1 END
                    ELSE 0 END) AS count_0_4_1_4_vote_duration
              , SUM(CASE WHEN voting_time_group = '1/4 - 1/2 vote duration' THEN
                         CASE WHEN decision = 'abstain' THEN 2
                              ELSE 1 END
                    ELSE 0 END) AS count_1_4_2_4_vote_duration              
               , SUM(CASE WHEN voting_time_group = '1/2 - 3/4 vote duration' THEN
                          CASE WHEN decision = 'abstain' THEN 2
                               ELSE 1 END
                          ELSE 0 END) AS count_2_4_3_4_vote_duration              
                , SUM(CASE WHEN voting_time_group = '3/4 - 4/4 vote duration' THEN
                           CASE WHEN decision = 'abstain' THEN 2
                                ELSE 1 END
                      ELSE 0 END) AS count_3_4_4_4_vote_duration
              FROM refined_votes
              GROUP BY 1

            ),

            total_calculation AS (

              SELECT 
                referendum_index
              , AVG(conviction) AS conviction_mean
              , PERCENTILE_DISC(0.5) WITHIN GROUP (ORDER BY conviction DESC) AS conviction_median
              , SUM(is_new_account) AS count_new
              FROM refined_votes
              group by 1

            ),

            calculation AS (

              SELECT 
                referendum_index
              , COALESCE(count_aye, 0) AS count_aye
              , COALESCE(count_nay, 0) AS count_nay
              , COALESCE(voted_amount_aye, 0) AS voted_amount_aye
              , COALESCE(voted_amount_nay, 0) AS voted_amount_nay
              , COALESCE(conviction_mean_aye, 0) AS conviction_mean_aye
              , COALESCE(conviction_mean_nay, 0) AS conviction_mean_nay
              , COALESCE(conviction_mean, 0) AS conviction_mean
              , COALESCE(conviction_median_aye, 0) AS conviction_median_aye
              , COALESCE(conviction_median_nay, 0) AS conviction_median_nay
              , COALESCE(conviction_median, 0) AS conviction_median
              , count_new
              , COALESCE(count_0_4_1_4_vote_duration, 0) AS count_0_4_1_4_vote_duration
              , COALESCE(count_1_4_2_4_vote_duration, 0) AS count_1_4_2_4_vote_duration
              , COALESCE(count_2_4_3_4_vote_duration, 0) AS count_2_4_3_4_vote_duration
              , COALESCE(count_3_4_4_4_vote_duration, 0) AS count_3_4_4_4_vote_duration
              FROM aye_calculation
              FULL OUTER JOIN nay_calculation
                USING (referendum_index)
              FULL OUTER JOIN total_calculation
                USING (referendum_index)
              FULL OUTER JOIN voting_time_groups
                USING (referendum_index)


            ),

            refined_preimage AS (

              SELECT 
                id AS preimage_id
              , proposer
              , proposed_call ->> 'method' AS method
              , proposed_call ->> 'section' AS section
              FROM preimage
            ),

            final AS (

              SELECT 
                c.referendum_index
              , index
              , r.created_at
              , r.ended_at
              , r.status
              , proposer
              , method
              , section
              , count_aye
              , count_nay
              , count_aye + count_nay AS count_total
              , voted_amount_aye
              , voted_amount_nay
              , voted_amount_aye + voted_amount_nay AS voted_amount_total
              , total_issuance::decimal(38,0) AS total_issuance
              , total_issuance
              , COALESCE(voted_amount_aye / total_issuance * 100, 0) AS turnout_aye_perc
              , COALESCE(voted_amount_nay / total_issuance * 100, 0) AS turnout_nay_perc
              , COALESCE((voted_amount_aye + voted_amount_nay) / total_issuance * 100, 0) AS turnout_total_perc
              , count_new
              , count_new / (count_aye + count_nay) * 100 as count_new_perc
              , vote_duration
              , conviction_mean_aye
              , conviction_mean_nay
              , conviction_mean
              , conviction_median_aye
              , conviction_median_nay
              , conviction_median
              , count_0_4_1_4_vote_duration
              , count_1_4_2_4_vote_duration
              , count_2_4_3_4_vote_duration
              , count_3_4_4_4_vote_duration
              , count_0_4_1_4_vote_duration / (count_aye + count_nay) * 100 AS count_0_4_1_4_vote_duration_perc
              , count_1_4_2_4_vote_duration / (count_aye + count_nay) * 100 AS count_1_4_2_4_vote_duration_perc
              , count_2_4_3_4_vote_duration / (count_aye + count_nay) * 100 AS count_2_4_3_4_vote_duration_perc
              , count_3_4_4_4_vote_duration / (count_aye + count_nay) * 100 AS count_3_4_4_4_vote_duration_perc
              , executed_at
              , passed_at
              , not_passed_at
              , cancelled_at
              , threshold_type
              FROM calculation AS c
              INNER JOIN refined_referendum AS r
                ON c.referendum_index = r.referendum_index
              LEFT JOIN  refined_timeline AS t
                ON t.referendum_index = c.referendum_index
              LEFT JOIN refined_preimage AS p
                ON p.preimage_id = r.preimage_id
              
              )

              select * from final
            `
          