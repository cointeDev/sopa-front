import { Component, OnInit } from '@angular/core'; 
import { CommonModule } from '@angular/common'; 
import { RouterLink } from '@angular/router'; 
import { Agenda } from '../agenda/agenda.component';

@Component({
  selector: 'app-gestor-geral',
  standalone: true,
  imports: [CommonModule, RouterLink, Agenda],
  templateUrl: './gestor-geral.component.html',
  styleUrl: './gestor-geral.component.css'
})
export class GestorGeralComponent implements OnInit { 

  public abaAtual: string = 'visao-geral';
  
  public greeting: string = '';
  public userName: string = 'Diretor';

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