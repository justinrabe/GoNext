import boto3
import pandas
import numpy
import os
def connect_to_athena(region_name, aws_access_key_id, aws_secret_access_key, aws_session_token=None):

    session = boto3.Session(
        aws_access_key_id=aws_access_key_id,
        aws_secret_access_key=aws_secret_access_key,
        aws_session_token=aws_session_token,
        region_name=region_name
    )

    athena = session.client('athena')
    return athena


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
    region_name = 'us-west-1'
    aws_access_key_id = os.environ["ACCESS_KEY"]
    aws_secret_access_key = os.environ["SECRET_ACCESS_KEY"]
    database = 'lol'
    print(calculate_elo_rating(1000,1000, 'win'))
    athena = connect_to_athena(region_name, aws_access_key_id, aws_secret_access_key)
    print(athena.)

## Every team starts at a base elo of 1000
## for each game in tournament, call calculate_elo_rating. save both teams elo and store a concurrently updating list of teams and elos.
## Once the loop per tournament is finished, return the list of teams and elos, ordered by elo.
