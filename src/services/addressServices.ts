const db = require('../Database/Models/index.ts');

export const addAddress = async (orderId: number, addressValues) => {
  try {
    const { city, phone, street, country, user_id, postal_code, address_line1, address_line2 } = addressValues;
      return await db.addresses.create({
        city: city,
        phone: phone,
        street: street,
        country: country,
        user_id: user_id,
        postal_code: postal_code,
        address_line1: address_line1,
        address_line2: address_line2,
        first_name: "first_name",
        last_name: "last_name",
        is_default: false,
      });
  } catch (error: any) {
      throw new Error(`Failed to add a new address: ${error.message}`);
  }
};

export const getAllAddresses = async (userID: number) => {
  try {
    return await db.addresses.findAll({
      where: {
        user_id: userID,
      }
    });
  } catch (error: any) {
    throw new Error(`Failed to get user ID: ${userID} addresses : ${error.message}`);
  }
};

export const getAddressById = async (addressID: number) => {
  try {
    return await db.addresses.findOne({
      where: {
        id: addressID,
      }
    });
  } catch (error: any) {
    throw new Error(`can't get the address with Id ${addressID}: ${error.message}`);
  }
};
 

export const deleteAddressById = async (userId: number, addressId: number) => {
  try {
    const addressToDelete = await db.addresses.findOne({
      where: {
        id: addressId,
        user_id: userId,
      },
    });

    if (!addressToDelete) {
      return null;
    }
    await addressToDelete.destroy();
    return addressToDelete;
  } catch (error: any) {
    throw new Error(`Error deleting address: ${error.message}`);
  }
};

export const updateAddressById = async (userId: number, addressId: number, updatedAddressData) => {
  try {
    const addressToUpdate = await db.addresses.findOne({
      where: {
        id: addressId,
        user_id: userId,
      },
    });

    if (!addressToUpdate) {
      return null;
    }
    await addressToUpdate.update(updatedAddressData);
    return addressToUpdate;
  } catch (error: any) {
    throw new Error(`Error updating address with ID ${addressId}: ${error.message}`);
  }
};


