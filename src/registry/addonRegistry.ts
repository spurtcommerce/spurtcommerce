/*
 * Spurtcommerce Add-on Registry
 * Generic discovery and registration for SpurtCommerce npm add-ons.
 */

import fs from 'fs';
import path from 'path';
import { DataSource } from 'typeorm';

export interface SpurtcommerceAddonManifest {
    name: string;
    pluginName: string;
    controllers: any[];
    entities: any[];
    migrations: any[];
    initialize?: (options: { dataSource: DataSource }) => void | Promise<void>;
}

export interface DiscoveredAddon {
    packageName: string;
    manifest: SpurtcommerceAddonManifest;
}

let cachedDiscoveredAddons: DiscoveredAddon[] | null = null;

/**
 * Validates an add-on manifest against the required contract.
 * Throws a descriptive error if any required property is missing or invalid.
 */
export function validateManifest(packageName: string, manifest: any): asserts manifest is SpurtcommerceAddonManifest {
    if (!manifest || typeof manifest !== 'object') {
        throw new Error(`Invalid SpurtCommerce add-on manifest in package "${packageName}": manifest must be an object.`);
    }
    if (typeof manifest.name !== 'string' || !manifest.name.trim()) {
        throw new Error(`Invalid SpurtCommerce add-on manifest in package "${packageName}": 'name' must be a non-empty string.`);
    }
    if (typeof manifest.pluginName !== 'string' || !manifest.pluginName.trim()) {
        throw new Error(`Invalid SpurtCommerce add-on manifest in package "${packageName}": 'pluginName' must be a non-empty string.`);
    }
    if (!Array.isArray(manifest.controllers)) {
        throw new Error(`Invalid SpurtCommerce add-on manifest in package "${packageName}": 'controllers' must be an array.`);
    }
    if (!Array.isArray(manifest.entities)) {
        throw new Error(`Invalid SpurtCommerce add-on manifest in package "${packageName}": 'entities' must be an array.`);
    }
    if (!Array.isArray(manifest.migrations)) {
        throw new Error(`Invalid SpurtCommerce add-on manifest in package "${packageName}": 'migrations' must be an array.`);
    }
    if (manifest.initialize !== undefined && typeof manifest.initialize !== 'function') {
        throw new Error(`Invalid SpurtCommerce add-on manifest in package "${packageName}": 'initialize' must be a function if provided.`);
    }
}

/**
 * Infers a SpurtcommerceAddonManifest from a SpurtCommerce package that exports the
 * standard `<Prefix>Controllers`, `<Prefix>Entities`, `<Prefix>Migrations`, and `init<PluginName>` pattern
 * (e.g., when installed directly from npm registry before a manifest-enabled version is published).
 */
export function inferManifestFromExports(packageName: string, pkgJson: any, loadedModule: any): SpurtcommerceAddonManifest | null {
    if (!loadedModule || typeof loadedModule !== 'object') {
        return null;
    }

    const keys = Object.keys(loadedModule);

    let prefix = '';
    let controllers: any[] | undefined;
    for (const key of keys) {
        const match = key.match(/^([A-Z]\w*)Controllers$/);
        if (match && Array.isArray(loadedModule[key])) {
            prefix = match[1];
            controllers = loadedModule[key];
            break;
        }
    }

    if (!controllers) {
        return null;
    }

    let entities: any[] | undefined;
    if (prefix && Array.isArray(loadedModule[`${prefix}Entities`])) {
        entities = loadedModule[`${prefix}Entities`];
    } else {
        for (const key of keys) {
            if (/^([A-Z]\w*)Entities$/.test(key) && Array.isArray(loadedModule[key])) {
                entities = loadedModule[key];
                break;
            }
        }
    }

    if (!entities) {
        return null;
    }

    let migrations: any[] | undefined;
    if (prefix && Array.isArray(loadedModule[`${prefix}Migrations`])) {
        migrations = loadedModule[`${prefix}Migrations`];
    } else {
        for (const key of keys) {
            if (
                /^([A-Z]\w*)Migrations$/.test(key) &&
                !key.endsWith('DatabaseMigrations') &&
                !key.endsWith('PluginMigrations') &&
                Array.isArray(loadedModule[key])
            ) {
                migrations = loadedModule[key];
                break;
            }
        }
    }

    if (!migrations) {
        migrations = [];
    }

    let initialize: ((options: { dataSource: DataSource }) => void | Promise<void>) | undefined;
    let pluginName = prefix;
    for (const key of keys) {
        const match = key.match(/^init([A-Z]\w*)$/);
        if (match && typeof loadedModule[key] === 'function') {
            initialize = loadedModule[key];
            pluginName = match[1];
            break;
        }
    }

    if (!pluginName) {
        return null;
    }

    return {
        name: (pkgJson && typeof pkgJson.name === 'string' && pkgJson.name.trim()) ? pkgJson.name : packageName,
        pluginName,
        controllers,
        entities,
        migrations,
        ...(initialize ? { initialize } : {}),
    };
}

/**
 * Reads root application dependencies from package.json.
 */
function getAppDependencies(): string[] {
    const cwdPkgPath = path.resolve(process.cwd(), 'package.json');
    let pkgJson: any = null;
    if (fs.existsSync(cwdPkgPath)) {
        try {
            pkgJson = JSON.parse(fs.readFileSync(cwdPkgPath, 'utf8'));
        } catch {
            // fallback
        }
    }
    if (!pkgJson) {
        const fallbackPkgPath = path.resolve(__dirname, '../../package.json');
        if (fs.existsSync(fallbackPkgPath)) {
            try {
                pkgJson = JSON.parse(fs.readFileSync(fallbackPkgPath, 'utf8'));
            } catch {
                // ignore
            }
        }
    }

    if (!pkgJson) {
        return [];
    }

    return Object.keys(pkgJson.dependencies || {});
}

/**
 * Resolves a package's package.json metadata and directory path.
 */
function resolveDepPackage(packageName: string): { pkgJson: any; dir: string } | null {
    try {
        const pkgJsonPath = require.resolve(`${packageName}/package.json`, {
            paths: [process.cwd(), path.resolve(__dirname, '../../')],
        });
        const content = fs.readFileSync(pkgJsonPath, 'utf8');
        return {
            pkgJson: JSON.parse(content),
            dir: path.dirname(pkgJsonPath),
        };
    } catch {
        const directPath = path.resolve(process.cwd(), 'node_modules', packageName, 'package.json');
        if (fs.existsSync(directPath)) {
            try {
                const content = fs.readFileSync(directPath, 'utf8');
                return {
                    pkgJson: JSON.parse(content),
                    dir: path.dirname(directPath),
                };
            } catch {
                return null;
            }
        }
        return null;
    }
}

/**
 * Determines whether a dependency is a candidate for add-on discovery.
 * Avoids loading every dependency indiscriminately into the Node runtime.
 */
function isAddonCandidate(packageName: string, depInfo: { pkgJson: any; dir: string }): boolean {
    const { pkgJson, dir } = depInfo;

    // Explicitly declared in package.json
    if (pkgJson.spurtcommerceAddon) {
        return true;
    }

    // Naming convention
    if (packageName.startsWith('spurtcommerce-') || packageName.startsWith('@spurtcommerce/')) {
        return true;
    }

    // Package keywords
    if (Array.isArray(pkgJson.keywords) && (
        pkgJson.keywords.includes('spurtcommerce-addon') ||
        pkgJson.keywords.includes('spurtcommerce')
    )) {
        return true;
    }

    // Check main entry file for 'spurtcommerceAddon' export without running module
    if (pkgJson.main) {
        const mainPath = path.resolve(dir, pkgJson.main);
        if (fs.existsSync(mainPath)) {
            try {
                const entryCode = fs.readFileSync(mainPath, 'utf8');
                if (entryCode.includes('spurtcommerceAddon')) {
                    return true;
                }
            } catch {
                // ignore
            }
        }
    }

    return false;
}

/**
 * Discovers installed add-on packages from the application's dependencies.
 */
export function discoverAddons(): DiscoveredAddon[] {
    const dependencies = getAppDependencies();
    const discovered: DiscoveredAddon[] = [];

    for (const dep of dependencies) {
        if (dep.startsWith('@types/')) {
            continue;
        }

        const depInfo = resolveDepPackage(dep);
        if (!depInfo) {
            continue;
        }

        const isExplicit = Boolean(depInfo.pkgJson.spurtcommerceAddon);
        if (!isAddonCandidate(dep, depInfo)) {
            continue;
        }

        let loadedModule: any;
        try {
            loadedModule = require(dep);
        } catch (error: any) {
            if (isExplicit) {
                throw new Error(`Failed to load SpurtCommerce add-on package "${dep}": ${error.message}`);
            }
            continue;
        }

        const hasExplicitExport = Boolean(
            loadedModule &&
            (('spurtcommerceAddon' in loadedModule) || (loadedModule.default && 'spurtcommerceAddon' in loadedModule.default))
        );

        let manifest = loadedModule?.spurtcommerceAddon ?? loadedModule?.default?.spurtcommerceAddon;

        if (!hasExplicitExport && !isExplicit) {
            manifest = inferManifestFromExports(dep, depInfo.pkgJson, loadedModule);
            if (!manifest) {
                // Packages without the add-on manifest must be ignored
                continue;
            }
        } else if (!manifest && isExplicit) {
            throw new Error(`Add-on package "${dep}" declared "spurtcommerceAddon" in package.json, but did not export a valid "spurtcommerceAddon" manifest.`);
        }

        validateManifest(dep, manifest);
        discovered.push({
            packageName: dep,
            manifest,
        });
    }

    return discovered;
}

/**
 * Returns cached list of discovered add-ons (discovering them on first call).
 */
export function getDiscoveredAddons(): DiscoveredAddon[] {
    if (cachedDiscoveredAddons === null) {
        cachedDiscoveredAddons = discoverAddons();
    }
    return cachedDiscoveredAddons;
}

/**
 * Resets the cached add-ons (primarily for testing).
 */
export function resetAddonRegistry(): void {
    cachedDiscoveredAddons = null;
}

/**
 * Collects all controllers across discovered add-ons.
 */
export function getAddonControllers(): any[] {
    const addons = getDiscoveredAddons();
    const controllers: any[] = [];
    for (const addon of addons) {
        if (Array.isArray(addon.manifest.controllers)) {
            controllers.push(...addon.manifest.controllers);
        }
    }
    return controllers;
}

/**
 * Collects all entities across discovered add-ons.
 */
export function getAddonEntities(): any[] {
    const addons = getDiscoveredAddons();
    const entities: any[] = [];
    for (const addon of addons) {
        if (Array.isArray(addon.manifest.entities)) {
            entities.push(...addon.manifest.entities);
        }
    }
    return entities;
}

/**
 * Collects all migrations across discovered add-ons, deduplicating against existing migrations
 * and between add-ons by migration name.
 */
export function getAddonMigrations(existingMigrationNames?: Set<string>): any[] {
    const addons = getDiscoveredAddons();
    const seenNames = new Set<string>(existingMigrationNames || []);
    const migrations: any[] = [];

    for (const addon of addons) {
        if (Array.isArray(addon.manifest.migrations)) {
            for (const migration of addon.manifest.migrations) {
                if (!migration || !migration.name) {
                    continue;
                }
                if (!seenNames.has(migration.name)) {
                    seenNames.add(migration.name);
                    migrations.push(migration);
                }
            }
        }
    }
    return migrations;
}

/**
 * Collects unique plugin names across discovered add-ons.
 */
export function getAddonPluginNames(): string[] {
    const addons = getDiscoveredAddons();
    const names: string[] = [];
    for (const addon of addons) {
        if (addon.manifest.pluginName && !names.includes(addon.manifest.pluginName)) {
            names.push(addon.manifest.pluginName);
        }
    }
    return names;
}

/**
 * Runs initializer functions of all discovered add-ons.
 */
export async function initializeAddons(dataSource: DataSource): Promise<void> {
    const addons = getDiscoveredAddons();
    for (const addon of addons) {
        if (typeof addon.manifest.initialize === 'function') {
            await addon.manifest.initialize({ dataSource });
        }
    }
}
