import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { CursoService } from 'src/app/services/curso.service';

@Component({
  selector: 'app-detalhes-curso',
  templateUrl: './detalhes-curso.component.html',
  styleUrls: ['./detalhes-curso.component.css'],
})
export class DetalhesCursoComponent {
  curso: any;
  cursos: any[];

  constructor(private cursoService: CursoService, private http: HttpClient) {
    this.curso = [];
    this.cursos = [];
  }

  ngOnInit() {
    this.cursoService.getCursos().subscribe((data: any[]) => {
      this.cursos = data;
    });
    
    const cursoId = 1;
    this.curso = this.cursoService.getDetalhesCurso(cursoId);
  }

  cadastrarUsuario(cursoId: number) {
    //const usuarioId = this.getIdDoUsuario(); // Substitua pelo ID do usuário que deseja cadastrar
    const usuarioId = 5;

    this.http
      .post('http://localhost:3001/registerInCourse', {
        usuario_id: usuarioId,
        curso_id: cursoId,
      })
      .subscribe(
        (response) => {
          console.log('Usuário cadastrado no curso com sucesso', response);
        },
        (error) => {
          console.error('Erro ao cadastrar usuário no curso', error);
        }
      );
  }
}
