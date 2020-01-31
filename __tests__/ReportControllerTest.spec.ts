import mongoose from "mongoose"
import {Report} from "../src/schemas/Report"

describe('Import', () => {
    beforeAll(async () => {
        if (!process.env.DB_HOST) {
            throw new Error('MongoDB server not initialized')
        }

        await mongoose.connect(process.env.DB_HOST, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
    });

    beforeEach(async () => {
        await Report.deleteMany({})
    });

    it('should be able to import a new Report'), async () => {
        await Report.create({})

        const reportList = await Report.find({})

        expect(reportList).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    
                })
            ])
        )
    }
})
