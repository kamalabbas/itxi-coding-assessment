import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from 'src/app/common-services/api.service';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {

  constructor(private api: ApiService) { }

  getArtist(id) : Observable<any> {
    let query = `artists/${id}/albums?limit=20`
    return this.api.get(query);
  }
}
