// not used since I can pull the object from prisma
export interface Person {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  deletedAt: Date;
  version: number;
}
