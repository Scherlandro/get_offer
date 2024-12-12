import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  url
  constructor(public postfixUrl:String) {
    this.url = environment.API_PATH+'api/'+postfixUrl
  }

}
