const baseUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://ecommerce-mern-tau.vercel.app/'
    : 'http://localhost:3000';

export default baseUrl;
