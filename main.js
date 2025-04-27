#!/usr/bin/env node

import { createDirname } from './utils/path.js'
import fs from 'fs'
import path from 'path'

const { __dirname } = createDirname(import.meta.url)
const TASK_FILE = 'tasks.json'

const pathArchive = path.join(__dirname, TASK_FILE)

if (!fs.existsSync(pathArchive)) {

  try {
    fs.writeFileSync(pathArchive, JSON.stringify([]), 'utf-8')
  } catch (error) {
    console.log(`error al crear el archivo ${TASK_FILE}`);
  }

}

// 1. Obtener el objeto Date para el momento actual
const fechaActual = new Date();

// 2. Definir los nombres de los meses en español (0-indexados)
const nombresMeses = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
];

// 3. Extraer los componentes de la fecha y hora (usando métodos locales)
const dia = fechaActual.getDate(); // Día del mes (1-31)
const mesNumero = fechaActual.getMonth(); // Número del mes (0-11)
const anio = fechaActual.getFullYear(); // Año completo
const horas = fechaActual.getHours(); // Horas (0-23)
const minutos = fechaActual.getMinutes(); // Minutos (0-59)
const segundos = fechaActual.getSeconds(); // Segundos (0-59)

// 4. Obtener el nombre del mes usando el número
const nombreMes = nombresMeses[mesNumero];

// 5. Formatear horas, minutos y segundos para que tengan dos dígitos (con cero inicial si < 10)
// Usamos padStart(2, '0') para asegurar dos dígitos, rellenando con '0' si es necesario.
const horasFormateadas = String(horas).padStart(2, '0');
const minutosFormateados = String(minutos).padStart(2, '0');
const segundosFormateados = String(segundos).padStart(2, '0');

const date = `${dia} de ${nombreMes} de ${anio} a las ${horasFormateadas}:${minutosFormateados}:${segundosFormateados}`;


let tasks = []

try {
  const data = fs.readFileSync(pathArchive, 'utf-8')
  const parseData = JSON.parse(data)
  tasks = parseData
} catch (error) {
  console.log('error al leer el archivo', error);
  exit()
}

const commands = {
  add: createTask,
  update: '',
  delete: '',
  exit: exit
}

function exit() {
  console.log('hasta luego...')
  process.exit(0)
}

function createTask(task) {


  const nameTask = task.trim().toLowerCase()
  const taskCreated = tasks.find(e => e.name === nameTask)

  if (nameTask.trim() === '') {
    console.log("La tarea no puede estar vacia");
    return
  }
  if (taskCreated) {
    console.log("la tarea ya existe");
    return
  }

  try {
    tasks.push({
      id: tasks.length + 1,
      name: nameTask,
      dateCreate: date,
      dateUpdate: '',
      status: 0,
    })
  } catch (error) {
    console.log("no se pudo crear correctamente la tarea", error);
    return
  }

  console.log("la tarea fue creada correctemente");


  try {
    fs.writeFileSync(pathArchive, JSON.stringify(tasks), 'utf-8')
  } catch (error) {
    console.log(`error al crear el archivo ${TASK_FILE}`);
  }


}


const command = process.argv[2]
const argument = process.argv[3]

const commandInput = command.trim().toLowerCase()
const commandAction = commands[commandInput]
if (typeof commandAction === 'function') {
  commandAction(argument)
} else {
  console.log('comando no valido para mas informacion escriba help');
}


// console.log(process.argv);