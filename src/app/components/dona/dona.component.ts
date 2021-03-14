import { Component, Input, OnInit } from '@angular/core';
import { Grafica } from '../../pages/grafica1/grafica1.component';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [],
})
export class DonaComponent implements OnInit {
  @Input() grafica!: Grafica;

  constructor() {}

  ngOnInit(): void {}
}
