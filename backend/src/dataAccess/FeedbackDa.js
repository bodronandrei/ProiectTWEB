import Feedback from "../entities/Feedback.js";

async function createFeedback(feedback){
    return await Feedback.create(feedback);
}

async function getFeedback(){
    return await Feedback.findAll();
}

async function getFeedbackById(id){
    return await Feedback.findByPk(id);
}

async function updateFeedback(feedback, id){
    if(parseInt(id) !== parseInt(feedback.FeedbackId))
        return {error: true, msg: 'Entity id diff'}

    let findE = await getFeedbackById(id);

    if(!findE)
        return {error: true, msg: 'No entity found'}

    return {error: false, msg: '', obj: await findE.update(feedback)}
}

async function deleteFeedback(id){
    let findE = await getFeedbackById(id);
    
    if(!findE)
         return {error: true, msg: 'No entity found'}
    
    return {error: false, msg: '', obj: await findE.destroy()}
}

export {
    createFeedback,
    getFeedback,
    getFeedbackById,
    updateFeedback,
    deleteFeedback
}