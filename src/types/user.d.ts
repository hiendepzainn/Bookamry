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
    createdAt: Date;
    updatedAt: Date;
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
}

export {};
