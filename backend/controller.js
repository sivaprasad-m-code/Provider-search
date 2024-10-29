const Provider = require('./model'); 


//addproviders

const addProvider = async (req, res) => {
  try {
    const { name, address, therapyType, contactNumber, email, description, services } = req.body;
   
    const newProvider = new Provider({
      name,
      address,
      therapyType,
      contactNumber,
      email,
      description,
      services
    });
    const savedProvider = await newProvider.save();
    res.status(201).json(savedProvider);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add provider to the database.',details: err.message });
  }
};


//search providers

const getProviders = async (req, res) => {
  const { services, address, therapyType } = req.query;
  const query = {
    ...(services && { services: { $in: [services] } }), 
    ...(address && { address: { $regex: new RegExp(address, 'i') } }),
    ...(therapyType && { therapyType }) 
  };

  try {
    const providers = await Provider.find(query);
    
    if (providers.length === 0) {
      return res.status(404).json({ message: 'No providers found' });
    }
    res.json(providers.map(provider => ({
      id: provider._id,
      name: provider.name,
      address: provider.address,
      therapyType: provider.therapyType,
      services: provider.services
    })));
  } catch (error) {
    console.error('Error fetching providers:', error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};







module.exports = { addProvider,getProviders };
