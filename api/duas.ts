export interface DuaItem {
  id: string;
  name: string;
  message: string;
  createdAt: string;
}

// In-memory array for Vercel serverless function
let duasList: DuaItem[] = [];

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    return res.status(200).json(duasList);
  }

  if (req.method === 'POST') {
    try {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      const name = String(body?.name || '').trim().slice(0, 60);
      const message = String(body?.message || '').trim().slice(0, 350);

      if (!name || !message) {
        return res.status(400).json({ error: 'Name and blessing message are required.' });
      }

      const newDua: DuaItem = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        name,
        message,
        createdAt: new Date().toISOString(),
      };

      duasList = [newDua, ...duasList];
      return res.status(201).json(newDua);
    } catch {
      return res.status(400).json({ error: 'Invalid request body' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
