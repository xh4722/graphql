const fs = require("fs-extra");

fs.emptyDirSync("dist");
fs.ensureDirSync("dist");
