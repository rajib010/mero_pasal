import { Order } from "../models/order.js";


const getAllOrders= async(req,res)=>{
    try {
    const { 
      userId, 
      orderStatus, 
      paymentStatus, 
      page = 1, 
      limit = 10,
      sortBy = 'orderDate',
      sortOrder = 'desc'
    } = req.query;

    // Build filter object
    const filter = {};
    
    if (userId) {
      filter.userId = userId;
    }
    
    if (orderStatus) {
      filter.orderStatus = orderStatus;
    }
    
    if (paymentStatus) {
      filter.paymentStatus = paymentStatus;
    }

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    // Sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Get orders from database
    const orders = await Order
      .find(filter)
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit))
      .toArray();

    // Get total count for pagination
    const totalOrders = await Order.countDocuments(filter);
    
    const totalPages = Math.ceil(totalOrders / parseInt(limit));

    res.status(200).json({
      success: true,
      data: {
        orders,
        pagination: {
          currentPage: parseInt(page),
          totalPages,
          totalOrders,
          hasNextPage: parseInt(page) < totalPages,
          hasPrevPage: parseInt(page) > 1
        }
      }
    });

  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch orders',
      error: error.message
    });
  }
}

const getOrderById=async(req,res)=>{
    try {
    const { id } = req.params;

    // Validate ObjectId
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid order ID format'
      });
    }

    const order = await Order.findOne({ 
      _id: new ObjectId(id) 
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.status(200).json({
      success: true,
      data: order
    });

  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch order',
      error: error.message
    });
  }
}

const getOrderByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const { 
      orderStatus, 
      paymentStatus, 
      page = 1, 
      limit = 10,
      sortBy = 'orderDate',
      sortOrder = 'desc'
    } = req.query;

    // Build filter object
    const filter = { userId };
    
    if (orderStatus) {
      filter.orderStatus = orderStatus;
    }
    
    if (paymentStatus) {
      filter.paymentStatus = paymentStatus;
    }

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    // Sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const orders = await Order
      .find(filter)
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit))
      .toArray();

    const totalOrders = await Order.countDocuments(filter);
    const totalPages = Math.ceil(totalOrders / parseInt(limit));

    res.status(200).json({
      success: true,
      data: {
        orders,
        pagination: {
          currentPage: parseInt(page),
          totalPages,
          totalOrders,
          hasNextPage: parseInt(page) < totalPages,
          hasPrevPage: parseInt(page) > 1
        }
      }
    });

  } catch (error) {
    console.error('Error fetching user orders:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch user orders',
      error: error.message
    });
  }
}

const updateOrderstatus=async (req, res) => {
  try {
    const { id } = req.params;
    const { orderStatus, paymentStatus } = req.body;

    // Validate ObjectId
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid order ID format'
      });
    }

    // Validate order status
    const validOrderStatuses = [
      'Pending', 
      'Confirmed', 
      'Processing', 
      'Shipped', 
      'Delivered', 
      'Cancelled',
      'Returned'
    ];
    
    const validPaymentStatuses = [
      'Pending', 
      'Paid', 
      'Failed', 
      'Refunded'
    ];

    if (orderStatus && !validOrderStatuses.includes(orderStatus)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid order status',
        validStatuses: validOrderStatuses
      });
    }

    if (paymentStatus && !validPaymentStatuses.includes(paymentStatus)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid payment status',
        validStatuses: validPaymentStatuses
      });
    }

    // Build update object
    const updateData = {
      orderUpdateDate: new Date()
    };

    if (orderStatus) {
      updateData.orderStatus = orderStatus;
    }

    if (paymentStatus) {
      updateData.paymentStatus = paymentStatus;
    }

    // Update the order
    const result = await Order.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Get the updated order
    const updatedOrder = await Order.findOne({ 
      _id: new ObjectId(id) 
    });

    res.status(200).json({
      success: true,
      message: 'Order status updated successfully',
      data: updatedOrder
    });

  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update order status',
      error: error.message
    });
  }
}

export {getAllOrders, getOrderById, updateOrderstatus, getOrderByUserId}