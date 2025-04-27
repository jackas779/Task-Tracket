import readline from 'readline'
import fs from 'fs'
import util from 'util'

const TASK_FILE = 'tasks,json'


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '>'
})

const tasks = []

const commands = {
  create: createTask,
  update: '',
  delete: '',
  exit: exit
}

function exit() {
  console.log('hasta luego...')
  rl.close()
}

const menu =
  'Bienvenido al administrador de tareas que quiere hacer  \n' +
  '1.Crear tarea \n' +
  '2.Actualizar tarea \n' +
  '3.eliminar tarea \n'


async function createTask() {

  const question = util.promisify(rl.question).bind(rl);

  const task = await question('Ingrese el nombre de la nueva tarea: \n');
  const nameTask = task.trim().toLowerCase()

  if (nameTask.trim() === '') {
    console.log("La tarea no puede estar vacia");
    rl.prompt()
    return
  }
  const taskExist = tasks.find(e => e.name === nameTask)
  if (taskExist) {
    console.log('la tarea ya existe');
    rl.prompt()
    return
  }

  let taskDescription;
  const option = await question('Desea agregar descripcion ? (si/no) \n');
  const inputOption = option.trim().toLowerCase();

  if (inputOption !== 'si') {
    taskDescription = ''
  } else {
    rl.question('escriba su descripcion \n',
      (input) => {
        taskDescription = input
      }
    )
  }
  tasks.push({
    name: nameTask,
    date: `${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`,
    status: 'no iniciado',
    description: taskDescription
  })

  const taskCreated = tasks.find(e => e.name === nameTask)
  if (!taskCreated) {
    console.log("no se pudo crear correctamente la tarea");
  }
  console.log("la tarea fue creada correctemente");

  rl.prompt()

}


rl.on('line', (input) => {

  const commandInput = input.trim().toLowerCase()
  const commandAction = commands[commandInput]
  if (typeof commandAction === 'function') {
    commandAction()
  } else {
    console.log('comando no valido para mas informacion escriba help');
  }
})

rl.prompt()

// function main() {
//   rl.question(
//     menu,
//     (aswer) => {
//       switch (aswer) {
//         case '1':
//           rl.question('Ingrese el nombre de la nueva tarea: \n',
//             (task) => {
//               createTask(task)
//               main()
//             }
//           )
//           break
//         case '2':
//           rl.close()
//           break
//         default:
//           console.log('que es esto ?')
//           main()
//           break
//       }
//     }
//   )
// }

// main()