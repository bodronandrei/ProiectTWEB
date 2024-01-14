import paginationDto from "./paginationDto";

export default class autorFilterDto extends paginationDto{
    autorName!: string | null
    autorSurname!: string | null  

    constructor(obj : Partial<autorFilterDto>){
        super();        
        Object.assign(this, obj);
        this.setTakeAndSkip(this.take, this.skip)       
    }
}