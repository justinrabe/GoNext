import pandas as pd
import json
import team

teams_in_tournament = {}

stages_k = {
"Groups" : 16,
"knockouts" : 8, 
"Regular Season" : 16, 
"Playoffs" : 32, 
"Regional Finals" : 32, 
"Round 1" : 4, 
"Round 2" : 8, 
"Knockouts" : 4, 
"promotion" : 2, 
"Regional Qualifier" : 2, 
"Play In Groups" : 8, 
"Play In Knockouts" : 8, 
"Promotion Series" : 2, 
"regional_qualifier" : 2, 
"Bracket Stage" : 8, 
"play_in_knockouts" : 8,
"east" : 2, 
"west" : 2
}

with open("esports-data/teams.json", "r") as json_file:
        teams_data = json.load(json_file)

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
    ##print(filtered_tournament)
    for stage in filtered_tournament["stages"]:
        stage = pd.DataFrame(stage)
        # print(stage["name"])
        # print()
        # print(stage["name"][0])
        # k = stages_k["Regular Season"]
        # print(k)
        for section in stage["sections"]:
            
            # print(type(section))
            section = pd.DataFrame(section)
            # print(section)
            for match in section["matches"]:
                match = pd.DataFrame(match)
                for game in match["games"]:
                    game = pd.DataFrame(game)
                    k = stages_k[section["name"].to_string(index=False)]
                    blue_team = None
                    red_team = None
                    for team in game["teams"]:
                        blue_team = team[0]
                        red_team = team[1]
                        
                        ##team creation
                        blue_team_name = get_team(blue_team["id"])["name"]
                        if blue_team_name not in teams_in_tournament:
                            teams_in_tournament[blue_team_name] = 1000

                        red_team_name = get_team(red_team["id"])["name"]
                        if red_team_name not in teams_in_tournament:
                            teams_in_tournament[red_team_name] = 1000

                        ## Blue Team wins
                        if (team[0]["result"]["outcome"] == "win"):
                            blue_new_elo = calculate_elo_rating(teams_in_tournament[blue_team_name], teams_in_tournament[red_team_name], 1, k)
                            red_new_elo = calculate_elo_rating(teams_in_tournament[red_team_name], teams_in_tournament[blue_team_name], 0, k)
                            teams_in_tournament[blue_team_name] = blue_new_elo
                            teams_in_tournament[red_team_name] = red_new_elo
                        ## Red Team wins
                        elif (team[0]["result"]["outcome"] == "lose"):
                            blue_new_elo = calculate_elo_rating(teams_in_tournament[blue_team_name], teams_in_tournament[red_team_name], 0, k)
                            red_new_elo = calculate_elo_rating(teams_in_tournament[red_team_name], teams_in_tournament[blue_team_name], 1, k)
                            teams_in_tournament[blue_team_name] = blue_new_elo
                            teams_in_tournament[red_team_name] = red_new_elo

                            ##elo rating formula
                            ##save elo to elo data structure
                            ##to-do create elo data structure from all teams
    # [print(i) for i in teams_in_tournament]
    print (teams_in_tournament)

def get_team(id):
    output = [t for t in teams_data if t['team_id'] == str(id)]
    return output[0]
                         
def calculate_elo_rating(player_rating, opponent_rating, outcome, k=32):
    """
    Calculate the new Elo rating for a player.

    :param player_rating: The current Elo rating of the player.
    :param opponent_rating: The Elo rating of the opponent.
    :param outcome: 1.0 for a win, 0.5 for a draw, and 0.0 for a loss.
    :param k: The K-factor, which determines the impact of the game result (default is 32).
    :return: The new Elo rating for the player.
    """
    expected_outcome = 1 / (1 + 10**((opponent_rating - player_rating) / 400))
    new_rating = player_rating + k * (outcome - expected_outcome)
    return new_rating


tournament_rankings("lck_spring_2023")