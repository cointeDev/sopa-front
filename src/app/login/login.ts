import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // <-- 1. IMPORTAR
import { RouterLink } from '@angular/router'; // <-- 2. IMPORTAR

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLink], // <-- 3. ADICIONAR AQUI
  templateUrl: './login.html', // (ou ./login.component.html)
  styleUrl: './login.css' // (ou ./login.component.css)
})
export class LoginComponent { // (ou export class Login)

  constructor() { }

  // No futuro, a lógica de login (chamar a API) virá aqui
}
