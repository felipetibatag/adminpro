import { Component, OnInit } from '@angular/core';
//@ts-ignore
declare function customInitFunctions();

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [],
})
export class PagesComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    customInitFunctions();
    const tema: string = localStorage.getItem('tema')!;
    if (tema) {
      document.querySelector('#theme')?.setAttribute('href', tema);
    }
  }
}
