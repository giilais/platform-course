import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css'],
})
export class PerfilUsuarioComponent {
  usuario: any;
  numeroDeCursos: number = 0;
  isAdmin: boolean = false;

  constructor(private authService: AuthService) {
    this.numeroDeCursos = 0;
  }

  ngOnInit() {
    console.log('Usuario:', this.usuario);
    console.log('Numero de Cursos:', this.numeroDeCursos);

    const isAdmin = localStorage.getItem('isAdmin') === 'true';

    if (isAdmin) {
      this.isAdmin = true;
    }

    this.usuario = this.authService.getUsuario();

    if (this.usuario && this.usuario.id) {
      // Verifica se o usuário e o ID não são nulos
      this.authService.getNumeroDeCursos(this.usuario.id).subscribe(
        (numero) => {
          this.numeroDeCursos = numero;
        },
        (error) => {
          console.error('Erro ao obter o número de cursos', error);
        }
      );
    }
  }
}
