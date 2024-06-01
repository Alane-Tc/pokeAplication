import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceProxyService } from '../../shared/service/service-proxy.service';
import { RegisterUser } from 'src/app/shared/interface/RegisterUser';
import { PokeAlertService } from 'src/app/shared/service/alert/poke-alert.service';
import { AuthService } from 'src/app/shared/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _authProxy: AuthService,
    private _router: Router,
    private _pokeAlert: PokeAlertService
  ) {

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }


  login(): void {
    const loginDto = this.loginForm.value;
    this._authProxy.login(loginDto.email, loginDto.password).subscribe(response => {
      this._pokeAlert.alertConfirm("Login Exitoso");
    },
      error => {
        console.error('Error en el login', error);
        this._pokeAlert.alertError("Error al loguearse");
      }
    )
  }

  register(): void{
    this._router.navigate(['register']);
  }
}
