--postgresql
CREATE TABLE projecta.users(
    user_id SERIAL NOT NULL,
    userName VARCHAR(20) NOT NULL,
    email VARCHAR(255) NOT NULL,
    pw VARCHAR(255) NOT NULL,
    UNIQUE KEY email_idx(email),
    PRIMARY KEY(user_id)
)default character set utf8 collate utf8_general_ci; --사용자 정보 테이블
CREATE TABLE projecta.users_level(
    level_id SERIAL NOT NULL,
    user_id INT FOREIGN KEY REFERENCES NOT NULL,
    PRIMARY KEY(level_id)
)default character set utf8 collate utf8_general_ci;--권한 테이블 
CREATE TABLE projecta.login_log(
    ll_no SERIAL NOT NULL,
    user_id INT FOREIGN KEY REFERENCES NOT NULL,
    log_time TIMESTAMP,
    PRIMARY KEY(ll_no)
)default character set utf8 collate utf8_general_ci;--로그인 기록
CREATE TABLE projecta.logstack(
    log_id SERIAL NOT NULL,
    errCord VARCHAR(30) NOT NULL,
    content VARCHAR(200) NOT NULL,
    errTime TIMESTAMP NOT NULL,
    PRIMARY KEY(log_id)
)default character set utf8 collate utf8_general_ci;--에러로그