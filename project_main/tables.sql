DROP TABLE Account1;
DROP TABLE Account2;
DROP TABLE Journal1;
DROP TABLE Journal2;
DROP TABLE Friends;
DROP TABLE Review1;
DROP TABLE Review2;
DROP TABLE Rates;
DROP TABLE Media;
DROP TABLE DineInOrder;
DROP TABLE PickupOrder;
DROP TABLE Restaurant1;
DROP TABLE Restaurant2;
DROP TABLE Restaurant_Staff1;
DROP TABLE Restaurant_Staff2;
DROP TABLE Waitlist1;
DROP TABLE Waitlist2;
DROP TABLE Joins;

CREATE TABLE Account1 (
              phoneNumber INTEGER  PRIMARY KEY,
              name VARCHAR
);

CREATE TABLE Account2 (
              accountID INTEGER  PRIMARY KEY,
              phoneNumber INTEGER
);

CREATE TABLE Journal1 (
              journalID INTEGER  PRIMARY KEY,
              title VARCHAR,
              accountID INTEGER NOT NULL,
              FOREIGN KEY (accountID) REFERENCES Account2(accountID)
);

CREATE TABLE Journal2 (
              title VARCHAR  PRIMARY KEY,
              description VARCHAR
);

CREATE TABLE Friends (
             accountID INTEGER,
             friendID INTEGER,
             PRIMARY KEY (accountID, friendID),
             FOREIGN KEY (accountID) REFERENCES Account2(accountID),
             FOREIGN KEY (friendID) REFERENCES Account2(accountID)
);

CREATE TABLE Review1 (
             comments VARCHAR,
             reviewID INTEGER  PRIMARY KEY,
             journalID INTEGER,
             restaurantName VARCHAR  NOT NULL,
             restaurantLocation VARCHAR NOT NULL,
             FOREIGN KEY (journalID) REFERENCES Journal1(journalID),
             FOREIGN KEY (restaurantName, restaurantLocation) REFERENCES Restaurant2(name, location)
);

CREATE TABLE Review2 (
             tags VARCHAR,
             journalID INTEGER PRIMARY KEY,
             accountID INTEGER  NOT NULL,
             FOREIGN KEY (journalID) REFERENCES Journal1(journalID),
             FOREIGN KEY (accountID) REFERENCES Account2(accountID)
);

CREATE TABLE Rates (
           foodRating INTEGER,
           serviceRating INTEGER,
           affordabilityRating INTEGER,
           reviewID INTEGER NOT NULL,
           restaurantName VARCHAR NOT NULL,
           restaurantLocation VARCHAR NOT NULL,
           PRIMARY KEY (reviewID, restaurantName, restaurantLocation),
           FOREIGN KEY (reviewID) REFERENCES Review1(reviewID),
           FOREIGN KEY (restaurantName, restaurantLocation) REFERENCES Restaurant2(name, location)
);

CREATE TABLE Media (
           filename VARCHAR  PRIMARY KEY,
           description VARCHAR,
           journalID INTEGER  NOT NULL,
           FOREIGN KEY (journalID) REFERENCES Journal1(journalID)
);

CREATE TABLE DineInOrder (
             orderID INTEGER  PRIMARY KEY,
             totalPrice INTEGER,
             tableNumber INTEGER,
             accountID INTEGER NOT NULL,
             restaurantName VARCHAR  NOT NULL,
             restaurantLocation VARCHAR NOT NULL,
             FOREIGN KEY (accountID) REFERENCES Account2(accountID),
             FOREIGN KEY (restaurantName, restaurantLocation) REFERENCES Restaurant2(name, location)
);

CREATE TABLE PickupOrder (
             orderID INTEGER  PRIMARY KEY,
             totalPrice INTEGER,
             pickupNumber INTEGER,
             accountID INTEGER  NOT NULL,
             restaurantName VARCHAR  NOT NULL,
             restaurantLocation VARCHAR NOT NULL,
             FOREIGN KEY (accountID) REFERENCES Account2(accountID),
             FOREIGN KEY (restaurantName, restaurantLocation) REFERENCES Restaurant2(name, location)
);

CREATE TABLE Restaurant1 (
             cuisineTag VARCHAR,
             menu VARCHAR  PRIMARY KEY,
);

CREATE TABLE Restaurant2 (
             name VARCHAR,
             location VARCHAR,
             waitlistID INTEGER UNIQUE,
             PRIMARY KEY (name, location),
             FOREIGN KEY (waitlistID) REFERENCES Waitlist1(waitlistID)
);

CREATE TABLE Restaurant_Staff1 (
           restaurantName VARCHAR,
           restaurantLocation VARCHAR,
           staffID INTEGER,
           position VARCHAR,
           PRIMARY KEY (restaurantName, restaurantLocation, staffID),
           FOREIGN KEY (restaurantName, restaurantLocation)
               REFERENCES Restaurant2(name, location)
               ON DELETE CASCADE
);


CREATE TABLE Restaurant_Staff2 (
           staffID INTEGER PRIMARY KEY,
           name VARCHAR
);

CREATE TABLE Waitlist1 (
           waitlistID INTEGER  PRIMARY KEY,
           restaurantName VARCHAR NOT NULL,
           restaurantLocation VARCHAR NOT NULL,
           UNIQUE (restaurantName),
           UNIQUE (restaurantLocation),
           FOREIGN KEY (restaurantName, restaurantLocation) REFERENCES Restaurant2(name, location)
);

CREATE TABLE Waitlist2 (
           estimateWaitTime INTEGER,
           restaurantName VARCHAR NOT NULL,
           restaurantLocation VARCHAR NOT NULL,
           PRIMARY KEY (restaurantName, restaurantLocation),
           UNIQUE (restaurantName),
           UNIQUE (restaurantLocation),
           FOREIGN KEY (restaurantName, restaurantLocation) REFERENCES Restaurant2(name, location)
);

CREATE TABLE Joins (
           position INTEGER,
           accountID INTEGER,
           waitlistID INTEGER,
           PRIMARY KEY (accountID, waitlistID),
           FOREIGN KEY (accountID) REFERENCES Account2(accountID),
           FOREIGN KEY (waitlistID) REFERENCES Waitlist1(waitlistID)
);

INSERT
INTO Account1(phoneNumber, name)
VALUES ('1234567890', 'A');
INSERT
INTO Account1(phoneNumber, name)
VALUES ('2345678901', 'B');
INSERT
INTO Account1(phoneNumber, name)
VALUES ('3456789012', 'C');
INSERT
INTO Account1(phoneNumber, name)
VALUES ('4567890123', 'D');
INSERT
INTO Account1(phoneNumber, name)
VALUES ('5678901234', 'E');

