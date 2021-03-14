import { Component } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css'],
})
export class ProgressComponent {
  cantidad!: number;

  constructor() {}

  get getProgreso() {
    return `${this.cantidad}%`;
  }

  actualizaCantidad(evento: any) {
    this.cantidad = evento;
  }
}
