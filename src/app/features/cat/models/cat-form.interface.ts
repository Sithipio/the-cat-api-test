import { FormControl } from '@angular/forms';

export interface ICatForm {
  limit: FormControl<number>;
  hasBreed: FormControl<boolean>;
  breedIds: FormControl<string[]>;
}
