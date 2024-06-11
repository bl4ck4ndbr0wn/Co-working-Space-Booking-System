import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { deskId, userId, hours, amount } = req.body;
        try {
            const booking = await prisma.booking.create({
                data: {
                    deskId,
                    userId,
                    hours,
                    amount,
                },
            });
            res.status(200).json(booking);
        } catch (error) {
            res.status(500).json({ error: 'Unable to book desk.' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed.' });
    }
}
