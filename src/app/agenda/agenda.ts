import { Component, OnInit, Input, signal, Signal } from '@angular/core'; 
import { CommonModule, DatePipe } from '@angular/common'; // Importa DatePipe para formatação

// ----------------------------------------------------
// 1. DEFINIÇÕES DE DADOS E INTERFACES
// ----------------------------------------------------

export interface AgendaEvent {
  id: number;
  data: Date; // A data e hora do evento
  titulo: string;
  tipo: 'gravacao' | 'prazo'; // Tipo de evento
  studioId: 'mossoro' | 'natal' | 'rei'; // Onde será a gravação/produção
  responsavelId?: string; // O ID do operador/editor, se aplicável
}

export interface EventStudioColorMap { [key: string]: string; }

// Mapeamento de cores para cada estúdio (para os pontos e bordas)
const studioColorMap: EventStudioColorMap = {
  'natal': '#EF4444', // Vermelho (Estúdio Natal)
  'mossoro': '#3B82F6', // Azul (Estúdio Mossoró)
  'rei': '#10B981', // Verde (RIEH / Global)
};

// Dados Simulados (Mock Events)
const mockEvents: AgendaEvent[] = [
  // Eventos de Mossoró (Azul) - Mês 10 (Novembro)
  { id: 1, data: new Date(2025, 10, 20, 10, 0), titulo: 'Gravação: Aula de Cálculo', tipo: 'gravacao', studioId: 'mossoro', responsavelId: 'caio' },
  { id: 2, data: new Date(2025, 10, 20, 14, 0), titulo: 'Prazo: Roteiro Tópicos Av. III', tipo: 'prazo', studioId: 'mossoro' },
  { id: 3, data: new Date(2025, 10, 26, 9, 30), titulo: 'Gravação: Entrevista Maker', tipo: 'gravacao', studioId: 'mossoro', responsavelId: 'alana' },
  // Eventos de Natal (Vermelho) - Mês 10 (Novembro)
  { id: 4, data: new Date(2025, 10, 27, 15, 0), titulo: 'Gravação: Treinamento LIBRAS', tipo: 'gravacao', studioId: 'natal', responsavelId: 'joao_paulo' },
  // Eventos Globais/RIEH (Verde) - Mês 11 (Dezembro)
  { id: 5, data: new Date(2025, 11, 5, 17, 0), titulo: 'Prazo Final: Lançamento de Campanha', tipo: 'prazo', studioId: 'rei' },
  { id: 6, data: new Date(2025, 11, 15, 11, 0), titulo: 'Gravação: Live de Fim de Ano', tipo: 'gravacao', studioId: 'rei', responsavelId: 'rocheto' },
];


// ----------------------------------------------------
// 2. COMPONENTE AGENDA
// ----------------------------------------------------

@Component({
  selector: 'app-agenda',
  standalone: true,
  imports: [CommonModule, DatePipe], // DatePipe é necessário para a formatação de data no HTML
  templateUrl: './agenda.html',
  styleUrl: './agenda.css'
})
export class Agenda implements OnInit {

  // Inputs para controle do escopo (usados em Gestor Geral e Operacional)
  @Input() scope: 'local' | 'global' = 'global';
  @Input() studioId?: 'mossoro' | 'natal' | 'rei';

  public currentDate: Date = new Date(); // Mês de referência (hoje)
  public weekDays: string[] = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  public miniWeekDays: string[] = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']; // Dias abreviados para mini-calendários

  // Sinais para gerenciar o estado da interação e navegação
  public displayMonth: Date = new Date(); // Mês principal exibido (controlado pelos botões)
  public calendarDays = signal<(Date | null)[]>([]); // Dias do mês principal

  public selectedDay = signal<Date | null>(null); // Dia clicado
  public selectedDayEvents = signal<AgendaEvent[]>([]); // Eventos do dia clicado

  // SINAIS COMPUTADOS para os meses reduzidos
  public prevMonthDate = signal<Date>(new Date());
  public nextMonthDate = signal<Date>(new Date());
  public prevMonthDays = signal<(Date | null)[]>([]);
  public nextMonthDays = signal<(Date | null)[]>([]);

  constructor() { }

  ngOnInit(): void {
    // Garante que o calendário principal e os mini-calendários sejam gerados ao iniciar
    this.generateCalendar();
  }
  
  // ----------------------------------------------------
  // MÉTODOS DE RASTREAMENTO DE ESTADO (Signals)
  // ----------------------------------------------------
  
  // Função que é chamada ao clicar em uma célula do calendário
  openDayDetails(day: Date): void {
    const events = this.getEventsForDay(day);

    if (this.selectedDay() && this.selectedDay()!.toDateString() === day.toDateString()) {
      // Se clicar no mesmo dia, deseleciona (fecha o painel)
      this.selectedDay.set(null);
      this.selectedDayEvents.set([]);
    } else if (events.length > 0) {
      // Se houver eventos, seta o dia e a lista de eventos (abre o painel)
      this.selectedDay.set(day);
      this.selectedDayEvents.set(events);
    } else {
      // Se não houver eventos, limpa a seleção e pode dar um feedback
      // alert(`Nenhum evento agendado para ${day.toLocaleDateString()}.`); // Removido o alert para UX mais fluida
      this.selectedDay.set(null);
      this.selectedDayEvents.set([]);
    }
  }


  // ----------------------------------------------------
  // MÉTODOS DE NAVEGAÇÃO E GERAÇÃO DO CALENDÁRIO
  // ----------------------------------------------------
  
  // NOVA FUNÇÃO: Gera a matriz de dias para qualquer mês (reutilizável para mini-calendários)
  private generateMonthDays(date: Date): (Date | null)[] {
    const days: (Date | null)[] = [];
    const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    const startDayOfWeek = startOfMonth.getDay(); 
    for (let i = 0; i < startDayOfWeek; i++) {
      days.push(null);
    }

    for (let d = new Date(startOfMonth); d <= endOfMonth; d.setDate(d.getDate() + 1)) {
      days.push(new Date(d));
    }
    // Adiciona placeholders para completar a última semana (opcional, mas bom para grid)
    while (days.length % 7 !== 0) {
        days.push(null);
    }
    
    return days;
  }
  
  // FUNÇÃO PRINCIPAL: Gerencia o estado de todos os calendários
  generateCalendar(): void {
    // 1. Mês Principal
    this.calendarDays.set(this.generateMonthDays(this.displayMonth));

    // 2. Mês Anterior (PrevMonth)
    const prev = new Date(this.displayMonth.getFullYear(), this.displayMonth.getMonth() - 1, 1);
    this.prevMonthDate.set(prev);
    this.prevMonthDays.set(this.generateMonthDays(prev));

    // 3. Mês Posterior (NextMonth)
    const next = new Date(this.displayMonth.getFullYear(), this.displayMonth.getMonth() + 1, 1);
    this.nextMonthDate.set(next);
    this.nextMonthDays.set(this.generateMonthDays(next));
    
    // Zera a seleção ao trocar de mês
    this.selectedDay.set(null);
    this.selectedDayEvents.set([]);
  }

  // Navega para o mês anterior ou próximo (ATUALIZADA)
  changeMonth(direction: number): void {
    this.displayMonth.setMonth(this.displayMonth.getMonth() + direction);
    this.displayMonth = new Date(this.displayMonth); // Força a re-renderização
    this.generateCalendar();
  }

  // ----------------------------------------------------
  // MÉTODOS DE EVENTOS E VISUALIZAÇÃO
  // ----------------------------------------------------

  // Verifica se o dia é hoje
  isToday(day: Date): boolean {
    const today = new Date();
    return day.toDateString() === today.toDateString();
  }
  
  // Verifica se um dia está selecionado (usado na classe CSS)
  isSelectedDay(day: Date): boolean {
      return this.selectedDay() ? day.toDateString() === this.selectedDay()!.toDateString() : false;
  }

  // Retorna os eventos de um dia específico, aplicando o filtro de escopo
  getEventsForDay(day: Date): AgendaEvent[] {
    const dayEvents = mockEvents.filter(event => 
      event.data.toDateString() === day.toDateString()
    ).sort((a, b) => {
        // Ordena: gravações primeiro, depois prazos
        if (a.tipo === 'gravacao' && b.tipo === 'prazo') return -1;
        if (a.tipo === 'prazo' && b.tipo === 'gravacao') return 1;
        return 0;
    });

    if (this.scope === 'global' || !this.studioId) {
      // Se for visão global, retorna todos
      return dayEvents;
    } else {
      // Se for visão local, filtra pelo studioId
      return dayEvents.filter(event => event.studioId === this.studioId);
    }
  }

  // Verifica se há eventos para um dia (para desenhar os pontinhos no mini-calendário)
  hasEvents(day: Date): boolean {
    return this.getEventsForDay(day).length > 0;
  }
  
  // Retorna a cor do estúdio para o ponto
  getStudioColor(studioId: string): string {
    return studioColorMap[studioId] || '#9CA3AF'; // Cor padrão cinza
  }
}