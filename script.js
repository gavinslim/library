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

function add_book_to_library() {

    // Prompt for user input 

    // Store new book object into my_library array 

}

// const lotr = new book("The Hobbit", "J.R.R. Tolkien", 295, true);
// console.log(lotr.info());