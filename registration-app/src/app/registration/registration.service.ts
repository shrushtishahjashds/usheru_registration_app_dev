// api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, debounceTime, distinctUntilChanged, of, switchMap } from 'rxjs';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  checkUsernameExists(value: any): Observable<any> {
    console.log('this.checkUsernameExists');
    // Implement your logic here or return a default observable
    return of(null);
  }
  
  private apiUrl = 'https://my-json-server.typicode.com/shrushtishahjashds/usheru_registration_app_dev'; // Replace with your actual API base URL

  constructor(private http: HttpClient) {}

  getCountries(): Observable<string[]> {
    return this.http.get<any[]>(`${this.apiUrl}/countries`);
  }

  checkUsernameAvailability(username: string): Observable<boolean> {
    console.log('reaching service')
    return this.http.get<boolean>(`${this.apiUrl}/username-available/${username}`);
  }
 
  
}
