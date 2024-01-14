import Organizator, { OrganizatorCreationAttributes } from "../entities/Organizator";
import Conferinta from "../entities/Conferinta";
import { Conferinte } from "../entities/dbConst";
import db from "../dbConfig";
import { or } from "sequelize";
import organizatorFilterDto from "./models/organizatorFilterDto";
import { Like } from "./operators";

  async function createOrganizator(organizator:OrganizatorCreationAttributes) {
    return await Organizator.create(organizator, {  include: [{model: Conferinta, as: Conferinte}]})
    
  }

async function getOrganizator(organizatorFilter: organizatorFilterDto) {

  if (!organizatorFilter.take)
    organizatorFilter.take = 10;

  if (!organizatorFilter.skip)
    organizatorFilter.skip = 0;

  let whereClause: any = {};
  if (organizatorFilter.organizatorName)
    whereClause.OrganizatorName = { [Like]: `%${organizatorFilter.organizatorName}%` };

  if (organizatorFilter.organizatorSurname)
    whereClause.OrganizatorSurname = { [Like]: `%${organizatorFilter.organizatorSurname}%` };

  return await Organizator.findAndCountAll(
    {
      distinct: true,
      where: whereClause,
      limit: organizatorFilter.take,
      offset: organizatorFilter.skip * organizatorFilter.take,
    });

}

async function getOrganizatorbyId(id: number) {
  return await Organizator.findByPk(id, { include: [Conferinta] });
}

async function deleteOrganizator(id: number) {
  let deleteElem = await Organizator.findByPk(id);

  if (!deleteElem) {
    console.log("This element does not exist, so it cannot be deleted");
    return;
  }
  return await deleteElem.destroy();
}

async function updateOrganizator(organizator: OrganizatorCreationAttributes, id: number) {
  const findOrganizator = await getOrganizatorbyId(organizator.OrganizatorId);

  if (!findOrganizator) {
    console.log("Acest organizator nu exista!");
    return;
  }

  const t = await db.transaction()
  try {
    await findOrganizator.update(organizator);

    // deleted
    const existConferinta = await Conferinta.findAll({
      where: {
        OrganizatorId: organizator.OrganizatorId,
      },
    });

    if (existConferinta.length > 0) {
      let conferintaIds = existConferinta.map(a => a.dataValues.ConferintaId);
      let conferintaIdsDeleted = conferintaIds.filter(id => !organizator.Conferinta.find(add => add.ConferintaId === id)?.ConferintaId)
      if (conferintaIdsDeleted.length > 0)
        await Conferinta.destroy({
          where: {
            ConferintaId: conferintaIdsDeleted,
          },
        })
    }

    // inserted 
    const insertedA = organizator.Conferinta.filter(a => a.ConferintaId === 0)
    if (insertedA.length > 0)
      await Conferinta.bulkCreate(insertedA)

    // updated
    const updatedA = organizator.Conferinta.filter(a => a.ConferintaId !== 0);
    if (updatedA.length > 0) {
      for (let item of updatedA) {
        const findA = await Conferinta.findByPk(item.ConferintaId);
        await findA?.update(item);
      }
    }

    await t.commit();

  } catch (e) {
    await t.rollback();
    throw e;
  }
}

export {
  createOrganizator,
  getOrganizatorbyId,
  getOrganizator,
  deleteOrganizator,
  updateOrganizator
}