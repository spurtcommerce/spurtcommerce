"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTableApecTOAttr1703677054713 = void 0;
const tslib_1 = require("tslib");
class CreateTableApecTOAttr1703677054713 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const tableExist = yield queryRunner.hasTable('spec_attr_grp_to_attribute');
            if (!tableExist) {
                const query = `CREATE TABLE spec_attr_grp_to_attribute (
                id int NOT NULL AUTO_INCREMENT,
                spec_attr_grp_id int NOT NULL,
                attribute_id int NOT NULL,
                PRIMARY KEY (id),
                KEY fk_spec_attr_grp_to_attr_spec_attr_grp_id_idx (spec_attr_grp_id),
                KEY fk_spec_attr_grp_to_attr_attribute_id_idx (attribute_id),
                CONSTRAINT fk_spec_attr_grp_to_attr_spec_attr_grp_id FOREIGN KEY (spec_attr_grp_id) REFERENCES specification_to_attribute_group (id) ON DELETE CASCADE,
                CONSTRAINT fk_spec_attr_grp_to_attr_attr_id FOREIGN KEY (attribute_id) REFERENCES attribute (id) ON DELETE CASCADE
              )`;
                yield queryRunner.query(query);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // --
        });
    }
}
exports.CreateTableApecTOAttr1703677054713 = CreateTableApecTOAttr1703677054713;
//# sourceMappingURL=1703677054713-CreateTableApecTOAttr.js.map