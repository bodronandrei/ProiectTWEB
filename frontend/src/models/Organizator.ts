import { Conferinta } from './Conferinta';
import { Reviewer } from './Reviewer';


export interface Organizator{
    OrganizatorId : number,
    OrganizatorName: string,
    OrganizatorSurName: string,
    Conferinta: Conferinta[],
    Reviewer: Reviewer[] 
   
}