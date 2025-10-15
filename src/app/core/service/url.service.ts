import { Injectable } from '@angular/core';
import { Url } from '../model/url';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TotalClicksAndMostClickedResponse } from '../interface/totalClicksAndMostClickedResponse';
import { patchUrlRequest } from '../interface/patchUrlRequest';

@Injectable({ providedIn: 'root' })
export class UrlService {

      apiUrl = 'http://localhost:8080/v1/url';

      constructor(private http: HttpClient) { }

      getUrls(): Observable<Url[]> {
            return this.http.get<Url[]>(`${this.apiUrl}`);
      }

      createUrlShort(url: Url): Observable<Url> {
            return this.http.post<Url>(`${this.apiUrl}`, url);
      }

      totalClicksAndMostClickedUrl(): Observable<TotalClicksAndMostClickedResponse> {
            return this.http.get<TotalClicksAndMostClickedResponse>(`${this.apiUrl}/totalclicksurls`);
            
      }

      putUrlShort(id: number, body: patchUrlRequest): Observable<Url> {
            return this.http.put<Url>(`${this.apiUrl}/${id}`, body);
      }

      deleteUrlShort(id: String): Observable<void> {
            return this.http.delete<void>(`${this.apiUrl}/${id}`);
      }




}