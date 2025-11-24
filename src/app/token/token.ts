import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router'; 

@Component({
  selector: 'app-token',
  standalone: true,
  imports: [CommonModule, RouterLink], 
  templateUrl: './token.html', 
  styleUrl: './token.css' 
})
export class TokenComponent { 

  // 2. INJETE O ROUTER AQUI
  constructor(private router: Router) { }

  // 3. ADICIONE A FUNÇÃO PARA O BOTÃO
  consultarToken(token : string) {
    // pega o valor do input,
    // consultaria a API, e SÓ ENTÃO navega.
    this.router.navigate(['/status',token]);
  }
}