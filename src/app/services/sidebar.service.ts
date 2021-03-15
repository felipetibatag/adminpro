import { Injectable } from '@angular/core';

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
  ];

  constructor() {}
}
