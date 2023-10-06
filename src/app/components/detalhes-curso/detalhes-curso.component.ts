import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CursoService } from 'src/app/services/curso.service';

@Component({
  selector: 'app-detalhes-curso',
  templateUrl: './detalhes-curso.component.html',
  styleUrls: ['./detalhes-curso.component.css'],
})
export class DetalhesCursoComponent {
  curso: any;
  isAdmin: boolean = false;

  constructor(
    private cursoService: CursoService,
    private http: HttpClient,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const cursoId = +params['id'];
      this.cursoService.getDetalhesCurso(cursoId).subscribe(
        (curso) => {
          this.curso = curso;
        },
        (error) => {
          console.error('Erro ao obter detalhes do curso', error);
        }
      );
    });

    // Verificar se o usuário é admin
    const isAdmin = localStorage.getItem('isAdmin') === 'true';

    if (isAdmin) {
      this.isAdmin = true;
    }
  }

  cadastrarUsuario(cursoId: number) {
    const usuarioId = 5;
    //const usuarioId = this.getIdDoUsuario(); // Substitua pelo ID do usuário que deseja cadastrar
    this.http
      .post('http://localhost:3001/registerInCourse', {
        usuario_id: usuarioId,
        curso_id: cursoId,
      })
      .subscribe(
        (response) => {
          console.log('Usuário cadastrado no curso com sucesso', response);

          // Exibe uma mensagem de sucesso
          alert('Usuário cadastrado no curso com sucesso');
        },
        (error) => {
          console.error('Erro ao cadastrar usuário no curso', error);
        }
      );
  }
}
