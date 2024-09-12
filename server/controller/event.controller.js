const eventSchema = require('../model/events');
const Event = require('../model/events');
const userSchema = require('../model/user');

// Create Event
const createEvent = async (req, res) => {
  const { title, description, date } = req.body;
  try {
    const event = await Event.create({ title, description, date, user: req.userId });
    res.status(201).json(event);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Failed to create event" });
  }
};

const viewEvents = async(req,res)=>{
    try{
    const events = await eventSchema.find()
    res.status(201).json(events);
    }catch(error){
        res.status(400).json({ message: "Failed to Fetch event" });

    }
}

// Get User Events
const getUserEvents = async (req, res) => {
  try {
    const events = await Event.find({ user: req.userId });
    res.status(200).json(events);
  } catch (error) {
    res.status(400).json({ message: "Failed to fetch events" });
  }
};

// Update Event

const updateEvent = async (req, res) => {
    const userId = req.userId
  try {
    const { eventId } = req.params; // Extract the eventId from the request parameters
    const eventData = req.body; // Get the updated event data from the request body

    // Find the event by ID
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    // Check if the current user is the owner of the event
    if (event.user._id.toString() !== userId) {
        console.log(event.user._id);
        console.log(userId);
      return res.status(401).json({ error: 'You are not authorized to update this event' });
    }

    // Update the event
    const updatedEvent = await Event.findByIdAndUpdate(eventId, eventData, { new: true });

    res.status(200).json(updatedEvent);
  } catch (error) {
    console.error('Error updating event:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


// Delete Event
const deleteEvent = async (req, res) => {
    const userId = req.userId
  try {
    const { eventId } = req.params; // Extract the eventId from the request parameters
    const eventData = req.body; // Get the updated event data from the request body

    // Find the event by ID
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    // Check if the current user is the owner of the event
    if (event.user._id.toString() !== userId) {
        console.log(event.user._id);
        console.log(userId);
      return res.status(401).json({ error: 'You are not authorized to update this event' });
    }

    // delete the event
    const deletedEvent = await Event.findByIdAndDelete(eventId);

    res.status(200).json(deleteEvent);
  } catch (error) {
    console.error('Error updating event:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { createEvent, getUserEvents, updateEvent, deleteEvent, viewEvents };
