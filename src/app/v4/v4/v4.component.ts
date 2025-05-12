import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-v4',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    HttpClientModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './v4.component.html',
  styleUrls: ['./v4.component.css']
})
export class V4Component implements OnInit {
  userData: any;
  busquedaNombre: string = '';
  resultadoBusqueda: any = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get('https://miniproangular.free.beeceptor.com/todos').subscribe(data => {
      this.userData = data;
    });
  }

  buscarUsuario(): void {
    if (!this.userData || !this.userData.user) {
      return;
    }

    const resultado = this.userData.user.find(
      (u: any) => u.nombre.toLowerCase().includes(this.busquedaNombre.trim().toLowerCase())
    );

    if (resultado) {
      this.resultadoBusqueda = resultado;
    } else {
      this.resultadoBusqueda = null;
      Swal.fire({
        icon: 'error',
        title: 'No encontrado',
        text: 'No se encontró ningún usuario con ese nombre',
        confirmButtonColor: '#d33'
      });
    }
  }
}
