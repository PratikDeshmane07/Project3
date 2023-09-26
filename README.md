# NYC Restaurants Data Visualization Project
### Objective
The primary goal of this project is to create an interactive web application that provides valuable insights into New York City's restaurant scene. Utilizing a dataset from Kayak, the application aims to offer users an intuitive way to explore various restaurant options. These options are based on different parameters such as cuisine diversity, customer reviews, and pricing tiers. This project serves as a showcase of our team's technical skills in data engineering, web development, and data visualization.

### Technical Skills Utilized
- Python: Used for data cleaning, preprocessing, and server-side logic through Flask API.
- HTML/CSS: Employed for front-end structure and styling. Custom styles were applied to map containers, chart containers, and filters to enhance the user interface.
- JavaScript: Utilized for front-end logic and interactivity. Integrated Leaflet for map visualization and Mapbox for map styling.
- SQL Database: Implemented for efficient data storage and retrieval.
- Data Visualization: Incorporated Chart.js for creating a variety of chart types, including pie charts, bar charts, polar charts, donut charts, and radar charts.

### Summary
In this collaborative effort, we developed a comprehensive web application that provides insights into restaurants in New York City. The backend was built using Python and Flask, with data stored in an SQL database. The front-end was designed using HTML, CSS, and JavaScript. We also featured interactive maps via Leaflet and Mapbox. Various types of interactive charts were implemented using Chart.js to answer a set of specific research questions.

### Research Questions/User Interactions
1. What is the cuisine diversity of New York City?
	- Chart Type: Pie chart
1. Which restaurants in NYC have received the most reviews, broken down by type of cuisine?
	- Chart Type: Bar chart
1. What is the most common price range for restaurants in NYC?
	- Chart Type: Polar chart
	- Analysis: Polar Chart revealed the following distribution of Price: [#1] $30-and-under, with 311 values (43.75%). [#2] $30-to-$50, with 280 values (39.29%). [#3] $50-and-over, with 120 values (16.96%). Thus “$30 and under” is the most common price range for NYC Restaurants.
1. Which cuisine is most dominant in the NYC area?
	- Chart Type: Donut chart
	- Analysis: Donut Chart revealed the following distribution of Cuisine Type: [#1] Italian 168 values (23.62%). [#2] American 112 values (15.75%). [#3] French 40 values (5.62%). [#4] Steakhouse 36 values [5.06%]. [#5] Japanese 34 (4.78%). Thus, Italian and American cuisine are far outpacing other cuisine types in regards to the amount of restaurants.
1. Are fine-dining restaurants more prevalent in certain neighborhoods?
	- Chart Type: Radar chart
	- Analysis: Our Radar Chart mapped two variables: Dining Style & Locality. Dining Style by Volume ( the Radar ) populated in the Center with Localities mapped around the outer edge of the Radar Circle. All Dining Styles showed a strong-tendency towards Midtown for Dining Style Volume and Fine-Dining was no different. Fine-Dining and Elegant-Dining showed their strongest tendencies--by far--toward Midtown
1. How does the number of restaurants for each type of cuisine correlate with the total volume of ratings they've received in NYC?
	- Chart Type: Bar chart
	- Analysis: In regards to the comparison between Italian and American restaurants, one would expect the amount of Ratings to keep pace with the amount of Restaurants, and our Stacked Bar Chart shows that to be true. However, an interesting insight emerged. While Italian and American restaurants receive roughly the same amount of Ratings in the “4.0-to-4.5 Rating Zone” (Tallies: Italian 74, American 72), Italian cuisine far outpaces American in the highest “4.6-to-4.9 Rating Zone”. Italian cuisine has 3-times as many Ratings in the “4.6-to-4.9 Rating Zone” (Tallies: Italian 92, American 34). Thus, despite similar popularity (seen in the total number of Restaurants), Italian cuisine is higher-rated than American. 

### Data Source
|Source|Website|
|---|---|
|Kayak NYC Restaurants|https://www.kaggle.com/datasets/saikashyapcheruku/nyc-restaurants|


### Group Members

1. Pratik D.
1. Prachi S.
1. Mike S.
1. Calvin K.
1. Eric H.
