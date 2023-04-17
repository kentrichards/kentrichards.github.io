import { addTask } from './store.js'
import TaskManager from './tasks.js'
import { eleById, newId } from './utilities.js'

const noEmpty = /** @type {HTMLElement} */ (eleById('no-empty'))
const addInput = /** @type {HTMLInputElement} */ (eleById('add-input'))
const addBtn = /** @type {HTMLButtonElement} */ (eleById('add-btn'))

addInput.addEventListener('keydown', (/** @type {KeyboardEvent} */ e) => {
    if (e.key === 'Enter') {
        addBtn?.click()
    }
})

addBtn.addEventListener('click', () => {
    noEmpty.classList.add('hidden')
    if (!addInput.value) {
        noEmpty.classList.remove('hidden')
        return
    }

    const newTaskId = newId()
    addTask(newTaskId, addInput.value)
        .then(() => {
            TaskManager.createTaskEle(newTaskId, addInput.value)
            addInput.value = ''
        })
        .catch(err => console.error(err))
})
