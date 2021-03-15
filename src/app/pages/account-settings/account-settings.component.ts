import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [],
})
export class AccountSettingsComponent implements OnInit {
  linkTheme = document.querySelector('#theme');
  constructor() {}
  ngOnInit(): void {}

  cambiarTema(tema: string) {
    this.linkTheme = document.querySelector('#theme');
    const url = `./assets/css/colors/${tema}.css`;
    this.linkTheme?.setAttribute('href', url);

    localStorage.setItem('tema', url);
    this.checkTemaActual();
  }

  checkTemaActual() {
    const links = document.querySelectorAll('.selector');
    links.forEach((elemento) => {
      elemento.classList.remove('working');
      const btnTema = elemento.getAttribute('data-theme');
      const btnUrl = `./assets/css/colors/${btnTema}.css`;
      const currentTheme = this.linkTheme?.getAttribute('href');
      if (btnUrl === currentTheme) {
        elemento.classList.add('working');
      }
    });
  }
}
