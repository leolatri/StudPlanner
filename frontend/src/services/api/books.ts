import { BookDTO } from "../types";
import { apiClient } from "./client";
import apiUrls from "../urls";

class BooksAPI {
   async getAllBooks(): Promise<BookDTO[]> {
        const data = await apiClient.get<BookDTO[]>(apiUrls.books);
        console.log('data:', data);
        return data;
    }
}

export default new BooksAPI;