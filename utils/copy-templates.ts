import * as fg from 'fast-glob';
import * as fs from 'fs';
import * as path from 'path';

// tslint:disable-next-line:typedef
function copyTemplate() {
  let addOn = path.join(path.dirname(__dirname), 'add-ons');
  const distAddOn = path.join(path.dirname(__dirname), 'dist', 'add-ons');
  if (process.argv[2]) {
    addOn = `${path.dirname(__dirname)}/${process.argv[2]}/add-ons`;
  }
  // addons
  for (const item of fg.sync(path.join(addOn, '**', 'template', '**', '*.ejs').replace(/\\/g, '/'))) {
    const splitStringValue = splitString(item, 'add-ons/');
    const dist = path.join(distAddOn, splitStringValue).replace(/\\/g, '/');
    const distFolderPath = path.join(distAddOn, splitString(splitStringValue, 'template', false)).replace(/\\/g, '/');
    if (!fs.existsSync(distFolderPath + 'template')) {
      fs.mkdirSync(distFolderPath + 'template');
    }
    fs.copyFileSync(item, dist);
  }
}
copyTemplate();

function splitString(text: any, rawPos: any, position: boolean = true): string {
  // tslint:disable-next-line:no-bitwise
  const splitValue = text.split(rawPos);
  return (splitValue.length > 1 && position) ? splitValue[1] : splitValue[0];
}
