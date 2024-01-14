import { Articol } from './Articol';

export interface Autor{
    AutorId : number,
    AutorName: string,
    AutorSurname: string,
    ConferintaId: number,
    Articol: Articol []
 
   
}