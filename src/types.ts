export interface IGood {
  _id: string;
  name: string;
  price: number;
  img: string;
}

export interface IOrder {
  _id: string;
  good: string;
  price: string;
  img: string;
  address: string;
  express: string;
  status: number;
  createdAt: string;
}

export interface IBaseChat {
  sender: string;
  receiver: string;
  content: string;
}

export interface IChat extends IBaseChat {
  target: string;
  username: string;
  avatar: string;
  createdAt: string;
}

export interface IBaseTask {
  _id?: string;
  title: string;
  price: string;
  content: string;
  imgFiles?: any[];
}

export interface ITask extends IBaseTask {
  setter: { _id: string; username?: string };
  getter?: { _id: string; username?: string };
  imgs: string[];
  status: number;
  createdAt: string;
}
