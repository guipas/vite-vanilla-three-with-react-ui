export const load = () => {
  const data = localStorage.getItem('faerie_city_data');
  if (data) {
    return JSON.parse(data);
  }

  return null;
}