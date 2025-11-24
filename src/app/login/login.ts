import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router'; // <-- 1. IMPORTE O Router

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {

  // 2. INJETE O ROUTER AQUI
  constructor(private router: Router) { }

  // 3. ADICIONE A FUNÇÃO DE LOGIN
  fazerLogin(email: string) {
    // Lógica de simulação com os 3 e-mails
    if (email === 'gestor@sopa.com') {
      // Navega para a tela do Gestor
      this.router.navigate(['/gestor']);

    } else if (email === 'geral@sopa.com') {
      // Navega para a tela do Gestor Geral
      this.router.navigate(['/gestor-geral']);

    } else if (email === 'op@sopa.com') {
      // Navega para a tela Operacional (que ainda vamos criar)
      this.router.navigate(['/operacional']);


    } else {
      // E-mail inválido
      alert('E-mail não reconhecido.');
    }
  }
}