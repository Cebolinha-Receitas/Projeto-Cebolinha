import { Routes } from '@angular/router';
import { ArtigoBlog } from './artigo-blog/artigo-blog';
import { Cadastro } from './cadastro/cadastro';
import { DetalheReceita } from './detalhe-receita/detalhe-receita';
import { EsqueciASenha } from './esqueci-a-senha/esqueci-a-senha';
import { Favoritos } from './favoritos/favoritos';
import { Feed } from './feed/feed';
import { Login } from './login/login';
import { Perfil } from './perfil/perfil';

export const routes: Routes = [
    {path: "artigo", component: ArtigoBlog},
    {path: "cadastro", component: Cadastro},
    {path: "detalhe-receita", component: DetalheReceita},
    {path: "esqueci-a-senha", component: EsqueciASenha},
    {path: "favoritos", component: Favoritos},
    {path: "feed", component: Feed},
    {path: "login", component: Login},
    {path: "perfil", component: Perfil},
];
