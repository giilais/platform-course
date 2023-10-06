import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CursoService {
  private apiUrl = 'http://localhost:3001/cursos';

  constructor(private http: HttpClient) {}

  adicionarCurso(cursoData: any) {
    return this.http.post(`${this.apiUrl}/adicionar`, cursoData, {
      responseType: 'text',
    });
  }

  editarCurso(cursoData: any) {
    return this.http.put(`${this.apiUrl}/editar/${cursoData.id}`, cursoData);
  }

  excluirCurso(cursoId: number) {
    return this.http.delete(`${this.apiUrl}/excluir/${cursoId}`).pipe(
      catchError((error) => {
        console.error('Erro ao excluir curso:', error);
        return throwError('Ocorreu um erro ao excluir o curso. Por favor, tente novamente.');
      })
    );
  }

  inscreverUsuarioNoCurso(cursoId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/inscrever`, { cursoId });
  }

  getCursos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getDetalhesCurso(cursoId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${cursoId}`);
  }
}
