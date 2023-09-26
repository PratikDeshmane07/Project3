# Import the dependencies.
from flask import Flask, jsonify
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
from flask_cors import CORS, cross_origin

#################################################
# Database Setup
#################################################


engine = create_engine("sqlite:///data/kayak_data.sqlite")

# reflect an existing database into a new model
Base = automap_base()

# reflect the tables
Base.prepare(autoload_with=engine, reflect=True)

# Save references to each table
restaurants = Base.classes.restaurants

# Create our session (link) from Python to the DB
session = Session(engine)

#################################################
# Flask Setup
#################################################

app = Flask(__name__)
cors = CORS(app)
# To Maintain order in jsonified responses
app.config['JSON_SORT_KEYS'] = False
app.config['CORS_HEADERS'] = 'Content-Type'
# Function to start session


def start_session():
    session = Session(engine)

# Function to close session


def close_session():
    session.close()
#################################################
# Flask Routes
#################################################


@app.route("/")
def home():
    return (f"Kayak restaurant data!<br /><br />"
            f"Available routes: <br />"
            f"/api/v1.0/kayak_restaurants_data <br />")


@app.route("/api/v1.0/kayak_restaurants_data")
def restaurant_data():

    start_session()
    results = session.query(restaurants).all()
    close_session()

    rows = []
    for result in results:
        temp = {}
        temp['restaurant_id'] = result.restaurant_id
        temp['name'] = result.name
        temp['locality'] = result.locality
        temp['cuisine'] = result.cuisine
        temp['price_per_person'] = result.price_per_person
        temp['overall_rating'] = result.overall_rating
        temp['food'] = result.food
        temp['service'] = result.service
        temp['ambiance'] = result.ambiance
        temp['reviews'] = result.reviews
        temp['noise'] = result.noise
        temp['dining_style'] = result.dining_style
        temp['latitude'] = result.latitude
        temp['longitude'] = result.longitude
        temp['url']=result.url
        rows.append(temp)

    # Returning jsonified results
    return jsonify(rows)


if __name__ == '__main__':
    app.run(debug=True)
