/*
 * This project is a simple library application that allows
 * a user to add, view or delete books
 */ 

// An icon to show a book has been read
const checkIcon = '<i class="fa fa-check" aria-hidden="true"></i>';

// An icon to show a book has not been read
const unCheckIcon = '<i class="fa fa-times" aria-hidden="true"></i>';

// An icon to show delete action
const deleteIcon = '<i class="fa fa-trash" aria-hidden="true"></i>';

const bookHeaders = ['title', 'author', 'year', 'genre', 'pages', 'read', 'delete'];

function saveLibrary(){
    // Persistently store the data
    localStorage.setItem('library', JSON.stringify(myLibrary));
}

function getLibrary(){
    // check if there is a library in storage, if not, create a new empty one
    let data = localStorage.getItem('library')?
        JSON.parse(localStorage.getItem('library')) : [];
    if (data) {
        data.forEach((bookObj) => {
            bookObj.__proto__ = Book.prototype;
        });
    }
    return data;
}
 
function Book(title, author, year, genre, pages) {
    this.title = title;
    this.author = author;
    this.year = year;
    this.genre = genre;
    this.pages = pages
    this.read = false;
}

Book.prototype.toggleRead = function() {
    this.read = this.read? false: true;
};


function createNewBook(){
    // create a book object using data obtained from user input
    let title = document.querySelector("#title").value;
    let author = document.querySelector("#author").value;
    let year = document.querySelector("#year").value;
    let pages = document.querySelector("#pages").value;
    let genre = document.querySelector("#genre").value;

    return new Book(title, author, year, genre, pages);
}

function updateChanges(){
    saveLibrary();
    clearTable();
    render();
}

function addBookToLibrary(book) {
    myLibrary.push(book);
    updateChanges();
}

function removeBookFromLibrary(id){
	myLibrary.splice(id, 1);
    updateChanges();
}

function clearTable(){
	// delete all displayed book records
	let library = document.querySelector("#book-list");
	while (library.firstChild){
		library.removeChild(library.firstChild);
	}
}

function deleteLibrary(){
    localStorage.clear();
    myLibrary = getLibrary();
    clearTable();
    render();
}

function render() {
    let bookList = document.querySelector("#book-list");
    let bookHeader = document.createElement("tr");

    // create the table header
    bookHeaders.forEach((h) => {
        th = document.createElement('th');
        th.innerHTML = h;
        bookHeader.appendChild(th);
    });
   
    bookList.appendChild(bookHeader);
    
    // display all books in the library
    myLibrary.forEach((book, id) => {
        let bookInfo = document.createElement('tr'); 
        let bookKeys = Object.keys(book);
        bookKeys.push("delete");
        bookKeys.forEach((key) => {
            let entry  = document.createElement('td');
            if (key == "delete"){
                entry.innerHTML = deleteIcon;
                entry.classList.add('delete');
                entry.setAttribute("data-id", id);
                entry.addEventListener('click', function(){
                    removeBookFromLibrary(entry.dataset.id);
                });

            } else if (key == 'read') {
                entry.innerHTML = book.read? checkIcon: unCheckIcon;
                entry.style.color = book.read? "blue": "black";
                entry.classList.add("read-status");
                entry.addEventListener('click', function(){
                    book.toggleRead();
                    entry.innerHTML = book.read? checkIcon: unCheckIcon;
                    entry.style.color = book.read? "blue": "black";
                    updateChanges();
                });
            }else{
                entry.innerHTML = book[key];
            }
            bookInfo.appendChild(entry);
        });

        bookList.appendChild(bookInfo);

    });

}

// Library database
let myLibrary = getLibrary();

render();

// Event listeners
function hideModal() {
    let modal = document.querySelector(".add-book-modal");
    modal.style.display = 'none';
}

function showModal() {
    let modal = document.querySelector(".add-book-modal");
    modal.style.display = 'block';
}

let addBtn = document.querySelector("#add-btn");
addBtn.addEventListener("click", function(){
    showModal();
});

let closeBtn = document.querySelector(".close");
closeBtn.addEventListener("click", function(){
    hideModal();
});

let addBook = document.querySelector("#book-info-form");
addBook.addEventListener("submit", function(e){
    // prevent default submit action which sends data to server)
    e.preventDefault(); 
    let book = createNewBook();
    addBookToLibrary(book);
    hideModal();
});

let clearBtn = document.querySelector("#clear-btn");
clearBtn.addEventListener("click", function(){
    deleteLibrary();
});

