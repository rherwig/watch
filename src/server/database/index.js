import mongoose from 'mongoose';

export default async () => {
    const { DATABASE_URI } = process.env;

    return mongoose.connect(DATABASE_URI);
};
