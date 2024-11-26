import { isValidObjectId } from "mongoose";
import { Address } from "../models/address.js";

const addAddress = async (req, res) => {
    try {
        const { userId, address, city, pincode, phone, notes } = req.body;
        if (!userId || !address || !city || !pincode || !phone || !notes) {
            throw new Error("Missing required fields: userId, address, city, pincode, phone, notes.");
        }

        const newAddress = await Address.create({ userId, address, city, pincode, phone, notes });

        if (!newAddress) throw new Error('Unable to add new address');

        return res.status(200).json({
            success: true,
            message: "Address added successfully",
            data: newAddress,
        });
    } catch (error) {
        console.error(error.stack || error);
        return res.status(500).json({
            success: false,
            message: error?.message || "Error adding address",
        });
    }
};

const getUserAddress = async (req, res) => {
    try {
        const { userId } = req.params;

        if (!isValidObjectId(userId)) {
            throw new Error("Invalid user ID");
        }

        const userAddress = await Address.find({ userId });

        if (!userAddress || userAddress.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No address found for this user",
            });
        }

        return res.status(200).json({
            success: true,
            message: "User address fetched successfully",
            data: userAddress,
        });
    } catch (error) {
        console.error(error.stack || error);
        return res.status(500).json({
            success: false,
            message: error?.message || "Error getting address",
        });
    }
};

const updateAddress = async (req, res) => {
    try {
        const { userId, addressId } = req.params;
        const formData = req.body;

        if (!isValidObjectId(userId) || !isValidObjectId(addressId)) {
            throw new Error("Invalid ID of user or address");
        }

        const address = await Address.findOneAndUpdate(
            { _id: addressId, userId },
            formData,
            { new: true }
        );

        if (!address) {
            return res.status(404).json({
                success: false,
                message: "Cannot find address",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Address updated successfully",
            data: address,
        });
    } catch (error) {
        console.error(error.stack || error);
        return res.status(500).json({
            success: false,
            message: error?.message || "Error editing address",
        });
    }
};

const deleteAddress = async (req, res) => {
    try {
        const { userId, addressId } = req.params;

        if (!isValidObjectId(userId) || !isValidObjectId(addressId)) {
            throw new Error("Invalid ID of user or address");
        }

        const address = await Address.findOneAndDelete({ _id: addressId, userId });

        if (!address) {
            throw new Error("Cannot delete the address");
        }

        return res.status(200).json({
            success: true,
            message: "Address deleted successfully",
        });
    } catch (error) {
        console.error(error.stack || error);
        return res.status(500).json({
            success: false,
            message: error?.message || "Error deleting address",
        });
    }
};

export { addAddress, getUserAddress, deleteAddress, updateAddress };
