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
	- Analysis: Analysis: Our Kayak dataset featured 85 different types of cuisine in New York City. Those 85 types, and their representation (in percentage) of total cuisine is as follows:  [1] Italian, 23.63%, [2] American, 15.75%, [3] French, 5.63%, [4] Steakhouse, 5.06%, [5] Japanese, 4.78%, [6] Contemporary American, 4.22%, [7] Mexican, 2.81%, [8] Seafood, 2.67%, [9] Mediterranean, 2.53%, [10] Indian, 2.39%, [11] Greek, 1.83%, [12] Tapas / Small Plates, 1.55%, [13] Spanish, 1.41%, [14] Sushi, 1.41%, [15] Korean, 1.27%, [16] Unspecified, 1.27%, [17] Pizzeria, 1.13%, [18] Irish, 0.98%, [19] Thaï, 0.84%, [20] Burgers, 0.84%, [21] Bar / Lounge / Bottle Service, 0.84%, [22] Turkish, 0.70%, [23] Kosher, 0.70%, [24] Chinese, 0.56%, [25] Comfort food, 0.56%, [26] Contemporary Mexican, 0.56%, [27] Steak, 0.56%, [28] Gastro Pub, 0.42%, [29] International, 0.42%, [30] Belgian, 0.42%, [31] Contemporary Italian, 0.42%, [32] Barbecue, 0.42%, [33] Cocktail bar, 0.42%, [34] Brazilian, 0.42%, [35] Vegan, 0.42%, [36] Argentinean, 0.42%, [37] Farm-to-table, 0.28%, [38] Vegetarian / Vegan, 0.28%, [39] Georgian, 0.28%, [40] British, 0.28%, [41] Contemporary Indian, 0.28%, [42] Latin American, 0.28%, [43] French American, 0.28%, [44] Eastern European, 0.28%, [45] Vietnamese, 0.28%, [46] Swiss, 0.28%, [47] Izakaya, 0.28%, [48] Fusion / Eclectic, 0.28%, [49] Asian, 0.28%, [50] Australian, 0.28%, [51] Tex-Mex, 0.28%, [52] Bistro, 0.28%, [53] Continental, 0.28%, [54] Middle Eastern, 0.28%, [55] Lebanese, 0.28%, [56] French / Japanese, 0.28%, [57] Russian, 0.14%, [58] Cuban, 0.14%, [59] Wine Bar, 0.14%, [60] Sports Bar, 0.14%, [61] Dining bar, 0.14%, [62] German, 0.14%, [63] Southern, 0.14%, [64] European, 0.14%, [65] Regional Italian (Sardinia), 0.14%, [66] Cajun, 0.14%, [67] Contemporary Asian, 0.14%, [68] Market Cuisine, 0.14%, [69] Laotian, 0.14%, [70] Breakfast, 0.14%, [71] Scandinavian, 0.14%, [72] Café, 0.14%, [73] Regional Mexican, 0.14%, [74] Southeast Asian, 0.14%, [75] Pan-Asian, 0.14%, [76] Caribbean, 0.14%, [77] Creole / Cajun / Southern, 0.14%, [78] Contemporary French / American, 0.14%, [79] Contemporary French, 0.14%, [80] Sicilian, 0.14%, [81] Basque, 0.14%, [82] Modern European, 0.14%, [83] Egyptian, 0.14%, [84] English, 0.14%, [85] Brazilian Steakhouse, 0.14%
1. Which restaurants in NYC have received the most reviews, broken down by type of cuisine?
	- Chart Type: Bar chart
	- Analysis: Through our Reviews Bar Chart the user is able to select Cuisine Type and the chart will populate Most Reviews (up to Max-10) for each Cuisine.
		- The following are the Top 10 Most Reviewed Restaurants overall: [1] Cookshop, American, 32428 reviews. [2 ] Lupa, Italian, 24595 reviews. [3] Maialino, Italian, 20414 reviews. [4] Koi, Japanese, 23367 reviews. [5] Atlantic Grill, Seafood, 22951 reviews. [6] Upland, Contemp. American, 22889 reviews [7] Morimoto, Japanese, 28230 reviews. [8] Avra Estiatorio, Seafood, 24594 reviews. [9] Avra Madison Estiatorio, Mediter., 22408 reviews [10] Boulud Sud, Mediter., 21437 reviews.
		- The following are the Top 10 Most Reviewed by Cuisine Type overall: [1] Italian, 317332 total reviews. [2] American, 181668 total reviews. [3] Contemp. American, 95271 total reviews. [4] French, 87437 total reviews. [5] Japanese, 75263 total reviews. [6] Mediter., 69676 total reviews.[7] Seafood, 58441 total reviews.[8] Steakhouse, 46870 total reviews.[9] Mexican, 24815 total reviews.[10] Contemp. Mexican, 23513 total reviews.
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
