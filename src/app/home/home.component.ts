import { Component } from '@angular/core';
import { TrainService, Train, TicketBookingRequest, Ticket } from '../train.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: false
})
export class HomeComponent {
  username: string = ''; // Set a static username or fetch dynamically
  email: String = '';
  source: string = ''; // To store the source station
  destination: string = ''; // To store the destination station
  trains: Train[] = []; // To store the list of trains
  seatsToBook: number = 1; // Number of seats user wants to book
  passengerNames: string[] = []; // List of passenger names
  selectedTrain: Train | null = null; // Currently selected train for booking
  bookedTicket: Ticket | null = null; // Store the details of the booked ticket

  constructor(private trainService: TrainService) {}

  ngOnInit(): void {
    // Replace 'John Doe' with the actual logic to retrieve username
    this.username = localStorage.getItem('username') || 'Guest';
    this.email = localStorage.getItem('email') || 'email not available for the user';
  }

  // Method to fetch trains based on source and destination
  searchTrains(): void {
    if (this.source && this.destination) {
      this.trainService.getTrains(this.source, this.destination).subscribe(
        (data: Train[]) => {
          this.trains = data; // Store the retrieved trains in the component
        },
        (error) => {
          console.error('Error fetching trains:', error);
        }
      );
    } else {
      console.warn('Source and destination are required');
    }
  }

  // Method to select a train for booking
  selectTrainForBooking(train: Train): void {
    this.selectedTrain = train;
    this.seatsToBook = 1; // Reset the seats to book
    this.passengerNames = []; // Reset the passenger names
  }

  // Method to confirm booking
  confirmBooking(): void {
    if (this.selectedTrain) {
      // Prepare the ticket booking request
      const bookingRequest: TicketBookingRequest = {
        trainId: this.selectedTrain.id,
        seats: this.seatsToBook,
        passengerNames: this.passengerNames,
        username: this.username
      };

      // Call the train service to book the ticket
      this.trainService.bookTicket(bookingRequest).subscribe(
        (response: Ticket) => {
          console.log('Ticket booked successfully:', response);
          this.bookedTicket = response; // Store the booked ticket details
          this.selectedTrain = null; // Clear the selected train
        },
        (error) => {
          console.error('Error booking ticket:', error);
        }
      );
    }
  }

  // Helper method to return a list of passengers for dynamic input fields
  getPassengerInputs(): any[] {
    return new Array(this.seatsToBook); // Generate an array of length 'seatsToBook'
  }

  // Reset the view to search for trains again
  resetView(): void {
    this.bookedTicket = null; // Clear the booked ticket details
    this.trains = []; // Clear the train list
    this.source = ''; // Clear the source
    this.destination = ''; // Clear the destination
  }
}
