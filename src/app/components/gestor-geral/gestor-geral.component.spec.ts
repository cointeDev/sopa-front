import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestorGeralComponent } from './gestor-geral.component';

describe('GestorGeral', () => {
  let component: GestorGeralComponent;
  let fixture: ComponentFixture<GestorGeralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestorGeralComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestorGeralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
