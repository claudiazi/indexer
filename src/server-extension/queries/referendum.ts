export const referendumStats = `
            WITH
            
            vote_sequence AS (

              SELECT 
                *
              , ROW_NUMBER() OVER (PARTITION BY referendum_index, voter ORDER BY timestamp desc) as seq
              FROM vote
              WHERE referendum_index = $1

            ),

            valid_vote AS (

              SELECT 
                *
              FROM vote_sequence
              WHERE seq = 1
              AND block_number_removed IS NULL

            ),

            ref_seq AS (

              SELECT
                voter
              , referendum_index
              , ROW_NUMBER() OVER (PARTITION BY voter order by timestamp) as referendum_seq
              FROM vote_sequence

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
                , v.voter
                , decision
                , timestamp::timestamp AS timestamp
                , CASE WHEN v.referendum_index = n.referendum_index THEN 1
                       ELSE 0 
                  END AS is_new_account
                , CASE WHEN lock_period = 0 THEN 0.1
                       ELSE lock_period 
                  END AS conviction
                , CASE WHEN decision = 'abstain' THEN COALESCE((balance ->> 'aye')::decimal(38,0) / 1000000000000, 0) + COALESCE((balance ->> 'nay')::decimal(38,0) / 1000000000000, 0)
                       ELSE COALESCE((balance ->> 'value')::decimal(38,0) / 1000000000000, 0)
                  END AS balance_value
                , delegated_to
                FROM valid_vote AS v     
                LEFT JOIN new_ref as n
                    ON v.voter = n.voter

            ),

            unions AS (

              SELECT 
                referendum_index
              , voter
              , 'aye' AS decision
              , timestamp
              , is_new_account
              , (CASE WHEN decision = 'abstain' THEN balance_value / 2
                     ELSE balance_value END) * conviction 
                AS voted_amount_with_conviction
              , delegated_to
              FROM refined_votes
              WHERE decision in ('yes', 'abstain')

              UNION ALL

              SELECT 
              referendum_index
              , voter
              , 'nay' AS decision
              , timestamp
              , is_new_account
              , (CASE WHEN decision = 'abstain' THEN balance_value / 2
                  ELSE balance_value END) * conviction 
              AS voted_amount_with_conviction
              , delegated_to
              FROM refined_votes
              WHERE decision in ('no', 'abstain')

            )


            SELECT 
              referendum_index
            , voter
            , decision
            , timestamp
            , is_new_account
            , delegated_to
            , voted_amount_with_conviction
            , SUM(CASE WHEN decision = 'aye' THEN voted_amount_with_conviction
                       ELSE 0 END) OVER (PARTITION BY referendum_index
                                             ORDER BY timestamp) 
              AS cum_voted_amount_with_conviction_aye
            , SUM(CASE WHEN decision = 'nay' THEN voted_amount_with_conviction
                       ELSE 0 END) OVER (PARTITION BY referendum_index
                                             ORDER BY timestamp) 
              AS cum_voted_amount_with_conviction_nay
            , SUM(is_new_account) OVER (PARTITION BY referendum_index
                                            ORDER BY timestamp) 
              AS cum_new_accounts
            FROM unions

`
