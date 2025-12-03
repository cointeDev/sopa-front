import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router'; 

@Component({
  selector: 'app-token',
  standalone: true,
  imports: [CommonModule, RouterLink], 
  templateUrl: './token.component.html', 
  styleUrl: './token.component.css' 
})
export class TokenComponent { 

  constructor(private router: Router) { }

  consultarToken(token : string) {
    this.router.navigate(['/status',token]);
  }
}