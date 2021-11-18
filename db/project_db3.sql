--postgresql
CREATE TABLE users(
    user_id SERIAL NOT NULL,
    userName VARCHAR(20) NOT NULL,
    email VARCHAR(255) NOT NULL,
    pw VARCHAR(255) NOT NULL,
    UNIQUE (email),
    PRIMARY KEY(user_id)
); --사용자 정보 테이블
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

----------------
---- j게시판 -----
----------------
CREATE TABLE noticej(
    noj_id SERIAL NOT NULL,
    title VARCHAR(1000) NOT NULL,
    content text NOT NULL,
    createtime TIMESTAMP NOT NULL,
    viewcount int not null,
    comments int not null,
    imagefilename VARCHAR(1000),
    editer VARCHAR(100) NOT NULL,
    PRIMARY KEY(noj_id)
);--게시판
CREATE TABLE commandj(
    cmj_id SERIAL NOT NULL,
    c_editer VARCHAR(100) NOT NULL,
    noj_id SERIAL REFERENCES noticej(noj_id),
    createtime TIMESTAMP NOT NULL,
    content TEXT,
    PRIMARY KEY(cmj_id)
);--뎃글
----------------
---- q게시판 -----
----------------
CREATE TABLE noticeq(
    noq_id SERIAL NOT NULL,
    title VARCHAR(1000) NOT NULL,
    content TEXT NOT NULL,
    createtime TIMESTAMP NOT NULL,
    viewcount int not null, --조회수
    comments int not null,  --뎃글수
    imagefilename VARCHAR(1000),
    editer VARCHAR(100) NOT NULL,
    PRIMARY KEY(noq_id)
);--게시판
CREATE TABLE commandq(
    cmq_id SERIAL NOT NULL,
    c_editer VARCHAR(100) NOT NULL,
    noq_id SERIAL REFERENCES noticeq(noq_id),
    createtime TIMESTAMP NOT NULL,
    content TEXT,
    PRIMARY KEY(cmq_id)
);--뎃글