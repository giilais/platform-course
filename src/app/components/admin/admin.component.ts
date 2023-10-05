import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CursoService } from 'src/app/services/curso.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent {
  cursos: any[];

  constructor(private cursoService: CursoService) {
    this.cursos = [];
  }

  ngOnInit() {
    this.cursoService.getCursos().subscribe((data: any[]) => {
      this.cursos = data;
    });
  }

  excluirCurso(cursoId: number) {
    this.cursoService.excluirCurso(cursoId).subscribe(
      (response) => {
        console.log('Curso excluído com sucesso!', response);
        this.cursos = this.cursos.filter((curso) => curso.id !== cursoId); // Atualiza a lista de cursos após a exclusão
      },
      (error) => {
        console.error('Erro ao excluir curso:', error);
      }
    );
  }
}
