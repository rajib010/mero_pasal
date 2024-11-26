import { Router } from 'express'
import { addAddress, getUserAddress, updateAddress, deleteAddress } from '../controllers/address.js';

const addressRouter = new Router();

addressRouter.post('/add-address', addAddress)
addressRouter.get('/get-address/:userId', getUserAddress)
addressRouter.put('/update-address/:userId/:addressId', updateAddress)
addressRouter.delete('/delete-address/:userId/:addressId', deleteAddress)

export default addressRouter