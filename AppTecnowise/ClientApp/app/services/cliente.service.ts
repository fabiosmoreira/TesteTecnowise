import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class ClienteService {
    private headers: HttpHeaders;
    private accessPointUrl: string = 'http://localhost:62024/api/clientes';

    constructor(private http: HttpClient) {
        this.headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    }

    public get(id) {        
        return this.http.get(this.accessPointUrl, { headers: this.headers });
    }

    public add(cli) {
        return this.http.post(this.accessPointUrl, cli, { headers: this.headers });
    }

    public remove(cli) {
        return this.http.delete(this.accessPointUrl + '/' + cli.id, { headers: this.headers });
    }

    public update(cli) {
        return this.http.put(this.accessPointUrl + '/' + cli.id, cli, { headers: this.headers });
    }
}