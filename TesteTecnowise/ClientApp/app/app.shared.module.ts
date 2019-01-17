import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { AddClienteComponent } from './components/addcliente/addcliente.component';
import { FetchClienteComponent } from './components/fetchcliente/fetchcliente.component';
import { ClienteService } from './services/cliente.service';

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,        
        AddClienteComponent,
        FetchClienteComponent,
        HomeComponent
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'fetch-cliente', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },            
            { path: 'add-cliente', component: AddClienteComponent },            
            { path: 'cliente/edit/:id', component: AddClienteComponent },
            { path: 'fetch-cliente', component: FetchClienteComponent },                        
            { path: '**', redirectTo: 'home' }            
        ])
    ],
    providers: [ClienteService]
})
export class AppModuleShared {
}
