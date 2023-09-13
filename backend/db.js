// db.js
const mongoose = require('mongoose');

const mongoDB = 'mongodb+srv://pavseyash494:PASS%40123@cluster0.tvwkrfs.mongodb.net/foodin?retryWrites=true&w=majority';

const connectDB = async () => {
    try {
        await mongoose.connect(mongoDB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');

        const fetched_data = await mongoose.connection.db.collection("fooditems");
        const data = await fetched_data.find({}).toArray();
        const foodCategory = await mongoose.connection.db.collection("foodcategory");
        const catdata = await foodCategory.find({}).toArray();

        global.fooditems = data;
        global.foodcategory = catdata;
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};

module.exports = connectDB;