import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RegisrationService {
  private apiUrl = 'https://my-json-server.typicode.com/shrushtishahjashds/usheru_registration_app_dev'; // Replace with your actual API base URL
  private userApiUrl = 'https://dev-026lxd7jmuitd5j.api.raw-labs.com/mock/api';

  constructor(private http: HttpClient) {}

  getCountries(): Observable<string[]> {
    return this.http.get<any[]>(`${this.apiUrl}/countries`).pipe(
      catchError((error) => this.handleError(error))
    );
  }

  checkUsernameAvailability(username: string): Observable<boolean> {
    const headers = new HttpHeaders(); // Create a new instance of HttpHeaders
    const url = `${this.userApiUrl}/username-available?username=${username}`;
    return this.http.get<boolean>(url, { headers }).pipe(
      catchError((error) => this.handleError(error))
    );
  }

  registerUser(postData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, postData).pipe(
      catchError((error) => this.handleError(error))
    );
  }

  private handleError(error: any): Observable<never> {
    console.error('API Error:', error);
    // You can customize error handling based on your application's needs
    let errorMessage = 'An error occurred. Please try again later.';

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Client Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Server Error: ${error.status} - ${error.message}`;
    }
    // Optionally, you can log errors to a service or analytics platform

    // Return a user-friendly error message and propagate the error further
    return throwError(errorMessage);
  }
}
