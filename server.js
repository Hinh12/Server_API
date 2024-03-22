const express = require("express");

const app = express();

const port = 4000;

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`Server dang chay cong ${port}`);
});

const mongoose = require("mongoose");

const carModel = require("./carModel");

const COMMON = require('./COMMON');

const uri = COMMON.uri;

const apiMobile = require('./api');

app.use('/api', apiMobile);

app.get("/", async (req, res) => {
  await mongoose.connect(uri);

  let cars = await carModel.find();

  console.log(cars);

  res.send(cars);
});



// app.get("/add", async (req, res) => {
//   await mongoose.connect(uri);

//   let car = {
//     ten: "i10",
//     namSX: 2024,
//     hang: "Toyota",
//     gia: 5000,
//   };

//   // let car = req.body;

//   let kq = await carModel.create(car);

//   console.log(kq);

//   let cars = await carModel.find();

//   res.send(cars);
// });

app.post("/add", async (req, res) => {
  await mongoose.connect(uri);



   let car = req.body;

  let kq = await carModel.create(car);

  console.log(kq);

  let cars = await carModel.find();

  res.send(cars);
});

app.get('/xoa/:id', async (req,res)=>{
  await mongoose.connect(uri);

  let id = req.params.id;
  console.log(id);

  await carModel.deleteOne({_id: id});

  res.redirect('../')
});

// app.get('/xoa/:id', async (req,res)=>{
//   await mongoose.connect(uri);

//   let id = req.params.id;
//   console.log(id);

//   await carModel.deleteOne({_id: id});

//   res.redirect('../')
// });

app.put('/update/:ten', async (req,res)=>{
  await mongoose.connect(uri);
  console.log('Ket noi DB thanh cong');
  let tenXe = req.params.ten;
  console.log(tenXe);
  let tenXeMoi = tenXe + ' 2024';
  await carModel.updateOne({ten: tenXe}, {ten: tenXeMoi});

  let xehois= await carModel.find({});
  res.send(xehois);
});

// app.get('/update/:ten', async (req,res)=>{
//   await mongoose.connect(uri);
//   console.log('Ket noi DB thanh cong');
//   let tenXe = req.params.ten;
//   console.log(tenXe);
//   let tenXeMoi = tenXe + 'Phien ban moi 2024';
//   await carModel.updateOne({ten: tenXe}, {ten: tenXeMoi});

//   let xehois= await carModel.find({});
//   res.send(xehois);
// });




exports.uri = uri;
exports.mongoose = mongoose;
exports.carModel = carModel;