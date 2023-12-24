// UI Elements
const header = document.querySelector('h1'),
  title = document.getElementById('title'),
  author = document.getElementById('author'),
  isbn = document.getElementById('isbn'),
  submit = document.getElementById('submit'),
  tBody = document.querySelector('table tbody');

// Create Classes
class Book {
  constructor(t, a, i) {
    this.title = t;
    this.author = a;
    this.isbn = i;
  }
}
class UI {
  static showMessage(msg, check) {
    let alert = document.createElement('p');
    alert.textContent = msg;
    alert.className = `alert alert-${check ? 'success' : 'danger'} col-md-8`;
    header.after(alert);
    setTimeout(() => {
      alert.remove();
    }, 2000);
  }
  static addBook(obj) {
    let row = document.createElement('tr');
    row.innerHTML = `<td>${obj.title}</td><td>${obj.author}</td><td>${obj.isbn}</td> `;
    tBody.append(row);
  }
  static clearInput() {
    title.value = '';
    author.value = '';
    isbn.value = '';
  }
}
// Event Listener
submit.addEventListener('click', (e) => {
  if (title.value === '' || author.value === '' || isbn.value === '') {
    UI.showMessage('Please fill in all fields', false);
  } else {
    let book = new Book(title.value, author.value, isbn.value);
    UI.addBook(book);
    UI.clearInput();
    UI.showMessage('Book Added :)', true);
  }
  e.preventDefault();
});
