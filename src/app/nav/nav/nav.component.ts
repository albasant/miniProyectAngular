import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { usuarioService } from '../../usuario/usuario.service';
import { filter } from 'rxjs/operators';
import { CommonModule, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterModule, CommonModule, NgIf],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit {
  username: string | null = null;

  isDark: boolean = false;

  constructor(private usuarioService: usuarioService, private router: Router) {}

  ngOnInit() {
    this.usuarioService.usuario$.subscribe((nombre: string | null) => {
      this.username = nombre;
    });

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.toggleTheme(); // cambia la clase cada vez que cambia la ruta
    });
  }

  toggleTheme(): void {
    this.isDark = !this.isDark;
  }

  logout() {
    this.usuarioService.logout();
  }
}
