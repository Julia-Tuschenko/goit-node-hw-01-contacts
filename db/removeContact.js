const fs = require("fs").promises;
const listContacts = require("./listContacts");
const contactsPath = require("./contactsPath");

const removeContact = async(id) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex(item => item.id === id);
  if(idx === -1){
    return null;
  }

  const newContacts = contacts.filter((_, index) => index !== idx);
  await fs.writeFile(contactsPath, JSON.stringify(newContacts));
  return contacts[idx]; 
};


module.exports = removeContact;