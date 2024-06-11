import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const revenue = await prisma.booking.aggregate({
                _sum: {
                    amount: true,
                },
            });
            res.status(200).json(revenue);
        } catch (error) {
            res.status(500).json({ error: 'Unable to fetch revenue.' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed.' });
    }
}
