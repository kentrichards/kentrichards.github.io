import { get, set, update } from '../node_modules/idb-keyval/dist/index.js'
import TaskManager from './tasks.js'

get('tasks')
    .then(/** @type {{id: string, value: string}[] | undefined} */ result => {
        if (result) {
            TaskManager.populateTaskList(result)
        } else {
            set('tasks', [])
        }
    })
    .catch(err => console.error(err))

const addTask = (/** @type {string} */ id, /** @type {string} */ value) => {
    const newTask = { id, value }
    return update('tasks', (tasks) => [...tasks, newTask])
}

const removeTask = (/** @type {string} */ id) => {
    return update('tasks', (tasks) => tasks.filter(task => task.id !== id))
}

const reorderTasks = (/** @type {string[]} */ ids) => {
    update('tasks', (tasks) => ids.map(id => tasks.find(task => task.id === id)))
}

export { addTask, removeTask, reorderTasks }
