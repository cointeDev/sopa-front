import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private router: Router) { }

  fazerLogin(email: string) {
    if (email === 'gestor@sopa.com') {
      this.router.navigate(['/gestor']);

    } else if (email === 'geral@sopa.com') {
      this.router.navigate(['/gestor-geral']);

    } else if (email === 'op@sopa.com') {
      this.router.navigate(['/operacional']);


    } else {
      alert('E-mail não reconhecido.');
    }
  }
}