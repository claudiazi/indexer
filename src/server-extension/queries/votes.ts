export const totalVotes = `SELECT 
                COUNT(*) as total, decision
            FROM vote
            WHERE referendum_id = $1
            GROUP BY decision`