import Utilizator from "../entities/Utilizator.js";

async function createUtilizator(utilizator){
    return await Utilizator.create(utilizator);
}

async function getUtilizator(){
    return await Utilizator.findAll();
}

async function getUtilizatorById(id){
    return await Utilizator.findByPk(id);
}

async function updateUtilizator(utilizator, id){
    if(parseInt(id) !== parseInt(utilizator.UtilizatorId))
        return {error: true, msg: 'Entity id diff'}

    let findE = await getUtilizatorById(id);

    if(!findE)
        return {error: true, msg: 'No entity found'}

    return {error: false, msg: '', obj: await findE.update(utilizator)}
}

async function deleteUtilizator(id){
    let findE = await getUtilizatorById(id);
    
    if(!findE)
         return {error: true, msg: 'No entity found'}
    
    return {error: false, msg: '', obj: await findE.destroy()}
}

export {
    createUtilizator,
    getUtilizator,
    getUtilizatorById,
    updateUtilizator,
    deleteUtilizator
}