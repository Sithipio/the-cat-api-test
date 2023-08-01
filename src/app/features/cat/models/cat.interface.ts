import { IBreed } from '@features/breed/models';

export interface ICat {
  id: string;
  url: string;
  breeds: IBreed;
  hasBreed: boolean;
}
