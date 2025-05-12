import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar'; // Importa MatToolbarModule

@Component({
  selector: 'app-footer',
  standalone: true, // Asegúrate de que sea un componente standalone
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  imports: [MatToolbarModule] // Agrega MatToolbarModule en imports
})
export class FooterComponent {}
