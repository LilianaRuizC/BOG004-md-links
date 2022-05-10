const [, ,route, ...options] = process.argv;

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

// convierto la ruta en absoluta
let Route = routeAbsolute(route);

// obtengo array de mdFiles
const myMDfiles = listMDfiles(myRoute);

// función mdLinks
const mdLinks = (array, options) => {
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
}

mdLinks(myMDfiles, options)
.then(data => data)
.catch(error => console.log(error))