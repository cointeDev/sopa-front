import { Component, OnInit } from '@angular/core'; // <-- 1. IMPORTAR OnInit
import { CommonModule } from '@angular/common'; 
import { RouterLink } from '@angular/router'; 

@Component({
  selector: 'app-gestor-geral',
  standalone: true,
  imports: [CommonModule, RouterLink], // <-- 2. ADICIONAR CommonModule e RouterLink
  templateUrl: './gestor-geral.html',
  styleUrl: './gestor-geral.css'
})
export class GestorGeralComponent implements OnInit { // <-- 3. IMPLEMENTAR OnInit

  // 4. ADICIONAR AS VARIÁVEIS DE ESTADO E SAUDAÇÃO
  
  // Define a aba 'visao-geral' como a padrão
  public abaAtual: string = 'visao-geral';
  
  public greeting: string = ''; // Ex: "Bom dia"
  public userName: string = 'Diretor'; // (Simulado para o Gestor Geral)

  constructor() { }

  // 5. ADICIONAR A FUNÇÃO ngOnInit
  ngOnInit(): void {
    this.setGreeting();
  }

  // 6. ADICIONAR A FUNÇÃO PARA DEFINIR A SAUDAÇÃO
  private setGreeting(): void {
    const horaAtual = new Date().getHours(); // Pega a hora atual (0-23)

    if (horaAtual < 12) {
      this.greeting = 'Bom dia';
    } else if (horaAtual < 18) {
      this.greeting = 'Boa tarde';
    } else {
      this.greeting = 'Boa noite';
    }
  }

  // 7. ADICIONAR A FUNÇÃO PARA MUDAR DE ABA
  mudarAba(novaAba: string) {
    this.abaAtual = novaAba;
  }
}