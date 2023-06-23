import mongoose from 'mongoose'

const GravRecordsSchema = new mongoose.Schema({
    date : Number,
    gravStatus : Number
})

export default mongoose.models.GravRecords || mongoose.model('GravRecords', GravRecordsSchema)