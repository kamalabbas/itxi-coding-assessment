import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  get(query: string, config?: any): Observable<any> {
    return this.http.get<any>(`${environment.spotify_api}/${query}`, config);
  }
}
