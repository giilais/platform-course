import { Component } from '@angular/core';
import { CursoService } from '../../services/curso.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  cursos: any[];

  constructor(
    private cursoService: CursoService,
    private http: HttpClient,
    private authService: AuthService
  ) {
    this.cursos = [];
  }

  ngOnInit() {
    this.cursoService.getCursos().subscribe((data: any[]) => {
      this.cursos = data;
    });
  }

  getIdDoUsuario() {
    return this.authService.getUserIdFromToken();
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
