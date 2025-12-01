import { Component, OnInit } from '@angular/core'; 
import { CommonModule, DatePipe } from '@angular/common'; // CommonModule e DatePipe
import { RouterLink } from '@angular/router'; // CORREÇÃO: RouterLink VEM de @angular/router
import { ActivatedRoute } from '@angular/router'; 

@Component({
  selector: 'app-status',
  standalone: true,
  imports: [CommonModule, RouterLink, DatePipe], // DatePipe e RouterLink estão corretos no array
  templateUrl: './status.html',
  styleUrl: './status.css'
})
export class StatusComponent implements OnInit { 

  // Variáveis de Status (começam como FALSAS)
  isTracking: boolean = false;
  isRejected: boolean = false;
  isReturnedForCorrection: boolean = false;

  // Variável para a data limite estimada (simulada)
  dataEstimada: Date | null = null; 

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    const token = this.route.snapshot.paramMap.get('token');
    
    // Simulação da data limite (Ex: 10 dias após a gravação)
    // Se a gravação foi dia 2025/11/27, o prazo estimado é 2025/12/7.
    this.dataEstimada = new Date(2025, 11, 7); 

    // Lógica de teste com seus tokens
    if (token === '11111') {
      this.isTracking = true;
    } else if (token === '22222') {
      this.isReturnedForCorrection = true;
    } else if (token === '33333') {
      this.isRejected = true;
    } else {
      this.isTracking = true; 
    }
  }

  // Função para o botão de enviar correção
  enviarCorrecao() {
    alert("Correção enviada com sucesso! Aguarde a nova análise.");
  }
}