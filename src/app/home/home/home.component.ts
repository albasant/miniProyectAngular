import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DomseguroPipe } from '../../domseguro.pipe';

@Component({
  selector: 'app-home',
  imports: [RouterOutlet,DomseguroPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  video:string="rHPYSHltYpg?si=cP35MmkjazuHECqj";
}