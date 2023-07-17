const express = require('express');
const router = express.Router();
const Pet = require('../module/petModel');
const { v4: uuidv4 } = require('uuid');

  
router.post('/pet', async(req,res)=>{
    
    try{
    const{name,category,photoUrls,tags,status} = req.body;
    const id = uuidv4(); // Generate a unique ID using uuidv4()
    
    const newPet = new Pet({
        id,
        name,
        category,
        photoUrls,
        tags,
        status
        })

    await newPet.save();

    res.status(200).json(newPet)

    }catch(error){
        console.log(error)
        res.status(500).json({message:'Internal server error'});
    }

})

router.get('/pet/findByStatus', async(req,res) =>{

    try{
        const pets = await Pet.find({status:req.query.status});
        res.status(200).json(pets);
    }catch(error){
        res.status(500).json({message:'Internal server error'})
    }
})


router.get('/pet/:id',async (req,res)=>{
    try{
        const {id} = req.params;

        
    // Find the pet by ID in the database
    const pet = await Pet.findOne({ id });

    if(!pet){
        return res.status(404).json({
            code:1,
            type:'error',
            message:'Pet not found'
        }); 
    }
    res.status(200).json(pet);

    }catch(error){
     rs.status(500).json({ message:'Internal server error'})
    }
});

router.delete('/pet/:id',async (req,res)=>{
    try{
        const {id} = req.params;

        
    // Find the pet by ID in the database and delete
    const pet = await Pet.findOneAndDelete({ id });

    if(!pet){
        return res.status(404).json({
            code:1,
            type:'error',
            message:'Pet not found'
        }); 
    }
    res.status(200).json({
            code:0,
            type:'success',
            message:'Pet deleted successfully'
    });

    }catch(error){
     rs.status(500).json({ message:'Internal server error'})
    }
});



module.exports = router;