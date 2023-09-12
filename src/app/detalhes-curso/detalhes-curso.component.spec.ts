import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesCursoComponent } from './detalhes-curso.component';

describe('DetalhesCursoComponent', () => {
  let component: DetalhesCursoComponent;
  let fixture: ComponentFixture<DetalhesCursoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetalhesCursoComponent]
    });
    fixture = TestBed.createComponent(DetalhesCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
