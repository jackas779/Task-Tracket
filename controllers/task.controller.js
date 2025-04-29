export default class TaskController {
  constructor (command, data, taskModel) {
    const action = data.argument.toLowerCase().trim()
    const action2 = data.argument2.toLowerCase().trim()
    this.command = command.trim().toLowerCase()
    this.data = { argument: action, argument2: action2 }
    this.objetTask = {}
    this.commands = ['add', 'update', 'list', 'delete', 'mark-done', 'mark-in-progress', 'help']
    this.taskModel = taskModel
  }

  run (route) {
    if (!this.commands.includes(this.command)) {
      console.log('Comando no reconocido para mas informacion escriba help')
    }

    const { argument, argument2 } = this.data
    const arrayTask = this.taskModel.getData(route)
    switch (this.command) {
      case 'add' :{
        this.objetTask = { task: argument }
        const task = this.taskModel.add(this.objetTask, arrayTask, route)
        console.log(task)
        break
      }
      case 'update':{
        this.objetTask = { id: argument, newTask: argument2 }
        const task = this.taskModel.update(this.objetTask, arrayTask, route)
        console.log(task)
        break
      }

      case 'list': {
        this.objetTask = { method: argument }
        const taskFilter = this.taskModel.list(this.objetTask, arrayTask)
        if (taskFilter === 'no valid') {
          console.log('Comando no valido para mas informacion por favor escriba el comando help')
          break
        }
        if (taskFilter.length === 0 || taskFilter.length === undefined) {
          console.log('No hay tareas para mostrar')
          break
        }
        taskFilter.forEach(task => {
          let status = ''
          if (task.status === 1) {
            status = 'No iniciada'
          }
          if (task.status === 2) {
            status = 'En progreso'
          }
          if (task.status === 3) {
            status = 'Finalizada'
          }
          console.log(`| ID : ${task.id} -> Nombre: ${task.name} -> Estado: ${status}(${task.status}) \n| Fecha creacion: ${task.dateCreate} --- Fecha Ultima Actualizacion: ${task.dateUpdate}`)
        })
        break
      }
      case 'delete' :{
        this.objetTask = { id: argument }
        const task = this.taskModel.delete(this.objetTask, arrayTask, route)
        console.log(task)
        break
      }

      case 'mark-done':{
        this.objetTask = { id: argument, option: 2 }
        const updateTask = this.taskModel.updateStatus(this.objetTask, arrayTask, route)
        console.log(updateTask)
        break
      }

      case 'mark-in-progress':{
        this.objetTask = { id: argument, option: 1 }
        const updateTask = this.taskModel.updateStatus(this.objetTask, arrayTask, route)
        console.log(updateTask)
        break
      }
      case 'help': {
        const messageHelp = this.taskModel.help()
        console.log(messageHelp)
        break
      }
      default:
        console.log('comando no valido')
        break
    }
  }
}
