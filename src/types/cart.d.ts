declare global {
  interface IBookInCart {
    id: string;
    quantity: number;
    detail: IBookTable;
  }
}

export {};
