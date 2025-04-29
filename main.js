#!/usr/bin/env node

import fs from 'fs'
import TaskController from './controllers/task.controller.js'
import TaskModel from './models/task.model.js'
import { createDirname } from './utils/path.js'
import path from 'path'

const { __dirname } = createDirname(import.meta.url)
const TASK_FILE = 'tasks.json'

const pathArchive = path.join(__dirname, TASK_FILE)

if (!fs.existsSync(pathArchive)) {
  try {
    fs.writeFileSync(pathArchive, JSON.stringify([]), 'utf-8')
  } catch (error) {
    console.log(`error al crear el archivo ${TASK_FILE}`)
    process.exit()
  }
}

const command = process.argv[2] ?? ''
const argument = process.argv[3] ?? ''
const argument2 = process.argv[4] ?? ''

const task = new TaskController(command, { argument, argument2 }, TaskModel)
task.run(pathArchive)
