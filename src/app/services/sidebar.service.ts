import { Injectable } from '@angular/core';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  menu: any[] = [
    {
      titulo: 'Dasboard!!',
      icono: 'mdi mdi-gauge',
      submenu: [
        {
          titulo: 'Main',
          url: '/',
        },
        {
          titulo: 'Progressbar',
          url: 'progress',
        },
        {
          titulo: 'Graficas',
          url: 'grafica1',
        },
        {
          titulo: 'Promesas',
          url: 'promesas',
        },
        {
          titulo: 'Rjxs',
          url: 'rxjs',
        },
      ],
    },
    {
      titulo: 'Mantenimiento',
      icono: 'mdi mdi-folder',
      submenu: [
        {
          titulo: 'Usuarios',
          url: 'usuarios',
        },
        {
          titulo: 'Hospitales',
          url: 'hospitales',
        },
        {
          titulo: 'Médicos',
          url: 'medicos',
        },
      ],
    },
  ];

  constructor() {}
}
