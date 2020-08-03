ALTER TABLE singer
    DROP FOREIGN KEY fk_singer_song_id;
ALTER TABLE waitinglist
    DROP FOREIGN KEY fk_waitinglist_singer_id;
ALTER TABLE event
    DROP FOREIGN KEY fk_event_waitinglist_id;

DROP TABLE IF EXISTS singer;
DROP TABLE IF EXISTS song;
DROP TABLE IF EXISTS event;
DROP TABLE IF EXISTS waitinglist;
DROP TABLE IF EXISTS user;


CREATE TABLE user
(
    id        INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    username  VARCHAR(55)     NOT NULL,
    lastname  VARCHAR(100)    NOT NULL,
    firstname VARCHAR(100)    NOT NULL,
    email     VARCHAR(100)    NOT NULL,
    phone     VARCHAR(100),
    address   VARCHAR(100),
    zip_code  VARCHAR(10),
    state     VARCHAR(55),
    password  BLOB            NOT NULL,
    CONSTRAINT UC_user UNIQUE (username, email)
);

CREATE TABLE song
(
    id       INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    artist   VARCHAR(60),
    title    VARCHAR(100),
    language VARCHAR(60),
    edition  VARCHAR(60),
    genre    VARCHAR(60),
    year     VARCHAR(60),
    length   VARCHAR(60)
);

CREATE TABLE singer
(
    id      INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name    VARCHAR(100),
    song_id INT
);

ALTER TABLE singer
    ADD CONSTRAINT fk_singer_song_id FOREIGN KEY (song_id) REFERENCES song (id);

CREATE TABLE waitinglist
(
    id        INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    singer_id INT
);

ALTER TABLE waitinglist
    ADD CONSTRAINT fk_waitinglist_singer_id FOREIGN KEY (singer_id) REFERENCES singer (id);



CREATE TABLE event
(
    id             INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    date           DATE,
    begin          DATE,
    end            DATE,
    waitinglist_id INT
);

ALTER TABLE event
    ADD CONSTRAINT fk_event_waitinglist_id FOREIGN KEY (waitinglist_id) REFERENCES waitinglist (id);


#
# DROP TRIGGER IF EXISTS trig_waitinglist;
# DELIMITER //
# CREATE TRIGGER trig_waitinglist
#     AFTER INSERT
#     ON event
#     FOR EACH ROW
# BEGIN
#     INSERT INTO waitinglist(current_position)
#     VALUES (1);
# end //
# DELIMITER ;