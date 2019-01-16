import { Component, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { ClienteService } from '../../services/cliente.service'

@Component({
    selector: 'fetchcliente',
    templateUrl: './fetchcliente.component.html',     
    providers: [ClienteService]
})

export class FetchClienteComponent {
    public cliList: ClienteData[];

    constructor(public http: Http, private _router: Router, private _clienteService: ClienteService) {
        this.getClientes();
    }

    getClientes() {
        this._clienteService.getClientes().subscribe(
            data => this.cliList = data
        )
    }

    delete(clienteID) {
        var ans = confirm("Do you want to delete customer with Id: " + clienteID);
        if (ans) {
            this._clienteService.deleteCliente(clienteID).subscribe((data) => {
                this.getClientes();
            }, error => console.error(error))
        }
    }
}

interface ClienteData {
    id: number;
    nome: string;
    endereco: string;
    telefone: string;
    email: string;
}