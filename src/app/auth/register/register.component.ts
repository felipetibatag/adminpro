import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  public formSubmited: boolean = false;
  public registerForm = this.fb.group(
    {
      nombre: [
        'pruebita9 pruebita',
        [Validators.required, Validators.minLength(3)],
      ],
      email: [
        'pruebita9@pruebita.com',
        [Validators.required, Validators.minLength(3)],
      ],
      password: ['123456', [Validators.required]],
      password2: ['123456', [Validators.required]],
      terminos: [true, [Validators.required]],
    },
    {
      validators: this.passwordsIguales('password', 'password2'),
    }
  );
  constructor(
    private fb: FormBuilder,
    private _usuarioService: UsuarioService,
    private router: Router
  ) {}

  passwordsIguales(pass1: string, pass2: string) {
    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.get(pass1);
      const pass2Control = formGroup.get(pass2);
      if (pass1Control?.value === pass2Control?.value) {
        pass2Control?.setErrors(null);
      } else {
        pass2Control?.setErrors({ noEsIgual: true });
      }
    };
  }

  crearUsuario() {
    this.registerForm.markAllAsTouched();
    if (this.registerForm.invalid) {
      return;
    }
    this._usuarioService
      .crearUsuario(this.registerForm.value)
      .pipe(
        tap((data: any) => {
          localStorage.setItem('token', data.token);
        })
      )
      .subscribe(
        (data) => {
          console.log(data);
          this.router.navigateByUrl('/');
        },
        (error) => {
          Swal.fire({
            title: 'Error!',
            text: `Sucedio un error: ${error.error.msg}`,
            icon: 'error',
            confirmButtonText: 'Cool',
          });
        }
      );
  }

  validaciones(campo: string): boolean {
    if (
      this.registerForm.get(campo)?.touched &&
      this.registerForm.get(campo)?.invalid
    ) {
      return true;
    } else {
      return false;
    }
  }

  validarTerminos() {
    if (
      this.registerForm.get('terminos')?.touched &&
      this.registerForm.get('terminos')?.value != true
    ) {
      return true;
    } else {
      return false;
    }
  }

  validarClaves() {
    const pass1 = this.registerForm.get('password')?.value;
    const pass2 = this.registerForm.get('password')?.value;
    if (pass1 !== pass2 && this.registerForm.invalid) {
      return true;
    } else {
      return false;
    }
  }

  ngOnInit(): void {}
}
