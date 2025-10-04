import { Injectable } from '@angular/core';
import { Url } from '../model/url';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class UrlService {

      apiUrl = 'http://localhost:8080/v1/url';

      constructor(private http: HttpClient) { }

      getUrls(): Observable<Url[]> {
            return this.http.get<Url[]>(`${this.apiUrl}`);
      }

      createUrlShort(url: Url): Observable<Url> {
            console.log('Dados enviados para o serviço:', typeof(url));
            return this.http.post<Url>(`${this.apiUrl}`, url);
      }




}