import fs from "fs";

export default function load() {
  const inputFile = fs.readFileSync("input.txt", "utf-8");
  return inputFile.split(/\r?\n/);
}
