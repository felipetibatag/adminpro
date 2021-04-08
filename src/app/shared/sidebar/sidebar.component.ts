import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/Usuario.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [],
})
export class SidebarComponent implements OnInit {
  menuItem: any[];
  public usuario: Usuario;

  constructor(
    private sv: SidebarService,
    private _usuarioService: UsuarioService
  ) {
    this.menuItem = sv.menu;
    this.usuario = _usuarioService.usuario;
  }

  ngOnInit(): void {}
  logOut() {
    this._usuarioService.signOut();
  }
}
