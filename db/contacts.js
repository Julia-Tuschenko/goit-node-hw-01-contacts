const fs = require("fs").promises;
const {v4} = require("uuid");
const path = require("path");

const contactsPath = path.join(__dirname, "contacts.json");


const listContacts = async() => {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    return contacts;
};

const getContactById = async(id) => {
  const contacts = await listContacts();
  const result = contacts.find(item => item.id === id);
  return result ? result : null;
};
  
const addContact = async({name, email, phone}) => {
  const contacts = await listContacts();
  const data = {name, email, phone}
  const newContact = {id: v4(), ...data};
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return newContact;
};

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

  module.exports = {
    listContacts,
    getContactById,
    addContact,
    updateContactById,
    removeContact,
  }









