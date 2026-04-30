import { BookDTO } from "../types";
import { apiClient } from "./client";
import apiUrls from "../urls";

class BooksAPI {
   async getAllBooks(): Promise<BookDTO[]> {
        const data = await apiClient.get<BookDTO[]>(apiUrls.books);
        return data;
    }

    async addBook(bookData: Omit<BookDTO, 'id'>): Promise<BookDTO> {
        return await apiClient.post<BookDTO>(apiUrls.books, bookData);
    }

    async deleteBook(bookId: string): Promise<{ok: boolean}> {
        return await apiClient.delete(`${apiUrls.books}/${bookId}`);
    }
}

export default new BooksAPI;