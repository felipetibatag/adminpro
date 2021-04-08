import { environment } from 'src/environments/environment';

export class Usuario {
  public nombre: string = '';
  public email: string = '';
  public google: boolean;
  public role?: string;
  public img?: string = '';
  public uid?: string;
  public password?: string;
  public URL_API: string = environment.URL_API;
  constructor(
    email: string,
    google: boolean,
    img: string,
    nombre: string,
    role: string,
    uid: string
  ) {
    this.email = email;
    this.google = google;
    this.img = img;
    this.nombre = nombre;
    this.role = role;
    this.uid = uid;
  }

  get imgUrl(): string {
    if (this.img) {
      if (this.img.includes('https')) {
        return this.img;
      } else {
        return `${this.URL_API}/upload/usuarios/${this.img}`;
      }
    }
    if (this.img === '') {
      return `${this.URL_API}/upload/usuarios/no-image`;
    }
    return `${this.URL_API}/upload/usuarios/no-image`;
  }
}
