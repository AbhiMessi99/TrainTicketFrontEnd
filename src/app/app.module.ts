import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';  // Import FormsModule here
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { TrainService } from './train.service';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { BookingsComponent } from './bookings/bookings.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    UpdateProfileComponent,
    BookingsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,  // Add FormsModule to imports array
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [TrainService],
  bootstrap: [AppComponent]
})
export class AppModule { }
