document
    .querySelector('#upload')
    .addEventListener('change', uploadFile)


function uploadFile(event) {
    let target = event.target || event.srcElement || event.currentTarget; //кроссбраузерность
    let file = target.files[0];

    let xhr = new XMLHttpRequest();

    xhr.open('POST', '/uploads/'+file.name, true);
    xhr.setRequestHeader('Content-Type', 'application/octet-stream');

    xhr.onreadystatechange = function (){
        event = null;
        if(xhr.readyState === 4){
            if(xhr.status === 200){
                callbackFunction(this.responseText)
            }
            else {
                console.log('error')
            }
        }
    }
        console.log(`----------перед xhr.send: ${new Date().getMinutes()} мин ${new Date().getSeconds()} сек ${new Date().getMilliseconds()} МС`)
    xhr.send(file);
        console.log(`----------после xhr.send: ${new Date().getMinutes()} мин ${new Date().getSeconds()} сек ${new Date().getMilliseconds()} МС`)
    event.target.value = ''
}

function callbackFunction(data){
    console.log('incoming text in Callback = ',data);

    //находим элемент картинки на странице
    let iconImage = document.querySelector('.icon-image');

    // указываем ей источник - путь к новому файлу, сохранённому в images
    // ИЗОБРАЖЕНИЯ ПРОГРУЗИТЬСЯ НЕ УСПЕВАЮТ
    // потому что новый сорс предписан раньше, чем файл появляется в папке??
    console.log(`----------перед iconImage.src: ${new Date().getMinutes()} мин ${new Date().getSeconds()} сек ${new Date().getMilliseconds()} МС`)
    iconImage.src = "./images/"+data;
    console.log(`----------перед iconImage.src: ${new Date().getMinutes()} мин ${new Date().getSeconds()} сек ${new Date().getMilliseconds()} МС`)

    // тут мы пишем имя файла в скрытое поле формы для дальнейших манипуляций
    document.querySelector('input[name=imagename]').value = data;

}


