import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@environment';

@Injectable()
export class CatApiInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const apiToken = environment.apiToken;

    const clonedReq = req.clone({
      setHeaders: {
        'x-api-key': apiToken,
      },
    });

    return next.handle(clonedReq);
  }
}
