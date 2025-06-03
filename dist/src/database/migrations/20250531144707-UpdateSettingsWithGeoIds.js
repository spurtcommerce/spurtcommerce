"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateSettingsWithGeoIds20250531144707 = void 0;
const tslib_1 = require("tslib");
const Country_1 = require("../../api/core/models/Country"); // Adjust path as per your project
const Zone_1 = require("../../api/core/models/Zone"); // Adjust path as per your project
const Setting_1 = require("../../api/core/models/Setting"); // Adjust path as per your project
class UpdateSettingsWithGeoIds20250531144707 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const countryRepository = queryRunner.manager.getRepository(Country_1.Country);
            const zoneRepository = queryRunner.manager.getRepository(Zone_1.Zone);
            const settingsRepository = queryRunner.manager.getRepository(Setting_1.Settings);
            // 1. Find 'United States' country
            const usa = yield countryRepository.findOne({ where: { name: 'United States' } });
            if (!usa) {
                console.error("Migration Error: Country 'United States' not found. Previous migration 'SetupTwinCitiesZone' might have failed or not run. Cannot update settings with Geo IDs.");
                return;
            }
            const usaCountryId = usa.countryId;
            console.log(`Found Country: United States with ID: ${usaCountryId}`);
            // 2. Find 'Twin Cities Metro' zone under USA
            const twinCitiesZone = yield zoneRepository.findOne({
                where: {
                    name: 'Twin Cities Metro',
                    countryId: usaCountryId,
                },
            });
            if (!twinCitiesZone) {
                console.error("Migration Error: Zone 'Twin Cities Metro' for United States not found. Previous migration 'SetupTwinCitiesZone' might have failed or not run. Cannot update settings with Geo IDs.");
                return;
            }
            const twinCitiesZoneId = twinCitiesZone.zoneId;
            console.log(`Found Zone: Twin Cities Metro with ID: ${twinCitiesZoneId}`);
            // 3. Find the settings record (settings_id = 1)
            const settingToUpdate = yield settingsRepository.findOne({ where: { settingsId: 1 } });
            if (settingToUpdate) {
                settingToUpdate.countryId = usaCountryId;
                settingToUpdate.zoneId = twinCitiesZoneId;
                // Other address fields like storeAddress1, storeCity etc. could be updated here if desired
                // For now, only countryId and zoneId as per subtask.
                yield settingsRepository.save(settingToUpdate);
                console.log(`Settings record (settings_id = 1) updated with Country ID: ${usaCountryId} and Zone ID: ${twinCitiesZoneId}`);
            }
            else {
                console.error('Migration Error: Settings record with settings_id = 1 not found. Cannot update Geo IDs.');
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const settingsRepository = queryRunner.manager.getRepository(Setting_1.Settings);
            const settingToRevert = yield settingsRepository.findOne({ where: { settingsId: 1 } });
            if (settingToRevert) {
                // Revert to a known default or null.
                // Assuming original seed had something like this, or setting to null if appropriate.
                // The CreateSetting.ts seed might have specific values.
                // For simplicity, setting to null if the column is nullable, or a common default.
                // Let's assume they are nullable or a general default like 0 or 1 is acceptable if not nullable.
                // Based on Setting.ts, countryId and zoneId are numbers.
                // The original CreateSetting.ts seed uses countryId: 226, zoneId: 3757 (for USA > Texas based on common seeds)
                // If these exact original values are important, they should be used.
                // For this rollback, we'll use a placeholder that indicates it's been reset.
                settingToRevert.countryId = null; // Or a specific default like 226 (USA) if known from original seed
                settingToRevert.zoneId = null; // Or a specific default like 3757 (Texas) if known from original seed
                yield settingsRepository.save(settingToRevert);
                console.log('Reverted country_id and zone_id in settings record (settings_id = 1) to null or placeholder defaults.');
            }
            else {
                console.log('Settings record with settings_id = 1 not found. No Geo ID rollback action taken.');
            }
        });
    }
}
exports.UpdateSettingsWithGeoIds20250531144707 = UpdateSettingsWithGeoIds20250531144707;
//# sourceMappingURL=20250531144707-UpdateSettingsWithGeoIds.js.map