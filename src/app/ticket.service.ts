import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  private baseUrl = 'http://localhost:8080/tickets'; // Update with your backend URL

  constructor(private http: HttpClient) {}

  // Method to book a ticket
  bookTicket(bookingRequest: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/book`, bookingRequest);
  }
}
