import Autor, { AutorCreationAttributes } from "../entities/Autor";
import Articol from "../entities/Articol";


import { Articole } from "../entities/dbConst";
import db from "../dbConfig";
import { or } from "sequelize";
import autorFilterDto from "./models/autorFilterDto";
import { Like } from "./operators";

  async function createAutor(autor:AutorCreationAttributes) {
    return await Autor.create(autor, {  include: [{model: Articol, as: Articole}]})
    
  }

  async function getAutorByid(id: number) {
    return await Autor.findByPk(id, { include: [Articole] });
  }

  async function getAutor(autorFilter: autorFilterDto) {

    if (!autorFilter.take)
      autorFilter.take = 10;
  
    if (!autorFilter.skip)
      autorFilter.skip = 0;
  
    let whereClause: any = {};
    if (autorFilter.autorName)
      whereClause.autorName = { [Like]: `%${autorFilter.autorName}%` };
  
    if (autorFilter.autorSurname)
      whereClause.autorSurname = { [Like]: `%${autorFilter.autorSurname}%` };
  
    return await Autor.findAndCountAll(
      {
        distinct: true,
        where: whereClause,
        limit: autorFilter.take,
        offset: autorFilter.skip * autorFilter.take,
      });
  
  }

  
async function deleteAutor(id: number) {
  let deleteElem = await Autor.findByPk(id);

  if (!deleteElem) {
    console.log("This element does not exist, so it cannot be deleted");
    return;
  }
  return await deleteElem.destroy();
}

async function updateAutor(autor: AutorCreationAttributes, id: number) {
  const findAutor = await getAutorByid(autor.AutorId);

  if (!findAutor) {
    console.log("Acest autor nu exista!");
    return;
  }

  const t = await db.transaction()
  try {
    await findAutor.update(autor);

    // deleted
    const existArticol = await Articol.findAll({
      where: {
        ArticolId: autor.AutorId,
      },
    });

    if (existArticol.length > 0) {
      let articolIds = existArticol.map(a => a.dataValues.ArticolId);
      let articolIdsDeleted = articolIds.filter(id => !autor.Articol.find(add => add.ArticolId === id)?.ArticolId)
      if (articolIdsDeleted.length > 0)
        await Articol.destroy({
          where: {
            ArticolId: articolIdsDeleted,
          },
        })
    }

    // inserted 
    const insertedAaa = autor.Articol.filter(a => a.ArticolId === 0)
    if (insertedAaa.length > 0)
      await Articol.bulkCreate(insertedAaa)

    // updated
    const updatedAaa = autor.Articol.filter(a => a.ArticolId !== 0);
    if (updatedAaa.length > 0) {
      for (let item of updatedAaa) {
        const findAaaa = await Articol.findByPk(item.ArticolId);
        await findAaaa?.update(item);
      }
    }

    await t.commit();

  } catch (e) {
    await t.rollback();
    throw e;
  }
}

export {
  createAutor,
  getAutorByid,
  getAutor,
  deleteAutor,
  updateAutor
}
