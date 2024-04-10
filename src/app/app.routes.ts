import { HomeComponent } from './home/home.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
    {path: "", component: HomeComponent},
    {path: "home", component: HomeComponent},
    {path: "gerador", loadChildren: () => import("./gerador-ia/gerador-ia.routes").then(r => r.GERADOR_ROUTES)},
    {path: "carrinho", loadComponent: () => import("./carrinho/carrinho.component").then(c => c.CarrinhoComponent)},
    {path: "conta", loadComponent: () => import("./conta/conta.component").then(c => c.ContaComponent)}
];
