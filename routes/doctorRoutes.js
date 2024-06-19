const express = require('express');
const router = express.Router();
const Doctor = require('../Modal/Doctor');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cloudinary = require('cloudinary').v2;


router.post('/signup', async (req, res) => {
    const file = req.files?.file ?? null;
    if (!file) {
        return res.status(500).json({ error: 'Error file is null' });
    }
    cloudinary.uploader.upload(file.tempFilePath, async (err, result) => {
        if (err) {
            console.error('Error uploading to Cloudinary:', err);
            return res.status(500).json({ error: 'Error uploading to Cloudinary' });
        }
        const found = await Doctor.findOne({email:req.body.email});
        if(found){
            return res.status(400).json({message:'doctor already exist'})
        }
        const newDoctor = new Doctor({
            name: req.body.name,
            email: req.body.email,
            specialization: req.body.specialization,
            college_name: req.body.college,
            experience: req.body.experience,
            image: result.secure_url,
        });
        newDoctor.save()
            .then(result => {
                const data={
                    user:{
                        id:newDoctor._id
                    }
                }
                const token = jwt.sign(data,process.env.secret_key)
                res.json({
                    success:true,
                    token
                })
            })
            .catch(err => {
                console.error(err);
                res.status(500).json({
                    error: 'Error saving doctor to the database.',
                });
            });
    });
});

router.post('/login',async(req,res)=>{
    console.log('hey');
    const {email}=req.body;
    try{
        const found = await Doctor.findOne({email:email});
        if(!found){
            return res.status(400).json({message:"user not found"})
        }
           const data = {
            user:{
                id:found._id
            }
        }
           const token = jwt.sign(data,process.env.secret_key);
           console.log(token);
           res.json({success:true,token});
        }
    catch(error){
        console.log(error);
        res.status(500).json({message:"error", details: error });
    }
})
router.get('/listdoctor',async (req,res)=>{
    try{
      const allDoctor = await Doctor.find();
      res.status(200).json(allDoctor);
    }catch(error){
      console.log(error);
      res.status(500).json({error:'Error in fetching Doctor from the database.'})
    }
})

module.exports = router;