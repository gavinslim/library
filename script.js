let my_library = [];

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

// Open pop-up form
function open_form() {
    document.getElementById('form').style.display = "block";
    console.log('hello');
}

// Close pop-up form
function close_form() {
    document.getElementById('form').style.display = "none";
}

// Store new book object into my_library array 
function add_to_library(input_book) {    
    my_library.push(input_book);
}

function foo(book) {
    

}

function read_library() {
    let parent = document.getElementsByClassName('library')[0];
    // const card = document.createElement('div');
    // parent.appendChild(card);

    // Add to library grid
    my_library.forEach(book => {
        const child = document.createElement('div');
        child.classList.add('book');

        for (const [key, value] of Object.entries(book)) {
            console.log(`${key}: ${value}`);
            const paragraph = document.createElement('p');
            paragraph.innerHTML = `${key}: ${value}`;
            child.appendChild(paragraph);
        }

        // child.innerHTML = book.title;
        parent.appendChild(child);
    });
}

const lotr = new book("The Hobbit", "J.R.R. Tolkien", 295, true);
const harrypotter = new book("Globet of Fire", "J.K. Rowling", 200, true);
const starwars = new book("Dark Force Rising", "Timothy Zahn", 34, false);

add_to_library(lotr);
add_to_library(harrypotter);
add_to_library(starwars);
read_library();

