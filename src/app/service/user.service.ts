import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/index";
import {delay, first, map, tap} from "rxjs/operators";
import {environment} from 'src/environments/environment';
import {IUser} from "../interfaces/user";

@Injectable({
  providedIn:'root'
})
export class UserService {

 list: IUser[]=[];

  private baseUrl: string = environment.API_PATH+'api/user/';

  constructor(private _http: HttpClient) {
  }

   getUsers(){
     return this._http.get(this.baseUrl).toPromise()
       .then(res => this.list = res as IUser[]);
   }

  getUses() : Observable<IUser[]> {
    return this._http.get<IUser[]>(this.baseUrl);
  }

  getAllUsers(): Observable<IUser[]> {
    return this._http.get<IUser[]>(this.baseUrl+'all');
  }

  seachUserByID(id: string): Observable<IUser[]> {
    return this._http.get<IUser[]>(this.baseUrl + id)
      .pipe(map((res:IUser[])=> res));
  }

  getUserByID(id:string){
    return this._http.get<IUser[]>(this.baseUrl + id)
      .pipe(
        first(),
        delay(2000),
        tap(DebugarUser => console.log(DebugarUser))
      );
  }

  editUser(user: IUser): Observable<IUser> {
    return this._http.put<IUser>(this.baseUrl + '/editar', user);
  }

  createUser(user: IUser): Observable<IUser> {
    return this._http.post<IUser>(this.baseUrl + '/salvar/', user);
  }

  deleteUser(id: number): Observable<IUser> {
    return this._http.delete<IUser>(this.baseUrl +'delete/'+ id);
  }



  getListUsers():Observable<any> {
    return this._http.get<IUser[]>('${API_PATH} Usuarios').pipe(map((res: any) => res));
  }



}
