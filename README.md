# Bienvenido al proyecto Captura de MonitorApp® !

Captura es la sección donde el operador pude **capturar** piezas de la estación, además de poder visualizar los indicadores en tiempo real de su estación de trabajo, otra caracteristicas del proyecto son el poder interacturar con los checklists generados; cargar partes a sú estación, entre algunas otras. Esta sección por el momento es una subsección de MonitorApp dedicada a la interacción directa con los operadores de las estaciones de trabajo.

El proyecto fue configurado para funcionar fuera del ecosistema de desarrollo de **MonitorApp®**; Sin embargo, establece comunicación con el servidor principal de **MonitorApp®**.

El proyecto corre principalmente en dos modos:

## Desarrollo

Para correrlo en este modo necesario:

- Instalar las dependencias (si es la primera vez que se corre o si sospecha que puede faltarle alguna) esto se puede hacer con el script directamente en la terminal del proyecto `npm install`.
- Una vez instaladas se puede inicializar el proyecto con el script `npm run dev`.

este último comando, levantara el servidor en el localhost puerto 8008 (http://localhost:8008).

el servidor de desarrollo esta configurado para reflejar los cambios en tiempo real para mejorar la experiencia del programador.

## Generar archivos para poducción

Para correrlo en este modo es necesario:

- Instalar las dependencias (si es la primera vez que se corre o si sospecha que puede faltarle alguna) esto se puede hacer con el script directamente en la terminal del proyecto `npm install`.

- Una vez instaladas las dependencias puede generar los archivos estaticos para el servidor por medio del script `npm run build` o `npm start`

## Algunas otras caracteristicas de la distribución del repositorio

- Existen archivos con las fuentes, colores y estilos más utilizados; Puedes acceder desde cualquier componete desde la carpeta `src/assets/sass/`
