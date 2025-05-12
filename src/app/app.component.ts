import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header/header.component';
import { NavComponent } from './nav/nav/nav.component';
import { FooterComponent } from './footer/footer/footer.component';
import { V3Component } from './v3/v3/v3.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,HeaderComponent,NavComponent,FooterComponent,V3Component],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  template: `
    <app-nav [username]="usuario"></app-nav>
    <app-v3 (usuarioLogueado)="usuario = $event"></app-v3>
  `,
})
export class AppComponent {
  title = 'miniProyectoAngular';
  usuario: string | null = null;

  onActivate(component: any) {
    if (component.usuarioLogueado) {
      component.usuarioLogueado.subscribe((username: string) => {
        this.usuario = username;
      });
    }
  }
}
