import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdicionarCursoComponent } from './adicionar-curso.component';

describe('AdicionarCursoComponent', () => {
  let component: AdicionarCursoComponent;
  let fixture: ComponentFixture<AdicionarCursoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdicionarCursoComponent]
    });
    fixture = TestBed.createComponent(AdicionarCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
