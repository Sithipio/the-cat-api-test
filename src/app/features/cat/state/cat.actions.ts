import { ICatFilter } from '@features/cat/models';

export class FetchCats {
  static readonly type = '[Cat] Fetch Cats';
  constructor(public data?:ICatFilter) {}
}
