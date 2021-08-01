import express from "express";
// import "reflect-metadata";
// import { getConnectionOptions, createConnection } from "typeorm";

const main = async () => {
  // // TypeORMの設定
  // const connectionOptions = await getConnectionOptions();
  // await createConnection(connectionOptions);

  // expressの設定
  const app = express();

  app.use((req, res, next) => {
    try {
      // Get UserInfo from JWT(省略)
      const userId = "xxxxxxxx";

      // Get subdomain.
      if (!req.headers.host) throw new Error();
      if (req.headers.host.startsWith("192.168")) return res.sendStatus(200); // For HealthCheck（temporary）
      const subDomain = req.headers.host.match(/(.*)\.tech-nkmr\.com/) || [
        req.headers.host,
        "",
      ];

      // Get conmanyId from company management table.
      //const { id } = await this.companyRepository.find({ userId, subDomain[1] });
      const id = subDomain[1];

      // Set userId and companyId into Response object.
      res.locals.userInfo = { userId, companyId: id, subDomain: subDomain[1] };
      next();
    } catch (err) {
      console.error(err);
      res.status(403).send();
    }
  });

  app.get("/", (req, res) => {
    console.log("GET /");
    /*
      Some Implementations.
    */
    console.log("END /");
    res.send("サブドメイン：" + res.locals.userInfo.subDomain);
  });

  // サーバ起動
  app.listen(3000, () => console.log(`app running`));
};

main();
