import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-status',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './status.component.html',
  styleUrl: './status.component.css'
})
export class StatusComponent implements OnInit {

  isTracking: boolean = false;
  isRejected: boolean = false;
  isReturnedForCorrection: boolean = false;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    const token = this.route.snapshot.paramMap.get('token');

    if (token === '11111') {
      this.isTracking = true;
    } else if (token === '22222') {
      this.isReturnedForCorrection = true;
    } else if (token === '33333') {
      this.isRejected = true;
    } else {
      this.isTracking = true; 
    }
  }

  enviarCorrecao() {
    alert("Correção enviada com sucesso! Aguarde a nova análise.");
  }
}