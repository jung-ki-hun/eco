CREATE SCHEMA 'projecta' DEFAULT CHARCTER SET utf8;

CREATE TABLE projecta.users(
    id INT NOT NULL AUTO_INCREMENT,
    userName VARCHAR(20) NOT NULL,
    email VARCHAR(255) NOT NULL,
    pw VARCHAR(255) NOT NULL,
    PRIMARY KEY(id),
    UNIQUE KEY email_idx(email)
)default character set utf8 collate utf8_general_ci;
CREATE TABLE projecta.QnAdata(
    id INT NOT NULL AUTO_INCREMENT,
    userName VARCHAR(20) NOT NULL,
    title VARCHAR(300) NOT NULL,
    postData TEXT NOT NULL
)default character set utf8 collate utf8_general_ci;
CREATE TABLE projecta.logstack(
    id BIGINT NOT NULL AUTO_INCREMENT,
    errCord VARCHAR(30) NOT NULL,
    content VARCHAR(200) NOT NULL,
    errTime TIMESTAMP,
    PRIMARY KEY(id)
)
CREATE TABLE projecta.apiDataR()
CREATE TABLE projecta.apiDataR()//요청