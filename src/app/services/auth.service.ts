/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Injectable
} from '@angular/core';
import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';
import {
  Observable
} from 'rxjs';

const BASEURL = 'http://localhost:8080/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable < any > {
    return this.http.post(
      BASEURL + 'login', {
        username,
        password,
      },
      httpOptions
    );
  }

  register(username: string, email: string, password: string, role: any, firstName: string, lastName: string): Observable < any > {
    const body = {
      "username": username,
      "email": email,
      "password": password,
      "role": [
        role
      ],
      "firstName": firstName,
      "lastName": lastName
    };
    console.log(body);
    return this.http.post(
      BASEURL + 'register', body,
      httpOptions
    );
  }

  logout(): Observable < any > {
    return this.http.post(BASEURL + 'signout', {}, httpOptions);
  }
}
