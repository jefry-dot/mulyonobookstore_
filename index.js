const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const port = process.env.PORT || 5000;
require('dotenv').config();

app.use(express.json());
app.use(cors({
    origin: ["http://localhost:5173", "https://mulyono-book-store-eoid.vercel.app"], // Hapus tanda '/' di akhir
    credentials: true
}));


const bookRoutes = require('./src/books/book.route');
const orderRoutes = require('./src/orders/order.route');
const userRoutes = require('./src/users/user.route');
const adminRoutes = require('./src/stats/admin.stats');


app.use("/api/books", bookRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/auth", userRoutes);
app.use("/api/admin", adminRoutes);

// Tambahkan rute ini untuk mengonfirmasi bahwa server berjalan
app.get('/', (req, res) => {
    res.send('The server is running');
});

async function main() {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Could not connect to MongoDB:', err);
    }
}

main().then(() => {
    app.listen(port, () => {
        console.log(`The server is running on port ${port}`);
    });
}).catch(err => console.log(err));
