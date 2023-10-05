import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { HomeComponent } from './components/home/home.component';
import { DetalhesCursoComponent } from './components/detalhes-curso/detalhes-curso.component';
import { PerfilUsuarioComponent } from './components/perfil-usuario/perfil-usuario.component';
import { AdminComponent } from './components/admin/admin.component';
import { AdicionarCursoComponent } from './components/adicionar-curso/adicionar-curso.component';
import { EditarCursoComponent } from './components/editar-curso/editar-curso.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'home', component: HomeComponent },
  { path: 'curso/:id', component: DetalhesCursoComponent },
  { path: 'admin/adicionarCurso', component: AdicionarCursoComponent },
  { path: 'admin/editarCurso', component: EditarCursoComponent },
  { path: 'admin', component: AdminComponent },
  {
    path: 'perfil',
    component: PerfilUsuarioComponent,
  },

  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' }, // Rota padrão para redirecionar para a página inicial
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
