import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router'; 

@Component({
  selector: 'app-wizard',
  standalone: true,
  imports: [CommonModule, RouterLink], 
  templateUrl: './wizard.component.html', 
  styleUrl: './wizard.component.css' 
})
export class WizardComponent implements OnInit {

  public passoAtual: number = 1;
  
  public descricaoSelecionada: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  proximoPasso(numeroPasso: number) {
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