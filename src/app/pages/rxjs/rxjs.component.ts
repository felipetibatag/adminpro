import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { retry, take, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [],
})
export class RxjsComponent implements OnDestroy {
  i: number = 0;
  public intervalSubs!: Subscription;
  constructor() {
    this.intervalSubs = this.retornaIntervalo().subscribe(
      (valor) => console.log(valor),
      (e) => console.log('error: ', e),
      () => console.log('terminado')
    );
  }
  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
  }

  funcionRetornaObs(): Observable<number> {
    const obs = new Observable<number>((observer) => {
      const intervalo = setInterval(() => {
        observer.next(this.i++);
        if (this.i === 4) {
          clearInterval(intervalo);
          observer.complete();
        }

        if (this.i === 3) {
          observer.error('Ocurrio un error, llego a 3');
        }
      }, 1000);
    });
    obs.pipe(retry(2)).subscribe(
      (dato) => console.log(dato),
      (error) => console.log('Algo paso', error),
      () => console.log('Terminado')
    );
    return obs;
  }

  retornaIntervalo() {
    return interval(100).pipe(
      //take(10),
      filter((valor) => (valor % 2 === 0 ? true : false)),
      map((valor) => valor + 1)
    );
  }
}
