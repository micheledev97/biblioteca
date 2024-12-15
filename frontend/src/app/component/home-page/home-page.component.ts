import {Component, OnInit} from '@angular/core';
import {Book} from "../../entity/Book";
import {BookService} from "../../service/BookService";
import {AuthService} from "../../service/AuthService";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit{
books: Book[]= [];
newBook: Book = { title: '', author: '', year: new Date().getFullYear() };
  // Define columns to display
  displayedColumns: string[] = ['title', 'author', 'year'];
  editingRowIndex: number | null = null; // Tracks the row being edited

  constructor(private readonly bookService: BookService, public authService: AuthService, private router: Router) {
  if (this.authService.role.value === 'ADMIN') {
    this.displayedColumns.push('actions');
  }
}
  ngOnInit(): void {
    this.fetchBooks();
  }


  fetchBooks(): void {
    this.bookService.getBooks().subscribe((data) => {
      this.books = data;
    });
  }

  addBook(): void {
  this.bookService.addBook(this.newBook).subscribe(()=> {
    this.fetchBooks()
    this.newBook = { title: '', author: '', year: new Date().getFullYear() };
  })
  }

  updateBook(book: Book): void {
  if(book.id) {
    this.bookService.updateBook(book.id, book).subscribe(()=>{
      this.fetchBooks()
    })
  }
  }

  deleteBook(id:number): void {
    if(id) {
      this.bookService.deleteBook(id).subscribe(()=>{
        this.fetchBooks()
      })
    }
  }
  startEdit(index: number) {
    this.editingRowIndex = index;
  }

  saveEdit(book: any) {
    console.log('Saved book:', book);
    this.updateBook(book);
    this.editingRowIndex = null;
  }

  cancelEdit() {
    // Reset editing state
    console.log('Edit cancelled');
    this.editingRowIndex = null;
  }

  logout():void {
  this.authService.logout()
  this.router.navigate(['/login']);
}
}
