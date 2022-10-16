export const accountStats = `
            WITH
            
            vote_sequence AS (

              SELECT 
                *
              , ROW_NUMBER() OVER (PARTITION BY referendum_index, voter ORDER BY timestamp desc) as seq
              FROM vote
              WHERE voter = $1

            ),

            valid_vote AS (

              SELECT 
                *
              FROM vote_sequence
              WHERE seq = 1

            ),

            ref_seq AS (

              SELECT
                voter
              , referendum_index
              , timestamp::timestamp AS timestamp
              , ROW_NUMBER() OVER (PARTITION BY voter order by timestamp) as referendum_seq
              FROM vote_sequence

            ),

            new_ref AS (

                SELECT 
                  voter
                , referendum_index
                , timestamp
                from ref_seq
                where referendum_seq = 1
  
            ),

            referendum_data AS (

              SELECT 
                referendum_index
              , CASE WHEN status in ('Passed', 'Executed') THEN 'aye'
                     WHEN status in ('NotPassed') THEN 'nay'
                END AS referendum_result
              , created_at::timestamp AS created_at
              , DATE_PART('day', r.ended_at - r.created_at) + 
                DATE_PART('hour', r.ended_at - r.created_at) / 24 As vote_duration
              FROM referendum AS r
              INNER JOIN valid_vote AS v
                ON v.referendum_index = r.index
              WHERE status IN ('Passed', 'Executed', 'NotPassed')

            ),

            refined_referendum AS (

              SELECT 
                referendum_index
              , referendum_result
              , created_at
              , vote_duration / 4 As vote_duration_1_4
              , vote_duration / 2 As vote_duration_1_2
              , vote_duration * 3 / 4 As vote_duration_3_4
              , vote_duration
              FROM referendum_data

            ),

            refined_votes AS (

                SELECT 
                  v.referendum_index
                , v.voter
                , CASE WHEN decision = 'yes' THEN 'aye'
                       WHEN decision = 'no' THEN 'nay'
                       ELSE decision
                  END AS decision
                , n.referendum_index AS first_referendum_index
                , n.timestamp AS first_voting_timestamp
                , CASE WHEN lock_period = 0 THEN 0.1
                    WHEN lock_period = 4 THEN 3
                    WHEN lock_period = 8 THEN 4
                    WHEN lock_period = 16 THEN 5
                    WHEN lock_period = 32 THEN 6
                    ELSE lock_period 
                END AS conviction
                , CASE WHEN decision = 'abstain' THEN COALESCE((balance ->> 'aye')::decimal(38,0) / 1000000000000, 0) + COALESCE((balance ->> 'nay')::decimal(38,0) / 1000000000000, 0)
                       ELSE COALESCE((balance ->> 'value')::decimal(38,0) / 1000000000000, 0)
                  END AS balance_value
                , DATE_PART('day', v.timestamp - r.created_at) + 
                  DATE_PART('hour', v.timestamp - r.created_at) / 24 As voting_time
                , vote_duration_1_4
                , vote_duration_1_2
                , vote_duration_3_4
                , vote_duration
                , referendum_result
                FROM valid_vote AS v
                LEFT JOIN refined_referendum AS r
                    ON v.referendum_index = r.referendum_index         
                LEFT JOIN new_ref as n
                    ON v.voter = n.voter

            ),

            latest_quiz_version AS (
                        
              SELECT 
                id
              , min(timestamp)  as quizze_created_at
              , max(version) AS version
              FROM quiz
              GROUP BY 1

            ),

            latest_quiz_data AS (

              SELECT 
                id as quiz_id
              , creator as quiz_creator
              , referendum_index
              , quizze_created_at
              , version AS latest_version
              FROM quiz
              INNER JOIN latest_quiz_version
                USING(id, version)

            ),

            quiz_questions AS (
              
              SELECT 
                quiz_id
              , q.id as question_id
              , c.correct_index AS correct_answer_index
              , COUNT(q.id) OVER (PARTITION BY quiz_id) AS questions_count
              FROM question AS q
              INNER JOIN latest_quiz_data AS l
                USING (quiz_id)
              INNER JOIN correct_answer AS c
                ON c.question_id = q.id

            ),

            latest_answers AS (

              SELECT
                  wallet
                , quiz_id
                , max(version) AS version
              FROM quiz_submission
              GROUP BY 1,2

            ),

            account_answers AS (

              SELECT 
                wallet
              , referendum_index
              , timestamp AS answer_submitted_at
              , s.quiz_id
              , q.question_id AS question_id
              , CASE WHEN answer_index = correct_answer_index then 1
                      ELSE 0 
                END AS has_answered_correct
              , questions_count
              FROM quiz_submission AS s
              INNER JOIN latest_answers
                USING (wallet, quiz_id, version)
              INNER JOIN quiz_questions AS q
                ON s.quiz_id = q.quiz_id
              INNER JOIN answer AS a
                ON a.quiz_submission_id = s.id
                AND a.question_id = q.question_id
                
            ),

            account_correct_answers AS (

              SELECT 
                wallet
              , quiz_id
              , referendum_index
              , questions_count
              , SUM(has_answered_correct) AS correct_answers_count
              FROM account_answers
              GROUP BY 1,2,3,4

            ),

            final AS (

              SELECT 
                v.referendum_index
              , voter
              , first_referendum_index
              , first_voting_timestamp
              , conviction
              , decision
              , balance_value
              , conviction * balance_value AS voted_amount_with_conviction
              , CASE WHEN voting_time < vote_duration_1_4 
                          THEN '0/4 - 1/4 vote duration'
                    WHEN voting_time >= vote_duration_1_4 AND voting_time < vote_duration_1_2 
                          THEN '1/4 - 1/2 vote duration'
                    WHEN voting_time >= vote_duration_1_2 AND voting_time < vote_duration_3_4 
                          THEN '1/2 - 3/4 vote duration'       
                    WHEN voting_time >= vote_duration_3_4
                          THEN '3/4 - 4/4 vote duration'    
                END AS voting_time_group
              , CASE WHEN  decision =  referendum_result THEN 'aligned'
                    ELSE 'not aligned'
                END AS voting_result_group
              , questions_count
              , correct_answers_count
              , CASE WHEN questions_count is not null THEN
                     CASE WHEN correct_answers_count = questions_count THEN 1
                          ELSE 0
                     END
                END AS quiz_fully_correct                    
              FROM refined_votes AS v
              LEFT JOIN account_correct_answers AS ca
                ON voter = wallet 
                AND ca.referendum_index = v.referendum_index

            )

            SELECT * FROM final

`


