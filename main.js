#!/usr/bin/env node

import { createDirname } from './utils/path.js'
import fs from 'fs'
import path from 'path'

const { __dirname } = createDirname(import.meta.url)
const TASK_FILE = 'tasks.json'

const pathArchive = path.join(__dirname, TASK_FILE)

if (!fs.existsSync(pathArchive)) {
  try {
    fs.writeFileSync(pathArchive, JSON.stringify({}), 'utf-8')
  } catch (error) {
    console.log(`error al crear el archivo ${TASK_FILE}`)
  }
}

// 1. Obtener el objeto Date para el momento actual
const fechaActual = new Date()

// 2. Definir los nombres de los meses en español (0-indexados)
const nombresMeses = [
  'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
  'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
]

// 3. Extraer los componentes de la fecha y hora (usando métodos locales)
const dia = fechaActual.getDate() // Día del mes (1-31)
const mesNumero = fechaActual.getMonth() // Número del mes (0-11)
const anio = fechaActual.getFullYear() // Año completo
const horas = fechaActual.getHours() // Horas (0-23)
const minutos = fechaActual.getMinutes() // Minutos (0-59)
const segundos = fechaActual.getSeconds() // Segundos (0-59)

// 4. Obtener el nombre del mes usando el número
const nombreMes = nombresMeses[mesNumero]

// 5. Formatear horas, minutos y segundos para que tengan dos dígitos (con cero inicial si < 10)
// Usamos padStart(2, '0') para asegurar dos dígitos, rellenando con '0' si es necesario.
const horasFormateadas = String(horas).padStart(2, '0')
const minutosFormateados = String(minutos).padStart(2, '0')
const segundosFormateados = String(segundos).padStart(2, '0')

const date = `${dia} de ${nombreMes} de ${anio} a las ${horasFormateadas}:${minutosFormateados}:${segundosFormateados}`

let tasks = []

try {
  const data = fs.readFileSync(pathArchive, 'utf-8')
  const parseData = JSON.parse(data)
  tasks = parseData
} catch (error) {
  console.log('error al leer el archivo', error)
  exit()
}

const commands = {
  add: createTask,
  update: updateTask,
  delete: '',
  exit
}

function exit () {
  console.log('hasta luego...')
  process.exit(0)
}

function createTask (argument) {
  const { task } = argument
  const nameTask = task.trim().toLowerCase()
  const taskCreated = tasks.find(e => e.name === nameTask)
  const idTask = tasks.length + 1

  if (nameTask.trim() === '') {
    console.log('La tarea no puede estar vacia')
    return
  }
  if (taskCreated) {
    console.log('la tarea ya existe')
    return
  }

  try {
    tasks.push({
      id: idTask,
      name: nameTask,
      dateCreate: date,
      dateUpdate: '',
      status: 0
    })
  } catch (error) {
    console.log('no se pudo crear correctamente la tarea', error)
    return
  }

  console.log(`la tarea fue creada correctemente (ID: ${idTask}) `)

  try {
    fs.writeFileSync(pathArchive, JSON.stringify(tasks), 'utf-8')
  } catch (error) {
    console.log(`error al crear el archivo ${TASK_FILE}`)
  }
}

function updateTask (argument) {
  const { id, newTask } = argument
  let idTask

  try {
    idTask = parseInt(id)
  } catch (e) {
    console.log('El identificador de la tarea debe ser un numero')
    return
  }

  if (idTask === '') {
    console.log('El identificador no puede estar vacio')
    return
  }
  if (newTask === '') {
    console.log('La nueva tarea no puede estar vacia')
    return
  }
  const taskRepeit = tasks.find(task => task.name === newTask)

  if (taskRepeit) {
    console.log('Esta tarea ya esta asignada')
    return
  }

  const taskFind = tasks.find(task => task.id === idTask)

  if (!taskFind) {
    console.log('La tarea no fue encontrada')
    return
  }

  taskFind.name = newTask
  taskFind.dateUpdate = date

  try {
    fs.writeFileSync(pathArchive, JSON.stringify(tasks), 'utf-8')
    console.log('tarea actualizada correctamente ')
  } catch (error) {
    console.log(`error al actualizar la tarea ${TASK_FILE}`)
  }
}

const command = process.argv[2] ?? ''
const argument = process.argv[3] ?? ''
const argument2 = process.argv[4] ?? ''

const commandInput = command.trim().toLowerCase()
const commandAction = commands[commandInput]
if (typeof commandAction === 'function') {
  let objetTask
  switch (commandInput) {
    case 'add' :
      objetTask = { task: argument }
      break
    case 'update':
      objetTask = { id: argument, newTask: argument2 }
      break
    case '3' :
      break
    case '4':
      break
  }
  commandAction(objetTask)
} else {
  console.log('comando no valido para mas informacion escriba help')
}

// console.log(process.argv);
