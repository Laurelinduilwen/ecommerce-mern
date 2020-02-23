import mongoose from 'mongoose';

const connection = {};

async function connectDb() {
  if (connection.isConnected) {
    console.log('Using existing connection...');
    return;
  }

  //use nwe database connection

  const db = await mongoose.connect(process.env.MONGO_SRV, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log('Establishing DB connection... Please stand by...');

  connection.isConnected = db.connections[0].readyState;
}

export default connectDb;
