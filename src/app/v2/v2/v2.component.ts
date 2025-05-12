import { Component, signal, effect } from '@angular/core';
import { usuarioService } from '../../usuario/usuario.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-v2',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './v2.component.html',
  styleUrl: './v2.component.css'
})
export class V2Component {
  registros = signal<any[]>([]);
  quejas = signal<any[]>([]);
  usuario = signal<string | null>(null);
  editando = signal<number | null>(null);
  editandoQueja = signal<number | null>(null);
  seccion = signal<string>('');

   constructor(private usuarioService: usuarioService, private route: ActivatedRoute) {
    effect(() => {
      this.usuarioService.usuario$.subscribe((usuarioActual) => {
        this.usuario.set(usuarioActual);
        if (this.usuarioService.esAdmin()) {
          this.cargarRegistros();
          this.cargarQuejas();
        } else {
          this.registros.set([]);
          this.quejas.set([]);
        }
      });
    });

    // Detectar parámetro de la URL
    this.route.paramMap.subscribe(params => {
      this.seccion.set(params.get('seccion') || '');
    });
  }

  // --- Para formulario reactivo (formularioV3) ---
  borrarRegistro(index: number) {
    const nuevos = [...this.registros()];
    nuevos.splice(index, 1);
    this.actualizarRegistros(nuevos);
  }

  editarRegistro(index: number) {
    this.editando.set(index);
  }

  guardarRegistro(index: number) {
    const nuevos = [...this.registros()];
    const registro = nuevos[index];
    registro.clases = registro.clasesTexto.split(',').map((c: string) => c.trim());
    this.editando.set(null);
    this.actualizarRegistros(nuevos);
  }

  cancelarEdicion() {
    this.editando.set(null);
    this.cargarRegistros();
  }

  private actualizarRegistros(lista: any[]) {
    this.registros.set(lista);
    const sinClasesTexto = lista.map(r => {
      const copia = { ...r };
      delete copia.clasesTexto;
      return copia;
    });
    localStorage.setItem('formularioV3', JSON.stringify(sinClasesTexto));
  }

  private cargarRegistros() {
    const datos = localStorage.getItem('formularioV3');
    try {
      const parsed = JSON.parse(datos || '[]');
      const registrosConTexto = parsed.map((r: any) => ({
        ...r,
        clasesTexto: r.clases?.join(', ') || ''
      }));
      this.registros.set(registrosConTexto);
    } catch {
      this.registros.set([]);
    }
  }

  // --- Para formulario por plantilla (formulariosTemplate) ---
  borrarQueja(index: number) {
    const nuevas = [...this.quejas()];
    nuevas.splice(index, 1);
    this.actualizarQuejas(nuevas);
  }

  editarQueja(index: number) {
    this.editandoQueja.set(index);
  }

  guardarQueja(index: number) {
    const nuevas = [...this.quejas()];
    this.editandoQueja.set(null);
    this.actualizarQuejas(nuevas);
  }

  cancelarEdicionQueja() {
    this.editandoQueja.set(null);
    this.cargarQuejas();
  }

  private actualizarQuejas(lista: any[]) {
    this.quejas.set(lista);
    localStorage.setItem('formulariosTemplate', JSON.stringify(lista));
  }

  private cargarQuejas() {
    const datos = localStorage.getItem('formulariosTemplate');
    try {
      const parsed = JSON.parse(datos || '[]');
      this.quejas.set(parsed);
    } catch {
      this.quejas.set([]);
    }
  }
}
