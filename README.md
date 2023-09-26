# MD Links
![md-links](MDLinks.gif)
## Índice

* [1. Introduccion](#1-Introduccion)
***

## 1. Introduccion

[Markdown](https://es.wikipedia.org/wiki/Markdown) es un lenguaje de marcado
ligero muy popular entre developers. Es usado en
muchísimas plataformas que manejan texto plano (GitHub, foros, blogs, etc.) y
es muy común encontrar varios archivos en ese formato en cualquier tipo de
repositorio (empezando por el tradicional `README.md`).

Estos archivos `Markdown` normalmente contienen _links_ (vínculos/ligas) que
muchas veces están rotos o ya no son válidos y eso perjudica mucho el valor de
la información que se quiere compartir.

Dentro de una comunidad de código abierto, nos han propuesto crear una
herramienta usando [Node.js](https://nodejs.org/), que lea y analice archivos
en formato `Markdown`, para verificar los links que contengan y reportar
algunas estadísticas.

## 9. Para pedir project feedback

* [ ] Un board en github projects con el backlog para la implementación de la
  librería.

* [ ] un `README.md` con documentación técnica de la librería y una guía de
  uso e instalación de la librería.

* [ ] un API `mdLinks(path, validate)` con los siguientes requisitos
  (Hito 1 y 2 son los mínimos):

  - El módulo debe exportar una función que cumpla con la interfaz (API)
    requerida. (Hito 1)
  - Deberá implementar el soporte para archivos individuales. (Hito 1)
  - Deberá implementar la funcionalidad de validación. (Hitos 1 y 2)
  - Deberá ofrecer soporte para directorios. (Hitos 1 al 3)
  - Deberá ofrecer soporte para directorios que pueden contener otros
    directorios. (Hitos 1 al 5)

* [ ] un CLI (Command Line Interface) que se ejecuta sin errores
  y tiene el output esperado. Además acepta los parámetros
  `--validate` y `--stats`. Y expone un ejecutable
  md-links en el path (configurado en el `package.json`)
* [ ] Pasa tests y linters (`npm test`). Tests unitarios cubren un mínimo
  del 70% de coverage tests, es decir statements, functions, lines y branches.
