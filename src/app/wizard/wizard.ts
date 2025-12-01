import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router'; 
import { FormsModule } from '@angular/forms'; // NECESSÁRIO para [(ngModel)]

@Component({
  selector: 'app-wizard',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule], // Adicionado FormsModule
  templateUrl: './wizard.html', 
  styleUrl: './wizard.css' 
})
export class WizardComponent implements OnInit {

  public passoAtual: number = 1;
  public descricaoSelecionada: string = '';
  public minDate: string = ''; 
  
  // NOVO: Objeto para armazenar dados do formulário
  public formData = {
    data_gravacao: '',
    tipo_producao: '', 
    distribuicao: '', // <-- NOVO: Para rastrear a opção selecionada
    outra_distribuicao: '' // <-- NOVO: Para rastrear o campo de texto "Outro"
  };

  constructor() { }

  ngOnInit(): void {
    this.calculateMinDate();
  }

  calculateMinDate(): void {
    const today = new Date();
    today.setDate(today.getDate() + 7); 
    
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    
    this.minDate = `${year}-${month}-${day}`;
  }


  proximoPasso(numeroPasso: number) {
    // Trava de Validação para o Passo 1 -> 2
    if (this.passoAtual === 1) {
      if (!this.formData.data_gravacao) {
        alert('Por favor, preencha a Data Pretendida antes de avançar.');
        return; 
      }
      
      const dataSelecionada = new Date(this.formData.data_gravacao + 'T00:00:00'); 
      const dataMinima = new Date(this.minDate + 'T00:00:00');

      if (dataSelecionada < dataMinima) {
        alert(`A Data Pretendida deve ser pelo menos 7 dias após a data de hoje (${new Date().toLocaleDateString()}). O mínimo é ${new Date(this.minDate).toLocaleDateString()}.`);
        return; 
      }
    }

    // Trava de Validação para o Passo 2 -> 3
    if (this.passoAtual === 2) {
        if (!this.formData.tipo_producao) {
            alert('Por favor, selecione o Tipo de Produção antes de avançar.');
            return;
        }
        this.atualizarLimitePessoas();
    }
    
    this.passoAtual = numeroPasso;
    this.scrollToTop();
  }

  passoAnterior(numeroPasso: number) {
    this.passoAtual = numeroPasso;
    this.scrollToTop();
  }

  atualizarDescricao(novaDescricao: string) {
    this.descricaoSelecionada = novaDescricao;
  }

  scrollToTop() {
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

      campoQtdPessoas.max = limite || '99';
      
      if (parseInt(campoQtdPessoas.value) > parseInt(campoQtdPessoas.max)) {
        campoQtdPessoas.value = campoQtdPessoas.max;
      }
      
      infoQtdPessoas.textContent = `Limite para ${tipoTexto}: ${limite} pessoas.`;
      infoQtdPessoas.style.color = "#4F46E5";
    } else if (infoQtdPessoas) {
      campoQtdPessoas.max = '99';
      infoQtdPessoas.textContent = "O limite de pessoas será ajustado com base no Tipo de Produção.";
      infoQtdPessoas.style.color = "#6B7280";
    }
  }
}