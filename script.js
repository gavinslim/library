let my_library = [];

function book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

/*
    ToDos:
    - Sort by author, title, pages, read
    - Add bookmark image 
    - Display number of unread books (include percentage)
    - Add modify book button
    - overal disables all pointers
*/

// Retrieve selectors for form (data attributes) and overlay
// Reference: https://www.youtube.com/watch?v=MBaw_6cPmAw&ab_channel=WebDevSimplified
const open_button = document.querySelector('[data-open-button]');
const form = document.querySelector('.form');
const close_button = document.querySelector('[data-close-button]');
const submit_button = document.querySelector('[data-submit-button]');
const modify = document.querySelector('.modify');
const modify_close_button = document.querySelector('[data-modify-close-button]');
const modify_submit_button = document.querySelector('[data-modify-submit-button]');
const overlay = document.getElementById('overlay');
const remove_book_button = document.querySelector('delete-btn')

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

// Find and remove book in my_library array
function delete_book() {
    var book_index = my_library.findIndex(book => book.title == this.parentNode.id);
    my_library.splice(book_index, 1);
    refresh_library();
}

// Toggling read status and updating my_library array
function toggle_read() {
    var book = my_library.find(book => book.title == this.parentNode.id);

    if (this.classList.contains('active')) {
        this.classList.remove('active');
        book.checked = false;
    } else {
        this.classList.add('active');
        book.checked = true;
    }    
}

// Modify book
function modify_book() {

    // Find book 
    var book = my_library.find(book => book.title == this.parentNode.id);

    document.getElementById('modify-title').value = book.title;
    document.getElementById('modify-author').value = book.author;
    document.getElementById('modify-pages').value = book.pages;
    document.getElementById('modify-read').checked = book.checked;

    this.parentNode.classList.add('target');
    modify.classList.add('active');
    overlay.classList.add('active');
}

modify_submit_button.addEventListener('click', () => {

    // Find book and modify it based on user inputs
    const selected = document.querySelector('.target');
    var book = my_library.find(book => book.title == selected.getAttribute('id'));
    book.title = document.getElementById('modify-title').value;
    book.author = document.getElementById('modify-author').value;
    book.pages = document.getElementById('modify-pages').value;
    book.read = document.getElementById('modify-read').checked;

    selected.classList.remove('target');
    modify.classList.remove('active');
    overlay.classList.remove('active');

    refresh_library();
});

// Close modify form
modify_close_button.addEventListener('click', () => {
    const temp = document.querySelector('.target');
    temp.classList.remove('target');
    modify.classList.remove('active');
    overlay.classList.remove('active');
});

// Refresh library display
function refresh_library() {
    let parent = document.getElementsByClassName('library')[0];

    // Delete current display
    parent.innerHTML = '';

    // Add book to library display
    my_library.forEach(book => {
    
        const child = document.createElement('div');
        child.classList.add('book');
        
        // Add delete button
        const close = document.createElement('button');
        close.classList.add('delete-book-btn');
        close.addEventListener('click', delete_book);
        child.appendChild(close);

        // Add checkmark button for read status
        const read = document.createElement('button');
        read.classList.add('fas', 'fa-check-circle', 'check-btn');
        read.addEventListener('click', toggle_read);
        child.appendChild(read);

        // Add modify button
        const modify = document.createElement('button');
        modify.classList.add('fas', 'fa-cog', 'modify-btn');
        modify.addEventListener('click', modify_book);
        child.appendChild(modify);

        // Add bookmark feature
        const bookmark = document.createElement('div');
        bookmark.classList.add('fas', 'fa-bookmark', 'bookmark');
        child.appendChild(bookmark);

        // Iterate each property in object and update book
        for (const [key, value] of Object.entries(book)) {
            const paragraph = document.createElement('p');
            
            // Add title info and delete button
            if (key == 'title') {
                paragraph.classList.add('book-title');
                paragraph.innerHTML = `${value}`;
                child.setAttribute('id', value)
            
            // Add author info
            } else if (key == 'author') {
                paragraph.classList.add('book-author');
                paragraph.innerHTML = `${value}`;
            
            // Add page info 
            } else if (key == 'pages') {
                paragraph.classList.add('book-pages');
                paragraph.innerHTML = `${value} pages`;
            
            // Add read button status 
            } else if (key == 'read') {
                if (value == true) {read.classList.add('active');}
                else {read.classList.remove('active');}
            } else {
                continue;
            }            
            child.appendChild(paragraph);
        }

        parent.appendChild(child);
    });
}

// Activate form and overlay
open_button.addEventListener('click', () => {
    form.classList.add('active');
    overlay.classList.add('active');
});

// Disable form and overlay
close_button.addEventListener('click', () => {
    form.classList.remove('active');
    overlay.classList.remove('active');

    // Clear input fields
    title.value = '';
    author.value = '';
    pages.value = '';
    read.checked = false;
});

// Submit form
submit_button.addEventListener('click', () => {
    const title = document.getElementById('title');
    const author = document.getElementById('author');
    const pages = document.getElementById('pages');
    const read = document.getElementById('read');

    // Check if submitted book already exists in library
    

    // New book to library
    const new_book = new book(title.value, author.value, pages.value, read.checked);
    add_to_library(new_book);
    refresh_library();

    // Clear input fields
    title.value = '';
    author.value = '';
    pages.value = '';
    read.checked = false;
});

const lotr = new book("The Hobbit", "J.R.R. Tolkien", 2905, false);
const harrypotter = new book("Harry Potter and the Globlet of Fire", "J.K. Rowling", 200, false);
const starwars = new book("Dark Force Rising", "Timothy Zahn", 34, false);
const got = new book("A Clash of Kings", "George R.R. Martin", 382, false);

add_to_library(lotr);
add_to_library(harrypotter);
add_to_library(starwars);
add_to_library(got);
refresh_library();

