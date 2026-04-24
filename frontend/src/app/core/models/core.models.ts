export interface User {
  id: number;
  firstName: string;
  lastName: string;
  fullName: string;
  imgUrl: any;
  phoneNumber: string;
  jobPosition: any;
  blocked: boolean;
  email : string;
  createdAt: Date;
  updatedAt: Date;
  status: string;
  userTypeId: number;
}

export interface UserCreds {
  email: string;
  password: string;
  type: string,
  isFromLogin:boolean
}

export class Staff {
  constructor() {}
  id: number;
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  password: string;
  role: number;
  role_name: string;
}
