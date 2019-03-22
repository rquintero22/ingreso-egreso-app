import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  constructor( private authService: AuthService ) {  }

  ngOnInit() {
  }

  onSubmit( forma: any ) {
    this.authService.login( forma.email, forma.password );
  }

}
