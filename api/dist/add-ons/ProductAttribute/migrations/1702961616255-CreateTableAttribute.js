"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTableAttribute1702961616255 = void 0;
const tslib_1 = require("tslib");
class CreateTableAttribute1702961616255 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const tablesExist = yield queryRunner.getTables(['product_attribute', 'attribute', 'attribute_group']);
            for (const table of tablesExist) {
                yield queryRunner.dropTable(table.name, true, true, true);
            }
            const query1 = `CREATE TABLE attribute (
      id int NOT NULL AUTO_INCREMENT,
      name varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
      type varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
      sort_order int NOT NULL,
      is_mandatory tinyint NOT NULL DEFAULT '0',
      use_as_filter tinyint NOT NULL DEFAULT '1',
      is_active tinyint DEFAULT '1',
      is_delete tinyint DEFAULT '0',
      created_by int DEFAULT NULL,
      created_date datetime DEFAULT NULL,
      modified_by int DEFAULT NULL,
      modified_date datetime DEFAULT NULL,
      PRIMARY KEY (id)
    )`;
            yield queryRunner.query(query1);
            const query2 = `CREATE TABLE attribute_group (
    id int NOT NULL AUTO_INCREMENT,
    name varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
    sort_order int NOT NULL,
    is_active tinyint DEFAULT '1',
    is_delete tinyint DEFAULT '0',
    created_by int DEFAULT NULL,
    created_date datetime DEFAULT NULL,
    modified_by int DEFAULT NULL,
    modified_date datetime DEFAULT NULL,
    PRIMARY KEY (id)
  )`;
            yield queryRunner.query(query2);
            const query3 = `CREATE TABLE attribute_to_group (
      id int NOT NULL AUTO_INCREMENT,
      attribute_id int NOT NULL,
      attribute_group_id int NOT NULL,
      PRIMARY KEY (id),
      KEY fk_attr_to_group_attribute_attribute_id_idx (attribute_id),
      KEY fk_attribute_to_group_attr_group_attribute_group_id_idx (attribute_group_id),
      CONSTRAINT fk_attr_to_group_attribute_attribute_id FOREIGN KEY (attribute_id) REFERENCES attribute (id) ON DELETE RESTRICT,
      CONSTRAINT fk_attribute_to_group_attr_group_attribute_group_id FOREIGN KEY (attribute_group_id) REFERENCES attribute_group (id)
    )`;
            yield queryRunner.query(query3);
            const query4 = `CREATE TABLE attribute_value (
        id int NOT NULL AUTO_INCREMENT,
        value varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
        attribute_id int NOT NULL,
        is_active tinyint DEFAULT '1',
        is_delete tinyint DEFAULT '0',
        created_by int DEFAULT NULL,
        created_date datetime DEFAULT NULL,
        modified_by int DEFAULT NULL,
        modified_date datetime DEFAULT NULL,
        PRIMARY KEY (id),
        KEY fk_attribute_value_attribute_attribute_id_idx (attribute_id),
        CONSTRAINT fk_attribute_value_attribute_attribute_id FOREIGN KEY (attribute_id) REFERENCES attribute (id)
      )`;
            yield queryRunner.query(query4);
            const query9 = `CREATE TABLE specification (
      id int NOT NULL AUTO_INCREMENT,
      name varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
      slug varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
      is_active tinyint DEFAULT '1',
      is_delete tinyint DEFAULT '0',
      created_by int DEFAULT NULL,
      created_date datetime DEFAULT NULL,
      modified_by int DEFAULT NULL,
      modified_date datetime DEFAULT NULL,
      PRIMARY KEY (id)
    )`;
            yield queryRunner.query(query9);
            const query8 = `CREATE TABLE product_to_specification (
      id int NOT NULL AUTO_INCREMENT,
      product_id int NOT NULL,
      specification_id int NOT NULL,
      PRIMARY KEY (id),
      KEY fk_prd_to_spec_spec_specification_id_idx (specification_id),
      KEY fk_prd_to_spec_product_product_id_idx (product_id),
      CONSTRAINT fk_prd_to_spec_product_product_id FOREIGN KEY (product_id) REFERENCES product (product_id),
      CONSTRAINT fk_prd_to_spec_spec_specification_id FOREIGN KEY (specification_id) REFERENCES specification (id)
    )`;
            yield queryRunner.query(query8);
            const query7 = `CREATE TABLE product_spec_to_attribute_group (
      id int NOT NULL AUTO_INCREMENT,
      product_spec_id int NOT NULL,
      attribute_group_id int NOT NULL,
      PRIMARY KEY (id),
      KEY fk_prod_spec_to_attr_prd_spec_product_spec_id_idx (product_spec_id),
      KEY fk_prd_spec_to_attr_grp_attr_grp_attribute_group_id_idx (attribute_group_id),
      CONSTRAINT fk_prd_spec_to_attr_grp_attr_grp_attribute_group_id FOREIGN KEY (attribute_group_id) REFERENCES attribute_group (id),
      CONSTRAINT fk_prod_spec_to_attr_prd_spec_product_spec_id FOREIGN KEY (product_spec_id) REFERENCES product_to_specification (id) ON DELETE CASCADE ON UPDATE CASCADE
    )`;
            yield queryRunner.query(query7);
            const query6 = `CREATE TABLE prd_spec_attr_grp_to_attribute (
      id int NOT NULL AUTO_INCREMENT,
      prd_spec_attr_grp_id int NOT NULL,
      attribute_id int NOT NULL,
      PRIMARY KEY (id),
      KEY fk_prd_spec_attr_grp_to_attr_prd_spec_to_attr_grp_attribute_idx (prd_spec_attr_grp_id),
      KEY fk_prd_spec_attr_grp_to_attr_attr_attribute_id (attribute_id),
      CONSTRAINT  FOREIGN KEY (prd_spec_attr_grp_id) REFERENCES product_spec_to_attribute_group (id) ON DELETE CASCADE ON UPDATE CASCADE,
      CONSTRAINT fk_prd_spec_attr_grp_to_attr_attr_attribute_id FOREIGN KEY (attribute_id) REFERENCES attribute (id)
    )`;
            yield queryRunner.query(query6);
            const query5 = `CREATE TABLE prd_spec_attr_grp_attr_to_attr_val (
          id int NOT NULL AUTO_INCREMENT,
          prd_spec_attr_grp_attr_id int NOT NULL,
          attribute_value_id int NOT NULL,
          value varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
          PRIMARY KEY (id),
          KEY fk_prd_spec_attrgrp_attr_to_attr_val_attr_val__id_idx (attribute_value_id),
          KEY fk_prd_spec_attrgrp_attr_to_attr_val_prd_spec_attr_grp_attr_idx (prd_spec_attr_grp_attr_id),
          CONSTRAINT fk_prd_spec_attrgrp_attr_to_attr_val_attr_val__id FOREIGN KEY (attribute_value_id) REFERENCES attribute_value (id),
          CONSTRAINT fk_prd_spec_attrgrp_attr_to_attr_val_prd_spec_attr_grp_attr__id FOREIGN KEY (prd_spec_attr_grp_attr_id) REFERENCES prd_spec_attr_grp_to_attribute (id) ON DELETE CASCADE ON UPDATE CASCADE
        )`;
            yield queryRunner.query(query5);
            const query10 = `CREATE TABLE specification_to_attribute_group (
      id int NOT NULL AUTO_INCREMENT,
      specification_id int NOT NULL,
      attribute_group_id int NOT NULL,
      PRIMARY KEY (id),
      KEY fk_spec_to_attr_group_attr_grp_attribute_group_id_idx (attribute_group_id),
      KEY fk_spec_to_attr_grp_spec_specification_id_idx (specification_id),
      CONSTRAINT fk_spec_to_attr_group_attr_grp_attribute_group_id FOREIGN KEY (attribute_group_id) REFERENCES attribute_group (id),
      CONSTRAINT fk_spec_to_attr_grp_spec_specification_id FOREIGN KEY (specification_id) REFERENCES specification (id)
    )`;
            yield queryRunner.query(query10);
            const query11 = `CREATE TABLE specification_to_category (
      id int NOT NULL AUTO_INCREMENT,
      specification_id int NOT NULL,
      category_id int NOT NULL,
      PRIMARY KEY (id),
      KEY fk_spec_to_category_category_category_id_idx (category_id),
      KEY fk_spec_to_category_spec_specification_id_idx (specification_id),
      CONSTRAINT fk_spec_to_category_category_category_id FOREIGN KEY (category_id) REFERENCES category (category_id),
      CONSTRAINT fk_spec_to_category_spec_specification_id FOREIGN KEY (specification_id) REFERENCES specification (id)
    )`;
            yield queryRunner.query(query11);
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // --
        });
    }
}
exports.CreateTableAttribute1702961616255 = CreateTableAttribute1702961616255;
//# sourceMappingURL=1702961616255-CreateTableAttribute.js.map