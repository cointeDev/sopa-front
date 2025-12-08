import { Component, OnInit } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router'; 
import { AgendaComponent  } from '../agenda/agenda.component';

@Component({
  selector: 'app-operacional',
  standalone: true,
  imports: [CommonModule, RouterLink, AgendaComponent],
  templateUrl: './operacional.component.html',
  styleUrl: './operacional.component.css'
})
export class OperacionalComponent implements OnInit { 

  public abaAtual: string = 'tarefas';
  
  public greeting: string = '';
  public userName: string = 'Maria';

  constructor() { }

  ngOnInit(): void {
    this.setGreeting();
  }

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

  mudarAba(novaAba: string) {
    this.abaAtual = novaAba;
  }
}