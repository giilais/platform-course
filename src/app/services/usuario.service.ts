import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor() { }

  private usuarios: any[] = [
    {
      id: 1,
      nome: 'Nome do Usuário',
      email: 'usuario@email.com',
      isAdmin: false
    },

  ];

  getPerfilUsuario(): any {
  
    const usuarioAutenticadoId = 1; //ID do usuário autenticado

    return this.usuarios.find(usuario => usuario.id === usuarioAutenticadoId);
  }

  cadastrar(username: string, password: string): void {
    const novoUsuario = {
      id: this.usuarios.length + 1,
      nome: username,
      email: username + '@email.com',
      isAdmin: false
    };

    this.usuarios.push(novoUsuario);
  }
}
