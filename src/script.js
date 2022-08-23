const formInput = document.querySelector('form.mb-3');
const tBody = document.querySelectorAll('#book-list');
const inputCari = document.querySelector('#cari-list');
const notifikasi = document.querySelector('.row .col .alert');
const keyStorage = "book-list";

// class untuk constructor buku
class Book {
    constructor(title, author, isbn, status) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
        this.status = status;
    }
}

class UIwebsite {
    // method menambahkan buku ke tabel "Belum dibaca"
    static addBook(book) {
        const tBody = document.querySelectorAll('#book-list');
        const row = document.createElement('tr');
        if (book.status) {
            row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td class="d-flex justify-content-around">
                <a href="#" class="btn btn-info btn-sm reloud"><i class="fa-solid fa-arrows-rotate"></i></a>
                <a href="#" class="btn btn-danger btn-sm delete"><i class = "fa-solid fa-trash"></i></a>
            </td>
            `;
            tBody[1].insertBefore(row, tBody[1].children[0]);
        } else {
            row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td class="d-flex justify-content-around">
                <a href="#" class="btn btn-success btn-sm complite"><i class="fa-solid fa-check"></i></a>
                <a href="#" class="btn btn-danger btn-sm delete"><i class = "fa-solid fa-trash"></i></a>
            </td>
            `;
            tBody[0].appendChild(row);
        }
    }
    // method membersihkan input form
    static clearInputForm() {
        document.querySelector('#judulBuku').value = '';
        document.querySelector('#penulis').value = '';
        document.querySelector('#isbn').value = '';
    }
    // method menghapus buku pada list
    static buttonList(el) {
        if (el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();
            Store.deleteLocalStorage(el.parentElement.parentElement.children[2].textContent);
            this.alertPop('danger', 'Buku berhasil dihapus dari tabel!');
        } else if (el.classList.contains('complite')) {
            const title = el.parentElement.parentElement.children[0].textContent;
            const author = el.parentElement.parentElement.children[1].textContent;
            const isbn = el.parentElement.parentElement.children[2].textContent;
            const status = true;

            const book = new Book(title, author, isbn, status);
            // menyisipkan buku ke table 'selesai membaca'
            this.addBook(book);
            this.alertPop('success', `Buku ${title} selesai dibaca!`)
            // melakukan perubahan pada local storage
            Store.changeLocalStorage(isbn, status);
            // menghapus buku pada table 'belum dibaca'
            el.parentElement.parentElement.remove();
        } else if (el.classList.contains('reloud')) {
            const title = el.parentElement.parentElement.children[0].textContent;
            const author = el.parentElement.parentElement.children[1].textContent;
            const isbn = el.parentElement.parentElement.children[2].textContent;
            const status = false;

            const book = new Book(title, author, isbn, status);
            // menambahkan buku ke table 'belum dibaca'
            this.addBook(book);
            this.alertPop('info', `Buku ${title} berhasil dipindahkan`);
            // melakukan perubahan pada local storage
            Store.changeLocalStorage(isbn, status);
            // menghapus buku pada table 'selesai dibaca'
            el.parentElement.parentElement.remove();
        }
    }
    // method menampilkan popup notifikasi
    static alertPop(tipe, text){
        notifikasi.textContent = text;
        notifikasi.classList = `alert alert-${tipe}`;
        setTimeout(()=>{
            notifikasi.classList.add("pop");
        },1500);
    }
}

class Store {
    // mengambil data dari local storage
    static getBooks() {
        let books;
        if (localStorage.getItem(keyStorage) == null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem(keyStorage));
        }
        return books;
    }
    // method menambahkan data ke local storage
    static addLocalStorage(dataBook) {
        const list = this.getBooks();

        list.push(dataBook)
        localStorage.setItem(keyStorage, JSON.stringify(list));
    }
    // menghapus data dari local storage
    static deleteLocalStorage(textData) {
        const list = this.getBooks();

        list.forEach((konten, index) => {
            if (textData === konten.isbn) {
                list.splice(index, 1);
            }
        });
        localStorage.setItem(keyStorage, JSON.stringify(list));
    }
    // method mengubah data pada local storage
    static changeLocalStorage(textData, status) {
        const list = this.getBooks();

        list.forEach((konten, index) => {
            if (textData === konten.isbn) {
                if (status) {
                    list.splice(index, 1, {
                        title: konten.title,
                        author: konten.author,
                        isbn: konten.isbn,
                        status: status,
                    });
                } else {
                    list.splice(index, 1, {
                        title: konten.title,
                        author: konten.author,
                        isbn: konten.isbn,
                        status: status,
                    });
                }
            }
        });
        localStorage.setItem(keyStorage, JSON.stringify(list));
    }
}
// load data pada local storage
document.addEventListener('DOMContentLoaded', () => {
    const list = Store.getBooks();

    list.forEach((el) => {
        UIwebsite.addBook(el);
    });
});

formInput.addEventListener('submit', (e) => {
    e.preventDefault();
    // mendapatkan nilai pada form input
    const title = document.querySelector('#judulBuku').value;
    const author = document.querySelector('#penulis').value;
    const isbn = document.querySelector('#isbn').value;
    const status = false;

    // jika input button kosong
    if (title === '' || author === '' || isbn === '') {
        UIwebsite.alertPop('info','Silahkan lengkapi data buku anda!');
    } else {
        const book = new Book(title, author, isbn, status);
        // menambahkan buku ke tabel
        UIwebsite.addBook(book);
        // menambahkan buku ke localStorage
        Store.addLocalStorage(book);
        // membersihkan input form
        UIwebsite.alertPop('success', 'Data buku berhasil ditambahkan!')
        UIwebsite.clearInputForm();
    }
});

// membuat event menghapus list
tBody.forEach((el) => {
    el.addEventListener('click', (e) => {
        e.preventDefault();

        if (e.target.classList.contains('btn')) {
            UIwebsite.buttonList(e.target);
        } else if (e.target.classList.contains('fa-solid')) {
            UIwebsite.buttonList(e.target.parentElement);
        }
    });
});
// melakukan filter list
inputCari.addEventListener('keyup', (e) => {
    const cariList = e.target.value.toLowerCase();
    let itemList = document.querySelectorAll('#book-list tr');

    itemList.forEach((item) => {
        const valueItem = item.children[0].textContent.toLowerCase();

        if (valueItem.indexOf(cariList) != -1) {
            item.setAttribute("style", "display:static;")
        } else {
            item.setAttribute("style", "display:none !important;")
        }
    });
});