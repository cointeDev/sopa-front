import { Routes } from '@angular/router';

// 1. Importe todos os componentes
import { Home } from './home/home';
import { WizardComponent } from './wizard/wizard';
import { LoginComponent } from './login/login'; 
import { TokenComponent } from './token/token'; 
import { StatusComponent } from './status/status';
import { GestorComponent } from './gestor/gestor';
import { OperacionalComponent } from './operacional/operacional';
// 2. Defina as regras de navegação
export const routes: Routes = [
    {
        path: '', // URL: /
        component: Home 
    },
    {
        path: 'solicitar', // URL: /solicitar
        component: WizardComponent
    },
    {
        path: 'login', // URL: /login
        component: LoginComponent
    },
    {
        path: 'token', // URL: /token
        component: TokenComponent 
    },
    {
        path: 'status/:token', // URL: /token
        component: StatusComponent 
    },
    {
        path: 'gestor', // URL: /gestor
        component: GestorComponent
    },
    {
        path: 'operacional', // URL: /operacional
        component: OperacionalComponent // <-- 2. ADICIONE A ROTA AQUI
    }
];