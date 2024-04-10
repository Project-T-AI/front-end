import { Routes } from '@angular/router';

export const GERADOR_ROUTES: Routes = [{
    path: "",
    redirectTo: "introducao",
    pathMatch: "full"
},{
    path: "",
    loadComponent: () => import("./gerador-ia.component").then(c => c.GeradorIaComponent),
    children: [{
        path: "introducao",
        loadComponent: () => import("./introducao/introducao.component").then(c => c.IntroducaoComponent),
    },{
        path: "prompt",
        loadComponent: () => import("./prompt/prompt.component").then(c => c.PromptComponent),
    },{
        path: "previa",
        loadComponent: () => import("./previa/previa.component").then(c => c.PreviaComponent),
    },{
        path: "editor",
        loadComponent: () => import("./editor/editor.component").then(c => c.EditorComponent),
    }]
}];
