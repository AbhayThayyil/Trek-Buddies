const mongoose=require('mongoose')

const mongooseConnection=()=>{mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Succesfully connected to database !"))};

  module.exports=mongooseConnection