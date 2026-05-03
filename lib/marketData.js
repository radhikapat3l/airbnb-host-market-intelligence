export const marketData = {
  Austin: {
    city: 'Austin',
    confidence: 92,
    neighborhoods: [
      { name: 'South Congress', score: 96, demand: 'Very High', competition: 'Medium', revenue: '$5,120/mo', price: 168, reason: 'Strong weekend demand, walkable restaurants, music venues, boutique shopping, and premium leisure stays.', drivers: ['Walkability', 'Weekend trips', 'Dining access', 'Event demand'], risk: 'Medium competition. Listings need strong photos and design-forward positioning.', angle: 'Design-forward stay near restaurants, music venues, and local shopping.' },
      { name: 'Downtown Austin', score: 93, demand: 'Very High', competition: 'High', revenue: '$5,380/mo', price: 182, reason: 'Best for conferences, concerts, nightlife, and business travelers who want central access.', drivers: ['Events', 'Business travel', 'Nightlife', 'Conference demand'], risk: 'High competition and rate volatility around major events.', angle: 'Central stay for conferences, nightlife, and premium short trips.' },
      { name: 'East Austin', score: 89, demand: 'High', competition: 'Medium', revenue: '$4,690/mo', price: 154, reason: 'Popular with younger travelers, food tourism, creative stays, and longer weekend visits.', drivers: ['Food tourism', 'Creative scene', 'Pet-friendly stays', 'Long weekends'], risk: 'Guests compare heavily on design, reviews, and flexible check-in.', angle: 'Trendy local stay with restaurants, patios, and a neighborhood feel.' },
      { name: 'Zilker', score: 86, demand: 'High', competition: 'Medium', revenue: '$4,420/mo', price: 149, reason: 'Strong family and outdoor demand near parks, trails, Barton Springs, and ACL-related travel.', drivers: ['Outdoor access', 'Family stays', 'Parks', 'Festival demand'], risk: 'Seasonality matters. Summer and festival periods perform best.', angle: 'Relaxed outdoor stay near parks, trails, and local Austin experiences.' }
    ],
    listings: [
      { title: 'SoCo Design Studio', area: 'South Congress', type: 'Guest favorite', price: '$172', rating: '4.94', occupancy: '86%', amenities: ['Workspace', 'Parking', 'Self check-in'], image: 'https://images.pexels.com/photos/276583/pexels-photo-276583.jpeg?auto=compress&cs=tinysrgb&w=900', insight: 'Your listing can price within 2% of this comp if it highlights walkability, fast Wi-Fi, and premium interior design.', gap: '+$4 above recommended base', strength: 'Strong visuals and premium neighborhood positioning.', action: 'Match design tone and add weekend premium pricing.' },
      { title: 'Downtown Event Loft', area: 'Downtown Austin', type: 'Superhost', price: '$189', rating: '4.89', occupancy: '88%', amenities: ['Skyline view', 'Gym', 'Fast Wi-Fi'], image: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=900', insight: 'This competitor wins during event-heavy weeks. It supports a higher event-week price ceiling.', gap: '+$21 above recommended base', strength: 'Downtown access and business/event demand.', action: 'Use event calendar pricing and highlight proximity to venues.' },
      { title: 'East Austin Bungalow', area: 'East Austin', type: 'Guest favorite', price: '$158', rating: '4.86', occupancy: '80%', amenities: ['Patio', 'Pet friendly', 'Kitchen'], image: 'https://images.pexels.com/photos/1454806/pexels-photo-1454806.jpeg?auto=compress&cs=tinysrgb&w=900', insight: 'This comp captures family and pet-friendly searches. It is a good benchmark for amenity positioning.', gap: '-$10 below recommended base', strength: 'Outdoor space and pet-friendly appeal.', action: 'Highlight patio, pets, kitchen, and neighborhood restaurants.' },
      { title: 'Zilker Park Hideaway', area: 'Zilker', type: 'Rare find', price: '$149', rating: '4.82', occupancy: '77%', amenities: ['Trail access', 'Quiet', 'Family stay'], image: 'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=900', insight: 'This listing performs best for families and outdoor travelers. Demand rises near festivals.', gap: '-$19 below recommended base', strength: 'Park proximity and quiet stay positioning.', action: 'Use festival premiums and family-friendly messaging.' },
      { title: 'The Domain Apartment', area: 'The Domain', type: 'Business ready', price: '$161', rating: '4.90', occupancy: '79%', amenities: ['Workspace', 'Pool', 'Parking'], image: 'https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=900', insight: 'This comp is strongest for business travel and shopping access.', gap: '-$7 below recommended base', strength: 'Work-friendly amenities and shopping access.', action: 'Position toward business travelers and extended stays.' }
    ],
    hotels: [
      { title: 'Downtown Austin Hotel Suite', area: 'Downtown Austin', price: '$214', rating: '4.88', image: 'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=900' },
      { title: 'Boutique Stay near SoCo', area: 'South Congress', price: '$196', rating: '4.91', image: 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=900' },
      { title: 'Modern Hotel Room', area: 'The Domain', price: '$181', rating: '4.84', image: 'https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg?auto=compress&cs=tinysrgb&w=900' },
      { title: 'Luxury Lounge Suite', area: 'Downtown Austin', price: '$238', rating: '4.93', image: 'https://images.pexels.com/photos/262048/pexels-photo-262048.jpeg?auto=compress&cs=tinysrgb&w=900' }
    ],
    trends: [
      { label: 'Walkable restaurants', value: 94 },
      { label: 'Free parking', value: 88 },
      { label: 'Workspace / Wi-Fi', value: 82 },
      { label: 'Family-friendly stays', value: 73 },
      { label: 'Pet friendly', value: 69 }
    ],
    recommendation: {
      price: 168,
      neighborhood: 'South Congress',
      summary: 'Based on Austin demand, South Congress has strong weekend occupancy and premium pricing potential. Start at $168/night and apply a 14% weekend premium.',
      title: 'Design-forward South Congress stay near restaurants and music',
      description: 'Position this listing as a stylish Austin stay for weekend leisure guests, business travelers, and event visitors who want walkability, fast Wi-Fi, parking, and easy access to restaurants, music venues, and local shopping.',
      amenities: ['Fast Wi-Fi', 'Dedicated workspace', 'Free parking', 'Self check-in', 'Walkable restaurants', 'Pet-friendly option'],
      actionPlan: ['Prioritize South Congress or Downtown Austin for strongest revenue upside.', 'Start at $168/night and apply a 14% weekend premium.', 'Highlight walkability, workspace, parking, and event access.', 'Use event-week pricing for concerts, conferences, and sports weekends.', 'Position the listing for weekend leisure guests and business travelers.']
    }
  }
};

export function getMarket(city = 'Austin') {
  return marketData[city] || marketData.Austin;
}
