// The element currently being dragged
let draggingEle;
let placeholder;
let isDraggingStarted = false;

// The current position of the mouse relative to draggingEle
let x = 0;
let y = 0;

// Helper functions
const isAbove = (nodeA, nodeB) => {
    // Get the bounding rectangle of each node
    const rectA = nodeA.getBoundingClientRect();
    const rectB = nodeB.getBoundingClientRect();

    return rectA.top + rectA.height / 2 < rectB.top + rectB.height / 2;
};

const swap = (nodeA, nodeB) => {
    const parentA = nodeA.parentNode;
    const siblingA = nodeA.nextSibling === nodeB ? nodeA : nodeA.nextSibling;

    // Move `nodeA` to before `nodeB`
    nodeB.parentNode.insertBefore(nodeA, nodeB);

    // Move `nodeB` to before the sibling of `nodeA`
    parentA.insertBefore(nodeB, siblingA);
};

const mouseMoveHandler = (e) => {
    const draggingRect = draggingEle.getBoundingClientRect();

    if (!isDraggingStarted) {
        // Update the flag
        isDraggingStarted = true;

        // Let the placeholder take the height of the dragging element
        // So the next element doesn't move up
        placeholder = document.createElement('div');
        placeholder.classList.add('list-item');
        placeholder.classList.add('placeholder');
        draggingEle.parentNode.insertBefore(
            placeholder,
            draggingEle.nextSibling
        );

        // Set the placeholder's height
        placeholder.style.height = `${draggingRect.height}px`;
    }

    // Set position for dragging element
    draggingEle.style.position = 'absolute';
    draggingEle.style.top = `${e.pageY - y}px`;
    // draggingEle.style.left = `${e.pageX - x}px`;

    // The current order:
    //      prevEle
    //      draggingEle
    //      placeholder
    //      nextEle
    const prevEle = draggingEle.previousElementSibling;
    const nextEle = placeholder.nextElementSibling;

    // User moves the item to the top of the list
    if (prevEle && isAbove(draggingEle, prevEle)) {
        // The new order
        //      prevEle      ->  placeholder
        //      draggingEle  ->  draggingEle
        //      placeholder  ->  prevEle
        swap(placeholder, draggingEle);
        swap(placeholder, prevEle);

        return;
    }

    // User moves the item to the bottom of the list
    if (nextEle && isAbove(nextEle, draggingEle)) {
        // The new order
        //      draggingEle  ->  nextEle
        //      placeholder  ->  placeholder
        //      nextEle      ->  draggingEle
        swap(nextEle, placeholder);
        swap(nextEle, draggingEle);
    }
};

const mouseUpHandler = () => {
    // Remove the placeholder
    if (placeholder) {
        placeholder.parentNode.removeChild(placeholder);
    }

    // Reset the flag
    isDraggingStarted = false;

    // Remove the position styles
    draggingEle.style.removeProperty('top');
    draggingEle.style.removeProperty('left');
    draggingEle.style.removeProperty('position');

    x = null;
    y = null;
    draggingEle = null;

    // Remove 'mousemove' and 'mouseup' event handlers
    document.removeEventListener('mousemove', mouseMoveHandler);
    document.removeEventListener('mouseup', mouseUpHandler);
};

const mouseDownHandler = (e) => {
    draggingEle = e.target.parentNode;

    // Calculate the mouse position
    const rect = draggingEle.getBoundingClientRect();
    x = e.pageX - rect.left;
    y = e.pageY - rect.top;

    // Attach the listeners `document`
    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
};

// Query the list element
const list = document.getElementById('list');

// Query all items
[].slice.call(list.querySelectorAll('.draggable')).forEach((item) => {
    item.addEventListener('mousedown', mouseDownHandler);
});

const toggleTask = (e) => {
    if (e.target.classList.contains('fa-check-circle')) {
        e.target.classList.add('fa-circle');
        e.target.classList.remove('fa-check-circle');
    } else {
        e.target.classList.add('fa-check-circle');
        e.target.classList.remove('fa-circle');
    }
};

[].slice.call(list.querySelectorAll('.fa-circle')).forEach((item) => {
    item.addEventListener('click', toggleTask);
});
