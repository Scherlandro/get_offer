import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {UsersComponent} from "./users/users.component";
import {HeaderComponent} from "./header/header.component";
import {CalendarComponent} from "./calendar/calendar.component";

const pagesRoutes = [
  { path:'header', component:HeaderComponent},
  { path:'users', component:UsersComponent},
  {path: 'calendar', component: CalendarComponent}
];

@NgModule({
  imports: [RouterModule.forChild(pagesRoutes)],
  exports: [RouterModule]
})
export class PagesRouting { }
