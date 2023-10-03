import pandas as pd
import json
import team

teams_in_tournament = []

def tournament_rankings(tournament):
    with open("esports-data/tournaments.json", "r") as json_file:
        tournaments_data = json.load(json_file)
    # df = pd.json_normalize(tournaments_data,  meta=[ ['stages', 'sections', 'matches', 'teams' 'id']])
    # df = df.rename(columns={
    #     'stages.sections.matches.teams.id' : 'teamID'
    # })
    # print(list(df.columns))
    # print(df)
    to_df = pd.DataFrame(tournaments_data)
    filtered_tournament = to_df[to_df["slug"] == tournament]
    print(filtered_tournament)
    for stage in filtered_tournament["stages"]:
        stage = pd.DataFrame(stage)
        for section in stage["sections"]:
            # print(section)
            # print(type(section))
            section = pd.DataFrame(section)
            for match in section["matches"]:
                match = pd.DataFrame(match)
                for game in match["games"]:
                    game = pd.DataFrame(game)
                    ##print(game)
                    for team in game["teams"]:
                        print(team)

                            ##elo rating formula
                            ##save elo to elo data structure
                            ##to-do create elo data structure from all teams
    # [print(i) for i in teams_in_tournament]

                         

tournament_rankings("nacl_qualifiers_2_summer_2023")