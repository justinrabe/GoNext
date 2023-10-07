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

with open("esports-data/tournaments.json", "r") as json_file:
        tournaments_data = json.load(json_file)

with open("esports-data/teams.json", "r") as json_file:
        teams_data = json.load(json_file)

with open("esports-data/leagues.json", "r") as json_file:
        leagues_data = json.load(json_file)

def tournament_rankings(tournament):
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
                            add_new_team(b)
                        r = get_team(red_team["id"])
                        red_team_name = r["name"]
                        if not any (d['team_name'] == r["name"] for d in teams_in_tournament):
                            add_new_team(r)

                        if (team[0]["result"]["outcome"] == "win"):
                            blue_new_elo = calculate_elo_rating(
                                next(t for t in teams_in_tournament if t["team_name"] == blue_team_name)["elo"],
                                next(t for t in teams_in_tournament if t["team_name"] == red_team_name)["elo"], 1, k)
                            red_new_elo = calculate_elo_rating(
                                next(t for t in teams_in_tournament if t["team_name"] == red_team_name)["elo"],
                                next(t for t in teams_in_tournament if t["team_name"] == blue_team_name)["elo"], 0, k)
                           
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

def clean_tournaments():
    for tournament in tournaments_data:
       start_date = tournament.get("startDate", "")
       if start_date.startswith(str(year)):
           for stage in tournament["stages"]:
               for section in stage["sections"]:
                   for match in section["matches"]:
                       for game in match["games"]:
                           if game["state"] == "completed":
                               


def get_team(id):
    output = [t for t in teams_data if t['team_id'] == str(id)]
    return output[0]
    
def get_major_regions():
    output = [t for t in leagues_data if (t['name'] == 'LCS' or t['name'] == 'LEC' or t['name'] == 'LCK' or t['name'] == 'LPL')]
    for item in output:  # my_list if the list that you have in your question
        del item['slug']
        del item['sport']
        del item['image']
        del item['lightImage']
        del item['tournaments']
        del item['darkImage']
        del item['displayPriority']
    to_json = json.dumps(output)
    return to_json

def add_new_team(t):
    teams_in_tournament.append({
                                "id" : t["team_id"],
                                "team_name" : t["name"],
                                "rank" : 0,
                                "region" : None,
                                "elo" : 1000
                            })

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


##tournament_rankings("lcs_summer_2023")
print(get_major_regions())
