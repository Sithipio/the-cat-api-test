import { environment } from '@environment';

export const endpoints = {
  cat: {
    fetchCats: () => environment.api + '/images/search',
  },
  breeds: {
    fetchBreeds: () => environment.api + '/breeds',
  }
}
