import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestorGeral } from './gestor-geral';

describe('GestorGeral', () => {
  let component: GestorGeral;
  let fixture: ComponentFixture<GestorGeral>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestorGeral]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestorGeral);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
