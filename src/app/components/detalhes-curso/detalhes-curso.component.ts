import { Component } from '@angular/core';
import { CursoService } from 'src/app/services/curso.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-detalhes-curso',
  templateUrl: './detalhes-curso.component.html',
  styleUrls: ['./detalhes-curso.component.css'],
})
export class DetalhesCursoComponent {
  curso: any;

  constructor(
    private cursoService: CursoService,
    private authService: AuthService,
    private router: Router
  ) {
    this.curso = [];
  }

  ngOnInit() {
    // Supondo que você tenha uma rota que fornece o ID do curso
    const cursoId = 1; /* Obtenha o ID do curso da rota ou de algum lugar */
    this.curso = this.cursoService.getDetalhesCurso(cursoId);
  }

  inscrever() {
    // Verifique se o usuário está autenticado antes de permitir a inscrição
    if (this.authService.isUsuarioAutenticado()) {
      const cursoId = this.curso.id; // Supondo que o curso tenha uma propriedade 'id'

      // Chame o serviço para inscrever o usuário no curso
      this.cursoService.inscreverUsuarioNoCurso(cursoId).subscribe(
        (resultado: any) => {
          console.log('Usuário inscrito com sucesso!', resultado);
        },
        (erro: any) => {
          console.error('Erro ao inscrever usuário no curso:', erro);
        }
      );
    } else {
      // Se o usuário não estiver autenticado, redirecione para a página de login
      console.error(
        'Usuário não está autenticado. Redirecionando para a página de login...'
      );
      this.router.navigate(['/login']);
    }
  }
}
