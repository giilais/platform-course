import { Component } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent {
  username: string;
  password: string;

  constructor(private usuarioService: UsuarioService) { 
    this.username = '';
    this.password = '';
  }

  cadastrar() {
    this.usuarioService.cadastrar(this.username, this.password);
  }
}
