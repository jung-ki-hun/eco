개요			                	    파일명                                    코드명

로그인페이지			            login.html                              KIUP-3
관리자로그인페이지		            adminlogin.html                    KIUP-4
랜딩페이지 			            index.html                              KIUP-5
게시판리스트페이지		            boardMain.html                     KIUP-6
관리자버전게시판리스트페이지	    adminboardMain.html           KIUP-7
게시글작성페이지			    boardAdd.html                       KIUP-8
게시글확인페이지			    boardLook.html                      KIUP-9

> 테스트페이지는 언더바(_) 로 구분해놓음.
>
> http://180.83.98.139:4000 뒤에다가 주소 추가해서 드가기
>
> /api/v1/user/context/test
>
> /api/v1/user/login/test
>
> 404 페이지만들기
>
> 500 페이지만들기
>
> Ajax 페이지 잡기(데이터들) echo써서

필드명, 파라미터 정리



게시판
number	
title	
id	
username	
time	

게시글보기
number	
title	
id	
username	
time	
content	

답글
c_id	
c_username	
c_time	
c_comment	

로그인
email	
password	

http://서버주소/login?email=123@naver.com&&password=123123