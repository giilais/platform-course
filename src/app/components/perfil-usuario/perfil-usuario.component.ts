import { Component } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css'],
})
export class PerfilUsuarioComponent {
  usuario: any;

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit() {
    // Supondo que você tenha um serviço para obter o perfil do usuário
    this.usuario = this.usuarioService.getPerfilUsuario();
  }
}
