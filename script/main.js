// UI Elements
const alert = document.querySelector('.alert'),
  container = document.querySelector('.main'),
  title = document.getElementById('title'),
  author = document.getElementById('author'),
  isbn = document.getElementById('isbn'),
  submit = document.getElementById('submit'),
  tBody = document.querySelector('table tbody');

// Create Classes

// Class For Books
class Book {
  constructor(t, a, i) {
    this.title = t;
    this.author = a;
    this.isbn = i;
  }
}
// Class Contain Methods handel UI
class UI {
  static showMessage(msg, check) {
    alert.textContent = msg;
    alert.className = `alert d-block alert-${
      check ? 'success' : 'danger'
    } col-md-8`;
    setTimeout(() => {
      alert.className += ' d-none';
    }, 2000);
  }
  static addBook(obj) {
    let row = document.createElement('tr');
    row.innerHTML = `
    <td class="pt-3">${obj.title}</td>
    <td class="pt-3">${obj.author}</td>
    <td class="pt-3">${obj.isbn}</td>
    <td>
    <button class="btn btn-danger delete d-block ms-auto">Delete</button>
    </td> `;
    tBody.append(row);
  }
  static loadBooks(books) {
    books.forEach((book) => this.addBook(book));
  }
  static clearInput() {
    title.value = '';
    author.value = '';
    isbn.value = '';
  }
  static deleteBook(target) {
    target.parentElement.parentElement.remove();
    this.showMessage('Book Removed ;)', true);
  }
}
// Class Deale with local storage
class Store {
  // Get all Books From LS
  static getData() {
    let books;
    if (localStorage.books === undefined) {
      books = [];
    } else {
      books = JSON.parse(localStorage.books);
    }
    return books;
  }
  // Add To Local Storage
  static saveBook(book) {
    let books = this.getData();
    books.push(book);
    localStorage.books = JSON.stringify(books);
  }
  // Delete Book From LS
  static deleteBook(isbn) {
    let books = this.getData();
    books.forEach((e, i) => {
      if (e.isbn === isbn) {
        books.splice(i, 1);
      }
    });
    localStorage.books = JSON.stringify(books);
  }
}
// Event Listener
submit.addEventListener('click', (e) => {
  if (title.value === '' || author.value === '' || isbn.value === '') {
    UI.showMessage('Please fill in all fields', false);
  } else {
    let book = new Book(title.value, author.value, isbn.value);
    UI.addBook(book);
    Store.saveBook(book);
    UI.clearInput();
    UI.showMessage('Book Added :)', true);
  }
  e.preventDefault();
});

// Event Delegation to target delete button
container.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete')) {
    Store.deleteBook(e.target.parentElement.previousElementSibling.innerText);
    UI.deleteBook(e.target);
  }
});
// Add all Books at list when documnet load
document.addEventListener('DOMContentLoaded', () => {
  UI.loadBooks(Store.getData());
});
