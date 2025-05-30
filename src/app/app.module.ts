import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { HotelsComponent } from './hotels/hotels.component';
import { RoomsComponent } from './rooms/rooms.component';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BooksComponent } from './books/books.component';

import { BookingListComponent } from './booking-list/booking-list.component';
import { FooterComponent } from './footer/footer.component';
import { ErorComponent } from './eror/eror.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    RoomsComponent,
    HotelsComponent,
    BooksComponent,
    BookingListComponent,
    FooterComponent,
    ErorComponent  
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
