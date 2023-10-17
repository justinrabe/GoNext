import pandas as pd
import json
import team
import team_region_map as trm

major_regions = [
{"id": "98767991299243165", "name": "LCS", "region": "NORTH AMERICA"},
{"id": "98767991310872058", "name": "LCK", "region": "KOREA"},
{"id": "98767991302996019", "name": "LEC", "region": "EMEA"},
{"id": "98767991314006698", "name": "LPL", "region": "CHINA"}
]
region_map = trm.region_map
## k weight value of a stage in a tournament
stages_k = {
    "Groups" : 16,
    "Group A\nGroup B" : 16,
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

elo_weight = {
    "LCK" : 1100,
    "LPL" : 1100,
    "LEC" : 1000,
    "LCS" : 1000,
    "LLA" : 800,
    "VCS" : 800,
    "CBLOL" : 800,
    "PCS" : 800,
    "LJL" : 800
}

with open("esports-data/tournaments.json", "r") as json_file:
        tournaments_data = json.load(json_file)

with open("esports-data/teams.json", "r") as json_file:
        teams_data = json.load(json_file)

with open("esports-data/leagues.json", "r") as json_file:
        leagues_data = json.load(json_file)

with open("esports-data/clean_tournaments.json", "r") as json_file:
        clean_tournaments_data = json.load(json_file)

def tournament_rankings(tournament, global_data):
    print (tournament)
    if global_data:
        teams_in_tournament = global_data
    else:
        teams_in_tournament = []
    to_df = pd.DataFrame(clean_tournaments_data)
    filtered_tournament = to_df[to_df["slug"] == tournament]
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
                        if b is None:
                            blue_team_name = "NoTeamFound"
                        else:
                            blue_team_name = b["name"]
                        if not any (d['team_name'] == blue_team_name for d in teams_in_tournament):
                            add_new_team(teams_in_tournament, b)

                        r = get_team(red_team["id"])
                        if r is None:
                            red_team_name = "NoTeamFound"
                        else:
                            red_team_name = r["name"]
                        if not any (d['team_name'] == red_team_name for d in teams_in_tournament):
                            add_new_team(teams_in_tournament, r)
                        if (team[0]["result"] is None):
                            continue
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
    return(to_json)

def global_rankings():
    global_data = []
    # for i in clean_tournaments_data if :
    for i in clean_tournaments_data:
        if i[]
        global_data = json.loads(tournament_rankings(i["slug"], global_data))
    return global_data



def clean_tournaments():
   
    # Extract the list of IDs from the second JSON file
    major_regions = json.loads(get_major_regions())
    print(major_regions)
    id_list = [item['id'] for item in major_regions]
    print (id_list)
    # Filter the items in the first JSON file based on the condition
    filtered_data = [item for item in tournaments_data if item['leagueId'] in id_list and item['startDate'].startswith('2023')]
    
    # Save the filtered data back to the first JSON file
    with open('esports-data/clean_tournaments.json', 'w') as file1:
        json.dump(filtered_data, file1, indent=4)
                               


def get_team(id):
    output = [t for t in teams_data if t['team_id'] == str(id)]
    if output:
        return output[0]
    else:
        return None

def add_new_team(teams, t):
   
    if not t:
        teams.append({
                                "id" : 1,
                                "team_name" : "NoTeamFound",
                                "rank" : 0,
                                "region" : region_map["NoTeamFound"],
                                "elo" : 0
                            })
    else:
        teams.append({
                                "id" : t["team_id"],
                                "team_name" : t["name"],
                                "rank" : 0,
                                "region" : region_map[t["name"]],
                                "elo" : elo_weight[region_map[t["name"]]]
                            })

def merge_teams(a, b):
    # A is team to keep, b is team to delete
    with open("sample_global_rankings.json", "r") as json_file:
        data = json.load(json_file)
    team_a = [t for t in data if t["team_name"] == a][0]
    team_b = [t for t in data if t["team_name"] == b][0]
    team_a["elo"] = team_a["elo"] if team_a["elo"] > team_b["elo"] else team_b["elo"]
    return data


def get_major_regions():
    output = [t for t in leagues_data if (t['name'] == 'LCS' or t['name'] == 'LEC' or t['name'] == 'LCK' or t['name'] == 'LPL') or t['name'] == 'MSI'] #filter out to major regions only
    for item in output:  # filter out irrelevant columns
        del item['slug']
        del item['sport']
        del item['image']
        del item['lightImage']
        del item['tournaments']
        del item['darkImage']
        del item['displayPriority']
        del item['priority']
    to_json = json.dumps(output)
    return to_json

# def filter_by_tournament_name(item):
#     tournament

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


# clean_tournaments()
print(get_major_regions())
# x = global_rankings()
# with open('sample_global_rankings.json', 'w') as file1:
#         json.dump(x, file1, indent=4)

# clg_nrg_merge = merge_teams("NRG", "CLG")

# with open('production-data/final_global_rankings.json', 'w') as file1:
#         json.dump(clg_nrg_merge, file1, indent=4)

# lcs_summer_2023 = json.loads(tournament_rankings('lcs_summer_2023', None))
# with open ('production-data/lcs_summer_2023.json', 'w') as file1:
#     json.dump(lcs_summer_2023, file1, indent=4)

# lcs_spring_2023 = json.loads(tournament_rankings('lcs_spring_2023', None))
# with open ('production-data/lcs_spring_2023.json', 'w') as file1:
#     json.dump(lcs_summer_2023, file1, indent=4)

# lec_winter_2023 = json.loads(tournament_rankings('lec_winter_2023', None))
# with open ('production-data/lec_winter_2023.json', 'w') as file1:
#     json.dump(lec_winter_2023, file1, indent=4)

# lec_spring_2023 = json.loads(tournament_rankings('lec_spring_2023', None))
# with open ('production-data/lec_spring_2023.json', 'w') as file1:
#     json.dump(lec_spring_2023, file1, indent=4)

# lec_summer_2023 = json.loads(tournament_rankings('lec_summer_2023', None))
# with open ('production-data/lec_summer_2023.json', 'w') as file1:
#     json.dump(lec_summer_2023, file1, indent=4)

# lec_season_finals_2023 = json.loads(tournament_rankings('lec_season_finals_2023', None))
# with open ('production-data/lec_season_finals_2023.json', 'w') as file1:
#     json.dump(lec_season_finals_2023, file1, indent=4)

# lck_spring_2023 = json.loads(tournament_rankings('lck_spring_2023', None))
# with open ('production-data/lck_spring_2023.json', 'w') as file1:
#     json.dump(lck_spring_2023, file1, indent=4)

# lck_summer_2023 = json.loads(tournament_rankings('lck_summer_2023', None))
# with open ('production-data/lck_summer_2023.json', 'w') as file1:
#     json.dump(lck_summer_2023, file1, indent=4)

# lck_spring_2023 = json.loads(tournament_rankings('lck_spring_2023', None))
# with open ('production-data/lck_spring_2023.json', 'w') as file1:
#     json.dump(lck_spring_2023, file1, indent=4) 

# lpl_regional_finals_2023 = json.loads(tournament_rankings('lpl_regional_finals_2023', None))
# with open ('production-data/lpl_regional_finals_2023.json', 'w') as file1:
#     json.dump(lpl_regional_finals_2023, file1, indent=4) 

# lpl_summer_2023 = json.loads(tournament_rankings('lpl_summer_2023', None))
# with open ('production-data/lpl_summer_2023.json', 'w') as file1:
#     json.dump(lpl_summer_2023, file1, indent=4) 

# msi_2023 = json.loads(tournament_rankings('msi_2023', None))
# with open ('production-data/msi_2023.json', 'w') as file1:
#     json.dump(msi_2023, file1, indent=4) 



# print(get_major_regions())
