const Feedback = require('../models/Feedback');
const Contact = require('../models/Contact');

exports.submitFeedback = async (req, res) => {
  const { name, email, message } = req.body;
  try {
    const feedback = await Feedback.create({ name, email, message });
    res.status(201).json({ message: 'Feedback submitted successfully', feedback });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.submitContact = async (req, res) => {
  const { name, email, message } = req.body;
  try {
    const contact = await Contact.create({ name, email, message });
    res.status(201).json({ message: 'Contact message submitted successfully', contact });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const User = require('../models/User');
const Note = require('../models/Note');

exports.getDebugData = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    const notes = await Note.find();
    const feedback = await Feedback.find();
    const contacts = await Contact.find();
    res.json({ users, notes, feedback, contacts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
