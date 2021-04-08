import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Usuario } from 'src/app/models/Usuario.model';
import { UsuarioService } from '../../services/usuario.service';
import { ImagenesService } from '../../services/imagenes.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [],
})
export class PerfilComponent implements OnInit {
  usuario: Usuario;
  formulario!: FormGroup;
  uploadForm!: FormGroup;
  imageURL: string = '';
  file: any;

  constructor(
    private fb: FormBuilder,
    private _usuarioService: UsuarioService,
    private _imagenesService: ImagenesService
  ) {
    this.usuario = _usuarioService.usuario;
  }

  ngOnInit(): void {
    this.formulario = this.fb.group({
      nombre: [this.usuario.nombre, Validators.required],
      email: [this.usuario.email, [Validators.required, Validators.email]],
    });

    this.uploadForm = this.fb.group({
      avatar: [null],
      name: [''],
    });
    this.imageURL = this.usuario.imgUrl;
  }

  actualizarUsuario() {
    // this._usuarioService.actualizarUsuario(this.formulario.value);
    this._usuarioService
      .actualizarUsuario(this.formulario.value)
      .subscribe((resp) => {
        const { nombre, email } = this.formulario.value;
        this.usuario.nombre = nombre;
        this.usuario.email = email;
      });
  }

  showPreview(event: any) {
    const reader = new FileReader();
    this.file = (event.target as HTMLInputElement).files![0];
    // this.uploadForm.patchValue({ avatar: file });
    this.uploadForm.get('avatar')?.setValue(this.file);
    this.uploadForm.get('avatar')?.updateValueAndValidity();

    reader.onload = () => {
      this.imageURL = reader.result as string;
    };
    reader.readAsDataURL(this.file);
  }

  submit() {
    this._imagenesService.actualizarImgUsuario(this.file, 'usuarios').subscribe(
      (res: any) => {
        this.usuario.img = res.nombreArchivo;
        this.imageURL = this.usuario.imgUrl;
      },
      (error) => {
        console.log('algo paso con la carga de la imagen');
        console.log(error);
      }
    );
  }
}
