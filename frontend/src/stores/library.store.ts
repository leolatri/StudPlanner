import { computed, makeAutoObservable, runInAction } from 'mobx';
import { BookModel, BooksCollection, FilterValue } from '../models/types';
import { testBooks } from '../testData';
import mapperBooks from '../models/mappers/booksMapper';
import RootStore from './root.store';

class LibraryStore {
    books: BooksCollection = {
        allBooks: [],
        personalBooks: [],
        uniBooks: []
    };
    filter: FilterValue = 0;
    loading = false;
    error: string | null = null;
    searchQuery: string = "";

    constructor(rootStore: RootStore) {
        makeAutoObservable(this);
        this.loadBooks();
    }

    async loadBooks() {
        this.loading = true;
        try {
            // const response = await api.get<BookDTO[]>('/books');
            // this.books = mapperBook(response.data);
            runInAction(() => {
                this.books = mapperBooks(testBooks);
            })
        } catch (error: any) {
            runInAction(() => {
                this.error = error;
            })
            console.log('error whth fetch Contacts');
        } finally {
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    setSearchQuery(val: string) {
        this.searchQuery = val;
        console.log(this.searchQuery);
        console.log(val);
    }

    get filteredBooks(): BookModel[] {
        const { allBooks } = this.books;
        const { searchQuery, filter } = this;

        let filteredBooks = allBooks;

        if (filter === 1) {
            filteredBooks = filteredBooks.filter((el) => el.isPersonal === true);
        } else if (filter === 2) {
            filteredBooks = filteredBooks.filter((el) => el.isPersonal !== true);
        }

        const query = searchQuery.trim().toLowerCase();
        if (query) {
            filteredBooks = filteredBooks.filter((el) =>
                el.name.toLowerCase().trim().includes(query) ||
                el.autors.some((a) => a.toLowerCase().trim().includes(query))
            );
        }

        return filteredBooks;
    }

    addBook(book: BookModel) {
        this.books.personalBooks.push(book);
        this.books.allBooks.push(book);
    }

    removeBook(id: string) {
        this.books.allBooks = this.books.allBooks.filter((b) => b.id !== id);
        this.books.personalBooks = this.books.personalBooks.filter(b => b.id !== id);
        this.books.uniBooks = this.books.uniBooks.filter(b => b.id !== id);
    }

    setFilter(param: FilterValue) {
        this.filter = param;
    }
}

export default LibraryStore;