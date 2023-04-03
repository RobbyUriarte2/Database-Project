CREATE TABLE university
(
universityID int NOT NULL PRIMARY KEY AUTO_INCREMENT,
nameUniversity varchar(255) NOT NULL,
latitude int NOT NULL,
longitude int NOT NULL,
emailDomain varchar(255) NOT NULL
);

CREATE TABLE users
(
userID int NOT NULL PRIMARY KEY AUTO_INCREMENT,
email varchar(255) NOT NULL,
password varchar(255) NOT NULL,
permission varchar(255) NOT NULL,
salt varchar(255) NOT NULL,
universityID int NOT NULL,
FOREIGN KEY (universityID) REFERENCES university(universityID)
);

CREATE TABLE rso
(
rsoID int NOT NULL PRIMARY KEY AUTO_INCREMENT,
universityID int NOT NULL,
FOREIGN KEY (universityID) REFERENCES university(universityID),
NameRSO varchar(255) NOT NULL,
DescriptionRSO varchar(255) NOT NULL,
verified boolean NOT NULL DEFAULT 0);


CREATE TABLE event
(
eventID int NOT NULL PRIMARY KEY AUTO_INCREMENT,
universityID int NOT NULL,
userID int NOT NULL,
FOREIGN KEY (universityID) REFERENCES university(universityID),
FOREIGN KEY (userID) REFERENCES users(userID),
category varchar(255) NOT NULL,
name varchar(255) NOT NULL,
latitude int NOT NULL,
longitude int NOT NULL
);



CREATE TABLE rso_user
(
rsoID int NOT NULL,
FOREIGN KEY (rsoID) REFERENCES rso(rsoID),
userID int NOT NULL,
FOREIGN KEY (userID) REFERENCES users(userID),
isAdmin boolean DEFAULT false
);

CREATE TABLE comments
(
commentID int NOT NULL PRIMARY KEY AUTO_INCREMENT,
eventID int NOT NULL,
FOREIGN KEY (eventID) REFERENCES event(eventID),
userID int NOT NULL,
FOREIGN KEY (userID) REFERENCES users(userID),
comment varchar(255) NOT NULL
);

CREATE TABLE ratings
(
ratingID int NOT NULL PRIMARY KEY AUTO_INCREMENT,
eventID int NOT NULL,
FOREIGN KEY (eventID) REFERENCES event(eventID),
userID int NOT NULL,
FOREIGN KEY (userID) REFERENCES users(userID),
rating int NOT NULL
);

CREATE TABLE privateEvent
(
    eventID int NOT NULL PRIMARY KEY,
    FOREIGN KEY (eventID) REFERENCES event(eventID),
    adminID int NOT NULL,
    FOREIGN KEY (adminID) REFERENCES users(userID),
    superadminID int NOT NULL,
    FOREIGN KEY (superadminID) REFERENCES users(userID)
);

CREATE TABLE rsoEvent
(
    eeventID int NOT NULL PRIMARY KEY,
    FOREIGN KEY (eventID) REFERENCES event(eventID),
    adminID int NOT NULL,
    FOREIGN KEY (adminID) REFERENCES users(userID),
    superadminID int NOT NULL,
    FOREIGN KEY (superadminID) REFERENCES users(userID),
    rsoID int NOT NULL,
    fOREIGN KEY (rsoID) REFERENCES rso(rsoID)

);

CREATE TABLE publicEvent
(
    eventID int NOT NULL PRIMARY KEY,
    FOREIGN KEY (eventID) REFERENCES event(eventID),
    adminID int NOT NULL,
    FOREIGN KEY (adminID) REFERENCES users(userID),
    superadminID int NOT NULL,
    FOREIGN KEY (superadminID) REFERENCES users(userID)
);

