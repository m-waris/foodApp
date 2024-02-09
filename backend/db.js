const mongoose = require('mongoose');
require('dotenv').config();

// Your MongoDB connection URL
const url = process.env.MONGODB_URL;

// Function to establish a connection to MongoDB
const databaseConnection = async () => {
    try {
        await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected to MongoDB');

        const FoodItem = mongoose.connection.db.collection('food_items');
        const foodCategories = mongoose.connection.db.collection('food_category');

        // Fetch all data from the 'food_items' collection
        global.allFoodItems = await FoodItem.find({}).toArray();
        global.allFoodCategories = await foodCategories.find({}).toArray();
   
        console.log("Fetch all data from the 'food_items' collection");
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};

module.exports = databaseConnection;
