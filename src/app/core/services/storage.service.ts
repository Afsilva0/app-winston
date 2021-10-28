import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    await this.storage.create();
  }

  getItem(key: string) {
    return this.storage.get(key);
  }

  setItem(key: string, data: string) {
    this.storage.setItem(key, data);
  }
}
