import { MigrationInterface, QueryRunner, getRepository } from 'typeorm';
import { Country } from '../../api/core/models/Country'; // Adjust path as per your project
import { Zone } from '../../api/core/models/Zone';       // Adjust path as per your project
import { Settings } from '../../api/core/models/Setting'; // Adjust path as per your project

export class UpdateSettingsWithGeoIds20250531144707 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const countryRepository = queryRunner.manager.getRepository(Country);
        const zoneRepository = queryRunner.manager.getRepository(Zone);
        const settingsRepository = queryRunner.manager.getRepository(Settings);

        // 1. Find 'United States' country
        const usa = await countryRepository.findOne({ where: { name: 'United States' } });

        if (!usa) {
            console.error("Migration Error: Country 'United States' not found. Previous migration 'SetupTwinCitiesZone' might have failed or not run. Cannot update settings with Geo IDs.");
            return;
        }
        const usaCountryId = usa.countryId;
        console.log(`Found Country: United States with ID: ${usaCountryId}`);

        // 2. Find 'Twin Cities Metro' zone under USA
        const twinCitiesZone = await zoneRepository.findOne({
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
        const settingToUpdate = await settingsRepository.findOne({ where: { settingsId: 1 } });

        if (settingToUpdate) {
            settingToUpdate.countryId = usaCountryId;
            settingToUpdate.zoneId = twinCitiesZoneId;
            // Other address fields like storeAddress1, storeCity etc. could be updated here if desired
            // For now, only countryId and zoneId as per subtask.
            await settingsRepository.save(settingToUpdate);
            console.log(`Settings record (settings_id = 1) updated with Country ID: ${usaCountryId} and Zone ID: ${twinCitiesZoneId}`);
        } else {
            console.error('Migration Error: Settings record with settings_id = 1 not found. Cannot update Geo IDs.');
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const settingsRepository = queryRunner.manager.getRepository(Settings);
        const settingToRevert = await settingsRepository.findOne({ where: { settingsId: 1 } });

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
            settingToRevert.zoneId = null;   // Or a specific default like 3757 (Texas) if known from original seed
            await settingsRepository.save(settingToRevert);
            console.log('Reverted country_id and zone_id in settings record (settings_id = 1) to null or placeholder defaults.');
        } else {
            console.log('Settings record with settings_id = 1 not found. No Geo ID rollback action taken.');
        }
    }
}
