export default {
  postgres: {
    host: process.env.POSTGRES_HOST || 'localhost',
    port: process.env.POSTGRES_PORT || 5432,
    username: process.env.POSTGRES_USERNAME || 'postgres',
    password: process.env.POSTGRES_PASSWORD || 'postgres',
    database: process.env.DB_NAME || 'ddd-boilerplate',
  },
};
