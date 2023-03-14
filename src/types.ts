export interface Good {
  _id: string;
  name: string;
  price: number;
  img: string;
}

export interface Order {
  _id: string;
  good: string;
  price: string;
  img: string;
  address: string;
  express: string;
  status: number;
  createdAt: string;
}

export interface BaseTask {
  _id?: string;
  title: string;
  price: string;
  content: string;
  imgFiles?: any[];
}

export interface Task extends BaseTask {
  setter: { _id: string; username?: string };
  getter?: { _id: string; username?: string };
  imgs: string[];
  status: number;
  createdAt: string;
}
