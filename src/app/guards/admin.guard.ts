import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private usuarioService: UsuarioService,
    private router: Router
  ) {}

  canActivate(): boolean {
    if (
      this.authService.isLoggedIn() &&
      this.usuarioService.getPerfilUsuario().isAdmin
    ) {
      return true;
    } else {
      this.router.navigate(['/home']); // Redirecionar para a página inicial em caso de não autorização
      return false;
    }
  }
}
