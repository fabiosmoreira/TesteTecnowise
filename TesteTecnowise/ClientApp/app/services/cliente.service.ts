import { Injectable, Inject } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class ClienteService {

    private headers: Headers;
    public accessPointUrl: string = 'http://localhost:62024/api/clientes/';

    constructor(private http: Http) {
        this.headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
    }
     
    public getClientes() {
        return this.http.get(this.accessPointUrl)
            .map((response: Response) => response.json())
            .catch(this.errorHandler);
    }

    public getClienteById(id: number) {
        return this.http.get(this.accessPointUrl + id)
            .map((response: Response) => response.json())
            .catch(this.errorHandler)
    }

    public saveCliente(cliente) {
        return this.http.post(this.accessPointUrl, cliente)
            .map((response: Response) => response.json())
            .catch(this.errorHandler)
    }

    public updateCliente(cliente) {
        return this.http.put(this.accessPointUrl + cliente.id, cliente)
            .map((response: Response) => response.json())
            .catch(this.errorHandler);
    }

    public deleteCliente(id) {
        return this.http.delete(this.accessPointUrl + id)
            .map((response: Response) => response.json())
            .catch(this.errorHandler);
    }

    errorHandler(error: Response) {
        console.log(error);
        return Observable.throw(error);
    }
}