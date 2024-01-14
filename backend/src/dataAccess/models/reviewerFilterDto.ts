import paginationDto from "./paginationDto";

export default class reviewerFilterDto extends paginationDto{
    reviewerName!: string | null
    reviewerSurname!: string | null  

    constructor(obj : Partial<reviewerFilterDto>){
        super();        
        Object.assign(this, obj);
        this.setTakeAndSkip(this.take, this.skip)       
    }
}