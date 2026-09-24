# Attribute Flow & Schema Design

This document describes the vendor-side attribute lifecycle, covering the APIs that compose the flow (in the exact order implemented) and the underlying database schema each step touches.

---

## 1. High-Level Flow

| Step | API (Controller Method) | Purpose | Tables / Entities Involved |
| --- | --- | --- | --- |
| 1 | `POST /api/vendor-attribute`<br/>`VendorAttributeController.addAttributeGroup` | Create an attribute with its values for the current tenant. | `attribute`, `attribute_value` |
| 2 | `POST /api/vendor-attribute-group`<br/>`VendorAttributeGroupController.addAttributeGroup` | Create an attribute group and map existing attributes into the group. | `attribute_group`, `attribute_to_group` |
| 3 | `POST /api/vendor-specification`<br/>`VendorSpecificationController.createSpecification` | Build a specification template by attaching attribute groups and their attributes. | `specification`, `specification_to_attribute_group`, `spec_attr_grp_to_attribute` |
| 4 | `PUT /api/vendor-specification/category`<br/>`VendorSpecificationController.createSpecificationToCategory` | Allow categories to use specific specifications. | `specification_to_category` |
| 5 | `POST /api/vendor-product-specification`<br/>`VendorProductSpecificationController.createProductSpecification` | Map specifications (and therefore attributes) onto a concrete product with chosen values. | `product_to_specification`, `product_spec_to_attribute_group`, `prd_spec_attr_grp_to_attribute`, `prd_spec_attr_grp_attr_to_attr_val` |

---

## 2. Detailed Step References

### 2.1 Attribute Creation (`POST /api/vendor-attribute`)
- **New rows**
  - `attribute`: stores name, type, sort order, flags (`is_mandatory`, `use_as_filter`, etc.), `tenant_id`, timestamps.
  - `attribute_value`: one row per submitted value (`value`, `attribute_id`, status flags).
- **Relationships**
  - `attribute` 1→N `attribute_value`.

### 2.2 Attribute Group Creation & Mapping (`POST /api/vendor-attribute-group`)
- **New rows**
  - `attribute_group`: group metadata (`name`, `sort_order`, `tenant_id`).
  - `attribute_to_group`: associates each attribute in `attributeIds` with the new group and tenant.
- **Relationships**
  - `attribute_group` M↔M `attribute` through `attribute_to_group`.

### 2.3 Specification Creation (`POST /api/vendor-specification`)
- **New rows**
  - `specification`: template (`name`, slug, status, `tenant_id`).
  - `specification_to_attribute_group`: links the spec to each attribute group passed in the payload.
  - `spec_attr_grp_to_attribute`: links each attribute inside the provided attribute groups to the specification instance, enabling fine-grained control.
- **Relationships**
  - `specification` M↔M `attribute_group` via `specification_to_attribute_group`.
  - `specification_to_attribute_group` 1→N `spec_attr_grp_to_attribute`.

### 2.4 Specification-to-Category Assignment (`PUT /api/vendor-specification/category`)
- **New rows**
  - `specification_to_category`: one row per `{categoryId, specificationId}` pair.
- **Deletes**
  - Removes records for `deleteSpecificationIds`.
- **Purpose**
  - Restricts which specs appear when products in a category are configured.

### 2.5 Product Specification Mapping (`POST /api/vendor-product-specification`)
- **Validations**
  - Confirms vendor owns the product.
  - Prevents duplicate specification mappings.
  - Runs inside a transaction.
- **New rows per specification payload**
  1. `product_to_specification`: binds `product_id` to `specification_id`.
  2. `product_spec_to_attribute_group`: creates a concrete instance of each attribute group for that product/spec combo.
  3. `prd_spec_attr_grp_to_attribute`: ties each attribute to the group instance.
  4. `prd_spec_attr_grp_attr_to_attr_val`: stores selected `attribute_value_id` and optional overridden `value`.
- **Relationship chain**
  ```
  product
    → product_to_specification
      → product_spec_to_attribute_group
        → prd_spec_attr_grp_to_attribute
          → prd_spec_attr_grp_attr_to_attr_val
  ```

---

## 3. Schema Design Summary

### 3.1 Core Attribute Tables
| Table | Key Columns | Notes |
| --- | --- | --- |
| `attribute` | `id`, `name`, `type`, `sort_order`, `is_mandatory`, `use_as_filter`, `tenant_id`, timestamps | Master attribute definition scoped per tenant. |
| `attribute_value` | `id`, `attribute_id`, `value`, `is_active`, `is_delete`, timestamps | Allowed values/options for an attribute. Cascade linked to attribute. |
| `attribute_group` | `id`, `name`, `sort_order`, `tenant_id`, status flags | Logical grouping of attributes. |
| `attribute_to_group` | `attribute_id`, `attribute_group_id`, `tenant_id` | Many-to-many pivot linking attributes to groups. |

### 3.2 Specification Tables
| Table | Key Columns | Notes |
| --- | --- | --- |
| `specification` | `id`, `name`, `slug`, `tenant_id`, `is_active`, `is_delete` | Template representing a set of attributes. |
| `specification_to_attribute_group` | `specification_id`, `attribute_group_id`, `tenant_id` | Connects specs to the attribute groups they include. |
| `spec_attr_grp_to_attribute` | `spec_attr_grp_id`, `attribute_id`, `tenant_id` | Ensures the spec knows which specific attributes belong to each group. |
| `specification_to_category` | `specification_id`, `category_id` | Restricts availability of specifications per category. |

### 3.3 Product Mapping Tables
| Table | Key Columns | Notes |
| --- | --- | --- |
| `product_to_specification` | `product_id`, `specification_id` | Entry point when a product adopts a specification. |
| `product_spec_to_attribute_group` | `product_spec_id`, `attribute_group_id (optional)` | Concrete attribute group instance for the product/spec pair. |
| `prd_spec_attr_grp_to_attribute` | `prd_spec_attr_grp_id`, `attribute_id` | Concrete attribute instance under the product's attribute group. |
| `prd_spec_attr_grp_attr_to_attr_val` | `prd_spec_attr_grp_attr_id`, `attribute_value_id`, `value` | Actual value selected (or overridden) for the product's attribute. |

---

## 4. Flow Diagram

```
Attribute Creation
  POST /api/vendor-attribute
    → attribute
    → attribute_value

Attribute Grouping
  POST /api/vendor-attribute-group
    → attribute_group
    → attribute_to_group

Specification Building
  POST /api/vendor-specification
    → specification
    → specification_to_attribute_group
    → spec_attr_grp_to_attribute

Expose Spec per Category
  PUT /api/vendor-specification/category
    → specification_to_category

Product Mapping
  POST /api/vendor-product-specification
    → product_to_specification
      → product_spec_to_attribute_group
        → prd_spec_attr_grp_to_attribute
          → prd_spec_attr_grp_attr_to_attr_val
```

This structure captures the entire lifecycle: defining attributes, organizing them, creating reusable specifications, exposing them via categories, and finally applying them to products with specific values.

