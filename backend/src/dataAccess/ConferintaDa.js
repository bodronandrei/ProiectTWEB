import Conferinta from "../entities/Conferinta.js";

async function createConferinta(conferinta){
    return await Conferinta.create(conferinta);
}

async function getConferinta(){
    return await Conferinta.findAll();
}

async function getConferintaById(id){
    return await Conferinta.findByPk(id);
}

async function updateConferinta(conferinta, id){
    if(parseInt(id) !== parseInt(conferinta.ConferintaId))
        return {error: true, msg: 'Entity id diff'}

    let findE = await getConferintaById(id);

    if(!findE)
        return {error: true, msg: 'No entity found'}

    return {error: false, msg: '', obj: await findE.update(conferinta)}
}

async function deleteConferinta(id){
    let findE = await getConferintaById(id);
    
    if(!findE)
         return {error: true, msg: 'No entity found'}
    
    return {error: false, msg: '', obj: await findE.destroy()}
}

export {
    createConferinta,
    getConferinta,
    getConferintaById,
    updateConferinta,
    deleteConferinta
}