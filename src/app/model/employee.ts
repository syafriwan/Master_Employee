export class Employee {
    id: number;
    name: string;
    birthDate: Date;
    position: {
      id:number,
      code:string,
      name:string,
      isDelete:number
    };
    idNumber:number;
    gender:number;
    isDelete:number;
}