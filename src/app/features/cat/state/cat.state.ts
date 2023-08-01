import { State, Action, StateContext, Selector } from '@ngxs/store';
import { tap } from 'rxjs/operators';


import { Injectable } from '@angular/core';
import { CatApiService } from '@features/cat/services';
import { ICat, ICatFilter } from '@features/cat/models';
import { FetchCats } from '@features/cat/state/cat.actions';

export interface CatStateModel {
  cats: ICat[];
  limit: number;
}

@State<CatStateModel>({
  name: 'cats',
  defaults: {
    cats: [],
    limit: 10,
  },
})

@Injectable()
export class CatState {
  constructor(private catApiService: CatApiService) {
  }

  @Selector()
  static getCats(state: CatStateModel) {
    return state.cats;
  }

  @Selector()
  static getLimit(state: CatStateModel) {
    return state.limit;
  }

  @Action(FetchCats)
  fetchCats(ctx: StateContext<CatStateModel>, {data}:{ data: ICatFilter }) {
    return this.catApiService.fetchCats(data).pipe(
      tap((cats: ICat[]) => {
        const state = ctx.getState();
        ctx.setState({
          ...state,
          cats: [...cats],
        });
      }),
    );
  }
}
