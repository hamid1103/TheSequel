--
-- File generated with SQLiteStudio v3.3.3 on Thu Jun 8 11:20:19 2023
--
-- Text encoding used: UTF-8
--
PRAGMA foreign_keys = off;
BEGIN TRANSACTION;

CREATE TABLE Main (id INTEGER PRIMARY KEY AUTOINCREMENT, email VARCHAR, name VARCHAR, country VARCHAR);
INSERT INTO Main (id, email, name, country) VALUES (1, 'cras.lorem@yahoo.com', 'Brock Downs', 'Norway');
INSERT INTO Main (id, email, name, country) VALUES (2, 'hamid.en.hidde@gmail.com', 'Hamid', 'Netherlands');
INSERT INTO Main (id, email, name, country) VALUES (3, 'bussiness@arcadianflame.nl', 'Bussiness', 'Netherlands');
INSERT INTO Main (id, email, name, country) VALUES (4, 'corvo@arcadianflame.nl', 'Corvo', 'Netherlands');

COMMIT TRANSACTION;
PRAGMA foreign_keys = on;
