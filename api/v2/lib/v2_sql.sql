CREATE TABLE users_level(
    level_id SERIAL NOT NULL,
    user_id SERIAL REFERENCES users(user_id),
    level_u int NOT NULL,
    PRIMARY KEY(level_id)
);--권한 테이블 
CREATE TABLE login_log(
    ll_no SERIAL NOT NULL,
    user_id SERIAL REFERENCES users(user_id),
    log_time TIMESTAMP,
    PRIMARY KEY(ll_no)
);--로그인 기록
CREATE TABLE logstack(
    log_id SERIAL NOT NULL,
    errCord VARCHAR(30) NOT NULL,
    content VARCHAR(200) NOT NULL,
    errTime TIMESTAMP NOT NULL,
    PRIMARY KEY(log_id)
);--에러로그
--편집후 wiki table make