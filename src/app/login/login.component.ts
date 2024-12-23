import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  message: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin(): void {
    this.authService.signIn(this.username, this.password).subscribe(
      (response: any) => {
        // Log the entire response to check its structure
        console.log(response);
  
        // Check if the response contains a message and display it
        if (response && response.message) {
          this.message = response.message;  // Assuming response has a 'message' field
        } else if (response && response.token) {
          // Assuming the response contains a token on successful login
          this.message = 'Login successful!';  // Display success message
          // Save the token (e.g., to local storage or in the service)
          
          localStorage.setItem('authToken', response.token);
        } else {
          this.message = 'Login successful!';  // Fallback message if no specific message or token
        }
        localStorage.setItem('username', response.username);
        localStorage.setItem('email', response.email);
        console.log('Username stored in localStorage:', response.username);
        // Navigate to the home page after a successful login
        this.router.navigate(['/home']);
      },
      (error: any) => {
        // Handle error response and display appropriate message
        console.log(error);
        this.message = error.error || 'Login failed: Invalid username or password.';
      }
    );
  }
  
  
}
