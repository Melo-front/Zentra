const mongoose =require('mongoose')

const connectDB =async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Te conectaste a mongo")
    }catch(error){
        console.error('Error en Mongodb: '+ error.message)
    }
}

module.exports = connectDB;
