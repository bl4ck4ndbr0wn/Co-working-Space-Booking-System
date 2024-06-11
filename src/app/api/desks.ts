import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const desks = await prisma.desk.findMany();
            res.status(200).json(desks);
        } catch (error) {
            res.status(500).json({ error: 'Unable to fetch desks.' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed.' });
    }
}
