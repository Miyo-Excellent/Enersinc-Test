export default async () =>
  await fetch(
    'https://api.eia.gov/series/?api_key=f8e294cce8855b7fa91bbbd11f0e31e4&series_id=ELEC.GEN.ALL-CA-97.M',
  ).then((data) => data.json());
