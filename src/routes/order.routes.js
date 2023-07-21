const express = require('express');
const router = express.Router();
const StoreOrder = require('../module/order.Model');
const { v4: uuidv4 } = require('uuid');

router.post('/store/order', async(req,res) =>{
    try{
        const { petId, quantity, shipDate, status, complete } = req.body;
        const id = uuidv4(); // Generate a unique ID using uuidv4()
    
        const newOrder = new StoreOrder({
            id,
            petId,
            quantity,
            shipDate,
            status,
            complete
        });

        await newOrder.save();
        res.status(200).json(newOrder);
    }catch(error){
        console.log(error)
        res.status(500).json({message:'Internal server error'});
    }
    
})

router.get('/store/order/:orderId',async (req,res) =>{
    try{
        const { orderId } = req.params;

        const order = await StoreOrder.findOne({ id : orderId });

        if(!order){
            return res.status(404).json({
                code:404,
                type:'error',
                message: 'Order not found'
            })
        }
        res.status(200).json(order);
    }catch(error){
    res.status(500).json({ message:'Internal server error'})
    }
})

router.delete('/store/order/:orderId', async (req, res) => {
    try {
      const { orderId } = req.params;
  
      const order = await StoreOrder.findOneAndDelete({ id: orderId });
  
      if (!order) {
        return res.status(404).json({
          code: 1,
          type: 'error',
          message: 'Order not found'
        });
      }
  
      res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });


  router.get('/store/inventory', async (req, res) => {
    try {
      const inventory = await StoreOrder.aggregate([
        {
          $group: {
            _id: '$status',
            count: { $sum: 1 }
          }
        }
      ]);
      const formattedInventory = {
        sold: 0,
        new: 0,
        string: 0,
        pending: 0,
        available: 0,
        Available: 0,
        'QA doggie': 0,
        returned: 0,
        peric: 0
      };
      inventory.forEach(item => {
        const { _id, count } = item;
        formattedInventory[item._id] = item.count;
      });
  
      res.status(200).json(formattedInventory);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  


module.exports = router;