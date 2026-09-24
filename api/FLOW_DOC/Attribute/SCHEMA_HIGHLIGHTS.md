# Schema Highlights (Referenced Entities)

| Table | Role | Key Columns |
| --- | --- | --- |
| `attribute` | Attribute definition | `id`, `name`, `type`, `tenant_id`, `is_mandatory`, etc. |
| `attribute_value` | Options for attributes | `id`, `attribute_id`, `value`, status flags |
| `attribute_group` | Groups attributes | `id`, `name`, `sort_order`, `tenant_id` |
| `attribute_to_group` | Junction table | `attribute_id`, `attribute_group_id`, `tenant_id` |
| `specification` | Template definition | `id`, `name`, `slug`, `tenant_id`, status flags |
| `specification_to_attribute_group` | Links specs to groups | `specification_id`, `attribute_group_id`, `tenant_id` |
| `spec_attr_grp_to_attribute` | Links spec groups to attributes | `spec_attr_grp_id`, `attribute_id`, `tenant_id` |
| `specification_to_category` | Makes specs available per category | `specification_id`, `category_id` |
| `product_to_specification` | Product/spec mapping | `product_id`, `specification_id` |
| `product_spec_to_attribute_group` | Product instance of spec group | `product_spec_id`, `attribute_group_id` (optional) |
| `prd_spec_attr_grp_to_attribute` | Product instance of attribute | `prd_spec_attr_grp_id`, `attribute_id` |
| `prd_spec_attr_grp_attr_to_attr_val` | Product attribute values | `prd_spec_attr_grp_attr_id`, `attribute_value_id`, `value` |

