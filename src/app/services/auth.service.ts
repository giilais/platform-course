import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  private isAuthenticated: boolean = false;

  login(username: string, password: string): boolean {
    if (username === 'admin' && password === '123456') {
      this.isAuthenticated = true;
    } else {
      this.isAuthenticated = false;
    }

    return this.isAuthenticated;
  }

  logout() {
    this.isAuthenticated = false;
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  // Verifica se o usuário está autenticado
  isUsuarioAutenticado() {
    return this.isAuthenticated;
  }

  isAdmin(): boolean {
    // Retorna true se o usuário for um administrador, false caso contrário
    return false;
  }
}
