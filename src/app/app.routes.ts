import { Routes } from '@angular/router';

export const routes: Routes = [
    { title: 'Sentiment Tube' , path: '', redirectTo: 'home', pathMatch: 'full' },
    { title: 'Sentiment Tube' , path: 'home', loadComponent: () => import('./pages/home/home.component') },
    { title: '404 Página no encontrada' , path: '404', loadComponent: () => import('./pages/notFound/notFound.component') },
    { title: '404 Página no encontrada', path: '**', redirectTo: '404' },
];
