const express = require('express');
const router = express.Router();
const Pet = require('../module/pet.model');
const { v4: uuidv4 } = require('uuid');
const upload = require('../middleware/uploadImg')
  



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

    res.status(200).json(newPet);

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
        return res.status(401).json({
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
     res.status(500).json({ message:'Internal server error'})
    }
});

router.put('/pet',async (req,res) =>{
    try{
        const {id, updatePetData} = req.body;

        const pet = await Pet.findOneAndUpdate(id, updatePetData, {new:true});

        if(!pet){
            return res.status(404).json({
                code: 404,
                type: 'error',
                message: 'Pet not found'
              });
        }

        res.status(200).json(pet);
    } catch (error){
        res.status(500).json({ message: 'Internal server error'});
    }
});

router.post('/pet/:id',async (req,res) =>{
    try{
        const { id } =req.params;
        const {name, status} = req.body;

        const pet = await Pet.findOne({ id });
          
        if(!pet){
            return res.status(404).json({
                code: 404,
                type: 'error',
                message: 'Invalid ID'
              });
        }
        pet.name = name;
        pet.status = status;

        await pet.save();

        res.status(200).json(pet);
    } catch (error){
        res.status(500).json({ message: 'Internal server error'});
    }
});

// Define the route handler for uploading an image
router.post('/pet/:petId/uploadImage', upload.single('image'), async (req, res) => {
    const { petId } = req.params;
    const { additionalMetadata } = req.body;
    try {
      const pet = await Pet.findOne({ id:petId });
  
      if (!pet) {
        return res.status(404).json({ message: 'Pet not found' });
      }
  
      const { filename, path } = req.file;
  
    
      const fs = require('fs');
      const destinationPath = `uploads/${filename}`;
      fs.renameSync(path, destinationPath);
  
     
      res.status(200).json({
        message: `Image uploaded successfully for pet with ID: ${petId}`,
        additionalMetadata: additionalMetadata,
        filename: filename,
        path: destinationPath
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });


module.exports = router;