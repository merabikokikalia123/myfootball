import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RoomsComponent } from './rooms/rooms.component';


import { HotelsComponent } from './hotels/hotels.component';
import { BooksComponent } from './books/books.component';
import { BookingListComponent } from './booking-list/booking-list.component';
import { ErorComponent } from './eror/eror.component';




const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'hotels', component: HotelsComponent},
  { path: 'rooms', component: RoomsComponent },
  {path: 'booking', component:BooksComponent},
  {path:'booking-list',component:BookingListComponent},
  {path:'eror',component: ErorComponent}
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
