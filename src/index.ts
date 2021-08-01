import express from "express";

const main = async () => {
  // expressの設定
  const app = express();

  app.get("/", (req, res) => {
    console.log("GET /");
    const subDomain = req.headers.host.match(/([a-z]{1,})\.nkmr-kz\.com)/);
    console.log("subDomain: ", subDomain);
    console.log("END /");
    res.send("Hello");
  });

  // サーバ起動
  app.listen(3000, () => console.log(`app running`));
};

main();
