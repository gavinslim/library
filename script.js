let my_library = [];

function book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

// Retrieve selectors for form (data attributes) and overlay
// Reference: https://www.youtube.com/watch?v=MBaw_6cPmAw&ab_channel=WebDevSimplified
const open_button = document.querySelector('[data-open-button]');
const close_button = document.querySelector('[data-close-button]');
const submit_button = document.querySelector('[data-submit-button]');
const form = document.querySelector('.form');
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

        // Populate book
        for (const [key, value] of Object.entries(book)) {
            const paragraph = document.createElement('p');
            if (key == 'title') {
                paragraph.classList.add('book-title');
                paragraph.innerHTML = `${value}`;

                // Modify delete button to specify current book
                child.setAttribute('id', value)
            }
            else if (key == 'author') {
                paragraph.classList.add('book-author');
                paragraph.innerHTML = `${value}`;
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
    
    refresh_library();
});

const lotr = new book("The Hobbit", "J.R.R. Tolkien", 295, true);
const harrypotter = new book("Harry Potter and the Globlet of Fire", "J.K. Rowling", 200, true);
const starwars = new book("Dark Force Rising", "Timothy Zahn", 34, false);
const got = new book("A Clash of Kings", "George R.R. Martin", 382, true);

add_to_library(lotr);
add_to_library(harrypotter);
add_to_library(starwars);
add_to_library(got);
refresh_library();

