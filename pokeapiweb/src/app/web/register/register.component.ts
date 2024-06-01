import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterUser } from 'src/app/shared/interface/RegisterUser';
import { PokeAlertService } from 'src/app/shared/service/alert/poke-alert.service';
import { ServiceProxyService } from 'src/app/shared/service/service-proxy.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  public registerForm: FormGroup;
  public test = false;

  constructor(
    private fb: FormBuilder,
    private _seriveProxy: ServiceProxyService,
    private _pokeAlertProxy: PokeAlertService,
  ) {

    this.registerForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

  }

  onSubmit(): void {
    const model: RegisterUser = this.registerForm.value;
    if (model.email != '' && model.username != '' && model.password != '') {
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
  }

}
