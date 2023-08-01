import { State, Action, StateContext, Selector } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';

import { BreedApiService } from '@features/breed/services';
import { FetchBreeds } from '@features/breed/state/breed.actions';
import { IBreed } from '@features/breed/models';


export interface BreedStateModel {
  breeds: IBreed[];
}

@State<BreedStateModel>({
  name: 'breeds',
  defaults: {
    breeds: [],
  },
})

@Injectable()
export class BreedState {
  constructor(private breedApiService: BreedApiService) {
  }

  @Selector()
  static getBreeds(state: BreedStateModel) {
    return state.breeds;
  }


  @Action(FetchBreeds)
  fetchBreeds(ctx: StateContext<BreedStateModel>) {
    return this.breedApiService.fetchBreeds().pipe(
      tap((breeds: IBreed[]) => {
        const state = ctx.getState();
        ctx.setState({
          ...state,
          breeds: [...breeds],
        });
      }),
    );
  }
}
