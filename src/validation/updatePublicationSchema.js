const Joi = require("joi");

const updatePublicationSchema = Joi.object({
  title: Joi.string().trim().optional(),

  slug: Joi.string().lowercase().optional(),

  abstract: Joi.string().max(500).optional(),

  category: Joi.string()
    .valid(
      "Blockchain Security & Cryptography",
      "Digital Identity & Data Privacy",
      "Real Estate & Supply Chain",
      "Web3 Infrastructure & Interoperability",
      "AI & Blockchain Synergy",
      "Policy, Governance & Regulation",
      "General"
    )
    .optional(),

  tags: Joi.array().items(Joi.string().trim()),


  content: Joi.string().optional(),

  cover_image_url: Joi.string().uri().optional(),

  authors: Joi.array().items(
    Joi.object({
      user: Joi.string().optional(), // later you can manually validate ObjectId
      name: Joi.string().optional(),
    })
  ),

  team: Joi.string().optional(), // left as simple string

});

module.exports = updatePublicationSchema;