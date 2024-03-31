export interface ICreateProduct {
  createProduct: (dto: unknown) => Promise<unknown>;
}

// TODO: make generic function?
export function isImplementsIProductCreate<T>(
  obj: T,
): obj is T & ICreateProduct {
  return typeof (obj as T & ICreateProduct).createProduct === 'function';
}
