import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MarkRequest } from './mark-request';
import { GameState } from './game-state';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

	server = `http://localhost:5000/`;

  constructor(private http:HttpClient) {}

  public makeMark(request : MarkRequest) : Observable<GameState>{
	  return this.http.post<GameState>(this.server + 'Game/', request);
  }
}
