class LocalStorageHandler<T> {
  private key: string;

  constructor(key: string) {
    this.key = key;
  }

  private getItemFomStorage(): T {
    const item = localStorage.getItem(this.key);
    return item ? JSON.parse(item) : [];
  }

  getItem(): T {
    return this.getItemFomStorage();
  }

  setItem(value: T): void {
    localStorage.setItem(this.key, JSON.stringify(value));
  }

  removeItem(): void {
    localStorage.setItem(this.key, "");
  }
}

export { LocalStorageHandler };
