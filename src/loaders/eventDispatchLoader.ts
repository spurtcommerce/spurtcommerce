import { glob } from 'glob';
import { MicroframeworkLoader, MicroframeworkSettings } from 'microframework-w3tec';
import path from 'path';

import { env } from '../env';

/**
 * eventDispatchLoader
 * ------------------------------
 * This loads all the created subscribers and add-on hooks into the project,
 * so add-ons can automatically register their event listeners upon startup.
 */

export const eventDispatchLoader: MicroframeworkLoader = async (settings: MicroframeworkSettings | undefined) => {
  if (settings) {
    const patterns = [
      ...(Array.isArray(env.app.dirs.subscribers) ? env.app.dirs.subscribers : [env.app.dirs.subscribers]),
      path.join(process.cwd(), 'add-ons/**/subscribers/**/*Subscriber.ts').replace(/\\/g, '/'),
      path.join(process.cwd(), 'add-ons/**/subscribers/**/*Subscriber.js').replace(/\\/g, '/'),
      path.join(process.cwd(), 'add-ons/**/*Hook.ts').replace(/\\/g, '/'),
      path.join(process.cwd(), 'add-ons/**/*Hook.js').replace(/\\/g, '/'),
    ];

    for (const pattern of patterns) {
      try {
        const files = await glob(pattern);
        for (const file of files) {
          // Avoid running heavy data migration hook scripts on startup
          if (file.includes('VendorDemoDataMigrateHook')) {
            continue;
          }
          try {
            require(file);
          } catch (loadErr: any) {
            console.warn(`[eventDispatchLoader] Optional hook/subscriber "${file}" skipped: ${loadErr.message}`);
          }
        }
      } catch (err) {
        console.error(`Error processing pattern "${pattern}":`, err);
      }
    }
  }
};
