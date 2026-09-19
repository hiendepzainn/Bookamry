declare global {
  interface IBookFilter {
    category: string[];
    from: number;
    to: number;
  }

  interface IFilterPrice {
    from: string;
    to: string;
  }
}

export {};
