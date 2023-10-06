import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string;
  senha: string;

  constructor(private authService: AuthService) {
    this.email = '';
    this.senha = '';
  }

  login() {
    this.authService.login(this.email, this.senha).subscribe(
      (response) => {
        // Obtem o usuário a partir do token
        const usuario = this.authService.getUsuarioDoToken();
  
        // Salva o usuário localmente
        this.authService.salvarUsuarioLocalmente(usuario);
  
        alert('Entrando no sistema...');
      },
      (error) => {
        console.error('Erro ao fazer login:', error);
      }
    );
  }
}
