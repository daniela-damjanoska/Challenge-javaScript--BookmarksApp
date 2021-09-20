'use strict';
const main = document.querySelector('.main'),
    listTitle = document.createElement('h2'),
    statusTitle = document.createElement('h2'),
    listOfBooks = document.createElement('ul'),
    readStatusOfTheBooks = document.createElement('ul'),
    table = document.createElement('table'),
    thead = document.createElement('thead'),
    headingRow = document.createElement('tr'),
    tbody = document.createElement('tbody'),
    inputTitle = document.querySelector('#title'),
    inputAuthor = document.querySelector('#author'),
    inputStatus = document.querySelector('#statusPages'),
    inputMaxPage = document.querySelector('#maxPages'),
    form = document.querySelector('form'),
    button = document.querySelector('form button');

let keysBooks, inputTitleVal, inputAuthorVal, inputStatusVal, inputMaxPageVal;

const fullLists = function (_title, _author, _status, _max) {
    const addBookList = document.createElement('li'),
        addBookStatus = document.createElement('li');

    addBookList.innerText = `${_title} by ${_author}`;

    if (`${_max}` === `${_status}`) {
        addBookStatus.innerText = `You already have read ${_title} by ${_author}`;
        addBookStatus.style.color = '#0d550d';
    } else {
        addBookStatus.innerText = `You steel need to read ${_title} by ${_author}`;
        addBookStatus.style.color = 'red';
    }

    listOfBooks.appendChild(addBookList);
    readStatusOfTheBooks.appendChild(addBookStatus);
};

const makeRows = function makeRows(_td1, _td2, _td3, _td4) {
    const rows = document.createElement('tr'),
        td1 = document.createElement('td'),
        td2 = document.createElement('td'),
        td3 = document.createElement('td'),
        td4 = document.createElement('td'),
        td5 = document.createElement('td'),
        progress = document.createElement('div'),
        progressBar = document.createElement('div'),
        progressCont = document.createElement('span'),
        percent = Math.floor(_td3 / (_td4 / 100));

    progress.classList.add('progress');
    progressBar.classList.add('bar');

    td1.innerText = _td1;
    td2.innerText = _td2;
    td3.innerText = _td3;
    td4.innerText = _td4;
    progressCont.innerText = `${percent}%`;

    progressBar.appendChild(progressCont);
    progress.appendChild(progressBar);
    td5.appendChild(progress);
    rows.append(td1, td2, td3, td4, td5);
    tbody.append(rows);

    let count = 0;
    if (count === 0) {
        let width = 0;
        let id = setInterval(inner, 10);
        function inner() {
            if (width >= percent) {
                clearInterval(id);
            } else {
                width++;
                progressBar.style.width = `${width}%`;
            }
        }
    }
};

const onSubmit = function (e) {
    e.preventDefault();

    if (
        inputTitle.value &&
        inputAuthor.value &&
        inputStatus.value &&
        inputMaxPage.value
    ) {
        inputTitleVal = inputTitle.value;
        inputAuthorVal = inputAuthor.value;
        inputStatusVal = inputStatus.valueAsNumber;
        inputMaxPageVal = inputMaxPage.valueAsNumber;

        const addNewBook = new Book(
            inputTitleVal,
            inputAuthorVal,
            inputStatusVal,
            inputMaxPageVal
        );

        books.push(addNewBook);
        console.log(books);

        // Add books to localStorage
        localStorage.setItem('bookInStorage', JSON.stringify(books));

        // updating the table and the both lists
        makeRows(
            inputTitleVal,
            inputAuthorVal,
            inputStatusVal,
            inputMaxPageVal
        );

        fullLists(
            inputTitleVal,
            inputAuthorVal,
            inputStatusVal,
            inputMaxPageVal
        );

        form.reset();
    } else {
        const modal = document.querySelector('.modal');
        const modalClose = document.querySelector('.close');
        modal.style.display = 'block';

        modalClose.addEventListener(
            'click',
            () => (modal.style.display = 'none')
        );

        document.addEventListener('click', e => {
            if (e.target.classList.contains('removeModal')) {
                modal.style.display = 'none';
            }
        });
    }
};

const onPageLoad = function () {
    const booksFromStorage = JSON.parse(localStorage.getItem('bookInStorage'));
    console.log(booksFromStorage);

    // if (booksFromStorage) {
    //     makeRows(
    //         inputTitleVal,
    //         inputAuthorVal,
    //         inputStatusVal,
    //         inputMaxPageVal
    //     );

    //     fullLists(
    //         inputTitleVal,
    //         inputAuthorVal,
    //         inputStatusVal,
    //         inputMaxPageVal
    //     );
    // }
};

listTitle.innerText = 'List of your Books:';
statusTitle.innerText = 'The status of your Books:';

main.append(listTitle, listOfBooks, statusTitle, readStatusOfTheBooks);

class Book {
    constructor(title, author, onPage, maxPages) {
        this.title = title;
        this.author = author;
        this.onPage = onPage;
        this.maxPages = maxPages;
    }
}

const book1 = new Book('"Lord of the rings"', 'J. R. R. Tolkien', 550, 1178),
    book2 = new Book('"The Alchemist"', 'Paulo Coelho', 208, 208),
    book3 = new Book('"Don Quixote"', ' Miguel de Cervantes', 320, 460),
    book4 = new Book(
        '"The Count of Monte Cristo"',
        'Alexandre Dumas',
        350,
        1276
    ),
    book5 = new Book('"The Da Vinci Code"', 'Dan Brown', 689, 689),
    books = [book1, book2, book3, book4, book5];

books.forEach(book => {
    fullLists(book.title, book.author, book.onPage, book.maxPages);
    makeRows(book.title, book.author, book.onPage, book.maxPages);

    keysBooks = Object.keys(book);
});

const capitalizeKeyBooks = keysBooks.map(
    el => el.charAt(0).toUpperCase() + el.slice(1)
);

capitalizeKeyBooks.push('Progress');

capitalizeKeyBooks.forEach(key => {
    const headings = document.createElement('th');
    headings.innerText = key;
    headingRow.appendChild(headings);
});

thead.appendChild(headingRow);
table.append(thead, tbody);
main.appendChild(table);

console.log(books);

button.addEventListener('click', onSubmit);
window.addEventListener('load', onPageLoad);
