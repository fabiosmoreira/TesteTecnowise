import { Component, OnInit, Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { FetchClienteComponent } from '../fetchcliente/fetchcliente.component';
import { ClienteService } from '../../services/cliente.service';

@Component({
    selector: 'addcliente',
    templateUrl: './addcliente.component.html',
    providers: [ClienteService]    
})

export class AddClienteComponent implements OnInit {
    clienteForm: FormGroup;
    title: string = "Novo Cliente";
    id: number;
    errorMessage: any;

    constructor(private _fb: FormBuilder, private _avRoute: ActivatedRoute,
        private _clienteService: ClienteService, private _router: Router) {
        if (this._avRoute.snapshot.params["id"]) {
            this.id = this._avRoute.snapshot.params["id"];
        }

        this.clienteForm = this._fb.group({
            id: 0,
            nome: ['', [Validators.required]],
            endereco: ['', [Validators.required]],
            telefone: ['', [Validators.required]],
            email: ['', [Validators.required]]  
        })
    }

    ngOnInit() {
        if (this.id > 0) {
            this.title = "Editar";
            this._clienteService.getClienteById(this.id)
                .subscribe(resp => this.clienteForm.setValue(resp)
                , error => this.errorMessage = error);
        }
    }

    save() {

        if (!this.clienteForm.valid) {
            return;
        }

        if (this.title == "Novo Cliente") {
            this._clienteService.saveCliente(this.clienteForm.value)
                .subscribe((data) => {
                    this._router.navigate(['/fetch-cliente']);
                }, error => this.errorMessage = error)
        }
        else if (this.title == "Editar") {
            this._clienteService.updateCliente(this.clienteForm.value)
                .subscribe((data) => {
                    this._router.navigate(['/fetch-cliente']);
                }, error => this.errorMessage = error) 
        }
    }

    cancel() {
        this._router.navigate(['/fetch-cliente']);
    }

    get nome() { return this.clienteForm.get('nome'); }
    get endereco() { return this.clienteForm.get('telefone'); }
    get telefone() { return this.clienteForm.get('endereco'); }
    get email() { return this.clienteForm.get('email'); }
}