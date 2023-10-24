# GoNext
Go Next is a cloud-based League of Legends eSports Ranking platform.  Dive into the power rankings from various tournaments and witness how the best teams from around the world stack up on the leaderboard. Customize your viewing experience by hand-picking teams for side-by-side comparisons. 

# Backend
The Backend folder houses the Python application that generates and analyzes the eSports data and curates everything into definitive power rankings. We first had to extract the data from the Riot-provided source, and clean it all with AWS Glue. We performed some intial analysis with AWS Athena rankings.py houses the ELO algorithm that runs against the different teams and tournaments in the dataset. We then upload the data to S3 so that it is visible to our Frontend webapp through AWS API Gateway. 
