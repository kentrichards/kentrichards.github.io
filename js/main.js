const tabs = Array.from(document.getElementsByClassName('nav-link'));
const contentBoxes = [
    document.getElementById('about'),
    document.getElementById('projects'),
    document.getElementById('contact'),
    document.getElementById('articles'),
];

tabs.forEach((tab) => {
    // switch content when tab is pressed
    tab.addEventListener('click', (event) => {
        tabs.forEach((tab) => {
            tab.classList.remove('active');
        });

        const elem = event.target.tagName;
        let tabName = '';
        if (elem === 'I' || elem === 'SPAN') {
            // if a child element intercepts the click
            event.target.parentElement.classList.add('active');
            tabName = event.target.parentElement.innerText.toLowerCase();
        } else {
            event.target.classList.add('active');
            tabName = event.target.innerText.toLowerCase();
        }

        contentBoxes.forEach((contentBox) => {
            if (contentBox.id === tabName) {
                contentBox.style.display = 'block';
            } else {
                contentBox.style.display = 'none';
            }
        });
    });
});
