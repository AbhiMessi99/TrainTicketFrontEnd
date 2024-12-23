import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrainService {
  private apiUrl = 'http://localhost:8088/trains/searchtrain'; // Update with your API base URL

  constructor(private http: HttpClient) {}

  // Method to fetch trains between source and destination
  getTrains(source: string, destination: string): Observable<Train[]> {
    const params = new HttpParams().set('source', source).set('destination', destination);
    return this.http.get<Train[]>(this.apiUrl, { params });
  }

  bookTicket(bookingRequest: TicketBookingRequest): Observable<any> {
    return this.http.post(`http://localhost:8088/tickets/book`, bookingRequest);
  }
}

// Train interface to define the data structure
export interface Train {
  id: number;
  trainName: string;
  source: string;
  destination: string;
  seatsAvailable: number;
}

export interface TicketBookingRequest {
  trainId: number;
  seats: number;
  passengerNames: string[];
  username: string;
}

// Ticket interface
export interface Ticket {
  train: Train;
  seatsBooked: number;
  passengerNames: string[];
  bookingId: string;
}