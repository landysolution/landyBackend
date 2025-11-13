import pkg from 'openid';
const { RelyingParty } = pkg;

const realm = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:9000';
const returnUrl = `${realm}/steam/return`;

export const relyingParty = new RelyingParty(
  returnUrl, // Return URL
  realm,     // Realm
  true,      // Stateless
  false,     // Strict mode
  []         // Extensions
);
