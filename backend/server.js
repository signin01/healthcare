const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/haricare")
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log("MongoDB Error:", err));

// User Schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, default: "" },
    address: { street: String, city: String, state: String, pincode: String },
    isAdmin: { type: Boolean, default: false },
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    createdAt: { type: Date, default: Date.now }
});

// Product Schema
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    brand: { type: String, default: "HariCare" },
    category: { type: String, required: true },
    gender: { type: String, enum: ["men", "women", "unisex"] },
    price: { type: Number, required: true },
    mrp: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    description: { type: String, required: true },
    shortDescription: { type: String },
    mainImage: { type: String, required: true },
    rating: { type: Number, default: 0 },
    reviews: { type: Number, default: 0 },
    isFeatured: { type: Boolean, default: false },
    isBestSeller: { type: Boolean, default: false },
    inStock: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now }
});

// Order Schema
const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        name: String,
        price: Number,
        quantity: Number,
        image: String
    }],
    totalAmount: { type: Number, required: true },
    orderStatus: { type: String, enum: ["pending", "processing", "shipped", "delivered"], default: "pending" },
    createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model("User", userSchema);
const Product = mongoose.model("Product", productSchema);
const Order = mongoose.model("Order", orderSchema);

// Sample Products
const sampleProducts = [
    { name: "Men's Beard Oil", brand: "HariCare", category: "beard", gender: "men", price: 499, mrp: 799, discount: 38, description: "Natural beard oil", shortDescription: "For soft beard", mainImage: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=400", rating: 4.7, reviews: 567, isBestSeller: true },
    { name: "Men's Face Wash", brand: "HariCare", category: "face_wash", gender: "men", price: 299, mrp: 499, discount: 40, description: "Deep cleansing", shortDescription: "For men", mainImage: "https://images.unsplash.com/photo-1556229010-aa3f7ff66b24?w=400", rating: 4.6, reviews: 890, isBestSeller: true },
    { name: "Women's Vitamin C Serum", brand: "HariCare", category: "serum", gender: "women", price: 599, mrp: 899, discount: 33, description: "Brightening serum", shortDescription: "Vitamin C", mainImage: "https://images.unsplash.com/photo-1620916566390-22f5e5c0c17a?w=400", rating: 4.8, reviews: 1234, isFeatured: true },
    { name: "Women's Moisturizer", brand: "HariCare", category: "moisturizer", gender: "women", price: 349, mrp: 549, discount: 36, description: "Hydrating moisturizer", shortDescription: "For glowing skin", mainImage: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400", rating: 4.5, reviews: 890, isBestSeller: true }
];

// Initialize products
Product.countDocuments().then(async (count) => {
    if (count === 0) {
        await Product.insertMany(sampleProducts);
        console.log("Products initialized");
    }
});

// Auth middleware
const auth = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized" });
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret123");
        req.userId = decoded.id;
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
};

// Register
app.post("/api/auth/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existing = await User.findOne({ email });
        if (existing) return res.status(400).json({ message: "User exists" });
        const hashed = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashed });
        await user.save();
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "secret123");
        res.json({ success: true, token, user: { id: user._id, name, email } });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Login
app.post("/api/auth/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ message: "Invalid credentials" });
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return res.status(401).json({ message: "Invalid credentials" });
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "secret123");
        res.json({ success: true, token, user: { id: user._id, name: user.name, email } });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get products
app.get("/api/products", async (req, res) => {
    try {
        const { gender } = req.query;
        let query = {};
        if (gender && gender !== "all") query.gender = gender;
        const products = await Product.find(query);
        res.json({ success: true, products });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get single product
app.get("/api/products/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.json({ success: true, product });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create order
app.post("/api/orders", auth, async (req, res) => {
    try {
        const { items, totalAmount } = req.body;
        const order = new Order({ user: req.userId, items, totalAmount });
        await order.save();
        res.json({ success: true, order });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get user orders
app.get("/api/orders", auth, async (req, res) => {
    try {
        const orders = await Order.find({ user: req.userId }).sort("-createdAt");
        res.json({ success: true, orders });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get user profile
app.get("/api/profile", auth, async (req, res) => {
    try {
        const user = await User.findById(req.userId).select("-password");
        res.json({ success: true, user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});
