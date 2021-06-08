import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.styl']
})
export class LoginComponent implements OnInit {
  username = ''
  password = ''

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertService: AlertService
  ) { }

  ngOnInit() {
  }

  login() {
    if (this.username && this.password) {
      this.authService.login(this.username, this.password)
        .subscribe((res: any) => {
          if (res.success) {
            this.alertService.success("Logged in successfully", {autoClose: true, keepAfterRouteChange: true})
            this.router.navigateByUrl('/user-dashboard');
          } else {
            this.alertService.error(res.message)
          }
        });
    }

  }

}
