const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth')
const {check,validationResul, validationResult} = require('express-validator');
const Profiles = require('../../models/Profile');   
const User = require('../../models/User');    
const config = require("config");
const request = require("request");

//@route    GET api/profile/me
//@desc     Get User Profile
//@access   Private

router.get("/me",auth,async (req,res)=>{
    try{
        const profile = await Profiles.findOne({user: req.user.id}).populate('user',["name","avatar"]);
        if(!profile){
           // console.log(req.user.id);
            res.status(400).json({msg:"Profile don't exsist......."});

        }
        res.json(profile);
    }catch(err){
        console.log(err.message);
        res.status(500).send("Server Error........")
    }
});



//@route    POST api/profile/
//@desc     Create and Update the profile of user
//@access   Private

router.post("/",[auth,[
    check('status','Status is Requried').not().isEmpty(),
    check('skills','Skills are Requried').not().isEmpty()
]],async(req,res)=>{
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }

        const {
            company,
            website,
            location,
            bio,
            status,
            githubUserName,
            skills,
            youtube,
            twitter,
            facebook,
            instagram,
            linkedin
        } = req.body;
        // Build Profile object
        const profileFields = {};
        profileFields.user = req.user.id;
        if(company) profileFields.company = company;
        if(website) profileFields.website = website;
        if(bio) profileFields.bio = bio;
        if(location) profileFields.location = location;
        if(status) profileFields.status = status;
        if(githubUserName) profileFields.githubUserName = githubUserName;
        if(skills) {
            profileFields.skills = skills.split(',').map(s=>{
               return s.trim()
            })
        }
        
        // Build Socials Object....
        profileFields.social = {};
        if(youtube) profileFields.social.youtube = youtube;
        if(twitter) profileFields.social.twitter = twitter;
        if(instagram) profileFields.social.instagram = instagram;
        if(linkedin) profileFields.social.linkedin = linkedin;
        if(facebook) profileFields.social.facebook = facebook;
        
       
        // Find Profile
        let profile = await Profiles.findOne({user: req.user.id});
        console.log(req.user.id)
        if(profile) {
            // Update
            console.log("Update")
            profile = await Profiles.findOneAndUpdate(
                {
                    user: req.user.id
                },
                {
                    $set: profileFields
                },
                {
                    new: true
                }
            )

            //await Profile.save();
            //console.log(t)
           return res.json(profile);
        }else{
             // Create
             console.log("create")
             profile = new Profiles(profileFields);
       
             await profile.save();
             return res.json(profile);


        }
       
       // res.send("Success.....");



        //res.send(req.body);
    }catch(err){
        console.log(err.message);
        res.status(500).json({msg: "Server Error......"});
    }
});

//@route    GET api/profile/
//@desc     Get all Profile
//@access   Public

router.get("/",async(req,res)=>{
    try{
        
        const profiles = await Profiles.find().populate("user",["name","avatar"]);
        res.json(profiles);
    }catch(err){
        console.log(err.message);
        res.status(500).send("Server Error.....");
    }
});

//@route    GET api/profile/user/:user_id
//@desc     Get profile by user ID
//@access   Public

router.get('/user/:user_id',async(req,res)=>{
    try{
        const profile = await Profiles.findOne({user:req.params.user_id}).populate("user",["name","avatar"]);
        
        if(!profile) return res.status(400).json({msg: "There is no profile for this User!!"});
        res.json(profile);
    }catch(err){
        console.log(err.message);
        if(err.kind == 'ObjectId') return res.status(400).json({msg: "There is no profile for this User!!"});
        res.status(500).send("Server Error......");
    }
});


//@route    Delete api/profile/
//@desc     Delete profile, user and posts
//@access   Private

router.delete("/",auth,async(req,res)=>{

    try{
        // Remove Profiles
        await Profiles.findOneAndDelete({user: req.user.id});
        // Remove Users
        await User.findOneAndDelete({_id: req.user.id});
        // Remove Posts
        res.send("Sucess!!")
    }catch(err){
        console.log(err.message);
        return res.status(500).send("Server Error........")
    }
    
});

//@route    PUT api/profile/experience
//@desc     Add profile experience
//@access   Private

router.put("/experience",[auth,[
    check('title','Title is required.......').not().isEmpty(),
    check('company','Company is required.......').not().isEmpty(),
    check('from','From Date is required.......').not().isEmpty()

]],async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.message});
    }
    try{
            const {
                title,
                company,
                location,
                from,
                to,
                current,
                description
            } = req.body;
            const newExp = {
                title,
                company,
                location,
                from,
                to,
                current,
                description
            };
            const profile = await Profiles.findOne({user: req.user.id});
            console.log(profile);
            profile.experience.push(newExp);
            profile.save()
           // console.log(t);
           res.json(profile);
    }catch(err){
        console.error(err.message);
        res.status(500).send("Server Error......");
    }
});

//@route    Delete api/profile/experience/:exp_id
//@desc     Delete profile experience
//@access   Private

router.delete('/experience/:exp_id',auth,async(req,res)=>{
    try{
        const profile = await Profiles.findOne({user: req.user.id});

        // Get remove Index
        const removeIndex = profile.experience.map(i => i.id).indexOf(req.params.exp_id);
        profile.experience.splice(removeIndex,1);
        await profile.save();
        res.json(profile)
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error.......');
    }
});


//@route    PUT api/profile/education
//@desc     Add profile education
//@access   Private

router.put("/education",[auth,[
    check('school','School is required.......').not().isEmpty(),
    check('degree','Degree is required.......').not().isEmpty(),
    check('fieldOfStudy','fieldOfStudy is required.......').not().isEmpty(),
    check('from','From Date is required.......').not().isEmpty()

]],async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.message});
    }
    try{
            const {
                school,
                degree,
                fieldOfStudy,
                from,
                to,
                current,
                description
            } = req.body;
            const newEdu = {
                school,
                degree,
                fieldOfStudy,
                from,
                to,
                current,
                description
            };
            const profile = await Profiles.findOne({user: req.user.id});
            //console.log(profile);
            profile.education.push(newEdu);
            profile.save()
           // console.log(t);
           res.json(profile);
    }catch(err){
        console.error(err.message);
        res.status(500).send("Server Error......");
    }
});

//@route    Delete api/profile/education/:edu_id
//@desc     Delete profile education
//@access   Private

router.delete('/education/:edu_id',auth,async(req,res)=>{
    try{
        const profile = await Profiles.findOne({user: req.user.id});

        // Get remove Index
        const removeIndex = profile.experience.map(i => i.id).indexOf(req.params.edu_id);
        profile.education.splice(removeIndex,1);
        await profile.save();
        res.json(profile)
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error.......');
    }
});


//@route    GET api/profile/github/:username
//@desc     Get All github repos
//@access   Public

router.get('/github/:username',(req,res)=>{
    try{
        const option = {
            uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${config.get('githubClientId')}&client_secret=${config.get('githubClientsecrets')}`,
            method: 'GET',
            headers: {'user-agent':'node.js'}
        };

        request(option,(error,response,body)=>{
            if(error) console.log(error);
            if(response.statusCode !== 200){
                return res.status(400).json({msg: "No Profile found....."});
            }
           // console.log(response,body)
            res.json(JSON.parse(body))
        })
    }catch(err){
        console.error(err.message);
        res.status(500).send("Server Error!!");
    }
})


module.exports = router;