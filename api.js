const express = require("express");

const router = express.Router();
module.exports = router;
const mongoose = require("mongoose");

const server = require("./server");

const carModel = require("./carModel");
const COMMON = require("./COMMON");
const CarModel = require("./carModel");

router.get("/", (req, res) => {
  res.send("URI:", app.uri);
});

router.get("/list", async (req, res) => {
  await mongoose.connect(COMMON.uri);

  let cars = await carModel.find();

  console.log(cars);

  res.send(cars);
});

// Endpoint để xóa một mục xe
router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await carModel.findByIdAndDelete(id);
    if (result) {
      res.json({
        status: 200,
        message: "Xoá thành công",
        data: result,
      });
    } else {
      res.json({
        status: 400,
        message: "Lỗi, xóa không thành công",
        data: [],
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Lỗi server");
  }
});

// // Endpoint để thêm một chiếc xe mới
// router.post("/add", async (req, res) => {
//   try {
//     // Lấy dữ liệu từ request body
//     const { ten, namSX, hang, gia } = req.body;

//     // Tạo một bản ghi mới
//     const newCar = new carModel({
//       ten,
//       namSX,
//       hang,
//       gia,
//     });

//     // Lưu bản ghi mới vào cơ sở dữ liệu
//     await newCar.save();

//     res.status(201).send("Car đã được thêm thành công.");
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send("Lỗi server.");
//   }
// });

// router.post("/add-xe", async (req, res) => {
//   try {
//     const data = req.body;
//     const newCar = new carModel({
//       ten: data.ten,
//       namSX: data.namSX,
//       hang: data.hang,
//       gia: data.gia,
//     });
//     const result = await newCar.save();
//     if (result) {
//       res.json({
//         status: 200,
//         message: "Thêm xe thành công",
//         data: result,
//       });
//     } else {
//       res.json({
//         status: 400,
//         message: "Lỗi, thêm xe không thành công",
//         data: [],
//       });
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       status: 500,
//       message: "Lỗi server",
//       error: error.message,
//     });
//   }
// });

router.post("/add", async (req, res) => {
  try {
    const { ten, namSX, hang, gia } = req.body; // Giả sử yêu cầu POST chứa thông tin mới cho CarModel
    const newCar = new CarModel({ ten, namSX, hang, gia });
    const savedCar = await newCar.save();
    res.status(201).json({
      status: 201,
      message: "Thêm xe mới thành công",
      data: savedCar,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      message: "Lỗi server",
    });
  }
});





// router.post("/add_xe", async (req, res) => {
//   await mongoose.connect(COMMON.uri);


//    let car = req.body;

//   let kq = await carModel.create(car);

//   console.log(kq);

//   let cars = await carModel.find();

//   res.send(cars);
// });


// Endpoint để sửa thông tin của một chiếc xe
router.put("/edit/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { ten, namSX, hang, gia } = req.body; // Assume the request body contains updated fields for CarModel
    const updatedCar = await CarModel.findByIdAndUpdate(
      id,
      { ten, namSX, hang, gia },
      { new: true }
    );
    if (updatedCar) {
      res.json({
        status: 200,
        message: "Cập nhật thông tin xe thành công",
        data: updatedCar,
      });
    } else {
      console.log(error);
      res.status(404).json({
        status: 404,
        message: "Lỗi server",
        error: error.message,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      message: "Lỗi server",
    });
  }
});

module.exports = router;
