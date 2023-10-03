import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
})
export class CadastroComponent {
  nome: string;
  email: string;
  senha: string;

  constructor(private authService: AuthService) {
    this.nome = '';
    this.email = '';
    this.senha = '';
  }

  cadastrar() {
    this.authService
      .cadastrarUsuario(this.nome, this.email, this.senha)
      .subscribe(
        (response) => {
          alert('Usuário cadastrado com sucesso.');
          console.log('Usuário cadastrado com sucesso. Token:', response.token);
        },
        (error) => {
          alert('Erro ao cadastrar usuário');
          console.error('Erro ao cadastrar usuário:', error);
        }
      );
  }
}
