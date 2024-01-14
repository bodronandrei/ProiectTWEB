import paginationDto from "./paginationDto";

export default class organizatorFilterDto extends paginationDto{
    organizatorName!: string | null
    organizatorSurname!: string | null  

    constructor(obj : Partial<organizatorFilterDto>){
        super();        
        Object.assign(this, obj);
        this.setTakeAndSkip(this.take, this.skip)       
    }
}