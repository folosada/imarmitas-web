import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SenhaComponent } from './senha/senha.component';
import { CadastroRestauranteComponent } from './cadastro-restaurante/cadastro-restaurante.component';
import { InicioComponent } from './inicio/inicio.component';
import { CardapioComponent } from './cardapio/cardapio.component';
import { AuthGuard } from '../common/auth.guard';

export const AppRoutes: Routes = [
    {
        path: 'senha',
        component: SenhaComponent
    },
    {
        path: 'cadastro',
        component: CadastroRestauranteComponent
    },
    {
        path: 'inicio',
        component: InicioComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'cardapio',
        component: CardapioComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '**',
        component: LoginComponent
    },
    {
        path: '',
        component: LoginComponent
    }    
]