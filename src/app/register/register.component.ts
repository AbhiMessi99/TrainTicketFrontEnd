import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user = {
    username: '',
    email: '',
    password: ''
  };
  
  confirmPassword: string = '';
  
  constructor(private http: HttpClient, private router: Router) {}

  register() {
    if (this.user.password !== this.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    this.http.post('http://localhost:8088/users/register', this.user).subscribe(
      (response) => {
        alert('Registration successful! You can now log in.');
        this.router.navigate(['/login']); // Navigate to the login page
      },
      (error) => {
        console.error('Registration failed', error);
        alert('Registration failed. Please try again.');
      }
    );
  }
}
