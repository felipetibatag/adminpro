import { Component, OnInit } from '@angular/core';

import { UsuarioService } from '../../../services/usuario.service';
import { ListadoUsuarios } from '../../../interfaces/listado-usaurios.interface';
import { Usuario } from 'src/app/models/Usuario.model';
import { BusquedaService } from '../../../services/busqueda.service';
import { error } from 'selenium-webdriver';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [],
})
export class UsuariosComponent implements OnInit {
  usuarios!: Usuario[];
  loading: boolean = false;
  desde: number = 0;
  totalUsuarios: number = 26;
  txtBusqueda: string = '';
  constructor(
    private _usuarioService: UsuarioService,
    private _busquedaService: BusquedaService
  ) {}
  ngOnInit(): void {
    this.paginar(this.desde);
  }

  getUsuarios() {
    console.log('desde ', this.desde);
    this.loading = true;
    this._usuarioService.getUsuarios(this.desde).subscribe(
      ({ total, usuarios }) => {
        this.usuarios = usuarios;
        this.totalUsuarios = total;
      },
      (error) => {
        console.log;
      },
      () => {
        this.loading = false;
      }
    );
  }

  paginar(desde: number) {
    if (this.desde >= 0 && this.desde < this.totalUsuarios) {
      console.log(this.desde);
      this.desde += desde;
    }
    if (this.desde > this.totalUsuarios) {
      this.desde -= desde;
    }
    if (this.desde < 0) {
      this.desde = 0;
    }
    this.getUsuarios();
  }

  busqueda() {
    if (this.txtBusqueda.length < 1) {
      this.paginar(this.desde);
    }
    this.loading = true;
    this._busquedaService
      .busquedaPorTabla(this.txtBusqueda, 'usuarios')
      .subscribe(
        (resp) => {
          this.usuarios = [];
          this.usuarios = resp;
        },
        (error) => {
          console.log('error', error);
        },
        () => {
          this.loading = false;
        }
      );
  }
}
