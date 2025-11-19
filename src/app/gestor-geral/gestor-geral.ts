import { Component, OnInit } from '@angular/core'; 
import { CommonModule } from '@angular/common'; 
import { RouterLink } from '@angular/router'; 
import { Agenda } from '../agenda/agenda'; // <-- CORREÇÃO: Importa o componente Agenda

@Component({
  selector: 'app-gestor-geral',
  standalone: true,
  imports: [CommonModule, RouterLink, Agenda], // <-- CORREÇÃO: Adiciona Agenda aqui
  templateUrl: './gestor-geral.html',
  styleUrl: './gestor-geral.css'
})
export class GestorGeralComponent implements OnInit { 

  // Variável de estado para a aba
  public abaAtual: string = 'visao-geral';
  
  // Variáveis de saudação e nome
  public greeting: string = ''; // Ex: "Bom dia"
  public userName: string = 'Diretor'; // (Simulado para o Gestor Geral)

  constructor() { }

  // Função para inicialização do componente
  ngOnInit(): void {
    this.setGreeting();
  }

  // Função para definir a saudação (Bom dia/tarde/noite)
  private setGreeting(): void {
    const horaAtual = new Date().getHours(); 

    if (horaAtual < 12) {
      this.greeting = 'Bom dia';
    } else if (horaAtual < 18) {
      this.greeting = 'Boa tarde';
    } else {
      this.greeting = 'Boa noite';
    }
  }

  // Função para mudar de aba
  mudarAba(novaAba: string) {
    this.abaAtual = novaAba;
  }
}