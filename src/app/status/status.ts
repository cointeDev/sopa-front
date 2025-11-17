import { Component, OnInit } from '@angular/core'; // <-- 1. IMPORTE OnInit
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router'; // <-- 2. IMPORTE ActivatedRoute

@Component({
  selector: 'app-status',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './status.html',
  styleUrl: './status.css'
})
export class StatusComponent implements OnInit { // <-- 3. IMPLEMENTE OnInit

  // Variáveis de Status (começam como FALSAS)
  isTracking: boolean = false;
  isRejected: boolean = false;
  isReturnedForCorrection: boolean = false;

  // 4. INJETE O ActivatedRoute
  constructor(private route: ActivatedRoute) { }

  // 5. ADICIONE A LÓGICA DE TESTE
  ngOnInit(): void {
    // Pega o parâmetro 'token' da URL (o que vem depois de /status/)
    const token = this.route.snapshot.paramMap.get('token');

    // Lógica de teste com seus tokens
    if (token === '11111') {
      // 11111 = Mostra Acompanhamento
      this.isTracking = true;
    } else if (token === '22222') {
      // 22222 = Mostra Devolução/Correção
      this.isReturnedForCorrection = true;
    } else if (token === '33333') {
      // 33333 = Mostra Negação
      this.isRejected = true;
    } else {
      // Se o token for inválido, mostra o acompanhamento (ou um erro)
      this.isTracking = true; 
    }
  }

  // Função para o botão de enviar correção
  enviarCorrecao() {
    alert("Correção enviada com sucesso! Aguarde a nova análise.");
  }
}