import dataSource from "./dataSource";


dataSource.initialize()
  .then(() => {
    console.log("📦 Data Source connected successfully");
  })
  .catch((err) => {
    console.error("❌ Error during Data Source initialization", err);
  });
