// run `node index.js` in the terminal
import { processEmailImages } from "./src/index";
const fs = require("fs");
const path = require("path");

//read a file from the /emails directory
const emailHtml = await fs
  .readFileSync(path.join(__dirname, "emails", "email-body.txt"), "utf8")
  .toString();

// console.log(content);
const s3Config = {
  region: process.env.AWS_REGION || "us-east-1",
  bucket: process.env.S3_BUCKET_NAME || "my-bucket",
  baseUrl: process.env.S3_BASE_URL || "https://my-bucket.s3.amazonaws.com",
};

// Example usage
processEmailImages(emailHtml, s3Config)
  .then((updatedContent) => {
    console.log(updatedContent);
  })
  .catch((error) => {
    console.error("Error processing images:", error);
  });
console.log(`Hello Node.js v${process.versions.node}!`);
