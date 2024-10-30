import * as fg from 'fast-glob';
import * as fs from 'fs';
import * as path from 'path';

// tslint:disable-next-line:typedef
function createControllerIndex() {
  const src = `${path.dirname(__dirname)}/src`;
  if (!fs.existsSync(src)) {
    console.log(`App api cannot be found. Path not exist: ${src}`);
    process.exit(1);
  }
  const outDir = path.join(src, 'common');
  const tmpFile = path.join(outDir, 'tmp-middleware-index.ts');
  const outFile = path.join(outDir, 'middleware-index.ts');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir);
  }
  for (const item of fg.sync(path.join(src, 'api', '**', '**', '*Middleware.ts').replace(/\\/g, '/'))) {
    const filePath = path.relative(outDir, item).replace(/\.ts$/, '').replace(/\\/g, '/');
    const data = `export * from '${filePath}';\n`;
    fs.writeFileSync(tmpFile, data, { flag: 'a+' });
  }
  if (fs.existsSync(outFile) && fs.existsSync(tmpFile)) {
    fs.unlinkSync(outFile);
    console.log(`Old file '${outFile}' removed`);
  }
  if (fs.existsSync(tmpFile)) {
    fs.renameSync(tmpFile, outFile);
    console.log(`New file ${outFile} saved`);
  }
}
createControllerIndex();
