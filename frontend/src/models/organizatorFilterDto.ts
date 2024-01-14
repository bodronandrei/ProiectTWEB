import { PaginationDto } from "./PaginationDto";

export interface organizatorFilterDto extends PaginationDto{
    organizatorName: string
    organizatorSurname: string
}