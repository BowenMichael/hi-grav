import dbConnect from '../../../lib/dbconnect'
import GravRecords from '../../../schema/grav'
import {NextApiRequest, NextApiResponse} from "next";
import {ResponseFuncs} from "../../../util/types";

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

            const gravRecords = await GravRecords.find({})
            
            res.json(gravRecords)
            return
        },
        POST: async (req: NextApiRequest, res: NextApiResponse) => {
            await dbConnect();
            const body =  await req.body;
            if(!body.gravStatus) {
                res.json({error: 'Failed to post: Gav status undefined'})
                return 
            }
            const gravStatus = body.gravStatus

            const newGravRecord = await GravRecords.create({date : Date.now(), gravStatus})
            console.log(newGravRecord)
            res.json(newGravRecord)
            return
        }
    }

    // Check if there is a response for the particular method, if so invoke it, if not response with an error
    const response = handleCase[method]
    if (response) response(req, res)
    else res.status(400).json({ error: "No Response for This Request" })
    return;
}

export default handler