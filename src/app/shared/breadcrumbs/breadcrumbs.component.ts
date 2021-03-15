import { Component, OnDestroy } from '@angular/core';
import { ActivationEnd, Data, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [],
})
export class BreadcrumbsComponent implements OnDestroy {
  titulo: string = '';
  tituloSubs$!: Subscription;
  constructor(private router: Router) {
    this.tituloSubs$ = this.getArgumentosRuta().subscribe((data) => {
      this.titulo = data.titulo;
      document.title = `Admin - ${this.titulo}`;
    });
  }
  ngOnDestroy(): void {
    this.tituloSubs$.unsubscribe();
  }

  getArgumentosRuta() {
    return this.router.events.pipe(
      filter((evento) => evento instanceof ActivationEnd),
      filter(
        (evento) => (evento as ActivationEnd).snapshot.firstChild === null
      ),
      map((evento) => (evento as ActivationEnd).snapshot.data)
    );
  }
}
