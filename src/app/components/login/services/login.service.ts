import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiService } from 'src/app/common-services/api.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private api: ApiService, private http: HttpClient, private router: Router) {}

  private generateRandomString(length: any) {
    let result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  login() {
    let state = this.generateRandomString(16);
    let scope = 'user-read-private user-read-email';  

    const spotifyLoginWindow = window.open(
      `https://accounts.spotify.com/authorize?client_id=${environment.client_id}&redirect_uri=${environment.spotify_redirect_uri}&response_type=code&scope=${scope}&state=${state}`,
      '_self'
    );
  }

  getToken(code: string) {

    const searchParams = new URLSearchParams([
      ['grant_type', 'authorization_code'],
      ['code', code],
      ['redirect_uri', environment.spotify_redirect_uri]
    ]);
    
    let headers = {
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'authorization': `Basic ${btoa(`${environment.client_id}:${environment.client_secret}`)}`,
      },
    };

    this.http.post<any>(`https://accounts.spotify.com/api/token` , searchParams, headers).subscribe({
      next:(res: any) => {
        localStorage.setItem('userInfo', JSON.stringify(res));
        this.router.navigate(['/home']);
      },
      error:(err: any) => {
        console.log(err.error.error_description);
      }
    });

  }
}
