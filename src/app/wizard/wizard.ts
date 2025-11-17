import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // <-- 1. PRECISAMOS DISSO
import { RouterLink } from '@angular/router'; // <-- 2. PRECISAMOS DISSO

@Component({
  selector: 'app-wizard',
  standalone: true,
  imports: [CommonModule, RouterLink], // <-- 3. E DISSO
  templateUrl: './wizard.html', // (ou ./wizard.component.html)
  styleUrl: './wizard.css' // (ou ./wizard.component.css)
})
export class WizardComponent { // (ou export class Wizard)

  // 4. ADICIONE TODO O CÓDIGO ABAIXO DENTRO DA CLASSE

  public passoAtual: number = 1;

  constructor() { }

  proximoPasso(numeroPasso: number) {
    // Chama a função de trava ao sair do passo 2
    if (this.passoAtual === 2) {
      this.atualizarLimitePessoas();
    }

    this.passoAtual = numeroPasso;
    this.scrollToTop();
  }

  passoAnterior(numeroPasso: number) {
    this.passoAtual = numeroPasso;
    this.scrollToTop();
  }

  // Função para rolar para o topo (melhora a usabilidade)
  scrollToTop() {
    // Encontra o <form> e rola para o topo
    const formElement = document.getElementById('wizard-form');
    if (formElement) {
      formElement.scrollIntoView();
    }
  }

  atualizarLimitePessoas() {
    const tipoSelecionado = document.querySelector('input[name="tipo_producao"]:checked') as HTMLInputElement;
    const campoQtdPessoas = document.getElementById('qtd_pessoas') as HTMLInputElement;
    const infoQtdPessoas = document.getElementById('limite-pessoas-info');

    if (tipoSelecionado && infoQtdPessoas && campoQtdPessoas) {
      const limite = tipoSelecionado.getAttribute('data-limit');
      const tipoTexto = tipoSelecionado.labels ? tipoSelecionado.labels[0].textContent?.trim().split('\n')[0] : 'produção';

      campoQtdPessoas.max = limite || '99'; // Define o limite máximo no campo
      
      // Reseta o valor se for maior que o novo limite
      if (parseInt(campoQtdPessoas.value) > parseInt(campoQtdPessoas.max)) {
        campoQtdPessoas.value = campoQtdPessoas.max;
      }
      
      infoQtdPessoas.textContent = `Limite para ${tipoTexto}: ${limite} pessoas.`;
      infoQtdPessoas.style.color = "#4F46E5"; // Destaca a informação
    } else if (infoQtdPessoas) {
      // Caso nenhum seja selecionado
      campoQtdPessoas.max = '99';
      infoQtdPessoas.textContent = "O limite de pessoas será ajustado com base no Tipo de Produção.";
      infoQtdPessoas.style.color = "#6B7280"; // Cor padrão
    }
  }
}
