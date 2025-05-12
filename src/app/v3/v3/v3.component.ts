import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { usuarioService } from '../../usuario/usuario.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';


@Component({
  standalone: true,
  selector: 'app-v3',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './v3.component.html',
  styleUrls: ['./v3.component.css']
})
export class V3Component {
  username = '';
  password = '';
  nombreCompleto = '';

  formulario: FormGroup;
  clasesSeleccionadas: string[] = [];
  clases: string[] = [
    'Zumba', 'Spinning', 'Pilates', 'Yoga', 'Body Pump',
    'CrossFit', 'Boxeo', 'Kickboxing'
  ];
  satisfaccion: number[]=[
    0,1,2,3,4,5,6,7,8,9,10
  ]
  enviado = false;

  // Variables para el formulario por plantilla
  formularioTemplate: any = {
    genero: '',
    fecha: '',
    claseSeleccionada: '',
    clases: [],
    comentarios: ''
  };
  fechaInvalida = false;

  constructor(private usuarioService: usuarioService, private fb: FormBuilder) {
    // Formulario reactivo
    this.formulario = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      correo: ['', [Validators.required, Validators.email]],
      fecha: ['', [Validators.required, this.validarFecha]],
      genero: ['', Validators.required]
    });
  }

  // Método de login
  login() {
    const success = this.usuarioService.login(this.username, this.password, this.nombreCompleto);
    if (!success) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Credenciales incorrectas',
        confirmButtonColor: '#d33'
      });
    } else {
      Swal.fire({
        icon: 'success',
        title: 'Login exitoso',
        text: 'Credenciales correctas',
        confirmButtonColor: '#3085d6'
      });
    }
  }

  validarFecha(control: FormControl) {
  const fechaStr = control.value;
  if (!fechaStr) return null;

  const partes = fechaStr.split('-');
  const valor = new Date(+partes[0], +partes[1] - 1, +partes[2]);

  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);

  const limiteSuperior = new Date();
  limiteSuperior.setMonth(limiteSuperior.getMonth() + 1);
  limiteSuperior.setHours(0, 0, 0, 0);

  // Solo permitimos fechas desde hoy hasta 1 mes adelante
  if (valor < hoy || valor > limiteSuperior) {
    return { fechaInvalida: true };
  }

  return null;
}

  validarFechaTemplate() {
  const fechaSeleccionada = new Date(this.formularioTemplate.fecha);
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);

  const limiteInferior = new Date();
  limiteInferior.setMonth(limiteInferior.getMonth() - 1);
  limiteInferior.setHours(0, 0, 0, 0);

  // Solo permitimos fechas desde hace 1 mes hasta hoy
  this.fechaInvalida = fechaSeleccionada < limiteInferior || fechaSeleccionada > hoy;
}
  // Manejo de checkboxes (clases preferidas) en el formulario reactivo
  onCheckChange(event: any) {
    const clase = event.target.value;
    if (event.target.checked) {
      this.clasesSeleccionadas.push(clase);
    } else {
      const index = this.clasesSeleccionadas.indexOf(clase);
      if (index > -1) {
        this.clasesSeleccionadas.splice(index, 1);
      }
    }
  }

  // Enviar el formulario reactivo
  enviar() {
    this.enviado = true;
  
    if (this.formulario.valid && this.clasesSeleccionadas.length > 0) {
      const datos = {
        ...this.formulario.value,
        clases: this.clasesSeleccionadas
      };
  
      // Leer formularios previos del localStorage con la clave 'formularioV3'
      const guardados = JSON.parse(localStorage.getItem('formularioV3') || '[]');
  
      // Agregar el nuevo formulario al arreglo
      guardados.push(datos);
  
      // Guardar el arreglo actualizado en localStorage
      localStorage.setItem('formularioV3', JSON.stringify(guardados));
  
      // Limpiar formulario y clases seleccionadas
      this.formulario.reset();
      this.clasesSeleccionadas = [];
  
      Swal.fire({
        icon: 'success',
        title: 'Formulario enviado',
        text: 'Datos guardados correctamente.',
        confirmButtonColor: '#3085d6'
      });
    } else {
      console.log('Formulario no válido');
    }
  }

  // Manejo de checkboxes (clases preferidas) en el formulario por plantilla
  onCheckboxChangeTemplate(event: any) {
    const clase = event.target.value;
    if (event.target.checked) {
      this.formularioTemplate.clases.push(clase);
    } else {
      const index = this.formularioTemplate.clases.indexOf(clase);
      if (index > -1) {
        this.formularioTemplate.clases.splice(index, 1);
      }
    }
  }

  // Enviar el formulario por plantilla
  enviarTemplate() {
    this.validarFechaTemplate();
  
    if (!this.formularioTemplate.genero || 
        !this.formularioTemplate.fecha || 
        !this.formularioTemplate.claseSeleccionada || 
        this.formularioTemplate.clases.length === 0 || 
        !this.formularioTemplate.comentarios || 
        this.formularioTemplate.comentarios.length < 10 || 
        this.fechaInvalida) {
      return;
    }
  
    // Leer los formularios previos desde localStorage
    const formulariosGuardados = JSON.parse(localStorage.getItem('formulariosTemplate') || '[]');
  
    // Agregar el nuevo formulario
    formulariosGuardados.push({ ...this.formularioTemplate });
  
    // Guardar el arreglo actualizado
    localStorage.setItem('formulariosTemplate', JSON.stringify(formulariosGuardados));
  
    // Limpiar el formulario
    this.formularioTemplate = {
      genero: '',
      fecha: '',
      claseSeleccionada: '',
      clases: [],
      comentarios: ''
    };
    this.fechaInvalida = false;
  
    // Confirmación
    Swal.fire({
      icon: 'success',
      title: 'Formulario enviado',
      text: 'Los datos han sido guardados correctamente.',
      confirmButtonColor: '#3085d6'
    });
  }
  
} 