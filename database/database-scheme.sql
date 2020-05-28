DROP TABLE IF EXISTS singer;
DROP TABLE IF EXISTS song;
DROP TABLE IF EXISTS event;
DROP TABLE IF EXISTS waitinglist;

CREATE TABLE SONG
(
    song_id  INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    artist   VARCHAR(60),
    title    VARCHAR(60),
    language VARCHAR(60),
    edition  VARCHAR(60),
    genre    VARCHAR(60),
    year     VARCHAR(60),
    length   VARCHAR(60)
);


CREATE TABLE waitinglist
(
    waitinglist_id   INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    current_position INT
);

CREATE TABLE singer
(
    singer_id      INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name           VARCHAR(100),
    song_id        INT,
    waitinglist_id INT,
    FOREIGN KEY (song_id) REFERENCES SONG (song_id) ON DELETE CASCADE,
    FOREIGN KEY (waitinglist_id) REFERENCES waitinglist (waitinglist_id) ON DELETE CASCADE
);


CREATE TABLE event
(
    event_id       INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    date           DATE,
    begin          DATE,
    end            DATE,
    waitinglist_id INT,
    FOREIGN KEY (waitinglist_id) REFERENCES waitinglist (waitinglist_id) ON DELETE CASCADE
);

DROP TRIGGER IF EXISTS trig_waitinglist;
DELIMITER //
CREATE TRIGGER trig_waitinglist
    AFTER INSERT
    ON event
    FOR EACH ROW
BEGIN
    INSERT INTO waitinglist(current_position)
    VALUES (1);
end //
DELIMITER ;