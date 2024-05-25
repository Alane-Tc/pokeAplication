import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class PokeAlertService {

  constructor() { }

  public alertConfirm(message: string) {
    Swal.fire({
      title: "Buen trabajo!",
      text: `${message}`,
      icon: "success",
      showConfirmButton: false,
      timer: 1500
    });
  }

  public alertError(message: string) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: `${message}`
    });
  }
}
