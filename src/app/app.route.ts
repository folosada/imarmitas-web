import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SenhaComponent } from './senha/senha.component';
import { CadastroRestauranteComponent } from './cadastro-restaurante/cadastro-restaurante.component';
import { InicioComponent } from './inicio/inicio.component';
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
        component: InicioComponent
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