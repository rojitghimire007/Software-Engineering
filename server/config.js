const Port = process.env.PORT || 8000,
  SaltRounds = parseInt(process.env.SALT) || 10,
  JWTConfig = process.env.JWTCONFIG || 'config',
  JWTExpiresIn = process.env.JWTEXP || '20000h';

module.exports = { SaltRounds, JWTConfig, JWTExpiresIn };
