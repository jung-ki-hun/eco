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
        + created BoardView(Board.js)
            + BoardView is base for other Question/Answer Board
            + Improved jsdoc
        + "Warning!!"
            + delete Test Model(LocalCom.js / App) later...
   
    + 1.2.0
        + renamed LoginView.js -> HeaderView.js
        + created InnerView.js
            + This is page area.
        + Improved HeaderView.js
        + created PageModel.js
            + this make page to other page
        + Improved DefaultController.js
        + Improved jsdoc
        + Deleted Test Model(LocalCom.js / App)...

    + 1.2.1
        + Improved READMD.md
   
    + 1.3.0
        + created View(ScrollView.js)
            + saved data about Scroll
                + totalHeight
                + screenHeight
                + currentScroll(=Height)
            + controll Scrollbar
                + displayed Special Scrollbar
                + go to position
        + created View(LandingView.js)
            + registered Event(@click)
                + scroll to contentWrapper
            + will register other Event
        + deleted Scrollbar(default)
            + replaced Special ScrollBar(ScrollView.js)
        + Improved CSS Design & HTML Structure
       
    + 1.3.1
        + created _origin
            + For super(parent Class)
                + View.js
                + Model.js
                + Controller.js
        + Improved View & Model & Controller
            + added Function
                + push(content) - display 'content' in console.
                + get(specifier) - get HTMLElement in Document using 'specifier'. (Only Controller)
        + created MVC Folder
            + Login MVC(.js)
                + LoginModel
                + LoginView
                + LoginController
   
    + 1.3.2
        + Improved JS File Structure
    
    + 1.4.0
        + Fixed Error
            + View.js Condition Error - get()
        + Improved Scrollbar
            + changed ScreenData Structure
                + deleted currentHeight
                + deleted previousHeight
                + deleted rate
            + changed ScrollingData Structure
                + added currentPosition
                + added previousPosition
                + added rate
                + added direction
        + Improve CSS
            + About HeaderView
            + About InnerView
        + HTML Structure
            + changed Logo Structure
                + deleted Big&Small Logo Style
                + merged Logo Style(Big/Small) to Inner
        + created folder(login)
            + created Login CSS
   
    + 1.4.1
        + Improved READMD.md
   
    + 1.5.0
        + Improved ScrollView.js
            + JS Structure
                + ScrollingData
                    + created 'delta'
            + Scrolling Speed
                + not linear
                + ease in
        + Improved CSS
            + responsive Width
                + width:550px - inner width : 360px
        + Improved Model.js
            + async/await
                + created sentRequest function
                + remaked message function
                + created processResponse function  
                + created callback function
                + deleted callBackFn function
                + deleted onGet function
   
    + 1.5.1
        + Improved Model.js
            + URL -> URL + TYPE
        + Improved LoginView.js
            + created LoginData Object
            + created LoginElements Object
        + Improved DefaultController.js
            + onGetData Function
                + appendScript for running Script
        + Improved InnerView.js
            + created appendScript for running Script