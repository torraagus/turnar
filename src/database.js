const mongoose = require("mongoose");

// const uri = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0-uvim4.gcp.mongodb.net/test?retryWrites=true&w=majority`;
const uri = `mongodb://localhost:27017/turnar`;

async function connect() {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
  } catch (error) {
    console.log(error);
  }
}

connect();

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDb is up and running");
});
