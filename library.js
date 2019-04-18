
// A library application

let myLibrary = []


/*
 * @param {title}: title of book
 * @param {author}: author of book
 * @param {pages): Number of pages in book
 * @param {read}: whether a book has been read or not
 */
function Book(title, author, pages, genre){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.genre = genre;
    this.read = false;

    this.info = function() {
        return `${this.title} by ${this.author}, ${this.pages} pages`;
    }
}

Book.prototype.toggleRead = function(){
        if (this.read){
        	this.read = false;
        }
        else {
        	this.read = true;
        }
    }

function addBookToLibrary() {
	let title = document.querySelector("#title").value;
	let author = document.querySelector("#author").value;
	let pages = document.querySelector("#pages").value;
	let genre = document.querySelector('#genre').value;

	let book;
	if (title && author && pages && genre) {
		book = new Book(title, author, pages, genre);

		myLibrary.push(book);
		clearTable();
		render();
		
	}

}

function removeBookFromLibrary(id){
	myLibrary.splice(id, 1);
	clearTable();
	render();

}

function clearTable(){
	// delete all displyed records
	let tbody = document.querySelector("tbody");
	while (tbody.firstChild){
		tbody.removeChild(tbody.firstChild);
	}
}


function render(){
	let bookRecords = document.querySelector('tbody');

	myLibrary.forEach((book, bookID) => {

		let bookRecord = document.createElement('tr');
		// book info
		let title = document.createElement('td');
		title.textContent = book.title;

		let author = document.createElement('td');
		author.textContent = book.author;

		let pages = document.createElement('td');
		pages.textContent = book.pages;

		let genre = document.createElement('td');
		genre.textContent = book.genre;

		let read = document.createElement('td');
		read.setAttribute('id', 'status');
		let readBtn = document.createElement('a');
		readBtn.classList.add('sign-up-btn');
		readBtn.classList.add('danger');
		readBtn.textContent = 'No'
		readBtn.addEventListener('click', function(){
			book.toggleRead();
			if (book.read === false){
				readBtn.textContent = 'No';
				readBtn.classList.add('danger');
			} else {
				readBtn.textContent = 'Yes';
				readBtn.classList.remove('danger');
			}
		})
		read.appendChild(readBtn);

		let remove = document.createElement('td');
		remove.setAttribute('id', 'remove');
		remove.setAttribute('data-id', bookID)
		remove.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>';

		remove.addEventListener('click', function(event){
			removeBookFromLibrary(remove.dataset.id);
		});


		bookRecord.appendChild(title);
		bookRecord.appendChild(author);
		bookRecord.appendChild(pages);
		bookRecord.appendChild(genre);
		bookRecord.appendChild(read);
		bookRecord.appendChild(remove);

		bookRecords.append(bookRecord);
	});

}

render();

let addBook = document.querySelector("#add-book");
addBook.addEventListener('click', function(){
	addBookToLibrary();
});
