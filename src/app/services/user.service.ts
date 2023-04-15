/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Injectable
} from '@angular/core';
import {
  HttpClient
} from '@angular/common/http';
import {
  Observable
} from 'rxjs';

const TESTURL = 'http://localhost:8080/api/test/';
const BASEURL = 'http://localhost:8080/api/crud/';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getPublicContent(): Observable < any > {
    return this.http.get(TESTURL + 'all', {
      responseType: 'text'
    });
  }

  getUserBoard(): Observable < any > {
    return this.http.get(TESTURL + 'user', {
      responseType: 'text'
    });
  }

  getModeratorBoard(): Observable < any > {
    return this.http.get(TESTURL + 'mod', {
      responseType: 'text'
    });
  }

  getAdminBoard(): Observable < any > {
    return this.http.get(TESTURL + 'admin', {
      responseType: 'text'
    });
  }
  getUserList(): Observable < any > {
    return this.http.get(BASEURL);
  }

  createUser(body:any): Observable < any > {
    return this.http.post(BASEURL,body);
  }
  updateUser(id:number,body: any): Observable < any > {
    return this.http.put(`${BASEURL}users/${id}`,body);
  }
  deleteUser(id: number): Observable < any > {
    return this.http.delete(BASEURL + `user/${id}`);
  }
}
