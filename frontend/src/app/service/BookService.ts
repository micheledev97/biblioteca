import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Book} from "../entity/Book";

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiUrl = 'http://localhost:8080/api/books';

  constructor(private readonly http: HttpClient) {}

  getBooks(): Observable<Book[]> {

    return this.http.get<Book[]>(this.apiUrl);
  }
 // this.http.get(`${this.apiUrl}/api/books`, { headers });
  addBook(book: Book): Observable<Book> {
    return this.http.post<Book>(this.apiUrl, book);
  }

  updateBook(id:number, book: Book): Observable<Book> {
    return this.http.put<Book>(`${this.apiUrl}/edit/${id}`,book)
  }


  deleteBook(id:number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`)
  }
}
