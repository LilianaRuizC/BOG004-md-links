// En este archivo van las funciones a usar
const fs = require('fs');
var path = require('path');
var clc = require('cli-color');
const { promisify } = require('util');
const { resolve } = require('path');
const axios = require('axios').default;

// función para convertir ruta relativa en absoluta
const routeAbsolute = (userRoute) => {
    if(!fs.existsSync(userRoute)){
        console.log(clc.red(`███▓▒░░La ruta ingresada no es valida░░▒▓███  

       `));
        process.exit()
    }
    if(path.isAbsolute(userRoute)){
        return userRoute;
    }
    else {
        const absolPath = path.resolve(userRoute)
        return absolPath;
    }
};

// función recursiva para enlistar los archivos.md de un directorio en un array
// si se ingresa un archivo.md solo muestra el archivo

const listMDfiles = (userRoute) => {
    let MDfilesArray = [];
    if(fs.statSync(userRoute).isFile() && path.extname(userRoute) === '.md'){
        MDfilesArray.push(userRoute);
    }
    else if(fs.statSync(userRoute).isDirectory()){
        const closeDirectory = userRoute;
        let openDirectory = fs.readdirSync(closeDirectory);
        openDirectory.forEach(elem => {
            listMDfiles(userRoute + '/' + elem).forEach(elem => {
                MDfilesArray.push(elem);
            })
        })
    }
    if(MDfilesArray.length === 0){
        console.log(clc.red(`███▓▒░░No hay archivos Markdown░░▒▓███  
         `))
        process.exit()
    }
    return MDfilesArray;
};

// promesa de lectura de archivos

const readMDfiles = (mdFile) => {
    return new Promise((resolve, reject) => {
        fs.promises.readFile(mdFile, 'utf-8')
        .then(resp => resolve({
            fileContent : resp,
            route : mdFile
        }))
        .catch(() => reject('Error del readFile al leer el archivo'))
    })
}

// empezamos con la promesa para leer los archivos que están en el MDfilesArray

const getLinksInfo = (array) => {
    let linksArray = []; //array para enlistar los links
    let routeArray = []; //array para enlistar la ruta de los archivos.md
    let resultObjArray = []; //este será mi resultado
    return new Promise((resolve,reject) => {
        Promise.all(array.map(readMDfiles)) //aplica readMDfiles a cada elem de MDfilesArray
        .then(data => {
            const expLink = /!*\[(.+?)\]\((.+?)\)/gi;
            data.forEach(item => {
                const matchLinks = [... item.fileContent.toString().match(expLink)];
                matchLinks.forEach(link => {
                    linksArray.push(link);
                    routeArray.push(item.route)
                });
            })
            resultObjArray = linksArray.map((totalLink) => {
                let index = linksArray.indexOf(totalLink);
                const splitLink = totalLink.split('](');
                const text = splitLink[0].slice(1);
                const href = splitLink[1].slice(0, -1);
                            
                return {
                    href,
                    text,
                    file : routeArray[index]
                    }
            })
            resolve(resultObjArray)})
        .catch((err) => reject('Error del getLinks',err))
    })
} 
//peticion http con axios, la respuesta de axios es extensa, por eso se usa res.status para traer solo eso.
const validateHttp = (url, text, file ) => {
  return new Promise((resolve, reject) => {
      axios.get(url)
      .then(res => resolve({
         href : url,
         text : text,
         file : file,
         status : res.status,
         statusText: res.statusText
      }))
      .catch((error)=> {
        reject({
        href : url,
        text : text,
        file : file,
        status : error.response.status,
        statusText :error.response.statusText,
    })}
      
        )
  })
}

module.exports = {
    routeAbsolute,
    listMDfiles,
    getLinksInfo,
    validateHttp,
    clc
}