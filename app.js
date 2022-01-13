const fs = require('fs');
const path = require('path');
const http = require('http');

//сервер
const server = http
    .createServer((req,res) => {
        console.log(`req url = ${req.url}`);
        //корень /
        if(req.url === '/'){
            sendRes('index.html','text/html',res);
        }
        //uploads+
        else if (/\/uploads\/[^\/]+$/.test(req.url) && req.method === 'POST'){
            console.log(`Сработал upload files`);
            saveUploadFile(req,res);
        }
        //статика (папка static) - css, картинки, js
        //читаем запросы - они могут быть разные - выдаём ответ
        else {
            sendRes(req.url,getContentType(req.url),res);
        }

    })
    .listen(3130,()=>{
    console.log('Server started at 3130')
})

//отправка ресурсов - отправляет index.html, связанные стили, иконки
function sendRes(url, contentType, res){
    let file = path.join(__dirname+'/static/',url); //полный путь к файлам в папке static
    console.log('let file from function sendRes = ', file);//--------------------------------------------------

    fs.readFile(file,(err,content)=>{
        if(err){
            res.writeHead(404);
            res.end('File not found');
            console.error(`Trouble with readFile:${file} in sendFile`,err);
        }
        else{
            res.writeHead(200,{'Content-Type':contentType});
            res.write(content);
            res.end();
            console.log(`res 200:${file}`)
        }
    })

}

// функция-помогай для sendRes
// определяем, что к нам прилетело и возвращаем тип его контента (MIME)

function getContentType(url){
    switch (path.extname(url)){
        case ".js":return 'text/javascript';
        case ".css":return 'text/css';
        case ".html":return 'text/html';
        case ".json":return  'application/json';
        default:return 'application/octet-stream';
    }
}

//сохранение файла - РАЗОБРАТЬСЯ, ЧТО ОНА ДЕЛАЕТ ДЕТАЛЬНО
function saveUploadFile(req,res){
    let fileName = path.basename(req.url);
    let fileFullPath = path.join(__dirname, '/uploads/',fileName);
    let fileInImagesFolder = path.join(__dirname,'static/images',fileName);

    console.log(`fileName = ${fileName}\n file = ${fileFullPath} \n imageFolder = ${fileInImagesFolder}`)

    req.pipe(fs.createWriteStream(fileFullPath)); //поток данных из пришедших в запросе -> в запись
    req.on('end',()=>{
        fs.copyFile(fileFullPath, fileInImagesFolder, (err)=>{
            console.log(`We write -${fileFullPath}- from req.pipe`)
            if(err){
                console.error('Error with copying file', err);
            }
            //else {
            fs.unlink(fileFullPath, (err)=>{
                console.log(`we delete file ${fileFullPath}`);
                if(err){
                    console.error('Error with deleting file', err);
                }
            })
            //}
        })
        res.writeHead(200, {'Content-Type': 'text'});
        res.write(fileName);
        res.end()
    })
}
