"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetupTwinCitiesZone20250531144516 = void 0;
const tslib_1 = require("tslib");
const Country_1 = require("../../api/core/models/Country"); // Adjust if path is different
const Zone_1 = require("../../api/core/models/Zone"); // Adjust if path is different
class SetupTwinCitiesZone20250531144516 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const countryRepository = queryRunner.manager.getRepository(Country_1.Country);
            const zoneRepository = queryRunner.manager.getRepository(Zone_1.Zone);
            // 1. Find the 'United States' country
            const usa = yield countryRepository.findOne({ where: { name: 'United States' } });
            if (usa) {
                const usaCountryId = usa.countryId;
                console.log(`Found Country: United States with ID: ${usaCountryId}`);
                // 2. Check if 'Twin Cities Metro' zone already exists for this country
                const existingZone = yield zoneRepository.findOne({
                    where: {
                        name: 'Twin Cities Metro',
                        countryId: usaCountryId,
                    },
                });
                if (!existingZone) {
                    // 3. Create the new zone
                    const newZone = zoneRepository.create({
                        countryId: usaCountryId,
                        name: 'Twin Cities Metro',
                        code: 'MN-TC',
                        isActive: 1,
                    });
                    yield zoneRepository.save(newZone);
                    console.log(`Created Zone: Twin Cities Metro (ID: ${newZone.zoneId}) under United States.`);
                    // Optional: GeoZone creation would go here if models were found and it was prioritized.
                    // For now, this part is skipped.
                    // const geoZoneRepository = queryRunner.manager.getRepository(GeoZone);
                    // const zoneToGeoZoneRepository = queryRunner.manager.getRepository(ZoneToGeoZone);
                    // ... logic to create GeoZone 'Dank Deals Service Area' ...
                    // ... logic to link newZone.zoneId to newGeoZone.geoZoneId ...
                }
                else {
                    console.log(`Zone 'Twin Cities Metro' already exists for United States (ID: ${existingZone.zoneId}). Skipping creation.`);
                }
            }
            else {
                console.warn("Country 'United States' not found. Skipping Twin Cities Metro zone creation. Please ensure 'United States' exists or run its respective seed/migration.");
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const countryRepository = queryRunner.manager.getRepository(Country_1.Country);
            const zoneRepository = queryRunner.manager.getRepository(Zone_1.Zone);
            const usa = yield countryRepository.findOne({ where: { name: 'United States' } });
            if (usa) {
                const usaCountryId = usa.countryId;
                const zoneToDelete = yield zoneRepository.findOne({
                    where: {
                        name: 'Twin Cities Metro',
                        countryId: usaCountryId,
                    },
                });
                if (zoneToDelete) {
                    // Optional: If ZoneToGeoZone mapping was created in `up`, it should be deleted here first.
                    // const zoneToGeoZoneRepository = queryRunner.manager.getRepository(ZoneToGeoZone);
                    // await zoneToGeoZoneRepository.delete({ zoneId: zoneToDelete.zoneId, geoZoneId: /* ID of 'Dank Deals Service Area' GeoZone */ });
                    // console.log(`Removed ZoneToGeoZone mapping for Twin Cities Metro.`);
                    yield zoneRepository.remove(zoneToDelete);
                    console.log(`Deleted Zone: Twin Cities Metro under United States.`);
                }
                else {
                    console.log("Zone 'Twin Cities Metro' for United States not found. Nothing to delete in 'down' method for this zone.");
                }
            }
            else {
                console.warn("Country 'United States' not found. Cannot perform 'down' operation for Twin Cities Metro zone.");
            }
        });
    }
}
exports.SetupTwinCitiesZone20250531144516 = SetupTwinCitiesZone20250531144516;
//# sourceMappingURL=20250531144516-SetupTwinCitiesZone.js.map