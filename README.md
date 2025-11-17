# 🌊 SOPA | Sistema de Gestão de Mídia e Produção de Conteúdo Educacional

## 💡 1. Visão Geral do Projeto

O SOPA (s. o. p. a. ) é um sistema estratégico desenvolvido em **Angular** que serve como **Painel de Gestão Centralizada** para todas as solicitações e fluxos de produção de mídia educacional do estado.

## 🧑‍💻 2. Definição do Ambiente de Desenvolvimento

Este projeto foi construído usando o ecossistema moderno do JavaScript e TypeScript, com foco em componentes *standalone* e modularidade para alta performance.

### 2.1. Arquitetura de Software (Frontend)

| Tecnologia | Versão Mínima | Descrição |
| :--- | :--- | :--- |
| **Node.js** | v18.x ou superior | Ambiente de execução para JavaScript (obrigatório para o Angular CLI). |
| **Angular** | v16.x ou superior | Framework principal para a construção do Single Page Application (SPA). |
| **TypeScript** | v5.x ou superior | Linguagem tipada que garante a robustez e a escalabilidade da aplicação. |
| **Angular CLI** | v16.x ou superior | Ferramenta de linha de comando para gerar componentes, executar e construir o projeto. |
| **Angular CDK** | (Versão correspondente) | **Component Development Kit.** Essencial para a funcionalidade de **Drag & Drop** do Kanban e da Atribuição de Operacionais. |
| **FormsModule** | (Módulo Angular) | Módulo que habilita o **Two-Way Data Binding** (`[(ngModel)]`) para a criação de Cards no Modal e o formulário Wizard. |

### 2.2. Perfis de Acesso e Funções (UX)

A aplicação foi desenhada com três perfis principais, cada um com um fluxo de trabalho otimizado:

* **Solicitante (Usuário Comum):** Acesso via rotas públicas (`/solicitar` e `/token`). Utiliza o **Wizard** para criação de pedidos e a tela de **Status** para acompanhamento do progresso (usando token).
* **Gestor Local (Manager):** Acesso via login (`/gestor`). Utiliza o **Dashboard** (KPIs de produção), o **Quadro Kanban** (para gerenciar o fluxo de 20+ colunas e atribuir operacionais via Drag & Drop de Badge), e a Agenda.
* **Gestor Geral (Director):** Acesso via login (`/gestor-geral`). Possui uma visão macro de **Business Intelligence (BI)** e a agenda consolidada de todos os estúdios (em desenvolvimento).
* **Operacional (Editor/Técnico):** Acesso via login (`/operacional`). Possui o **Painel de Tarefas** que filtra apenas os Cards que lhe foram atribuídos pelo Gestor Local.

***

## 🚀 3. Como Iniciar o Ambiente

### Pré-requisitos

Certifique-se de ter o **Node.js** e o **Angular CLI** instalados globalmente:

```bash
# Instalar a última versão estável do Angular CLI
npm install -g @angular/cli
