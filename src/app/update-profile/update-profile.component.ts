import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-update-profile',
  standalone: false,
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {
  user = {
    username: '',
    password: '',
    email: '',
    role: ''
  };

  confirmPassword: string = '';  // Field for confirm password
  passwordPattern: string = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$";  // Password pattern for validation
  confirmPasswordPattern: string = "^.*$"; // To ensure it's not empty and matches password

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loadUserDetails();
  }

  loadUserDetails(): void {
    // Get the current user details (this could come from a logged-in user service)
    this.user.username = localStorage.getItem('username') || 'Guest';;  // Replace with actual logic to get user data
    this.user.email = localStorage.getItem('email') || '';  // Replace with actual logic to get user data
    this.user.role = ''
  }

  updateProfile(): void {
    if (this.user.password !== this.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    this.authService.updateUser(this.user).subscribe(
      (updatedUser) => {
        alert('Profile updated successfully');
        this.router.navigate(['/home']);  // Navigate to home after successful update
      },
      (error) => {
        alert('Failed to update profile');
      }
    );
  }
}
