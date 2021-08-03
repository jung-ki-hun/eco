-- FOREIGN KEY REFERENCES
CREATE SCHEMA 'projectb' DEFAULT CHARCTER SET utf8;

CREATE TABLE projecta.users(
    user_id INT NOT NULL AUTO_INCREMENT,
    userName VARCHAR(20) NOT NULL,
    email VARCHAR(255) NOT NULL,
    pw VARCHAR(255) NOT NULL,
    UNIQUE KEY email_idx(email),
    PRIMARY KEY(user_id)
)default character set utf8 collate utf8_general_ci; --사용자 정보 테이블
CREATE TABLE projecta.users_level(
    level_id INT NOT NULL AUTO_INCREMENT,
    user_id INT FOREIGN KEY REFERENCES NOT NULL,
    PRIMARY KEY(level_id)
)default character set utf8 collate utf8_general_ci;--권한 테이블 
CREATE TABLE projecta.login_log(
    ll_no int NOT NULL AUTO_INCREMENT,
    user_id INT FOREIGN KEY REFERENCES NOT NULL,
    log_time TIMESTAMP,
    PRIMARY KEY(ll_no)
)default character set utf8 collate utf8_general_ci;--로그인 기록
CREATE TABLE projecta.logstack(
    id BIGINT NOT NULL AUTO_INCREMENT,
    errCord VARCHAR(30) NOT NULL,
    content VARCHAR(200) NOT NULL,
    errTime TIMESTAMP NOT NULL,
    PRIMARY KEY(id)
)default character set utf8 collate utf8_general_ci;--에러로그
-- CREATE TABLE projecta.data_log(
--     dl_no int NOT NULL AUTO_INCREMENT,
--     user_id  INT FOREIGN KEY REFERENCES NOT NULL,
--     sa_no INT NOT NULL
--     PRIMARY KEY(dl_no)
-- )default character set utf8 collate utf8_general_ci;--데이터 저장용
-- CREATE TABLE projecta.QnAdata(
--     id INT NOT NULL AUTO_INCREMENT,
--     -- userName VARCHAR(20) NOT NULL,
--     user_id INT FOREIGN KEY REFERENCES NOT NULL,
--     title VARCHAR(300) NOT NULL,
--     postData TEXT NOT NULL,
--     PRIMARY KEY(id)
-- )default character set utf8 collate utf8_general_ci;