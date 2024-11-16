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

INSERT
INTO Account2(accountID, phoneNumber)
VALUES ('0001', '1234567890')
INSERT
INTO Account2(accountID, phoneNumber)
VALUES ('0002', '2345678901')
INSERT
INTO Account2(accountID, phoneNumber)
VALUES ('0003', '3456789012')
INSERT
INTO Account2(accountID, phoneNumber)
VALUES ('0004', '4567890123')
INSERT
INTO Account2(accountID, phoneNumber)
VALUES ('0005', '5678901234')

INSERT
INTO Journal1(journalID, title, accountID)
VALUES ('1', 'test1', '0001')
INSERT
INTO Journal1(journalID, title, accountID)
VALUES ('2', 'test2', '0001')
INSERT
INTO Journal1(journalID, title, accountID)
VALUES ('3', 'test3', '0001')
INSERT
INTO Journal1(journalID, title, accountID)
VALUES ('4', 'test4', '0002')
INSERT
INTO Journal1(journalID, title, accountID)
VALUES ('5', 'test5', '0003')

INSERT
INTO Journal2(title, description)
VALUES ('test1', 'this is test1s description')
INSERT
INTO Journal2(title, description)
VALUES ('test2', 'this is test2s description')
INSERT
INTO Journal2(title, description)
VALUES ('test3', 'this is test3s description')
INSERT
INTO Journal2(title, description)
VALUES ('test4', 'this is test4s description')
INSERT
INTO Journal2(title, description)
VALUES ('test5', 'this is test5s description')

INSERT
INTO Friends(accountID, friendID)
VALUES('0001', '0002')
INSERT
INTO Friends(accountID, friendID)
VALUES('0003', '0004')
INSERT
INTO Friends(accountID, friendID)
VALUES('0005', '0006')
INSERT
INTO Friends(accountID, friendID)
VALUES('0006', '0001')
INSERT
INTO Friends(accountID, friendID)
VALUES('0003', '0005')

INSERT
INTO Review1(comments, reviewID, journalID, restaurantName, restaurantLocation)
VALUES ('test1s comment', '123', '1', 'test1s Food', 'test1s location')
INSERT
INTO Review1(comments, reviewID, journalID, restaurantName, restaurantLocation)
VALUES ('test2s comment', '234', '2', 'test2s Food', 'test2s location')
INSERT
INTO Review1(comments, reviewID, journalID, restaurantName, restaurantLocation)
VALUES ('test3s comment', '345', '3', 'test3s Food', 'test3s location')
INSERT
INTO Review1(comments, reviewID, journalID, restaurantName, restaurantLocation)
VALUES ('test4s comment', '456', '4', 'test4s Food', 'test4s location')
INSERT
INTO Review1(comments, reviewID, journalID, restaurantName, restaurantLocation)
VALUES ('test5s comment', '567', '5', 'test5s Food', 'test5s location')

INSERT
INTO Review2(tags, journalID, accountID)
VALUES ('American', '1', '0001')
INSERT
INTO Review2(tags, journalID, accountID)
VALUES ('Seafood', '2', '0004')
INSERT
INTO Review2(tags, journalID, accountID)
VALUES ('Italian', '3', '0003')
INSERT
INTO Review2(tags, journalID, accountID)
VALUES ('Japanese', '4', '0001')
INSERT
INTO Review2(tags, journalID, accountID)
VALUES ('American', '5', '0002')

INSERT
INTO Rates(foodRating, serviceRating, affordabilityRating, reviewID, restaurantName, restaurantLocation)
VALUES('3', '4', '5', '123', 'test1s Food', 'test1s location')
INSERT
INTO Rates(foodRating, serviceRating, affordabilityRating, reviewID, restaurantName, restaurantLocation)
VALUES('4', '4', '4', '234', 'test2s Food', 'test2s location')
INSERT
INTO Rates(foodRating, serviceRating, affordabilityRating, reviewID, restaurantName, restaurantLocation)
VALUES('5', '4', '4', '345', 'test3s Food', 'test3s location')
INSERT
INTO Rates(foodRating, serviceRating, affordabilityRating, reviewID, restaurantName, restaurantLocation)
VALUES('4', '4', '3', '456', 'test4s Food', 'test4s location')
INSERT
INTO Rates(foodRating, serviceRating, affordabilityRating, reviewID, restaurantName, restaurantLocation)
VALUES('5', '5', '5', '567', 'test5s Food', 'test5s location')

INSERT
INTO Media(filename, description, journalID)
VALUES('file1.jpg', 'file1 desc', '1')
INSERT
INTO Media(filename, description, journalID)
VALUES('file2.jpg', 'file2 desc', '1')
INSERT
INTO Media(filename, description, journalID)
VALUES('file3.jpg', 'file3 desc', '1')
INSERT
INTO Media(filename, description, journalID)
VALUES('file4.png', 'file4 desc', '2')
INSERT
INTO Media(filename, description, journalID)
VALUES('file5.png', 'file5 desc', '3')

INSERT
INTO DineInOrder(orderID, totalPrice, tableNumber, accountID, restaurantName, restaurantLocation)
VALUES ('90001', '100', '7001', '0001', 'test1s Food', 'test1s location')
INSERT
INTO DineInOrder(orderID, totalPrice, tableNumber, accountID, restaurantName, restaurantLocation)
VALUES ('90002', '50', '7005', '0002', 'test2s Food', 'test2s location')
INSERT
INTO DineInOrder(orderID, totalPrice, tableNumber, accountID, restaurantName, restaurantLocation)
VALUES ('90003', '200', '7003', '0003', 'test3s Food', 'test3s location')
INSERT
INTO DineInOrder(orderID, totalPrice, tableNumber, accountID, restaurantName, restaurantLocation)
VALUES ('90004', '15', '7002', '0004', 'test4s Food', 'test4s location')
INSERT
INTO DineInOrder(orderID, totalPrice, tableNumber, accountID, restaurantName, restaurantLocation)
VALUES ('90005', '75', '7006', '0005', 'test5s Food', 'test5s location')

INSERT
INTO DineInOrder(orderID, totalPrice, pickupNumber, accountID, restaurantName, restaurantLocation)
VALUES ('90006', '80', '7010', '0001', 'test1s Food', 'test1s location')
INSERT
INTO DineInOrder(orderID, totalPrice, pickupNumber, accountID, restaurantName, restaurantLocation)
VALUES ('90007', '16', '7011', '0003', 'test2s Food', 'test2s location')
INSERT
INTO DineInOrder(orderID, totalPrice, pickupNumber, accountID, restaurantName, restaurantLocation)
VALUES ('90008', '38', '7012', '0002', 'test3s Food', 'test3s location')
INSERT
INTO DineInOrder(orderID, totalPrice, pickupNumber, accountID, restaurantName, restaurantLocation)
VALUES ('90009', '80', '7013', '0004', 'test4s Food', 'test4s location')
INSERT
INTO DineInOrder(orderID, totalPrice, pickupNumber, accountID, restaurantName, restaurantLocation)
VALUES ('90010', '110', '7014', '0005', 'test5s Food', 'test5s location')

INSERT
INTO Restaurant1(cuisineTag, menu)
VALUES ('American', 'Burgers, Fries, Milkshakes')
INSERT
INTO Restaurant1(cuisineTag, menu)
VALUES ('Seafood', 'Fish, Lobster, Crab')
INSERT
INTO Restaurant1(cuisineTag, menu)
VALUES ('Italian', 'Pasta, Pizza')
INSERT
INTO Restaurant1(cuisineTag, menu)
VALUES ('Japanese', 'Sushi, Udon, Ramen')
INSERT
INTO Restaurant1(cuisineTag, menu)
VALUES ('Chinese', 'Hot pot, Milk tea')

INSERT
INTO Restaurant2(name, location, waitlistID)
VALUES('test1s name', 'test1s location', '1')
INSERT
INTO Restaurant2(name, location, waitlistID)
VALUES('test2s name', 'test2s location', '2')
INSERT
INTO Restaurant2(name, location, waitlistID)
VALUES('test3s name', 'test3s location', '3')
INSERT
INTO Restaurant2(name, location, waitlistID)
VALUES('test4s name', 'test4s location', '4')
INSERT
INTO Restaurant2(name, location, waitlistID)
VALUES('test5s name', 'test5s location', '5')

INSERT
INTO Restaurant_Staff1(restaurantName, restaurantLocation, staffID, position)
VALUES('test1s Food', 'test1s location', '01', 'Chef')
INSERT
INTO Restaurant_Staff1(restaurantName, restaurantLocation, staffID, position)
VALUES('test2s Food', 'test2s location', '02', 'Server')
INSERT
INTO Restaurant_Staff1(restaurantName, restaurantLocation, staffID, position)
VALUES('test3s Food', 'test3s location', '03', 'Barista')
INSERT
INTO Restaurant_Staff1(restaurantName, restaurantLocation, staffID, position)
VALUES('test4s Food', 'test4s location', '04', 'Chef')
INSERT
INTO Restaurant_Staff1(restaurantName, restaurantLocation, staffID, position)
VALUES('test5s Food', 'test5s location', '05', 'Server')

INSERT
INTO Restaurant_Staff2(staffID, name)
VALUES('01', 'staff1')
INSERT
INTO Restaurant_Staff2(staffID, name)
VALUES('02', 'staff2')
INSERT
INTO Restaurant_Staff2(staffID, name)
VALUES('03', 'staff3')
INSERT
INTO Restaurant_Staff2(staffID, name)
VALUES('04', 'staff4')
INSERT
INTO Restaurant_Staff2(staffID, name)
VALUES('05', 'staff5')

INSERT
INTO Waitlist1(waitlistID, restaurantName, restaurantLocation)
VALUES ('1', 'test1s name', 'test1s location')
INSERT
INTO Waitlist1(waitlistID, restaurantName, restaurantLocation)
VALUES ('2', 'test2s name', 'test2s location')
INSERT
INTO Waitlist1(waitlistID, restaurantName, restaurantLocation)
VALUES ('3', 'test3s name', 'test3s location')
INSERT
INTO Waitlist1(waitlistID, restaurantName, restaurantLocation)
VALUES ('4', 'test4s name', 'test4s location')
INSERT
INTO Waitlist1(waitlistID, restaurantName, restaurantLocation)
VALUES ('5', 'test5s name', 'test5s location')

INSERT
INTO Waitlist2(estimateWaitTime, restaurantName, restaurantLocation)
VALUES ('20', 'test1s name', 'test1s location')
INSERT
INTO Waitlist2(estimateWaitTime, restaurantName, restaurantLocation)
VALUES ('70', 'test2s name', 'test2s location')
INSERT
INTO Waitlist2(estimateWaitTime, restaurantName, restaurantLocation)
VALUES ('10', 'test3s name', 'test3s location')
INSERT
INTO Waitlist2(estimateWaitTime, restaurantName, restaurantLocation)
VALUES ('0', 'test4s name', 'test4s location')
INSERT
INTO Waitlist2(estimateWaitTime, restaurantName, restaurantLocation)
VALUES ('15', 'test5s name', 'test5s location')

INSERT
INTO Joins(position, accountID, waitlistID)
VALUES ('1', '0001', '1')
INSERT
INTO Joins(position, accountID, waitlistID)
VALUES ('2', '0002', '1')
INSERT
INTO Joins(position, accountID, waitlistID)
VALUES ('1', '0003', '2')
INSERT
INTO Joins(position, accountID, waitlistID)
VALUES ('1', '0004', '3')
INSERT
INTO Joins(position, accountID, waitlistID)
VALUES ('2', '0005', '3')