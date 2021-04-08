import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SocialAuthService } from 'angularx-social-login';
import { Router } from '@angular/router';
import { catchError, map } from 'rxjs/operators';
import { Usuario } from '../models/Usuario.model';
import { ListadoUsuarios } from '../interfaces/listado-usaurios.interface';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  public usuario!: Usuario;
  constructor(
    private http: HttpClient,
    private _authService: SocialAuthService,
    private router: Router
  ) {}

  loginGoogle(token: string | undefined) {
    return this.http.post(`${environment.URL_API}/auth/google`, { token });
  }

  crearUsuario(formData: any) {
    return this.http.post(`${environment.URL_API}/usuarios`, formData);
  }

  login(formData: any) {
    return this.http.post(`${environment.URL_API}/auth`, formData);
  }
  signOut(): void {
    localStorage.removeItem('token');
    this._authService.signOut();
    this.router.navigateByUrl('login');
  }

  validarToken() {
    const token: any = JSON.parse(localStorage.getItem('token')!) || '';

    return this.http
      .get(`${environment.URL_API}/auth/renew`, {
        headers: { 'x-token': token.token },
      })
      .pipe(
        map((token: any) => {
          const { email, google, img = '', nombre, role, uid } = token.usuario;
          this.usuario = new Usuario(email, google, img, nombre, role, uid);
          localStorage.setItem('token', JSON.stringify(token));
          return true;
        }),
        catchError((token) => of(false))
      );
  }

  actualizarUsuario(data: { nombre: string; correo: string; role: string }) {
    data = {
      ...data,
      role: this.usuario.role!,
    };
    const token: any = JSON.parse(localStorage.getItem('token')!) || '';
    return this.http
      .put(`${environment.URL_API}/usuarios/${this.usuario.uid}`, data, {
        headers: { 'x-token': token.token },
      })
      .pipe(catchError((error) => console.log));
  }

  getUsuarios(desde: number = 0) {
    const token: any = JSON.parse(localStorage.getItem('token')!) || '';
    return this.http
      .get<ListadoUsuarios>(`${environment.URL_API}/usuarios?desde=${desde}`, {
        headers: { 'x-token': token.token },
      })
      .pipe(
        map((resp) => {
          // console.log('Antes de pasar por map:🎈 ', resp);
          const total: number = resp.total;
          const usuarios = resp.usuarios.map((user) => {
            return new Usuario(
              user.email,
              user.google,
              user.img || '',
              user.nombre,
              user.role || '',
              user.uid || ''
            );
          });

          return { total, usuarios };
        })
      );
  }
}
