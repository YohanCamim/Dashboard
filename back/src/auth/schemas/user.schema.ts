import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
    },
    password: String,
    widgets: [{
        type: {
            services: String,
            params: Array,
            _id: String
        }
    }]
});