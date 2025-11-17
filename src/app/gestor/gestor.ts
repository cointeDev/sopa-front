import { Component, OnInit } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router'; 
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop'; 
import { FormsModule } from '@angular/forms'; 

// --- DEFINIÇÕES GLOBAIS (Mantidas) ---
export const operacionalMap = {
    'editor_a': { nome: 'João Editor', cor: '#FFD166', perfil: 'Editor' }, 
    'editor_b': { nome: 'Pedro Editor', cor: '#82B2FC', perfil: 'Editor' }, 
    'editor_c': { nome: 'Lucas Editor', cor: '#FF6B6B', perfil: 'Editor' }, 
    'maria': { nome: 'Maria Decupadora', cor: '#06d6a0', perfil: 'Decupadora' }, 
    'fernanda': { nome: 'Fernanda LIBRAS', cor: '#A9D8E6', perfil: 'Libras' }, 
    'rafael': { nome: 'Rafael Téc. Som', cor: '#8338ec', perfil: 'Técnico' }, 
    'livre': { nome: 'Livre', cor: 'transparent', perfil: 'N/A' } 
};
export type ResponsavelId = keyof typeof operacionalMap; 
export interface Card {
    id: number;
    titulo: string;
    disciplina: string;
    programa: 'enem' | 'rieh';
    responsavel: ResponsavelId | null; 
    dataConclusao?: string;
    statusVisual?: 'finalizado' | 'alocado' | 'pendente';
}
// ----------------------------------------


@Component({
    selector: 'app-gestor',
    standalone: true,
    imports: [CommonModule, RouterLink, DragDropModule, FormsModule], 
    templateUrl: './gestor.html',
    styleUrl: './gestor.css'
})
export class GestorComponent implements OnInit { 

    public abaAtual: string = 'dashboard';
    public visaoQuadro: string = 'geral'; 
    public listaFocada: string | null = null;
    public greeting: string = ''; 
    public userName: string = 'João'; 
    public readonly operacionalMap = operacionalMap; 

    // Mapa de colunas simplificado (não será mais usado para atribuir)
    columnResponsavelMap: { [key: string]: ResponsavelId | null } = {
        'edicao1': 'maria', // Decupagem
        'edicaoFinal': 'editor_c', // Edição Final
        'libras': 'fernanda', // Libras
        'gravado': 'rafael',
    };

    // Variáveis para o Modal de Criação de Card
    public isModalOpen: boolean = false;
    public novoCardTitulo: string = '';
    public novoCardDisciplina: string = 'História';
    public novoCardPrograma: string = 'enem';
    public novoCardListaId: string = 'para-producao-semanal'; // Novo ID de destino padrão

    // Contadores de ID
    private nextCardId: number = 100;

    // Funções auxiliares para criar cards
    private createCard(titulo: string, disciplina: string, programa: 'enem' | 'rieh', responsavel: ResponsavelId | null = null, dataConclusao?: string, statusVisual?: 'finalizado' | 'alocado' | 'pendente'): Card {
    return {
        id: this.nextCardId++,
        titulo,
        disciplina,
        programa,
        responsavel,
        dataConclusao,
        statusVisual // <-- ADICIONADO O NOVO PARÂMETRO AO OBJETO
    };
}

    // --- ARRAYS KANBAN (SIMPLIFICADO PARA 11 LISTAS) ---
    standby: Card[] = [];
    paraProducaoSemanal: Card[] = [this.createCard('Pauta Podcast RIEH', 'Outros', 'rieh', 'editor_a')];
    aoVivo: Card[] = [this.createCard('Live de Atualidades', 'Atualidades', 'enem', 'rafael')];
    gravado: Card[] = [this.createCard('Videoaula - Relevo', 'Geografia', 'enem', 'rafael')];
    edicao1: Card[] = []; // Decupagem
    edicao2: Card[] = []; // Ilustração
    edicao3: Card[] = []; // Etapa 3
    edicaoFinal: Card[] = []; // Edição Final
    libras: Card[] = []; // Estudo/Gravação Libras
    revisaoLP: Card[] = []; // Revisão LP
    producaoLSE: Card[] = []; // Produção LSE
    concluido: Card[] = [this.createCard('Aula - Funções (Concluída)', 'Matemática', 'enem', 'maria', '2025-10-15', 'finalizado')];
    publicado: Card[] = [this.createCard('Videoaula - 2ª Guerra', 'História', 'enem', 'editor_c', '2025-10-08', 'finalizado')];


    // Mapeamento dos Arrays (CORRIGIDO)
    public listMap: { [key: string]: Card[] } = {
        'standby': this.standby, 'para-producao-semanal': this.paraProducaoSemanal, 'ao-vivo': this.aoVivo, 
        'gravado': this.gravado, 'edicao1': this.edicao1, 'edicao2': this.edicao2,
        'edicao3': this.edicao3, 'edicao-final': this.edicaoFinal, 'libras': this.libras,
        'revisao-lp': this.revisaoLP, 'producao-lse': this.producaoLSE, 'concluido': this.concluido,
        'publicado': this.publicado
    };

    public listIds: string[] = [
        'standby', 'para-producao-semanal', 'ao-vivo', 'gravado', 'edicao1', 'edicao2', 
        'edicao3', 'edicao-final', 'libras', 'revisao-lp', 'producao-lse', 
        'concluido', 'publicado'
    ];

    constructor(private router: Router) { }

    ngOnInit(): void {
        this.setGreeting();
        // this.calculateDashboardAnalytics();
    }

    // --- FUNÇÕES AUXILIARES (APENAS NOME) ---
    public getResponsavelNome(id: ResponsavelId | null): string {
        if (!id) return 'Não Atribuído';
        return this.operacionalMap[id]?.nome || 'Desconhecido';
    }

    public getResponsavelIdDaColuna(colunaId: string): ResponsavelId | null {
        // Agora, esta função é menos importante, mas mantém a tipagem
        return this.columnResponsavelMap[colunaId] || null;
    }
    
    // ... (restante das funções setGreeting, mudarAba, mudarVisao, focarLista, openModal, closeModal, resetModalForm, criarNovoCard, drop, atribuirResponsavel, calculateDashboardAnalytics) ...
    // (O resto das funções de lógica foi omitido para focar na estrutura, mas o usuário deve usar a versão completa do arquivo anterior)
    
    public setGreeting(): void { 
        const horaAtual = new Date().getHours(); 
        if (horaAtual < 12) { this.greeting = 'Bom dia'; } 
        else if (horaAtual < 18) { this.greeting = 'Boa tarde'; } 
        else { this.greeting = 'Boa noite'; }
    }

    mudarAba(novaAba: string) { this.abaAtual = novaAba; }
    mudarVisao(novaVisao: string) {
        this.visaoQuadro = novaVisao;
        if (novaVisao === 'geral') { this.listaFocada = null; } 
        else if (novaVisao === 'focada' && this.listaFocada === null) {
            this.listaFocada = 'ao-vivo';
        }
    }

    focarLista(nomeDaLista: string) {
        if (this.listaFocada === nomeDaLista) {
            this.mudarVisao('geral');
            this.listaFocada = null;
        } else {
            this.mudarVisao('focada');
            this.listaFocada = nomeDaLista;
        }
    }

    // Lógica de Abertura/Fechamento do Modal (Mantida)
    openModal() { this.isModalOpen = true; }
    closeModal() { this.isModalOpen = false; this.resetModalForm(); }
    resetModalForm() {
        this.novoCardTitulo = '';
        this.novoCardDisciplina = 'História';
        this.novoCardPrograma = 'enem';
        this.novoCardListaId = 'prod-semanal';
    }

    // Lógica de Criação de Novo Card (Mantida)
    criarNovoCard() {
        if (!this.novoCardTitulo || !this.novoCardListaId) {
            alert('Preencha o título e a lista de destino.');
            return;
        }

        const listaDestino = this.listMap[this.novoCardListaId];
        if (listaDestino) {
            const novoCard = this.createCard(
                this.novoCardTitulo, 
                this.novoCardDisciplina, 
                this.novoCardPrograma as 'enem' | 'rieh', 
                null
            );
            listaDestino.push(novoCard);
            
            this.closeModal(); 
            this.abaAtual = 'quadro';
            this.mudarVisao('focada');
            this.focarLista(this.novoCardListaId);
            // this.calculateDashboardAnalytics(); 
        } else {
            alert('Lista de destino inválida.');
        }
    }

    // Lógica do Drag-and-Drop (Movimento entre listas)
    drop(event: CdkDragDrop<Card[]>) {
        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {
            transferArrayItem(
                event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex
            );
            
            // LÓGICA DE ATRIBUIÇÃO
            const cardMovido: Card = event.container.data[event.currentIndex];
            const novaListaId = event.container.id; 
            const novoResponsavelId = this.columnResponsavelMap[novaListaId] as ResponsavelId || null;

            // Esta lógica DEVE ser atualizada:
            // O Gestor LOCAL é quem decide a quem atribuir, arrastando o card para a lista
            // Portanto, o 'responsavel' é determinado pela NOVA COLUNA (via um modal de atribuição, ou via um botão de arrasto).
            // Por enquanto, apenas removemos a atribuição antiga e definimos o status
            
            cardMovido.responsavel = null; // Limpa o responsável para ser atribuído na nova etapa
            cardMovido.statusVisual = (novaListaId === 'concluido' || novaListaId === 'publicado') ? 'finalizado' : 'alocado';
        }
        // this.calculateDashboardAnalytics();
    }

    // Lógica de Atribuição (Drag & Drop no ícone)
    atribuirResponsavel(card: Card, responsavelId: string) {
        if (responsavelId in this.operacionalMap) {
            card.responsavel = responsavelId as ResponsavelId; 
        } else {
            console.error(`ID de responsável inválido: ${responsavelId}`);
        }
    }
}