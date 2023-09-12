import { Component } from '@angular/core';
import { CursoService } from 'src/app/services/curso.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent {
  cursos: any[];
  novoCurso: any[];

  constructor(private cursoService: CursoService) {
    this.cursos = [];
    this.novoCurso = [];
  }

  ngOnInit() {
    this.cursos = this.cursoService.getCursos();
  }

  adicionarCurso(novoCurso: any) {
    this.cursoService.adicionarCurso(novoCurso).subscribe(
      (resultado: any) => {
        // O curso foi adicionado com sucesso
        this.cursos.push(novoCurso);
        console.log('Curso adicionado com sucesso!', resultado);
      },
      (erro: any) => {
        // Ocorreu um erro ao adicionar o curso
        console.error('Erro ao adicionar curso:', erro);
      }
    );
  }

  removerCurso(cursoId: number) {
    this.cursoService.removerCurso(cursoId).subscribe(
      (resultado: any) => {
        // O curso foi removido com sucesso
        this.cursos = this.cursos.filter((curso) => curso.id !== cursoId);
        console.log('Curso removido com sucesso!', resultado);
      },
      (erro: any) => {
        // Ocorreu um erro ao remover o curso
        console.error('Erro ao remover curso:', erro);
      }
    );
  }

  editarCurso(cursoId: number) {
    const cursoEditado = {
      id: cursoId, // Passa o ID do curso
      titulo: 'Novo Título do Curso',
      imagem: 'Nova URL da Imagem',
      descricao: 'Nova Descrição do Curso',
      descricaoCompleta: 'Nova Descrição Completa do Curso',
      topicos: 'Novos Tópicos do Curso',
    };

    this.cursoService.editarCurso(cursoEditado).subscribe(
      (resultado: any) => {
        // O curso foi editado com sucesso
        const index = this.cursos.findIndex(
          (curso) => curso.id === cursoEditado.id
        );
        if (index !== -1) {
          this.cursos[index] = cursoEditado;
        }
        console.log('Curso editado com sucesso!', resultado);
      },
      (erro: any) => {
        // Ocorreu um erro ao editar o curso
        console.error('Erro ao editar curso:', erro);
      }
    );
  }
}
