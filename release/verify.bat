@echo off
set SEXE=LC2CRC.exe
set TFILE=~.crc.csv
set OUTFILE=.crc.csv
cls
echo.>%OUTFILE%
dir /b /s *.* /B /S > %TFILE%
for /f "delims=#" %%x in (%TFILE%) do (
rem "%SEXE%" x -y -o"%%~dx%%~px" "%%x" >> %OUTFILE%
echo "%SEXE%" "%%x" "%%x.crc"
"%SEXE%" "%%x" "%%x.sfv"
call type "%%x.sfv" >> %OUTFILE%
)
@echo on