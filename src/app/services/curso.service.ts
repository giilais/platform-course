import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CursoService {
  private apiUrl = 'http://localhost:3001/cursos';

  constructor(private http: HttpClient) {}

  private cursos: any[] = [
    {
      id: 1,
      titulo: 'Curso de Angular',
      imagem: 'url_da_imagem_angular',
      descricao: 'Aprenda Angular de forma fácil e rápida.',
    },
  ];

  adicionarCurso(cursoData: any) {
    return this.http.post(`${this.apiUrl}/adicionar`, cursoData, {
      responseType: 'text',
    });
  }

  editarCurso(cursoData: any) {
    return this.http.put(`${this.apiUrl}/editar/${cursoData.id}`, cursoData);
  }

  excluirCurso(cursoId: number) {
    return this.http.delete(`${this.apiUrl}/excluir/${cursoId}`);
  }

  inscreverUsuarioNoCurso(cursoId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/inscrever`, { cursoId });
  }

  getCursos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getDetalhesCurso(cursoId: number): any {
    return this.cursos.find((curso) => curso.id === cursoId);
  }
}
