import express, { Request, Response } from "express";
import { logger } from "../config";
import { query, validationResult } from "express-validator";

const port = 3000;

// 指定したミリ秒で待機する関数
const sleep = (waitMsec: number): void => {
  const startMsec = new Date();
  while (new Date().getTime() - startMsec.getTime() < waitMsec);
  return;
};

const main = async () => {
  // expressの設定
  const app = express();

  app.get(
    "/time",
    query("mseq").isInt().not().isEmpty(),
    async (req: Request, res: Response) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        logger.error("validation error");
        return res.status(422).json({ errors: errors.array() });
      }
      const startDateTime = new Date().getTime();
      sleep(Number(req.query.mseq));
      res.send("time");
      logger.info(`access time: ${new Date().getTime() - startDateTime}`);
    }
  );

  // サーバ起動
  app.listen(port, () => console.log(`app running!!`));
};

main();
