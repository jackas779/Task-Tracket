# Task Tracker CLI

## Descripción del Proyecto

Task Tracker CLI es una sencilla aplicación de línea de comandos construida con Node.js para ayudarte a rastrear y gestionar tus tareas directamente desde la terminal. Permite añadir, actualizar, eliminar, marcar el estado de las tareas y listarlas, almacenando toda la información en un archivo JSON local.

Este proyecto se enfoca en practicar habilidades de programación esenciales como el manejo del sistema de archivos, la entrada de usuario a través de argumentos posicionales y la construcción de una CLI básica, utilizando **exclusivamente módulos nativos de Node.js** para su funcionalidad principal.

Proyecto realizo con los requisitos propuestos de la pagina de roadmap para mas detalles de los requisitos ir a la siguiente url  [Roadmap](https://roadmap.sh/projects/task-tracker)

## Características

* **Gestión de Tareas:**
    * Añadir nuevas tareas.
    * Actualizar tareas existentes (por ID).
    * Eliminar tareas (por ID).
* **Control de Estado:**
    * Marcar tareas como "en progreso".
    * Marcar tareas como "completada" (done).
    * Las tareas nuevas inician con un estado por defecto (ej. "no iniciado" o "todo").
* **Listado Flexible:**
    * Listar todas las tareas.
    * Listar tareas por estado específico ("completada", "no iniciado", "en progreso").
* **Persistencia de Datos:** Las tareas se almacenan en un archivo JSON local en el directorio actual.
* **Uso Nativo (Core Logic):** Implementado utilizando exclusivamente módulos nativos de Node.js para la lógica de negocio y gestión de archivos.

## Requisitos

Para instalar y ejecutar esta aplicación, solo necesitas tener instalado:

* **Node.js:** Versión 14 o superior recomendada, que incluye `npm` (el gestor de paquetes de Node.js).

## Instalación Global

Sigue estos pasos para instalar Task Tracker CLI globalmente en tu sistema y poder ejecutar el comando `task-cli` desde cualquier terminal:

1.  **Clonar el Repositorio:**
    ```bash
    git clone [URL_DE_TU_REPOSITORIO]
    cd [nombre-de-tu-directorio-de-proyecto]
    ```
    (Reemplaza `[URL_DE_TU_REPOSITORIO]` y `[nombre-de-tu-directorio-de-proyecto]` con los datos de tu proyecto).

2.  **Instalar Globalmente:**
    Desde el directorio raíz del proyecto clonado, ejecuta el siguiente comando para instalar la CLI globalmente usando npm:
    ```bash
    npm install -g .
    ```
    El punto (`.`) al final indica a npm que instale el paquete ubicado en el directorio actual de forma global.

3.  **Verificar Instalación:**
    Una vez completada la instalación, deberías poder ejecutar el comando `task-cli` desde cualquier ventana de terminal nueva. Prueba ejecutando el comando help:
    ```bash
    task-cli help
    ```
    Si ves el mensaje de ayuda, ¡la instalación fue exitosa!

## Desinstalación Global

Para eliminar Task Tracker CLI de tu instalación global de npm, usa el siguiente comando:

```bash
npm uninstall -g task-tracker #[O el nombre exacto de tu paquete en package.json]