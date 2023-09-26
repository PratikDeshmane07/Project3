# NYC Restaurants Data Visualization Project
### Objective
The primary goal of this project is to create an interactive web application that provides valuable insights into New York City's restaurant scene. Utilizing a dataset from Kayak, the application aims to offer users an intuitive way to explore various restaurant options. These options are based on different parameters such as cuisine diversity, customer reviews, and pricing tiers. This project serves as a showcase of our team's technical skills in data engineering, web development, and data visualization.

### Technical Skills Utilized
- Python: Used for data cleaning, preprocessing, and server-side logic through Flask API.
- HTML/CSS: Employed for front-end structure and styling. Custom styles were applied to map containers, chart containers, and filters to enhance the user interface.
- JavaScript: Utilized for front-end logic and interactivity. Integrated Leaflet for map visualization and Mapbox for map styling.
- SQLite Database: Implemented for efficient data storage and retrieval.
- Data Visualization: Incorporated Chart.js for creating a variety of chart types, including pie charts, bar charts, polar charts, donut charts, and radar charts.

### Summary
In this collaborative effort, we developed a comprehensive web application that provides insights into restaurants in New York City. The backend was built using Python and Flask, with data stored in an SQLite database. The front-end was designed using HTML, CSS, and JavaScript. We also featured interactive maps via Leaflet and Mapbox. Various types of interactive charts were implemented using Chart.js to answer a set of specific research questions.

### Research Questions/User Interactions
1. What is the cuisine diversity of New York City?
	- Chart Type: Pie chart
1. Which restaurants in NYC have received the most reviews, broken down by type of cuisine?
	- Chart Type: Bar chart
	- Analysis: Through our Reviews Bar Chart the user is able to select Cuisine Type and the chart will populate Most Reviews (up to Max-10) for each Cuisine.
		- The following are the Top 10 Most Reviewed Restaurants overall: [1] Cookshop, American, 32428 reviews. [2 ] Lupa, Italian, 24595 reviews. [3] Maialino, Italian, 20414 reviews. [4] Koi, Japanese, 23367 reviews. [5] Atlantic Grill, Seafood, 22951 reviews. [6] Upland, Contemp. American, 22889 reviews [7] Morimoto, Japanese, 28230 reviews. [8] Avra Estiatorio, Seafood, 24594 reviews. [9] Avra Madison Estiatorio, Mediter., 22408 reviews [10] Boulud Sud, Mediter., 21437 reviews.
		- The following are the Top 10 Most Reviewed by Cuisine Type: [1] Italian, 317332 total reviews. [2] American, 181668 total reviews. [3] Contemp. American, 95271 total reviews. [4] French, 87437 total reviews. [5] Japanese, 75263 total reviews. [6] Mediter., 69676 total reviews.[7] Seafood, 58441 total reviews.[8] Steakhouse, 46870 total reviews.[9] Mexican, 24815 total reviews.[10] Contemp. Mexican, 23513 total reviews.
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

### Testing Instructions
1. Run Jupyter notebook (dataupload.ipynb). This is present inside Data Processing folder.
2. Run app.py (Flask code) present inside Web Development and Data Presentation folder.
   - `python app.py`
   - If you get error related to CORS not installed : run `pip install -U flask-cors`
4. You can review json output here: http://127.0.0.1:5000/api/v1.0/kayak_restaurants_data
5. Open web application using http://127.0.0.1:5000/index URL.


### Group Members

1. Pratik D.
1. Prachi S.
1. Mike S.
1. Calvin K.
1. Eric H.
