# GoNext
Go Next is a cloud-based League of Legends eSports Ranking platform.  Dive into the power rankings from various tournaments and witness how the best teams from around the world stack up on the leaderboard. Customize your viewing experience by hand-picking teams for side-by-side comparisons. 

# Backend
The Backend folder houses the Python application that generates and analyzes the eSports data and curates everything into definitive power rankings. We first had to extract the data from the Riot-provided source, and clean it all with AWS Glue. We performed some intial analysis with AWS Athena rankings.py houses the ELO algorithm that runs against the different teams and tournaments in the dataset. We then upload the data to S3 so that it is visible to our Frontend webapp through AWS API Gateway. 

# Algorithm

Our ELO system excels at recognizing and rewarding teams for their significant achievements. This encompasses victories in crucial matches and triumphs over opponents expected to outperform them. Our ELO system is able to weed out teams that beat "bad" teams and rewards teams that beat "good" teams.

For every matchup, we calculate the ELO by pinning the two teams using this formula:
Expected_Outcome = 1 (1 + 10**((opponent_rating - player_rating) / 400))

The rating gain is weighted, meaning that when a weaker (“bad”) team beats a stronger (“good”) team, the “bad” team will receive a larger point increase.
Similarly, when a “good” team beats a “bad” team, they still gain points but to a lesser extent.

We have also incorporated a variable "k" value into our system, which assigns varying importance to different stages of a tournament. The regular season contributes less to the ELO, while the playoffs significantly impact it. Additionally, we have provided the top regions with an initial set of starter points, ensuring clear distinctions between these regions.

# Frontend
The frontend of GoNext is built using the following technologies:

- **React with TypeScript**: This combination allows for the rapid development of reusable UI components and enforces strong data typing for improved code quality.

- **Tailwind CSS**: Tailwind CSS is used for styling the user interface. It simplifies and accelerates the styling process while maintaining a consistent design.

- **Vite**: Vite serves as the build tool, providing a developer-friendly environment with fast development server startup and efficient build processes.

- **Tanstack Table**: A component library used to create data-driven tables.
