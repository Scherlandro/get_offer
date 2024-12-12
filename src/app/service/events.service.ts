import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from "../../environments/environment";
import {IEvents} from "../interfaces/events";

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  private baseUrl: string = environment.API_PATH + 'api/event';
  constructor(private _http: HttpClient) { }

  getAllEvents(): Observable<IEvents[]>{
    return this._http.get<IEvents[]>(this.baseUrl+'/all')
  }

  getEventByDataDay(data_day: any | null): Observable<IEvents[]>{
     return this._http.get<IEvents[]>(this.baseUrl+'/getEventByDataDay/'+data_day)
  }

  getEventByHour(hour: string | null): Observable<IEvents[]>{
    return this._http.get<IEvents[]>(this.baseUrl+'/getEventByHour/'+hour)
  }

  getEventByID(uid: string | null): Observable<IEvents>{
    return this._http.get<IEvents>(this.baseUrl+'/'+uid)
  }


  editEvent(event: IEvents): Observable<IEvents> {
    console.log("Event service here", event)
    return this._http.put<IEvents>(this.baseUrl+'/edit-event',event);
  }

  createEvent(event: IEvents): Observable<IEvents> {
    console.log("Evento service create", event)
    return this._http.post<IEvents>(this.baseUrl+'/save-event/',event);
  }

  deleteEvent(id: number): Observable<IEvents> {
    console.log("ID p/ delete service here", id)
    return this._http.delete<IEvents>(this.baseUrl +'/delete-event/'+ id);
  }


}
