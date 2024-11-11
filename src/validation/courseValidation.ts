import Joi from 'joi';

export const courseSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  modules: Joi.array().items(
    Joi.object({
      title: Joi.string().required(),
      lessons: Joi.array().items(
        Joi.object({
          title: Joi.string().required(),
          description: Joi.string().required(),
          topics: Joi.array().items(Joi.string()).required(),
          content: Joi.array().items(
            Joi.object({
              type: Joi.string().valid('text', 'video', 'audio').required(),
              data: Joi.string().required(),
            })
          ).required(),
        })
      ).required(),
    })
  ).required(),
});
