CREATE SCHEMA 'projecta' DEFAULT CHARCTER SET utf8;

CREATE TABLE projecta.users(
    user_id INT NOT NULL AUTO_INCREMENT,
    userName VARCHAR(20) NOT NULL,
    email VARCHAR(255) NOT NULL,
    pw VARCHAR(255) NOT NULL,
    sex VARCHAR(10) NOT NULL,
    age int NOT NULL,
    town VARCHAR(20) NOT NULL,
    UNIQUE KEY email_idx(email),
    PRIMARY KEY(user_id)
)default character set utf8 collate utf8_general_ci;

CREATE TABLE projecta.misea(
    misea_no int NOT NULL AUTO_INCREMENT,
    api_no INT NOT NULL,
    station VARCHAR(40) NOT NULL,
    bad_time TIMESTAMP NOT NULL,
    PRIMARY KEY(misea_no)
)default character set utf8 collate utf8_general_ci;

CREATE TABLE projecta.apiDataR(
    api_no INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    misea_no INT NOT NULL,
    pm10Value VARCHAR(30) NOT NULL,
    n_time TIMESTAMP NOT NULL,
    PRIMARY KEY(api_no)
)default character set utf8 collate utf8_general_ci;
CREATE TABLE projecta.colers_list(
    col_no int NOT NULL AUTO_INCREMENT,
    coler VARCHAR(30) NOT Null,
    rgb VARCHAR(20) NOT NULL,
    PRIMARY KEY(col_no)

)default character set utf8 collate utf8_general_ci;
CREATE TABLE projecta.sendair(
    sa_no int NOT NULL AUTO_INCREMENT,
    user_id  INT NOT NULL,
    col_no int,
    temp  VARCHAR(10) NOT NULL,
    hiep VARCHAR(10) NOT NULL,
    coler VARCHAR(30) NOT NUll,
    state_air INT NOT NULL --0 off 1 on 2 (2off) 3mon 4 aon 5 (2on)
    PRIMARY KEY(sa_no)
)default character set utf8 collate utf8_general_ci;
CREATE TABLE projecta.data_log(
    dl_no int NOT NULL AUTO_INCREMENT,
    user_id  INT NOT NULL,
    sa_no INT NOT NULL
    PRIMARY KEY(dl_no)
)default character set utf8 collate utf8_general_ci;
CREATE TABLE projecta.login_log(
    ll_no int NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    log_time TIMESTAMP,
    PRIMARY KEY(dl_no)
)default character set utf8 collate utf8_general_ci;
-- CREATE TABLE projecta.QnAdata(
--     id INT NOT NULL AUTO_INCREMENT,
--     userName VARCHAR(20) NOT NULL,
--     title VARCHAR(300) NOT NULL,
--     postData TEXT NOT NULL,
--     PRIMARY KEY(id)
-- )default character set utf8 collate utf8_general_ci;
-- CREATE TABLE projecta.logstack(
--     id BIGINT NOT NULL AUTO_INCREMENT,
--     errCord VARCHAR(30) NOT NULL,
--     content VARCHAR(200) NOT NULL,
--     errTime TIMESTAMP NOT NULL,
--     PRIMARY KEY(id)
-- )default character set utf8 collate utf8_general_ci;
-- CREATE TABLE projecta.users_community(
--     id INT NOT NULL AUTO_INCREMENT,
--     userName VARCHAR(20) NOT NULL,
--     friendName VARCHAR(20) NOT NULL,
--     community VARCHAR(5)NOT NULL,
--     PRIMARY KEY(id)
-- )
-- CREATE TABLE projecta.apiDataR()//요청

-- CREATE TABLE projecta.apiDataR()//요청