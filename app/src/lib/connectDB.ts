import mongoose from 'mongoose';

type connection_type = {
    isConnected?: number
}

const connection : connection_type = {}

const connectDB = async () => {
    try {

        if(connection.isConnected){
            console.log('Using existing connection');
            return;
        }
        const db = await mongoose.connect(process.env.MONGO_URI || "")       
        console.log('MongoDB connected');

        connection.isConnected = db.connections[0].readyState;

    } catch (error) {
        console.error('Error: ', error );
        process.exit(1);
    }
}

export default connectDB;