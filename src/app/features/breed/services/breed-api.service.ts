import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { endpoints } from '@endpoints';
import { IBreed } from '@features/breed/models';

@Injectable({
  providedIn: 'root',
})

export class BreedApiService {

  constructor(private http: HttpClient) {
  }

  public fetchBreeds(): Observable<IBreed[]> {
    const url = endpoints.breeds.fetchBreeds();

    return this.http.get<IBreed[]>(url);
  }
}
