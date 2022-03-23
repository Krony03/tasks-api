export class JwtConst {
  public static readonly SECRET = process.env.JWT_SECRET || 'super-secret';
  public static readonly EXPIRES_IN = '5m';
}
