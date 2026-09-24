# Category & Product Mapping Flow

Documentation for the vendor-facing category lifecycle and how products are mapped to categories via the exposed APIs.

---

## 1. Category Creation (`POST /api/category`)

**Controller**: `src/api/vendor/controllers/CategoryController.ts` → `addCategory()`
**Authorization**: `vendor` with `create-categories` permission

### Request Payload (AddCategoryRequest)
| Field | Type | Description |
| --- | --- | --- |
| `name` | string | Category name (required) |
| `image` | base64 image DataURL | Optional image; validated against `env.availImageTypes` |
| `parentInt` | number | Parent category ID (`0` or null for root) |
| `sortOrder` | number | Display order (required) |
| `status` | number | 1 = active, 0 = inactive |
| `categorySlug` | string | Optional custom slug; otherwise derived from `name` |
| `categoryDescription` | string | Optional description |
| `industryId` | number | Optional industry reference |

### Flow
1. **Image handling**
   - Base64 payload is validated (allowed mime types from env).
   - Stored either on S3 (`S3Service`) or local (`ImageService`) under `category/` path.

2. **Category entity (`category` table)**
   - Fields populated: `name`, `image`, `imagePath`, `parentInt`, `sortOrder`, `industryId`, `tenantId`, `isActive`, `categoryDescription`.
   - Slug generated via `validate_slug()` (deduplicates by appending numeric suffix).
   - `CategoryService.create()` persists the row.

3. **Hierarchy tracking (`category_path` table)**
   - Fetches ancestor paths for `parentInt` to enforce max depth of 3 (root + 2 child levels).
   - Inserts one row per ancestor plus a self-reference:
     ```
     category_id = newCategoryId
     path_id     = ancestorId or newCategoryId
     level       = incremental depth
     ```

4. **Response**
   - Returns `{ status: 1, message: 'New category created successfully.', data: categorySave }`

### Schema Touchpoints
| Table | Purpose |
| --- | --- |
| `category` | Stores tenant-specific category metadata |
| `category_path` | Maintains hierarchical relations (adjacency list + level) |

---

## 2. Product Creation & Category Mapping (`POST /api/vendor-product`)

**Controller**: `src/api/vendor/controllers/VendorProductController.ts` → `createProduct()`
**Authorization**: `vendor` with `create-product`

### Category Requirements
- Request object (`VendorProductRequest`) must include `categoryId` array.
- API rejects if `categoryId` is empty.

### Mapping Steps
1. **Keyword preparation**
   - For each categoryId, fetches `Category.name` to build keyword string (`~Category~`).
   - Appends `~ProductName~` to support search.

2. **Product persistence (`product` table)**
   - Product info stored (name, slug, pricing, attributes, etc.).

3. **Linking categories (`product_to_category` table)**
   - Iterates over requested categories.
   - Creates `ProductToCategory` records with `productId`, `categoryId`, `isActive = 1`.
   - Enables many-to-many relationship between products and categories.

4. **Subsequent reads**
   - Product listing APIs join `product.productToCategory` and `productToCategory.category` to expose assigned categories.

### Schema Touchpoints
| Table | Purpose |
| --- | --- |
| `product` | Core product data |
| `product_to_category` | Product-category junction table |
| `category` | Used for keyword enrichment |

---

## 3. Related APIs & Utilities

| API | Description |
| --- | --- |
| `PUT /api/category/:id` | Update category (handles image replacement, slug regeneration, `category_path` rebuild, cascade activate/deactivate). |
| `DELETE /api/category` | Deletes category and first/second-level descendants; cleans `category_path`. |
| `GET /api/category` | Paged list with search/filter; joins `category_path` for breadcrumb string. |
| `GET /api/category/category-intree` | Returns nested tree (via `array-to-tree`). |
| `GET /api/category/category-detail` | Fetch single category by `categoryId`. |
| `GET /api/category/category-count` | Summary metrics (includes product counts). |
| `GET /api/category/category-excel-list` & `/category-export-all` | Export utilities; log stored in `export_log`. |

---

## 4. Data Model Snapshot

```
category
  category_id (PK)
  name
  parent_int
  sort_order
  category_slug
  industry_id
  tenant_id
  is_active
  category_description
  image / image_path

category_path
  category_path_id (PK)
  category_id
  path_id
  level

product_to_category
  product_to_category_id (PK)
  product_id
  category_id
  is_active
```

- `category` ↔ `category_path`: maintains multi-level hierarchy (max 3 levels enforced at create time).
- `product` ↔ `product_to_category` ↔ `category`: many-to-many link used by vendor-product APIs.

---

## 5. Operational Notes
- **Tenant Isolation**: All category CRUD filters by `request.user.tenantId`; prevents cross-tenant access.
- **Slug Uniqueness**: `validate_slug` recursively checks existing slugs via `CategoryService.checkSlug`.
- **Depth Limit**: Category creation stops if parent chain already has ≥3 entries.
- **Image Storage**: Controlled by `env.imageserver` (“s3” vs local). Paths persisted so storefront can render images.
- **Product Keywords**: Category names stored in product `keywords` field improve search relevance.

Use this reference to understand how categories are created and how vendor products are linked to them using the exposed APIs.

