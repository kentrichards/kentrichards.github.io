// @ts-nocheck
HTMLElement.prototype.isAbove = function (/** @type {HTMLElement} */ that) {
    const thisRect = this.getBoundingClientRect()
    const thatRect = that.getBoundingClientRect()

    return thisRect.top + thisRect.height / 2 < thatRect.top + thatRect.height / 2
}

HTMLElement.prototype.isBelow = function (/** @type {HTMLElement} */ that) {
    return that.isAbove(this)
}

HTMLElement.prototype.swapWith = function (/** @type {HTMLElement} */ that) {
    const thisNextSibling = this.nextSibling === that ? this : this.nextSibling

    that.before(this)
    thisNextSibling?.before(that)
}

const eleById = (/** @type {string} */ id) => document.getElementById(id)

/**
 * Via https://stackoverflow.com/a/19964557
 * 
 * @returns {string} a random 8 character long id
 */
const newId = () => (Math.random().toString(36) + '00000000000000000').slice(2, 10)

const getTaskIds = () => Array.from(document.getElementsByClassName('task')).map(ele => ele.id)

export { eleById, newId, getTaskIds }
