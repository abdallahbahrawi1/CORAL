import { addAddress, deleteAddressById, getAddressById, getAllAddresses, updateAddressById } from "../Services/addressServices";
import { addAddressSchema } from "../Validators/addressSchema";
export const addNewAddress = async (req, res) => {
  const { error, value } = addAddressSchema.validate(req.body);
  if(error){
    return res.status(400).json({ error: error.details[0].message });
  }
  try {

    const userID = req.session.user_id;
    const newAddress = await addAddress(value, userID);

    res.status(201).json(newAddress);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};


export const getUserAddresses = async (req, res) => {
  try {
    const userID = req.session.user_id;
    const addresses = await getAllAddresses(userID);

    res.status(200).json(addresses);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getAddressDetails = async (req, res) => {
  const addressId = req.params.addressId;
  try {
    const addressDetails = await getAddressById(addressId);

    res.status(201).json(addressDetails);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteAddress = async (req, res) => {
  const userId = req.session.user_id;
  const addressId = req.params.addressId;

  try {
    const deletedAddress = await deleteAddressById(userId, addressId);

    if (!deletedAddress) {
      return res.status(404).json({ error: 'Address not found' });
    }

    res.status(204).send(); 
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateAddress = async (req, res) => {
  const userId = req.session.user_id;
  const addressId = req.params.addressId;
  const updatedAddressData = req.body;
  try {
    const updatedAddress = await updateAddressById(userId, addressId, updatedAddressData);

    if (!updatedAddress) {
      return res.status(400).json({ error: 'Address not found' });
    }

    res.status(200).json(updatedAddress);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};