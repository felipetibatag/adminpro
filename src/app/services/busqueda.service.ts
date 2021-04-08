import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Usuario } from 'src/app/models/Usuario.model';

@Injectable({
  providedIn: 'root',
})
export class BusquedaService {
  constructor(private http: HttpClient) {}

  busquedaPorTabla(termino: string, tabla: string) {
    const token = JSON.parse(localStorage.getItem('token') || '');
    return this.http
      .get<any[]>(`${environment.URL_API}/todo/coleccion/${tabla}/${termino}`, {
        headers: { 'x-token': token.token },
      })
      .pipe(
        map((resp: any) => {
          const usuarios = resp.resultado.map((usuario: any) => {
            return new Usuario(
              usuario.email,
              usuario.google,
              usuario.img || '',
              usuario.nombre,
              usuario.role || '',
              usuario.uid || ''
            );
          });
          return usuarios;
        })
      );
  }
}
