import chalk from 'chalk';
import commander from 'commander';
import { readdir } from 'fs/promises';
import * as path from 'path';
import { env } from '../src/env';
import { getConnectionOptions } from 'typeorm';
import * as entities from '../src/common/entities-index';
import * as migrations from '../src/common/migrations-index';
import {
  runSeeder, createConnection
} from 'typeorm-seeding';

// Cli helper
commander
  .version('1.0.0')
  .description('Run database seeds of your project')
  .option('-L, --logging', 'enable sql query logging')
  .option('--factories <path>', 'add filepath for your factories')
  .option('--seeds <path>', 'add filepath for your seeds')
  .option('--run <seeds>', 'run specific seeds (file names without extension)', (val) => val.split(','))
  .option('--config <file>', 'path to your ormconfig.json file (must be a json)')
  .parse(process.argv);

// Get cli parameter for a different factory path
const factoryPath = (commander.factories)
  ? commander.factories
  : 'src/database/factories';

// Get cli parameter for a different seeds path
const seedsPath = (commander.seeds)
  ? commander.seeds
  : 'src/database/seeds';

// Get a list of seeds
const listOfSeeds = (commander.run)
  ? commander.run.map(l => l.trim()).filter(l => l.length > 0)
  : [];

// Search for seeds and factories
const run = async () => {
  const log = console.log;

  const factoryFiles = [];
  let seedFiles = [];

  const factoryAbsPath = path.join(__dirname + '/../' + factoryPath);
  const factoryFilesList: Array<Promise<void>> = (await readdir(factoryAbsPath, { withFileTypes: true }))
    .map(async dirent => {
      const key = dirent.name;
      factoryFiles.push(key);
    });

  await Promise.all(factoryFilesList);

  const seedsAbsPath = path.join(__dirname + '/../' + seedsPath);
  const seedsFilesList: Array<Promise<void>> = (await readdir(seedsAbsPath, { withFileTypes: true }))
    .map(async dirent => {
      const key = dirent.name;
      seedFiles.push(key);
    });

  await Promise.all(seedsFilesList);

  // Filter seeds
  if (listOfSeeds.length > 0) {
    seedFiles = seedFiles.filter(sf => listOfSeeds.indexOf(path.basename(sf).replace('.ts', '')) >= 0);
  }

  // Status logging to print out the amount of factories and seeds.
  log(chalk.bold('seeds'));
  log('🔎 ', chalk.gray.underline(`found:`),
    chalk.blue.bold(`${factoryFiles.length} factories`, chalk.gray('&'), chalk.blue.bold(`${seedFiles.length} seeds`)));

  // Get database connection and pass it to the seeder
  try {
    const loadedConnectionOptions = await getConnectionOptions();

    const connectionOptions = Object.assign(loadedConnectionOptions, {
      type: env.db.type as any, // See createConnection options for valid types
      host: env.db.host,
      port: env.db.port,
      username: env.db.username,
      password: env.db.password,
      database: env.db.database,
      synchronize: env.db.synchronize,
      logging: true,
      logger: 'advanced-console',
      entities: Object.values(entities),
      migrations: Object.values(migrations),
    });
    await createConnection(connectionOptions);
  } catch (error) {
    return handleError(error);
  }

  // Show seeds in the console
  for (const seedFile of seedFiles) {
    console.log(seedFile);
    try {
      let className = seedFile;
      className = className.replace('.ts', '').replace('.js', '');
      className = className.split('-')[className.split('-').length - 1];
      log('\n' + chalk.gray.underline(`executing seed:  `), chalk.green.bold(`${className}`));
      const seedFileObject: any = require(seedsAbsPath + '/' + className);
      await runSeeder(seedFileObject[className]);
    } catch (error) {
      console.error('Could not run seed ', error);
      process.exit(1);
    }
  }

  log('\n👍 ', chalk.gray.underline(`finished seeding`));
  process.exit(0);
};

const handleError = (error) => {
  console.error(error);
  process.exit(1);
};

run();
