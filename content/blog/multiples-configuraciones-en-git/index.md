---
id: git-config
title: Manejando múltiples configuraciones de git
date: "2020-04-24T20:56:00.000Z"
description: "¿Cómo puedo manejar distintas configuraciones de git dependiendo
el directorio/proyecto en el que estoy trabajando?"
tags: git, configurationes condicionales, configuración, múltiples perfiles
---

En mi trabajo actual me encuentro realizando contribuciones a múltiples
repositorios en distintas plataformas como [gitlab], [bitbucket] o [github].
El problema es que, al crear un commit, dependiendo la plataforma, debo ocupar
distintos correos, firmar el commit con mi llave GPG o convertir los caracteres
de saltos de linea.

En este post vamos a revisar cómo ocupar [conditional includes] de git para cargar
distintas configuraciones dependiendo el directorio donde estamos trabajando.

A modo de ejemplo, y para mantenerlo simple, veremos cómo crear nuestros commits
con *distintos correos electrónicos* dependiendo si es un proyecto *personal* o de
*trabajo*.

## Estructura de carpetas

Dada la siguiente estructura:

```
.
├── code
│   ├── work
│   │   ├── work-project-1
│   │   ├── work-project-2
│   ├── personal-project-1
│   ├── personal-project-2
│   ├── personal-project-3
│   ├── open-source-project-1
│   ├── open-source-project-2
│   └── other-project
└── downloads
```

Si configuramos globalmente nuestro correo personal con:

```bash
git config --global user.name "Sebastián Vera"
git config --global user.email "personal@email.com"
```

Nuestro archivo `~/.gitconfig` tendrá el siguiente contenido:

```c
[user]
  name = Sebastián Vera
  email = personal@email.com
```

Ahora cada vez que realicemos un commit, independiente al proyecto o carpeta en
donde estemos, se hará uso de nuestro reciente nombre y correo configurado.

```markdown
commit af7651e45f59247e1a91b19cc62aff5b56accca2
Author: Sebastián Vera <personal@email.com>
Date:   Tue Mar 19 14:23:01 2019 +0000

    Initial commit
```

Existen distintas opciones para ocupar nuestro correo de trabajo en cada
sub-carpeta del directorio `work`, aunque esta vez sólo veremos 2.

### Configuraciones locales

Git nos permite tener configuraciones locales en cada carpeta, por ejemplo, si
entramos al directorio `~/code/work/work-project-2` y ejecutamos:

```bash
git config user.email "work@email.com"
```

Al crear un commit, obtendremos lo siguiente:

```markdown
commit 61b00efe848fa132456de5895847694589b92a79
Author: Sebastián Vera <work@email.com>
Date:   Tue Mar 19 13:41:28 2019 +0000

    Initial commit
```

Esta configuración será exclusiva de `~/code/work/work-project-2` y quedará
almacenada en `~/code/work/work-project-2/.git/config`

### Configuraciones condicionales (Recomendado)

Es muy probable que queramos ocupar la misma configuración para todos los
repositorios dentro de la carpeta `~/code/work`, sería tedioso y fácil de
olvidar tener que configurar el mismo correo con `git config user.email
"work@email.com"` cada vez que clonemos o creemos un nuevo proyecto dentro de
este directorio.

Aquí es donde [git conditional includes] entra en acción, permitiendonos cargar
condicionalmente una configuración en una dirección específica.

> You can include a config file from another conditionally by setting a
> includeIf.\<condition\>.path variable to the name of the file to be included

- Creemos primero un archivo `~/.gitconfig-work` con las opciones que
  necesitemos, por ejemplo:

```c
[user]
  email = work@email.com
```

> Puedes agregar todas las configuraciones que quieras

- Una vez ya tenemos nuestro archivo con las configuraciones para nuestros
  repositorios de trabajo, procedemos a decirle a git que lo cargue cada vez
  que estemos dentro de un directorio en `~/code/work`, para esto, abramos
  nuestro archivo de configuración global (`~/.gitconfig`) y agreguemos lo
  siguiente:

```git
[user]
  name = Sebastián Vera
  email = personal@email.com
// highlight-start
[includeIf "gitdir:~/code/work/"]
  path = ~/.gitconfig-work
// highlight-end
```

Como resultado de esta configuración, todos los repositorios bajo el directorio
`~/code/work` utilizarán el correo `work@email.com`.

Cualquier duda o pregunta mi twitter se encuentra a pie de esta página, espero
haya sido de ayuda.

¡Hasta la próxima!

[conditional includes]: https://git-scm.com/docs/git-config#_conditional_includes
[git conditional includes]: https://git-scm.com/docs/git-config#_conditional_includes
[bitbucket]: https://bitbucket.org
[github]: https://github.com
[gitlab]: https://gitlab.com
[twitter]: https://twitter.com/sebalvear
