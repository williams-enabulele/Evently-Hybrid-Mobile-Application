import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '@environments/environment';
import { catchError } from 'rxjs/operators';




@Injectable({
  providedIn: 'root'
})
export class AllService {

   // Handle API errors
   handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occured:', error.error.message);
    }
    else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Oops! something not right, retry with correct credentials');
  }


  constructor(
    private http: HttpClient
  ) {}

  getFaculty(){
    return this.http.get<any>(
      `${environment.url}/open/faculty`
  ) .pipe(
    catchError(this.handleError)
  );
  }

  getDepartment(){
    return this.http.get<any>(
      `${environment.url}/open/department`
  ) .pipe(
    catchError(this.handleError)
  );
  }

  getLevels(){
    return this.http.get<any>(
      `${environment.url}/open/levels`
  ) .pipe(
    catchError(this.handleError)
  );
  }

  getFeeds(){
    return this.http.get<any>(
      `${environment.url}/api/feeds`
  ) .pipe(
    catchError(this.handleError)
  );
  }

viewComments(id){
  return this.http.get<any>(
    `${environment.url}/api/get-comments/${id}`
  ).pipe (
    catchError(this.handleError)
  );
}

  getFeedDetails(id){
    return this.http.get<any>(
      `${environment.url}/api/feed-details/${id}`
  ) .pipe(
    catchError(this.handleError)
  );
  }

  getChannelList(name, id){
    return this.http.get(
      `${environment.url}/api/get-channels/${name}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

mySubscriptions(id){
  return this.http.get(
    `${environment.url}/api/subscription/${id}`)
    .pipe(
      catchError(this.handleError)
    );
}


 subscribe(data: any){
    return this.http.post<any>(
      `${environment.url}/api/subscribe`, data)
      .pipe(
        catchError(this.handleError)
      );
  }

  push(data){
    return this.http.put<any>(
      `${environment.url}/api/push`, data)
      .pipe(
        catchError(this.handleError)
      );
  }

  unsubscribe(id){
    return this.http.delete(
      `${environment.url}/api/unsubscribe/${id}`)
      .pipe(
        catchError(this.handleError)
    )
  }
  getSuggestions(id){
    return this.http.get<any>(
      `${environment.url}/api/suggestions/${id}`
  ) .pipe(
    catchError(this.handleError)
  );
  }

  getMessages(id){
    return this.http.get<any>(
      `${environment.url}/api/last-messages/${id}`
  ) .pipe(
    catchError(this.handleError)
  );
  }

  messageList(sender, receiver ){
    return this.http.get<any>(
      `${environment.url}/api/getmessages/${sender}/${receiver}`
  ) .pipe(
    catchError(this.handleError)
  );
}

replies(id, uid){
  return this.http.get<any>(
    `${environment.url}/api/getmessages/${id}/${uid}`
) .pipe(
  catchError(this.handleError)
);
}


sendMessage(data){
  return this.http.post<any>(
    `${environment.url}/api/send-message`, data
) .pipe(
  catchError(this.handleError)
); 
}

  getChatlist(id){
    return this.http.get<any>(
      `${environment.url}/api/chatlist/${id}`
  ) .pipe(
    catchError(this.handleError)
  );
  }

  getFeedsPaginate(p){
    return this.http.get<any>(
      `${environment.url}/api/feeds/${p}`
  ) .pipe(
    catchError(this.handleError)
  );
  }

/**
 * Get Counts function
 * @param id
 * @returns json
 */

getCounts(id){
  return this.http.get<any>(
    `${environment.url}/api/counts/${id}`
) .pipe(
  catchError(this.handleError)
);
}


getSubscribers(id){
  return this.http.get<any>(
    `${environment.url}/api/count-subscribers/${id}`
) .pipe(
  catchError(this.handleError)
);
}



  postChannel(data: any): Observable<any> {
    return this.http.post<any>(`${environment.url}/api/channel`, data)
      .pipe(
        catchError(this.handleError)
      );
  }

getChannelItem(data: any): Observable<any>{
    return this.http.get<any>(
        `${environment.url}/api/channel-item/${data}`
    ) .pipe(
      catchError(this.handleError)
    );
}

getChannelUser(data: any): Observable<any>{
  return this.http.get<any>(
      `${environment.url}/api/channel-user/${data}`
  ) .pipe(
    catchError(this.handleError)
  );
}
putChannel(data: any): Observable<any> {
    return this.http.put<any>(`${environment.url}/api/channel`, data)
      .pipe(
        catchError(this.handleError)
      );
  }

deleteChannel(data: any): Observable<any>{
    return this.http.delete<any>(
        `${environment.url}/api/channel/${data}`
    ) .pipe(
      catchError(this.handleError)
    );
}

postScheduleBroadcast(image, title, post, comments, channelId, datetime, uid ){

  const formData: any = new FormData();
  formData.append('img', image);
  formData.append('title', title);
  formData.append('post', post);
  formData.append('comments', comments);
  formData.append('channel_id', channelId);
  formData.append('datetime', datetime );
  formData.append('uid', uid );

  return this.http.post<any>(`${environment.url}/api/schedule`, formData )
      .pipe(
        catchError(this.handleError)
      );
}

postBroadcast(image, title, post, comments, channelId, uid ){

  const formData: any = new FormData();
  formData.append('img', image);
  formData.append('title', title);
  formData.append('post', post);
  formData.append('comments', comments);
  formData.append('channel_id', channelId);
  formData.append('uid', uid );

  return this.http.post<any>(`${environment.url}/api/broadcast`, formData )
      .pipe(
        catchError(this.handleError)
      );
}

getSub(id): Observable<any>{
  return this.http.get<any>(
      `${environment.url}/api/sub/${id}`
  ) .pipe(
    catchError(this.handleError)
  );
}

getBroadcastUser(data: any): Observable<any>{
  return this.http.get<any>(
      `${environment.url}/api/broadcast-user/${data}`
  ) .pipe(
    catchError(this.handleError)
  );
}

getScheduleUser(data: any): Observable<any>{
  return this.http.get<any>(
      `${environment.url}/api/schedule-user/${data}`
  ) .pipe(
    catchError(this.handleError)
  );
}

getFollowingList(id){
  return this.http.get<any>(
    `${environment.url}/api/following-list/${id}`
  ).pipe(
    catchError(this.handleError)
  );
}

getFollowersList(id){
  return this.http.get<any>(
    `${environment.url}/api/followers-list/${id}`
  ).pipe(
    catchError(this.handleError)
  );
}

getProfile(id){
  return this.http.get<any>(
    `${environment.url}/api/get-profile/${id}`
  ).pipe(
    catchError(this.handleError)
  );
}

getPeople(value){
  return this.http.get<any>(
    `${environment.url}/api/people/${value}`
  ).pipe(
    catchError(this.handleError)
  );
}

}
