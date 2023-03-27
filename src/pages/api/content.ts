import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import { readContract, erc721ABI } from "@wagmi/core";

import { ironOptions } from "../../lib/config";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (
    !(
      process.env.CONTRACT_ADDRESS &&
      process.env.CHAIN_ID &&
      process.env.MESSAGE
    )
  ) {
    res.status(500).end(`Missing environment variables.`);
  } else {
    const { method } = req;
    switch (method) {
      case "GET":
        // @ts-ignore FIXME session typing
        if (!req.session.siwe) {
          res.status(401).end("Unauthorized, please sign in first.");
        } else {
          try {
            const tokenBalance = await readContract({
              // @ts-ignore FIXME 0x… string type
              address: process.env.CONTRACT_ADDRESS,
              abi: erc721ABI,
              functionName: "balanceOf",
              chainId: parseInt(process.env.CHAIN_ID),
              // @ts-ignore FIXME session typing
              args: [req.session.siwe.address],
            });
            if (tokenBalance.gte("1")) {
              res.status(200).end(`${process.env.MESSAGE}`);
            } else {
              res
                .status(401)
                .json("Unauthorized, you do not own the required ERC721 NFT.");
            }
          } catch (_error) {
            res.status(500).end("Unknown server error.");
          }
        }
        break;
      default:
        res.setHeader("Allow", ["GET"]);
        res.status(405).end(`Method ${method} Not Allowed.`);
    }
  }
};

export default withIronSessionApiRoute(handler, ironOptions);
