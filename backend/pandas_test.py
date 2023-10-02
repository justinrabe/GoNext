import pandas as pd
import json

def tournament_rankings(tournament):
    with open("esports-data/tournaments.json", "r") as json_file:
        tournaments_data = json.load(json_file)
    to_df = pd.DataFrame(tournaments_data)
    filtered_tournament = to_df[to_df["slug"] == tournament]
    print(filtered_tournament)
        # for stage in tournament["stages"]:
        #     for section in stage["sections"]:
        #         for match in section["matches"]:
        #             for game in match["games"]:
        #                 if game["state"] == "completed":
        #                     try:
        #                         platform_game_id = mappings[game["id"]]["platformGameId"]
        #                     except KeyError:
        #                         print(f"{platform_game_id} {game['id']} not found in the mapping table")
        #                         continue
        #                     game_counter += 1

tournament_rankings("lec_season_finals_2023")