import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { FeedbackFormat } from './feedbackformat';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class InfoService {

  constructor(private http: HttpClient, private messageservice: MessageService ) { }

  private getFeedbackUrl = 'https://cs251-outlab-6.herokuapp.com/initial_values/';
  private postFeedbackUrl = 'https://cs251-outlab-6.herokuapp.com/add_new_feedback/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };
  
  private handleError(error: HttpErrorResponse) {
    this.messageservice.add('unsuccessful submission');
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }

  getFeedback(): Observable<any> {
    return this.http.get<FeedbackFormat>(this.getFeedbackUrl).pipe(catchError(this.handleError));
  }
  postFeedback(feedbackFormat: FeedbackFormat): Observable<FeedbackFormat> {
    return this.http.post<FeedbackFormat>(this.postFeedbackUrl, feedbackFormat, this.httpOptions).pipe(catchError(this.handleError));
  }
}