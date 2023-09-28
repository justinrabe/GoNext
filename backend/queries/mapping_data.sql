SELECT wt.name AS "Winning Team"
, lt.name AS "Losing Team"
,md.esportsgameid
,md.platformgameid
FROM mapping_data md
JOIN teams wt 
    ON md.teammapping."200" = wt.team_id
JOIN teams lt
    on md.teammapping."100" = lt.team_id
WHERE wt.name = 'Cloud9'
LIMIT 10