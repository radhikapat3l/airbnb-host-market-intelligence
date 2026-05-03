import { useMemo, useState } from 'react';
import Head from 'next/head';
import { Search, Globe2, Menu, Heart, ChevronRight, Sparkles, SlidersHorizontal, MapPin, Users, X, Wand2, BadgeDollarSign } from 'lucide-react';
import { getMarket } from '../lib/marketData';

const tabs = [
  { icon: '🏠', label: 'Homes' },
  { icon: '🎈', label: 'Experiences', tag: 'NEW' },
  { icon: '🛎️', label: 'Services', tag: 'NEW' }
];

const goals = ['Maximize revenue', 'Stable occupancy', 'Long-term stays'];

export default function HomePage({ initialMarket }) {
  const [market, setMarket] = useState(initialMarket);
  const [city, setCity] = useState('Austin');
  const [propertyType, setPropertyType] = useState('1BR apartment');
  const [guests, setGuests] = useState('2-4 guests');
  const [goal, setGoal] = useState('Maximize revenue');
  const [loading, setLoading] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const [price, setPrice] = useState(initialMarket.recommendation.price);
  const [occupancy, setOccupancy] = useState(82);
  const [weekendPremium, setWeekendPremium] = useState(14);
  const [generated, setGenerated] = useState(null);

  const monthlyRevenue = useMemo(() => {
    const bookedNights = Math.round(30 * (occupancy / 100));
    const premiumLift = 1 + (weekendPremium / 100) * 0.28;
    return Math.round(price * bookedNights * premiumLift);
  }, [price, occupancy, weekendPremium]);

  async function analyzeMarket() {
    setLoading(true);
    setGenerated(null);
    await new Promise((resolve) => setTimeout(resolve, 900));
    const response = await fetch('/api/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ city, propertyType, guests, goal })
    });
    const data = await response.json();
    setMarket(data);
    setPrice(data.recommendation.price);
    setLoading(false);
  }

  function openNeighborhood(item) {
    setActiveModal({
      title: `${item.name} market insight`,
      image: null,
      content: <><p>{item.reason}</p><div className="modal-grid"><InfoBlock label="Demand drivers" value={item.drivers.join(', ')} /><InfoBlock label="Competition risk" value={item.risk} /><InfoBlock label="Suggested listing angle" value={item.angle} /><InfoBlock label="Recommended base price" value={`$${item.price}/night`} /></div></>
    });
  }

  function openListing(listing) {
    setActiveModal({
      title: listing.title,
      image: listing.image,
      content: <><p>{listing.insight}</p><div className="modal-grid"><InfoBlock label="Pricing gap" value={listing.gap} /><InfoBlock label="Competitor strength" value={listing.strength} /><InfoBlock label="Suggested action" value={listing.action} /><InfoBlock label="Top amenities" value={listing.amenities.join(', ')} /></div></>
    });
  }

  function generate(type) {
    if (type === 'title') setGenerated({ title: 'AI generated listing title', body: market.recommendation.title });
    if (type === 'description') setGenerated({ title: 'AI generated listing description', body: market.recommendation.description });
    if (type === 'amenities') setGenerated({ title: 'Amenities to highlight', body: market.recommendation.amenities.join(' • ') });
  }

  return (
    <>
      <Head><title>Airbnb Host Market Intelligence Concept</title><meta name="description" content="An Airbnb-style AI market intelligence dashboard for hosts." /></Head>
      <div className="page-shell">
        <header className="airbnb-header">
          <div className="airbnb-logo" aria-label="Airbnb logo"><AirbnbLogo /><span>airbnb</span></div>
          <nav className="category-tabs">{tabs.map((tab, index) => <button key={tab.label} className={index === 0 ? 'tab active' : 'tab'}>{tab.tag && <small>{tab.tag}</small>}<span>{tab.icon}</span>{tab.label}</button>)}</nav>
          <div className="header-actions"><button className="host-link">Become a host</button><button className="circle-btn"><Globe2 size={18} /></button><button className="circle-btn"><Menu size={20} /></button></div>
        </header>

        <section className="search-zone"><div className="search-pill"><label><strong>Where</strong><input value={city} onChange={(e) => setCity(e.target.value)} /></label><label><strong>When</strong><span>Next 90 days</span></label><label><strong>Who</strong><select value={guests} onChange={(e) => setGuests(e.target.value)}><option>1-2 guests</option><option>2-4 guests</option><option>4-6 guests</option></select></label><label><strong>What</strong><select value={propertyType} onChange={(e) => setPropertyType(e.target.value)}><option>1BR apartment</option><option>Studio</option><option>2BR home</option><option>Hotel-style room</option></select></label><button className="search-button" onClick={analyzeMarket}><Search size={24} /></button></div></section>

        <main className="content">
          <section className="hero-product"><div><p className="eyebrow">AI-powered host tool</p><h1>Market intelligence that feels built into Airbnb hosting.</h1><p>Choose a market, scan demand, benchmark competitors, simulate revenue, and generate a host action plan before listing your property.</p><div className="goal-row">{goals.map((item) => <button key={item} onClick={() => setGoal(item)} className={goal === item ? 'goal active' : 'goal'}>{item}</button>)}</div><button className="primary-cta" onClick={analyzeMarket}>{loading ? 'Scanning market...' : 'Analyze market'}<Sparkles size={18} /></button></div><div className="scan-card"><div className="scan-header"><span className={loading ? 'live-dot pulsing' : 'live-dot'} />{loading ? 'AI scan running' : 'Live market scan complete'}</div><ScanStep active={loading} label="Reading local demand signals" /><ScanStep active={loading} label="Benchmarking nearby competitor listings" /><ScanStep active={loading} label="Detecting pricing opportunities" /><ScanStep active={loading} label="Generating host action plan" /><div className="confidence-box"><span>Recommendation confidence</span><strong>{market.confidence || 92}%</strong></div></div></section>

          <section className="listing-section"><SectionTitle title={`Popular homes in ${market.city}`} /><div className="listing-row">{market.listings.map((listing) => <ListingCard key={listing.title} listing={listing} onClick={() => openListing(listing)} />)}</div></section>
          <section className="listing-section"><SectionTitle title="Great hotels for your next trip" subtitle="Use hotel prices as a ceiling benchmark for premium host positioning." /><div className="listing-row compact">{market.hotels.map((hotel) => <HotelCard key={hotel.title} hotel={hotel} />)}</div></section>

          <section className="intelligence-grid">
            <article className="panel large-panel"><PanelHeader step="Step 1" title="Neighborhood recommendations" icon={<MapPin size={20} />} /><div className="neighborhood-grid">{market.neighborhoods.map((item, index) => <button key={item.name} className="neighborhood-card" onClick={() => openNeighborhood(item)}><div className="rank-badge">#{index + 1}</div><h3>{item.name}</h3><p>{item.reason}</p><div className="tag-row"><span>{item.demand}</span><span>{item.competition} competition</span><span>{item.revenue}</span></div><div className="score-row"><strong>{item.score}</strong><span>AI score</span><ChevronRight size={18} /></div></button>)}</div></article>
            <article className="panel"><PanelHeader step="Step 2" title="Pricing simulator" icon={<SlidersHorizontal size={20} />} /><Slider label="Base nightly price" value={price} min={120} max={240} prefix="$" onChange={setPrice} /><Slider label="Occupancy assumption" value={occupancy} min={50} max={95} suffix="%" onChange={setOccupancy} /><Slider label="Weekend premium" value={weekendPremium} min={0} max={30} suffix="%" onChange={setWeekendPremium} /><div className="revenue-box"><span>Projected monthly revenue</span><strong>${monthlyRevenue.toLocaleString()}</strong><small>${(monthlyRevenue * 12).toLocaleString()} annualized estimate</small></div></article>
            <article className="panel"><PanelHeader step="Step 3" title="Guest demand trends" icon={<Users size={20} />} /><div className="trend-stack">{market.trends.map((trend) => <div key={trend.label} className="trend-line"><div><span>{trend.label}</span><strong>{trend.value}%</strong></div><div className="progress-track"><div style={{ width: `${trend.value}%` }} /></div></div>)}</div></article>
            <article className="panel ai-panel"><PanelHeader step="Step 4" title="AI host recommendation" icon={<Wand2 size={20} />} /><p>{market.recommendation.summary}</p><h2>${market.recommendation.price}/night</h2><div className="ai-actions"><button onClick={() => generate('title')}>Generate title</button><button onClick={() => generate('description')}>Generate description</button><button onClick={() => generate('amenities')}>Suggest amenities</button></div>{generated && <div className="generated-box"><strong>{generated.title}</strong><p>{generated.body}</p></div>}</article>
          </section>

          <section className="action-plan"><div><BadgeDollarSign size={24} /><h2>AI host action plan</h2></div><ol>{market.recommendation.actionPlan.map((step) => <li key={step}>{step}</li>)}</ol></section>
        </main>
        {activeModal && <div className="modal-backdrop" onClick={() => setActiveModal(null)}><div className="insight-modal" onClick={(event) => event.stopPropagation()}><button className="close-btn" onClick={() => setActiveModal(null)}><X size={20} /></button>{activeModal.image && <img src={activeModal.image} alt={activeModal.title} />}<h2>{activeModal.title}</h2>{activeModal.content}</div></div>}
      </div>
    </>
  );
}

export async function getStaticProps() {
  return { props: { initialMarket: { ...getMarket('Austin'), confidence: 92 } } };
}

function AirbnbLogo() { return <svg viewBox="0 0 448 512" aria-hidden="true"><path fill="currentColor" d="M224 373.12c-25.24-31.67-40.08-59.43-45-83.18-22.55-88 112.61-88 90.06 0-5.45 24.25-20.29 52-45 83.18zm138.15 73.23c-42.06 18.31-83.67-10.88-119.3-50.47 103.9-130.07 46.11-200-18.85-200-54.92 0-85.16 46.51-73.28 100.5 6.93 29.19 25.23 62.39 54.43 99.5-32.53 36.05-60.55 52.69-85.15 54.92-50 7.43-89.11-41.06-71.3-91.09 15.1-39.16 111.72-231.18 115.87-241.56 15.75-30.07 25.56-57.4 59.38-57.4 32.34 0 43.4 25.94 60.37 59.87 36 70.62 89.35 177.48 114.84 239.09 13.17 33.07-1.37 71.29-37.01 86.64zm47-136.12C280.27 35.93 273.13 32 224 32c-45.52 0-64.87 31.67-84.66 72.79C33.18 317.1 22.89 347.19 22 349.81-3.22 419.14 48.74 480 111.63 480c21.71 0 60.61-6.06 112.37-62.4 58.68 63.78 101.26 62.4 112.37 62.4 62.89.05 114.85-60.86 89.61-130.19.02-3.89-16.82-38.9-16.82-39.58z" /></svg>; }
function SectionTitle({ title, subtitle }) { return <div className="section-title"><div><h2>{title}</h2>{subtitle && <p>{subtitle}</p>}</div><div className="arrow-pair"><button>‹</button><button>›</button></div></div>; }
function ListingCard({ listing, onClick }) { return <button className="airbnb-card" onClick={onClick}><div className="image-wrap"><img src={listing.image} alt={listing.title} /><span className="favorite-badge">{listing.type}</span><Heart className="heart-icon" size={27} /></div><h3>{listing.title}</h3><p>{listing.area}</p><div className="listing-meta"><span>{listing.price} night</span><span>★ {listing.rating}</span><span>{listing.occupancy} occ.</span></div></button>; }
function HotelCard({ hotel }) { return <button className="airbnb-card hotel-card"><div className="image-wrap"><img src={hotel.image} alt={hotel.title} /><Heart className="heart-icon" size={27} /></div><h3>{hotel.title}</h3><p>{hotel.area}</p><div className="listing-meta"><span>{hotel.price} night</span><span>★ {hotel.rating}</span></div></button>; }
function PanelHeader({ step, title, icon }) { return <div className="panel-header"><div><span>{step}</span><h2>{title}</h2></div>{icon}</div>; }
function ScanStep({ active, label }) { return <div className={active ? 'scan-step active' : 'scan-step'}><span />{label}</div>; }
function Slider({ label, value, min, max, prefix = '', suffix = '', onChange }) { return <label className="slider-control"><div><span>{label}</span><strong>{prefix}{value}{suffix}</strong></div><input type="range" min={min} max={max} value={value} onChange={(event) => onChange(Number(event.target.value))} /></label>; }
function InfoBlock({ label, value }) { return <div className="info-block"><span>{label}</span><p>{value}</p></div>; }
