export function saveToLocalStorage(key: string, data: any): void {
  localStorage.setItem(key, JSON.stringify(data));
}

export function loadFromLocalStorage<T>(key: string): T | null {
  const data = localStorage.getItem(key);
  return data ? (JSON.parse(data) as T) : null;
}
