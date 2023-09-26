DROP TABLE IF EXISTS kayak_data;


CREATE TABLE "kayak_data"(
	"name" VARCHAR(300) NOT NULL PRIMARY KEY,
	"locality" VARCHAR(300) NOT NULL, 
	"cuisine" VARCHAR (300) NOT NULL, 
	"price_per_person" VARCHAR (300) NOT NULL,
	"overall_rating" FLOAT NOT NULL, 
	"food" FLOAT NOT NULL, 
	"service" FLOAT NOT NULL, 
	"ambiance" FLOAT NOT NULL, 
	"reviews" INTEGER NOT NULL, 
	"noise" VARCHAR (300) NOT NULL, 
	"dining_style" VARCHAR(300) NOT NULL, 
	"latitude" FLOAT NOT NULL,
	"longitude" FLOAT NOT NULL, 
	"url" VARCHAR(500) NOT NULL
);

SELECT * FROM "kayak_data"

