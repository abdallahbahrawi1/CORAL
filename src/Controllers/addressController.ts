import { addAddress, deleteAddressById, findDefaultAddress, getAddressById, getAllAddresses, setNewDefaultAddress, updateAddressById, updatePreviousDefaultAddress } from "../Services/addressServices";
import { addAddressSchema, updateAddressSchema } from "../Validators/addressSchema";
import { idSchema } from "../Validators/idParamsSchema";

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
    console.error(error.message)
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


export const getUserAddresses = async (req, res) => {
  try {
    const userID = req.session.user_id;
    const addresses = await getAllAddresses(userID);

    res.status(200).json(addresses);
  } catch (error: any) {
    console.error(error.message)
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getAddressDetails = async (req, res) => {
  
  const { error, value: addressId } = idSchema.validate(req.params.addressId);
  if(error){
    return res.status(400).json({ error: error.details[0].message});
  }
  const userID = req.session.user_id;

  try {
    const addressDetails = await getAddressById(addressId, userID);

    res.status(200).json(addressDetails);
  } catch (error: any) {
    console.error(error.message)
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const deleteAddress = async (req, res) => {
  const userID = req.session.user_id;
  const { error, value: addressId } = idSchema.validate(req.params.addressId);
  if(error){
    return res.status(400).json({ error: error.details[0].message});
  }

  try {
    const deletedAddress = await deleteAddressById(userID, addressId);

    if (!deletedAddress) {
      return res.status(404).json({ error: 'Address not found' });
    }

    res.status(204).send({ success: true }); 
  } catch (error: any) {
    console.error(error.message)
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const updateAddress = async (req, res) => {
  const userID = req.session.user_id;

  const { error, value: addressId } = idSchema.validate(req.params.addressId);
  if(error){
    return res.status(400).json({ error: error.details[0].message});
  }
  
  const { error: updatedAddressError, value: updatedAddressData } = updateAddressSchema.validate(req.body);
  if(updatedAddressError){
    return res.status(400).json({ error: updatedAddressError.details[0].message});
  }
  try {
    const updatedAddress = await updateAddressById(userID, addressId, updatedAddressData);

    if (!updatedAddress) {
      return res.status(400).json({ error: 'Address not found' });
    }

    res.status(200).json(updatedAddress);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const setAddressDefault = async (req, res) => {
  const { error, value: addressId } = idSchema.validate(req.params.addressId);
  if(error){
    return res.status(400).json({ error: error.details[0].message});
  }

  const userID = req.session.user_id;
  try {
    const address = await getAddressById(addressId, userID);

    if (!address) {
      return res.status(404).json({ error: 'Address not found' });
    }

    await updatePreviousDefaultAddress(address.user_id);
    await setNewDefaultAddress(addressId);

    return res.status(200).json({ message: 'Default address set successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getDefaultAddress = async (req, res) => {
  const userID = req.session.user_id;

  try {
    const defaultAddress = await findDefaultAddress(userID);
    console.log(defaultAddress)
    if (!defaultAddress) {
      return res.status(404).json({ error: 'Default address not found' });
    }

    return res.status(200).json(defaultAddress);
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};