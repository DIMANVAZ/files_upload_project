This is a description of student node project.

We have frontend (index.html + upload.js + source folder for index page images).
Index page has a form, able to accept files (images needed).
Also, there's a server, showing this frontend.
When we load new pic via form, it flies through POST request to server,
server writes it into a file (using stream, pipe) and puts into source folder.
Also, frontend changes source path of index-page-image to new loaded file.
NOTE: front pic change isn't successful at all time - i suspect some inconsistency 
b/w operatons of writing file to folder and changing source path of index-page-image.
--in russian-------
учебный NODE-проект по загрузке файлов с фронта на сервер.
Сервер содержит 
+ index.html + подключенный скрипт upload.js 
+ сопустстующую "вторичку" в папках (среди прочего - /static/images/, 
где лежит картинка для главной страницы).

Сервер отрисовывает всё это дело, а при загрузке картинки через форму - кладёт её в /static/images/.
Скрипт фронта меняет источник картинки src на новый файл, и картинка на index.html меняется.

ВАЖНО: есть рассинхрон между загрузкой файла в папку с серва и обновлением на главной.



