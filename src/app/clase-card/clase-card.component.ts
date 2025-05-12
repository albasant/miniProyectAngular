import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Clase } from '../clase.model';

@Component({
  selector: 'app-clase-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card h-100" (click)="reservarClase()">
      <img [src]="clase.imagen" class="card-img-top" alt="..." />
      <div class="card-body">
        <h5 class="card-title">{{ clase.nombre }}</h5>
        <p class="card-text">{{ clase.descripcion }}</p>
      </div>
    </div>
  `
})
export class ClaseCardComponent {
  @Input() clase!: Clase;
  @Output() reservar = new EventEmitter<Clase>();

  reservarClase() {
    this.reservar.emit(this.clase);
  }
}
