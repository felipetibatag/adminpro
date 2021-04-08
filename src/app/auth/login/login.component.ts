import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { tap } from 'rxjs/operators';
import Swal from 'sweetalert2';
import {
  GoogleLoginProvider,
  SocialAuthService,
  SocialUser,
} from 'angularx-social-login';

// declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  user!: SocialUser | null;
  loginForm: FormGroup = this.fb.group({
    email: [
      localStorage.getItem('email') || null,
      [Validators.required, Validators.email],
    ],
    password: ['', [Validators.required, Validators.minLength(3)]],
    remember: [JSON.parse(localStorage.getItem('remember') || 'false')],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _usuarioService: UsuarioService,
    private authService: SocialAuthService
  ) {
    this.user = null;
    this.authService.authState.subscribe((user: SocialUser) => {
      this.user = user;
    });
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((x: any) => {
      this._usuarioService
        .loginGoogle(this.user?.idToken)
        .subscribe((token) => {
          localStorage.setItem('token', JSON.stringify(token));
          this.router.navigate(['dashboard']);
        });
    });
  }

  login() {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.invalid) {
      return;
    }
    this._usuarioService
      .login(this.loginForm.value)
      .pipe(
        tap((data: any) => {
          localStorage.setItem('token', JSON.stringify(data));
          if (this.loginForm.get('remember')?.value) {
            localStorage.setItem('email', this.loginForm.get('email')?.value);
            localStorage.setItem('remember', 'true');
          } else {
            localStorage.removeItem('email');
            localStorage.setItem('remember', 'false');
          }
        })
      )
      .subscribe(
        (data) => {
          this.router.navigateByUrl('dashboard');
        },
        (error) => {
          Swal.fire({
            title: 'Error',
            text: `Ocurrio un error ${error.error.msg}`,
            timer: 2000,
          });
        }
      );
  }

  validacion(campo: string) {
    if (
      this.loginForm.get(campo)?.touched &&
      this.loginForm.get(campo)?.invalid
    ) {
      return true;
    } else {
      return false;
    }
  }
}
