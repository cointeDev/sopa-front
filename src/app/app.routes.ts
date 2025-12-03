import { Routes } from '@angular/router';

import { Home } from './components/home/home.component';
import { WizardComponent } from './components/wizard/wizard.component';
import { LoginComponent } from './components/login/login.component';
import { TokenComponent } from './components/token/token.component';
import { StatusComponent } from './components/status/status.component';
import { GestorComponent } from './components/gestor/gestor.component';
import { OperacionalComponent } from './components/operacional/operacional.component';
import { GestorGeralComponent } from './components/gestor-geral/gestor-geral.component';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'z',
    component: WizardComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'token',
    component: TokenComponent,
  },
  {
    path: 'status/:token',
    component: StatusComponent,
  },
  {
    path: 'gestor',
    component: GestorComponent,
  },
  {
    path: 'operacional',
    component: OperacionalComponent,
  },
  {
    path: 'gestor-geral',
    component: GestorGeralComponent,
  },
];
