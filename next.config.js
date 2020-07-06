// must restart server whenever you make changes in next.config
module.exports = {
  env: {
    MONGO_SRV:
      'mongodb+srv://laurelinduilwen:paspasdupas@cluster0-wy9m7.mongodb.net/test?retryWrites=true&w=majority',
    JWT_SECRET: '<insert-jwt-secret>',
    CLOUDINARY_URL: 'https://api.cloudinary.com/v1_1/dga7aivbr/image/upload',
    STRIPE_SECRET_KEY: '<insert-stripe-secret-key>',
  },
};
