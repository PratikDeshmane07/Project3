from flask import Flask, jsonify, send_from_directory, render_template
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, inspect
from flask_cors import CORS, cross_origin

# Database Setup
engine = create_engine("sqlite:///data/kayak_data.sqlite")
Base = automap_base()
Base.prepare(engine, reflect=True)

# Debug code to print table names
inspector = inspect(engine)
print("Table names in database:", inspector.get_table_names())

restaurants = Base.classes.restaurants
session = Session(engine)

# Flask Setup
app = Flask(__name__, static_folder='static')
cors = CORS(app)
app.config['JSON_SORT_KEYS'] = False
app.config['CORS_HEADERS'] = 'Content-Type'

# Function to start and close session


def start_session():
    return Session(engine)


def close_session(session):
    session.close()

# Flask Routes


@app.route("/")
def home():
    return "Available routes: /api/v1.0/kayak_restaurants_data, /index"


@app.route("/index")
def index():
    return render_template('index.html')


@app.route("/api/v1.0/kayak_restaurants_data")
@cross_origin()
def restaurant_data():
    session = start_session()
    results = session.query(restaurants).all()
    close_session(session)

    # Simplified data collection
    rows = [result.__dict__ for result in results]
    return jsonify(rows)


if __name__ == '__main__':
    app.run(debug=True)

# ... (previous code)
Base = automap_base()
Base.prepare(engine, reflect=True)

# Debug code to print table names
inspector = inspect(engine)
print("Table names in database:", inspector.get_table_names())
# ...

# Check if 'restaurants' is in the list of table names
if 'restaurants' in inspector.get_table_names():
    restaurants = Base.classes.restaurants
else:
    print("Table 'restaurants' not found in the database.")
