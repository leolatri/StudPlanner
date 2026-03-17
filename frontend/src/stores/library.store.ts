import { makeAutoObservable } from 'mobx';
import { BookModel } from '../models/types';
import { testBooks } from '../testData';
import mapperBooks from '../models/mappers/booksMapper';
import RootStore from './root.store';

class LibraryStore {
    books: BookModel[] = [];
    loading = false;
    error: string | null = null;

    constructor(rootStore: RootStore) {
        makeAutoObservable(this);
        this.loadBooks();
    }

    async loadBooks() {
        this.loading = true;
        try {
            // const response = await api.get<BookDTO[]>('/books');
            // this.books = mapperBook(response.data);
            this.books = mapperBooks(testBooks);
        } catch (error: any) {
            this.error = error;
            console.log('error whth fetch Contacts');
        } finally {
            this.loading = false;
        }
    }

    addBook(book: BookModel) {
        this.books.push(book);
    }

    removeBook(id: string) {
        this.books = this.books.filter((b) => b.id !== id);
    }
}

export default LibraryStore;