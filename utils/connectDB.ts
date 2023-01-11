import mongoose, { ConnectOptions } from "mongoose";

const connectDB = () => {
    if(mongoose.connections[0].readyState){
        console.log('Already connected')
        return;
    }
    mongoose.connect(process.env.MONGODB_URL, error => {
        if(error) throw error;
        console.log('Connected')

    })
}

export default connectDB