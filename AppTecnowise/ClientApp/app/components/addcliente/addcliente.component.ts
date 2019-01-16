import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { FetchClienteComponent } from '../fetchcliente/fetchcliente.component';
import { ClienteService } from '../../services/cliente.service';

@Component({
    selector: 'createcliente',
    templateUrl: './AddCliente.component.html'
})

export class AddClienteComponent implements OnInit {
    clienteForm: FormGroup;
    title: string = "Create";
    id: number;
    errorMessage: any;

    constructor(private _fb: FormBuilder, private _avRoute: ActivatedRoute,
        private _clienteService: ClienteService, private _router: Router) {
        if (this._avRoute.snapshot.params["id"]) {
            this.id = this._avRoute.snapshot.params["id"];
        }

        this.clienteForm = this._fb.group({
            id: 0,
            name: ['', [Validators.required]],
            gender: ['', [Validators.required]],
            department: ['', [Validators.required]],
            city: ['', [Validators.required]]
        })
    }

    ngOnInit() {
        if (this.id > 0) {
            this.title = "Edit";
            this._clienteService.get(this.id)
                .subscribe(resp => this.clienteForm.setValue(resp)
                , error => this.errorMessage = error);
        }
    }

    save() {

        if (!this.clienteForm.valid) {
            return;
        }

        if (this.title == "Create") {
            this._clienteService.add(this.clienteForm.value)
                .subscribe((data) => {
                    this._router.navigate(['/fetch-cliente']);
                }, error => this.errorMessage = error)
        }
        else if (this.title == "Edit") {
            this._clienteService.update(this.clienteForm.value)
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