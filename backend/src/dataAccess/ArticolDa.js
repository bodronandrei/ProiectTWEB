import Articol from "../entities/Articol.js";

async function createArticol(articol){
    return await Articol.create(articol);
}

async function getArticole(){
    return await Articol.findAll();
}

async function getArticolById(id){
    return await Articol.findByPk(id);
}

async function updateArticol(articol, id){
    if(parseInt(id) !== parseInt(articol.ArticolId))
        return {error: true, msg: 'Entity id diff'}

    let findE = await getArticolById(id);

    if(!findE)
        return {error: true, msg: 'No entity found'}

    return {error: false, msg: '', obj: await findE.update(articol)}
}

async function deleteArticol(id){
    let findE = await getArticolById(id);
    
    if(!findE)
         return {error: true, msg: 'No entity found'}
    
    return {error: false, msg: '', obj: await findE.destroy()}
}

export {
    createArticol,
    getArticole,
    getArticolById,
    updateArticol,
    deleteArticol
}