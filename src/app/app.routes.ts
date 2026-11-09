import { Routes } from '@angular/router';
import { ArtigoBlog } from './artigo-blog/artigo-blog';
import { Cadastro } from './cadastro/cadastro';
import { DetalheReceita } from './detalhe-receita/detalhe-receita';
import { EsqueciASenha } from './esqueci-a-senha/esqueci-a-senha';
import { Favoritos } from './favoritos/favoritos';
import { Feed } from './feed/feed';
import { Login } from './login/login';
import { Perfil } from './perfil/perfil';
import { CadastroReceitas } from './cadastro-receitas/cadastro-receitas';
import { EditarDadosConta } from './editar-dados-conta/editar-dados-conta';
import { authGuard } from './services/auth-guard'; 
import { guestGuard } from './services/guest-guard';

export const routes: Routes = [
    // ==========================================
    // ROTAS PÚBLICAS (Acesso bloqueado para quem JÁ ESTÁ logado)
    // ==========================================
    {path: "login", component: Login, canActivate: [guestGuard]},
    {path: "cadastro", component: Cadastro, canActivate: [guestGuard]},
    {path: "esqueci-a-senha", component: EsqueciASenha, canActivate: [guestGuard]},

    // ==========================================
    // ROTAS PRIVADAS (Acesso bloqueado para quem NÃO TEM token)
    // ==========================================
    {path: "", component: Feed, canActivate: [authGuard]},
    {path: "feed", component: Feed, canActivate: [authGuard]},
    {path: "perfil", component: Perfil, canActivate: [authGuard]},
    {path: "favoritos", component: Favoritos, canActivate: [authGuard]},
    {path: "cadastro-receitas", component: CadastroReceitas, canActivate: [authGuard]},
    {path: "editar-dados-conta", component: EditarDadosConta, canActivate: [authGuard]},
    
    // ==========================================
    // ROTAS LIVRES (Leitura pública)
    // ==========================================
    {path: "feed", component: Feed},
    {path: "artigo/:codigo", component: ArtigoBlog},
    {path: "detalhe-receita/:codigo", component: DetalheReceita}
];