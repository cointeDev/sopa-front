import { Component } from '@angular/core';
import { RouterLink } from '@angular/router'; // <-- 1. ADICIONE ESTA LINHA

@Component({
  selector: 'app-home',
  imports: [RouterLink], // <-- 2. ADICIONE O RouterLink AQUI
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

}