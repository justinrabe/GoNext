
WITH dataset AS (
    SELECT 
        teamers.id AS team_id,
        teamers.side,
        teamers.result
    FROM tournaments, 
    UNNEST(stages) t (stagers), 
    UNNEST(stagers.sections) u (sec),
    UNNEST(sec.matches) m (matchers),
    UNNEST(matchers.games) g (gamers),
    UNNEST(gamers.teams) te (teamers)
    WHERE tournaments.slug = 'msi_2023'
    
    LIMIT 10
)
SELECT 
t.name,
d.side,
d.result
FROM 
dataset d
JOIN teams t 
   ON d.team_id = t.team_id 

