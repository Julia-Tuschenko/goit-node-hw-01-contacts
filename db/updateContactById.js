const fs = require("fs").promises;
const listContacts = require("./listContacts");
const contactsPath = require("./contactsPath");


const updateContactById = async(id, {name, email, phone}) => {
  const contacts = await listContacts();
  const data = {name, email, phone}
  const idx = contacts.findIndex(item => item.id === id);
  if(idx === -1){
    return null;
  }
  contacts[idx] = {id, ...data};
  await fs.writeFile(contactsPath, JSON.stringify(contacts));

  return contacts[idx];
};

module.exports = updateContactById;