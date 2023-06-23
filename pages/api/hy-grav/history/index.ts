import dbConnect from "../../../../lib/dbconnect";
import GravRecords from '../../../../schema/grav'
import GravDataRecords from '../../../../schema/history'
import { NextApiRequest, NextApiResponse } from "next"
import { ResponseFuncs } from "../../../../util/types"
import {ComputeRecordData} from "../../../../middleware/server/recordDataCompute";


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    //capture request method, we type it as a key of ResponseFunc to reduce typing later
    const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs

    //function for catch errors
    const catcher = (error: Error) => res.status(400).json({ error })

    // Potential Responses
    const handleCase: ResponseFuncs = {
        // RESPONSE FOR GET REQUESTS
        GET: async (req: NextApiRequest, res: NextApiResponse) => {
            await dbConnect()

            const records = await GravRecords.find({gravStatus : { $in : [-1, 1]}})

            const groups = records.reduce((groups, record) => {
                const date = new Date(record.date).toDateString();
                if (!groups[date]) {
                    groups[date] = [];
                }
                groups[date].push(record);
                return groups;
            }, {});
            
            const dataRecords = await GravDataRecords.find({})

            res.json(dataRecords)
            return;
        },
        POST: async (req: NextApiRequest, res: NextApiResponse) => {
            await dbConnect()

            const data = await ComputeRecordData();

            const dataRecord = await GravDataRecords.create({date : Date.now(), data})

            res.json(dataRecord);
        }
    }

    // Check if there is a response for the particular method, if so invoke it, if not response with an error
    const response = handleCase[method]
    if (response) response(req, res)
    else res.status(400).json({ error: "No Response for This Request" })
    return;
}

export default handler