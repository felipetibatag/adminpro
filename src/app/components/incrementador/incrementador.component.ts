import {
  AfterContentChecked,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [],
})
export class IncrementadorComponent {
  @Input() progreso: number = 0;
  @Output() onCambio = new EventEmitter<number>();

  constructor() {}

  cambioInput() {
    this.onCambio.emit(this.progreso);
  }

  cambiar(valor: number) {
    if (this.progreso >= 100 && valor >= 0) {
      this.progreso = 100;
      this.onCambio.emit(this.progreso);
    }

    if (this.progreso <= 0 && valor < 0) {
      this.progreso = 0;
      this.onCambio.emit(this.progreso);
    }
    this.onCambio.emit((this.progreso += valor));
  }
}
