import { Component } from '@angular/core';
import { CursoService } from '../../services/curso.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  
  cursos: any[];

  constructor(private cursoService: CursoService) {
    this.cursos = [];
  }

  ngOnInit() {
    this.cursoService.getCursos().subscribe((data: any[]) => {
      this.cursos = data;
    });
  }
}
