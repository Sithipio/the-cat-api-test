import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { debounceTime, Observable } from 'rxjs';

import { ICat, ICatForm } from '@features/cat/models';
import { CatState } from '@features/cat/state/cat.state';
import { BreedState } from '@features/breed/state/breed.state';
import { FetchCats } from '@features/cat/state/cat.actions';
import { FetchBreeds } from '@features/breed/state/breed.actions';
import { IBreed } from '@features/breed/models';

@UntilDestroy()
@Component({
  selector: 'cat-cat',
  templateUrl: './cat.component.html',
  styleUrls: ['./cat.component.scss'],
})
export class CatComponent implements OnInit {
  public cats$: Observable<ICat[]> = this.store.select(CatState.getCats);
  public breeds$: Observable<IBreed[]> = this.store.select(BreedState.getBreeds);

  public catForm: FormGroup<ICatForm> = new FormGroup<ICatForm>({
    limit: new FormControl(10, Validators.max(100)),
    hasBreed: new FormControl(false),
    breedIds: new FormControl([]),
  });

  constructor(private store: Store) {
  }

  public get hasBreed(): boolean {
    return this.catForm.get('hasBreed').value;
  }

  ngOnInit() {
    this.store.dispatch(new FetchCats());
    this.store.dispatch(new FetchBreeds());
    this.subscribeToFormChanges();
  }


  private subscribeToFormChanges() {
    this.catForm.valueChanges.pipe(debounceTime(1000), untilDestroyed(this)).subscribe((formData) => {
      if (!formData.hasBreed) {
        this.catForm.get('breedIds').setValue([], { emitEvent: false });
      }

      if (this.catForm.valid) {
        this.store.dispatch(new FetchCats(this.catForm.value));
      }
    });
  }
  public   trackBy(index: number, item:   ICat):string{
    return item.id;
  }
}
