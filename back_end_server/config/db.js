import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGOURL);
    console.log(`Mongo DB Connected (^_^)... `);
  } catch (error) {
    console.error(`Mongo DB Faild Connected (-_-) ...`);
    process.exit(1)
  }
};

export default connectDB;
