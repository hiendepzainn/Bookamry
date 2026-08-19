declare global {
  //--------CONTEXT---------
  interface IContext {
    authenticated: boolean;
    user: {
      avatar: string;
      email: string;
      fullName: string;
      id: string;
      phone: string;
      role: string;
    };
    setAuthenticated: (value: boolean) => void;
    setUser: (user: IDataLoginUser) => void;
  }
  //--------CONTEXT---------

  interface IFieldRegister {
    fullName: string;
    email: string;
    password: string;
    phone: string;
  }

  interface IFieldLogin {
    username: string;
    password: string;
  }

  //type Axios Response
  interface IBackendResponse<T> {
    statusCode: number;
    message: string;
    error?: string;
    author?: string;
    data?: T;
  }

  //--------REGISTER---------
  interface IDataRegister {
    email: string;
    fullName: string;
    _id: string;
  }
  //--------REGISTER---------

  //--------LOGIN--------------------------------------------------
  interface IDataLogin<T> {
    access_token: string;
    user: T;
  }

  interface IDataLoginUser {
    avatar: string;
    email: string;
    fullName: string;
    id: string;
    phone: string;
    role: string;
  }
  //--------LOGIN--------------------------------------------------

  //type Axios Response
}

export {};
