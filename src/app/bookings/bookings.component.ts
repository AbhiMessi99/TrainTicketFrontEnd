import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Import Router for navigation
import { BookingsService } from '../bookings.service';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  standalone: false,
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {
  tickets: any[] = [];
  username: string = localStorage.getItem('username') || 'Guest'; // Replace with dynamic username from user authentication logic

  constructor(private bookingsService: BookingsService, private router: Router) {} // Inject Router

  ngOnInit(): void {
    this.fetchTickets();
  }

  fetchTickets(): void {
    this.bookingsService.getTicketsByUsername(this.username).subscribe({
      next: (data) => (this.tickets = data),
      error: (error) => console.error('Error fetching tickets:', error)
    });
  }

  cancelTicket(id: number, index: number): void {
    // Ask for confirmation before canceling
    const confirmation = confirm('Are you sure you want to cancel this ticket?');
    if (confirmation) {
      this.bookingsService.cancelTicket(id).subscribe({
        next: (response) => {
          alert(response); // Show success message
          this.tickets.splice(index, 1); // Remove the ticket from the UI
        },
        error: (error) => console.error('Error canceling ticket:', error)
      });
    }
  }

  logout(): void {
    // Clear session data
    localStorage.clear(); // Remove all stored data in localStorage
    sessionStorage.clear(); // Optional: Clear sessionStorage too

    // Redirect to the login page
    this.router.navigate(['/login']).then(() => {
      alert('You have been logged out successfully!');
    });
  }
}
