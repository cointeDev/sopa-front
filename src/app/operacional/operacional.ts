// 1. IMPORTAMOS O OnInit
import { Component, OnInit } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router'; 
import { Agenda } from '../agenda/agenda'; // <-- ADIÇÃO: Importa o componente Agenda

@Component({
  selector: 'app-operacional',
  standalone: true,
  imports: [CommonModule, RouterLink, Agenda], // <-- CORREÇÃO: Adiciona Agenda aqui
  templateUrl: './operacional.html',
  styleUrl: './operacional.css'
})
// 2. IMPLEMENTAMOS O OnInit
export class OperacionalComponent implements OnInit { 

  public abaAtual: string = 'tarefas';
  
  // 3. ADICIONAMOS AS NOVAS VARIÁVEIS
  public greeting: string = ''; // Ex: "Bom dia"
  public userName: string = 'Maria'; // (Simulado para o Operacional)

  constructor() { }

  // 4. ADICIONAMOS A FUNÇÃO ngOnInit
  ngOnInit(): void {
    this.setGreeting();
  }

  // 5. ADICIONAMOS A FUNÇÃO PARA DEFINIR A SAUDAÇÃO
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

  // Função para mudar de aba (já existia)
  mudarAba(novaAba: string) {
    this.abaAtual = novaAba;
  }
}