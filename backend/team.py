class Team:
    def __init__(self, team_id, name, region):
        self.team_id = team_id
        self.name = name
        self.region = region
        self.elo = 1000 ## everyone starts out with 1000 elo
        