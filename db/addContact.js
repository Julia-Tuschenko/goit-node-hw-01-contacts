const fs = require("fs").promises;
const {v4} = require("uuid");
const listContacts = require("./listContacts");
const contactsPath = require("./contactsPath");

const addContact = async({name, email, phone}) => {
  const contacts = await listContacts();
  const data = {name, email, phone}
  const newContact = {id: v4(), ...data};
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return newContact;
};

module.exports = addContact;