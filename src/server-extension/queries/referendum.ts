export const referendumStats = `
            WITH 

            ref_seq AS (

              SELECT
                voter
              , referendum_id
              , ROW_NUMBER() OVER (PARTITION BY referendum_id, voter order by timestamp) as referendum_seq
              FROM vote
              WHERE NOT (referendum_id = ANY ($1) )

            ),

            new_ref AS (

              SELECT 
                voter
              , referendum_id
              from ref_seq
              where referendum_seq = 1

            ),

            refined_votes AS (

              SELECT 
                v.referendum_id
              , voter
              , decision
              , CASE WHEN v.referendum_id = n.referendum_id THEN 1
                     ELSE 0 
                END AS is_new_account
              , CASE WHEN lock_period = 0 THEN 0.1
                     WHEN lock_period = 4 THEN 3
                     WHEN lock_period = 8 THEN 4
                     WHEN lock_period = 16 THEN 5
                     WHEN lock_period = 32 THEN 6
                     ELSE lock_period 
                END AS conviction
              , (balance ->> 'value')::bigint as balance_value
              , (balance ->> 'aye')::bigint as balance_aye
              , (balance ->> 'nay')::bigint as balance_nay
              , ROW_NUMBER() OVER (PARTITION BY v.referendum_id, voter order by timestamp desc) as seq
              FROM vote as v              
              LEFT JOIN new_ref as n
                USING (voter)
              WHERE NOT (v.referendum_id = ANY ($1) )

            ),

            pre_calculation AS (

              SELECT 
                referendum_id
              , decision
              , COUNT(*) AS count
              , SUM(CASE WHEN decision = 'yes' THEN COALESCE(balance_value / 1000000000000, 0) + COALESCE(balance_aye / 1000000000000, 0)
                         ELSE  COALESCE(balance_value / 1000000000000, 0) + COALESCE(balance_nay / 1000000000000, 0) END)
                AS voted_amount
              , AVG(conviction) AS conviction_mean
              , PERCENTILE_DISC(0.5) WITHIN GROUP (ORDER BY conviction DESC) AS conviction_median
              FROM refined_votes
              WHERE seq = 1
              group by 1, 2

            ),
            
            aye_calculation AS (
            
              SELECT 
                referendum_id
              , count AS count_aye
              , voted_amount AS voted_amount_aye
              , conviction_mean AS conviction_mean_aye
              , conviction_median AS conviction_median_aye
              FROM pre_calculation
              WHERE decision = 'yes'
            
            ),

            nay_calculation AS (

              SELECT 
                referendum_id
              , count AS count_nay
              , voted_amount AS voted_amount_nay
              , conviction_mean AS conviction_mean_nay
              , conviction_median AS conviction_median_nay
              FROM pre_calculation
              WHERE decision = 'no'

            ),

            total_calculation AS (

              SELECT 
                referendum_id
              , AVG(conviction) AS conviction_mean
              , PERCENTILE_DISC(0.5) WITHIN GROUP (ORDER BY conviction DESC) AS conviction_median
              , SUM(is_new_account) AS count_new
              FROM refined_votes
              WHERE seq = 1
              group by 1

            ),

            calculation AS (

              SELECT 
                referendum_id
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
              FROM aye_calculation
              FULL OUTER JOIN nay_calculation
                USING (referendum_id)
              FULL OUTER JOIN total_calculation
                USING (referendum_id)


            ),

            refined_referendum AS (
              
              SELECT
                id AS referendum_id
              , preimage_id
              , index
              , status
              , created_at::timestamp AS created_at
              , ended_at::timestamp AS ended_at
              , total_issuance::decimal(38,0) / 1000000000000 AS total_issuance
              FROM referendum
              WHERE NOT (id = ANY ($1) )

            ),

            refined_preimage AS (

              SELECT 
                id AS preimage_id
              , proposer
              , proposed_call ->> 'method' AS method
              , proposed_call ->> 'section' AS section
              FROM preimage
            )

            SELECT 
              c.referendum_id
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
            , DATE_PART('day', r.ended_at - r.created_at) + 
              DATE_PART('hour', r.ended_at - r.created_at) / 24 As vote_duration
            , conviction_mean_aye
            , conviction_mean_nay
            , conviction_mean
            , conviction_median_aye
            , conviction_median_nay
            , conviction_median
            FROM calculation AS c
            INNER JOIN refined_referendum AS r
              ON c.referendum_id = r.referendum_id
            LEFT JOIN refined_preimage AS p
              ON p.preimage_id = r.preimage_id
            `
            

export const totalVotes = `
            SELECT 
              referendum_id
            , decision
            , COUNT(*) as count
            FROM vote
            GROUP BY 1,2
            ORDER BY 1`