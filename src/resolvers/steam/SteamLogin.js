import { relyingParty } from "./OpenId.js";
const SteamLogin = (req, res) => {
  relyingParty.authenticate(
    "https://steamcommunity.com/openid/",
    false,
    (err, authUrl) => {
      if (err) return res.status(500).send("Error connecting to Steam");
      res.redirect(authUrl);
    }
  );
};
export default SteamLogin;
