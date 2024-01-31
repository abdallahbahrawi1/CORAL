import db from '../Database/Models/index';
import { Address } from '../Interfaces/addressInterface';

export const addAddress = async (addressValues: Address, userID: number, transaction = null) => {
  try {
    const { full_name, city, phone, street, country, postal_code, address_line1, address_line2 } = addressValues;
      return await db.addresses.create({
        city: city,
        phone: phone,
        street: street,
        country: country,
        user_id: userID,
        postal_code: postal_code,
        address_line1: address_line1,
        address_line2: address_line2,
        full_name: full_name,
        is_default: false,
      }, { transaction });
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

export const getAddressById = async (addressID: number, userID:number) => {
  try {
    return await db.addresses.findOne({
      where: {
        id: addressID,
        user_id: userID,
      }
    });
  } catch (error: any) {
    throw new Error(`can't get the address with Id ${addressID}: ${error.message}`);
  }
};
 
export const deleteAddressById = async (userID: number, addressId: number) => {
  try {
    const addressToDelete = await db.addresses.findOne({
      where: {
        id: addressId,
        user_id: userID,
      },
    });

    if (!addressToDelete) {
      return null;
    }

    const ordersWithAddress = await db.orders.findOne({
      where: { address_id: addressId },
    });
    // soft delete: only delete the address from the user side, the location will be connected to the order if  there's an order, if not delete the  address completely 
    if (ordersWithAddress) {
      await addressToDelete.update({ user_id: null });
      return addressToDelete;
    } else {
      await addressToDelete.destroy();
      return addressToDelete;
    }
  } catch (error: any) {
    throw new Error(`Error deleting address: ${error.message}`);
  }
};


export const updateAddressById = async (userID: number, addressId: number, updatedAddressData: Address) => {
  try {
    const addressToUpdate = await db.addresses.findOne({
      where: {
        id: addressId,
        user_id: userID,
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


export const updatePreviousDefaultAddress = async (userID: number) => {
  try {
    await db.addresses.update({ is_default: false }, {
      where: {
        user_id: userID,
        is_default: true,
      },
    });
  } catch (error) {
    throw error; 
  }
};

export const setNewDefaultAddress = async (addressId: number) => {
  try {
    await db.addresses.update({ is_default: true }, {
      where: { id: addressId },
    });
  } catch (error) {
    throw error; 
  }
};

export const findDefaultAddress = async (userID: number) => {
  try {
    const defaultAddress = await db.addresses.findOne({
      where: {
        user_id: userID,
        is_default: true,
      },
    });

    return defaultAddress;
  } catch (error) {
    throw error;
  }
};
