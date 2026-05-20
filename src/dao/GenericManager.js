import fs from "fs";
import { root } from "../utils.js";
export class GenericManager {

    constructor(path) {
        this.filePath = `${root}/dao/data/${path}`;

        if (!fs.existsSync(this.filePath)) {
            fs.mkdirSync(root + "/dao/data", () => {
                fs.writeFileSync(`${root}/data/${path}`, JSON.stringify([]), { encoding: "utf-8" });
                this.filePath = `${root}/data/${path}`
            });
        }
    }
}