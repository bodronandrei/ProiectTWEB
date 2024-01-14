import { PaginationDto } from "./PaginationDto";

export interface reviewerFilterDto extends PaginationDto{
    reviewerName: string
    reviewerSurname: string
}