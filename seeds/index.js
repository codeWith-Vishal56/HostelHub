require("dotenv").config();

const mongoose = require("mongoose");

const Hostel = require("../models/Hostel");
const User = require("../models/User");

const DB_URL = process.env.DB_URL;

mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log(err);
  });

const sampleHostels = [
  {
    title: "Sunrise PG",
    description: "Comfortable PG for students near university",
    price: 5000,
    location: "Delhi",
    roomType: "single",
  },

  {
    title: "Green Valley Hostel",
    description: "Affordable hostel with WiFi and meals",
    price: 4500,
    location: "Noida",
    roomType: "double",
  },

  {
    title: "City Stay PG",
    description: "Modern PG with AC rooms",
    price: 7000,
    location: "Gurgaon",
    roomType: "single",
  },

  {
    title: "Student Nest",
    description: "Perfect hostel for college students",
    price: 4000,
    location: "Delhi",
    roomType: "triple",
  },

  {
    title: "Urban Stay Hostel",
    description: "Safe and secure hostel with CCTV",
    price: 6000,
    location: "Delhi",
    roomType: "double",
  },

  {
    title: "Metro Living PG",
    description: "Close to metro station",
    price: 5500,
    location: "Noida",
    roomType: "single",
  },

  {
    title: "Comfort Rooms",
    description: "Clean hostel with laundry service",
    price: 4800,
    location: "Ghaziabad",
    roomType: "double",
  },

  {
    title: "Blue Sky PG",
    description: "Budget friendly PG for students",
    price: 3500,
    location: "Delhi",
    roomType: "triple",
  },

  {
    title: "Elite Hostel",
    description: "Premium hostel with AC rooms",
    price: 8000,
    location: "Gurgaon",
    roomType: "single",
  },

  {
    title: "Campus Stay",
    description: "Walking distance from university",
    price: 4200,
    location: "Noida",
    roomType: "double",
  },
];

const seedDB = async () => {
  await Hostel.deleteMany({});

  let owner = await User.findOne();

  if (!owner) {
    owner = new User({
      name: "Demo Owner",
      email: "owner@test.com",
      password: "123456",
      role: "owner",
    });

    await owner.save();
  }

  for (let hostel of sampleHostels) {
    const newHostel = new Hostel(hostel);

    newHostel.owner = owner._id;

    await newHostel.save();
  }

  console.log("Database Seeded");

  mongoose.connection.close();
};

seedDB();
