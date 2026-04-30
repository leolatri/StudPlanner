import { computed, makeAutoObservable, runInAction } from 'mobx';
import { BookModel, BooksCollection, FilterValue } from '../models/types';
import { testBooks } from '../testData';
import mapperBooks from '../models/mappers/booksMapper';
import RootStore from './root.store';
import BooksAPI from '../services/api/books';
import { BookDTO } from '../services/types';

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
    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        makeAutoObservable(this);
        this.rootStore = rootStore;

    }

    async loadData() {
        await this.loadBooks();
    }

    async loadBooks() {
        this.loading = true;
        try {
            const response = await BooksAPI.getAllBooks();
            const allBooks = mapperBooks(response);
            const userId = this.rootStore.userStore.user?.user.id;
            const enrichedBooks: BookModel[] = allBooks.map((book) => ({
                ...book,
                isPersonal: book.owner_id !== null && book.owner_id === userId
            }));

            runInAction(() => {
                this.books = {
                    allBooks: enrichedBooks,
                    uniBooks: enrichedBooks.filter((el) => !el.isPersonal),
                    personalBooks: enrichedBooks.filter((el) => el.isPersonal),
                }
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

    async addBook(book: Omit<BookDTO, "id">) {
        this.loading = true;
        try {
            const newBookDTO = await BooksAPI.addBook(book);
            const userId = this.rootStore.userStore.user?.user.id;
            const newBookModel: BookModel = {
                id: newBookDTO.id,
                name: newBookDTO.name,
                autors: newBookDTO.autors,
                url: newBookDTO.url,
                owner_id: newBookDTO.owner_id,
                isPersonal: newBookDTO.owner_id !== null && newBookDTO.owner_id === userId,
            };
            runInAction(() => {
                this.books.allBooks.push(newBookModel);
                if (newBookModel.isPersonal) {
                    this.books.personalBooks.push(newBookModel);
                } else {
                    this.books.uniBooks.push(newBookModel);
                }
            });
        } catch (error) {
            console.log(error);
            throw error;
        } finally {
            runInAction(() => { this.loading = false; });
        }
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