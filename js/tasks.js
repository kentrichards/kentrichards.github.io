import { removeTask } from './store.js'
import { elementGrabbed, handleFocused, handleBlurred } from './reorder.js'
import { eleById } from './utilities.js'

const TaskManager = {
    populateTaskList(/** @type {{id: string, value: string}[]} */ tasks) {
        tasks.forEach(task => this.createTaskEle(task.id, task.value))
    },
    createTaskEle(/** @type {string} */ id, /** @type {string} */ value) {
        const t = this._newTaskEle(id)
        t.appendChild(this._newCheckboxEle())
        t.appendChild(this._newTextEle(value))
        t.appendChild(this._newHandleEle())
        this._taskList.appendChild(t)
    },
    _taskList: /** @type {HTMLElement} */ (eleById('task-list')),
    _newTaskEle(/** @type {string} */ id) {
        const t = document.createElement('div')
        t.id = id
        t.classList.add('task')
        return t
    },
    _newCheckboxEle() {
        const c = document.createElement('input')
        c.type = 'checkbox'
        c.classList.add('peer', 'task-checkbox')
        // Arrow function wrapper required to bind the correct `this` context
        c.addEventListener('click', (e) => (CheckboxHandler.onClick(e)))
        return c
    },
    _newTextEle(/** @type {string} */ value) {
        const t = document.createElement('p')
        t.innerText = value
        t.classList.add('task-text', 'peer-checked:line-through', 'peer-checked:text-gray-400')
        return t
    },
    _newHandleEle() {
        const h = document.createElement('img')
        h.src = 'svg/handle.svg'
        h.draggable = false
        h.role = 'button'
        h.tabIndex = 0
        h.classList.add('task-handle', 'peer-checked:pointer-events-none', 'peer-checked:tabindex-0')
        h.addEventListener('mousedown', elementGrabbed)
        h.addEventListener('focus', handleFocused)
        h.addEventListener('blur', handleBlurred)
        return h
    }
}

const CheckboxHandler = {
    onClick(/** @type {MouseEvent} */ e) {
        const checkbox = /** @type {HTMLInputElement} */ (e.target)
        const task = /** @type {HTMLElement} */ (checkbox.parentElement)

        if (checkbox.checked) {
            this._queueRemoval(task, checkbox)
        } else {
            this._attemptUnqueueRemoval(task.id)
        }
    },
    _deleteQueue: /** @type {{taskId: string, timerId: number}[]} */ ([]),
    _queueRemoval(/** @type {HTMLElement} */ taskEle, /** @type {HTMLInputElement} */ checkboxEle) {
        const timerId = setTimeout(() => {
            if (checkboxEle.checked) {
                removeTask(taskEle.id)
                    .then(() => taskEle.remove())
                    .catch(err => console.error(err))
            }
        }, 1000)

        this._deleteQueue.push({ taskId: taskEle.id, timerId })
    },
    _attemptUnqueueRemoval(/** @type {string} */ taskId) {
        const item = this._deleteQueue.find(i => i.taskId === taskId)
        if (item) {
            clearTimeout(item.timerId)
        }
    }
}

export default TaskManager
