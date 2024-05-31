import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceProxyService } from '../../shared/service/service-proxy.service';
import { RegisterUser } from 'src/app/shared/interface/RegisterUser';
import { PokeAlertService } from 'src/app/shared/service/alert/poke-alert.service';
import { AuthService } from 'src/app/shared/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public registerForm: FormGroup;
  public loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _seriveProxy: ServiceProxyService,
    private _pokeAlertProxy: PokeAlertService,
    private _authProxy: AuthService
  ) {

    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });


    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }


  onSubmit(): void {
    const model: RegisterUser = this.registerForm.value;
    this._seriveProxy.register(model).subscribe(
      (response: any) => {
        console.log(response.message);
        this._pokeAlertProxy.alertConfirm(response.message);
        window.location.reload();
      },
      (error: any) => {
        console.error(error);
        this._pokeAlertProxy.alertError("Error al realizar el usuario")
      }
    );
  }

  login(): void {
    const loginDto = this.loginForm.value;
    this._authProxy.login(loginDto.email, loginDto.password).subscribe(response => {
      console.log("Login exitoso");
    },
      error => {
        console.error('Error en el login', error);
      }
    )
    console.log("Login", loginDto);
  }
}
