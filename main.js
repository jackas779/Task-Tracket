#!/usr/bin/env node

import { createDirname } from './utils/path.js'
import fs from 'fs'
import path from 'path'
import { date } from './utils/date.js'
import TaskController from './models/task.controller.js'

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
  delete: deleteTask,
  list: listTask,
  'mark-done': doneTask,
  'mark-in-progress': markInProgressTask
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

  if (idTask === '') {
    console.log('El identificador no puede estar vacio')
    return
  }

  try {
    idTask = parseInt(id)
  } catch (e) {
    console.log('El identificador de la tarea debe ser un numero')
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
    console.log(`error al actualizar la tarea (ID: ${idTask})`)
  }
}

function deleteTask (argument) {
  const { id } = argument

  if (id.trim() === '') {
    console.log('El identificador de la tarea no puede estar vacio')
    return
  }

  let idTask
  try {
    idTask = parseInt(id)
  } catch (error) {
    console.log('El identificador tiene que ser un numero')
  }

  const taskFind = tasks.find(e => e.id === idTask)
  if (!taskFind) {
    console.log('Identificador no encontrado')
    return
  }

  const newTasks = tasks.filter(task => task.id !== taskFind.id)

  try {
    fs.writeFileSync(pathArchive, JSON.stringify(newTasks), 'utf-8')
    console.log('tarea se elimino correctamente ')
  } catch (error) {
    console.log(`error al eliminar la tarea  ( ID: ${idTask} )`)
  }
}

function doneTask (argument) {
  const { id } = argument
  let idTask

  if (id.trim() === '') {
    console.log('El identificador de la tarea no puede estar vacio')
    return
  }

  try {
    idTask = parseInt(id)
  } catch (error) {
    console.log('El identificador tiene que ser un numero')
  }

  const taskFind = tasks.find(task => task.id === idTask)
  if (!taskFind) {
    console.log('No se encontro la tarea')
    return
  }

  taskFind.status = 3
  taskFind.dateUpdate = date

  try {
    fs.writeFileSync(pathArchive, JSON.stringify(tasks), 'utf-8')
    console.log('La tarea se marco como completa')
  } catch (error) {
    console.log(`error al actualizar el estado de la tarea ( ID: ${idTask} )`)
  }
}

function listTask (argument) {
  const { option } = argument
  const method = option.toLowerCase()
  if (method === 'done') {
    const taskFilter = tasks.filter(task => task.status === 3)
    taskFilter.forEach(task => {
      console.log(`ID : ${task.id} -> Nombre: ${task.name}`)
    })
  } else if (method === 'todo') {
    const taskFilter = tasks.filter(task => task.status === 0)
    taskFilter.forEach(task => {
      console.log(`ID : ${task.id} -> Nombre: ${task.name}`)
    })
  } else if (method === 'in-progress') {
    const taskFilter = tasks.filter(task => task.status === 2)
    taskFilter.forEach(task => {
      console.log(`ID : ${task.id} -> Nombre: ${task.name}`)
    })
  } else if (method === '') {
    tasks.forEach(task => {
      console.log(`ID : ${task.id} -> Nombre: ${task.name}`)
    })
  } else {
    console.log('Comando no reconocido')
  }
}

function markInProgressTask (argument) {
  const { id } = argument
  let idTask

  if (id.trim() === '') {
    console.log('El identificador de la tarea no puede estar vacio')
    return
  }

  try {
    idTask = parseInt(id)
  } catch (error) {
    console.log('El identificador tiene que ser un numero')
  }

  const taskFind = tasks.find(task => task.id === idTask)
  if (!taskFind) {
    console.log('No se encontro la tarea')
    return
  }

  taskFind.status = 2
  taskFind.dateUpdate = date

  try {
    fs.writeFileSync(pathArchive, JSON.stringify(tasks), 'utf-8')
    console.log('La tarea se marco como en progreso')
  } catch (error) {
    console.log(`error al actualizar el estado de la tarea ( ID: ${idTask} )`)
  }
}

const command = process.argv[2] ?? ''
const argument = process.argv[3] ?? ''
const argument2 = process.argv[4] ?? ''

const task = new TaskController(command, { argument, argument2 })
task.run()
// const commandAction = commands[commandInput]
// if (typeof commandAction === 'function') {
//   let objetTask
//   switch (commandInput) {
//     case 'add' :
//       objetTask = { task: argument }
//       break
//     case 'update':
//       objetTask = { id: argument, newTask: argument2 }
//       break
//     case 'delete' :
//       objetTask = { id: argument }
//       break
//     case 'mark-done':
//       objetTask = { id: argument }
//       break
//     case 'mark-in-progress':
//       objetTask = { id: argument }
//       break
//     case 'list':
//       objetTask = { option: argument }
//   }
//   commandAction(objetTask)
// } else {
//   console.log('comando no valido para mas informacion escriba help')
// }
