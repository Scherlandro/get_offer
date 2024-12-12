import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/material.module';
import { CalendarComponent } from './calendar/calendar.component';
import { HeaderComponent } from "./header/header.component";
import { PagesRouting } from "./pages-routing";
import { UsersComponent } from './users/users.component';

@NgModule({
  declarations: [
    HeaderComponent,
    UsersComponent,
    CalendarComponent

  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    PagesRouting
  ],
  exports:[],
  providers:[]
})
export class PagesModule { }
