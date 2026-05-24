import React, { useState, useEffect } from "react";
import toast, { Toaster } from 'react-hot-toast';

// Import all feature components
import PrescriptionUpload from './components/PrescriptionUpload';
import MedicineReminder from './components/MedicineReminder';
import BMICalculator from './components/BMICalculator';
import HealthRecords from './components/HealthRecords';
import OrderTracking from './components/OrderTracking';
import DoctorConsultation from './components/DoctorConsultation';
import MedicineInfo from './components/MedicineInfo';
import BPTracker from './components/BPTracker';
import ExpiryAlerts from './components/ExpiryAlerts';
import HealthTips from './components/HealthTips';

// Product Data
const allProducts = [
    { id: 1, name: "Men's Beard Oil", category: "mens", gender: "men", price: 499, mrp: 799, discount: 38, rating: 4.7, reviews: 567, description: "Natural beard oil for soft, healthy beard.", mainImage: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=400" },
    { id: 2, name: "Men's Face Wash", category: "mens", gender: "men", price: 299, mrp: 499, discount: 40, rating: 4.6, reviews: 890, description: "Deep cleansing face wash for men.", mainImage: "https://images.unsplash.com/photo-1556229010-aa3f7ff66b24?w=400" },
    { id: 3, name: "Men's Hair Gel", category: "mens", gender: "men", price: 249, mrp: 399, discount: 38, rating: 4.5, reviews: 678, description: "Strong hold hair gel.", mainImage: "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=400" },
    { id: 4, name: "Men's Body Spray", category: "mens", gender: "men", price: 449, mrp: 699, discount: 36, rating: 4.7, reviews: 1234, description: "Long-lasting body spray.", mainImage: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400" },
    { id: 5, name: "Women's Vitamin C Serum", category: "skincare", gender: "women", price: 599, mrp: 899, discount: 33, rating: 4.8, reviews: 1234, description: "Brightening Vitamin C serum.", mainImage: "https://images.unsplash.com/photo-1620916566390-22f5e5c0c17a?w=400" },
    { id: 6, name: "Women's Moisturizer", category: "skincare", gender: "women", price: 349, mrp: 549, discount: 36, rating: 4.5, reviews: 890, description: "Hydrating face moisturizer.", mainImage: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400" },
    { id: 7, name: "Women's Sunscreen", category: "skincare", gender: "women", price: 499, mrp: 799, discount: 38, rating: 4.7, reviews: 2345, description: "SPF 50 sunscreen.", mainImage: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400" },
    { id: 8, name: "Women's Face Wash", category: "skincare", gender: "women", price: 249, mrp: 399, discount: 38, rating: 4.4, reviews: 567, description: "Gentle face wash.", mainImage: "https://images.unsplash.com/photo-1556229010-aa3f7ff66b24?w=400" }
];

function App() {
    const [darkMode, setDarkMode] = useState(false);
    const [activeTab, setActiveTab] = useState("home");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");
    const [cart, setCart] = useState([]);
    const [showCart, setShowCart] = useState(false);
    const [showCheckout, setShowCheckout] = useState(false);
    const [wishlist, setWishlist] = useState([]);
    const [user, setUser] = useState(null);
    const [showAuth, setShowAuth] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [showNotifications, setShowNotifications] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showProductDetail, setShowProductDetail] = useState(false);
    const [loyaltyPoints, setLoyaltyPoints] = useState(0);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [pincode, setPincode] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);
    const [authMode, setAuthMode] = useState("login");

    const mainTabs = [
        { id: "home", name: "Home" },
        { id: "men", name: "Men" },
        { id: "women", name: "Women" },
        { id: "products", name: "Products" }
    ];

    const healthTabs = [
        { id: "prescription", name: "Prescription" },
        { id: "reminder", name: "Reminder" },
        { id: "bmi", name: "BMI" },
        { id: "doctor", name: "Doctor" },
        { id: "bp", name: "BP Tracker" },
        { id: "records", name: "Records" },
        { id: "tracking", name: "Track Order" },
        { id: "medicineinfo", name: "Medicine Info" },
        { id: "expiry", name: "Expiry Alerts" },
        { id: "tips", name: "Health Tips" }
    ];

    useEffect(() => {
        const savedCart = localStorage.getItem("cart");
        if (savedCart) setCart(JSON.parse(savedCart));
        const savedWishlist = localStorage.getItem("wishlist");
        if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
        const savedPoints = localStorage.getItem("loyaltyPoints");
        if (savedPoints) setLoyaltyPoints(parseInt(savedPoints));
        const darkModePref = localStorage.getItem("darkMode");
        if (darkModePref === "true") setDarkMode(true);
    }, []);

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
        localStorage.setItem("loyaltyPoints", loyaltyPoints);
        localStorage.setItem("darkMode", darkMode);
        document.body.style.background = darkMode ? "#1a1a2e" : "#f5f5f5";
    }, [cart, wishlist, loyaltyPoints, darkMode]);

    const getFilteredProducts = () => {
        let filtered = allProducts;
        if (selectedCategory !== "all") {
            filtered = filtered.filter(p => p.category === selectedCategory);
        }
        if (activeTab === "men") {
            filtered = filtered.filter(p => p.gender === "men");
        }
        if (activeTab === "women") {
            filtered = filtered.filter(p => p.gender === "women");
        }
        if (searchTerm) {
            filtered = filtered.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
        }
        return filtered;
    };

    const addToCart = (product) => {
        const existing = cart.find(item => item.id === product.id);
        if (existing) {
            setCart(cart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
        } else {
            setCart([...cart, { ...product, quantity: 1 }]);
        }
        toast.success(product.name + " added to cart!");
        setLoyaltyPoints(prev => prev + 5);
        setNotifications(prev => [{ id: Date.now(), message: product.name + " added to cart" }, ...prev].slice(0, 10));
    };

    const removeFromCart = (id) => {
        setCart(cart.filter(item => item.id !== id));
        toast.success("Item removed from cart");
    };

    const updateQuantity = (id, quantity) => {
        if (quantity <= 0) {
            removeFromCart(id);
        } else {
            setCart(cart.map(item => item.id === id ? { ...item, quantity } : item));
        }
    };

    const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const originalTotal = cart.reduce((sum, item) => sum + (item.mrp * item.quantity), 0);
    const filteredProducts = getFilteredProducts();

    const proceedToCheckout = () => {
        if (cart.length === 0) {
            toast.error("Your cart is empty!");
            return;
        }
        if (!user) {
            setShowAuth(true);
            toast.error("Please login to continue");
            return;
        }
        setShowCart(false);
        setShowCheckout(true);
    };

    const handlePayment = () => {
        if (!address || !city || !pincode) {
            toast.error("Please fill shipping address");
            return;
        }
        setIsProcessing(true);
        setTimeout(() => {
            setLoyaltyPoints(prev => prev + Math.floor(cartTotal / 10));
            setCart([]);
            setShowCheckout(false);
            toast.success("Order placed successfully!");
            setNotifications(prev => [{ id: Date.now(), message: "Order placed successfully!" }, ...prev].slice(0, 10));
            setIsProcessing(false);
        }, 1500);
    };

    const handleEmailLogin = (e) => {
        e.preventDefault();
        setUser({ name: name || "User", email });
        setShowAuth(false);
        toast.success("Login successful!");
        setLoyaltyPoints(prev => prev + 50);
    };

    const handleLogout = () => {
        setUser(null);
        setCart([]);
        toast.success("Logged out successfully");
    };

    const styles = {
        container: { minHeight: "100vh", background: darkMode ? "#1a1a2e" : "#f5f5f5", color: darkMode ? "white" : "#333" },
        navbar: { background: darkMode ? "#0f3460" : "#2c3e50", padding: "12px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px" },
        card: { background: darkMode ? "#16213e" : "white", borderRadius: "12px", overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.1)", cursor: "pointer", width: "240px", margin: "0 auto" },
        input: { padding: "10px", border: "1px solid #ddd", borderRadius: "8px", fontSize: "14px", background: darkMode ? "#2d2d2d" : "white", color: darkMode ? "white" : "#333", width: "100%", marginBottom: "10px" },
        button: { background: "#4caf50", color: "white", border: "none", padding: "8px 16px", borderRadius: "20px", cursor: "pointer", fontSize: "13px", fontWeight: "500", width: "100%" },
        tabButton: { background: "none", border: "none", padding: "8px 12px", cursor: "pointer", fontSize: "13px", borderRadius: "20px", color: "white" },
        healthTabButton: { background: "none", border: "none", padding: "6px 12px", cursor: "pointer", fontSize: "12px", borderRadius: "20px", color: darkMode ? "white" : "#333" }
    };

    return (
        <div style={styles.container}>
            <Toaster position="top-right" />
            
            {/* Navbar */}
            <nav style={styles.navbar} className="navbar-animated">
                <div style={{ display: "flex", alignItems: "center", gap: "15px", flexWrap: "wrap" }}>
                    <h1 style={{ margin: 0, fontSize: "20px", cursor: "pointer", color: "white" }} onClick={() => setActiveTab("home")}>HealthCare Mart</h1>
                    <button onClick={() => setDarkMode(!darkMode)} style={{ background: "rgba(255,255,255,0.2)", border: "none", borderRadius: "20px", padding: "5px 10px", cursor: "pointer", color: "white", fontSize: "12px" }}>
                        {darkMode ? "Light" : "Dark"}
                    </button>
                </div>
                <div style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap" }}>
                    {mainTabs.map(tab => (
                        <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{ ...styles.tabButton, background: activeTab === tab.id ? "#4caf50" : "transparent" }}>
                            {tab.name}
                        </button>
                    ))}
                    <button onClick={() => setShowCart(true)} style={{ ...styles.button, background: "#2196f3", width: "auto" }}>Cart ({cart.reduce((s, i) => s + i.quantity, 0)})</button>
                    <button onClick={() => setShowNotifications(true)} style={styles.tabButton}>Notify</button>
                    {user ? (
                        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                            <span style={{ color: "white", fontSize: "13px" }}>Hi, {user.name}</span>
                            <button onClick={handleLogout} style={{ background: "#dc3545", border: "none", borderRadius: "20px", padding: "5px 12px", cursor: "pointer", color: "white", fontSize: "12px" }}>Logout</button>
                        </div>
                    ) : (
                        <button onClick={() => setShowAuth(true)} style={{ background: "white", color: "#2c3e50", border: "none", padding: "6px 15px", borderRadius: "20px", cursor: "pointer" }}>Login</button>
                    )}
                </div>
            </nav>

            {/* Health Tools Bar */}
            <div class="health-tools-bar" style={{ background: darkMode ? "#0f3460" : "#e8f5e9", padding: "8px 20px", display: "flex", justifyContent: "center", gap: "10px", flexWrap: "wrap", borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
                {healthTabs.map(tab => (
                    <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{ ...styles.healthTabButton, background: activeTab === tab.id ? "#4caf50" : "transparent", color: activeTab === tab.id ? "white" : styles.healthTabButton.color }}>
                        {tab.name}
                    </button>
                ))}
            </div>

            {/* Search Bar */}
            <div style={{ maxWidth: "500px", margin: "20px auto", padding: "0 20px", textAlign: "center" }}>
                <input type="text" placeholder="Search products..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={styles.input} />
            </div>

            {/* Notifications Panel */}
            {showNotifications && (
                <div style={{ position: "fixed", top: "100px", right: "20px", width: "280px", background: "white", borderRadius: "10px", boxShadow: "0 2px 10px rgba(0,0,0,0.2)", zIndex: 1500 }}>
                    <div style={{ padding: "10px", background: "#4caf50", color: "white", borderRadius: "10px 10px 0 0", display: "flex", justifyContent: "space-between" }}>
                        <strong>Notifications</strong>
                        <button onClick={() => setShowNotifications(false)} style={{ background: "none", border: "none", color: "white", cursor: "pointer" }}>X</button>
                    </div>
                    <div style={{ maxHeight: "300px", overflow: "auto", padding: "10px" }}>
                        {notifications.length === 0 ? <p style={{ textAlign: "center", padding: "20px" }}>No notifications</p> : notifications.map(n => (
                            <div key={n.id} style={{ padding: "8px", borderBottom: "1px solid #eee" }}>{n.message}</div>
                        ))}
                    </div>
                </div>
            )}

            {/* Home Page */}
            {activeTab === "home" && !showCheckout && (
                <div>
                    <div className="hero-animated" style={{ background: "linear-gradient(135deg, #4caf50, #2e7d32)", color: "white", textAlign: "center", padding: "50px 20px" }}>
                        <h1 style={{ fontSize: "32px", marginBottom: "10px" }}>Your Health, Our Priority</h1>
                        <p style={{ fontSize: "16px", marginBottom: "20px" }}>India's most trusted healthcare platform</p>
                        <button onClick={() => setActiveTab("products")} style={{ ...styles.button, width: "auto", padding: "10px 30px" }}>Shop Now</button>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "15px", padding: "30px 20px", maxWidth: "1000px", margin: "0 auto" }}>
                        <div class="stat-card" style={{ textAlign: "center", background: darkMode ? "#16213e" : "white", padding: "20px", borderRadius: "12px" }}>
                            <h2>50K+</h2>
                            <p>Happy Customers</p>
                        </div>
                        <div class="stat-card" style={{ textAlign: "center", background: darkMode ? "#16213e" : "white", padding: "20px", borderRadius: "12px" }}>
                            <h2>1000+</h2>
                            <p>Products</p>
                        </div>
                        <div class="stat-card" style={{ textAlign: "center", background: darkMode ? "#16213e" : "white", padding: "20px", borderRadius: "12px" }}>
                            <h2>24/7</h2>
                            <p>Support</p>
                        </div>
                        <div class="stat-card" style={{ textAlign: "center", background: darkMode ? "#16213e" : "white", padding: "20px", borderRadius: "12px" }}>
                            <h2>Free Delivery</h2>
                            <p>Above Rs.499</p>
                        </div>
                    </div>

                    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
                        <h2 style={{ fontSize: "20px", marginBottom: "15px", textAlign: "center" }}>For Men</h2>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "20px", justifyItems: "center" }}>
                            {allProducts.filter(p => p.gender === "men").slice(0, 4).map(product => (
                                <div key={product.id} className="product-card-animated" class="product-card" style={styles.card} onClick={() => { setSelectedProduct(product); setShowProductDetail(true); }}>
                                    <img src={product.mainImage} alt={product.name} style={{ width: "100%", height: "140px", objectFit: "cover" }} />
                                    <div style={{ padding: "12px" }}>
                                        <h3 style={{ fontSize: "14px", marginBottom: "5px" }}>{product.name}</h3>
                                        <p style={{ fontSize: "18px", fontWeight: "bold", color: "#4caf50", margin: "8px 0" }}>Rs.{product.price}</p>
                                        <button onClick={(e) => { e.stopPropagation(); addToCart(product); }} className="animated-button" class="hover-glow" style={styles.button}>Add to Cart</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
                        <h2 style={{ fontSize: "20px", marginBottom: "15px", textAlign: "center" }}>For Women</h2>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "20px", justifyItems: "center" }}>
                            {allProducts.filter(p => p.gender === "women").slice(0, 4).map(product => (
                                <div key={product.id} className="product-card-animated" class="product-card" style={styles.card} onClick={() => { setSelectedProduct(product); setShowProductDetail(true); }}>
                                    <img src={product.mainImage} alt={product.name} style={{ width: "100%", height: "140px", objectFit: "cover" }} />
                                    <div style={{ padding: "12px" }}>
                                        <h3 style={{ fontSize: "14px", marginBottom: "5px" }}>{product.name}</h3>
                                        <p style={{ fontSize: "18px", fontWeight: "bold", color: "#e91e63", margin: "8px 0" }}>Rs.{product.price}</p>
                                        <button onClick={(e) => { e.stopPropagation(); addToCart(product); }} style={{ ...styles.button, background: "#e91e63" }}>Add to Cart</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div style={{ textAlign: "center", padding: "15px", background: "#ffc107", color: "#333", marginTop: "20px" }}>
                        You have {loyaltyPoints} loyalty points!
                    </div>
                </div>
            )}

            {/* Products Pages (Men, Women, All Products) */}
            {(activeTab === "men" || activeTab === "women" || activeTab === "products") && !showCheckout && (
                <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
                    <h2 style={{ fontSize: "22px", marginBottom: "20px", textAlign: "center" }}>
                        {activeTab === "men" ? "Men's Products" : activeTab === "women" ? "Women's Products" : "All Products"} ({filteredProducts.length})
                    </h2>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "20px", justifyItems: "center" }}>
                        {filteredProducts.map(product => (
                            <div key={product.id} style={{ ...styles.card, width: "250px" }}>
                                <img src={product.mainImage} alt={product.name} style={{ width: "100%", height: "160px", objectFit: "cover", cursor: "pointer" }} onClick={() => { setSelectedProduct(product); setShowProductDetail(true); }} />
                                <div style={{ padding: "12px" }}>
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                        <h3 style={{ fontSize: "14px" }}>{product.name}</h3>
                                        <button onClick={() => {
                                            if (!wishlist.includes(product.id)) {
                                                setWishlist([...wishlist, product.id]);
                                                toast.success("Added to wishlist");
                                            } else {
                                                setWishlist(wishlist.filter(id => id !== product.id));
                                                toast.success("Removed");
                                            }
                                        }} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "18px", color: wishlist.includes(product.id) ? "#e91e63" : "#ccc" }}>?</button>
                                    </div>
                                    <div style={{ fontSize: "12px", color: "#666", margin: "5px 0" }}>Rating: {product.rating}/5 ({product.reviews} reviews)</div>
                                    <div style={{ display: "flex", alignItems: "center", gap: "10px", margin: "10px 0", justifyContent: "center" }}>
                                        <span style={{ fontSize: "18px", fontWeight: "bold", color: "#4caf50" }}>Rs.{product.price}</span>
                                        <span style={{ textDecoration: "line-through", color: "#999", fontSize: "12px" }}>Rs.{product.mrp}</span>
                                        <span style={{ background: "#ff9800", color: "white", padding: "2px 6px", borderRadius: "12px", fontSize: "10px" }}>{product.discount}% off</span>
                                    </div>
                                    <button onClick={() => addToCart(product)} className="animated-button" class="hover-glow" style={styles.button}>Add to Cart</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Health Feature Components */}
            {activeTab === 'prescription' && <PrescriptionUpload />}
            {activeTab === 'reminder' && <MedicineReminder />}
            {activeTab === 'bmi' && <BMICalculator />}
            {activeTab === 'records' && <HealthRecords />}
            {activeTab === 'tracking' && <OrderTracking />}
            {activeTab === 'doctor' && <DoctorConsultation />}
            {activeTab === 'medicineinfo' && <MedicineInfo />}
            {activeTab === 'bp' && <BPTracker />}
            {activeTab === 'expiry' && <ExpiryAlerts />}
            {activeTab === 'tips' && <HealthTips />}

            {/* Cart Sidebar */}
            {showCart && (
                <div style={{ position: "fixed", top: 0, right: 0, bottom: 0, width: "350px", background: darkMode ? "#16213e" : "white", zIndex: 2000, boxShadow: "-2px 0 10px rgba(0,0,0,0.2)", display: "flex", flexDirection: "column" }}>
                    <div style={{ padding: "15px", borderBottom: "1px solid #ddd", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <h3>Your Cart ({cart.reduce((s, i) => s + i.quantity, 0)})</h3>
                        <button onClick={() => setShowCart(false)} style={{ background: "none", border: "none", fontSize: "20px", cursor: "pointer" }}>X</button>
                    </div>
                    <div style={{ flex: 1, overflow: "auto", padding: "15px" }}>
                        {cart.length === 0 ? (
                            <p style={{ textAlign: "center", padding: "40px" }}>Your cart is empty</p>
                        ) : (
                            cart.map(item => (
                                <div key={item.id} style={{ display: "flex", gap: "12px", marginBottom: "15px", paddingBottom: "12px", borderBottom: "1px solid #eee" }}>
                                    <img src={item.mainImage} alt={item.name} style={{ width: "60px", height: "60px", objectFit: "cover", borderRadius: "8px" }} />
                                    <div style={{ flex: 1 }}>
                                        <h4 style={{ fontSize: "13px" }}>{item.name}</h4>
                                        <p style={{ fontWeight: "bold", color: "#4caf50" }}>Rs.{item.price}</p>
                                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)} style={{ width: "25px", height: "25px", background: "#f0f0f0", border: "none", borderRadius: "5px", cursor: "pointer" }}>-</button>
                                            <span>{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)} style={{ width: "25px", height: "25px", background: "#f0f0f0", border: "none", borderRadius: "5px", cursor: "pointer" }}>+</button>
                                        </div>
                                    </div>
                                    <div style={{ textAlign: "right" }}>
                                        <p style={{ fontWeight: "bold" }}>Rs.{item.price * item.quantity}</p>
                                        <button onClick={() => removeFromCart(item.id)} style={{ background: "none", border: "none", color: "#dc3545", cursor: "pointer" }}>Remove</button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                    {cart.length > 0 && (
                        <div style={{ padding: "15px", borderTop: "1px solid #ddd" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "15px", fontSize: "18px" }}>
                                <strong>Total:</strong>
                                <strong style={{ color: "#4caf50" }}>Rs.{cartTotal}</strong>
                            </div>
                            <button onClick={proceedToCheckout} style={{ ...styles.button, width: "100%", padding: "12px" }}>Proceed to Checkout</button>
                        </div>
                    )}
                </div>
            )}

            {/* Checkout Page */}
            {showCheckout && (
                <div style={{ padding: "20px", maxWidth: "500px", margin: "0 auto" }}>
                    <h2>Checkout</h2>
                    <div style={{ background: darkMode ? "#16213e" : "white", borderRadius: "12px", padding: "20px" }}>
                        <h3>Shipping Address</h3>
                        <input type="text" placeholder="Full Name" value={user?.name || ""} style={styles.input} readOnly />
                        <input type="email" placeholder="Email" value={user?.email || ""} style={styles.input} readOnly />
                        <input type="tel" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} style={styles.input} required />
                        <textarea placeholder="Street Address" value={address} onChange={(e) => setAddress(e.target.value)} rows="2" style={styles.input} required />
                        <div style={{ display: "flex", gap: "10px" }}>
                            <input type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} style={{ ...styles.input, width: "50%" }} required />
                            <input type="text" placeholder="Pincode" value={pincode} onChange={(e) => setPincode(e.target.value)} style={{ ...styles.input, width: "50%" }} required />
                        </div>
                        <div style={{ marginTop: "20px", padding: "15px", background: "#f5f5f5", borderRadius: "8px" }}>
                            <h4>Order Summary</h4>
                            <p>Total Amount: <strong>Rs.{cartTotal}</strong></p>
                            <p>You Save: Rs.{originalTotal - cartTotal}</p>
                            <p>Loyalty Points to Earn: {Math.floor(cartTotal / 10)}</p>
                        </div>
                        <button onClick={handlePayment} disabled={isProcessing} style={{ ...styles.button, width: "100%", padding: "12px", marginTop: "20px" }}>
                            {isProcessing ? "Processing..." : `Place Order (Rs.${cartTotal})`}
                        </button>
                        <button onClick={() => setShowCheckout(false)} style={{ width: "100%", padding: "10px", marginTop: "10px", background: "none", border: "1px solid #4caf50", color: "#4caf50", borderRadius: "25px", cursor: "pointer" }}>Back to Cart</button>
                    </div>
                </div>
            )}

            {/* Login Modal */}
            {showAuth && (
                <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.5)", zIndex: 2000, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ background: "white", borderRadius: "15px", padding: "25px", maxWidth: "380px", width: "90%" }}>
                        <h2 style={{ textAlign: "center" }}>Welcome</h2>
                        <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
                            <button onClick={() => setAuthMode("login")} style={{ flex: 1, padding: "10px", background: authMode === "login" ? "#4caf50" : "#f0f0f0", color: authMode === "login" ? "white" : "#333", border: "none", borderRadius: "8px", cursor: "pointer" }}>Login</button>
                            <button onClick={() => setAuthMode("register")} style={{ flex: 1, padding: "10px", background: authMode === "register" ? "#4caf50" : "#f0f0f0", color: authMode === "register" ? "white" : "#333", border: "none", borderRadius: "8px", cursor: "pointer" }}>Register</button>
                        </div>
                        {authMode === "login" ? (
                            <form onSubmit={handleEmailLogin}>
                                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} style={styles.input} required />
                                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} style={styles.input} required />
                                <button type="submit" className="animated-button" class="hover-glow" style={styles.button}>Login</button>
                            </form>
                        ) : (
                            <form onSubmit={handleEmailLogin}>
                                <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} style={styles.input} required />
                                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} style={styles.input} required />
                                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} style={styles.input} required />
                                <button type="submit" className="animated-button" class="hover-glow" style={styles.button}>Register</button>
                            </form>
                        )}
                        <button onClick={() => setShowAuth(false)} style={{ width: "100%", padding: "10px", marginTop: "15px", background: "#ccc", border: "none", borderRadius: "8px", cursor: "pointer" }}>Close</button>
                    </div>
                </div>
            )}

            {/* Product Detail Modal */}
            {showProductDetail && selectedProduct && (
                <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.8)", zIndex: 2000, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ background: "white", borderRadius: "15px", padding: "25px", maxWidth: "450px", width: "90%", position: "relative" }}>
                        <button onClick={() => setShowProductDetail(false)} style={{ position: "absolute", top: "10px", right: "10px", background: "#4caf50", color: "white", border: "none", borderRadius: "50%", width: "28px", height: "28px", cursor: "pointer" }}>X</button>
                        <img src={selectedProduct.mainImage} alt={selectedProduct.name} style={{ width: "100%", height: "220px", objectFit: "cover", borderRadius: "10px", marginBottom: "15px" }} />
                        <h2>{selectedProduct.name}</h2>
                        <p>{selectedProduct.description}</p>
                        <p><strong>Rating:</strong> {selectedProduct.rating}/5 ({selectedProduct.reviews} reviews)</p>
                        <p style={{ fontSize: "24px", fontWeight: "bold", color: "#4caf50", margin: "10px 0" }}>Rs.{selectedProduct.price}</p>
                        <p style={{ textDecoration: "line-through", color: "#999" }}>MRP: Rs.{selectedProduct.mrp}</p>
                        <button onClick={() => addToCart(selectedProduct)} style={{ ...styles.button, width: "100%", marginTop: "15px", padding: "12px" }}>Add to Cart</button>
                    </div>
                </div>
            )}

            {/* Footer */}
            <footer className="footer-animated" style={{ background: darkMode ? "#0f3460" : "#2c3e50", color: "white", textAlign: "center", padding: "20px", marginTop: "40px" }}>
                <p>2024 HealthCare Mart. All rights reserved.</p>
                <p style={{ marginTop: "8px", fontSize: "12px", opacity: 0.7 }}>Your Trusted Healthcare Partner</p>
            </footer>
        </div>
    );
}

export default App;
