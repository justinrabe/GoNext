def calculate_elo_rating(team1_elo, team2_elo, outcome):
    k = 32  # Elo update factor, can be adjusted
    expected_team1 = 1 / (1 + 10**((team2_elo - team1_elo) / 400))
    expected_team2 = 1 / (1 + 10**((team1_elo - team2_elo) / 400))
    
    if outcome == 'win':
        new_team1_elo = team1_elo + k * (1 - expected_team1)
        new_team2_elo = team2_elo + k * (0 - expected_team2)
    elif outcome == 'loss':
        new_team1_elo = team1_elo + k * (0 - expected_team1)
        new_team2_elo = team2_elo + k * (1 - expected_team2)
    
    return new_team1_elo, new_team2_elo

if __name__ == '__main__':

    print(calculate_elo_rating(1000,1000, 'win'))
    print('debug')