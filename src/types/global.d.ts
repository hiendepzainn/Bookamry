declare global {
  interface IFieldRegister {
    fullName: string;
    email: string;
    password: string;
    phone: string;
  }

  //type Axios Response
  interface IBackendResponse<T> {
    statusCode: number;
    message: string;
    error?: string;
    author?: string;
    data?: T;
  }

  interface IDataRegister {
    email: string;
    fullName: string;
    _id: string;
  }

  //type Axios Response
}

export {};
