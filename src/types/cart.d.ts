declare global {
  interface IBookInCart {
    id: string;
    quantity: number;
    detail: IBookTable;
  }

  interface IOrderInfor {
    paymentMethod: string;
    name: string;
    phone: string;
    address: string;
  }
}

export {};
