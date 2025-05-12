import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class usuarioService {
  private usuarios = [
    { username: 'Vale', password: '1234', nombreCompleto: 'Vale González' },
    { username: 'Ana', password: 'abcd', nombreCompleto: 'Ana Alba' },
    {username: 'Saint', password:'7315', nombreCompleto: 'Santi Alba'}
  ];

  private usuarioSubject = new BehaviorSubject<string | null>(null);
  usuario$ = this.usuarioSubject.asObservable();
  esAdmin(): boolean {
    const nombre = this.getUsuario();
    return this.usuarios.some(u => u.nombreCompleto === nombre);
  }
  

  login(username: string, password: string, nombreCompleto: string): boolean {
    const match = this.usuarios.find(u =>
      u.username === username &&
      u.password === password &&
      u.nombreCompleto === nombreCompleto
    );
    if (match) {
      this.usuarioSubject.next(nombreCompleto); // mostramos nombre completo
      return true;
    }
    return false;
  }
  logout() {
    this.usuarioSubject.next(null);
  }


  getUsuario(): string | null {
    return this.usuarioSubject.getValue();
  }
}
