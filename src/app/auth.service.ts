import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8088/users'; // Change this URL if needed

  constructor(private http: HttpClient) { }

  signIn(username: string, password: string): Observable<any> {
    const loginRequest = { username, password };
    return this.http.post(`${this.apiUrl}/signin`, loginRequest);
  }

  updateUser(updatedUser: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/update`, updatedUser);
  }
}
