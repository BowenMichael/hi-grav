import dbConnect from "../../lib/dbconnect";
import GravRecords from "../../schema/grav";
import {NextResponse} from "next/server";

export async function ComputeRecordData() {
    await dbConnect();
    const records = await GravRecords.find({gravStatus : { $in : [-1, 1]}, date : {$gt : Date.now() - 86400000}}) // all records from the last 24 hours

    let sum = 0;
    records.map((obj) => {
        sum += obj.gravStatus
    })

    const avg = sum / records.length;

    return {averageGrav : avg};
}
