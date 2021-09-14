import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Prospecto } from '../interfaces/prospecto';

@Injectable({
  providedIn: 'root'
})
export class ProspectoService {

  private api = 'http://localhost:3005';

  constructor(private http: HttpClient) {}

  async getProspectos() {
    const path = `${this.api}/prospectos`;
    return this.http.get<Prospecto[]>(path).toPromise();
  }

  async getProspecto(id: string) {
    const path = `${this.api}/prospecto/${id}`;
    return await this.http.get<Prospecto>(path).toPromise();
  }
  
  public createProspecto(prospecto: any) {
    const path = `${this.api}/nuevo/prospecto`;
    return this.http.post(path, prospecto).toPromise();
  }

  public uploadFile(data: any) {
    const path = `${this.api}/upload`;
    return this.http.post(path, data).toPromise();
  }

  updateProspecto(prospecto: any) {
    const path = `${this.api}/editar/prospecto`;
    return this.http.post(path, prospecto).toPromise();
  }
}
