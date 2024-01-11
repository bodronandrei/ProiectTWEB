import VersiuneArticol from "../entities/VersiuneArticol.js";

async function createVersiuneArticol(versiuneArticol) {
    return await VersiuneArticol.create(versiuneArticol);
}

async function getVersiuniArticol() {
    return await VersiuneArticol.findAll();
}

async function getVersiuneArticolById(id) {
    return await VersiuneArticol.findByPk(id);
}

async function updateVersiuneArticol(versiuneArticol, id) {
    if (parseInt(id) !== parseInt(versiuneArticol.VersiuneArticolId))
        return { error: true, msg: 'Entity id diff' };

    let findE = await getVersiuneArticolById(id);

    if (!findE)
        return { error: true, msg: 'No entity found' };

    return { error: false, msg: '', obj: await findE.update(versiuneArticol) };
}

async function deleteVersiuneArticol(id) {
    let findE = await getVersiuneArticolById(id);

    if (!findE)
        return { error: true, msg: 'No entity found' };

    return { error: false, msg: '', obj: await findE.destroy() };
}

export {
    createVersiuneArticol,
    getVersiuniArticol,
    getVersiuneArticolById,
    updateVersiuneArticol,
    deleteVersiuneArticol
}
