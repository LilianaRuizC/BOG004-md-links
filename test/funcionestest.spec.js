const routeAbsolute = require('../functions.js').routeAbsolute;
const listMDfiles= require('../functions.js').listMDfiles;
const getLinksInfo = require('../functions.js').getLinksInfo;

  describe("path", () => {
    it("es una función", () => {
      expect(typeof routeAbsolute).toBe("function");
    });
  
   it("recibe una ruta relativa y la convierte a absoluta", () => {
      let userRouteTest = 'directorioprueba';
      let result = 'C:\\Users\\LABORATORIA\\Documents\\proyectos\\BOG004-md-links\\directorioprueba'
      return expect(routeAbsolute(userRouteTest)).toEqual(result);
    });
  });

  describe('lista archivos md en array',()=>{
    it("recibe una ruta, recorre y encuentra archivos .md,entonces almacena en array", () => {
      let userDirectoryRoute = 'directorioprueba'
      let result = [
        'directorioprueba\\arch1deldirectorio.md',  
        'directorioprueba\\arch2deldirectorio.md'
      ]
      return expect(listMDfiles(userDirectoryRoute)).toEqual(result);
    });
  })
    describe('valida los archivos md encuentra links y los almacena en objeto',() =>{
      it('getLinksInfo retorna un objeto',()=> {
        let arrayTest = [
          'C:\\Users\\LABORATORIA\\Documents\\proyectos\\BOG004-md-links\\directorioprueba/arch1deldirectorio.md',
          'C:\\Users\\LABORATORIA\\Documents\\proyectos\\BOG004-md-links\\directorioprueba/arch2deldirectorio.md'
        ];
        let objectExpect = [
          {
            href: 'https://www.youtube.com/watch?v=Te7Qub9NCyk',
            text: 'MODE ANI, TE AGRAEZCO',
            file: 'C:\\Users\\LABORATORIA\\Documents\\proyectos\\BOG004-md-links\\directorioprueba/arch1deldirectorio.md'
          },
          {
            href: 'https://www.youtube.com/watch?v=6RCKdaRUJss',
            text: 'Sonido shofar',
            file: 'C:\\Users\\LABORATORIA\\Documents\\proyectos\\BOG004-md-links\\directorioprueba/arch2deldirectorio.md'
          }
        ]
      return getLinksInfo(arrayTest).then((respuesta)=> {
        expect(respuesta).toEqual(objectExpect)

      })

    });
  })