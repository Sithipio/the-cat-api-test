import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { endpoints } from '@endpoints';
import { ICat } from '@features/cat/models';

@Injectable({
  providedIn: 'root',
})

export class CatApiService {

  constructor(private http: HttpClient) {
  }

  public fetchCats(data): Observable<ICat[]> {
    const url = endpoints.cat.fetchCats();

    const params = new HttpParams()
      .set('limit', data?.limit || 10)
      .set('breed_ids', data?.breedIds || [])
      .set('has_breeds', data?.hasBreed || false);


    return this.http.get<ICat[]>(url, { params });
  }
}
