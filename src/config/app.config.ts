const MONGO_DB = 'mongodb://localhost:27017/nest-pokemon';

export default () => ({
  environment: process.env.NODE_ENV || 'dev',
  mongo_db: process.env.MONGO_DB || MONGO_DB,
  mongo_db_name: process.env.MONGO_DB_NAME || 'nest_pokemon_db',
  port: process.env.PORT || 3001,
  default_limit: +(process.env.DEFAULT_LIMIT || 7),
});
