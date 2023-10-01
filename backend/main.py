import boto3
import pandas
import numpy
import os
import team
def connect_to_athena(region_name, aws_access_key_id, aws_secret_access_key, aws_session_token=None):

    session = boto3.Session(
        aws_access_key_id=aws_access_key_id,
        aws_secret_access_key=aws_secret_access_key,
        aws_session_token=aws_session_token,
        region_name=region_name
    )

    athena = session.client('athena')
    return athena

def execute_athena_query(athena, query_string, database, output_location):
    """
    Execute an AWS Athena query.

    Parameters:
    - athena: Athena client object.
    - query_string: The SQL query to execute.
    - database: The name of the Athena database to use.
    - output_location: S3 location to store query results.

    Returns:
    - Query execution ID.
    """
    response = athena.start_query_execution(
        QueryString=query_string,
        QueryExecutionContext={'Database': database},
        ResultConfiguration={'OutputLocation': output_location}
    )

    query_execution_id = response['QueryExecutionId']
    return query_execution_id

def get_athena_query_results(athena, query_execution_id):
    """
    Get query results from AWS Athena.

    Parameters:
    - athena: Athena client object.
    - query_execution_id: Query execution ID.

    Returns:
    - Query results as a Pandas DataFrame (optional, requires 'pandas' library).
    """
    response = athena.get_query_execution(QueryExecutionId=query_execution_id)
    query_status = response['QueryExecution']['Status']['State']

    if query_status == 'SUCCEEDED':
        result_response = athena.get_query_results(QueryExecutionId=query_execution_id)
        columns = [col['Name'] for col in result_response['ResultSet']['ResultSetMetadata']['ColumnInfo']]
        rows = [row['Data'] for row in result_response['ResultSet']['Rows']]

        # Convert the results to a Pandas DataFrame (optional)
        data = [list(map(lambda x: x['VarCharValue'], row)) for row in rows[1:]]  # Skip the header row
        df = pd.DataFrame(data, columns=columns)
        return df
    else:
        raise Exception(f"Query execution failed with status: {query_status}")

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

def get_tournament_rankings(tournament):

def get_global_rankings():

def get_team_rankings();

if __name__ == '__main__':
    region_name = 'us-west-1'
    aws_access_key_id = os.environ["ACCESS_KEY"]
    aws_secret_access_key = os.environ["SECRET_ACCESS_KEY"]
    database = 'lol'
    print(calculate_elo_rating(1000,1000, 'win'))
    athena = connect_to_athena(region_name, aws_access_key_id, aws_secret_access_key)
    query_execution_id = execute_athena_query(athena, query_string, database, output_location)
    query_results = get_athena_query_results(athena, query_execution_id)


## Every team starts at a base elo of 1000
## for each game in tournament, call calculate_elo_rating. save both teams elo and store a concurrently updating list of teams and elos.
## Once the loop per tournament is finished, return the list of teams and elos, ordered by elo.
