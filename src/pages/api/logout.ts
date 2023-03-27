import { withIronSessionApiRoute } from "iron-session/next";
import { ironOptions } from "../../lib/config";
import { NextApiRequest, NextApiResponse } from "next";

function logoutRoute(req: NextApiRequest, res: NextApiResponse) {
  req.session.destroy();
  res.json({ ok: true });
}

export default withIronSessionApiRoute(logoutRoute, ironOptions);
