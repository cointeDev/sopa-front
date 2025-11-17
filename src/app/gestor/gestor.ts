import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // <-- 1. IMPORTAR

@Component({
  selector: 'app-gestor',
  standalone: true,
  imports: [CommonModule], // <-- 2. ADICIONAR AQUI
  templateUrl: './gestor.html',
  styleUrl: './gestor.css'
})
export class GestorComponent { // (ou export class Gestor)

  // 3. ADICIONE A VARIÁVEL DE ESTADO
  // Define a aba 'dashboard' como a padrão
  public abaAtual: string = 'dashboard';

  constructor() { }

  // 4. ADICIONE A FUNÇÃO PARA MUDAR DE ABA
  mudarAba(novaAba: string) {
    this.abaAtual = novaAba;
  }
}
