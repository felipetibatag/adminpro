import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UsuarioService } from './usuario.service';
import { Usuario } from '../models/Usuario.model';

@Injectable({
  providedIn: 'root',
})
export class ImagenesService {
  headers!: HttpHeaders;
  usuario: Usuario;
  token: any;
  constructor(
    private _httpClient: HttpClient,
    private _usuarioService: UsuarioService
  ) {
    this.usuario = _usuarioService.usuario;
    this.token = JSON.parse(localStorage.getItem('token') || '');
  }

  actualizarImgUsuario(imagen: any, tipo: string) {
    console.log(imagen);

    const fd = new FormData();
    fd.append('imagen', imagen);
    console.log(fd);

    return this._httpClient.put(
      `${environment.URL_API}/upload/${tipo}/${this.usuario.uid}`,
      fd,
      {
        headers: {
          'x-token': this.token.token,
        },
      }
    );
  }
}
