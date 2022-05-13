const {mdLinks} = require ('../index2.js')

describe ('función mdlinks',() =>{
    it ('es una función', () =>{
        expect (typeof mdLinks).toBe('function')
    })
    const testRoute= 'directorioprueba'
    it('probando mdlinks con opción false',( done)=> {
        mdLinks(testRoute,{validate:false, stats:false}).then((respuesta)=>{
            const resultado= [
                {
                  href: 'https://www.youtube.com/watch?v=Te7Qub9NCyk',
                  text: 'MODE ANI, TE AGRAEZCO',
                  file: 'C:\\Users\\LABORATORIA\\Documents\\proyectos\\BOG004-md-links\\directorioprueba\\arch1deldirectorio.md'
                },
                {
                  href: 'https://www.youtube.com/watch?v=6RCKdaRUJss',
                  text: 'Sonido shofar',
                  file: 'C:\\Users\\LABORATORIA\\Documents\\proyectos\\BOG004-md-links\\directorioprueba\\arch2deldirectorio.md'
                }
              ];
            expect(respuesta).toEqual(resultado)  
            done()
        }) 
    })
    it('probando mdlinks con opción true',( done)=> {
        mdLinks(testRoute,{validate:true, stats:false}).then((respuesta)=>{
            const resultado= [
                {
                  href: 'https://www.youtube.com/watch?v=Te7Qub9NCyk',
                  text: 'MODE ANI, TE AGRAEZCO',
                  file: 'C:\\Users\\LABORATORIA\\Documents\\proyectos\\BOG004-md-links\\directorioprueba\\arch1deldirectorio.md',
                  status: 200,
                  statusText: 'OK'
                },
                {
                  href: 'https://www.youtube.com/watch?v=6RCKdaRUJss',
                  text: 'Sonido shofar',
                  file: 'C:\\Users\\LABORATORIA\\Documents\\proyectos\\BOG004-md-links\\directorioprueba\\arch2deldirectorio.md',
                  status: 200,
                  statusText: 'OK'
                }
              ]
            expect(respuesta).toEqual(resultado)  
            done()
        }) 
    })

    it('probando mdlinks con opción true los dos',( done)=> {
        mdLinks(testRoute,{validate:true, stats:true}).then((respuesta)=>{
            const resultado= { Total: 2, Unique: 2, Broken: 0 }
            expect(respuesta).toEqual(resultado)  
            done()
        }) 
    })
})