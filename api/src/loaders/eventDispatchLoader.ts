import { glob } from 'glob';
import { MicroframeworkLoader, MicroframeworkSettings } from 'microframework-w3tec';

import { env } from '../env';

/**
 * eventDispatchLoader
 * ------------------------------
 * This loads all the created subscribers into the project, so we do not have to
 * import them manually
 */

export const eventDispatchLoader: MicroframeworkLoader = async (settings: MicroframeworkSettings | undefined) => {
  if (settings) {
    const patterns = env.app.dirs.subscribers;
    for (const pattern of patterns) {
      try {
        const files = await glob(pattern); // Direct promise-based usage
        for (const file of files) {
          require(file);
        }
      } catch (err) {
        console.error(`Error processing pattern "${pattern}":`, err);
      }
    }
  }
};
