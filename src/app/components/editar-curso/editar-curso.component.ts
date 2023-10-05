import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CursoService } from 'src/app/services/curso.service';

@Component({
  selector: 'app-editar-curso',
  templateUrl: './editar-curso.component.html',
  styleUrls: ['./editar-curso.component.css'],
})
export class EditarCursoComponent {
  curso = {
    id: null,
    titulo: '',
    descricao: '',
    descricaoCompleta: '',
    topicos: '',
    imagem: '',
  };

  constructor(
    private route: ActivatedRoute,
    private cursoService: CursoService
  ) {
    this.route.params.subscribe((params) => {
      this.curso.id = params['id'];
    });
  }

  editarCurso() {
    this.cursoService.editarCurso(this.curso).subscribe(
      (response) => {
        console.log('Curso editado com sucesso!', response);
      },
      (error) => {
        console.error('Erro ao editar curso:', error);
      }
    );
  }
}
