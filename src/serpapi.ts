export async function getRealSEOData(url: string, apiKey: string) {
  const domain = url.replace(/^https?:\/\//, '').replace(/\/.*$/, '');
  try {
    const res = await fetch(`https://serpapi.com/search.json?q=site:${domain}&api_key=${apiKey}&hl=fr&gl=fr&num=5`);
    const data = await res.json();
    const organic = data.organic_results || [];
    const first = organic[0] || {};
    const snippet = (first.snippet || '') + ' ' + (first.title || '');
    const cities = ['Lyon','Marseille','Bordeaux','Toulouse','Nantes','Strasbourg','Lille','Rennes','Montpellier','Nice','Grenoble','Annecy','Paris','Metz','Nancy','Dijon','Caen','Rouen','Reims','Toulon'];
    const city = cities.find(c => snippet.toLowerCase().includes(c.toLowerCase())) || '';
    const industry = first.title?.split(' - ').pop() || '';
    const compRes = await fetch(`https://serpapi.com/search.json?q=${encodeURIComponent(industry+' '+city)}&api_key=${apiKey}&hl=fr&gl=fr&num=10`);
    const compData = await compRes.json();
    const competitors = (compData.organic_results || []).filter((r: any) => !r.link?.includes(domain)).slice(0, 3).map((r: any) => ({ name: r.title?.split(' - ')[0], url: r.displayed_link, snippet: r.snippet }));
    return { domain, city, industry, snippet, competitors };
  } catch(e) {
    return { domain, city: '', industry: '', snippet: '', competitors: [] };
  }
}
