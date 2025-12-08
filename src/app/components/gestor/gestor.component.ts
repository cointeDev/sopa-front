import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import {
  CdkDrag,
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms';
import { AgendaComponent  } from '../agenda/agenda.component';

export interface Operacional {
  id: string;
  nome: string;
  cor: string;
  perfil: string;
  foto?: string;
}
export const operacionalMap: { [key: string]: Operacional } = {
  alana: { id: 'alana', nome: 'Alana', cor: '#7E57C2', perfil: 'Gerente' },
  rocheto: { id: 'rocheto', nome: 'Rochetô', cor: '#29B6F6', perfil: 'Editor' },
  gabriel: { id: 'gabriel', nome: 'Gabriel', cor: '#66BB6A', perfil: 'Editor' },
  caio: { id: 'caio', nome: 'Caio', cor: '#FFA726', perfil: 'Editor' },
  joao_paulo: { id: 'joao_paulo', nome: 'João Paulo', cor: '#26A69A', perfil: 'Intérprete' },
  isa: { id: 'isa', nome: 'Isa', cor: '#EC407A', perfil: 'Intérprete' },
  maiara: { id: 'maiara', nome: 'Maiara', cor: '#AB47BC', perfil: 'Intérprete' },
  livre: { id: 'livre', nome: 'Livre', cor: 'transparent', perfil: 'N/A' },
};
export type ResponsavelId = string;

export interface Card {
  id: number;
  titulo: string;
  disciplina: string;
  solicitante: string;
  tipo: string;
  programa: 'enem' | 'rieh';
  responsavel: ResponsavelId | null;
  prazo?: string;
  statusVisual?: 'finalizado' | 'alocado' | 'pendente';
  etapasAtivas?: { [key: string]: boolean };
}

@Component({
  selector: 'app-gestor',
  standalone: true,
  imports: [CommonModule, RouterLink, DragDropModule, FormsModule, AgendaComponent ],
  templateUrl: './gestor.component.html',
  styleUrl: './gestor.component.css',
})
export class GestorComponent implements OnInit {
  public abaAtual: string = 'quadro';
  public visaoQuadro: string = 'geral';
  public greeting: string = '';
  public userName: string = 'Alana';
  public readonly operacionalMap = operacionalMap;

  public listasComparacao: string[] = [];

  public colunasDisponiveis = [
    { id: 'standby', label: 'Standby' },
    { id: 'para-producao-semanal', label: 'Produção Semanal' },
    { id: 'ao-vivo', label: 'Ao Vivo' },
    { id: 'gravado', label: 'Gravado' },
    { id: 'edicao1', label: 'Edição 1' },
    { id: 'edicao2', label: 'Edição 2' },
    { id: 'edicao3', label: 'Edição 3' },
    { id: 'edicao-final', label: 'Edição Final' },
    { id: 'libras', label: 'Libras' },
    { id: 'revisao-lp', label: 'Revisão LP' },
    { id: 'producao-lse', label: 'Produção LSE' },
    { id: 'concluido', label: 'Concluído' },
    { id: 'publicado', label: 'Publicado' },
  ];

  public colunasNavegacao = this.colunasDisponiveis;

  public listaOperacionais: Operacional[] = Object.values(operacionalMap).filter(
    (op) => op.id !== 'livre'
  );
  public operacionaisArrastaveis: ResponsavelId[] = this.listaOperacionais.map((op) => op.id);

  columnResponsavelMap: { [key: string]: ResponsavelId | null } = {
    edicao1: 'rocheto',
    libras: 'isa',
    gravado: 'alana',
  };
  public isModalOpen: boolean = false;
  public novoCardData = {
    titulo: '',
    solicitante: '',
    disciplina: 'História',
    tipo: 'videoaula',
    programa: 'enem',
    prazo: '',
    listaId: 'standby',
    responsavel: '',
  };
  public etapasWorkflow = [
    { key: 'gravado', label: 'Gravação' },
    { key: 'edicao1', label: 'Edição 1 (Decupagem)' },
    { key: 'edicao2', label: 'Edição 2 (Ilustração)' },
    { key: 'edicao3', label: 'Edição 3' },
    { key: 'edicao-final', label: 'Edição Final' },
    { key: 'libras', label: 'Libras' },
    { key: 'revisao-lp', label: 'Revisão LP' },
    { key: 'producao-lse', label: 'Produção LSE' },
  ];
  public etapasSelecionadas: { [key: string]: boolean } = {};
  private nextCardId: number = 100;

  standby: Card[] = [];
  paraProducaoSemanal: Card[] = [];
  aoVivo: Card[] = [];
  gravado: Card[] = [];
  edicao1: Card[] = [];
  edicao2: Card[] = [];
  edicao3: Card[] = [];
  edicaoFinal: Card[] = [];
  libras: Card[] = [];
  revisaoLP: Card[] = [];
  producaoLSE: Card[] = [];
  concluido: Card[] = [];
  publicado: Card[] = [];

  public listMap: { [key: string]: Card[] } = {};

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.setGreeting();
    this.inicializarListas();
    this.atualizarEtapasPadrao();
  }

  private inicializarListas() {
    this.listMap = {
      standby: this.standby,
      'para-producao-semanal': this.paraProducaoSemanal,
      'ao-vivo': this.aoVivo,
      gravado: this.gravado,
      edicao1: this.edicao1,
      edicao2: this.edicao2,
      edicao3: this.edicao3,
      'edicao-final': this.edicaoFinal,
      libras: this.libras,
      'revisao-lp': this.revisaoLP,
      'producao-lse': this.producaoLSE,
      concluido: this.concluido,
      publicado: this.publicado,
    };
    this.createAndPushCard(
      'Pauta Podcast RIEH',
      'Coordenação',
      'Geral',
      'podcast',
      'rieh',
      '2025-11-25',
      'para-producao-semanal'
    );
    this.createAndPushCard(
      'Live de Atualidades',
      'Prof. Silva',
      'Atualidades',
      'live',
      'enem',
      '2025-11-20',
      'ao-vivo',
      'alana'
    );
  }

  private createAndPushCard(
    titulo: string,
    solicitante: string,
    disciplina: string,
    tipo: string,
    programa: 'enem' | 'rieh',
    prazo: string,
    listaId: string,
    responsavel: ResponsavelId | null = null
  ) {
    const novoCard: Card = {
      id: this.nextCardId++,
      titulo,
      disciplina,
      solicitante,
      tipo,
      programa,
      prazo,
      responsavel,
      statusVisual: responsavel ? 'alocado' : 'pendente',
      etapasAtivas: { ...this.etapasSelecionadas },
    };
    if (this.listMap[listaId]) {
      this.listMap[listaId].push(novoCard);
    }
  }

  public getTituloColuna(colunaId: string): string {
    const coluna = this.colunasDisponiveis.find((c) => c.id === colunaId);
    return coluna ? coluna.label : colunaId;
  }

  mudarVisao(novaVisao: string) {
    this.visaoQuadro = novaVisao;
  }

  focarLista(listaId: string) {
    this.adicionarLista(listaId);
  }

  adicionarLista(listaId: string) {
    this.mudarVisao('focada');
    if (!this.listasComparacao.includes(listaId)) {
      if (this.listasComparacao.length >= 2) {
        this.listasComparacao.shift();
      }
      this.listasComparacao.push(listaId);
    }
  }

  fecharListaFocada(listaId: string) {
    this.listasComparacao = this.listasComparacao.filter((id) => id !== listaId);
    if (this.listasComparacao.length === 0) this.mudarVisao('geral');
  }

  dropColuna(event: CdkDragDrop<string[]>) {
    if (event.previousContainer !== event.container) {
      this.adicionarLista(event.item.data);
    } else {
      moveItemInArray(this.listasComparacao, event.previousIndex, event.currentIndex);
    }
  }

  scrollToColumn(event: any) {
    const elementId = event.target.value;
    if (elementId) {
      const element = document.getElementById(elementId);
      if (element)
        element.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
    event.target.value = '';
  }

  mudarResponsavel(card: Card, event: any) {
    const novoId = event.target.value;
    if (novoId && this.operacionalMap[novoId as string]) {
      card.responsavel = novoId;
      card.statusVisual = 'alocado';
    } else {
      card.responsavel = null;
      card.statusVisual = 'pendente';
    }
  }
  confirmarCriacaoCard() {
    const resp = this.novoCardData.responsavel === '' ? null : this.novoCardData.responsavel;
    this.createAndPushCard(
      this.novoCardData.titulo,
      this.novoCardData.solicitante,
      this.novoCardData.disciplina,
      this.novoCardData.tipo,
      this.novoCardData.programa as 'enem' | 'rieh',
      this.novoCardData.prazo,
      this.novoCardData.listaId,
      resp
    );
    this.closeModal();
  }
  public setGreeting(): void {
    const h = new Date().getHours();
    this.greeting = h < 12 ? 'Bom dia' : h < 18 ? 'Boa tarde' : 'Boa noite';
  }
  mudarAba(n: string) {
    this.abaAtual = n;
  }
  openModal() {
    this.isModalOpen = true;
    this.atualizarEtapasPadrao();
  }
  closeModal() {
    this.isModalOpen = false;
    this.resetModalForm();
  }
  resetModalForm() {
    this.novoCardData = {
      titulo: '',
      solicitante: '',
      disciplina: 'História',
      tipo: 'videoaula',
      programa: 'enem',
      prazo: '',
      listaId: 'standby',
      responsavel: '',
    };
  }
  atualizarEtapasPadrao() {
    const tipo = this.novoCardData.tipo;
    this.etapasWorkflow.forEach((e) => (this.etapasSelecionadas[e.key] = true));
    if (tipo === 'podcast') {
      this.etapasSelecionadas['libras'] = false;
      this.etapasSelecionadas['producao-lse'] = false;
      this.etapasSelecionadas['edicao2'] = false;
    } else if (tipo === 'reels') {
      this.etapasSelecionadas['libras'] = false;
    }
  }
  public getResponsavelNome(id: ResponsavelId | null): string {
    if (!id) return 'Não Atribuído';
    return this.operacionalMap[id]?.nome.split(' ')[0] || 'Desconhecido';
  }
  public getResponsavelCor(id: ResponsavelId | null): string {
    if (!id) return '#E5E7EB';
    return this.operacionalMap[id]?.cor;
  }
  public getOperacionalData(id: any): { nome: string; cor: string; perfil: string } {
    const key = id as string;
    if (this.operacionalMap[key]) return this.operacionalMap[key];
    return { nome: 'Desconhecido', cor: '#ccc', perfil: 'N/A' };
  }

  dropOperacional(event: any) {}
  isCardPredicate = (drag: CdkDrag<any>) => typeof drag.data !== 'string';
  noReturnPredicate = (drag: CdkDrag<any>) => false;

  drop(event: CdkDragDrop<Card[]>) {
    if (typeof event.item.data !== 'string') {
      if (event.previousContainer === event.container) {
        moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      } else {
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex
        );
        const card = event.container.data[event.currentIndex];
        const novaLista = event.container.id;
        if (novaLista === 'concluido' || novaLista === 'publicado') {
          card.statusVisual = 'finalizado';
        } else {
          card.statusVisual = card.responsavel ? 'alocado' : 'pendente';
        }
      }
    }
  }
  cardDrop(event: CdkDragDrop<any>, targetCard: Card) {}
}
