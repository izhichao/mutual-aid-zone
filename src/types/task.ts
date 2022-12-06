export type SendTaskType = {
  _id?: string;
  title: string;
  price: string;
  content: string;
  imgFiles: any[];
};

export type ReturnTaskType = {
  _id?: string;
  title: string;
  content: string;
  price: number;
  setter: { _id: string; username?: string };
  getter?: { _id: string; username?: string };
  imgs: string[];
  status: number;
  createdAt: string;
}; 
