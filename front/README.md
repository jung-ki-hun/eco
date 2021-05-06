Branch - lee_front
===
Summary
---
+ Title - "인제 간단하죠"
   
+ Purpose - "원격 강의로 인해 발생되는 부족한 의사소통으로 유발된 질문을 빠르고 상세하게 답변하기 위함."

+   Developer
    + Email - Byungjin.dev@gmail.com    
    + Language : CSS, HTML, JavaScript, C etc..
   
+ Front Language
    + HTML
    + CSS
    + JavaScript(vainilla)
   
+ Pattern
    + MVC
   
Page
---
(a) : For Admin

+   default
    +   CSS
        + default.css - 기본 배경색, 분위기
        + reset.css - 기본 여백 등 초기화

+   Question_board
    + 질문 게시판        
   
+   View_detail
    + 질문 혹은 답변 세부 확인
   
+   Answer_board
    + 답변 게시판
   
+   Login
    + 로그인
   
+   Register
    + 회원가입
   
+   Question_write
    + 답변 작성
   
+   Anwser_write(a)
    + 질문 작성
   
+   Member_board(a)
    + 가입자 확인 및 관리
   
+   Revise
    + 질문 혹은 답변 수정
   
Commit Log
---
 +  Developer : Byungjin.dev@gmail.com
 +  commit
    + 1.0.1 
        + created workspace 'front'
        + created html 'question_board'
        + created html 'answer_board'
    + 1.0.2
        + creted folders for MVC
        + updated README.md
    + 1.1.0
        + created Page(default)
            + created App
            + creating View(Login)
            + creating Controller(default)
    + 1.1.1
        + created Model(DataCollector.js)
            + tested Fetch in LocalHost using LocalCom
            + Improved CSS Design
        + created BoardView(Board.js)
            + BoardView is base for other Question/Answer Board
            + Imporved jsdoc
        + "Warning!!"
            + delete Test Model(LocalCom.js / App) later...