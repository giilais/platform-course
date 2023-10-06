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
    this.cursoService.excluirCurso(cursoId).subscribe((response) => {
      console.log('Curso excluído com sucesso!', response);
      alert('Curso excluído com sucesso!'); // Exibe um alerta de sucesso
      window.location.reload(); // Recarrega a página para atualizar a lista de cursos
    });
    alert('Curso excluído com sucesso!');
    window.location.reload();
  }

  confirmarExclusao(cursoId: number) {
    const confirmacao = confirm('Tem certeza que deseja excluir este curso?');
    if (confirmacao) {
      this.excluirCurso(cursoId);
    }
  }
}
