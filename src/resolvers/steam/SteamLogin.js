import { relyingParty } from "./OpenId.js";
const SteamLogin = (req, res) => {
  const redirect = req.query.redirect || "/"; // default fallback
  relyingParty.authenticate(
    "https://steamcommunity.com/openid/",
    false,
    (err, authUrl) => {
      if (err) return res.status(500).send("Error connecting to Steam");
      // append redirect to Steam return URL
      const url = new URL(authUrl);
      url.searchParams.set("redirect", redirect);
      res.redirect(url.toString());
    }
  );
};

export default SteamLogin;
