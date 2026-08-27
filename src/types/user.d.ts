declare global {
  interface IUserTable {
    _id: string;
    fullName: string;
    email: string;
    phone: string;
    role: string;
    avatar: string;
    isActive: boolean;
    type: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }

  interface IDataPaginate<T> {
    meta: {
      current: string;
      pageSize: string;
      pages: number;
      total: number;
    };
    result: T[];
  }

  interface IUserSearchField {
    fullName: string;
    email: string;
    createdAt: string;
  }
}

export {};
