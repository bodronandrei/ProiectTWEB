import Reviewer, { ReviewerCreationAttributes } from "../entities/Reviewer";
import Feedback from "../entities/Feedback";


import { Feedbackuri, Revieweri } from "../entities/dbConst";
import db from "../dbConfig";
import { or } from "sequelize";
import reviewerFilterDto from "./models/reviewerFilterDto";
import { Like } from "./operators";

  async function createReviewer(reviewer:ReviewerCreationAttributes) {
    return await Reviewer.create(reviewer, {  include: [{model: Feedback, as: Feedbackuri}, { model: Reviewer, as: Revieweri}]})
    
  }
  async function getReviewerbyId(id: number) {
    return await Reviewer.findByPk(id, { include: [Feedbackuri] });
  }

  async function getReviewer(reviewerFilter: reviewerFilterDto) {

    if (!reviewerFilter.take)
      reviewerFilter.take = 10;
  
    if (! reviewerFilter.skip)
      reviewerFilter.skip = 0;
  
    let whereClause: any = {};
    if (reviewerFilter.reviewerName)
      whereClause.reviewerName = { [Like]: `%${reviewerFilter.reviewerName}%` };
  
    if (reviewerFilter.reviewerSurname)
      whereClause.ReviewerSurname = { [Like]: `%${reviewerFilter.reviewerSurname}%` };
  
    return await Reviewer.findAndCountAll(
      {
        distinct: true,
        where: whereClause,
        limit: reviewerFilter.take,
        offset: reviewerFilter.skip * reviewerFilter.take,
      });
  
  }

  async function deleteReviewer(id: number) {
    let deleteElem = await Reviewer.findByPk(id);
  
    if (!deleteElem) {
      console.log("This element does not exist, so it cannot be deleted");
      return;
    }
    return await deleteElem.destroy();
  }
  
  async function updateReviewer(reviewer: ReviewerCreationAttributes, id: number) {
    const findReviewer = await getReviewerbyId(reviewer.ReviewerId);
  
    if (!findReviewer) {
      console.log("Acest reviewer nu exista!");
      return;
    }
  
    const t = await db.transaction()
    try {
      await findReviewer.update(reviewer);
  
      // deleted
      const existFeedback = await Feedback.findAll({
        where: {
          ReviewerId: reviewer.ReviewerId,
        },
      });
  
      if (existFeedback.length > 0) {
        let feedbackIds = existFeedback.map(a => a.dataValues.FeedbackId);
        let feedbackIdsDeleted = feedbackIds.filter(id => !reviewer.Feedback.find(add => add.FeedbackId === id)?.FeedbackId)
        if (feedbackIdsDeleted.length > 0)
          await Feedback.destroy({
            where: {
              FeedbackId: feedbackIdsDeleted,
            },
          })
      }
  
      // inserted 
      const insertedAa = reviewer.Feedback.filter(a => a.FeedbackId === 0)
      if (insertedAa.length > 0)
        await Feedback.bulkCreate(insertedAa)
  
      // updated
      const updatedAa = reviewer.Feedback.filter(a => a.FeedbackId !== 0);
      if (updatedAa.length > 0) {
        for (let item of updatedAa) {
          const findAa = await Feedback.findByPk(item.FeedbackId);
          await findAa?.update(item);
        }
      }
  
      await t.commit();
  
    } catch (e) {
      await t.rollback();
      throw e;
    }
  }
  
  export {
    createReviewer,
    getReviewerbyId,
    getReviewer,
    deleteReviewer,
    updateReviewer
  }