import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  constructor(
    private loginService: LoginService,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    const code = this.activatedRoute.snapshot.queryParams['code'];
    if(!!code) {
      this.loginService.getToken(code);
    }
  }

  login() {
    this.loginService.login();
  }

}
