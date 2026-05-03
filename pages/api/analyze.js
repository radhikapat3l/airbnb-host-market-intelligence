import { getMarket } from '../../lib/marketData';

export default function handler(req, res) {
  const city = req.body?.city || req.query?.city || 'Austin';
  const propertyType = req.body?.propertyType || '1BR apartment';
  const guests = req.body?.guests || '2-4 guests';
  const goal = req.body?.goal || 'Maximize revenue';

  const market = getMarket(city);

  const response = {
    ...market,
    input: { city, propertyType, guests, goal },
    scannedAt: new Date().toISOString(),
    confidence: 92
  };

  res.status(200).json(response);
}
