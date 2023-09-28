

SELECT tournaments.slug, 
stagers.name, 
stagers.slug, 
sec.name, 
matchers.id,
stagers.sections
FROM tournaments, 
UNNEST(stages) t (stagers), 
UNNEST(stagers.sections) u (sec),
UNNEST(sec.matches) m (matchers)

WHERE tournaments.slug = 'msi_2023'
LIMIT 10
