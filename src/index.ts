import express from "express";

const main = async () => {
  // expressの設定
  const app = express();

  app.get("/", (req, res) => {
    console.log("GET /");
    console.log(req.headers.host);
    const subDomain = req.headers.host
      ? req.headers.host.match(/(.*)\.localhost\.com/)
      : undefined;
    if (!subDomain) throw new Error();
    console.log("subDomain: ", subDomain[1]);
    console.log("END /");
    res.send("サブドメイン：" + subDomain[1]);
  });

  // サーバ起動
  app.listen(3000, () => console.log(`app running`));
};

main();
