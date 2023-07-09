const contactsOperations = require("../../models/contacts");

const addNewContact = async (req, res) => {
  const result = await contactsOperations.addContact(req.body);
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      result,
    },
  });
};

module.exports = addNewContact;
