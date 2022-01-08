let my_library = [];

// Retrieve selectors for form (data attributes) and overlay
// Reference: https://www.youtube.com/watch?v=MBaw_6cPmAw&ab_channel=WebDevSimplified
const open_button = document.querySelector('[data-open-button]');
const close_button = document.querySelector('[data-close-button]');
const submit_button = document.querySelector('[data-submit-button]');
const overlay = document.getElementById('overlay');

function book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

// Define info function on prototype
book.prototype.info = function() {
    let temp = this.read == true ? "read already" : "not read yet";
    let out = this.title + " by " + this.author + ", " + this.pages + " pages, " + temp;
    return out;
}

// Store new book object into my_library array 
function add_to_library(input_book) {    
    my_library.push(input_book);
}

// Refresh library display
function refresh_library() {
    let parent = document.getElementsByClassName('library')[0];

    // Delete current display
    parent.innerHTML = '';

    // Add to library grid
    my_library.forEach(book => {
    
        const child = document.createElement('div');
        child.classList.add('book');

        const close = document.createElement('button');
        close.classList.add('delete-btn');
        child.appendChild(close);

        for (const [key, value] of Object.entries(book)) {
            const paragraph = document.createElement('p');
            paragraph.innerHTML = `${value}`;
            child.appendChild(paragraph);
        }

        parent.appendChild(child);
    });
}

// Open pop-up form
function open_form() {
    document.getElementById('form').style.display = "block";
    console.log('hello');
}

// Close pop-up form
function close_form() {
    document.getElementById('form').style.display = "none";
}

// Activate form and overlay
open_button.addEventListener('click', () => {
    const form = document.querySelector('.form');
    form.classList.add('active');
    overlay.classList.add('active');
});

// Disable form and overlay
close_button.addEventListener('click', () => {
    const form = document.querySelector('.form');
    form.classList.remove('active');
    overlay.classList.remove('active');
});

// Submit form
submit_button.addEventListener('click', () => {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const read = document.getElementById('read').value;

    // Check if submitted book already exists in library
    

    // Add to library
    let temp = read == 'on' ? true : false;
    const new_book = new book(title, author, pages, temp);
    add_to_library(new_book);
    
    // Modify feature of book if already read 

    refresh_library();
});

// const lotr = new book("The Hobbit", "J.R.R. Tolkien", 295, true);
// const harrypotter = new book("Globet of Fire", "J.K. Rowling", 200, true);
// const starwars = new book("Dark Force Rising", "Timothy Zahn", 34, false);
// const book1 = new book("Book 1", "Author 1", 123, true);

// add_to_library(lotr);
// add_to_library(harrypotter);
// add_to_library(starwars);
// add_to_library(book1);
// refresh_library();

