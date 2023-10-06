import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap, throwError } from 'rxjs';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3001';

  constructor(private http: HttpClient, private router: Router) {}

  private isAuthenticated: boolean = false;
  

  getToken() {
    return localStorage.getItem('token');
  }

  getUsuario() {
    const usuarioString = localStorage.getItem('usuario');
    return usuarioString ? JSON.parse(usuarioString) : null;
  }

  getNumeroDeCursos(usuarioId: number): Observable<number> {
    const usuario = this.getUsuario();
  
    if (usuario && usuario.id) {
      return this.http.get<number>(`${this.apiUrl}/cursos/count/${usuario.id}`);
    } else {
      // Tratar o caso em que o usuário ou o id são nulos
      return throwError('Usuário ou ID nulos');
    }
  }

  cadastrarUsuario(
    nome: string,
    email: string,
    senha: string
  ): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/register`, { nome, email, senha })
      .pipe(
        tap((response) => {
          console.log('Usuário cadastrado com sucesso. Token:', response.token);
          this.router.navigate(['/login']);
        })
      );
  }

  login(email: string, senha: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, senha }).pipe(
      tap((response) => {
        console.log('Usuário logado com sucesso. Token:', response.token);
        this.router.navigate(['/']);
        this.isAuthenticated = true;
        
        // Salvando o ID do usuário localmente
        const userId = response.id; // Substitua 'id' pelo nome correto do campo no seu backend
        localStorage.setItem('userId', userId.toString()); // Armazena no localStorage
        
        // Verificando se o usuário é admin
        if (userId === 5) {
          localStorage.setItem('isAdmin', 'true');
        } else {
          localStorage.setItem('isAdmin', 'false');
        }
      })
    );
  }

  getUsuarioDoToken() {
    const token = this.getToken();
    if (token) {
      return jwt_decode(token);
    }
    return null;
  }
  
  salvarUsuarioLocalmente(usuario: any) {
    localStorage.setItem('usuario', JSON.stringify(usuario));
  }

  getUserIdFromToken() {
    const token = this.getToken();
    if (token) {
      const decodedToken: any = jwt_decode(token);
      return decodedToken.userId;
    }
    return null;
  }
}
