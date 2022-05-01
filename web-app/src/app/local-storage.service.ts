import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class LocalStorageService {

    private storage: Storage;

    private static i: LocalStorageService

    constructor() {
        this.storage = window.localStorage;
    }

    public static instance(): LocalStorageService {
        if(!this.i) {
            this.i = new LocalStorageService();
        }

        return LocalStorageService.i;
    }

    set(key: string, value: any): boolean {
        if(this.storage) {
            this.storage.setItem(key, JSON.stringify(value));
            return true;
        }
        
        return false;
    }

    get(key: string): any {
        if(this.storage) {
            return JSON.parse(this.storage.getItem(key))
        }

        return null;
    }

    remove(key: string): boolean {
        if(this.storage) {
            this.storage.removeItem(key);
            return true;
        }

        return false;
    }

    clear(): boolean {
        if(this.storage) {
            this.storage.clear();
            return true;
        }

        return false;
    }
}

