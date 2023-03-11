export const gov2referendumVotes = `
            WITH
            
            refined_votes AS (

              SELECT 
                referendum_index
              , voter
              , timestamp::timestamp AS timestamp
              , CASE WHEN lock_period = 0 THEN 0.1
                     ELSE lock_period 
                END AS conviction
              , decision
              , CASE WHEN decision = 'abstain' THEN COALESCE((balance ->> 'aye')::decimal(38,0) / 1000000000000, 0) + COALESCE((balance ->> 'nay')::decimal(38,0) / 1000000000000, 0)
                    ELSE COALESCE((balance ->> 'value')::decimal(38,0) / 1000000000000, 0)
                END AS balance_value
              , timestamp_removed
              FROM conviction_vote AS v     
              WHERE referendum_index = $1

            ),

            unions AS (

              SELECT 
                referendum_index
              , voter
              , 'aye' AS decision
              , timestamp
              , (CASE WHEN decision = 'abstain' THEN balance_value / 2
                      ELSE balance_value END) * conviction 
                AS voted_amount_with_conviction
              , 0 AS is_removed
              FROM refined_votes
              WHERE decision IN ('yes', 'abstain')

              UNION ALL

              SELECT 
                referendum_index
              , voter
              , 'aye' AS decision
              , timestamp_removed as timestamp
              , - (CASE WHEN decision = 'abstain' THEN balance_value / 2
                     ELSE balance_value END) * conviction 
                AS voted_amount_with_conviction
              , 1 AS is_removed
              FROM refined_votes
              WHERE decision IN ('yes', 'abstain')
                AND timestamp_removed IS NOT NULL

              UNION ALL

              SELECT 
              referendum_index
              , voter
              , 'nay' AS decision
              , timestamp
              , (CASE WHEN decision = 'abstain' THEN balance_value / 2
                  ELSE balance_value END) * conviction 
                AS voted_amount_with_conviction
              , 0 AS is_removed
              FROM refined_votes
              WHERE decision in ('no', 'abstain')

              UNION ALL

              SELECT 
                referendum_index
              , voter
              , 'nay' AS decision
              , timestamp_removed as timestamp
              , - (CASE WHEN decision = 'abstain' THEN balance_value / 2
                    ELSE balance_value END) * conviction 
                AS voted_amount_with_conviction
              , 1 AS is_removed
              FROM refined_votes
              WHERE decision IN ('no', 'abstain')
                AND timestamp_removed IS NOT NULL

            )

            SELECT 
              referendum_index
            , voter
            , decision
            , timestamp
            , SUM(CASE WHEN decision = 'aye' 
                       THEN voted_amount_with_conviction
                            ELSE 0 END) OVER (PARTITION BY referendum_index
                                              ORDER BY timestamp, is_removed) 
              AS cum_voted_amount_with_conviction_aye
            , SUM(CASE WHEN decision = 'nay' 
                       THEN voted_amount_with_conviction
                            ELSE 0 END) OVER (PARTITION BY referendum_index
                                              ORDER BY timestamp, is_removed) 
              AS cum_voted_amount_with_conviction_nay
            FROM unions

`
