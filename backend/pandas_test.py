import pandas as pd
import json
import team

teams_in_tournament = []

stages_k = {
"Groups" : 16,
"knockouts" : 8, 
"Regular Season" : 32, 
"Playoffs" : 100, 
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

    to_df = pd.DataFrame(tournaments_data)
    filtered_tournament = to_df[to_df["slug"] == tournament]
    ##print(filtered_tournament)
    for stage in filtered_tournament["stages"]:
        stage = pd.DataFrame(stage)
        for section in stage["sections"]:
            section = pd.DataFrame(section)
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
                        b = get_team(blue_team["id"])
                        blue_team_name = b["name"]
                        if not any (d['team_name'] == b["name"] for d in teams_in_tournament):
                            teams_in_tournament.append({
                                "id" : b["team_id"],
                                "team_name" : b["name"],
                                "rank" : 0,
                                "region" : None,
                                "elo" : 1000
                            })

                        
                        r = get_team(red_team["id"])
                        red_team_name = r["name"]
                        if not any (d['team_name'] == r["name"] for d in teams_in_tournament):
                            teams_in_tournament.append({
                                "id" : r["team_id"],
                                "team_name" : r["name"],
                                "rank" : 0,
                                "region" : None,
                                "elo" : 1000
                            })

                        ## Blue Team wins
                        if (team[0]["result"]["outcome"] == "win"):
                            # res = next(t for t in teams_in_tournament if t["team_name"] == blue_team_name)["elo"]
                            # print (res)
                            blue_new_elo = calculate_elo_rating(
                                next(t for t in teams_in_tournament if t["team_name"] == blue_team_name)["elo"],
                                next(t for t in teams_in_tournament if t["team_name"] == red_team_name)["elo"], 1, k)
                            red_new_elo = calculate_elo_rating(
                                next(t for t in teams_in_tournament if t["team_name"] == red_team_name)["elo"],
                                next(t for t in teams_in_tournament if t["team_name"] == blue_team_name)["elo"], 0, k)
                            # teams_in_tournament[blue_team_name] = blue_new_elo
                            for t in teams_in_tournament:
                                if t["team_name"] == blue_team_name:
                                    t["elo"] = blue_new_elo
                                elif t["team_name"] == red_team_name:
                                    t["elo"] = red_new_elo

    sorted_teams = sorted(teams_in_tournament, key=lambda x: x['elo'], reverse=True)
    for index, team_data in enumerate(sorted_teams, start=1):
        team_data['rank'] = index
    to_json = json.dumps(sorted_teams)
    print(to_json)

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


tournament_rankings("lcs_spring_2023")
