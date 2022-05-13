#LIBRERIA MD-LINKS
___

## 1. DESCRIPCIÓN
Esta es una libreria que puedes usar para validar en tus carpetas y archivos la existencia de archivos tipo  markdown, y dentro de estos validar la existencia, estado y estadísticas de los links.
___
## 2. INSTALACIÓN
Para la instalación de esta libreria digite en la terminal de su editor de código(preferiblemente en git bash) el siguiente comando npm i md-links-lruiz
___
## 3. GUIA DE USO
Para el uso de esta libreria, en tu terminal git bash debes usar el comando mdlinks <'ruta de archivo a analizar'> <options> *(no olvides escribir la ruta entre comillas)*.
######Options
Esta libreria te ofrece 3 opciones:
*validate*: para seleccionar validar puedes usar comandos  --validate ó --v
esta opción validara tus archivos o directorios y al encontrar links  imprime el texto del link encontrado, ubicación del archivo, url, código de estado, y ok. Retorna un objeto como el siguiente: img validate

*stats*: para seleccionar esta opción usa los comandos --stats ó --stats.
esta opción analiza los links hallados y te mostrará estadísticas como links encontrados y links no repetidos, te imprimirá un objeto de la siguiente manera:
img stats

*validate y stats*: para seleccionar las dos opciones usa los comandos --validate --stats ó --v --s, esta opción mostrará la combinación de estas opciones te traerá estadísticas como links encontrados, links sin repetir y los que esten rotos. te imprimirá un objeto asi:
img validate y stats
#### *" " sin opción* :
si no seleccionas ninguna opción y solo pasas la ruta de tu archivo o directorio, entonces te imprimira información básica de los links en un objeto asi:
![](https://i.imgur.com/NACuUmS.png)
___
    
## 4.DESARROLLO DEL PROYECTO

Inicialmente para el desarrollo de la libreria, se creó un diagrama de flujo sobre las funcionalidades de la libreria, y para este proyecto se utilizaron tecnologías como javascript.
 [diagrama de flujo](https://www.figma.com/file/ZbjfEKZwzNJbpHlvBICdoP/FLUJOGRAMA-MD-LINKS?node-id=0%3A)
___
## 5. AUTOR
Angie Liliana Ruiz Ch.
Estudiante Desarrollo web 
Laboratoria BOG 004
mayo 2022
github:https://github.com/LilianaRuizC/BOG004-md-links






