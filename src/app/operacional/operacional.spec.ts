import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Operacional } from './operacional';

describe('Operacional', () => {
  let component: Operacional;
  let fixture: ComponentFixture<Operacional>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Operacional]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Operacional);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
