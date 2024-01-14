import { Feedback } from './Feedback';


export interface Reviewer{
    ReviewerId: number,
    ReviewerName: string,
    ReviewerSurname: string,
    ArticolId:number,
    Feedback: Feedback [],
    OrganizatorId: number
}