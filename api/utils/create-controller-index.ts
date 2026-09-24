import * as fg from 'fast-glob';
import * as fs from 'fs';
import * as path from 'path';

// tslint:disable-next-line:typedef
function createControllerIndex() {
  console.log('Creating controller-index.ts for api app');
  let src = path.join(path.dirname(__dirname), 'src');
  if (process.argv[2]) {
    src = `${path.dirname(__dirname)}/${process.argv[2]}/src`;
  }
  if (!fs.existsSync(src)) {
    console.log(`App api cannot be found. Path not exist: ${src}`);
    process.exit(1);
  }
  let addOn = path.join(path.dirname(__dirname), 'add-ons');
  if (process.argv[2]) {
    addOn = `${path.dirname(__dirname)}/${process.argv[2]}/add-ons`;
  }
  const outDir = path.join(src, 'common');
  const tmpFile = path.join(outDir, 'tmp-controller-index.ts');
  const outFile = path.join(outDir, 'controller-index.ts');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir);
  }
  // src
  for (const item of fg.sync(path.join(src, 'api', '**', '**', '*Controller.ts').replace(/\\/g, '/'))) {
    const filePath = path.relative(outDir, item).replace(/\.ts$/, '').replace(/\\/g, '/');
    const data = `export * from '${filePath}';\n`;
    fs.writeFileSync(tmpFile, data, { flag: 'a+' });
  }
  // addons
  console.log(path.join(addOn, '**', 'controllers', '**', '*Controller.ts'));
  for (const item of fg.sync(path.join(addOn, '**', 'controllers', '**', '*Controller.ts').replace(/\\/g, '/'))) {
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
