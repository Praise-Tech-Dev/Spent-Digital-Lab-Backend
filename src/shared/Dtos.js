const {BaseEntity} = require("./BaseEntity")
class UpdatePublicationDto extends BaseEntity {
  title;
  slug;
  cover_image_url;
  authors;
  content;
  abstract;
  team;
  tags;
  category;
  constructor(props = {}) {
    super(props);
  }
}

module.exports = {UpdatePublicationDto}