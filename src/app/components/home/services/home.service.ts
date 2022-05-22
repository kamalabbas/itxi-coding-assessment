import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/common-services/api.service';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private api: ApiService) { }

  searchForArtists(searchText): Observable<any> {
    let query = `search?q=${searchText}&type=artist&limit=20`
    return this.api.get(query);
  }
}
