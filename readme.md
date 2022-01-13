This is a description of student node project. 
We have frontend (index.html + upload.js + source folder for index page images).
Index page has a form, able to accept files (images needed);
Also, there's a server, showing this frontend.
When we load new pic via form, it flies through POST request to server,
server writes it into a file (using stream, pipe) and puts into folder.
Also, frontend changes source path of index-page-image to new loaded file.
note: front pic change isn't successful at all time - i suspect some inconsistency 
b/w operatons of writing file to folder and changing source path of index-page-image.


