#!/usr/bin/env node
const {
  clc,
  routeAbsolute,
  listMDfiles,
  getLinksInfo,
} = require('./functions')

const {
  validateOption,
  statOption,
  statValidateOption,
} = require('./cli')
//AQUI DECLARO LAS CONSTANTES NECESARIAS PARA CAPTURAR LO ESCRITO EN CONSOLA
const [, ,route, ...optionsUser] = process.argv;
const validate =optionsUser.includes('--v') || optionsUser.includes('--validate')? true : false;
const stats= optionsUser.includes('--s')|| optionsUser.includes('--stats') ? true : false;


// *******FUNCION MDLINKS VERSION 2*****
const mdLinks=(path,options) => {
        return new Promise ((resolve, reject) => {
         //pasar ruta a absoluta
         let myRoute = routeAbsolute(path);
         //array de mdfiles
         const myMDfiles = listMDfiles(myRoute);

         if (!options.validate && !options.stats){
             getLinksInfo(myMDfiles)
             .then(data => resolve (data))
             .catch(err => reject (err))
         } else if (options.validate && options.stats){
             statValidateOption(myMDfiles)
             .then(data => resolve(data))
             .catch (err => reject(err))
         } else if(options.validate){
             validateOption (myMDfiles)
             .then(data => resolve (data))
             .catch(err => reject (err))
         } else if (options.stats){
             statOption (myMDfiles)
             .then(data => resolve (data))
             .catch (err => reject (err))
         }
     })

}
mdLinks(route,{validate,stats})
.then(data => console.log (data))
.catch(error => console.log(error))

module.exports={mdLinks}
// función mdLinks
/*const mdLinks = (array, options) => {
  if(options == '--validate'){
      return new Promise((resolve, reject) => {
          validateOption(array)
          .then(data => resolve(console.log(clc.magentaBright(`
          ¯¨'*•~-.¸¸,.-~*'(LINKS VALIDADOS )¯¨'*•~-.¸¸,.-~*' 
          `),
          data)))
          .catch(err => reject(err))
      })
  } else if(options == '--stats'){
      return new Promise((resolve, reject) => {
          statOption(array)
          .then(data => resolve(console.log(clc.magentaBright(`
          ¯¨'*•~-.¸¸,.-~*'ESTADISTICAS DE  LINKS )¯¨'*•~-.¸¸,.-~*' 
          `))
          ,console.table(data)))
          .catch(err => reject(err))
      })
  } else if(options.includes('--validate' && '--stats')){
      return new Promise((resolve, reject) => {
          statValidateOption(array)
          .then(data => resolve(console.log(clc.magentaBright(`
          ¯¨'*•~-.¸¸,.-~*'(VALIDACION Y ESTADISTICAS )¯¨'*•~-.¸¸,.-~*
          `))
          ,console.table(data)))
          .catch((err)=> reject(err))
      })
  } else {
      return new Promise((resolve, reject) => {
          getLinksInfo(array)
              .then(data => resolve(console.log(clc.magentaBright(`
              ¯¨'*•~-.¸¸,.-~*'(LINKS HALLADOS )¯¨'*•~-.¸¸,.-~*' 
              `),
              data)))
              .catch(err => reject(err))
      })
  }
}*/

