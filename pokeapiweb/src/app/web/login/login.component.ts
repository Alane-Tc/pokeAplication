import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceProxyService } from '../../shared/service/service-proxy.service';
import { RegisterUser } from 'src/app/shared/interface/RegisterUser';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public registerForm: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private _seriveProxy: ServiceProxyService 
  ){

    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }


  onSubmit(): void {
      const model: RegisterUser = this.registerForm.value;
      this._seriveProxy.register(model).subscribe(
        response => {
          console.log('User created successfully', response);
        },
        error => {
          console.error('Error creating user', error);
        }
      );

      Swal.fire({
        title: "Good job!",
        text: "You clicked the button!",
        icon: "success"
      });
      

    console.log(this.registerForm)
  }
}
