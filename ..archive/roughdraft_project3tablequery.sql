CREATE TABLE NYC_RestaurantInspections (
    CAMIS INT PRIMARY KEY,
    DBA VARCHAR,
    BORO VARCHAR,
    BUILDING VARCHAR,
    STREET VARCHAR,
    ZIPCODE INT,
    PHONE VARCHAR,
    CUISINE_DESCRIPTION VARCHAR,
    INSPECTION_DATE DATE,
    ACTION VARCHAR,
    VIOLATION_CODE VARCHAR,
    VIOLATION_DESCRIPTION VARCHAR,
    CRITICAL_FLAG VARCHAR,
    SCORE INT,
    GRADE VARCHAR,
    GRADE_DATE DATE,
    RECORD_DATE DATE,
    INSPECTION_TYPE VARCHAR,
    Latitude FLOAT,
    Longitude FLOAT,
    Community_Board INT,
    Council_District INT,
    Census_Tract INT,
    BIN INT,
    BBL INT,
    NTA VARCHAR,
    Location_Point1 VARCHAR
);

CREATE TABLE Kayak_RestaurantReviews (
    URL VARCHAR PRIMARY KEY,
    name VARCHAR,
    locality VARCHAR,
    cuisine VARCHAR,
    price_per_person VARCHAR,
    overall_rating FLOAT,
    food FLOAT,
    service FLOAT,
    ambiance FLOAT,
    reviews INT,
    noise VARCHAR,
    dining_style VARCHAR
);

CREATE TABLE Yelp_Business (
    business_id VARCHAR PRIMARY KEY,
    name VARCHAR,
    address VARCHAR,
    city VARCHAR,
    state VARCHAR,
    postal_code VARCHAR,
    latitude FLOAT,
    longitude FLOAT,
    stars FLOAT,
    review_count INT,
    is_open BOOLEAN,
    attributes JSON,
    categories VARCHAR,
    hours JSON
);


CREATE TABLE Yelp_User (
    user_id VARCHAR PRIMARY KEY,
    name VARCHAR,
    review_count INT,
    yelping_since DATE,
    useful INT,
    funny INT,
    cool INT,
    elite VARCHAR,
    friends VARCHAR,
    fans INT,
    average_stars FLOAT
);

CREATE TABLE Yelp_Review (
    review_id VARCHAR PRIMARY KEY,
    business_id VARCHAR,
    user_id VARCHAR,
    stars INT,
    useful INT,
    funny INT,
    cool INT,
    text TEXT,
    date DATE,
    FOREIGN KEY (business_id) REFERENCES Yelp_Business(business_id),
    FOREIGN KEY (user_id) REFERENCES Yelp_User(user_id)
);

CREATE TABLE Yelp_Photo (
    photo_id INT PRIMARY KEY AUTO_INCREMENT,
    business_id VARCHAR,
    caption VARCHAR,
    label VARCHAR,
    FOREIGN KEY (business_id) REFERENCES Yelp_Business(business_id)
);

CREATE TABLE Yelp_Tip (
    tip_id INT PRIMARY KEY AUTO_INCREMENT,
    business_id VARCHAR,
    user_id VARCHAR,
    text VARCHAR,
    date DATETIME,
    compliment_count INT,
    FOREIGN KEY (business_id) REFERENCES Yelp_Business(business_id)
);

CREATE TABLE Yelp_Checkin (
    checkin_id INT PRIMARY KEY AUTO_INCREMENT,
    business_id VARCHAR,
    date DATETIME,
    FOREIGN KEY (business_id) REFERENCES Yelp_Business(business_id)
);