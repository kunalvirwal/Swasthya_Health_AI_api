CREATE DATABASE swasthya;

CREATE TABLE USERS (UUID INT PRIMARY KEY AUTO_INCREMENT, NAME VARCHAR(50), EMAIL VARCHAR(50) UNIQUE NOT NULL, AGE INT, PASSWORD VARCHAR(100), GENDER BOOLEAN NOT NULL, DESCRIPTION VARCHAR(1000),LAST_CHAT VARCHAR(10000), CONSTRAINT validAge CHECK (AGE>=0) );
