import mongoose from 'mongoose'

const GravDataRecordsSchema = new mongoose.Schema({
    date : Number,
    data : {}
})

export default mongoose.models.GravDataRecords || mongoose.model('GravDataRecords', GravDataRecordsSchema)