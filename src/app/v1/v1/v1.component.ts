import { Component } from '@angular/core';
import { Clase } from '../../clase.model'; // Asegúrate de que el modelo 'Clase' esté bien importado
import { ClaseCardComponent } from '../../clase-card/clase-card.component';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-v1',
  standalone: true,
  imports: [CommonModule, ClaseCardComponent],
  templateUrl: './v1.component.html',
  styleUrl: './v1.component.css'
})
export class V1Component {
  clases: Clase[] = [
    { nombre: 'Zumba', imagen: 'assets/img/zumba.jpg', descripcion: 'Clase divertida de baile.' },
    { nombre: 'Spinning', imagen: 'assets/img/spinning.webp', descripcion: 'Ejercicio intenso en bicicleta.' },
    { nombre: 'Pilates', imagen: 'assets/img/pilates.avif', descripcion: 'Fortalece y estira tu cuerpo.' },
    { nombre: 'Yoga', imagen: 'assets/img/yoga2.jpg', descripcion: 'Relajación y equilibrio.' },
    { nombre: 'Body Pump', imagen: 'assets/img/bodypump.jpg', descripcion: 'Entrenamiento con pesas.' },
    { nombre: 'Crossfit', imagen: 'assets/img/crossfit.jpg', descripcion: 'Entrenamiento funcional.' },
    { nombre: 'Boxeo', imagen: 'assets/img/box.jpg', descripcion: 'Defensa personal y cardio.' },
    { nombre: 'Kickboxing', imagen: 'assets/img/kickboxing.webp', descripcion: 'Golpes y patadas intensas.' },
  ];

  claseSeleccionada?: Clase;

  confirmarReserva() {
    Swal.fire({
      icon: 'success',
      title: '¡Reserva confirmada!',
      text: `Te has inscrito en la clase de ${this.claseSeleccionada?.nombre}.`,
      confirmButtonText: 'Aceptar'
    });

    // (Opcional) Limpiar la selección
    // this.claseSeleccionada = undefined;
  }

  manejarReserva(clase: Clase) {
    this.claseSeleccionada = clase;
  }
}
