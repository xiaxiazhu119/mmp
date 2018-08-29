import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {catchError, map, tap} from 'rxjs/operators';
import 'rxjs/add/observable/throw';

export enum HttpMethod {
  GET    = 0,
  POST   = 1,
  DELETE = 2,
  PUT    = 3
}

@Injectable()
export class AjaxBaseService {

  constructor(private http: HttpClient) {
  }

  private get(url: string, httpOptions: any): Observable<any> {
    return this.http.get<any>(url, httpOptions);
  }

  /** POST: add a new hero to the server */
  private post(url: string, body: any, httpOptions: any): Observable<any> {
    return this.http.post<any>(url, body, httpOptions);
  }

  /** DELETE: delete the hero from the server */
  private delete(url: string, httpOptions: any): Observable<any> {
    return this.http.delete<any>(url, httpOptions);
  }

  /** PUT: update the hero on the server */
  private put(url: string, body: any, httpOptions: any): Observable<any> {
    return this.http.put(url, body, httpOptions);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    // this.messageService.add('AjaxBaseService: ' + message);
  }


  request(method: HttpMethod, url: string, body: any, httpOptions?: any): Observable<any> {
    let request: any;
    switch (method) {
      case HttpMethod.GET:
        request = this.get(url, httpOptions);
        break;
      case HttpMethod.POST:
        request = this.post(url, body, httpOptions);
        break;
      case HttpMethod.DELETE:
        request = this.delete(url, httpOptions);
        break;
      case HttpMethod.PUT:
        request = this.put(url, body, httpOptions);
        break;
    }

    // console.log(request);

    return request
      .pipe(
        tap(rsp => this.log(`request ${rsp}`)),
        map((rsp: any) => rsp),
        catchError((error: any) => {
          return Observable.throw(error);
        })
      );

  }


}
