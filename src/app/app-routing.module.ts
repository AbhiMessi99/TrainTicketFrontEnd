import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { BookingsComponent } from './bookings/bookings.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'update-profile', component: UpdateProfileComponent },
  { path: 'register', component: RegisterComponent },
  {path: 'login', component: LoginComponent},
  { path: 'home', component: HomeComponent },
  { path: 'bookings', component: BookingsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
