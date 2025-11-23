const Logout = (req,res) =>{
 res.clearCookie("token", {
    httpOnly: true,
    sameSite: "lax",
    secure: true, // true in production (HTTPS)
  });
  res.json({ message: "Logged out successfully" });
}
export default Logout