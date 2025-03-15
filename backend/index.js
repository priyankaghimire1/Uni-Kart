const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const bcrypt = require('bcrypt'); // Add bcrypt for password hashing
const nodemailer = require('nodemailer');
const saltRounds = 10; // Define salt rounds for bcrypt

const storage = multer.diskStorage({
  destination: (req, file, cb)=> {
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  },
});
const upload = multer({ storage: storage });

const server = express();
server.use(bodyParser.json());
server.use('/uploads', express.static(path.join(__dirname, 'uploads')));
server.use(cors());
server.use(express.json());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));

main().catch(err => console.log(err));
const presetImageUrls = {
  1: '/Images/avatar1.jpg',
  2: '/Images/avatar2.jpg',
  3: '/Images/avatar3.jpg'
};

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/demo');
  //console.log('db connected');
}

const Users = mongoose.model('Users', {
  username: { type: String, required: true, unique: true },
  password:  { type: String, required: true },
  name:  { type: String, required: true },
  number:  { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  otp:String,
  otpExpires:Date,
  verificationCode: String,
  profilePicId: String, // New field for profile picture path
  favourites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Products' }],
  cart:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Products' }]
});

const Products = mongoose.model('Products', {
  pname: String,
  pdesc: String,
  price: String,
  category: String,
  subCategory: String,
  pimage: String,
  swap: Boolean,
  userId: String,
  buyer: String,
  isSold: { type: Boolean, default: false },
  isSwapaccepted:  { type: Boolean, default: false },
  isSwapdisplay: { type: Boolean, default: false },
  swapproduct: String
});
// Configure nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'Gmail', // Or use your email provider
  auth: {
    user: 'renaijunkan@gmail.com', // Replace with your email
    pass: 'fgym phle lzpf tsji', // Replace with your email password or app password
  },
  logger: true, // Enable logging
  debug: true   // Show debug output
});
server.post('/signup', async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const name=req.body.namee;
  const number=req.body.number;
  const profilePicId=req.body.profilePicId;
  console.log(profilePicId);
  try {
    const existingUser = await Users.findOne({ username });
    if (existingUser) {
      return res.status(210).send({ message: 'User already exists' });
    }
    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const verificationCode = Math.floor(1000 + Math.random() * 9000).toString(); // Generate a 4-digit code
    let profilePicPath = null;
    let finalProfilePicId = null;
    if (profilePicId && presetImageUrls[profilePicId]) {
      finalProfilePicId = profilePicId; // Store the preset image ID
    }
  // } else if (req.file) {
  //     // profilePicPath = req.file.path; // Store the uploaded file path
  //     profilePicPath = req.file.path.replace(/\\/g, '/');//change 1
  // }
    const user = new Users({
      username: username,
      password: hashedPassword,
      isVerified: false,
      verificationCode:verificationCode,
      name: name,
      number: number,
      profilePicId: finalProfilePicId,  // Stores preset image ID
    });

    await user.save();

    // const mailOptions = {
    //   from: 'unikart447@gmail.com',
    //   to:username,
    //   subject: 'Email Verification',
    //   text: `Your verification code is: ${verificationCode}`,
    // };
    const mailOptions = {
      from: 'renaijunkan@gmail.com',
      to:username,
      subject: 'Email Verification',
      //text: `Your verification code is: ${verificationCode}`,
      html: `<!DOCTYPE html>
<html lang="en" >
<head>
  <meta charset="UTF-8">
  <title>CodePen - OTP Email Template</title>
  

</head>
<body>
<!-- partial:index.partial.html -->
<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
  <div style="margin:50px auto;width:70%;padding:20px 0">
    <div style="border-bottom:1px solid #eee">
      <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">UNI-KART</a>
    </div>
    <p style="font-size:1.1em">Hi,</p>
    <p>Thank you for choosing UNI-KART. Use the following OTP to complete your Account creation procedure.</p>
    <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${verificationCode}</h2>
    <p style="font-size:0.9em;">Regards,<br />UNI-KART</p>
    <hr style="border:none;border-top:1px solid #eee" />
    <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
      <p>Uni-kart</p>
      <p>Kathmandu University</p>
      <p>Dhulikhel</p>
    </div>
  </div>
</div>
<!-- partial -->
  
</body>
</html>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        //console.error(error);
        return res.status(500).send({ message: 'Error sending verification email' });
      }
      console.log('Email sent: ' + info.response);
      res.status(200).send({ message: 'Verification code sent to email.' });
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Server error' });
  }});

  server.post('/forgot-password',async(req, res)=>{
    const{username}=req.body;
    try{
      const user=await Users.findOne({username});
      if(!user){
        return res.send({Status:"Fail",message:"User not found"})
      }
     
      //const token = jwt.sign({ userId: user._id },"jwt_secret_key",{expiresIn:"1d"})
      const verificationCode = Math.floor(1000 + Math.random() * 9000).toString(); // Generate a 4-digit code
      user.otp=verificationCode;
      user.otpExpires = Date.now() + 10 * 60 * 1000; // OTP valid for 10 minutes
      await user.save();
      // Send email for otp
  
  
        const mailOptions = {
          from: 'renaijunkan@gmail.com',
          to:username,
          subject: 'Reset your password',
          //text: `http://localhost:3000/reset-password/${user._id}/${token}`,
          html: `<!DOCTYPE html>
  <html lang="en" >
  <head>
    <meta charset="UTF-8">
    <title>CodePen - OTP Email Template</title>
    
  
  </head>
  <body>
  <!-- partial:index.partial.html -->
  <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
    <div style="margin:50px auto;width:70%;padding:20px 0">
      <div style="border-bottom:1px solid #eee">
        <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">UNI-KART</a>
      </div>
      <p style="font-size:1.1em">Hi,</p>
      <p>Thank you for choosing UNI-KART. Use the following OTP to change your password.It is valid for 10 minutes.</p>
      <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${verificationCode}</h2>
      <p style="font-size:0.9em;">Regards,<br />UNI-KART</p>
      <hr style="border:none;border-top:1px solid #eee" />
      <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
        <p>Uni-kart</p>
        <p>Kathmandu University</p>
        <p>Dhulikhel</p>
      </div>
    </div>
  </div>
  <!-- partial -->
    
  </body>
  </html>`,
        };
    
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error(error);
            return res.status(500).send({ message: 'Error sending email' });
          }
          console.log('Email sent: ' + info.response);
          return res.send({Status:"Success", message:"Email sent successfully!"});
        });
    }
    catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Server error' });
    }
  
  })
  server.post("/verify-otp", async (req, res) => {
    const { username, verificationCode } = req.body;
    try {
      const user = await Users.findOne({ username });
      if (!user || user.otp !== verificationCode || Date.now() > user.otpExpires) {
        return res.status(400).json({ message: "Invalid or expired OTP" });
      }
  
      // Allow the user to reset the password
      res.status(200).json({ message: "OTP verified successfully", userId: user._id });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });
  server.post("/reset-password", async (req, res) => {
    
  
    try {
      console.log("Received request:", req.body); // Add this
    const { username, newPassword } = req.body;
      const user = await Users.findOne({username});
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Hash the new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);
     user.password=hashedPassword;
      user.otp = null; // Clear OTP
      user.otpExpires = null;
      await user.save();
  
      res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

server.post('/verify-email', async (req, res) => {
  const { username, verificationCode } = req.body;
  try {
    const user = await Users.findOne({ username });
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    if (user.verificationCode === verificationCode) {
      user.isVerified = true;
      user.verificationCode = null; // Clear the code after successful verification
      await user.save();
      res.status(200).send({ message: 'Email verified successfully' });
    } else {
      res.status(400).send({ message: 'Invalid verification code' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Server error' });
  }
});
server.post('/login', async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    const user = await Users.findOne({ username: username });

    if (!user) {
      return res.send({ message: 'User not found' });
    }
    if (!user.isVerified) {
      return res.send({ message: 'Please verify your email before logging in.' });
    }
    // Compare the provided password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = jwt.sign(
        { data: user },
        'MYKEY',
        { expiresIn: '1h' }
      );
      res.send({ message: 'Login success', token: token, userId: user._id });
    } else {
      res.send({ message: 'Password is incorrect' });
    }
  } catch (err) {
    res.status(500).send({ message: 'Server error' });
  }
});
server.post('/add-product', upload.single('pimage'), (req, res) => {
  //console.log(req.body);
  //console.log(req.file.path);
  const pname = req.body.pname;
  const pdesc = req.body.pdesc;
  const price = req.body.price;
  const category = req.body.category;
  const subCategory = req.body.subCategory;
  const pimage = req.file.path;
  const swap = req.body.swap;
  const userId=req.body.userId;
  const buyer="";
  const swapproduct="";
  const product = new Products({
    pname,
    pdesc,
    price,
    category,
    subCategory,
    pimage,
    swap,
    userId,
    buyer,
    swapproduct
  });
  product.save().then(() => {
    res.send({ message: `Your product "${pname}" has been added sucessfully. ^ ^~` });
  })
  .catch(() => {
    res.send({ message: 'Server error' });
  });
});
server.get('/get-products', (req, res) => {
  Products.find({isSold: false})
    .then((result) => {
      //console.log(result, "product data");
      res.status(200).send({ message: 'Products found', products: result });
    })
    .catch((err) => {
      res.status(500).send({ message: 'Server error' });
    });
});
server.post('/like-product', async(req, res) => {
  // let productId = req.body.productId;
  // let userId = req.body.userId;
  // Users.updateOne({ _id: userId }, { $addToSet: { favourites: productId } })
  //   .then(() => {
  //     res.status(200).send({ message: 'Favourites are saved' });
  //   })
  //   .catch(() => {
  //     res.status(500).send({ message: 'Server error' });
  //   });
    const { userId, productId } = req.body;
      try {
        const user = await Users.findById(userId);
        if (!user) {
          return res.status(404).send({ success: false, message: 'User not found' });
        }
    
        // Toggle like/unlike logic
        const productIndex = user.favourites.indexOf(productId);
    
        if (productIndex > -1) {
          // Product already liked, so unlike it
          user.favourites.splice(productIndex, 1);
          await user.save();
          return res.status(200).send({ success: true, message: 'Product unliked', favourites: user.favourites });
        } else {
          // Product not liked, so like it
          user.favourites.push(productId);
          await user.save();
          return res.status(200).send({success: true,  message: 'Product liked', favourites: user.favourites });
        }
      } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Server error' });
      }
  });
server.post('/liked-products', (req, res) => {
  Users.findOne({ _id: req.body.userId }).populate('favourites')
    .then((result) => {
      res.status(200).send({ message: 'Products found', products: result.favourites });
    })
    .catch((err) => {
      res.status(500).send({ message: 'Server error' });
    });
});
server.post('/change-password', async (req, res) => {
  try {
    const { id, oldpassword, newPassword } = req.body;
    const user = await Users.findOne({ _id: id });

    if (!user) {
      return res.send({ message: 'User not found' });
    }
    const isMatch = await bcrypt.compare(oldpassword, user.password);

    if (!isMatch) {
      return res.send({ message: 'Current password is incorrect' });
    }
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
      await Users.updateOne(
      { _id: id },
      { $set: { password: hashedPassword } }
    );
    res.send({ message: 'Password changed successfully' });
  } catch (err) {
    res.send({ message: 'Server error' });
  }
});


server.post('/get-user', async (req, res) => {
  Users.findOne({_id:req.body.userId})
  .then((result) => {
    res.send({username: result.name, email: result.username, photo:result.profilePicId });
  })
  .catch((err) => {
    res.status(500).send({ message: 'Server error' });
  });
});
server.post('/my-items',  async (req, res) => {
  try {
    //console.log(req.body.userId);
    const userItems = await Products.find(
    { userId: req.body.userId });
    //console.log(userItems);
    const buyerIds = userItems.map(order => order.buyer).filter(buyer => buyer && mongoose.Types.ObjectId.isValid(buyer));
    //console.log(buyerIds);
    const buyers= await Users.find( { _id: { $in: buyerIds } });
    //console.log(buyers);
    const buyerInfo = buyers.map(buyer => ({
      _id: buyer._id,
      name: buyer.name, // replace 'name' with the actual attribute you want
      username: buyer.username, // replace 'email' with the actual attribute you want
      number: buyer.number,
    }));
    res.send({ message: "Orders" ,myItems: userItems, buyers: buyerInfo });
    
  }
  catch (error) {
    console.error('Error fetching orders or users:', error);
    res.status(500).send({ message: 'Server error' });
}
});
server.get('/get-product/:pid', (req, res)=>{
  Products.findOne({ _id: req.params.pid })
  .then((result) => {
    res.send({ message: 'Products found', product: result });
  })
  .catch((err) => {
    res.send({ message: 'Server error' });
  });
});
server.get('/search',(req,res)=>{
  let search = req.query.search;
  Products.find({
  $or:[           //check for multiple criterias with dollar or in mongodb
 {pname:{$regex:search}},
 {pdesc:{$regex:search}},
 {price:{$regex:search}}
 ],
  })
  .then((results)=>{
    //console.log(result,"user data")
    res.status(200).send({message:'success',products:results})

  })
.catch((err)=>{
  res.send({message:'server err'})
})
})
server.get('/apply',async(req,res)=>{
  // const maincategory = req.query.mainCategory; 
  // const subCategory = req.query.subCategory;
  const maincategory = [].concat(req.query.mainCategory || []);
  const subCategory = [].concat(req.query.subCategory || []);
  const swap=req.query.swap;
  //console.log(maincategory);
  //console.log(subCategory);
  //console.log(swap);
  // if(swap && !maincategory && !subCategory){
  if (swap==='true') {
    if(maincategory.length === 0 && subCategory.length === 0){
      await Products.find({ swap: swap, isSold: false} )
    .then((results)=>{
    //console.log(1);
    res.status(200).send({message:'success',products:results})})
  .catch((err)=>{
    res.send({message:'server err'})
})}
    else if(maincategory || subCategory){
      await Products.find({
        $and: [
          { swap: swap , isSold: false},  // Ensure 'swap' condition is always applied
          {
            $or: [
              { category: { $in: maincategory } },
              { subCategory: { $in: subCategory } }
            ]
          }
        ]
      })
        .then((results)=>{
          //console.log(2);
          res.status(200).send({message:'success',products:results})
      
        })
      .catch((err)=>{
        res.send({message:'server err'})
      })
    }
    }
else if(swap==="false"){
  //   await Products.find({
  //   $or: [
  //     { category: { $in: maincategory } },
  //     { subCategory: { $in: subCategory } }
  //   ]
  // })
  await Products.find({
    $and: [
      {
        $or: [
          { category: { $in: maincategory } },
          { subCategory: { $in: subCategory } }
        ]
      },
      { isSold: false }
    ]
  })
  .then((results)=>{
    //console.log(3);
    res.status(200).send({message:'success',products:results})

  })
.catch((err)=>{
  res.send({message:'server err'})
})
}
}
)
server.post('/delete-product',(req,res)=>{
  const pid = req.body.pid;
  const userId=req.body.userId;
  Products.findOne({_id: pid})
  .then((result)=>{
    if(result.userId===userId){
      Products.deleteOne({_id:pid})
      .then((deleteresult)=>{
        if(deleteresult.acknowledged){
          res.send({message: "Deleted succesfully"});
        }
      })
      .catch((err)=>{
        res.send({message:'server err'})
      })
    }
  })

})
server.post('/edit-product', upload.single('pimage'), (req, res) => {
  const pid=req.body.pid;
  const pname = req.body.pname;
  const pdesc = req.body.pdesc;
  const price = req.body.price;
  const category = req.body.category;
  const subCategory = req.body.subCategory;
  let pimage='';
  if (req.file&& req.file.path){
  pimage = req.file.path;
  }
  const swap = req.body.swap;
  const userId=req.body.userId;
  let editObj={};
  if (pname){
    editObj.pname=pname;
  }
  if (pname){
    editObj.pdesc =pdesc;
  }
  if (price){
    editObj.price =price;
  }
  if (category){
    editObj.category =category;
  }
  if (subCategory){
    editObj.subCategory =subCategory;
  }
  if(pimage){
    editObj.pimage=pimage;
  }
  if (swap){
    editObj.swap=swap;
  }

 Products.updateOne({_id: pid},editObj)

  .then((result) => {
   res.send({ message: 'Update saved', product: result});
  })
  .catch(() => {
    res.send({ message: 'Server error' });
  });
});
server.get('/add-to-cart',async(req,res)=>{
  const userId=req.query.userId;
  const pid=req.query.pid;
  await Products.updateOne({_id: pid}, {$set:{ isSwapdisplay: false}});
  Users.updateOne({ _id: userId }, { $addToSet: { cart: pid } })
    .then(() => {
      res.status(200).send({ message: 'Added to Cart' });
    })
    .catch(() => {
      res.status(500).send({ message: 'Server error' });
    });
})
server.get('/cart',(req,res)=>{
  const userId=req.query.userId;
  Users.findOne({ _id: userId }).populate( {path: 'cart',
    match: { isSold: false, isSwapaccepted: false}})
  .then((result) => {
    res.status(200).send({ message: 'Products found', product: result.cart });
  })
  .catch((err) => {
    res.status(500).send({ message: 'Server error' });
  });
    
  })
server.get('/remove-from-cart',(req,res)=>{
    const pid=req.query.pid;
    const userId=req.query.userId;
    

  Users.updateOne({ _id: userId }, { $pull: { cart: pid } })
  .then(() => {
    res.status(200).send({ message: 'Removed from Cart' });
  })
  .catch(() => {
    res.status(500).send({ message: 'Server error' });
  });
})
server.get('/proceed',(req,res)=>{
  const pids = req.query.pids;
  const userId=req.query.userId;
  Products.updateMany(
    { _id: { $in: pids} },
    { $set: { 
      isSold: true, 
      buyer: userId,}}
  )

  .then((deleteresult) => {
      res.send({ message: "Proceed" });
  })
  .catch((err) => {
    res.status(500).send({ message: "Server error", error: err.message });
  })
 
})
server.post('/my-orders', async (req, res) => {
  //console.log(req.body.userId);
  try {
    const userOrders = await Products.find({
      buyer: req.body.userId, // Match the buyer with the given userId
      $or: [
        { isSold: true },   // First condition for OR
        { isSwapaccepted: true } // Second condition for OR
      ]
    });
    const userIds = userOrders.map(order => order.userId);
    //console.log(userIds);
    const sellers= await Users.find( { _id: { $in: userIds } });
    // console.log(sellers);
    const sellerInfo = sellers.map(seller => ({
      _id: seller._id,
      name: seller.name, // replace 'name' with the actual attribute you want
      username: seller.username, // replace 'email' with the actual attribute you want
      number: seller.number,
    }));
    res.send({ message: "Orders" ,myOrders: userOrders, users: sellerInfo });
    
  }
  catch (error) {
    console.error('Error fetching orders or users:', error);
    res.status(500).send({ message: 'Server error' });
}
});
server.post('/my-orders-cancel', async (req, res) => {
  //console.log(req.body.productid);
  Products.updateOne(
    { _id: req.body.productid },
    { $set: { 
      isSold: false, 
      buyer: "",}}
  )
  .then((deleteresult) => {
    res.send({ message: "deleted" });
})
.catch((err) => {
  res.status(500).send({ message: "Server error", error: err.message });
})
});
server.post('/add-to-swap', async(req, res) => {
  //console.log(req.body.pid);
  await Products.updateOne(
    { _id: req.body.pid },
    { $set: { 
      isSwapdisplay: true}}
  )
  .then((deleteresult) => {
    res.send({ message: "added to swap" });
})
.catch((err) => {
  res.status(500).send({ message: "Server error", error: err.message });
})
});
server.post('/update-swap', async(req, res) => {
  //console.log(req.body.pid);
  //console.log(req.body.userId);
  await Products.updateOne(
    { _id: req.body.pid },
    { $set: { 
      isSwapaccepted: true,
      buyer: req.body.userId,
      swapproduct: req.body.swapid}}
  )
  .then((deleteresult) => {
    res.send({ message: " swap updated" });
})
.catch((err) => {
  res.status(500).send({ message: "Server error", error: err.message });
})
});
server.post('/seller-confirmation', async(req, res) => {
  const pids= [req.body.pid, req.body.swapid]
  await Products.updateMany(
    { _id: {$in: pids} },
    { $set: { 
      isSold: true}}
  )
  .then((deleteresult) => {
    res.send({ message: " swap confirmed" });
})
.catch((err) => {
  res.status(500).send({ message: "Server error", error: err.message });
})
});
server.post('/seller-rejection', async(req, res) => {
  //console.log(req.body.pid);
  //console.log(req.body.userId);
  await Products.updateOne(
    { _id: req.body.pid },
    { $set: { 
      isSwapaccepted: false}}
  )
  .then((deleteresult) => {
    res.send({ message: " swap confirmed" });
})
.catch((err) => {
  res.status(500).send({ message: "Server error", error: err.message });
})
});
server.listen(8080, () => {
  console.log('server started');
});