import TaskModel from '../controllers/task.model'

export default class TaskController {
  constructor (command, data) {
    this.command = command.trim().toLowerCase()
    this.data = data
    this.objetTask = {}
    this.commands = ['add', 'update', 'list', 'delete', 'mark-done', 'mark-in-progress', 'help']
  }

  run () {
    // console.log(this.command)
    // console.log(this.data)

    if (!this.commands.includes(this.command)) {
      console.log('Comando no reconocido para mas informacion escriba help')
    }

    const { argument, argument2 } = this.data

    switch (this.command) {
      case 'add' :
        this.objetTask = { task: argument }
        break
      case 'update':
        this.objetTask = { id: argument, newTask: argument2 }
        break
      case 'list':
        this.objetTask = { option: argument }
        break
      default:
        this.objetTask = { id: argument }
        break
      // case 'delete' :
      //   this.objetTask = { id: this.argument }
      //   break
      // case 'mark-done':
      //   this.objetTask = { id: this.argument }
      //   break
      // case 'mark-in-progress':
      //   this.objetTask = { id: this.argument }
      //   break
    }

    console.log(this.objetTask)
  }
}
