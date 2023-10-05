import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { HomeComponent } from './components/home/home.component';
import { DetalhesCursoComponent } from './components/detalhes-curso/detalhes-curso.component';
import { PerfilUsuarioComponent } from './components/perfil-usuario/perfil-usuario.component';
import { AdminComponent } from './components/admin/admin.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CursoService } from './services/curso.service';
import { HeaderComponent } from './components/header/header.component';
import { IgxCardModule } from 'igniteui-angular';
import { AdicionarCursoComponent } from './components/adicionar-curso/adicionar-curso.component';
import { EditarCursoComponent } from './components/editar-curso/editar-curso.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CadastroComponent,
    HomeComponent,
    DetalhesCursoComponent,
    PerfilUsuarioComponent,
    AdminComponent,
    HeaderComponent,
    AdicionarCursoComponent,
    EditarCursoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    IgxCardModule,
  ],
  providers: [CursoService],
  bootstrap: [AppComponent],
})
export class AppModule {}
