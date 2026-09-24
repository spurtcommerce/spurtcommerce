/**
 * Windows: Please do not use trailing comma as windows will fail with token error
 */
const { series, rimraf,  } = require('nps-utils');

// const npsUtils = require('nps-utils');
 
// const { rimraf,  series } = npsUtils;

module.exports = {
    scripts: {
        default: 'nps start',
        /**
         * Starts the builded app from the dist directory.
         */
        start: {
            script: 'cross-env NODE_ENV=development node dist/src/app.js',
            description: 'Starts the builded app',
        },
        /**
         * Starts the builded app from the dist directory.
         */
        qa: {
            script: 'cross-env NODE_ENV=qa node dist/src/app.js',
            description: 'Starts the builded app',
        },
        /**
         * Starts the builded app from the dist directory.
         */
        development: {
            script: 'cross-env NODE_ENV=development node dist/app.js',
            description: 'Starts the builded app',
        },
        /**
         * Starts the builded app from the dist directory.
         */
        production: {
            script: 'cross-env NODE_ENV=production node dist/app.js',
            description: 'Starts the builded app',
        },
        /**
         * Serves the current app and watches for changes to restart it
         */
        serve: {
            inspector: {
                script: series(
                    'nps banner.serve',
                    'apidoc -i src -i add-ons -o src/public/apidoc',
                    'nodemon --watch src --watch .env --inspect'
                ),
                description: 'Serves the current app and watches for changes to restart it, you may attach inspector to it.'
            },
            script: series(
                'nps banner.serve',
                'apidoc -i src -i add-ons -o src/public/apidoc',
                'nodemon --watch src --watch .env --watch add-ons'
            ),
            description: 'Serves the current app and watches for changes to restart it'
        },
        /**
         * Setup of the development environment
         */
        setup: {
            script: series(
                'npm install',
                'nps db.setup'),
            description: 'Setup`s the development environment(npm & database)'
        },
        /**
         * Generate the api documentation
         */
        generateapidoc: {
            script: series(
                'apidoc -i src -i add-ons -o src/public/apidoc'
            ),
            description: 'Setup`s the development environment(npm & database)'
        },
        /**
         * Setup of the database sample data
         */
        dbseed: {
            script: series(
                'npm install',
                'nps db.seed'
            ),
            description: 'Setup`s the database sample data'
        },
        /**
         * Creates the needed configuration files
         */
        config: {
            script: series(
                runFast('./commands/tsconfig.ts')
            ),
            hiddenFromHelp: true
        },
        /**
         * Builds the app into the dist directory
         */
        build: {
            script: series(
                'nps banner.build',
                'nps config',
                'nps lint',
                'nps pluginLintChecking',
                'nps clean.dist',
                'nps transpile',
                'nps generateapidoc',
                'nps copy',
                'nps copy.tmp',
                'nps clean.tmp'
            ),
            description: 'Builds the app into the dist directory'
        },
        /**
         * Runs TSLint over your project
         */
        lint: {
            script: tslint(`./src/**/*.ts`),
            hiddenFromHelp: true
        },
        /**
         * Runs TSLint over your Plugins
         */
        pluginLintChecking: {
            script: tslint(`./add-ons/**/*.ts`),
            hiddenFromHelp: true
        },
        /**
         * Transpile your app into javascript
         */
        transpile: {
            script: `tsc --project ./tsconfig.build.json`,
            hiddenFromHelp: true
        },
        /**
         * Clean files and folders
         */
        clean: {
            default: {
                script: series(
                    `nps banner.clean`,
                    `nps clean.dist`
                ),
                description: 'Deletes the ./dist folder'
            },
            dist: {
                script: rimraf('./dist'),
                hiddenFromHelp: true
            },
            tmp: {
                script: rimraf('./.tmp'),
                hiddenFromHelp: true
            },
            beforeBuild: {
                script: rimraf('./.beforeBuild'),
                hiddenFromHelp: true
            }
        },
        /**
         * Copies static files to the build folder
         */
        copy: {
            default: {
                script: series(
                    `nps copy.swagger`,
                    `nps copy.public`,
                    `nps copy.apidoc`,
                ),
                hiddenFromHelp: true
            },
            swagger: {
                script: copy(
                    './src/api/swagger.json',
                    './dist/src/'
                ),
                hiddenFromHelp: true
            },
            apidoc: {
                script: copyDir(
                    './src/public/',
                    './dist/src/public/'
                ),
                hiddenFromHelp: true
            },
            public: {
                script: copy(
                    './src/public/*',
                    './dist/src'
                ),
                hiddenFromHelp: true
            },
            tmp: {
                script: copyDir(
                    './.tmp',
                    './dist'
                ),
                hiddenFromHelp: true
            }
        },
        /**
         * Database scripts
         */
        db: {
            migrate: {
                script: series(
                    'nps banner.migrate',
                    'nps config',
                    runFast('./node_modules/typeorm/cli.js migration:run')
                ),
                description: 'Migrates the database to newest version available'
            },
            revert: {
                script: series(
                    'nps banner.revert',
                    'nps config',
                    runFast('./node_modules/typeorm/cli.js migration:revert')
                ),
                description: 'Downgrades the database'
            },
            seed: {
                script: series(
                    'nps banner.seed',
                    'nps config',
                    runFast('./commands/seed.ts')
                ),
                description: 'Seeds generated records into the database'
            },
            setup: {
                script: series(
                    'nps db.migrate'
                ),
                description: 'Recreates the database with seeded data'
            }
        },
        /**
         * These run various kinds of tests. Default is unit.
         */
        test: {
            default: 'nps test.unit',
            unit: {
                default: {
                    script: series(
                        'nps banner.testUnit',
                        'nps test.unit.pretest',
                        'nps test.unit.run'
                    ),
                    description: 'Runs the unit tests'
                },
                pretest: {
                    script: tslint(`./test/unit/**.ts`),
                    hiddenFromHelp: true
                },
                run: {
                    script: 'cross-env NODE_ENV=test jest --testPathPattern=unit',
                    hiddenFromHelp: true
                },
                verbose: {
                    script: 'nps "test --verbose"',
                    hiddenFromHelp: true
                },
                coverage: {
                    script: 'nps "test --coverage"',
                    hiddenFromHelp: true
                }
            },
            integration: {
                default: {
                    script: series(
                        'nps banner.testIntegration',
                        'nps test.integration.pretest',
                        'nps test.integration.run'
                    ),
                    description: 'Runs the integration tests'
                },
                pretest: {
                    script: tslint(`./test/integration/**.ts`),
                    hiddenFromHelp: true
                },
                run: {
                    // -i. Run all tests serially in the current process, rather than creating a worker pool of child processes that run tests. This can be useful for debugging.
                    script: 'cross-env NODE_ENV=test jest --testPathPattern=integration -i',
                    hiddenFromHelp: true
                },
                verbose: {
                    script: 'nps "test --verbose"',
                    hiddenFromHelp: true
                },
                coverage: {
                    script: 'nps "test --coverage"',
                    hiddenFromHelp: true
                }
            },
            e2e: {
                default: {
                    script: series(
                        'nps banner.testE2E',
                        'nps test.e2e.pretest',
                        'nps test.e2e.run'
                    ),
                    description: 'Runs the e2e tests'
                },
                pretest: {
                    script: tslint(`./test/e2e/**.ts`),
                    hiddenFromHelp: true
                },
                run: {
                    // -i. Run all tests serially in the current process, rather than creating a worker pool of child processes that run tests. This can be useful for debugging.
                    script: 'cross-env NODE_ENV=test jest --testPathPattern=e2e -i',
                    hiddenFromHelp: true
                },
                verbose: {
                    script: 'nps "test --verbose"',
                    hiddenFromHelp: true
                },
                coverage: {
                    script: 'nps "test --coverage"',
                    hiddenFromHelp: true
                }
            },
        },
        /**
         * This creates pretty banner to the terminal
         */
        banner: {
            build: banner('build'),
            serve: banner('serve'),
            testUnit: banner('test.unit'),
            testIntegration: banner('test.integration'),
            testE2E: banner('test.e2e'),
            migrate: banner('migrate'),
            seed: banner('seed'),
            revert: banner('revert'),
            clean: banner('clean')
        },
        /**
         * Builds the store app into the dist directory
         */
         storeBuild: {
            script: series(
                'nps banner.build',
                'nps storeCopy',
                'nps microServiceConfig',
                'nps microServiceGenerateUtills',
                'nps lintConfig',
                'nps clean.dist',
                'nps transpileMicroService',
                'nps generateMicroServiceapidoc',
                'nps microServiceCopyAfterBuild',
                'nps microServiceCopyAfterBuild.tmp',
                'nps clean.tmp',
                'nps clean.beforeBuild'
            ),
            description: 'Builds the app into the dist directory'
        },
        /**
         * Befor build make micro service folder
         */
         storeCopy: {
            default: {
                script: series(
                    `nps storeCopy.beforeCoreBuild`,
                    `nps storeCopy.beforeAddOnBuild`,
                    `nps storeCopy.beforeCopyPackage`,
                ),
                hiddenFromHelp: true
            },
            beforeCoreBuild: {
                script: copyCPYDir(
                    './src/',
                    './.beforeBuild',
                    "'!./src/api/admin/**' '!./src/api/vendor/**' '!./src/api/vendorAdmin/**'"
                ),
                hiddenFromHelp: true
            },
            beforeAddOnBuild: {
                script: copyCPYDir(
                    './add-ons/',
                    './.beforeBuild',
                    "'!./add-ons/**/controllers/admin' '!./add-ons/**/controllers/vendor' '!./add-ons/**/controllers/vendorAdmin'"
                ),
                hiddenFromHelp: true
            },
            beforeCopyPackage: {
                script: copyCPY(
                    'package.json',
                    './.beforeBuild'
                ),
                hiddenFromHelp: true
            },
        },
        microServiceGenerateUtills: {
            default: {
                script: series(
                    `ts-node --pretty utils/create-entities-index.ts .beforeBuild`,
                    `ts-node --pretty utils/create-controller-index.ts .beforeBuild`,
                    `ts-node --pretty utils/create-migration-index.ts .beforeBuild`,
                ),
                hiddenFromHelp: true
            },
        },
        /**
         * Copies static files to the build folder
         */
         microServiceCopyAfterBuild: {
            default: {
                script: series(
                    `nps microServiceCopyAfterBuild.public`,
                    `nps microServiceCopyAfterBuild.apidoc`
                ),
                hiddenFromHelp: true
            },
            apidoc: {
                script: copyDir(
                    './.beforeBuild/src/public/',
                    './dist/src/public/'
                ),
                hiddenFromHelp: true
            },
            public: {
                script: copy(
                    './.beforeBuild/src/public/*',
                    './dist/src'
                ),
                hiddenFromHelp: true
            },
            tmp: {
                script: copyDir(
                    './.tmp',
                    './dist'
                ),
                hiddenFromHelp: true
            }
        },
        /**
         * Creates the needed configuration files
         */
        microServiceConfig: {
            script: series(
                runFast('./commands/tsconfig.micro.ts')
            ),
            hiddenFromHelp: true
        },
        /**
         * Runs TSLint over your project
         */
         lintConfig: {
            script: tslint(`./.beforeBuild/**/*.ts`),
            hiddenFromHelp: true
        },
        /**
         * Transpile your app into javascript
         */
         transpileMicroService: {
            script: `tsc --project ./tsconfig.micro.build.json`,
            hiddenFromHelp: true
        },
        /**
         * Generate the api documentation
         */
         generateMicroServiceapidoc: {
            script: series(
                'apidoc -i .beforeBuild -o .beforeBuild/src/public/apidoc'
            ),
            description: 'Setup`s the development environment(npm & database)'
        },
        /**
         * Builds the admin app into the dist directory
         */
         adminBuild: {
            script: series(
                'nps banner.build',
                'nps adminCopy',
                'nps microServiceConfig',
                'nps microServiceGenerateUtills',
                'nps lintConfig',
                'nps clean.dist',
                'nps transpileMicroService',
                'nps generateMicroServiceapidoc',
                'nps microServiceCopyAfterBuild',
                'nps microServiceCopyAfterBuild.tmp',
                'nps clean.tmp',
                'nps clean.beforeBuild'
            ),
            description: 'Builds the app into the dist directory'
        },
        /**
         * Befor build make micro service folder
         */
         adminCopy: {
            default: {
                script: series(
                    `nps adminCopy.beforeCoreBuild`,
                    `nps adminCopy.beforeAddOnBuild`,
                ),
                hiddenFromHelp: true
            },
            beforeCoreBuild: {
                script: copyCPYDir(
                    './src/',
                    './.beforeBuild',
                    "'!./src/api/store/**' '!./src/api/vendor/**'"
                ),
                hiddenFromHelp: true
            },
            beforeAddOnBuild: {
                script: copyCPYDir(
                    './add-ons/',
                    './.beforeBuild',
                    "'!./add-ons/**/controllers/store' '!./add-ons/**/controllers/vendor'"
                ),
                hiddenFromHelp: true
            },
        },
        /**
         * Builds the vendor app into the dist directory
         */
         vendorBuild: {
            script: series(
                'nps banner.build',
                'nps vendorCopy',
                'nps microServiceConfig',
                'nps microServiceGenerateUtills',
                'nps lintConfig',
                'nps clean.dist',
                'nps transpileMicroService',
                'nps generateMicroServiceapidoc',
                'nps microServiceCopyAfterBuild',
                'nps microServiceCopyAfterBuild.tmp',
                'nps clean.tmp',
                'nps clean.beforeBuild'
            ),
            description: 'Builds the app into the dist directory'
        },
        /**
         * Befor build make micro service folder
         */
         vendorCopy: {
            default: {
                script: series(
                    `nps vendorCopy.beforeCoreBuild`,
                    `nps vendorCopy.beforeAddOnBuild`,
                ),
                hiddenFromHelp: true
            },
            beforeCoreBuild: {
                script: copyCPYDir(
                    './src/',
                    './.beforeBuild',
                    "'!./src/api/store/**' '!./src/api/admin/**' '!./src/api/vendorAdmin/**'"
                ),
                hiddenFromHelp: true
            },
            beforeAddOnBuild: {
                script: copyCPYDir(
                    './add-ons/',
                    './.beforeBuild',
                    "'!./add-ons/**/controllers/store' '!./add-ons/**/controllers/admin' '!./add-ons/**/controllers/vendorAdmin'"
                ),
                hiddenFromHelp: true
            },
        },
    }
};

function banner(name) {
    return {
        hiddenFromHelp: true,
        silent: true,
        description: `Shows ${name} banners to the console`,
        script: runFast(`./commands/banner.ts ${name}`),
    };
}

function copy(source, target) {
    return `copyfiles --up 1 ${source} ${target}`;
}

function copyDir(source, target) {
    return `ncp ${source} ${target}`;
}

function copyCPYDir(source, target, except) {
    return `cpy '${source}' ${except} ${target}`;
}

function copyCPY(source, target) {
    return `cpy '${source}' ${target}`;
}

function run(path) {
    return `ts-node ${path}`;
}

function runFast(path) {
    return `ts-node --transpileOnly ${path}`;
}

function tslint(path) {
    return `tslint -c ./tslint.json ${path} --format stylish`;
}
