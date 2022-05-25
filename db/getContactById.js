const listContacts = require("./listContacts");

const getContactById = async(id) => {
  const contacts = await listContacts();
  const result = contacts.find(item => item.id === id);
  return result ? result : null;
};

module.exports = getContactById;