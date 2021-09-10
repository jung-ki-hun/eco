REM 참고 https://www.taknim.com/index.php?mid=board_tip&document_srl=1840
REM batch파일 사용법 
REM "test.bat start" 시작
REM "test.bat stop" 종료
REM "test.bat restart" 재시작 (종료후 시작)
REM "test.bat reload" 재로딩 (변수값들 로딩)
REM "test.bat kill" 강제종료

:init

:Condition
IF "%1"=="" GOTO Error
IF "%1"=="start" GOTO Start
IF "%1"=="stop" GOTO Stop
IF "%1"=="restart" GOTO Stop
IF "%1"=="reload" GOTO Reload
IF "%1"=="kill" GOTO Kill
GOTO Error

:Start
START /B nginx.exe
ECHO nginx is started.
GOTO End

:Stop
nginx.exe -s stop
ECHO nginx is stopped.
IF "%1" == "restart" GOTO Start
GOTO End

:Reload
nginx.exe -s reload
ECHO nginx is reloaded.
GOTO End

:Kill
TASKKILL /F /IM nginx.exe
ECHO nginx is killed.
GOTO End

:Error
ECHO Error! Invalid Parameter.

:End