import { date } from '../utils/date.js'
import fs from 'fs'

export default class TaskModel {
  static getData (route) {
    let tasks = []

    try {
      const data = fs.readFileSync(route, 'utf-8')
      const parseData = JSON.parse(data)
      tasks = parseData
    } catch (error) {
      console.log('error al leer el archivo', error)
      process.exit()
    }

    return tasks
  }

  static updateData (route, tasks) {
    try {
      fs.writeFileSync(route, JSON.stringify(tasks), 'utf-8')
    } catch (error) {
      console.log('error', error)
      return false
    }

    return true
  }

  static add (argument, tasks, route) {
    const { task } = argument
    const nameTask = task.trim().toLowerCase()
    const taskCreated = tasks.find(e => e.name === nameTask)
    const idTask = tasks.length + 1

    if (nameTask.trim() === '') {
      return 'La tarea no puede estar vacia'
    }
    if (taskCreated) {
      return 'la tarea ya existe'
    }

    try {
      tasks.push({
        id: idTask,
        name: nameTask,
        dateCreate: date,
        dateUpdate: '',
        status: 1
      })
    } catch (error) {
      return ('no se pudo crear correctamente la tarea', error)
    }

    const result = this.updateData(route, tasks)

    if (!result) {
      return 'No se pudo crear la nueva tarea'
    }

    return `la tarea fue creada correctemente (ID: ${idTask}) `
  }

  static update (argument, tasks, route) {
    if (tasks.length === 0 || tasks.length === undefined) {
      return 'No hay tareas para actualizar'
    }

    const { id, newTask } = argument
    let idTask

    if (idTask === '') {
      return 'El identificador no puede estar vacio'
    }

    try {
      idTask = parseInt(id)
    } catch (e) {
      return 'El identificador de la tarea debe ser un numero'
    }

    if (newTask === '') {
      return 'La nueva tarea no puede estar vacia'
    }
    const taskRepeit = tasks.find(task => task.name === newTask)

    if (taskRepeit) {
      return 'Esta tarea ya esta asignada'
    }

    const taskFind = tasks.find(task => task.id === idTask)

    if (!taskFind) {
      return 'La tarea no fue encontrada'
    }

    taskFind.name = newTask
    taskFind.dateUpdate = date

    const result = this.updateData(route, tasks)

    if (!result) {
      return 'No se pudo actualizar la tarea'
    }

    return `la tarea fue actualizada correctemente (ID: ${idTask}) -> name : ${newTask} `
  }

  static delete (argument, tasks, route) {
    if (tasks.length === 0 || tasks.length === undefined) {
      return 'No hay tareas para eliminar'
    }
    const { id } = argument
    if (id === '' || id === undefined) {
      return 'El identificador de la tarea no puede estar vacio'
    }

    let idTask
    try {
      idTask = parseInt(id)
    } catch (error) {
      return 'El identificador tiene que ser un numero'
    }

    const taskFind = tasks.find(e => e.id === idTask)
    if (!taskFind) {
      return 'Identificador no encontrado'
    }

    const newTasks = tasks.filter(task => task.id !== taskFind.id)

    const result = this.updateData(route, newTasks)
    if (!result) {
      return 'no se pudo eliminar la tarea'
    }

    return 'Tarea eliminada correctamente'
  }

  static list (option, tasks) {
    const { method } = option
    if (method === 'done') {
      return tasks.filter(task => task.status === 3)
    }
    if (method === 'todo') {
      return tasks.filter(task => task.status === 1)
    }
    if (method === 'in-progress') {
      return tasks.filter(task => task.status === 2)
    }
    if (method === '') {
      return tasks
    }

    return 'no valid'
  }

  static updateStatus (argument, tasks, route) {
    if (tasks.length === 0 || tasks.length === undefined) {
      return 'No hay tareas por favor cree una tarea'
    }
    const { id, option } = argument
    let idTask
    let mensajeFinal = ''
    let newStatus
    if (option === 1) {
      mensajeFinal = 'La tarea se marco como en progreso'
      newStatus = 2
    }
    if (option === 2) {
      mensajeFinal = 'La tarea se marco como terminada'
      newStatus = 3
    }

    if (id === '' || id === undefined) {
      console.log('El identificador de la tarea no puede estar vacio')
      return
    }

    try {
      idTask = parseInt(id)
    } catch (error) {
      return 'El identificador tiene que ser un numero'
    }

    const taskFind = tasks.find(task => task.id === idTask)
    if (!taskFind) {
      return 'No se encontro la tarea'
    }

    taskFind.status = newStatus
    taskFind.dateUpdate = date

    const result = this.updateData(route, tasks)
    if (!result) {
      return `error al actualizar el estado de la tarea ( ID: ${idTask} )`
    }

    return mensajeFinal
  }

  static help () {
    const helpMessage = `Uso: task-cli <comando> [argumentos]

      Comandos disponibles:

      add "<Tarea>"            # Agrega una nueva tarea, debe ir entre comillas si contiene espacios.
      update <ID> "<nueva tarea>" # Actualiza tarea de una tarea por su ID. La nueva tarea debe ir entre comillas.
      delete <ID>                  # Elimina una tarea por su ID.
      mark-in-progress <ID>        # Marca una tarea como 'en progreso' por su ID.
      mark-done <ID>               # Marca una tarea como 'completada' por su ID.
      list [estado]                # Lista tareas. Estados opcionales para filtrar: todo, in-progress, done. Si no se especifica estado, lista todas.
      help                         # Muestra este mensaje de ayuda.
      exit                         # Sale de la aplicación Task Tracker CLI.
    `

    return helpMessage
  }
}
