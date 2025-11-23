import { relyingParty } from "./OpenId.js";
import axios from "axios";
import UserModel from "../../model/UserModel.js";
import jwt from "jsonwebtoken";
const SteamReturn = (req, res) => {
  relyingParty.verifyAssertion(req, async (err, result) => {
    if (err || !result.authenticated)
      return res.status(401).json({ error: "Steam authentication failed" });

    const claimedId = result.claimedIdentifier;
    const steamId =
      claimedId.match(/\/id\/(\d+)$/)?.[1] || claimedId.split("/").pop();

    // Fetch Steam profile info
    const apiKey = process.env.STEAM_API_KEY;
    try {
      const { data } = await axios.get(
        "https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/",
        {
          params: {
            key: apiKey,
            steamids: steamId,
          },
        }
      );

      const steamUser = data.response.players[0];
      let user = await UserModel.findOne({ steamId });
      if (!user) {
        user = await UserModel.create({
          steamId: steamId,
          username: steamUser.personaname,
          avatar: steamUser.avatarfull,
          profileUrl: steamUser.profileurl,
        });
      } else {
        user.username = steamUser.personaname;
        user.avatar = steamUser.avatarfull;
        user.profileUrl = steamUser.profileurl;
        await user.save();
      }
      const token = jwt.sign(
        { id: user._id, steamId: user.steamId },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      res.cookie("token", token, {
        httpOnly: true,
        sameSite: "lax",
        secure: true,
      });
      // const redirectTo = req.query.redirect || "/";
      res.redirect(process.env.FRONT_TEST);
    } catch (e) {
      res
        .status(500)
        .json({ error: "Failed to fetch Steam user data", details: e.message });
    }
  });
};

export default SteamReturn;
