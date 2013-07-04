@echo off

echo css�ļ���ʼ����
copy ..\src\cssreset\css\cssreset.css+..\src\cssfonts\css\cssfonts.css+..\src\csslayout\css\csslayout.css cSun.css /b
copy ..\src\cssbase\css\cssbase.css+..\src\list\css\list.css+..\src\searcher\css\searcher.css+..\src\nav\css\nav.css+..\src\table\css\table.css+..\src\article\css\article.css+..\src\chart\css\chart.css+..\src\form\css\form.css+..\src\binarypad\css\binarypad.css+..\src\wizard\css\wizard.css cWidget.css /b
copy ..\src\list\css\list.theme.css+..\src\searcher\css\searcher.theme.css+..\src\nav\css\nav.theme.css+..\src\table\css\table.theme.css+..\src\article\css\article.theme.css+..\src\chart\css\chart.theme.css+..\src\form\css\form.theme.css+..\src\binarypad\css\binarypad.theme.css+..\src\wizard\css\wizard.theme.css tWidget.css /b
copy ..\src\cssfonts\css\cssfonts.site.css+..\src\sitelogo\css\sitelogo.css cSite.css /b
echo css�ļ��������

echo ѹ��css�ļ�
java -jar yuicompressor-2.4.7.jar cSun.css -o cSun.min.css
java -jar yuicompressor-2.4.7.jar cWidget.css -o cWidget.min.css
java -jar yuicompressor-2.4.7.jar tWidget.css -o tWidget.min.css

rem ����prototype
echo prototype-lang�ļ���ʼ����
copy ..\src\jslang\prototype\object.js+..\src\jslang\prototype\function.js+..\src\jslang\prototype\enumerable.js+ ..\src\jslang\prototype\array.js+..\src\jslang\prototype\class.js+..\src\jslang\prototype\date.js+..\src\jslang\prototype\regexp.js+..\src\jslang\prototype\periodical_executer.js+..\src\jslang\prototype\string.js+..\src\jslang\prototype\template.js+..\src\jslang\prototype\hash.js+..\src\jslang\prototype\number.js+..\src\jslang\prototype\range.js ..\src\jslang\prototype-lang.js /b
echo prototype-lang�ļ��������

copy ..\lib\yepnope.min.js+..\src\jslang\prototype-lang.js+..\src\jslang\hashmap\js\hashmap.js+..\src\jslang\event\js\event.js+..\src\jslang\eventlisteneradapter\js\eventlisteneradapter.js+..\src\core\js\core.js+..\src\element\js\element.js+..\src\view\js\view.js+..\src\page\js\page.js jClass.js /b
java -jar yuicompressor-2.4.7.jar jClass.js -o jClass.min.js

copy ..\src\list\js\list.js+..\src\chart\js\chart.js+..\src\binarypad\js\binarypad.js+..\src\wizard\js\wizard.js jWidget.js /b
java -jar yuicompressor-2.4.7.jar jWidget.js -o jWidget.min.js

pause









