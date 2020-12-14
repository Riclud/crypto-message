#! /usr/bin/env node

const { Command } = require("commander");
const cryptoJS = require("crypto-js");
const fs = require("fs");

const program = new Command();

program
  .command("crypt <text|file> <secretKey> <text|path>")
  .description("Encode text")
  .action((select, secretKey, target) => {
    try {
      if (select === "text") {
        console.log(cryptoJS.AES.encrypt(target, secretKey).toString());
        return;
      }
      if (select === "file") {
        fs.writeFileSync(
          target,
          cryptoJS.AES.encrypt(
            fs.readFileSync(target).toString(),
            secretKey
          ).toString()
        );
        return;
      }
      console.log("select text or file");
    } catch (error) {
      console.log(error);
    }
  });

program
  .command("decrypt <text|file> <secretKey> <text|path>")
  .description("Encode text")
  .action((select, secretKey, target) => {
    try {
      if (select === "text") {
        console.log(
          cryptoJS.AES.decrypt(target, secretKey).toString(cryptoJS.enc.Utf8)
        );
        return;
      }
      if (select === "file") {
        fs.writeFileSync(
          target,
          cryptoJS.AES.decrypt(
            fs.readFileSync(target).toString(),
            secretKey
          ).toString(cryptoJS.enc.Utf8)
        );
        return;
      }
      console.log("select text or file");
    } catch (error) {
      console.log(error);
    }
  });

program.parse(process.argv);
