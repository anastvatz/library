const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    this.changeRead = function () {
        this.read = !this.read; // Toggle the read status
    };

    this.info = function () {
        const isRead = this.read ? "read" : "not read";
        return `${this.title} by ${this.author}, ${this.pages} pages, ${isRead}`;
    };
}

// function clearForm(){
//     document.forms["books"].reset();
// }
document.getElementById("newBookButton").addEventListener("click", function () {
    document.getElementById("newBook").style.display = "flex";
    document.getElementById("overlay").style.display = "flex";
});

// Event listener for the "Add Book" button in the modal
document.getElementById("addBookButton").addEventListener("click", function (event) {
    event.preventDefault(); // Prevents the form from submitting in the traditional way
    addBookToLibrary();
});

// Event listener for the "Close" button in the modal
document.getElementById("closeForm").addEventListener("click", function () {
    document.getElementById("newBook").style.display = "none";
    document.getElementById("overlay").style.display = "none";
    // Reset the form when closing the modal
    document.getElementById("newBookForm").reset();
});

// Function to create a button with an event listener
function createButton(text, clickHandler) {
    const button = document.createElement("button");
    button.textContent = text;
    button.addEventListener("click", clickHandler);
    return button;
}


function addBookToLibrary() {
    let title = document.getElementById("title").value;
    let author = document.getElementById("author").value;
    let pages = document.getElementById("pages").value;
    let read = document.getElementById("read").checked;

    const newBook = new Book(title, author, pages, read);

    // Add the new book to the library array
    myLibrary.push(newBook);

    document.getElementById("newBookForm").reset();
    document.getElementById("newBook").style.display = "none";
    document.getElementById("overlay").style.display = "none";

    // Display the book information
    //console.log(`Book added to the library: ${newBook.info()}`);

    showLibrary();
}
function showLibrary() {
    const libraryTable = document.getElementById("libraryTable");

    // Clear existing content
    libraryTable.innerHTML = '';

    // Create a table to display the library
    const table = document.createElement("table");

    // Create table headers
    const headers = ["Title", "Author", "Pages", "Read", "Remove", "Change Read Status"];
    const headerRow = document.createElement("tr");
    headers.forEach(headerText => {
        const th = document.createElement("th");
        th.textContent = headerText;
        headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    // Loop through the library and add rows
    myLibrary.forEach((book, index) => {
        const row = document.createElement("tr");

        // Add book details to the row, excluding functions
        Object.entries(book).forEach(([key, value]) => {
            if (typeof value !== "function") {
                const td = document.createElement("td");
                td.textContent = value;
                row.appendChild(td);
            }
        });

        // Add a button to remove the book
        const removeButton = createButton("Remove", function () {
            // Remove the book from the library
            myLibrary.splice(index, 1);
            // Update the displayed library
            showLibrary();
        });
        const tdRemove = document.createElement("td");
        tdRemove.appendChild(removeButton);
        row.appendChild(tdRemove);

        // Add a button to toggle read status
        const toggleButton = createButton("Read", function () {
            // Toggle the read status when the button is clicked
            book.changeRead();
            // Update the displayed library
            showLibrary();
        });

        const tdToggle = document.createElement("td");
        tdToggle.appendChild(toggleButton);
        row.appendChild(tdToggle);

        table.appendChild(row);
    });

    // Append the table to the libraryTable div
    libraryTable.appendChild(table);
}

