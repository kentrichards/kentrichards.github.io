import { reorderTasks } from './store.js'
import { getTaskIds } from './utilities.js'

// Based on work by Nguyen Huu Phuoc
// https://htmldom.dev/drag-and-drop-element-in-a-list/

/* Mouse handlers */
let draggingEle
let placeholderEle
let isDraggingStarted = false

let x = 0
let y = 0

const elementGrabbed = (/** @type {MouseEvent} */ e) => {
    const handleEle = /** @type {HTMLElement} */ (e.target)
    draggingEle = /** @type {HTMLElement} */ (handleEle.parentElement)

    const rect = draggingEle.getBoundingClientRect()
    x = e.pageX - rect.left
    y = e.pageY - rect.top

    document.addEventListener('mousemove', elementMoved)
    document.addEventListener('mouseup', elementReleased)
}

const elementMoved = (/** @type {MouseEvent} */ e) => {
    draggingEle.style.position = 'absolute'
    draggingEle.style.top = `${e.pageY - y}px`
    draggingEle.style.left = `${e.pageX - x}px`

    if (!isDraggingStarted) {
        isDraggingStarted = true

        placeholderEle = document.createElement('div')
        placeholderEle.classList.add('placeholder')
        draggingEle.after(placeholderEle)

        placeholderEle.style.height = `${draggingEle.getBoundingClientRect().height}px`
    }

    // Order:
    //  prevEle
    //  draggingEle
    //  placeholderEle
    //  nextEle
    const prevEle = draggingEle.previousElementSibling
    const nextEle = placeholderEle.nextElementSibling

    if (prevEle && draggingEle.isAbove(prevEle)) {
        draggingEle.swapWith(prevEle)
        draggingEle.after(placeholderEle)
        return
    }

    if (nextEle && draggingEle.isBelow(nextEle)) {
        draggingEle.swapWith(nextEle)
        draggingEle.after(placeholderEle)
    }
}

const elementReleased = () => {
    placeholderEle.remove()
    draggingEle.style.removeProperty('position')
    draggingEle.style.removeProperty('top')
    draggingEle.style.removeProperty('left')

    x = 0
    y = 0
    draggingEle = null
    isDraggingStarted = false

    document.removeEventListener('mousemove', elementMoved)
    document.removeEventListener('mouseup', elementReleased)

    reorderTasks(getTaskIds())
}

/* Keyboard handlers */
const handleFocused = (/** @type {FocusEvent} */ e) => {
    const handleEle = /** @type {HTMLElement} */ (e.target)
    handleEle.addEventListener('keydown', handleKeyDown)
}

const handleBlurred = (/** @type {FocusEvent} */ e) => {
    const handleEle = /** @type {HTMLElement} */ (e.target)
    handleEle.removeEventListener('keydown', handleKeyDown)
}

const handleKeyDown = (/** @type {KeyboardEvent} */ e) => {
    if (isDraggingStarted || e.key !== 'ArrowUp' && e.key !== 'ArrowDown') return

    const handleEle = /** @type {HTMLElement} */ (e.target)
    const taskEle = /** @type {HTMLElement} */ (handleEle.parentElement)

    const prevEle = taskEle.previousElementSibling
    const nextEle = taskEle.nextElementSibling

    if (prevEle && e.key === 'ArrowUp') {
        taskEle.swapWith(prevEle)
        handleEle.focus()
        reorderTasks(getTaskIds())
    } else if (nextEle && e.key === 'ArrowDown') {
        taskEle.swapWith(nextEle)
        handleEle.focus()
        reorderTasks(getTaskIds())
    }
}

export { elementGrabbed, handleFocused, handleBlurred }
