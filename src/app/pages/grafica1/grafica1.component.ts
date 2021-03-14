import { Component } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';

export interface Grafica {
  titulo: string;
  tipo: ChartType;
  datos: MultiDataSet;
  label: Label[];
}

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [],
})
export class Grafica1Component {
  graficaVentas: Grafica = {
    titulo: 'Ventas',
    tipo: 'doughnut',
    datos: [[350, 560, 200]],
    label: ['Enero', 'Febrero', 'Marzo'],
  };
  graficaCompras: Grafica = {
    titulo: 'Compras',
    tipo: 'doughnut',
    datos: [[100, 60, 650]],
    label: ['Enero', 'Febrero', 'Marzo'],
  };
  constructor() {}
}
