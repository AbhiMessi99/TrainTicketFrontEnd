import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingsService {
  private apiUrl = 'http://localhost:8088/tickets/user'; // Replace with your backend URL

  constructor(private http: HttpClient) {}

  // Fetch tickets by username
  getTicketsByUsername(username: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${username}`);
  }
  cancelTicket(id: number): Observable<string> {
    return this.http.delete(`http://localhost:8088/tickets/cancel/${id}`, { responseType: 'text' });
  }
}
