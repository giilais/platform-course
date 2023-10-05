import { CursoService } from './../../services/curso.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-adicionar-curso',
  templateUrl: './adicionar-curso.component.html',
  styleUrls: ['./adicionar-curso.component.css'],
})
export class AdicionarCursoComponent {
  curso = {
    titulo: '',
    descricao: '',
    descricaoCompleta: '',
    topicos: '',
    imagem: '',
  };

  constructor(private cursoService: CursoService) {}

  adicionarCurso() {
    this.cursoService.adicionarCurso(this.curso).subscribe(
      (response) => {
        console.log('Curso adicionado com sucesso!', response);
        this.curso = {
          titulo: '',
          descricao: '',
          descricaoCompleta: '',
          topicos: '',
          imagem: '',
        };
      },
      (error) => {
        console.error('Erro ao adicionar curso:', error);
      }
    );
  }
}
