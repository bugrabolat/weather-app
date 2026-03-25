const API_KEY = "AIzaSyBTi1_MKJZPtG8Nw11sab1a9JdV_3b7rzc";

const getLocation = async (search: string) => {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${search}&key=${API_KEY}`
  );

  const data = await response.json();
  return data;
};

export { getLocation };
