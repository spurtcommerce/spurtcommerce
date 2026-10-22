define({ "api": [
  {
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "varname1",
            "description": "<p>No type.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "varname2",
            "description": "<p>With type.</p>"
          }
        ]
      }
    },
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "src/public/apidoc/main.js",
    "group": "/home/surya/Music/spurtcommerce/src/public/apidoc/main.js",
    "groupTitle": "/home/surya/Music/spurtcommerce/src/public/apidoc/main.js",
    "name": ""
  },
  {
    "type": "get",
    "url": "/api/address",
    "title": "Address List",
    "group": "Address",
    "name": "AddressList",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "query": [
      {
        "group": "Query",
        "type": "Number",
        "optional": true,
        "field": "limit",
        "description": "<p>Number of records to return</p>"
      },
      {
        "group": "Query",
        "type": "Number",
        "optional": true,
        "field": "offset",
        "description": "<p>Pagination offset</p>"
      },
      {
        "group": "Query",
        "type": "Number|Boolean",
        "optional": true,
        "field": "count",
        "description": "<p>If true OR 1, returns only the total count</p>"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Address list loaded successfully!\",\n    \"data\": {\n        \"data\": [\n            {\n                \"addressId\": 12,\n                \"customerId\": 3,\n                \"firstName\": \"John\",\n                \"lastName\": \"Doe\",\n                \"address1\": \"123 Main St\",\n                \"address2\": \"\",\n                \"city\": \"New York\",\n                \"state\": \"NY\",\n                \"postcode\": \"10001\",\n                \"countryId\": 1,\n                \"addressType\": \"home\",\n                \"company\": null,\n                \"zoneId\": 0,\n                \"phoneNo\": \"5551234567\",\n                \"landmark\": \"Near Central Park\"\n            }\n        ],\n        \"count\": 1\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"status\": 1,\n    \"message\": \"Unable to update address. Please try again.\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/address"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/AddressController.ts",
    "groupTitle": "Address"
  },
  {
    "type": "delete",
    "url": "/api/address/:id",
    "title": "Delete Address",
    "group": "Address",
    "name": "DeleteAddress",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Path": [
          {
            "group": "Path",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Address ID to delete</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"The address has been deleted.\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Address-Not-Found:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"status\": 0,\n    \"message\": \"Oops! That address ID doesn't exist.\"\n}",
          "type": "json"
        },
        {
          "title": "Delete-Failed:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"status\": 0,\n    \"message\": \"Unable to delete the address.\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/address/:id"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/AddressController.ts",
    "groupTitle": "Address"
  },
  {
    "type": "get",
    "url": "/api/address/:id",
    "title": "Get Customer Address by Customer ID",
    "group": "Address",
    "name": "GetAddressByCustomerId",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Path": [
          {
            "group": "Path",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Customer ID whose address you want to fetch</p>"
          }
        ]
      }
    },
    "query": [
      {
        "group": "Query",
        "type": "Number",
        "optional": true,
        "field": "limit",
        "description": "<p>Number of records to return</p>"
      },
      {
        "group": "Query",
        "type": "Number",
        "optional": true,
        "field": "offset",
        "description": "<p>Pagination offset</p>"
      },
      {
        "group": "Query",
        "type": "Number|Boolean",
        "optional": true,
        "field": "count",
        "description": "<p>If true/1 returns only total count</p>"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Successfully fetched customer address.\",\n    \"data\": {\n        \"data\": [\n            {\n                \"createdDate\": \"2024-01-10T12:00:00.000Z\",\n                \"modifiedDate\": \"2024-01-10T12:00:00.000Z\",\n                \"addressId\": 15,\n                \"customerId\": 3,\n                \"countryId\": 1,\n                \"firstName\": \"John\",\n                \"lastName\": \"Doe\",\n                \"company\": null,\n                \"address1\": \"123 Main St\",\n                \"address2\": \"\",\n                \"postcode\": \"10001\",\n                \"city\": \"New York\",\n                \"emailId\": \"john@example.com\",\n                \"phoneNo\": \"5551234567\",\n                \"addressType\": \"home\",\n                \"isActive\": 1,\n                \"landmark\": \"Near Central Park\",\n                \"isDefault\": 1,\n                \"zoneCode\": \"NY-Z1\",\n                \"zoneName\": \"New York Zone 1\",\n                \"zoneId\": 22\n            }\n        ],\n        \"count\": 1\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Customer-Not-Found:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"status\": 0,\n    \"message\": \"Customer ID not found.\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/address/:id"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/AddressController.ts",
    "groupTitle": "Address"
  },
  {
    "type": "delete",
    "url": "/api/specification/:id",
    "title": "Delete specification API",
    "group": "Admin_Specification",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>id (Required)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"status\": \"1\",\n     \"message\": \"Successfully deleted Specification..!\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/specification/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Currency error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/SpecificationController.ts",
    "groupTitle": "Admin_Specification",
    "name": "DeleteApiSpecificationId"
  },
  {
    "type": "get",
    "url": "/api/specification",
    "title": "Specification list V1 API",
    "group": "Admin_Specification",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>count</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "keyword",
            "description": "<p>keyword</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "categoryIds",
            "description": "<p>categoryIds</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n   \"status\": 1,\n   \"messge\": \"Successfully got Specification List.\",\n   \"data\": [\n       {\n           \"createdBy\": 1,\n           \"createdDate\": \"\",\n           \"modifiedBy\": 1,\n           \"modifiedDate\": \"\",\n           \"id\": 1,\n           \"name\": \"\",\n           \"slug\": \"\",\n           \"isActive\": 1,\n           \"isDelete\": 0,\n           \"attributeGroups\": [\n               {\n                   \"createdBy\": 1,\n                   \"createdDate\": \"\",\n                   \"modifiedBy\": 1,\n                   \"modifiedDate\": \"\",\n                   \"id\": 1,\n                   \"name\": \"\",\n                   \"sortOrder\": \"\",\n                   \"isActive\": 1,\n                   \"isDelete\": 0,\n                   \"attributes\": [\n                       {\n                           \"createdBy\": 1,\n                           \"createdDate\": \"\",\n                           \"modifiedBy\": 1,\n                           \"modifiedDate\": \"\",\n                           \"id\": 1,\n                           \"name\": \"\",\n                           \"type\": \"\",\n                           \"sortOrder\": 1,\n                           \"isMandatory\": 1,\n                           \"description\": \"\",\n                           \"label\": \"\",\n                           \"useAsFilter\": 1,\n                           \"sectionName\": \"\",\n                           \"defaultValue\": 1,\n                           \"isActive\": 1,\n                           \"isDelete\": 0,\n                           \"attributeValues\": [\n                               {\n                                   \"createdBy\": 1,\n                                   \"createdDate\": \"\",\n                                   \"modifiedBy\": 1,\n                                   \"modifiedDate\": \"\",\n                                   \"id\": 1,\n                                   \"attributeId\": 1,\n                                   \"value\": \"\",\n                                   \"isActive\": 1,\n                                   \"isDelete\": 0\n                               }\n                           ]\n                       }\n                   ]\n               }\n           ],\n           \"attributeCount\": 1,\n           \"attributeGroupCount\": 1\n       }\n   ]\n  }",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/specification"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "SpecificationV1 error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/SpecificationController.ts",
    "groupTitle": "Admin_Specification",
    "name": "GetApiSpecification"
  },
  {
    "type": "get",
    "url": "/api/specification/category",
    "title": "Get category list specification API",
    "group": "Admin_Specification",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>status</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>count</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "keyword",
            "description": "<p>keyword</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "sortOrder",
            "description": "<p>sortOrder</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n   \"status\": 1,\n   \"message\": \"Successfully Got Specfication Category List.\",\n   \"data\": [\n       {\n           \"categoryId\": 1,\n           \"sortOrder\": 1,\n           \"parentInt\": 1,\n           \"name\": \"\",\n           \"image\": \"\",\n           \"imagePath\": \"\",\n           \"isActive\": 1,\n           \"createdDate\": \"\",\n           \"levels\": \"\",\n           \"specifications\": [\n               {\n                   \"createdBy\": 1,\n                   \"createdDate\": \"\",\n                   \"modifiedBy\": 1,\n                   \"modifiedDate\": \"\",\n                   \"id\": 1,\n                   \"name\": \"\",\n                   \"slug\": \"\",\n                   \"isActive\": 1,\n                   \"isDelete\": 0\n               }\n           ]\n       }\n   ]\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/specification/category"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Specification category error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/SpecificationController.ts",
    "groupTitle": "Admin_Specification",
    "name": "GetApiSpecificationCategory"
  },
  {
    "type": "post",
    "url": "/api/specification",
    "title": "Create specification API",
    "group": "Admin_Specification",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "size": "..255",
            "optional": false,
            "field": "name",
            "description": "<p>name (Required)</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>status (Required)</p>"
          },
          {
            "group": "Request body",
            "type": "Object[]",
            "optional": false,
            "field": "attributeGroup",
            "description": "<p>attributeGroup</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "attributeGroupId",
            "description": "<p>attributeGroupId</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "attributeIds",
            "description": "<p>attributeIds</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "deleteAttributeGroupIds",
            "description": "<p>deleteAttributeGroupIds</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "deleteAttributes",
            "description": "<p>deleteAttributes</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n   \"name\": \"\",\n   \"status\": 1,@Req() request: any\n           \"attributeIds\": []\n       }\n   ],\n   \"deleteAttributeGroupIds\": [],\n   \"deleteAttributes\": []\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n   \"status\": 1,\n   \"message\": \"Vendor specification created successfully.\",\n   \"data\": {\n       \"createdBy\": 1,\n       \"createdDate\": \"\",\n       \"modifiedBy\": 1,\n       \"modifiedDate\": \"\",\n       \"id\": 1,\n       \"name\": \"\",\n       \"slug\": \"\",\n       \"isActive\": 1,\n       \"isDelete\": 0,\n       \"attributeGroups\": [\n           {\n               \"id\": 1,\n               \"specificationId\": 1,\n               \"attributeGroupId\": 1,\n               \"attributes\": [\n                   {\n                       \"createdBy\": 1,\n                       \"createdDate\": \"\",\n                       \"modifiedBy\": 1,\n                       \"modifiedDate\": \"\",\n                       \"id\": 1,\n                       \"name\": \"\",\n                       \"type\": \"\",\n                       \"sortOrder\": 1,\n                       \"isMandatory\": 1,\n                       \"description\": \"\",\n                       \"label\": \"\",\n                       \"useAsFilter\": \"\",\n                       \"sectionName\": \"\",\n                       \"defaultValue\": 1,\n                       \"isActive\": 1,\n                       \"isDelete\": 0\n                   }\n               ]\n           }\n       ]\n   }\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/specification"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Specification error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/SpecificationController.ts",
    "groupTitle": "Admin_Specification",
    "name": "PostApiSpecification"
  },
  {
    "type": "put",
    "url": "/api/specification/category",
    "title": "Create specification to category",
    "group": "Admin_Specification",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "categoryId",
            "description": "<p>categoryId</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "specificationIds",
            "description": "<p>specificationIds</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "deleteSpecificationIds",
            "description": "<p>deleteSpecificationIds</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n   \"categoryId\": \"\",\n   \"specificationIds\": [],\n   \"deleteSpecificationIds\": []\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully Updated Specification To Category.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/specification/category"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Attribute error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/SpecificationController.ts",
    "groupTitle": "Admin_Specification",
    "name": "PutApiSpecificationCategory"
  },
  {
    "type": "put",
    "url": "/api/specification/:id",
    "title": "Update specification API",
    "group": "Admin_Specification",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>id</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "size": "..255",
            "optional": false,
            "field": "name",
            "description": "<p>name</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>status</p>"
          },
          {
            "group": "Request body",
            "type": "Object[]",
            "optional": false,
            "field": "attributeGroup",
            "description": "<p>attributeGroup</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "attributeGroupId",
            "description": "<p>attributeGroupId</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "attributeIds",
            "description": "<p>attributeIds@=</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "deleteAttributeGroupIds",
            "description": "<p>deleteAttributeGroupIds</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "deleteAttributes",
            "description": "<p>deleteAttributes</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n   \"name\": \"\",\n   \"status\": 1,\n   \"attributeGroup\": [\n       {\n           \"attributeGroupId\": 1,\n           \"attributeIds\": []\n       }\n   ],\n   \"deleteAttributeGroupIds\": [],\n   \"deleteAttributes\": []\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n    {\n   \"status\": 1,\n   \"message\": \"Successfully Update Specification.\",\n   \"data\": {\n       \"createdBy\": 1,\n       \"createdDate\": \"\",\n       \"modifiedBy\": 1,\n       \"modifiedDate\": \"\",\n       \"id\": 1,\n       \"name\": \"gae\",\n       \"slug\": \"\",\n       \"isActive\": 1,\n       \"isDelete\": 0,\n       \"attributeGroups\": [\n           {\n               \"id\": 1,\n               \"specificationId\": 1,\n               \"attributeGroupId\": 1,\n               \"attributes\": [\n                   {\n                       \"createdBy\": 1,\n                       \"createdDate\": \"\",\n                       \"modifiedBy\": 1,\n                       \"modifiedDate\": \"\",\n                       \"id\": 1,\n                       \"name\": \"\",\n                       \"type\": \"\",\n                       \"sortOrder\": 1,\n                       \"isMandatory\": 1,\n                       \"description\": \"\",\n                       \"label\": \"\",\n                       \"useAsFilter\": \"\",\n                       \"sectionName\": \"\",\n                       \"defaultValue\": 1,\n                       \"isActive\": 1,\n                       \"isDelete\": 0\n                   }\n               ]\n           }\n       ]\n   }\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/specification:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Specification error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/SpecificationController.ts",
    "groupTitle": "Admin_Specification",
    "name": "PutApiSpecificationId"
  },
  {
    "type": "delete",
    "url": "/api/attribute/:id",
    "title": "Delete Attribute API",
    "group": "Attribute",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>id (Required)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"status\": \"1\",\n     \"message\": \"Vendor attribute deleted successfully.\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/attribute/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "attribute error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/AttributeController.ts",
    "groupTitle": "Attribute",
    "name": "DeleteApiAttributeId"
  },
  {
    "type": "get",
    "url": "/api/attribute",
    "title": "Attribute list API",
    "group": "Attribute",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>keyword</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>count should be number or boolean</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n   \"status\": 1,\n   \"messge\": \"Vendor attribute retrieved successfully.\",\n   \"data\": [\n       {\n           \"createdBy\": 1,\n           \"createdDate\": \"\",\n           \"modifiedBy\": 1,\n           \"modifiedDate\": \"\",\n           \"id\": 1,\n           \"name\": \"\",\n           \"type\": 1,\n           \"sortOrder\": 1,\n           \"isMandatory\": 1,\n           \"description\": \"\",\n           \"label\": \"\",\n           \"useAsFilter\": 1,\n           \"sectionName\": \"\",\n           \"defaultValue\": 1,\n           \"isActive\": 1,\n           \"isDelete\": 1\n       }\n   ]\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/attribute"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Attribute Group error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/AttributeController.ts",
    "groupTitle": "Attribute",
    "name": "GetApiAttribute"
  },
  {
    "type": "get",
    "url": "/api/attribute/:id",
    "title": "Get Attribute API",
    "group": "Attribute",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>id (Required)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n   \"status\": 1,\n   \"message\": \"Vendor attribute retrieved successfully.\",\n   \"data\": {\n       \"createdBy\": 1,\n       \"createdDate\": \"\",\n       \"modifiedBy\": 1,\n       \"modifiedDate\": \"\",\n       \"id\": 1,\n       \"name\": \"\",\n       \"type\": \"\",\n       \"sortOrder\": 1,\n       \"isMandatory\": 1,\n       \"description\": \"\",\n       \"label\": \"\",\n       \"useAsFilter\": \"\",\n       \"sectionName\": \"\",\n       \"defaultValue\": 1,\n       \"isActive\": 1,\n       \"isDelete\": 0,\n       \"attributeValues\": [\n           {\n               \"createdBy\": 1,\n               \"createdDate\": \"\",\n               \"modifiedBy\": 1,\n               \"modifiedDate\": \"\",\n               \"id\": 1,\n               \"attributeId\": 1,\n               \"value\": \"\",\n               \"isActive\": 1,\n               \"isDelete\": 0\n           }\n       ]\n   }\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/attribute/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Attribute error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/AttributeController.ts",
    "groupTitle": "Attribute",
    "name": "GetApiAttributeId"
  },
  {
    "type": "post",
    "url": "/api/attribute",
    "title": "Add Attribute API",
    "group": "Attribute",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "size": "..255",
            "optional": false,
            "field": "name",
            "description": "<p>name (Required)</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "sortOrder",
            "description": "<p>sortOrder (Required)</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>type (Required)</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "isMandatory",
            "description": "<p>isMandatory</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "useAsFilter",
            "description": "<p>useAsFilter</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "isActive",
            "description": "<p>isActive</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "size": "..255",
            "optional": false,
            "field": "description",
            "description": "<p>description</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "size": "..255",
            "optional": false,
            "field": "label",
            "description": "<p>label</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "size": "..255",
            "optional": false,
            "field": "sectionName",
            "description": "<p>sectionName</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "size": "..255",
            "optional": false,
            "field": "defaultValue",
            "description": "<p>defaultValue</p>"
          },
          {
            "group": "Request body",
            "type": "Object[]",
            "optional": false,
            "field": "attributeValues",
            "description": "<p>array of attributeValues (Required)</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>id for attribute value</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "value",
            "description": "<p>value (Required)</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "deleteAttributeValueIds",
            "description": "<p>deleteAttributeValueIds</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n   \"name\": \"\",\n   \"sortOrder\" : 1,\n   \"type\": \"\",\n   \"isMandatory\": 1,\n   \"useAsFilter\": 1,\n   \"isActive\": 1,\n   \"description\": \"\",\n   \"label\": \"\",\n   \"sectionName\": \"\",\n   \"defaultValue\": \"\",\n   \"attributeValues\": [\n       {\n           \"id\": 1,\n           \"value\": \"\"\n       }\n   ],\n   \"deleteAttributeValueIds\": 1\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Attribute added successfully.\",\n     \"data\": {\n       \"createdBy\": 1,\n       \"createdDate\": \"\",\n       \"modifiedBy\": 1,\n       \"modifiedDate\": \"\",\n       \"id\": 1,\n       \"name\": \"\",\n       \"type\": \"\",\n       \"sortOrder\": 1,\n       \"isMandatory\": 1,\n       \"description\": \"\",\n       \"label\": \"\",\n       \"useAsFilter\": 1,\n       \"sectionName\": \"\",\n       \"defaultValue\": \"\",\n       \"isActive\": 1,\n       \"isDelete\": 1,\n       \"attributeValues\": [\n           {\n               \"createdBy\": 1,\n               \"createdDate\": \"\",\n               \"modifiedBy\": 1,\n               \"modifiedDate\": \"\",\n               \"id\": 1,\n               \"attributeId\": 1,\n               \"value\": \"\",\n               \"isActive\": 1,\n               \"isDelete\": 1\n           }\n       ]\n   }\n}\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/attribute"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Attribute error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/AttributeController.ts",
    "groupTitle": "Attribute",
    "name": "PostApiAttribute"
  },
  {
    "type": "put",
    "url": "/api/attribute/:id",
    "title": "Update Attribute API",
    "group": "Attribute",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>id for attribute</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "size": "..255",
            "optional": false,
            "field": "name",
            "description": "<p>name</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "sortOrder",
            "description": "<p>sortOrder</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>type</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "isMandatory",
            "description": "<p>isMandatory</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "useAsFilter",
            "description": "<p>useAsFilter</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "isActive",
            "description": "<p>isActive</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "size": "..255",
            "optional": false,
            "field": "description",
            "description": "<p>description</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "size": "..255",
            "optional": false,
            "field": "label",
            "description": "<p>label</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "size": "..255",
            "optional": false,
            "field": "sectionName",
            "description": "<p>sectionName</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "size": "..255",
            "optional": false,
            "field": "defaultValue",
            "description": "<p>defaultValue</p>"
          },
          {
            "group": "Request body",
            "type": "Object[]",
            "optional": false,
            "field": "attributeValues",
            "description": "<p>array of attributeValues</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "value",
            "description": "<p>value</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "deleteAttributeValueIds",
            "description": "<p>deleteAttributeValueIds</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n   \"name\": \"\",\n   \"sortOrder\" : 1,\n   \"type\": \"\",\n   \"isMandatory\": 1,\n   \"useAsFilter\": 1,\n   \"isActive\": 1,\n   \"description\": \"\",\n   \"label\": \"\",\n   \"sectionName\": \"\",\n   \"defaultValue\": \"\",\n   \"attributeValues\": [\n       {\n           \"id\": 1,\n           \"value\": \"\"\n       }\n   ],\n   \"deleteAttributeValueIds\": 1\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Vendor attribute updated successfully.\",\n     \"data\": {\n       \"createdBy\": 1,\n       \"createdDate\": \"\",\n       \"modifiedBy\": 1,\n       \"modifiedDate\": \"\",\n       \"id\": 1,\n       \"name\": \"\",\n       \"type\": \"\",\n       \"sortOrder\": 1,\n       \"isMandatory\": 1,\n       \"description\": \"\",\n       \"label\": \"\",\n       \"useAsFilter\": 1,\n       \"sectionName\": \"\",\n       \"defaultValue\": \"\",\n       \"isActive\": 1,\n       \"isDelete\": 0,\n       \"attributeValues\": [\n           {\n               \"createdBy\": 1,\n               \"createdDate\": \"\",\n               \"modifiedBy\": 1,\n               \"modifiedDate\": \"\",\n               \"id\": 1,\n               \"attributeId\": 1,\n               \"value\": \"\",\n               \"isActive\": 1,\n               \"isDelete\": 0\n           }\n       ]\n   }\n}\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/attribute/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Attribute error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/AttributeController.ts",
    "groupTitle": "Attribute",
    "name": "PutApiAttributeId"
  },
  {
    "type": "delete",
    "url": "/api/attribute-group/:id",
    "title": "Delete Attribute group API",
    "group": "Attribute_Group",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>id (Required)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"status\": \"1\",\n     \"message\": \"Vendor attribute group deleted successfully.\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/attribute-group/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Currency error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/AttributeGroupController.ts",
    "groupTitle": "Attribute_Group",
    "name": "DeleteApiAttributeGroupId"
  },
  {
    "type": "get",
    "url": "/api/attribute-group",
    "title": "Attribute Group list API",
    "group": "Attribute_Group",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>count should be number or boolean</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n   \"status\": 1,\n   \"message\": \"Vendor attribute group list retrieved successfully.\",\n   \"data\": [\n       {\n           \"createdBy\": 1,\n           \"createdDate\": \"\",\n           \"modifiedBy\": 1,\n           \"modifiedDate\": \"\",\n           \"id\": 1,\n           \"name\": \"\",\n           \"sortOrder\": 1,\n           \"isActive\": 1,\n           \"isDelete\": 1,\n           \"attributes\": \"\",\n           \"attributeCount\": 1,\n           \"attributeNames\": \"\"\n       }\n   ]\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/attribute-group"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Attribute Group error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/AttributeGroupController.ts",
    "groupTitle": "Attribute_Group",
    "name": "GetApiAttributeGroup"
  },
  {
    "type": "get",
    "url": "/api/attribute-group/:id",
    "title": "Get Attribute Group API",
    "group": "Attribute_Group",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>id (Required)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n   \"status\": 1,\n   \"message\": \"Vendor attribute group retrieved successfully.\",\n   \"data\": {\n       \"createdBy\": 1,\n       \"createdDate\": \"\",\n       \"modifiedBy\": 1,\n       \"modifiedDate\": \"\",\n       \"id\": 1,\n       \"name\": \"\",\n       \"sortOrder\": 1,\n       \"isActive\": 1,\n       \"isDelete\": 0,\n       \"attributes\": \"\"\n   }\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/attribute-group/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Attribute Group error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/AttributeGroupController.ts",
    "groupTitle": "Attribute_Group",
    "name": "GetApiAttributeGroupId"
  },
  {
    "type": "post",
    "url": "/api/attribute-group",
    "title": "Add Attribute group API",
    "group": "Attribute_Group",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>(Required)</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "sortOrder",
            "description": "<p>(Required)</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "attributeIds",
            "description": ""
          },
          {
            "group": "Request body",
            "type": "Object[]",
            "optional": false,
            "field": "deleteAttributeIds",
            "description": "<p>array</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"name\": \"\",\n     \"sortOrder\" : 1,\n     \"attributeIds\": 1,\n     \"deleteAttributeIds\": []\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Vendor attribute group added successfully.\",\n     \"data\": {\n       \"createdBy\": 1,\n       \"createdDate\": \"\",\n       \"modifiedBy\": 1,\n       \"modifiedDate\": \"\",\n       \"id\": 1,\n       \"name\": \"\",\n       \"sortOrder\": 1,\n       \"isActive\": 1,\n       \"isDelete\": 1,\n       \"attributes\": \"\"\n   }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/attribute-group"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Attribute group error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/AttributeGroupController.ts",
    "groupTitle": "Attribute_Group",
    "name": "PostApiAttributeGroup"
  },
  {
    "type": "put",
    "url": "/api/attribute-group/:id",
    "title": "Update Attribute Group API",
    "group": "Attribute_Group",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>name</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "sortOrder",
            "description": "<p>sortOrder</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "attributeIds",
            "description": "<p>attributeIds</p>"
          },
          {
            "group": "Request body",
            "type": "Object[]",
            "optional": false,
            "field": "deleteAttributeIds",
            "description": "<p>deleteAttributeIds</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"name\": \"\",\n     \"sortOrder\" : 1,\n     \"attributeIds\": 1,\n     \"deleteAttributeIds\": []\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n   \"status\": 1,\n   \"message\": \"Vendor attribute group updated successfully.\",\n   \"data\": {\n       \"createdBy\": 1,\n       \"createdDate\": \"\",\n       \"modifiedBy\": 1,\n       \"modifiedDate\": \"\",\n       \"id\": 1,\n       \"name\": \"\",\n       \"sortOrder\": 1,\n       \"isActive\": 1,\n       \"isDelete\": 1,\n       \"attributes\": \"\"\n   }\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/attribute-group/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Attribute Group error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/AttributeGroupController.ts",
    "groupTitle": "Attribute_Group",
    "name": "PutApiAttributeGroupId"
  },
  {
    "type": "Get",
    "url": "/api/attribute-group-translation/attribute-group",
    "title": "Attribute Group Language List API",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "group": "Attribute_Group_Translation",
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n   \"status\": 1,\n   \"message\": \"Successfully Got Attribute Group List..!\",\n   \"data\": [\n       {\n           \"createdBy\": 1,\n           \"createdDate\": \"\",\n           \"modifiedBy\": 1,\n           \"modifiedDate\": \"\",\n           \"id\": 1,\n           \"name\": \"\",\n           \"sortOrder\": \"\",\n           \"isActive\": 1,\n           \"isDelete\": 1,\n           \"attributeGroupTranslation\": [\n               {\n                   \"createdBy\": 1,\n                   \"createdDate\": \"\",\n                   \"modifiedBy\": 1,\n                   \"modifiedDate\": \"\"\",\n                   \"id\": 1,\n                   \"attributeGroupId\": 1,\n                   \"languageId\": 1,\n                   \"name\": \"\",\n                   \"isActive\": 1,\n                   \"isDelete\": 1\n               }\n           ],\n           \"lastModifieDate\": \"\"\n       }\n   ]\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/attribute-group-translation/attribute-group"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Attribute Translation error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/AttributeGroupTranslationController.ts",
    "groupTitle": "Attribute_Group_Translation",
    "name": "GetApiAttributeGroupTranslationAttributeGroup"
  },
  {
    "type": "Get",
    "url": "/api/attribute-group-translation/attribute-group/:id",
    "title": "Attribute Group Language Detail API",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "group": "Attribute_Group_Translation",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>id (Required)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n   \"status\": 1,\n   \"message\": \"Succesfully got Translation For Attribute Group..!\",\n   \"data\": [\n       {\n           \"createdBy\": 1,\n           \"createdDate\": \"\",\n           \"modifiedBy\": 1,\n           \"modifiedDate\": \"\",\n           \"id\": 1,\n           \"name\": \"\",\n           \"sortOrder\": 1,\n           \"isActive\": 1,\n           \"isDelete\": 0,\n           \"attributeGroupTranslation\": [\n               {\n                   \"createdBy\": 1,\n                   \"createdDate\": \"\",\n                   \"modifiedBy\": 1,\n                   \"modifiedDate\": \"\"\",\n                   \"id\": 1,\n                   \"attributeGroupId\": 1,\n                   \"languageId\": 1,\n                   \"name\": \"\",\n                   \"isActive\": 1,\n                   \"isDelete\": 0\n               }\n           ],\n           \"lastModifieDate\": \"\"\n       }\n   ]\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/attribute-group-translation/attribute-group/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "attribute-group Translation error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/AttributeGroupTranslationController.ts",
    "groupTitle": "Attribute_Group_Translation",
    "name": "GetApiAttributeGroupTranslationAttributeGroupId"
  },
  {
    "type": "Post",
    "url": "/api/attribute-group-translation/attribute-group/:id",
    "title": "Attribute Group Language Create API",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>id (Required)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"attributeGroupTranslation\": [\n         {\n             \"name\": \"\",\n             \"languageId\": 1,\n         }\n      ]\n}",
          "type": "json"
        }
      ]
    },
    "group": "Attribute_Group_Translation",
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n   \"status\": 1,\n   \"message\": \"Succesfully Created Translation For attributeGroup..!\",\n   \"data\": {\n       \"attributeGroupTranslation\": [\n           {\n               \"attributeGroupId\": 1,\n               \"languageId\": 1,\n               \"name\": \"\",\n               \"createdDate\": \"\",\n               \"modifiedDate\": \"\",\n               \"id\": 1\n           }\n       ]\n   }\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/attribute-group-translation/attribute-group/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "attribute-group Translation error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/AttributeGroupTranslationController.ts",
    "groupTitle": "Attribute_Group_Translation",
    "name": "PostApiAttributeGroupTranslationAttributeGroupId"
  },
  {
    "type": "Get",
    "url": "/api/attribute-translation/attribute",
    "title": "Attribute Translation List API",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "group": "Attribute_Translation",
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n    {\n   \"status\": 1,\n   \"message\": \"Successfully Got Attribute Translations..!\",\n   \"data\": [\n       {\n           \"createdBy\": 1,\n           \"createdDate\": \"\",\n           \"modifiedBy\": 1,\n           \"modifiedDate\": \"\",\n           \"id\": 1,\n           \"name\": \"\",\n           \"type\": \"\",\n           \"sortOrder\": 1,\n           \"isMandatory\": 1,\n           \"description\": \"\",\n           \"label\": \"\",\n           \"useAsFilter\": 1,\n           \"sectionName\": \"\",\n           \"defaultValue\": 1,\n           \"isActive\": 1,\n           \"isDelete\": 1,\n           \"attributeTranslation\": [\n               {\n                   \"createdBy\": 1,\n                   \"createdDate\": \"\",\n                   \"modifiedBy\": 1,\n                   \"modifiedDate\": \"\",\n                   \"id\": 1,\n                   \"attributeId\": 1,\n                   \"languageId\": 1,\n                   \"attributeName\": \"\",\n                   \"description\": \"\",\n                   \"label\": \"\",\n                   \"sectionName\": \"\",\n                   \"defaultValue\": 1,\n                   \"isActive\": 1,\n                   \"isDelete\": 0\n               }\n           ],\n           \"lastModifieDate\": \"\"\n       }\n   ]\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/attribute-translation/attribute"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Attribute Translation error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/AttributeTranslatorController.ts",
    "groupTitle": "Attribute_Translation",
    "name": "GetApiAttributeTranslationAttribute"
  },
  {
    "type": "Get",
    "url": "/api/attribute-translation/attribute/:id",
    "title": "Attribute Language Detail API",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "group": "Attribute_Translation",
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n   {\n     \"status\": 1,\n     \"message\": Successfully Got Attribute Translation Detail..!\",\n     \"data\": [\n         {\n             \"createdBy\": 1,\n             \"createdDate\": \"\",\n             \"modifiedBy\": 1,\n             \"modifiedDate\": \"\",\n             \"id\": 1,\n             \"name\": \"\",\n             \"type\": \"\",\n             \"sortOrder\": 1,\n             \"isMandatory\": 1,\n             \"description\": \"\",\n             \"label\": \"\",\n             \"useAsFilter\": 1,\n             \"sectionName\": \"\",\n             \"defaultValue\": 1,\n             \"isActive\": 1,\n             \"isDelete\": 0,\n             \"attributeTranslation\": [\n                 {\n                     \"createdBy\": 1,\n                     \"createdDate\": \"\",\n                     \"modifiedBy\": 1,\n                     \"modifiedDate\": \"\",\n                     \"id\": 1,\n                     \"attributeId\": 1,\n                     \"languageId\": 1,\n                     \"attributeName\": \"\",\n                     \"description\": \"\",\n                     \"label\": \"\",\n                     \"sectionName\": \"\",\n                     \"defaultValue\": 0,\n                     \"isActive\": 1,\n                     \"isDelete\": 0\n                 }\n             ],\n             \"attributeValues\": [\n                 {\n                     \"createdBy\": 1,\n                     \"createdDate\": \"\",\n                     \"modifiedBy\": 1,\n                     \"modifiedDate\": \"\",\n                     \"id\": 1,\n                     \"attributeId\": 1,\n                     \"value\": \"\",\n                     \"isActive\": 1,\n                     \"isDelete\": 1,\n                     \"attributeValueTranslation\": [\n                         {\n                           \"createdBy\": 1,\n                           \"createdDate\": \"\",\n                           \"modifiedBy\": 1,\n                           \"modifiedDate\": \"\",\n                           \"id\": 1,\n                           \"attributeValueId\": 1,\n                           \"languageId\": 1,\n                           \"value\": \"\",\n                           \"isActive\": 1,\n                           \"isDelete\": 0\n                         }\n                     ]\n                 }\n             ]\n         }\n     ]\n   }",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/attribute-translation/attribute/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Attribute Translation error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/AttributeTranslatorController.ts",
    "groupTitle": "Attribute_Translation",
    "name": "GetApiAttributeTranslationAttributeId"
  },
  {
    "type": "Post",
    "url": "/api/attribute-translation/attribute/:id",
    "title": "Attribute Language Create API",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "group": "Attribute_Translation",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object[]",
            "optional": false,
            "field": "attributeTranslation",
            "description": "<p>attributeTranslation is a array(Required)</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "languageId",
            "description": "<p>languageId (Required)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "attributeName",
            "description": "<p>attributeName (Required)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "attributeInitialValue",
            "description": "<p>attributeInitialValue</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>description</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "label",
            "description": "<p>label</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "placeHolder",
            "description": "<p>placeHolder</p>"
          },
          {
            "group": "Parameter",
            "type": "Object[]",
            "optional": false,
            "field": "attributeValues",
            "description": "<p>attributeValues (Required)</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>id of attribute value</p>"
          },
          {
            "group": "Parameter",
            "type": "Object[]",
            "optional": false,
            "field": "attributeValueTranslation",
            "description": "<p>attributeValueTranslation (Required)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "value",
            "description": "<p>value</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "   {\n   \"attributeTranslation\": [\n      {\n        \"languageId\": 1,\n        \"attributeName\": \"\",\n        \"attributeInitialValue\": \"\",\n        \"description\":\"\",\n        \"label\": \"\",\n        \"placeHolder\": \"\"\n      }\n   ],\n   \"attributeValues\": [\n      {\n        \"id\": 1,\n        \"attributeValueTranslation\": [\n            {\n                \"languageId\": 1,\n                \"value\": \"\"\n            }\n        ]\n      }\n   ]\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n    {\n   \"status\": 1,\n   \"message\": \"Successfully Saved Attribute Translation..!\",\n   \"data\": {\n       \"attributeTranslation\": [\n           {\n               \"attributeName\": \"\",\n               \"description\": \"\",\n               \"label\": \"\",\n               \"languageId\": 1,\n               \"attributeId\": 1,\n               \"createdDate\": \"\",\n               \"modifiedDate\": \"\",\n               \"id\": 1\n           }\n       ],\n       \"attributeValues\": [\n           {\n               \"id\": 1,\n               \"attributeValueAliases\": [\n                   {\n                       \"value\": \"\",\n                       \"attributeValueId\": 1,\n                       \"languageId\": 1,\n                       \"createdDate\": \"\",\n                       \"modifiedDate\": \"\",\n                       \"id\": 1\n                   }\n               ]\n           }\n       ]\n   }\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/attribute-translation/attribute/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Attribute Translation error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/AttributeTranslatorController.ts",
    "groupTitle": "Attribute_Translation",
    "name": "PostApiAttributeTranslationAttributeId"
  },
  {
    "type": "put",
    "url": "/api/customer-user-profile",
    "title": "Edit Profile API",
    "group": "Authentication",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "size": "..96",
            "optional": false,
            "field": "username",
            "description": "<p>User username</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "size": "..96",
            "optional": false,
            "field": "email",
            "description": "<p>User email</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "size": "..15",
            "optional": false,
            "field": "phoneNumber",
            "description": "<p>User phoneNumber</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "size": ".255",
            "optional": false,
            "field": "address",
            "description": "<p>User address</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": true,
            "field": "avatar",
            "description": "<p>User avatar</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"username\" : \"\",\n     \"email\" : \"\",\n     \"phoneNumber\" : \"\",\n     \"address\" : \"\",\n     \"avatar\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully updated the customer user profile.\",\n     \"status\": \"1\",\n     \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/customer-user-profile"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "User error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/store/controllers/CustomerUserProfileController.ts",
    "groupTitle": "Authentication",
    "name": "PutApiCustomerUserProfile"
  },
  {
    "type": "get",
    "url": "/api/banner",
    "title": "Banner List",
    "group": "Banner",
    "name": "BannerList",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "query": [
      {
        "group": "Query",
        "type": "Number",
        "optional": true,
        "field": "limit",
        "description": "<p>Number of records to return</p>"
      },
      {
        "group": "Query",
        "type": "Number",
        "optional": true,
        "field": "offset",
        "description": "<p>Pagination offset</p>"
      },
      {
        "group": "Query",
        "type": "String",
        "optional": true,
        "field": "keyword",
        "description": "<p>Search keyword for banner title</p>"
      },
      {
        "group": "Query",
        "type": "String",
        "optional": true,
        "field": "status",
        "description": "<p>Filter by status (1: Active, 0: Inactive)</p>"
      },
      {
        "group": "Query",
        "type": "Number|Boolean",
        "optional": true,
        "field": "count",
        "description": "<p>If true/1, returns total count</p>"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Successfully got banner list.\",\n    \"data\": [\n        {\n            \"bannerId\": 1,\n            \"title\": \"Summer Sale\",\n            \"content\": \"Special Offers\",\n            \"link\": \"summer-sale\",\n            \"position\": \"top\",\n            \"isActive\": 1,\n            \"bannerImages\": []\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/banner"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/BannerController.ts",
    "groupTitle": "Banner"
  },
  {
    "type": "post",
    "url": "/api/banner",
    "title": "Create Banner",
    "group": "Banner",
    "name": "CreateBanner",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "body": [
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "title",
        "description": "<p>Banner title (max 255 characters)</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": true,
        "field": "content",
        "description": "<p>Banner content/HTML</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": true,
        "field": "link",
        "description": "<p>Banner target link/URL</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": true,
        "field": "position",
        "description": "<p>Banner position</p>"
      },
      {
        "group": "Body",
        "type": "Number",
        "optional": false,
        "field": "status",
        "description": "<p>Status (1: Active, 0: Inactive)</p>"
      },
      {
        "group": "Body",
        "type": "Number",
        "optional": true,
        "field": "linkType",
        "description": "<p>Link type (1: None, 2: Category, 3: Product)</p>"
      },
      {
        "group": "Body",
        "type": "Object[]",
        "optional": false,
        "field": "bannerImage",
        "description": "<p>Array of banner image objects</p>"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"New banner is created successfully.\",\n    \"data\": {\n        \"bannerId\": 1,\n        \"title\": \"Summer Sale\",\n        \"content\": \"Special Offers\",\n        \"link\": \"summer-sale\",\n        \"position\": \"top\",\n        \"linkType\": 1,\n        \"isActive\": 1,\n        \"bannerImages\": [\n            {\n                \"id\": 1,\n                \"imageName\": \"banner.jpg\",\n                \"imagePath\": \"banners/\",\n                \"isPrimary\": 1\n            }\n        ]\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Link-Required:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"status\": 0,\n    \"message\": \"Link is required.\"\n}",
          "type": "json"
        },
        {
          "title": "Position-Exists:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"status\": 0,\n    \"message\": \"Banner Position Already Exist.!\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/banner"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/BannerController.ts",
    "groupTitle": "Banner"
  },
  {
    "type": "delete",
    "url": "/api/banner/:id",
    "title": "Delete Banner",
    "group": "Banner",
    "name": "DeleteBanner",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Path": [
          {
            "group": "Path",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Banner ID to delete</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Successfully deleted banner.\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Invalid-Banner:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"status\": 0,\n    \"message\": \"Invalid banner ID.\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/banner/:id"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/BannerController.ts",
    "groupTitle": "Banner"
  },
  {
    "type": "get",
    "url": "/api/banner/banner-detail",
    "title": "Get Banner Detail",
    "group": "Banner",
    "name": "GetBannerDetail",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "query": [
      {
        "group": "Query",
        "type": "Number",
        "optional": false,
        "field": "bannerId",
        "description": "<p>Banner ID</p>"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Successfully got banner detail.\",\n    \"data\": {\n        \"bannerId\": 1,\n        \"title\": \"Summer Sale\",\n        \"content\": \"Special Offers\",\n        \"link\": \"summer-sale\",\n        \"position\": \"top\",\n        \"isActive\": 1,\n        \"bannerImages\": []\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Invalid-Banner-Id:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"status\": 0,\n    \"message\": \"Invalid Banner Id\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/banner/banner-detail"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/BannerController.ts",
    "groupTitle": "Banner"
  },
  {
    "type": "put",
    "url": "/api/banner/:id",
    "title": "Update Banner",
    "group": "Banner",
    "name": "UpdateBanner",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Path": [
          {
            "group": "Path",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Banner ID</p>"
          }
        ]
      }
    },
    "body": [
      {
        "group": "Body",
        "type": "Number",
        "optional": false,
        "field": "bannerId",
        "description": "<p>Banner ID</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "title",
        "description": "<p>Banner title (max 255 characters)</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": true,
        "field": "content",
        "description": "<p>Banner content/HTML</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": true,
        "field": "link",
        "description": "<p>Banner target link/URL</p>"
      },
      {
        "group": "Body",
        "type": "Number",
        "optional": true,
        "field": "position",
        "description": "<p>Banner position</p>"
      },
      {
        "group": "Body",
        "type": "Number",
        "optional": false,
        "field": "status",
        "description": "<p>Status (1: Active, 0: Inactive)</p>"
      },
      {
        "group": "Body",
        "type": "Number",
        "optional": true,
        "field": "linkType",
        "description": "<p>Link type (1: None, 2: Category, 3: Product)</p>"
      },
      {
        "group": "Body",
        "type": "Number[]",
        "optional": true,
        "field": "deleteImageIds",
        "description": "<p>Array of image IDs to delete</p>"
      },
      {
        "group": "Body",
        "type": "Object[]",
        "optional": true,
        "field": "bannerImage",
        "description": "<p>Array of new banner images</p>"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Successfully updated banner.\",\n    \"data\": {\n        \"bannerId\": 1,\n        \"title\": \"Summer Sale Updated\",\n        \"content\": \"Special Offers\",\n        \"link\": \"summer-sale\",\n        \"position\": 1,\n        \"isActive\": 1\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Invalid-Banner:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"status\": 0,\n    \"message\": \"Invalid banner ID.\"\n}",
          "type": "json"
        },
        {
          "title": "Position-Exists:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"status\": 0,\n    \"message\": \"Banner Position Already Exist.!\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/banner/:id"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/BannerController.ts",
    "groupTitle": "Banner"
  },
  {
    "type": "get",
    "url": "/api/vendor-blog-category",
    "title": "Blog Category List",
    "group": "Blog_Category",
    "name": "BlogCategoryList",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "query": [
      {
        "group": "Query",
        "type": "String",
        "optional": true,
        "field": "keyword",
        "description": "<p>Search keyword</p>"
      },
      {
        "group": "Query",
        "type": "Number",
        "optional": true,
        "field": "limit",
        "description": "<p>Number of records to return</p>"
      },
      {
        "group": "Query",
        "type": "Number",
        "optional": true,
        "field": "offset",
        "description": "<p>Pagination offset</p>"
      },
      {
        "group": "Query",
        "type": "String",
        "optional": true,
        "field": "status",
        "description": "<p>Filter by status</p>"
      },
      {
        "group": "Query",
        "type": "Number|Boolean",
        "optional": true,
        "field": "count",
        "description": "<p>If true/1, returns total count</p>"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Successfully got the blog category list.\",\n    \"data\": [\n        {\n            \"blogCategoryId\": 1,\n            \"name\": \"E-Commerce\",\n            \"isActive\": 1\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-blog-category"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/BlogCategoryController.ts",
    "groupTitle": "Blog_Category"
  },
  {
    "type": "post",
    "url": "/api/vendor-blog-category",
    "title": "Create Blog Category",
    "group": "Blog_Category",
    "name": "CreateBlogCategory",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "body": [
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "name",
        "description": "<p>Blog category name</p>"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Successfully created new blog category.\",\n    \"data\": {\n        \"blogCategoryId\": 1,\n        \"name\": \"E-Commerce Tips\",\n        \"isActive\": 1\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Create-Failed:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"status\": 0,\n    \"message\": \"Unable to create the blog category.\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-blog-category"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/BlogCategoryController.ts",
    "groupTitle": "Blog_Category"
  },
  {
    "type": "delete",
    "url": "/api/vendor-blog-category/:id",
    "title": "Delete Blog Category",
    "group": "Blog_Category",
    "name": "DeleteBlogCategory",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Path": [
          {
            "group": "Path",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Blog Category ID to delete</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Successfully deleted blog category.\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Invalid-Category:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"status\": 0,\n    \"message\": \"Invalid category Id.\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-blog-category/:id"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/BlogCategoryController.ts",
    "groupTitle": "Blog_Category"
  },
  {
    "type": "get",
    "url": "/api/vendor-blog-category/blog-category-detail",
    "title": "Get Blog Category Detail",
    "group": "Blog_Category",
    "name": "GetBlogCategoryDetail",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "query": [
      {
        "group": "Query",
        "type": "Number",
        "optional": false,
        "field": "blogCategoryId",
        "description": "<p>Blog Category ID</p>"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Successfully got blog category detail\",\n    \"data\": {\n        \"blogCategoryId\": 1,\n        \"name\": \"E-Commerce\",\n        \"isActive\": 1\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Invalid-Category:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"status\": 0,\n    \"message\": \"Invalid Blog Category Id\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-blog-category/blog-category-detail"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/BlogCategoryController.ts",
    "groupTitle": "Blog_Category"
  },
  {
    "type": "put",
    "url": "/api/vendor-blog-category/:id",
    "title": "Update Blog Category",
    "group": "Blog_Category",
    "name": "UpdateBlogCategory",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Path": [
          {
            "group": "Path",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Blog Category ID</p>"
          }
        ]
      }
    },
    "body": [
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "name",
        "description": "<p>Updated blog category name</p>"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Successfully updated blog category.\",\n    \"data\": {\n        \"blogCategoryId\": 1,\n        \"name\": \"Updated Category\",\n        \"isActive\": 1\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Invalid-Category:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"status\": 0,\n    \"message\": \"Invalid category ID.\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-blog-category/:id"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/BlogCategoryController.ts",
    "groupTitle": "Blog_Category"
  },
  {
    "type": "get",
    "url": "/api/vendor-blog-seo/:blogId",
    "title": "Get Blog SEO Detail",
    "group": "Blog_SEO",
    "name": "GetBlogSeoDetail",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Path": [
          {
            "group": "Path",
            "type": "Number",
            "optional": false,
            "field": "blogId",
            "description": "<p>Blog ID</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Successfully got SEO detail.\",\n    \"data\": {\n        \"id\": 1,\n        \"referenceId\": 1,\n        \"route\": \"blog-details/blog-slug\",\n        \"metaTitle\": \"Title\",\n        \"metaDescription\": \"Description\",\n        \"metaKeyword\": \"Keywords\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Invalid-Blog:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"status\": 0,\n    \"message\": \"Invalid Blog.\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-blog-seo/:blogId"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/BlogSeoController.ts",
    "groupTitle": "Blog_SEO"
  },
  {
    "type": "post",
    "url": "/api/vendor-blog-seo/:blogId",
    "title": "Update Blog SEO",
    "group": "Blog_SEO",
    "name": "UpdateBlogSeo",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Path": [
          {
            "group": "Path",
            "type": "Number",
            "optional": false,
            "field": "blogId",
            "description": "<p>Blog ID</p>"
          }
        ]
      }
    },
    "body": [
      {
        "group": "Body",
        "type": "String",
        "optional": true,
        "field": "metaTagTitle",
        "description": "<p>Meta tag title (max 140 chars)</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": true,
        "field": "metaTagDescription",
        "description": "<p>Meta tag description (max 160 chars)</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": true,
        "field": "metaTagKeyword",
        "description": "<p>Meta tag keywords (max 255 chars)</p>"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"SEO Updated successfully\",\n    \"data\": {\n        \"id\": 1,\n        \"referenceId\": 1,\n        \"route\": \"blog-details/blog-slug\",\n        \"metaTitle\": \"Title\",\n        \"metaDescription\": \"Description\",\n        \"metaKeyword\": \"Keywords\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Invalid-Blog:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"status\": 0,\n    \"message\": \"Invalid Blog. \"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-blog-seo/:blogId"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/BlogSeoController.ts",
    "groupTitle": "Blog_SEO"
  },
  {
    "type": "get",
    "url": "/api/vendor-blog-seo",
    "title": "Blog SEO List",
    "group": "Blog_SEO",
    "name": "VendorBlogSeoList",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "query": [
      {
        "group": "Query",
        "type": "Number",
        "optional": true,
        "field": "limit",
        "description": "<p>Number of records to return</p>"
      },
      {
        "group": "Query",
        "type": "Number",
        "optional": true,
        "field": "offset",
        "description": "<p>Pagination offset</p>"
      },
      {
        "group": "Query",
        "type": "String",
        "optional": true,
        "field": "keyword",
        "description": "<p>Search keyword for blog title</p>"
      },
      {
        "group": "Query",
        "type": "String",
        "optional": true,
        "field": "categoryId",
        "description": "<p>Filter by blog category ID</p>"
      },
      {
        "group": "Query",
        "type": "Number",
        "optional": true,
        "field": "status",
        "description": "<p>Filter by status (1: Active, 0: Inactive)</p>"
      },
      {
        "group": "Query",
        "type": "Number|Boolean",
        "optional": true,
        "field": "count",
        "description": "<p>If true/1, returns total count</p>"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Successfully got Blog list\",\n    \"data\": [\n        {\n            \"id\": 1,\n            \"title\": \"Blog Title\",\n            \"categoryId\": \"1\",\n            \"description\": \"Content description\",\n            \"image\": \"blog.jpg\",\n            \"imagePath\": \"blog/\",\n            \"isActive\": 1,\n            \"blogSlug\": \"blog-title\"\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-blog-seo"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/BlogSeoController.ts",
    "groupTitle": "Blog_SEO"
  },
  {
    "type": "get",
    "url": "/api/category",
    "title": "Category List",
    "group": "Category",
    "name": "CategoryList",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "query": [
      {
        "group": "Query",
        "type": "Number",
        "optional": true,
        "field": "limit",
        "description": "<p>Number of records to return</p>"
      },
      {
        "group": "Query",
        "type": "Number",
        "optional": true,
        "field": "offset",
        "description": "<p>Pagination offset</p>"
      },
      {
        "group": "Query",
        "type": "String",
        "optional": true,
        "field": "keyword",
        "description": "<p>Search keyword</p>"
      },
      {
        "group": "Query",
        "type": "Number",
        "optional": true,
        "field": "sortOrder",
        "description": "<p>Sort order</p>"
      },
      {
        "group": "Query",
        "type": "String",
        "optional": true,
        "field": "status",
        "description": "<p>Filter by status</p>"
      },
      {
        "group": "Query",
        "type": "String",
        "optional": true,
        "field": "name",
        "description": "<p>Filter by category name</p>"
      },
      {
        "group": "Query",
        "type": "Number",
        "optional": true,
        "field": "industryId",
        "description": "<p>Filter by industry ID</p>"
      },
      {
        "group": "Query",
        "type": "Number|Boolean",
        "optional": true,
        "field": "count",
        "description": "<p>If true/1, returns total count</p>"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Successfully got category path list.\",\n    \"data\": [\n        {\n            \"categoryId\": 1,\n            \"name\": \"Electronics\",\n            \"categorySlug\": \"electronics\",\n            \"parentInt\": 0,\n            \"sortOrder\": 1,\n            \"levels\": \"Electronics\",\n            \"isActive\": 1\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/category"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/CategoryController.ts",
    "groupTitle": "Category"
  },
  {
    "type": "post",
    "url": "/api/category",
    "title": "Create Category",
    "group": "Category",
    "name": "CreateCategory",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "body": [
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "name",
        "description": "<p>Category name (max 255 characters)</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": true,
        "field": "image",
        "description": "<p>Base64 encoded category image</p>"
      },
      {
        "group": "Body",
        "type": "Number",
        "optional": true,
        "field": "parentInt",
        "description": "<p>Parent category ID</p>"
      },
      {
        "group": "Body",
        "type": "Number",
        "optional": false,
        "field": "sortOrder",
        "description": "<p>Sort order (max 9999)</p>"
      },
      {
        "group": "Body",
        "type": "Number",
        "optional": false,
        "field": "status",
        "description": "<p>Status (1: Active, 0: Inactive)</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "categorySlug",
        "description": "<p>Unique category slug</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": true,
        "field": "categoryDescription",
        "description": "<p>Category description</p>"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"New category created successfully.\",\n    \"data\": {\n        \"categoryId\": 1,\n        \"name\": \"Electronics\",\n        \"categorySlug\": \"electronics\",\n        \"parentInt\": 0,\n        \"sortOrder\": 1,\n        \"isActive\": 1\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Max-Levels-Exceeded:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"status\": 0,\n    \"message\": \"Category can only be mapped up to 3 levels. More than 3 levels are not allowed.\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/category"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/CategoryController.ts",
    "groupTitle": "Category"
  },
  {
    "type": "delete",
    "url": "/api/category",
    "title": "Delete Category",
    "group": "Category",
    "name": "DeleteCategory",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "body": [
      {
        "group": "Body",
        "type": "Number",
        "optional": false,
        "field": "categoryId",
        "description": "<p>Category ID to delete</p>"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Category deleted successfully.\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Invalid-Category:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"status\": 0,\n    \"message\": \"Invalid category ID.\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/category"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/CategoryController.ts",
    "groupTitle": "Category"
  },
  {
    "type": "get",
    "url": "/api/category/category-detail",
    "title": "Get Category Detail",
    "group": "Category",
    "name": "GetCategoryDetail",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "query": [
      {
        "group": "Query",
        "type": "Number",
        "optional": false,
        "field": "categoryId",
        "description": "<p>Category ID</p>"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Category details retrieved successfully.\",\n    \"data\": {\n        \"categoryId\": 1,\n        \"name\": \"Electronics\",\n        \"categorySlug\": \"electronics\",\n        \"parentInt\": 0,\n        \"sortOrder\": 1,\n        \"isActive\": 1\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Invalid-Category:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"status\": 0,\n    \"message\": \"Invalid category ID.\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/category/category-detail"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/CategoryController.ts",
    "groupTitle": "Category"
  },
  {
    "type": "put",
    "url": "/api/category/:id",
    "title": "Update Category",
    "group": "Category",
    "name": "UpdateCategory",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Path": [
          {
            "group": "Path",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Category ID to update</p>"
          }
        ]
      }
    },
    "body": [
      {
        "group": "Body",
        "type": "Number",
        "optional": false,
        "field": "categoryId",
        "description": "<p>Category ID</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "name",
        "description": "<p>Category name</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": true,
        "field": "image",
        "description": "<p>Base64 encoded category image</p>"
      },
      {
        "group": "Body",
        "type": "Number",
        "optional": true,
        "field": "parentInt",
        "description": "<p>Parent category ID</p>"
      },
      {
        "group": "Body",
        "type": "Number",
        "optional": false,
        "field": "sortOrder",
        "description": "<p>Sort order</p>"
      },
      {
        "group": "Body",
        "type": "Number",
        "optional": false,
        "field": "status",
        "description": "<p>Status (1: Active, 0: Inactive)</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": true,
        "field": "categorySlug",
        "description": "<p>Category slug</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": true,
        "field": "categoryDescription",
        "description": "<p>Category description</p>"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"The category has been successfully updated.\",\n    \"data\": {\n        \"categoryId\": 1,\n        \"name\": \"Electronics Updated\",\n        \"isActive\": 1\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Invalid-Category:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"status\": 0,\n    \"message\": \"Invalid category ID.\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/category/:id"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/CategoryController.ts",
    "groupTitle": "Category"
  },
  {
    "type": "get",
    "url": "/api/vendor-category-seo/:categoryId",
    "title": "Get Category SEO Detail",
    "group": "Category_SEO",
    "name": "GetCategorySeoDetail",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Path": [
          {
            "group": "Path",
            "type": "Number",
            "optional": false,
            "field": "categoryId",
            "description": "<p>Category ID</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Successfully got SEO details. \",\n    \"data\": {\n        \"id\": 1,\n        \"referenceId\": 1,\n        \"route\": \"category-details/electronics\",\n        \"metaTitle\": \"Title\",\n        \"metaDescription\": \"Description\",\n        \"metaKeyword\": \"Keywords\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Invalid-Category:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"status\": 0,\n    \"message\": \"Invalid category. \"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-category-seo/:categoryId"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/CategorySeoController.ts",
    "groupTitle": "Category_SEO"
  },
  {
    "type": "post",
    "url": "/api/vendor-category-seo/:categoryId",
    "title": "Update Category SEO",
    "group": "Category_SEO",
    "name": "UpdateCategorySeo",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Path": [
          {
            "group": "Path",
            "type": "Number",
            "optional": false,
            "field": "categoryId",
            "description": "<p>Category ID</p>"
          }
        ]
      }
    },
    "body": [
      {
        "group": "Body",
        "type": "String",
        "optional": true,
        "field": "metaTagTitle",
        "description": "<p>Meta tag title (max 140 chars)</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": true,
        "field": "metaTagDescription",
        "description": "<p>Meta tag description (max 160 chars)</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": true,
        "field": "metaTagKeyword",
        "description": "<p>Meta tag keywords (max 255 chars)</p>"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"SEO Updated successfully\",\n    \"data\": {\n        \"id\": 1,\n        \"referenceId\": 1,\n        \"route\": \"category-details/electronics\",\n        \"metaTitle\": \"Title\",\n        \"metaDescription\": \"Description\",\n        \"metaKeyword\": \"Keywords\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Invalid-Category:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"status\": 0,\n    \"message\": \"Invalid Category. \"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-category-seo/:categoryId"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/CategorySeoController.ts",
    "groupTitle": "Category_SEO"
  },
  {
    "type": "get",
    "url": "/api/vendor-category-seo",
    "title": "Category SEO List",
    "group": "Category_SEO",
    "name": "VendorCategorySeoList",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "query": [
      {
        "group": "Query",
        "type": "Number",
        "optional": true,
        "field": "limit",
        "description": "<p>Number of records to return</p>"
      },
      {
        "group": "Query",
        "type": "Number",
        "optional": true,
        "field": "offset",
        "description": "<p>Pagination offset</p>"
      },
      {
        "group": "Query",
        "type": "String",
        "optional": true,
        "field": "keyword",
        "description": "<p>Search keyword</p>"
      },
      {
        "group": "Query",
        "type": "Number",
        "optional": true,
        "field": "sortOrder",
        "description": "<p>Sort order</p>"
      },
      {
        "group": "Query",
        "type": "String",
        "optional": true,
        "field": "status",
        "description": "<p>Filter by status</p>"
      },
      {
        "group": "Query",
        "type": "Number|Boolean",
        "optional": true,
        "field": "count",
        "description": "<p>If true/1, returns total count</p>"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Successfully got category list.\",\n    \"data\": [\n        {\n            \"categoryId\": 1,\n            \"name\": \"Electronics\",\n            \"categorySlug\": \"electronics\",\n            \"isActive\": 1\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-category-seo"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/CategorySeoController.ts",
    "groupTitle": "Category_SEO"
  },
  {
    "type": "get",
    "url": "/api/vendor-country/:countryName",
    "title": "Get Country ID by Name",
    "group": "Country",
    "name": "GetCountryIdByName",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Path": [
          {
            "group": "Path",
            "type": "String",
            "optional": false,
            "field": "countryName",
            "description": "<p>Country name to search</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Successfully got vendor country id.\",\n    \"data\": {\n        \"countryId\": 99,\n        \"name\": \"India\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Invalid-Country-Name:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"status\": 0,\n    \"message\": \"Enter valid vendor country name.\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-country/:countryName"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/CountryController.ts",
    "groupTitle": "Country"
  },
  {
    "type": "post",
    "url": "/api/vendor-country",
    "title": "Map Vendor Countries",
    "group": "Country",
    "name": "MapVendorCountry",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "body": [
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "countryIds",
        "description": "<p>Comma-separated list of country IDs</p>"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Successfully updated vendor countries.\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Invalid-Countries:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"status\": 0,\n    \"message\": \"Invalid vendor countries.\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-country"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/CountryController.ts",
    "groupTitle": "Country"
  },
  {
    "type": "get",
    "url": "/api/vendor-country",
    "title": "Vendor Country List",
    "group": "Country",
    "name": "VendorCountryList",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "query": [
      {
        "group": "Query",
        "type": "Number",
        "optional": true,
        "field": "limit",
        "description": "<p>Number of records to return</p>"
      },
      {
        "group": "Query",
        "type": "Number",
        "optional": true,
        "field": "offset",
        "description": "<p>Pagination offset</p>"
      },
      {
        "group": "Query",
        "type": "String",
        "optional": true,
        "field": "keyword",
        "description": "<p>Search keyword for country name or ISO code</p>"
      },
      {
        "group": "Query",
        "type": "String",
        "optional": true,
        "field": "status",
        "description": "<p>Filter by status</p>"
      },
      {
        "group": "Query",
        "type": "Number|Boolean",
        "optional": true,
        "field": "count",
        "description": "<p>If true/1, returns total count</p>"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Successfully get all vendor country list.\",\n    \"data\": [\n        {\n            \"id\": 1,\n            \"countryId\": 99,\n            \"name\": \"INDIA\",\n            \"isoCode2\": \"IN\",\n            \"isoCode3\": \"IND\",\n            \"addressFormat\": \"\",\n            \"postcodeRequired\": 0,\n            \"isActive\": 1\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-country"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/CountryController.ts",
    "groupTitle": "Country"
  },
  {
    "type": "get",
    "url": "/api/vendor-currency/master-currency",
    "title": "Master Currency List",
    "group": "Currency",
    "name": "MasterCurrencyList",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "query": [
      {
        "group": "Query",
        "type": "Number",
        "optional": true,
        "field": "limit",
        "description": "<p>Number of records to return</p>"
      },
      {
        "group": "Query",
        "type": "Number",
        "optional": true,
        "field": "offset",
        "description": "<p>Pagination offset</p>"
      },
      {
        "group": "Query",
        "type": "String",
        "optional": true,
        "field": "keyword",
        "description": "<p>Search keyword for currency title or code</p>"
      },
      {
        "group": "Query",
        "type": "String",
        "optional": true,
        "field": "status",
        "description": "<p>Filter by status</p>"
      },
      {
        "group": "Query",
        "type": "Number|Boolean",
        "optional": true,
        "field": "count",
        "description": "<p>If true/1, returns total count</p>"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Successfully got the complete currency list\",\n    \"data\": [\n        {\n            \"currencyId\": 73,\n            \"title\": \"US Dollar\",\n            \"code\": \"USD\",\n            \"symbolLeft\": \"$\",\n            \"symbolRight\": null,\n            \"isActive\": 1\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-currency/master-currency"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/CurrencyController.ts",
    "groupTitle": "Currency"
  },
  {
    "type": "post",
    "url": "/api/vendor-customer",
    "title": "Create Customer",
    "group": "Customer",
    "name": "CreateVendorCustomer",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "body": [
      {
        "group": "Body",
        "type": "Number",
        "optional": false,
        "field": "customerGroupId",
        "description": "<p>Customer Group ID</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "username",
        "description": "<p>Username (max 32 characters)</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "email",
        "description": "<p>Email address (max 96 characters)</p>"
      },
      {
        "group": "Body",
        "type": "Number",
        "optional": false,
        "field": "mobileNumber",
        "description": "<p>Mobile number (min 6 digits, max 15)</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "password",
        "description": "<p>Password (min 8 chars, uppercase, lowercase, number/symbol)</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "confirmPassword",
        "description": "<p>Confirm password matching password</p>"
      },
      {
        "group": "Body",
        "type": "Number",
        "optional": true,
        "field": "newsletter",
        "description": "<p>Newsletter subscription (1: Yes, 0: No)</p>"
      },
      {
        "group": "Body",
        "type": "Number",
        "optional": false,
        "field": "mailStatus",
        "description": "<p>Mail status (1: Enable, 0: Disable)</p>"
      },
      {
        "group": "Body",
        "type": "Number",
        "optional": true,
        "field": "status",
        "description": "<p>Account status (1: Active, 0: Inactive)</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": true,
        "field": "firstName",
        "description": "<p>Customer first name</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": true,
        "field": "lastName",
        "description": "<p>Customer last name</p>"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Customer Created successfully\",\n    \"data\": {\n        \"id\": 1,\n        \"firstName\": \"John\",\n        \"lastName\": \"Doe\",\n        \"email\": \"john@example.com\",\n        \"mobileNumber\": \"1234567890\",\n        \"customerGroupId\": 1,\n        \"isActive\": 1\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Duplicate-Email:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"status\": 0,\n    \"message\": \"This email already exists.\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-customer"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/CustomerController.ts",
    "groupTitle": "Customer"
  },
  {
    "type": "delete",
    "url": "/api/vendor-customer/:id",
    "title": "Delete Customer",
    "group": "Customer",
    "name": "DeleteVendorCustomer",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Path": [
          {
            "group": "Path",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Customer ID to delete</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Customer deleted successfully.\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Invalid-Customer:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"status\": 0,\n    \"message\": \"Invalid customer Id\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-customer/:id"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/CustomerController.ts",
    "groupTitle": "Customer"
  },
  {
    "type": "get",
    "url": "/api/vendor-customer/customer-excel-list",
    "title": "Export Customer Excel",
    "group": "Customer",
    "name": "ExportVendorCustomer",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "query": [
      {
        "group": "Query",
        "type": "String",
        "optional": true,
        "field": "dateFrom",
        "description": "<p>Start date filter (YYYY-MM-DD)</p>"
      },
      {
        "group": "Query",
        "type": "String",
        "optional": true,
        "field": "dateTo",
        "description": "<p>End date filter (YYYY-MM-DD)</p>"
      },
      {
        "group": "Query",
        "type": "String",
        "optional": true,
        "field": "title",
        "description": "<p>Export title</p>"
      },
      {
        "group": "Query",
        "type": "String",
        "optional": true,
        "field": "customerId",
        "description": "<p>Comma-separated customer IDs</p>"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Successfully exported customer excel\",\n    \"data\": \"s3-url-or-file-buffer\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-customer/customer-excel-list"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/CustomerController.ts",
    "groupTitle": "Customer"
  },
  {
    "type": "get",
    "url": "/api/vendor-customer/customer-excel-download/:logId",
    "title": "Download Exported Customer Excel",
    "group": "Customer",
    "name": "ExportVendorCustomerByLog",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Path": [
          {
            "group": "Path",
            "type": "Number",
            "optional": false,
            "field": "logId",
            "description": "<p>Export Log ID</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Successfully downloaded customer excel\",\n    \"data\": \"file-content\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Invalid-Log:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"status\": 0,\n    \"message\": \"Invalid log id\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-customer/customer-excel-download/:logId"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/CustomerController.ts",
    "groupTitle": "Customer"
  },
  {
    "type": "get",
    "url": "/api/vendor-customer/user-list",
    "title": "Get Customer Users List",
    "group": "Customer",
    "name": "FindCustomerUsers",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "query": [
      {
        "group": "Query",
        "type": "Number",
        "optional": false,
        "field": "customerId",
        "description": "<p>Customer ID</p>"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"successfully got customer user list\",\n    \"data\": [\n        {\n            \"id\": 1,\n            \"firstName\": \"John\",\n            \"lastName\": \"Doe\",\n            \"email\": \"john@example.com\"\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-customer/user-list"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/CustomerController.ts",
    "groupTitle": "Customer"
  },
  {
    "type": "get",
    "url": "/api/vendor-customer/customer-detail/:id",
    "title": "Get Customer Details",
    "group": "Customer",
    "name": "GetVendorCustomerDetail",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Path": [
          {
            "group": "Path",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Customer ID</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"successfully got Customer details.\",\n    \"data\": {\n        \"id\": 1,\n        \"firstName\": \"John\",\n        \"lastName\": \"Doe\",\n        \"email\": \"john@example.com\",\n        \"mobileNumber\": \"1234567890\",\n        \"customerGroupId\": 1,\n        \"isActive\": 1\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Invalid-Customer:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"status\": 0,\n    \"message\": \"Invalid customer Id\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-customer/customer-detail/:id"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/CustomerController.ts",
    "groupTitle": "Customer"
  },
  {
    "type": "put",
    "url": "/api/vendor-customer/:id",
    "title": "Update Customer",
    "group": "Customer",
    "name": "UpdateVendorCustomer",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Path": [
          {
            "group": "Path",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Customer ID</p>"
          }
        ]
      }
    },
    "body": [
      {
        "group": "Body",
        "type": "Number",
        "optional": false,
        "field": "customerGroupId",
        "description": "<p>Customer Group ID</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "username",
        "description": "<p>Username</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "email",
        "description": "<p>Email address</p>"
      },
      {
        "group": "Body",
        "type": "Number",
        "optional": false,
        "field": "mobileNumber",
        "description": "<p>Mobile number</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": true,
        "field": "password",
        "description": "<p>New password (optional)</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": true,
        "field": "confirmPassword",
        "description": "<p>Confirm new password (optional)</p>"
      },
      {
        "group": "Body",
        "type": "Number",
        "optional": true,
        "field": "newsletter",
        "description": "<p>Newsletter subscription</p>"
      },
      {
        "group": "Body",
        "type": "Number",
        "optional": false,
        "field": "mailStatus",
        "description": "<p>Mail status</p>"
      },
      {
        "group": "Body",
        "type": "Number",
        "optional": false,
        "field": "status",
        "description": "<p>Status</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": true,
        "field": "firstName",
        "description": "<p>Customer first name</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": true,
        "field": "lastName",
        "description": "<p>Customer last name</p>"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"User Updated successfully\",\n    \"data\": {\n        \"id\": 1,\n        \"firstName\": \"John\",\n        \"lastName\": \"Doe\",\n        \"email\": \"john@example.com\",\n        \"isActive\": 1\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Invalid-Customer:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"status\": 0,\n    \"message\": \"Invalid customer Id\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-customer/:id"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/CustomerController.ts",
    "groupTitle": "Customer"
  },
  {
    "type": "get",
    "url": "/api/vendor-customer",
    "title": "Customer List",
    "group": "Customer",
    "name": "VendorCustomerList",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "query": [
      {
        "group": "Query",
        "type": "Number",
        "optional": true,
        "field": "limit",
        "description": "<p>Number of records to return</p>"
      },
      {
        "group": "Query",
        "type": "Number",
        "optional": true,
        "field": "offset",
        "description": "<p>Pagination offset</p>"
      },
      {
        "group": "Query",
        "type": "String",
        "optional": true,
        "field": "name",
        "description": "<p>Customer name filter</p>"
      },
      {
        "group": "Query",
        "type": "String",
        "optional": true,
        "field": "keyword",
        "description": "<p>Search keyword</p>"
      },
      {
        "group": "Query",
        "type": "String",
        "optional": true,
        "field": "status",
        "description": "<p>Status filter (1: Active, 0: Inactive)</p>"
      },
      {
        "group": "Query",
        "type": "String",
        "optional": true,
        "field": "email",
        "description": "<p>Email filter</p>"
      },
      {
        "group": "Query",
        "type": "String",
        "optional": true,
        "field": "customerGroup",
        "description": "<p>Customer group ID filter</p>"
      },
      {
        "group": "Query",
        "type": "String",
        "optional": true,
        "field": "customerGroupName",
        "description": "<p>Customer group name filter</p>"
      },
      {
        "group": "Query",
        "type": "String",
        "optional": true,
        "field": "customerName",
        "description": "<p>Customer full name filter</p>"
      },
      {
        "group": "Query",
        "type": "String",
        "optional": true,
        "field": "date",
        "description": "<p>Registration date filter</p>"
      },
      {
        "group": "Query",
        "type": "Number|Boolean",
        "optional": true,
        "field": "count",
        "description": "<p>If true/1, returns total count</p>"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Successfully got customer list\",\n    \"data\": [\n        {\n            \"id\": 1,\n            \"firstName\": \"John\",\n            \"lastName\": \"Doe\",\n            \"email\": \"john@example.com\",\n            \"mobileNumber\": \"1234567890\",\n            \"isActive\": 1\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-customer"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/CustomerController.ts",
    "groupTitle": "Customer"
  },
  {
    "type": "post",
    "url": "/api/address",
    "title": "Create Customer Address",
    "group": "Customer_Address",
    "name": "CreateCustomerAddress",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "body": [
      {
        "group": "Body",
        "type": "Number",
        "optional": false,
        "field": "customerId",
        "description": "<p>Customer ID</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": true,
        "field": "firstName",
        "description": "<p>First name (optional, defaults to customer's first name)</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": true,
        "field": "lastName",
        "description": "<p>Last name (optional, defaults to customer's last name)</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "address1",
        "description": "<p>Primary address</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": true,
        "field": "address2",
        "description": "<p>Secondary address</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "city",
        "description": "<p>City</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": true,
        "field": "state",
        "description": "<p>State (optional)</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "postcode",
        "description": "<p>Postal code</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "addressType",
        "description": "<p>Address type (e.g., home, office)</p>"
      },
      {
        "group": "Body",
        "type": "Number",
        "optional": false,
        "field": "countryId",
        "description": "<p>Country ID</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": true,
        "field": "company",
        "description": "<p>Company name</p>"
      },
      {
        "group": "Body",
        "type": "Number",
        "optional": true,
        "field": "zoneId",
        "description": "<p>Zone ID (optional)</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "phoneNumber",
        "description": "<p>Contact phone number</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": true,
        "field": "landmark",
        "description": "<p>Landmark or nearby place</p>"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Your address has been saved!\",\n    \"data\": {\n        \"id\": 12,\n        \"customerId\": 3,\n        \"firstName\": \"John\",\n        \"lastName\": \"Doe\",\n        \"address1\": \"123 Main St\",\n        \"address2\": \"\",\n        \"city\": \"New York\",\n        \"state\": \"NY\",\n        \"postcode\": \"10001\",\n        \"addressType\": \"home\",\n        \"countryId\": 1,\n        \"company\": null,\n        \"zoneId\": 0,\n        \"phoneNo\": \"5551234567\",\n        \"landmark\": \"Near Central Park\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Invalid-Customer-Id:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"status\": 0,\n    \"message\": \"Invalid customer ID, try again\"\n}",
          "type": "json"
        },
        {
          "title": "Create-Failed:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"status\": 0,\n    \"message\": \"Unable to add address. Please try again.\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/address"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/AddressController.ts",
    "groupTitle": "Customer_Address"
  },
  {
    "type": "delete",
    "url": "/api/customer-address/:id",
    "title": "Delete Customer Address API",
    "group": "Customer_Address",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"addressId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully deleted address.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/customer-address/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "address error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/store/controllers/CustomerAddressController.ts",
    "groupTitle": "Customer_Address",
    "name": "DeleteApiCustomerAddressId"
  },
  {
    "type": "get",
    "url": "/api/customer-address",
    "title": "Get Customer Address List API",
    "group": "Customer_Address",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "count",
            "description": "<p>count</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"customerId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get customer address list\",\n     \"data\": {\n     \"customerAddress\": [\n      {\n          \"createdBy\": \"\",\n          \"createdDate\": \"\",\n          \"modifiedBy\": \"\",\n          \"modifiedDate\": \"\",\n          \"addressId\": 1,\n          \"customerId\": 1,\n          \"countryId\": 99,\n          \"zoneId\": 1,\n          \"firstName\": \"\",\n          \"lastName\": \"\",\n          \"company\": \"\",\n          \"address1\": \"\",\n          \"address2\": \"\",\n          \"postcode\": \"\",\n          \"city\": \"\",\n          \"state\": \"\",\n          \"emailId\": \"\",\n          \"phoneNo\": \"\",\n          \"addressType\": ,\n          \"isActive\": \"\",\n          \"landmark\": \"\",\n          \"isDefault\": \"\",\n          \"zone\": {\n              \"createdBy\": \"\",\n              \"createdDate\": \"\",\n              \"modifiedBy\": \"\",\n              \"modifiedDate\": \"\",\n              \"zoneId\": 1,\n              \"countryId\": 99,\n              \"code\": \"\",\n              \"name\": \"\",\n              \"isActive\": 1\n          }\n      },\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/customer-address"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Address error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/store/controllers/CustomerAddressController.ts",
    "groupTitle": "Customer_Address",
    "name": "GetApiCustomerAddress"
  },
  {
    "type": "get",
    "url": "/api/customer-address/:id",
    "title": "Get Customer Address List API",
    "group": "Customer_Address",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get customer address Detail.\",\n     \"data\": {\n             \"createdBy\": \"\",\n             \"createdDate\": \"\",\n             \"modifiedBy\": \"\",\n             \"modifiedDate\": \"\",\n             \"addressId\": \"\",\n             \"customerId\": \"\",\n             \"countryId\": \"\",\n             \"zoneId\": \"\",\n             \"firstName\": \"\",\n             \"lastName\": \"\",\n             \"company\": \"\",\n             \"address1\": \"\",\n             \"address2\": \"\",\n             \"postcode\": \"\",\n             \"city\": \"\",\n             \"state\": \"\",\n             \"emailId\": \"\",\n             \"phoneNo\": \"\",\n             \"addressType\": \"\",\n             \"isActive\": \"\",\n             \"landmark\": \"\",\n             \"isDefault\": \"\"\n             }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/customer-address/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Address error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/store/controllers/CustomerAddressController.ts",
    "groupTitle": "Customer_Address",
    "name": "GetApiCustomerAddressId"
  },
  {
    "type": "get",
    "url": "/api/customer-address/live/address",
    "title": "live-Address API",
    "group": "Customer_Address",
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n   \"message\": \"Got Live Address...!\",\n    \"status\" : \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/customer-address/live/address"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "live Address error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/store/controllers/CustomerAddressController.ts",
    "groupTitle": "Customer_Address",
    "name": "GetApiCustomerAddressLiveAddress"
  },
  {
    "type": "post",
    "url": "/api/customer-address",
    "title": "Add Customer Address API",
    "group": "Customer_Address",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "size": "..128",
            "optional": false,
            "field": "firstName",
            "description": "<p>firstName</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "size": "..128",
            "optional": false,
            "field": "lastName",
            "description": "<p>lastName</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "size": "..128",
            "optional": false,
            "field": "address1",
            "description": "<p>address1</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "size": "..128",
            "optional": true,
            "field": "address2",
            "description": "<p>address2</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "size": "..128",
            "optional": false,
            "field": "city",
            "description": "<p>city</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "size": "..128",
            "optional": false,
            "field": "state",
            "description": "<p>state</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "size": "..6",
            "optional": false,
            "field": "postcode",
            "description": "<p>postcode</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "countryId",
            "description": "<p>countryId</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "addressType",
            "description": "<p>addressType</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "size": "..128",
            "optional": false,
            "field": "phoneNumber",
            "description": "<p>phoneNumber</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "size": "..32",
            "optional": true,
            "field": "company",
            "description": "<p>company</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "isDefault",
            "description": "<p>isDefault</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"firstName\": \"\",\n     \"lastName\": \"\",\n     \"address1\" : \"\",\n     \"address2\" : \"\",\n     \"city\" : \"\",\n     \"state\" : \"\",\n     \"countryId\" : \"\",\n     \"postcode\" : \"\",\n     \"countryId\" : \"\",\n     \"addressType\" : \"\",\n     \"company\" : \"\",\n     \"landmark\": \"\",\n     \"phoneNumber\": \"\",\n     \"isDefault\": \"\"\n}",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"New Address is created successfully\",\n     \"status\": \"1\"\n     \"data\": {\n             \"createdBy\": \"\",\n             \"createdDate\": \"\",\n             \"modifiedBy\": \"\",\n             \"modifiedDate\": \"\",\n             \"addressId\": 1,\n             \"customerId\": 1,\n             \"countryId\": 99,\n             \"firstName\": \"\",\n             \"lastName\": \"\",\n             \"company\": \"\",\n             \"address1\": \"\",\n             \"address2\": \"\",\n             \"postcode\": \"\",\n             \"city\": \"\",\n             \"state\": \"\",\n             \"emailId\": \"\",\n             \"addressType\": \"\",\n             \"isActive\": 1,\n             \"landmark\": \"\",\n             \"isDefault\": \"\"\n             }\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/customer-address"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "addAddress error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/store/controllers/CustomerAddressController.ts",
    "groupTitle": "Customer_Address",
    "name": "PostApiCustomerAddress"
  },
  {
    "type": "post",
    "url": "/api/customer-address/live/",
    "title": "live Address API",
    "group": "Customer_Address",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "Authorized",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "requestBody": [
          {
            "group": "requestBody",
            "type": "string",
            "optional": false,
            "field": "address1",
            "description": "<p>address1</p>"
          },
          {
            "group": "requestBody",
            "type": "string",
            "optional": false,
            "field": "address2",
            "description": "<p>address2</p>"
          },
          {
            "group": "requestBody",
            "type": "string",
            "optional": false,
            "field": "city",
            "description": "<p>city</p>"
          },
          {
            "group": "requestBody",
            "type": "string",
            "optional": false,
            "field": "state",
            "description": "<p>state</p>"
          },
          {
            "group": "requestBody",
            "type": "Number",
            "optional": false,
            "field": "postcode",
            "description": "<p>postcode</p>"
          },
          {
            "group": "requestBody",
            "type": "Number",
            "optional": false,
            "field": "countryId",
            "description": "<p>countryId</p>"
          },
          {
            "group": "requestBody",
            "type": "string",
            "optional": false,
            "field": "company",
            "description": "<p>company</p>"
          },
          {
            "group": "requestBody",
            "type": "Number",
            "optional": false,
            "field": "addressType",
            "description": "<p>addressType</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n          \"address1\": \"\",\n           \"address2\": \"\",\n            \"city\":\"\",\n            \"state\":\"\",\n            \"postcode\":\"\",\n            \"countryId\":\"\",\n            \"company\":\"\"\n            \"addressType\":\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n   \"message\": \"Live Address Successfully Added..!\",\n   \"status\" : \"1\",\n   \"data\" : {\n             \"userIp\": \"\",\n             \"address1\": \"\",\n             \"address2\": \"\",\n             \"city\": \"\",\n             \"state\": \"\",\n             \"countryId\": \"\",\n             \"postCode\": \"\",\n             \"company\": \"\",\n             \"isActive\": \"\",\n             \"createdBy\": \"\",\n             \"createdDate\": \"\"\n             }\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/customer-address/live/"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "live Address error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/store/controllers/CustomerAddressController.ts",
    "groupTitle": "Customer_Address",
    "name": "PostApiCustomerAddressLive"
  },
  {
    "type": "put",
    "url": "/api/customer-address/:id",
    "title": "Update Customer Address API",
    "group": "Customer_Address",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "size": "..128",
            "optional": false,
            "field": "address1",
            "description": "<p>address1</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "size": "..128",
            "optional": true,
            "field": "address2",
            "description": "<p>address2</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "size": "..128",
            "optional": false,
            "field": "city",
            "description": "<p>city</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "size": "..128",
            "optional": false,
            "field": "state",
            "description": "<p>state</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "size": "..6",
            "optional": false,
            "field": "postcode",
            "description": "<p>postcode</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "countryId",
            "description": "<p>countryId</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "addressType",
            "description": "<p>addressType</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "size": "..32",
            "optional": true,
            "field": "company",
            "description": "<p>company</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"firstName\": \"\",\n     \"lastName\": \"\",\n     \"customerId\": \"\",\n     \"zoneId\": \"\",\n     \"countryId\": \"\"\n     \"address1\" : \"\",\n     \"address2\" : \"\",\n     \"city\" : \"\",\n     \"state\" : \"\",\n     \"postcode\" : \"\",\n     \"countryId\" : \"\",\n     \"addressType\" : \"\",\n     \"company\" : \"\",\n     \"phoneNumber\": \"\",\n     \"isDefault\": \"\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully updated  customer address.\",\n     \"status\": \"1\"\n     \"data\": {\n             \"createdBy\": \"\",\n             \"createdDate\": \"\",\n             \"modifiedBy\": \"\",\n             \"modifiedDate\": \"\",\n             \"addressId\": ,\n             \"customerId\": ,\n             \"countryId\": ,\n             \"firstName\": \"\",\n             \"lastName\": \"\",\n             \"company\": \"\",\n             \"address1\": \"\",\n             \"address2\": \"\",\n             \"postcode\": \"\",\n             \"city\": \"\",\n             \"state\": \"\",\n             \"emailId\": ,\n             \"addressType\": ,\n             \"isActive\": ,\n             \"landmark\": \"\",\n             \"isDefault\":\"\"\n             }\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/customer-address/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Address error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/store/controllers/CustomerAddressController.ts",
    "groupTitle": "Customer_Address",
    "name": "PutApiCustomerAddressId"
  },
  {
    "type": "put",
    "url": "/api/customer-address/live/address",
    "title": "live Address API",
    "group": "Customer_Address",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "Authorized",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "requestBody": [
          {
            "group": "requestBody",
            "type": "string",
            "optional": false,
            "field": "customer",
            "description": "<p>customer</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n   \"customer\": {\n          \"data\": {\n           \"token\": \"\",\n             \"ip\": \"\"\n      }\n   }\n}\nHTTP/1.1 200 OK\n{\n   \"message\": \"Live Address Mapping Service Called...!\",\n    \"status\" : \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/customer-address/live/address"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "live Address error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/store/controllers/CustomerAddressController.ts",
    "groupTitle": "Customer_Address",
    "name": "PutApiCustomerAddressLiveAddress"
  },
  {
    "type": "put",
    "url": "/api/customer-address/update-default/:id",
    "title": "Update Customer Default Address API",
    "group": "Customer_Address",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "addressType",
            "description": "<p>addressType</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"addressType\": \"\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Default Adress updated Successfully\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/customer-address/update-default/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Address error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/store/controllers/CustomerAddressController.ts",
    "groupTitle": "Customer_Address",
    "name": "PutApiCustomerAddressUpdateDefaultId"
  },
  {
    "type": "put",
    "url": "/api/address/:id",
    "title": "Update Customer Address",
    "group": "Customer_Address",
    "name": "UpdateCustomerAddress",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Path": [
          {
            "group": "Path",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Address ID to update</p>"
          }
        ]
      }
    },
    "body": [
      {
        "group": "Body",
        "type": "Number",
        "optional": false,
        "field": "customerId",
        "description": "<p>Customer ID</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "firstName",
        "description": "<p>First name</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "lastName",
        "description": "<p>Last name</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "address1",
        "description": "<p>Primary address</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": true,
        "field": "address2",
        "description": "<p>Secondary address</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "city",
        "description": "<p>City</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": true,
        "field": "state",
        "description": "<p>State</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "postcode",
        "description": "<p>Postal code</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "addressType",
        "description": "<p>Address type (e.g., home, office)</p>"
      },
      {
        "group": "Body",
        "type": "Number",
        "optional": false,
        "field": "countryId",
        "description": "<p>Country ID</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": true,
        "field": "company",
        "description": "<p>Company name</p>"
      },
      {
        "group": "Body",
        "type": "Number",
        "optional": true,
        "field": "zoneId",
        "description": "<p>Zone ID</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "phoneNumber",
        "description": "<p>Contact phone number</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": true,
        "field": "landmark",
        "description": "<p>Landmark</p>"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Your address has been updated.\",\n    \"data\": {\n        \"addressId\": 12,\n        \"customerId\": 3,\n        \"firstName\": \"John\",\n        \"lastName\": \"Doe\",\n        \"address1\": \"123 Main St\",\n        \"address2\": \"\",\n        \"city\": \"New York\",\n        \"state\": \"NY\",\n        \"postcode\": \"10001\",\n        \"addressType\": \"home\",\n        \"countryId\": 1,\n        \"company\": null,\n        \"zoneId\": 0,\n        \"phoneNo\": \"5551234567\",\n        \"landmark\": \"Near Central Park\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Address-Not-Found:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"status\": 0,\n    \"message\": \"Unable to add address. Please try again.\"\n}",
          "type": "json"
        },
        {
          "title": "Update-Failed:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"status\": 0,\n    \"message\": \"Unable to update address. Please try again.\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/address/:id"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/AddressController.ts",
    "groupTitle": "Customer_Address"
  },
  {
    "type": "delete",
    "url": "/api/cart/delete-cart-item",
    "title": "Delete Cart items API",
    "group": "Customer_Cart",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "cartId",
            "description": "<p>Comma-separated cart item IDs to delete (omit to clear entire cart)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"cartId\": \"1,2,3\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n  \"message\": \"Removed from the cart\",\n  \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/cart/delete-cart-item"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "cartDelete error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/store/controllers/CustomerCartController.ts",
    "groupTitle": "Customer_Cart",
    "name": "DeleteApiCartDeleteCartItem"
  },
  {
    "type": "get",
    "url": "/api/cart",
    "title": "Customer Cart List API",
    "group": "Customer_Cart",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "Boolean",
            "optional": false,
            "field": "count",
            "description": "<p>count should be number or boolean</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully got the cart list.\",\n     \"data\": { \"cartList\": [], \"grandTotal\": 0 },\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/cart"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Customer Cart error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/store/controllers/CustomerCartController.ts",
    "groupTitle": "Customer_Cart",
    "name": "GetApiCart"
  },
  {
    "type": "post",
    "url": "/api/cart",
    "title": "Add to cart API",
    "group": "Customer_Cart",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Object[]",
            "optional": false,
            "field": "cartDetails",
            "description": "<p>cartDetails</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "cartDetails.productId",
            "description": "<p>productId</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": true,
            "field": "cartDetails.productPrice",
            "description": "<p>productPrice</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": true,
            "field": "cartDetails.tirePrice",
            "description": "<p>tirePrice</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "cartDetails.quantity",
            "description": "<p>quantity (min 1)</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "cartDetails.skuId",
            "description": "<p>skuId</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": true,
            "field": "cartDetails.type",
            "description": "<p>type ('new' to accumulate quantity)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"cartDetails\": [{\n         \"productId\": 1,\n         \"productPrice\": 100,\n         \"tirePrice\": 0,\n         \"quantity\": 1,\n         \"skuId\": 1,\n         \"type\": \"new\"\n     }]\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"status\": 1,\n     \"message\": \"Cart added successfully.\",\n     \"data\": [...]\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/cart"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Error",
          "content": "HTTP/1.1 400 Bad Request",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/store/controllers/CustomerCartController.ts",
    "groupTitle": "Customer_Cart",
    "name": "PostApiCart"
  },
  {
    "type": "post",
    "url": "/api/customer-contact",
    "title": "Create Customer Contact",
    "group": "Customer_Contact",
    "name": "CreateCustomerContact",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "body": [
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "firstName",
        "description": "<p>First name</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "lastName",
        "description": "<p>Last name</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "email",
        "description": "<p>Email address</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "phoneNumber",
        "description": "<p>Contact phone number</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": true,
        "field": "description",
        "description": "<p>Description</p>"
      },
      {
        "group": "Body",
        "type": "Number",
        "optional": true,
        "field": "customerId",
        "description": "<p>Customer ID</p>"
      },
      {
        "group": "Body",
        "type": "Number",
        "optional": false,
        "field": "isActive",
        "description": "<p>Active status (1: Active, 0: Inactive)</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "shippingAddress1",
        "description": "<p>Shipping address line 1</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": true,
        "field": "shippingAddress2",
        "description": "<p>Shipping address line 2</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": true,
        "field": "shippingCity",
        "description": "<p>Shipping city</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": true,
        "field": "shippingPostcode",
        "description": "<p>Shipping postal code</p>"
      },
      {
        "group": "Body",
        "type": "Number",
        "optional": true,
        "field": "shippingCountryId",
        "description": "<p>Shipping country ID</p>"
      },
      {
        "group": "Body",
        "type": "Number",
        "optional": true,
        "field": "shippingZoneId",
        "description": "<p>Shipping zone ID</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": true,
        "field": "shippingFirstName",
        "description": "<p>Shipping first name</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": true,
        "field": "shippingLastName",
        "description": "<p>Shipping last name</p>"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Contact created successfully\",\n    \"data\": {\n        \"id\": 1,\n        \"firstName\": \"John\",\n        \"lastName\": \"Doe\",\n        \"email\": \"john@example.com\",\n        \"phoneNumber\": \"1234567890\",\n        \"isActive\": 1\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Create-Failed:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"status\": 0,\n    \"message\": \"Unable to create contact\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/customer-contact"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/CustomerContactController.ts",
    "groupTitle": "Customer_Contact"
  },
  {
    "type": "get",
    "url": "/api/customer-contact",
    "title": "Customer Contact List",
    "group": "Customer_Contact",
    "name": "CustomerContactList",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "query": [
      {
        "group": "Query",
        "type": "Number",
        "optional": true,
        "field": "limit",
        "description": "<p>Number of records to return</p>"
      },
      {
        "group": "Query",
        "type": "Number",
        "optional": true,
        "field": "offset",
        "description": "<p>Pagination offset</p>"
      },
      {
        "group": "Query",
        "type": "String",
        "optional": true,
        "field": "name",
        "description": "<p>Customer name filter</p>"
      },
      {
        "group": "Query",
        "type": "String",
        "optional": true,
        "field": "keyword",
        "description": "<p>Search keyword</p>"
      },
      {
        "group": "Query",
        "type": "String",
        "optional": true,
        "field": "status",
        "description": "<p>Status filter</p>"
      },
      {
        "group": "Query",
        "type": "String",
        "optional": true,
        "field": "email",
        "description": "<p>Email filter</p>"
      },
      {
        "group": "Query",
        "type": "String",
        "optional": true,
        "field": "createdate",
        "description": "<p>Creation date filter</p>"
      },
      {
        "group": "Query",
        "type": "Number|Boolean",
        "optional": true,
        "field": "count",
        "description": "<p>If true/1, returns total count</p>"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Successfully got customer contact list\",\n    \"data\": [\n        {\n            \"id\": 1,\n            \"firstName\": \"John\",\n            \"lastName\": \"Doe\",\n            \"email\": \"john@example.com\",\n            \"phoneNumber\": \"1234567890\",\n            \"isActive\": 1\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/customer-contact"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/CustomerContactController.ts",
    "groupTitle": "Customer_Contact"
  },
  {
    "type": "delete",
    "url": "/api/customer-contact/:id",
    "title": "Delete Customer Contact",
    "group": "Customer_Contact",
    "name": "DeleteCustomerContact",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Path": [
          {
            "group": "Path",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Contact ID to delete</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Contact deleted successfully.\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Invalid-Contact:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"status\": 0,\n    \"message\": \"Invalid contact Id\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/customer-contact/:id"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/CustomerContactController.ts",
    "groupTitle": "Customer_Contact"
  },
  {
    "type": "get",
    "url": "/api/customer-contact/:id",
    "title": "Get Customer Contact Detail",
    "group": "Customer_Contact",
    "name": "GetCustomerContactDetail",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Path": [
          {
            "group": "Path",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Contact ID</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Successfully got contact details.\",\n    \"data\": {\n        \"id\": 1,\n        \"firstName\": \"John\",\n        \"lastName\": \"Doe\",\n        \"email\": \"john@example.com\",\n        \"phoneNumber\": \"1234567890\",\n        \"isActive\": 1\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Contact-Not-Found:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"status\": 0,\n    \"message\": \"Invalid contact id\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/customer-contact/:id"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/CustomerContactController.ts",
    "groupTitle": "Customer_Contact"
  },
  {
    "type": "put",
    "url": "/api/customer-contact/:id",
    "title": "Update Customer Contact",
    "group": "Customer_Contact",
    "name": "UpdateCustomerContact",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Path": [
          {
            "group": "Path",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Contact ID</p>"
          }
        ]
      }
    },
    "body": [
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "firstName",
        "description": "<p>First name</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "lastName",
        "description": "<p>Last name</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "email",
        "description": "<p>Email address</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "phoneNumber",
        "description": "<p>Contact phone number</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": true,
        "field": "description",
        "description": "<p>Description</p>"
      },
      {
        "group": "Body",
        "type": "Number",
        "optional": true,
        "field": "customerId",
        "description": "<p>Customer ID</p>"
      },
      {
        "group": "Body",
        "type": "Number",
        "optional": false,
        "field": "isActive",
        "description": "<p>Active status (1: Active, 0: Inactive)</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "shippingAddress1",
        "description": "<p>Shipping address line 1</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": true,
        "field": "shippingAddress2",
        "description": "<p>Shipping address line 2</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": true,
        "field": "shippingCity",
        "description": "<p>Shipping city</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": true,
        "field": "shippingPostcode",
        "description": "<p>Shipping postal code</p>"
      },
      {
        "group": "Body",
        "type": "Number",
        "optional": true,
        "field": "shippingCountryId",
        "description": "<p>Shipping country ID</p>"
      },
      {
        "group": "Body",
        "type": "Number",
        "optional": true,
        "field": "shippingZoneId",
        "description": "<p>Shipping zone ID</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": true,
        "field": "shippingFirstName",
        "description": "<p>Shipping first name</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": true,
        "field": "shippingLastName",
        "description": "<p>Shipping last name</p>"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Contact updated successfully\",\n    \"data\": {\n        \"id\": 1,\n        \"firstName\": \"John\",\n        \"lastName\": \"Doe\",\n        \"email\": \"john@example.com\",\n        \"phoneNumber\": \"1234567890\",\n        \"isActive\": 1\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Invalid-Contact:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"status\": 0,\n    \"message\": \"Invalid contact Id\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/customer-contact/:id"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/CustomerContactController.ts",
    "groupTitle": "Customer_Contact"
  },
  {
    "type": "get",
    "url": "/api/customer-permission-module",
    "title": "Permission for current customer user API",
    "group": "Customer_Permission_Module",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"status\": \"1\"\n     \"message\": \"Successfully got permission for user\",\n     \"data\":{\n        \"permission\": {},\n     }\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/customer-permission-module/permission-me"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "permission-module error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/store/controllers/CustomerPermissionModuleController.ts",
    "groupTitle": "Customer_Permission_Module",
    "name": "GetApiCustomerPermissionModule"
  },
  {
    "type": "get",
    "url": "/api/customer-user-profile",
    "title": "Get Customer User Profile API",
    "group": "Customer_Users",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully Get the Profile..!\",\n     \"status\": \"1\"\n     \"data\": {\n         \"userId\": \"\",\n         \"username\": \"\",\n         \"email\": \"\",\n         \"avatar\": \"\",\n         \"avatarPath\": \"\",\n         \"address\": \"\",\n         \"createdDate\": \"\",\n         \"firstName\": \"\",\n         \"lastName\": \"\",\n         \"deleteFlag\": \"\",\n         \"phoneNumber\": \"\",\n         \"isActive\": \"\",\n         \"code\": \"\",\n     }\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/customer-user-profile"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Get Customer Profile error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/store/controllers/CustomerUserProfileController.ts",
    "groupTitle": "Customer_Users",
    "name": "GetApiCustomerUserProfile"
  },
  {
    "type": "post",
    "url": "/api/vendor-email-template",
    "title": "Create Email Template",
    "group": "Email_Template",
    "name": "CreateVendorEmailTemplate",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "body": [
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "title",
        "description": "<p>Template title (max 30 characters)</p>"
      },
      {
        "group": "Body",
        "type": "Number",
        "optional": false,
        "field": "status",
        "description": "<p>Status (1: Active, 0: Inactive)</p>"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Successfully created new email template.\",\n    \"data\": {\n        \"emailTemplateId\": 1,\n        \"title\": \"Order Placed\",\n        \"isActive\": 1\n    }\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-email-template"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/EmailTemplateController.ts",
    "groupTitle": "Email_Template"
  },
  {
    "type": "delete",
    "url": "/api/vendor-email-template/:id",
    "title": "Delete Email Template",
    "group": "Email_Template",
    "name": "DeleteVendorEmailTemplate",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Path": [
          {
            "group": "Path",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Email Template ID to delete</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Successfully deleted email template.\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Invalid-Template:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"status\": 0,\n    \"message\": \"Invalid email template Id\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-email-template/:id"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/EmailTemplateController.ts",
    "groupTitle": "Email_Template"
  },
  {
    "type": "put",
    "url": "/api/vendor-email-template/:id",
    "title": "Update Email Template",
    "group": "Email_Template",
    "name": "UpdateVendorEmailTemplate",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Path": [
          {
            "group": "Path",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Email Template ID</p>"
          }
        ]
      }
    },
    "body": [
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "title",
        "description": "<p>Template title (max 30 characters)</p>"
      },
      {
        "group": "Body",
        "type": "Number",
        "optional": false,
        "field": "status",
        "description": "<p>Status (1: Active, 0: Inactive)</p>"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Successfully updated email template.\",\n    \"data\": {\n        \"emailTemplateId\": 1,\n        \"title\": \"Order Placed Updated\",\n        \"isActive\": 1\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Invalid-Template:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"status\": 0,\n    \"message\": \"Invalid email template Id\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-email-template/:id"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/EmailTemplateController.ts",
    "groupTitle": "Email_Template"
  },
  {
    "type": "get",
    "url": "/api/vendor-email-template",
    "title": "Email Template List",
    "group": "Email_Template",
    "name": "VendorEmailTemplateList",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "query": [
      {
        "group": "Query",
        "type": "Number",
        "optional": true,
        "field": "limit",
        "description": "<p>Number of records to return</p>"
      },
      {
        "group": "Query",
        "type": "Number",
        "optional": true,
        "field": "offset",
        "description": "<p>Pagination offset</p>"
      },
      {
        "group": "Query",
        "type": "String",
        "optional": true,
        "field": "keyword",
        "description": "<p>Search keyword</p>"
      },
      {
        "group": "Query",
        "type": "String",
        "optional": true,
        "field": "templateGroup",
        "description": "<p>Template group filter</p>"
      },
      {
        "group": "Query",
        "type": "Number|Boolean",
        "optional": true,
        "field": "count",
        "description": "<p>If true/1, returns total count</p>"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Successfully got email template list\",\n    \"data\": [\n        {\n            \"emailTemplateId\": 1,\n            \"title\": \"Order Placed\",\n            \"isActive\": 1\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-email-template"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/EmailTemplateController.ts",
    "groupTitle": "Email_Template"
  },
  {
    "type": "post",
    "url": "/api/family",
    "title": "Create Product Family",
    "group": "Family",
    "name": "CreateVendorFamily",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "body": [
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "familyName",
        "description": "<p>Family name</p>"
      },
      {
        "group": "Body",
        "type": "Number[]",
        "optional": true,
        "field": "categoryIds",
        "description": "<p>Array of category IDs to map</p>"
      },
      {
        "group": "Body",
        "type": "Number[]",
        "optional": true,
        "field": "deleteCategoryIds",
        "description": "<p>Array of category IDs to unmap</p>"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Successfully created new family.\",\n    \"data\": {\n        \"id\": 1,\n        \"name\": \"Electronics Family\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Duplicate-Family:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"status\": 0,\n    \"message\": \"Family Name already exists.\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/family"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/FamilyController.ts",
    "groupTitle": "Family"
  },
  {
    "type": "delete",
    "url": "/api/family/:id",
    "title": "Delete Product Family",
    "group": "Family",
    "name": "DeleteVendorFamily",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Path": [
          {
            "group": "Path",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Family ID to delete</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Successfully deleted family.\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Invalid-Family:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"status\": 0,\n    \"message\": \"Invalid family Id\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/family/:id"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/FamilyController.ts",
    "groupTitle": "Family"
  },
  {
    "type": "get",
    "url": "/api/family/category",
    "title": "Get Family Category Attributes List",
    "group": "Family",
    "name": "GetCategoryListFamily",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "query": [
      {
        "group": "Query",
        "type": "Number",
        "optional": true,
        "field": "limit",
        "description": "<p>Number of records to return</p>"
      },
      {
        "group": "Query",
        "type": "Number",
        "optional": true,
        "field": "offset",
        "description": "<p>Pagination offset</p>"
      },
      {
        "group": "Query",
        "type": "Number",
        "optional": true,
        "field": "status",
        "description": "<p>Status filter</p>"
      },
      {
        "group": "Query",
        "type": "String",
        "optional": true,
        "field": "keyword",
        "description": "<p>Search keyword</p>"
      },
      {
        "group": "Query",
        "type": "Number",
        "optional": true,
        "field": "familyId",
        "description": "<p>Family ID</p>"
      },
      {
        "group": "Query",
        "type": "Number",
        "optional": true,
        "field": "sortOrder",
        "description": "<p>Sort order</p>"
      },
      {
        "group": "Query",
        "type": "Number",
        "optional": true,
        "field": "count",
        "description": "<p>If true/1, returns total count</p>"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Successfully got category list\",\n    \"data\": []\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/family/category"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/FamilyController.ts",
    "groupTitle": "Family"
  },
  {
    "type": "get",
    "url": "/api/family/:id",
    "title": "Get Family Detail",
    "group": "Family",
    "name": "GetVendorFamilyDetail",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Path": [
          {
            "group": "Path",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Family ID</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Successfully got family details.\",\n    \"data\": {\n        \"id\": 1,\n        \"name\": \"Electronics Family\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Invalid-Family:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"status\": 0,\n    \"message\": \"Invalid family Id\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/family/:id"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/FamilyController.ts",
    "groupTitle": "Family"
  },
  {
    "type": "get",
    "url": "/api/family",
    "title": "Product Family List",
    "group": "Family",
    "name": "GetVendorFamilyList",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "query": [
      {
        "group": "Query",
        "type": "Number",
        "optional": true,
        "field": "limit",
        "description": "<p>Number of records to return</p>"
      },
      {
        "group": "Query",
        "type": "Number",
        "optional": true,
        "field": "offset",
        "description": "<p>Pagination offset</p>"
      },
      {
        "group": "Query",
        "type": "String",
        "optional": true,
        "field": "keyword",
        "description": "<p>Search keyword</p>"
      },
      {
        "group": "Query",
        "type": "Number",
        "optional": true,
        "field": "count",
        "description": "<p>If true/1, returns total count</p>"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Successfully got family list\",\n    \"data\": [\n        {\n            \"id\": 1,\n            \"name\": \"Electronics Family\"\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/family"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/FamilyController.ts",
    "groupTitle": "Family"
  },
  {
    "type": "put",
    "url": "/api/family/:id",
    "title": "Update Product Family",
    "group": "Family",
    "name": "UpdateVendorFamily",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Path": [
          {
            "group": "Path",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Family ID</p>"
          }
        ]
      }
    },
    "body": [
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "familyName",
        "description": "<p>Family name</p>"
      },
      {
        "group": "Body",
        "type": "Number[]",
        "optional": true,
        "field": "categoryIds",
        "description": "<p>Array of category IDs to map</p>"
      },
      {
        "group": "Body",
        "type": "Number[]",
        "optional": true,
        "field": "deleteCategoryIds",
        "description": "<p>Array of category IDs to unmap</p>"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Successfully updated family.\",\n    \"data\": {\n        \"id\": 1,\n        \"name\": \"Updated Family\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Invalid-Family:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"status\": 0,\n    \"message\": \"Invalid family Id\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/family/:id"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/FamilyController.ts",
    "groupTitle": "Family"
  },
  {
    "type": "post",
    "url": "/api/vendor-language",
    "title": "Map Vendor Languages",
    "group": "Language",
    "name": "MapVendorLanguage",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "body": [
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "languageIds",
        "description": "<p>Comma-separated language IDs</p>"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Successfully updated vendor languages.\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Invalid-Languages:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"status\": 0,\n    \"message\": \"Invalid vendor languages.\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-language"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/LanguageController.ts",
    "groupTitle": "Language"
  },
  {
    "type": "get",
    "url": "/api/vendor-language",
    "title": "Vendor Language List",
    "group": "Language",
    "name": "VendorLanguageList",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "query": [
      {
        "group": "Query",
        "type": "Number",
        "optional": true,
        "field": "limit",
        "description": "<p>Number of records to return</p>"
      },
      {
        "group": "Query",
        "type": "Number",
        "optional": true,
        "field": "offset",
        "description": "<p>Pagination offset</p>"
      },
      {
        "group": "Query",
        "type": "String",
        "optional": true,
        "field": "keyword",
        "description": "<p>Search keyword</p>"
      },
      {
        "group": "Query",
        "type": "String",
        "optional": true,
        "field": "status",
        "description": "<p>Filter by status</p>"
      },
      {
        "group": "Query",
        "type": "String",
        "optional": true,
        "field": "defaultLanguage",
        "description": "<p>Filter default language (1 or 0)</p>"
      },
      {
        "group": "Query",
        "type": "Number|Boolean",
        "optional": true,
        "field": "count",
        "description": "<p>If true/1, returns total count</p>"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Successfully got vendor language list\",\n    \"data\": [\n        {\n            \"languageId\": 1,\n            \"name\": \"English\",\n            \"code\": \"en\",\n            \"isActive\": 1\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-language"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/LanguageController.ts",
    "groupTitle": "Language"
  },
  {
    "type": "get",
    "url": "/api/orders/order-detail/:orderId",
    "title": "Get Order Detail API",
    "group": "Orders",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Path Param": [
          {
            "group": "Path Param",
            "type": "Number",
            "optional": false,
            "field": "orderId",
            "description": "<p>Order ID to retrieve details</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": 1,\n  \"message\": \"Successfully shown the order detail.\",\n  \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/orders/order-detail/:orderId"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Server Error",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"status\": 0,\n  \"message\": \"Something went wrong.\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/store/controllers/CustomerOrderController.ts",
    "groupTitle": "Orders",
    "name": "GetApiOrdersOrderDetailOrderid"
  },
  {
    "type": "get",
    "url": "/api/orders/order-list",
    "title": "Get Order List API",
    "group": "Orders",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Query Param": [
          {
            "group": "Query Param",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>Number of records to return</p>"
          },
          {
            "group": "Query Param",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>Number of records to skip</p>"
          },
          {
            "group": "Query Param",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>Keyword to search in order data</p>"
          },
          {
            "group": "Query Param",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>Flag to indicate if only count is needed (1 for count only)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": 1,\n  \"message\": \"Successfully shown the order list.\",\n  \"data\": []\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/orders/order-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Server Error",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"status\": 0,\n  \"message\": \"Something went wrong.\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/store/controllers/CustomerOrderController.ts",
    "groupTitle": "Orders",
    "name": "GetApiOrdersOrderList"
  },
  {
    "type": "post",
    "url": "/api/page",
    "title": "Create Page",
    "group": "Page",
    "name": "CreateVendorPage",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "body": [
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "title",
        "description": "<p>Page title (max 255 characters)</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "content",
        "description": "<p>Page content/HTML</p>"
      },
      {
        "group": "Body",
        "type": "Number",
        "optional": false,
        "field": "active",
        "description": "<p>Active status (1: Active, 0: Inactive)</p>"
      },
      {
        "group": "Body",
        "type": "Number",
        "optional": false,
        "field": "pageGroupId",
        "description": "<p>Page Group ID</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": true,
        "field": "pageSlug",
        "description": "<p>Page slug</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": true,
        "field": "metaTagTitle",
        "description": "<p>Meta tag title (max 70 chars)</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": true,
        "field": "metaTagContent",
        "description": "<p>Meta tag content (max 160 chars)</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": true,
        "field": "metaTagKeyword",
        "description": "<p>Meta tag keyword (max 255 chars)</p>"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Successfully created new page.\",\n    \"data\": {\n        \"pageId\": 1,\n        \"title\": \"About Us\",\n        \"pageGroupId\": 1,\n        \"isActive\": 1\n    }\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/page"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/PageController.ts",
    "groupTitle": "Page"
  },
  {
    "type": "delete",
    "url": "/api/page/:id",
    "title": "Delete Page",
    "group": "Page",
    "name": "DeleteVendorPage",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Path": [
          {
            "group": "Path",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Page ID to delete</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Successfully deleted page.\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Invalid-Page:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"status\": 0,\n    \"message\": \"Invalid page Id\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/page/:id"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/PageController.ts",
    "groupTitle": "Page"
  },
  {
    "type": "get",
    "url": "/api/page/:pageId",
    "title": "Get Page Detail",
    "group": "Page",
    "name": "GetVendorPageDetail",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Path": [
          {
            "group": "Path",
            "type": "Number",
            "optional": false,
            "field": "pageId",
            "description": "<p>Page ID</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Successfully got page details.\",\n    \"data\": {\n        \"pageId\": 1,\n        \"title\": \"About Us\",\n        \"content\": \"Page content...\",\n        \"isActive\": 1\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Invalid-Page:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"status\": 0,\n    \"message\": \"Invalid page Id\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/page/:pageId"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/PageController.ts",
    "groupTitle": "Page"
  },
  {
    "type": "put",
    "url": "/api/page/:id",
    "title": "Update Page",
    "group": "Page",
    "name": "UpdateVendorPage",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Path": [
          {
            "group": "Path",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Page ID</p>"
          }
        ]
      }
    },
    "body": [
      {
        "group": "Body",
        "type": "Number",
        "optional": false,
        "field": "pageId",
        "description": "<p>Page ID</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "title",
        "description": "<p>Page title</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "content",
        "description": "<p>Page content</p>"
      },
      {
        "group": "Body",
        "type": "Number",
        "optional": false,
        "field": "active",
        "description": "<p>Active status</p>"
      },
      {
        "group": "Body",
        "type": "Number",
        "optional": false,
        "field": "pageGroupId",
        "description": "<p>Page Group ID</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": true,
        "field": "pageSlug",
        "description": "<p>Page slug</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": true,
        "field": "metaTagTitle",
        "description": "<p>Meta tag title</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": true,
        "field": "metaTagContent",
        "description": "<p>Meta tag content</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": true,
        "field": "metaTagKeyword",
        "description": "<p>Meta tag keyword</p>"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Successfully updated page.\",\n    \"data\": {\n        \"pageId\": 1,\n        \"title\": \"About Us Updated\",\n        \"isActive\": 1\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Invalid-Page:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"status\": 0,\n    \"message\": \"Invalid page Id\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/page/:id"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/PageController.ts",
    "groupTitle": "Page"
  },
  {
    "type": "get",
    "url": "/api/page",
    "title": "Page List",
    "group": "Page",
    "name": "VendorPageList",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "query": [
      {
        "group": "Query",
        "type": "Number",
        "optional": true,
        "field": "limit",
        "description": "<p>Number of records to return</p>"
      },
      {
        "group": "Query",
        "type": "Number",
        "optional": true,
        "field": "offset",
        "description": "<p>Pagination offset</p>"
      },
      {
        "group": "Query",
        "type": "String",
        "optional": true,
        "field": "keyword",
        "description": "<p>Search keyword</p>"
      },
      {
        "group": "Query",
        "type": "String",
        "optional": true,
        "field": "status",
        "description": "<p>Status filter</p>"
      },
      {
        "group": "Query",
        "type": "Number|Boolean",
        "optional": true,
        "field": "count",
        "description": "<p>If true/1, returns total count</p>"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Successfully got page list.\",\n    \"data\": [\n        {\n            \"pageId\": 1,\n            \"title\": \"About Us\",\n            \"isActive\": 1\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/page"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/PageController.ts",
    "groupTitle": "Page"
  },
  {
    "type": "post",
    "url": "/api/page-group",
    "title": "Create Page Group",
    "group": "Page_Group",
    "name": "CreatePageGroup",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "body": [
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "groupName",
        "description": "<p>Page group name (max 255 characters)</p>"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Successfully created new page group.\",\n    \"data\": {\n        \"groupId\": 1,\n        \"groupName\": \"Company Information\",\n        \"isActive\": 1\n    }\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/page-group"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/PageGroupController.ts",
    "groupTitle": "Page_Group"
  },
  {
    "type": "delete",
    "url": "/api/page-group/:id",
    "title": "Delete Page Group",
    "group": "Page_Group",
    "name": "DeletePageGroup",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Path": [
          {
            "group": "Path",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Page Group ID to delete</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Successfully deleted page group.\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Invalid-Page-Group:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"status\": 0,\n    \"message\": \"Invalid page group Id\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/page-group/:id"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/PageGroupController.ts",
    "groupTitle": "Page_Group"
  },
  {
    "type": "get",
    "url": "/api/page-group/get-page-group/:id",
    "title": "Get Page Group Detail",
    "group": "Page_Group",
    "name": "GetPageGroupDetail",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Path": [
          {
            "group": "Path",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Page Group ID</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Successfully got page group details.\",\n    \"data\": {\n        \"groupId\": 1,\n        \"groupName\": \"Company Info\",\n        \"isActive\": 1\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Invalid-Page-Group:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"status\": 0,\n    \"message\": \"Invalid page group Id\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/page-group/get-page-group/:id"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/PageGroupController.ts",
    "groupTitle": "Page_Group"
  },
  {
    "type": "get",
    "url": "/api/page-group",
    "title": "Page Group List",
    "group": "Page_Group",
    "name": "PageGroupList",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "query": [
      {
        "group": "Query",
        "type": "Number",
        "optional": true,
        "field": "limit",
        "description": "<p>Number of records to return</p>"
      },
      {
        "group": "Query",
        "type": "Number",
        "optional": true,
        "field": "offset",
        "description": "<p>Pagination offset</p>"
      },
      {
        "group": "Query",
        "type": "String",
        "optional": true,
        "field": "status",
        "description": "<p>Status filter</p>"
      },
      {
        "group": "Query",
        "type": "String",
        "optional": true,
        "field": "keyword",
        "description": "<p>Search keyword</p>"
      },
      {
        "group": "Query",
        "type": "String",
        "optional": true,
        "field": "groupName",
        "description": "<p>Group name filter</p>"
      },
      {
        "group": "Query",
        "type": "Number|Boolean",
        "optional": true,
        "field": "count",
        "description": "<p>If true/1, returns total count</p>"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Successfully got page group list.\",\n    \"data\": [\n        {\n            \"groupId\": 1,\n            \"groupName\": \"Company Info\",\n            \"isActive\": 1\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/page-group"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/PageGroupController.ts",
    "groupTitle": "Page_Group"
  },
  {
    "type": "put",
    "url": "/api/page-group/:id",
    "title": "Update Page Group",
    "group": "Page_Group",
    "name": "UpdatePageGroup",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Path": [
          {
            "group": "Path",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Page Group ID</p>"
          }
        ]
      }
    },
    "body": [
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "groupName",
        "description": "<p>Updated page group name</p>"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Successfully updated page group.\",\n    \"data\": {\n        \"groupId\": 1,\n        \"groupName\": \"Company Info Updated\",\n        \"isActive\": 1\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Invalid-Page-Group:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"status\": 0,\n    \"message\": \"Invalid page group Id\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/page-group/:id"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/PageGroupController.ts",
    "groupTitle": "Page_Group"
  },
  {
    "type": "post",
    "url": "/api/vendor-page-seo/:pageId",
    "title": "Update Page SEO",
    "group": "Page_SEO",
    "name": "UpdatePageSeo",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Path": [
          {
            "group": "Path",
            "type": "Number",
            "optional": false,
            "field": "pageId",
            "description": "<p>Page ID</p>"
          }
        ]
      }
    },
    "body": [
      {
        "group": "Body",
        "type": "String",
        "optional": true,
        "field": "metaTagTitle",
        "description": "<p>Meta tag title (max 140 chars)</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": true,
        "field": "metaTagDescription",
        "description": "<p>Meta tag description (max 160 chars)</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": true,
        "field": "metaTagKeyword",
        "description": "<p>Meta tag keywords (max 255 chars)</p>"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"SEO Updated successfully\",\n    \"data\": {\n        \"id\": 1,\n        \"referenceId\": 1,\n        \"route\": \"page-details/about-us\",\n        \"metaTitle\": \"About Us\",\n        \"metaDescription\": \"Description\",\n        \"metaKeyword\": \"Keywords\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Invalid-Page:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"status\": 0,\n    \"message\": \"Invalid page. \"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-page-seo/:pageId"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/PageSeoController.ts",
    "groupTitle": "Page_SEO"
  },
  {
    "type": "get",
    "url": "/api/vendor-page-seo",
    "title": "Page SEO List",
    "group": "Page_SEO",
    "name": "VendorPageSeoList",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "query": [
      {
        "group": "Query",
        "type": "Number",
        "optional": true,
        "field": "limit",
        "description": "<p>Number of records to return</p>"
      },
      {
        "group": "Query",
        "type": "Number",
        "optional": true,
        "field": "offset",
        "description": "<p>Pagination offset</p>"
      },
      {
        "group": "Query",
        "type": "String",
        "optional": true,
        "field": "keyword",
        "description": "<p>Search keyword</p>"
      },
      {
        "group": "Query",
        "type": "String",
        "optional": true,
        "field": "status",
        "description": "<p>Status filter</p>"
      },
      {
        "group": "Query",
        "type": "Number|Boolean",
        "optional": true,
        "field": "count",
        "description": "<p>If true/1, returns total count</p>"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Successfully got page list.\",\n    \"data\": [\n        {\n            \"pageId\": 1,\n            \"title\": \"About Us\",\n            \"isActive\": 1\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-page-seo"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/PageSeoController.ts",
    "groupTitle": "Page_SEO"
  },
  {
    "type": "get",
    "url": "/api/vendor-page-seo/:groupId",
    "title": "Page SEO List by Group ID",
    "group": "Page_SEO",
    "name": "VendorPageSeoListByGroupId",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Path": [
          {
            "group": "Path",
            "type": "Number",
            "optional": false,
            "field": "groupId",
            "description": "<p>Page Group ID</p>"
          }
        ]
      }
    },
    "query": [
      {
        "group": "Query",
        "type": "Number",
        "optional": true,
        "field": "limit",
        "description": "<p>Number of records to return</p>"
      },
      {
        "group": "Query",
        "type": "Number",
        "optional": true,
        "field": "offset",
        "description": "<p>Pagination offset</p>"
      },
      {
        "group": "Query",
        "type": "String",
        "optional": true,
        "field": "keyword",
        "description": "<p>Search keyword</p>"
      },
      {
        "group": "Query",
        "type": "String",
        "optional": true,
        "field": "status",
        "description": "<p>Status filter</p>"
      },
      {
        "group": "Query",
        "type": "Number|Boolean",
        "optional": true,
        "field": "count",
        "description": "<p>If true/1, returns total count</p>"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Successfully got page list.\",\n    \"data\": [\n        {\n            \"pageId\": 1,\n            \"title\": \"About Us\",\n            \"pageGroupId\": 1,\n            \"isActive\": 1\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-page-seo/:groupId"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/PageSeoController.ts",
    "groupTitle": "Page_SEO"
  },
  {
    "type": "get",
    "url": "/api/customer-permission-module",
    "title": "Permission Module List API",
    "group": "Permission_Module",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>count should be number or boolean</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"status\": \"1\",\n     \"message\": \"Successfully get page list\",\n     \"data\": [\n         {\n             \"id\": 61,\n             \"name\": \"Settings Delivery Location\",\n             \"slugName\": \"settings-delivery-location\",\n             \"sortOrder\": 1,\n             \"customerPermissionModule\": [\n               {\n                 \"id\": 210,\n                 \"name\": \"Add Delivery Location\",\n                 \"slugName\": \"add-delivery-location\",\n                 \"moduleGroupId\": 61\n               }\n             ]\n         }\n     ],\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/customer-permission-module"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Page error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/store/controllers/CustomerPermissionModuleController.ts",
    "groupTitle": "Permission_Module",
    "name": "GetApiCustomerPermissionModule"
  },
  {
    "type": "get",
    "url": "/api/customer-permission-module/group/:id/permission",
    "title": "Get Permission API",
    "group": "Permission_Module",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "refType",
            "description": "<p>1-&gt;role 2-&gt;user</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "refId",
            "description": "<p>refId roleId | userId</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully got permission data\",\n     \"data\":{\n     \"pageId\" : \"\",\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/customer-permission-module/group/:id/permission"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "permission-module error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/store/controllers/CustomerPermissionModuleController.ts",
    "groupTitle": "Permission_Module",
    "name": "GetApiCustomerPermissionModuleGroupIdPermission"
  },
  {
    "type": "put",
    "url": "/api/customer-permission-module/group/:id",
    "title": "Add Permission API",
    "group": "Permission_Module",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "permission",
            "description": "<p>stringified data</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully added permission\",\n     \"data\":{\n     \"pageId\" : \"\",\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/customer-permission-module/group/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "permission-module error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/store/controllers/CustomerPermissionModuleController.ts",
    "groupTitle": "Permission_Module",
    "name": "PutApiCustomerPermissionModuleGroupId"
  },
  {
    "type": "Delete",
    "url": "/api/vendor-product-variant/:id",
    "title": "Delete Product Varient  API",
    "group": "Product",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully Deleted Product Variant..!\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-product-variant/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "DeleteProductVarient error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/VendorProductVariantController.ts",
    "groupTitle": "Product",
    "name": "DeleteApiVendorProductVariantId"
  },
  {
    "type": "Delete",
    "url": "/api/vendor-product-variant/variant-option/:id",
    "title": "Delete Product Varient Option API",
    "group": "Product",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully deleted.\",\n     \"status\": \"1\",\n     \"data\": {\n        }\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-product-variant/variant-option/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "DeleteProductVarientOption error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/VendorProductVariantController.ts",
    "groupTitle": "Product",
    "name": "DeleteApiVendorProductVariantVariantOptionId"
  },
  {
    "type": "get",
    "url": "/api/store-product-attributes",
    "title": "Product Specification API",
    "group": "Product",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n   \"status\": 1,\n   \"message\": \"Successfully Got Specification List...!\",\n   \"data\": {\n      \"createdBy\": 1,\n      \"createdDate\": \"\",\n      \"modifiedBy\": 1,\n      \"modifiedDate\": \"\",\n      \"id\": 1,\n      \"name\": \"\",\n      \"slug\": \"\",\n      \"isActive\": 1,\n      \"isDelete\": 1,\n      \"attributeGroups\": [\n          {\n              \"createdBy\": 1,\n              \"createdDate\": \"\",\n              \"modifiedBy\": 1,\n              \"modifiedDate\": \"\",\n              \"id\": 1,\n              \"name\": \"\",\n              \"sortOrder\": \"\",\n              \"isActive\": 1,\n              \"isDelete\": 0,\n              \"attributes\": [\n                  {\n                      \"createdBy\": 1,\n                      \"createdDate\": \"\",\n                      \"modifiedBy\": 1,\n                      \"modifiedDate\": \"\",\n                      \"id\": 1,\n                      \"name\": \"\",\n                      \"type\": \"\",\n                      \"sortOrder\": 1,\n                      \"isMandatory\": 1,\n                      \"description\": \"\",\n                      \"label\": \"\",\n                      \"useAsFilter\": \"\",\n                      \"sectionName\": \"\",\n                      \"defaultValue\": 1,\n                      \"isActive\": 1,\n                      \"isDelete\": 0,\n                      \"attributeValues\": [\n                          {\n                              \"createdBy\": 1,\n                              \"createdDate\": \"\",\n                              \"modifiedBy\": 1,\n                              \"modifiedDate\": \"\",\n                              \"id\": 1,\n                              \"attributeId\": 1,\n                              \"value\": \"\",\n                              \"isActive\": 1,\n                              \"isDelete\": 0\n                 }\n             ]\n          }\n       ]\n    }\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/store-product-attributes"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Product error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/store/controllers/ProductAttributeController.ts",
    "groupTitle": "Product",
    "name": "GetApiStoreProductAttributes"
  },
  {
    "type": "get",
    "url": "/api/store-product-attributes/product/:productSlug",
    "title": "Product Attributes Product Detail API",
    "group": "Product",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n   \"status\": 1,\n   \"message\": \"Successfully Got product Detail...!\",\n   \"data\": [\n       {\n           \"specificationId\": 1,\n           \"specificationName\": \"\",\n           \"attributeGroups\": [\n               {\n                   \"id\": 1,\n                   \"attributes\": [\n                       {\n                           \"attributeId\": 1,\n                           \"attributeName\": \"\",\n                           \"attributeValues\": [\n                               {\n                                   \"createdBy\": 1,\n                                   \"createdDate\": \"\",\n                                   \"modifiedBy\": 1,\n                                   \"modifiedDate\": \"\",\n                                   \"id\": 1,\n                                   \"attributeId\": 1,\n                                   \"value\": \"\",\n                                   \"isActive\": 1,\n                                   \"isDelete\": 1,\n                                   \"valueTrans\": \"\"\n                               }\n                           ],\n                           \"attributeNameTrans\": \"\"\n                       }\n                   ]\n               }\n           ],\n           \"specificationNameTrans\": \"\"\n       }\n   ]\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/store-product-attributes/product/:productSlug"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "productDetail error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/store/controllers/ProductAttributeController.ts",
    "groupTitle": "Product",
    "name": "GetApiStoreProductAttributesProductProductslug"
  },
  {
    "type": "Get",
    "url": "/api/store-product-variant/product/:productSlug",
    "title": "Product Variants Product Detail API",
    "group": "Product",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"status\": 1\n     \"message\": \"Successfully get product Detail\",\n     \"data\": {\n       \"productId\": 1,\n       \"productSlug\": \"\",\n       \"productImage\": [\n         {\n           \"productId\": 1,\n           \"image\": \"\",\n           \"containerName\": \"\",\n           \"defaultImage\": \"\"\n         }\n       ],\n       \"productOriginalImage\": [\n         {\n           \"productId\": 1,\n           \"image\": \"\",\n           \"containerName\": \"\",\n           \"defaultImage\": \"\"\n         }\n       ],\n       \"selectedVariant\": {\n         \"1\": \"\",\n         \"2\": \"\"\n       },\n       \"productVarientOption\": [\n         {\n           \"id\": 1,\n           \"productVarientOptionId\": 1,\n           \"variantValueId\": 1,\n           \"value\": \"\"\n         },\n       ],\n       \"productVarient\": [\n         {\n           \"id\": 1,\n           \"variantId\": 1,\n           \"productId\": ,\n           \"variantNameTrans\": \"\",\n           \"variantValue\": [\n             {\n               \"id\": 1,\n               \"value\": \"\",\n               \"valueTrans\": \"\"\n             }\n           ]\n         }\n       ],\n       \"productvarientList\": [\n         {\n           \"id\": 1,\n           \"productId\": 1,\n           \"skuId\": 1,\n           \"varientName\": \"\",\n           \"isActive\": 1,\n           \"createdDate\": \"\",\n           \"skuName\": \"\",\n           \"price\": 1,\n           \"quantity\": 1,\n           \"optionImage\": [\n             {\n               \"id\": 1,\n               \"image\": \"\",\n               \"containerName\": \"\",\n               \"defaultImage\": \"\"\n             }\n           ],\n           \"discountPrice\": [\n             {\n               \"discountPrice\": 1,\n               \"startDate\": \"\",\n               \"endDate\": \"\"\n             }\n           ],\n           \"specialPrice\": [\n             {\n               \"specialPrice\": \"\",\n               \"startDate\": \"\",\n               \"endDate\": \"\"\n             }\n           ],\n           \"stockStatus\": 1\n         }\n       ]\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/store-product-variant/product/:productSlug"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "productDetail error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/store/controllers/ProductVariantsController.ts",
    "groupTitle": "Product",
    "name": "GetApiStoreProductVariantProductProductslug"
  },
  {
    "type": "Get",
    "url": "/api/vendor-product-rating/:ratingId",
    "title": "Get product Rating API",
    "group": "Product",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "ratingId",
            "description": "<p>ratingId</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>count in number</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"successfully got the product rating\",\n     \"data\": [{\n     \"ratingId\": 1,\n     \"review\": \"\",\n     \"rating\": \"\",\n     \"createdDate\": \"\",\n     \"firstName\": \"\",\n     \"lastName\": \"\",\n     \"productId\": 1,\n     \"customerId\": 1,\n     \"orderProductId\": 1,\n     \"productRatingImages\":\"\"\n     \"isActive\": 1,\n       }]\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-product-rating/:ratingId"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "GetProductRating error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/VendorRatingController.ts",
    "groupTitle": "Product",
    "name": "GetApiVendorProductRatingRatingid"
  },
  {
    "type": "Get",
    "url": "/api/vendor-product-rating/:skuId",
    "title": "Get product Rating API",
    "group": "Product",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "skuId",
            "description": "<p>skuId</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>count in number</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"successfully got the product rating\",\n     \"data\": [{\n     \"ratingId\": 1,\n     \"review\": \"\",\n     \"rating\": \"\",\n     \"createdDate\": \"\",\n     \"firstName\": \"\",\n     \"lastName\": \"\",\n     \"productId\": 1,\n     \"customerId\": 1,\n     \"orderProductId\": 1,\n     \"isActive\": 1,\n       }]\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-product-rating/:skuId"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "GetProductRating error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/VendorRatingController.ts",
    "groupTitle": "Product",
    "name": "GetApiVendorProductRatingSkuid"
  },
  {
    "type": "Get",
    "url": "/api/vendor-product-variant",
    "title": "Vendor Product Variant Product List API",
    "group": "Product",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>keyword</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "productName",
            "description": "<p>productName</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "sku",
            "description": "<p>search by sku</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>status</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "price",
            "defaultValue": "1/2",
            "description": "<p>if 1-&gt; asc 2-&gt; desc</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>count in number or boolean</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"status\": \"1\"\n     \"message\": \"Successfully get vendor product list\",\n     \"data\":{\n     \"productId\" : 1,\n     \"sku\" : \"\",\n     \"name\" : \"\",\n     \"quantity\" : 1,\n     \"price\" : 1,\n     \"isFeatured\" : 1,\n     \"todayDeals\" : \"\",\n     \"productSlug\" : \"\",\n     \"isActive\" : 1,\n     \"image\" : \"\",\n     \"containerName\" : \"\",\n     \"defaultImage\" : \"\",\n     \"skuId\" : 1,\n     \"sku\" : \"\",\n     \"price\" : 1,\n     \"modifiedPrice\" : \"\",\n     \"productDiscount\" : 1,\n     \"productSpecial\" : \"\",\n     }\n}\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-product-variant"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "vendorProductList error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/VendorProductVariantController.ts",
    "groupTitle": "Product",
    "name": "GetApiVendorProductVariant"
  },
  {
    "type": "Get",
    "url": "/api/vendor-product-variant/inventory",
    "title": "Vendor Product Variant Inventory List API",
    "group": "Product",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>keyword</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "productName",
            "description": "<p>productName</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "sku",
            "description": "<p>sku</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>status</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "price",
            "defaultValue": "1/2",
            "description": "<p>if 1-&gt;asc 2-&gt;desc</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>count in number or boolean</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"status\": \"1\"\n     \"message\": \"Successfully got Vendor Product list\",\n     \"data\":{\n     \"vendorProductId\" : 1,\n     \"approvalFlag\" : 1,\n     \"vendorId\" : 1,\n     \"pincodeBasedDelivery\" : \"\",\n     \"name\" : \"\",\n     \"sku\" : \"\",\n     \"productprice\" : \"\",\n     \"quantity\" : 1,\n     \"sortOrder\" : \"\",\n     \"isActive\" : 1,\n     \"productSlug\" : \"\",\n     \"hasStock\" : \"\",\n     \"hasTirePrice\" : \"\",\n     \"outOfStockThreshold\" : \"\",\n     \"notifyMinQuantity\" : 1,\n     \"minQuantityAllowedCart\" : 1,\n     \"maxQuantityAllowedCart\" : 1,\n     \"enableBackOrders\" : \"\",\n     \"modifiedDate\" : \"\",\n     \"isSimplified\" : 1,\n     \"skuId\" : 1,\n     \"createdDate\": \"\",\n     \"keywords\" : \"\",\n     \"attributeKeyword\" : \"\",\n     }\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-product-variant/inventory"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "inventoryVendorProductList error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/VendorProductVariantController.ts",
    "groupTitle": "Product",
    "name": "GetApiVendorProductVariantInventory"
  },
  {
    "type": "Get",
    "url": "/api/vendor-product-variant/product/:id",
    "title": "Vendor Product Variants Product Detail API",
    "group": "Product",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"status\": \"1\"\n     \"message\": \"Successfully get product Detail\",\n     \"data\": {\n      \"productId\": 1,\n      \"name\": \"\",\n      \"description\": \"\",\n      \"price\": 1,\n      \"productImage\": [\n          {\n              \"productId\": 1,\n              \"image\": \"\",\n              \"containerName\": \"\",\n              \"defaultImage\": \"\"\n          }\n    ]\n      \"productVariants\": [\n          {\n              \"id\": 1,\n              \"variantId\": 1,\n              \"productId\": 1\n          }\n      ],\n      \"productVariantList\": [\n          {\n              \"id\": 1,\n              \"productId\": 1,\n              \"skuId\": 1,\n              \"varientName\": \"\",\n              \"isActive\": 1,\n              \"createdDate\": \"\",\n              \"skuName\": \"\",\n              \"price\": 1,\n              \"quantity\": 1,\n              \"isActive\": 1,\n              \"outOfStockThreshold\": \"\",\n              \"notifyMinQuantity\": 1,\n              \"minQuantityAllowedCart\": \"\",\n              \"maxQuantityAllowedCart\": \"\",\n              \"enableBackOrders\": \"\",\n              \"vendorId\": 1,\n              \"optionImage\": [\n                  {\n                      \"id\": 1,\n                      \"image\": \"\",\n                      \"containerName\": \"\",\n                      \"defaultImage\": \"\",\n                      \"productVarientOptionId\": 1\n                  }\n              ],\n              \"productVarientOptionDetails\": [\n                  {\n                      \"id\": 1,\n                      \"productVarientOptionId\": 1,\n                      \"variantValueId\": 1,\n                      \"productVariantId\": 1,\n                      \"value\": \"\"\n                  }\n              ],\n              \"discountPrice\": [\n                  {\n                      \"skuId\": 1,\n                      \"discount\": 1\n                  }\n              ],\n              \"specialPrice\": [\n                  {\n                      \"skuId\": 1,\n                      \"specialPrice\": \"\"\n                  }\n              ]\n          }\n      ]\n     }\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-product-variant/product/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "productDetail error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/VendorProductVariantController.ts",
    "groupTitle": "Product",
    "name": "GetApiVendorProductVariantProductId"
  },
  {
    "type": "Post",
    "url": "/api/vendor-product-variant",
    "title": "Vendor Product Variants Update Product API",
    "group": "Product",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "productId",
            "description": "<p>productId</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": true,
            "field": "productVarient",
            "description": "<p>productVarient</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": true,
            "field": "productVarientOption",
            "description": "<p>productVarientOption</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"productVarient\" : [],\n     \"productVarientOption\" : [{\n     \"id\":1\n     \"varientName\":\"\"\n     \"price\":\"\",\n     \"sku\":\"\",\n     \"quantity\":1\n     \"optionValue\":[],\n     \"optionImage\":[{\n     \"image\":\"\",\n     \"containerName\": \"\",\n     \"defaultImage\": \"\",\n     \"sortOrder\": 1,\n      }]\n      }]\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Product variant updated successfully.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-product-variant"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "updateProduct error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/VendorProductVariantController.ts",
    "groupTitle": "Product",
    "name": "PostApiVendorProductVariant"
  },
  {
    "type": "Put",
    "url": "/api/vendor-product-variant/stock",
    "title": "Update Stock API",
    "group": "Product",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "number",
            "optional": false,
            "field": "productId",
            "description": "<p>productId</p>"
          },
          {
            "group": "Request body",
            "type": "number",
            "optional": true,
            "field": "hasStock",
            "description": "<p>send 0 or 1</p>"
          },
          {
            "group": "Request body",
            "type": "object",
            "optional": true,
            "field": "productStock",
            "description": ""
          },
          {
            "group": "Request body",
            "type": "number",
            "optional": false,
            "field": "productStock.skuId",
            "description": "<p>skuId</p>"
          },
          {
            "group": "Request body",
            "type": "number",
            "optional": false,
            "field": "productStock.outOfStockThreshold",
            "description": "<p>for setting out of stock threshold</p>"
          },
          {
            "group": "Request body",
            "type": "number",
            "optional": false,
            "field": "productStock.notifyMinQuantity",
            "description": "<p>notifyMinQuantity</p>"
          },
          {
            "group": "Request body",
            "type": "number",
            "optional": false,
            "field": "productStock.minQuantityAllowedCart",
            "description": "<p>minQuantityAllowedCart</p>"
          },
          {
            "group": "Request body",
            "type": "number",
            "optional": false,
            "field": "productStock.maxQuantityAllowedCart",
            "description": "<p>maxQuantityAllowedCart</p>"
          },
          {
            "group": "Request body",
            "type": "number",
            "optional": false,
            "field": "productStock.enableBackOrders",
            "description": "<p>enableBackOrders</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"hasStock\" : \"\",\n     \"productId\" : 1,\n     \"productStock\": [{\n     \"skuId\" : 1,\n     \"outOfStockThreshold\" : \"\",\n     \"notifyMinQuantity\" : 1,\n     \"minQuantityAllowedCart\" : 1,\n     \"maxQuantityAllowedCart\" : 1,\n     \"enableBackOrders\" : \"\",\n     }]\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"successfully updated stock \",\n     \"data\": {\n      \"productId\": 1,\n      \"name\": \"\",\n      \"description\": \"\",\n      \"price\": \"\",\n      \"productImage\": [\n          {\n              \"productId\": 1,\n              \"image\": \"\",\n              \"containerName\": \"\",\n              \"defaultImage\": \"\"\n          }\n    ]\n      \"productVariants\": [\n          {\n              \"id\": 1,\n              \"variantId\": 1,\n              \"productId\": 1\n          }\n      ],\n      \"productVariantList\": [\n          {\n              \"id\": 1,\n              \"productId\": 1,\n              \"skuId\": 1,\n              \"varientName\": \"\",\n              \"isActive\": 1,\n              \"createdDate\": \"\",\n              \"skuName\": \"\",\n              \"price\": 1,\n              \"quantity\": 1,\n              \"isActive\": 1,\n              \"outOfStockThreshold\": \"\",\n              \"notifyMinQuantity\": 1,\n              \"minQuantityAllowedCart\": 1,\n              \"maxQuantityAllowedCart\": 1,\n              \"enableBackOrders\": \"\",\n              \"vendorId\": 1,\n              \"optionImage\": [\n                  {\n                      \"id\": 1,\n                      \"image\": \"\",\n                      \"containerName\": \"\",\n                      \"defaultImage\": \"\",\n                      \"productVarientOptionId\": 1\n                  }\n              ],\n              \"productVarientOptionDetails\": [\n                  {\n                      \"id\": \"1,\n                      \"productVarientOptionId\": 1,\n                      \"variantValueId\": 1,\n                      \"productVariantId\": 1,\n                      \"value\": \"\"\n                  }\n              ],\n              \"discountPrice\": [\n                  {\n                      \"skuId\": 1,\n                      \"discount\": 1\n                  }\n              ],\n              \"specialPrice\": [\n                  {\n                      \"skuId\": 1,\n                      \"specialPrice\": \"\"\n                  }\n              ]\n          }\n      ]\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-product-variant/stock"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "stock error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/VendorProductVariantController.ts",
    "groupTitle": "Product",
    "name": "PutApiVendorProductVariantStock"
  },
  {
    "type": "get",
    "url": "/api/media/image-resize",
    "title": "Resize Image On The Fly",
    "group": "Resize-Image",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "width",
            "description": "<p>width</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "height",
            "description": "<p>height</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>name</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "path",
            "description": "<p>path</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n  \"message\": \"Successfully resize image\",\n  \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/media/image-resize"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "media error",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"message\": \"Unable to resize the image\",\n    \"status\": 0,\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/core/controllers/MediaController.ts",
    "groupTitle": "Resize-Image",
    "name": "GetApiMediaImageResize"
  },
  {
    "type": "get",
    "url": "/api/media/plugin",
    "title": "Resize Image On The Fly",
    "group": "Resize-Image",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "width",
            "description": "<p>width</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "height",
            "description": "<p>height</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>name</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "path",
            "description": "<p>path</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n  \"message\": \"Successfully resize image\",\n  \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/media/plugin"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "media error",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"message\": \"Unable to resize the image\",\n    \"status\": 0,\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/core/controllers/MediaController.ts",
    "groupTitle": "Resize-Image",
    "name": "GetApiMediaPlugin"
  },
  {
    "type": "get",
    "url": "/api/media/get-settings",
    "title": "Get Setting common API",
    "group": "Settings",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"status\": \"1\"\n     \"message\": \"Successfully get settings\",\n     \"data\":\"{}\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/media/get-settings"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "getSettings error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/core/controllers/MediaController.ts",
    "groupTitle": "Settings",
    "name": "GetApiMediaGetSettings"
  },
  {
    "type": "get",
    "url": "/api/vendor-store/store-setting",
    "title": "Get Setting API",
    "group": "Settings",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get settings\",\n     \"data\":\"{\n      \"id\": \"\",\n      \"currencyCode\": \"\",\n      \"symbolLeft\": \"\",\n      \"symbolRight\": \"\",\n      }\"\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-store/store-setting"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "getSettings error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/store/controllers/VendorController.ts",
    "groupTitle": "Settings",
    "name": "GetApiVendorStoreStoreSetting"
  },
  {
    "type": "delete",
    "url": "/api/site-filter/delete-site-filter/:id",
    "title": "Delete Site Filter API",
    "group": "Site_Filter",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully deleted filter.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/site-filter/delete-site-filter/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "SiteFilter error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/SiteFilterController.ts",
    "groupTitle": "Site_Filter",
    "name": "DeleteApiSiteFilterDeleteSiteFilterId"
  },
  {
    "type": "get",
    "url": "/api/site-filter/filter-detail/:id",
    "title": "Filter Detail API",
    "group": "Site_Filter",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully got filter detail\",\n     \"data\": \"{\n              \"createdBy\": null,\n              \"createdDate\": \"2024-07-20T06:23:11.000Z\",\n              \"modifiedBy\": null,\n              \"modifiedDate\": \"2024-07-20T06:23:11.000Z\",\n              \"id\": 32,\n              \"filterName\": \"Dresss\",\n              \"isActive\": null,\n              \"siteFilterCategory\": [\n                {\n                  \"createdBy\": null,\n                  \"createdDate\": \"2024-07-09T13:42:21.000Z\",\n                  \"modifiedBy\": null,\n                  \"modifiedDate\": \"2024-07-22T06:01:36.000Z\",\n                  \"categoryId\": 1304,\n                  \"name\": \"Dresses\",\n                  \"image\": null,\n                  \"imagePath\": null,\n                  \"parentInt\": 0,\n                  \"sortOrder\": 1,\n                  \"categorySlug\": \"dresses4511\",\n                  \"isActive\": \"1\",\n                  \"categoryDescription\": \"\",\n                  \"levels\": \"Dresses\"\n                }\n              ],\n              \"siteFiltersection\": [\n                {\n                  \"id\": 321,\n                  \"filterId\": 32,\n                  \"sectionId\": null,\n                  \"sectionName\": \"Material\",\n                  \"sectionType\": 2,\n                  \"sectionSlug\": \"material\",\n                  \"sequence\": null,\n                  \"sectionItem\": [\n                    {\n                      \"id\": 923,\n                      \"filterSectionId\": 321,\n                      \"itemName\": \"leather\",\n                      \"itemSlug\": \"leather\"\n                    },\"\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/site-filter/filter-detail/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "filter Detail error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/SiteFilterController.ts",
    "groupTitle": "Site_Filter",
    "name": "GetApiSiteFilterFilterDetailId"
  },
  {
    "type": "get",
    "url": "/api/site-filter/site-filter-list",
    "title": "Site Filter List",
    "group": "Site_Filter",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "count",
            "description": "<p>count in number or boolean</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get site filter list\",\n     \"data\":\"[{\n               \"id\": \"\",\n               \"filterName\": \"\",\n               \"category\": \"\",\n               \"varient\": [],\n               \"attribute\": []\"\n             }]\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/site-filter/site-filter-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Site filter error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/SiteFilterController.ts",
    "groupTitle": "Site_Filter",
    "name": "GetApiSiteFilterSiteFilterList"
  },
  {
    "type": "post",
    "url": "/api/site-filter/create-site-filter",
    "title": "Create site filter API",
    "group": "Site_Filter",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "filterName",
            "description": "<p>filterName</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "categoryId",
            "description": "<p>categoryId</p>"
          },
          {
            "group": "Request body",
            "type": "Object",
            "optional": false,
            "field": "section",
            "description": "<p>section</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "seection.sectionId",
            "description": "<p>sectionId</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "seection.sectionName",
            "description": "<p>sectionName</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "section.sectionType",
            "description": "<p>sectionType</p>"
          },
          {
            "group": "Request body",
            "type": "Array",
            "optional": false,
            "field": "section.sectionItem",
            "description": "<p>sectionItem</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"filterName\" : \"\",\n     \"categoryId\" : \"\",\n     \"section\" : [{\n         \"sectionId\": \"\",\n         \"sectionName\": \"\",\n         \"sectionType\":\"\",\n         \"sectionItem\":\"\"\n}],\n}",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"New filter is created successfully\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/site-filter/create-site-filter"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "site filter error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/SiteFilterController.ts",
    "groupTitle": "Site_Filter",
    "name": "PostApiSiteFilterCreateSiteFilter"
  },
  {
    "type": "put",
    "url": "/api/site-filter/update-site-filter/:id",
    "title": "Update site filter API",
    "group": "Site_Filter",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "filterName",
            "description": "<p>filterName</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "categoryId",
            "description": "<p>categoryId</p>"
          },
          {
            "group": "Request body",
            "type": "Object",
            "optional": false,
            "field": "section",
            "description": "<p>section</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "section.sectionId",
            "description": "<p>sectionId</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "section.sectionName",
            "description": "<p>sectionName</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "section.sectionType",
            "description": "<p>sectionType 1-&gt; varient 2-&gt; attribute</p>"
          },
          {
            "group": "Request body",
            "type": "Array",
            "optional": false,
            "field": "section.sectionItem",
            "description": "<p>sectionItem</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"filterName\" : \"\",\n     \"categoryId\" : \"\",\n     \"section\" : [{\n         \"sectionId\": \"\",\n         \"sectionName\": \"\",\n         \"sectionType\":\"\",\n         \"sectionItem\":\"\"\n}],",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully updated site filter.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/site-filter/update-site-filter/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Site filter error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/SiteFilterController.ts",
    "groupTitle": "Site_Filter",
    "name": "PutApiSiteFilterUpdateSiteFilterId"
  },
  {
    "type": "get",
    "url": "/api/vendor-specification-translation/specification",
    "title": "Specification Translation List API",
    "group": "Specification-Translation",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n   \"status\": 1,\n   \"message\": \"Successfully got specification translation list\",\n   \"data\": [\n       {\n           \"createdBy\": 1,\n           \"createdDate\": \"\",\n           \"modifiedBy\": 1,\n           \"modifiedDate\": \"\",\n           \"id\": 1,\n           \"name\": \"\",\n           \"slug\": \"\",\n           \"isActive\": 1,\n           \"isDelete\": 1,\n           \"specificationTranslation\": [\n               {\n                   \"createdBy\": 1,\n                   \"createdDate\": \"\",\n                   \"modifiedBy\": 1,\n                   \"modifiedDate\": \"\",\n                   \"id\": 1,\n                   \"specificationId\": 1,\n                   \"languageId\": 1,\n                   \"name\": \"\"\n               }\n           ]\n       }\n   ]\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-specification-translation/specification"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Specification List error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/SpecificationTranslationController.ts",
    "groupTitle": "Specification-Translation",
    "name": "GetApiVendorSpecificationTranslationSpecification"
  },
  {
    "type": "get",
    "url": "/api/vendor-specification-translation/specification/:id",
    "title": "Specification Translation Detail API",
    "group": "Specification-Translation",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n   \"status\": 1,\n   \"message\": \"Successfully got specification translation detail\"\n   \"data\": {\n       {\n           \"createdBy\": 1,\n           \"createdDate\": \"\",\n           \"modifiedBy\": 1,\n           \"modifiedDate\": \"\",\n           \"id\": 1,\n           \"name\": \"\",\n           \"slug\": \"\",\n           \"isActive\": 1,\n           \"isDelete\": 0,\n           \"specificationTranslation\": [\n               {\n                   \"createdBy\": 1,\n                   \"createdDate\": \"\",\n                   \"modifiedBy\": 1,\n                   \"modifiedDate\": \"\",\n                   \"id\": 1,\n                   \"specificationId\": 1,\n                   \"languageId\": 1,\n                   \"name\": \"\"\n               }\n           ]\n       }\n   }\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-Specification-translation/specification"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Specification Translation Detail error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/SpecificationTranslationController.ts",
    "groupTitle": "Specification-Translation",
    "name": "GetApiVendorSpecificationTranslationSpecificationId"
  },
  {
    "type": "post",
    "url": "/api/vendor-specification-translation/specification/:id",
    "title": "Add Specification Translation API",
    "group": "Specification-Translation",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>specification id (Required)</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "languageId",
            "description": "<p>language id (Required)</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "size": "..255",
            "optional": false,
            "field": "name",
            "description": "<p>name (Required)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n   \"specificationTranslation\": [\n       {\n           \"languageId\": 1,\n           \"name\": \"\"\n       }\n   ]\n}",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n   \"status\": 1,\n   \"message\": \"Successfully created new specification translation.\",\n   \"data\": [\n       {\n           \"specificationId\": 1,\n           \"languageId\": 1,\n           \"name\": \"\",\n           \"createdDate\": \"\",\n           \"id\": 1\n       }\n   ]\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-specification-translation/specification"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Add Specification Translation Error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/SpecificationTranslationController.ts",
    "groupTitle": "Specification-Translation",
    "name": "PostApiVendorSpecificationTranslationSpecificationId"
  },
  {
    "type": "",
    "url": "/api/store-list/addons",
    "title": "Plugin List",
    "group": "Store",
    "parameter": {
      "fields": {
        "Request Body": [
          {
            "group": "Request Body",
            "type": "number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request Body",
            "type": "number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request Body",
            "type": "number",
            "optional": false,
            "field": "count",
            "description": "<p>count</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "success",
          "content": "HTTP/1.1 200 Ok\n{\n     \"status\": \"1\",\n     \"message\": \"Successfully get the plugin list. \",\n     \"data\": {\n     \"status\": ,\n     \"additionalInfo\": {\n          \"clientId\": \"\",\n          \"clientSecret\": \"\",\n          \"defaultRoute\": \"\",\n          \"isTest\": \"\"\n      }\n  }\n }\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/store-list/addons"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Error",
          "content": "HTTP/1.1 500 Internal server error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/store/controllers/CommonListController.ts",
    "groupTitle": "Store",
    "name": "ApiStoreListAddons"
  },
  {
    "type": "",
    "url": "/api/store-list/industry",
    "title": "Industry List",
    "group": "Store",
    "success": {
      "examples": [
        {
          "title": "success",
          "content": "HTTP/1.1 200 Ok\n{\n     \"status\": \"1\",\n     \"message\": \"Successfully Got Industry List..!\",\n     \"data\": {\n             \"id\": \"\",\n             \"name\": \"\",\n             \"slug\": \"\"\",\n             \"isActive\": \"\",\n             \"isDelete\": \"\"\n             }\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/store-list/industry"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Error",
          "content": "HTTP/1.1 500 Internal server error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/store/controllers/CommonListController.ts",
    "groupTitle": "Store",
    "name": "ApiStoreListIndustry"
  },
  {
    "type": "",
    "url": "/api/store-list/industry",
    "title": "Industry List",
    "group": "Store",
    "success": {
      "examples": [
        {
          "title": "success",
          "content": "HTTP/1.1 200 Ok\n{\n     \"status\": \"1\",\n     \"message\": \"Successfully Got Industry List..!\",\n     \"data\": {\n             \"id\": \"\",\n             \"name\": \"\",\n             \"slug\": \"\"\",\n             \"isActive\": \"\",\n             \"isDelete\": \"\"\n             }\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/store-list/settings"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Error",
          "content": "HTTP/1.1 500 Internal server error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/store/controllers/CommonListController.ts",
    "groupTitle": "Store",
    "name": "ApiStoreListIndustry"
  },
  {
    "type": "get",
    "url": "/api/customer/forgot-password-key-check",
    "title": "Forgot Password Key check API",
    "group": "Store",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "key",
            "description": "<p>key</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Valid key\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/customer/forgot-password-key-check"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "store b2b error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/store/controllers/CustomerController.ts",
    "groupTitle": "Store",
    "name": "GetApiCustomerForgotPasswordKeyCheck"
  },
  {
    "type": "get",
    "url": "/api/customer/forgot-password-link",
    "title": "Forgot Password Link API",
    "group": "Store",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User email</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"email\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"status\": \"1\",\n     \"message\": \"Thank you! A link to reset your password will be sent to your registered email shortly.\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/customer/forgot-password-link"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "store forgot passowrd error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/store/controllers/CustomerController.ts",
    "groupTitle": "Store",
    "name": "GetApiCustomerForgotPasswordLink"
  },
  {
    "type": "get",
    "url": "/api/customer/get-profile",
    "title": "Get Profile API",
    "group": "Store",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully Get the Profile..!\",\n     \"status\": \"1\"\n     \"data\": {\n              \"createdBy\": \"\",\n              \"createdDate\": \"2024-06-01T04:09:18.000Z\",\n              \"modifiedBy\": \"\",\n              \"modifiedDate\": \"2024-08-05T12:39:28.000Z\",\n              \"id\": 48,\n              \"firstName\": \"Kamali\",\n              \"lastName\": \"S\",\n              \"gender\": \"\",\n              \"dob\": \"\",\n              \"username\": \"testerpiccomail@gmail.com\",\n              \"password\": \"$2b$10$vXQX4Ad7/C4BubiGs8fnXuBbENZtSDphD4hSXMbsEH3gCn5FZ79My\",\n              \"email\": \"testerpiccomail@gmail.com\",\n              \"mobileNumber\": \"9789929028\",\n              \"address\": \"\",\n              \"countryId\": 1,\n              \"zoneId\": 1,\n              \"city\": \"\",\n              \"local\": \"\",\n              \"oauthData\": \"\",\n              \"avatar\": \"Img_1717214959172.jpeg\",\n              \"newsletter\": \"\",\n              \"avatarPath\": \"customer/\",\n              \"customerGroupId\": 24,\n              \"lastLogin\": \"2024-08-05T12:39:28.000Z\",\n              \"safe\": \"\",\n              \"ip\": \"\",\n              \"mailStatus\": 1,\n              \"pincode\": null,\n              \"deleteFlag\": 0,\n              \"isActive\": 1,\n              \"forgetPasswordKey\": \"VTJGc2RHVmtYMTh6Y3R2VUpSdzRCRit0L3hULzRWa2lCMVpIYlM0aHFTRXk5Zjhzak5GSlhuTEp4d3hBdnBDMA==\",\n              \"linkExpires\": \"2024-07-19T13:16:33.000Z\",\n              \"lockedOn\": null,\n              \"siteId\": 2,\n              \"address2\": null,\n              \"landmark\": null,\n              \"mailOtp\": 792031,\n              \"mailOtpExpireTime\": \"2024-07-31T15:50:10.000Z\"\n}\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/customer/get-profile"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Get Profile error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/store/controllers/CustomerController.ts",
    "groupTitle": "Store",
    "name": "GetApiCustomerGetProfile"
  },
  {
    "type": "get",
    "url": "/api/customer/login-log-list",
    "title": "Login Log-list API",
    "group": "Store",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get login log list\",\n     \"data\":{\n             \"id\": 1\n             \"customerId\" : 1\n             \"emailId\" : \"\"\n             \"firstName\" : \"\"\n             \"ipAddress\" : \"\"\n             \"createdDate\" : \"\"\n     }\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/customer/login-log-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Front error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/store/controllers/CustomerController.ts",
    "groupTitle": "Store",
    "name": "GetApiCustomerLoginLogList"
  },
  {
    "type": "get",
    "url": "/api/pages",
    "title": "Page List API",
    "group": "Store",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          },
          {
            "group": "Header",
            "type": "number",
            "optional": false,
            "field": "languageId",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>keyword</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>count should be number or boolean</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get page list\",\n     \"status\": \"1\",\n     \"data\": [\n               {\n                 \"createdBy\": \"\",\n                 \"createdDate\": \"\",\n                 \"modifiedBy\": \"\",\n                 \"modifiedDate\": \"\",\n                 \"groupId\": \"\",\n                 \"groupName\": \"\",\n                 \"isActive\": \"\",\n                 \"page\": [\n                     {\n                        \"createdBy\": ,\n                        \"createdDate\": \"\",\n                        \"modifiedBy\": \"\",\n                        \"modifiedDate\": \"\",\n                        \"pageId\": \"\",\n                        \"title\": \"\",\n                        \"intro\": \"\",\n                        \"content\": \"\",\n                        \"pageGroupId\": \"\",\n                        \"sortOrder\": \"\",\n                        \"slugName\": \"\",\n                        \"viewPageCount\": \"\",\n                        \"isActive\": \"\",\n                        \"pageTranslation\": {}\n                     }\n                  ],\n                  \"groupNameTrans\": \"\"\n             }\n         ]\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/pages"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "pageFront error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/store/controllers/PageController.ts",
    "groupTitle": "Store",
    "name": "GetApiPages"
  },
  {
    "type": "get",
    "url": "/api/product-store/Category",
    "title": "Get Category API",
    "group": "Store",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "CategoryId",
            "description": "<p>categoryId</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"status\": \"1\"\n     \"message\": \"successfully got the category.\",\n     \"data\":\"{\n             \"categoryId\": 1,\n             \"name\": \"\",\n             \"parentInt\": 1,\n             \"sortOrder\": \"\",\n             \"categorySlug\": \"\",\n             \"level\": \"\",\n             \"pathId\": 1\n }\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/product-store/Category"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Category error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/store/controllers/ProductController.ts",
    "groupTitle": "Store",
    "name": "GetApiProductStoreCategory"
  },
  {
    "type": "get",
    "url": "/api/product-store/order-product/:orderProductId",
    "title": "Product Detail API",
    "group": "Store",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "categorySlug",
            "description": "<p>categorySlug</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"status\": \"1\"\n     \"message\": \"Successfully get product Detail\",\n     \"data\": {\n             \"createdDate\": \"\"\",\n             \"productId\": 1,\n             \"sku\": \"\",\n             \"upc\": \"\",\n             \"hsn\": \"\",\n             \"location\": \"\",\n             \"quantity\": 1,\n             \"minimumQuantity\": 1,\n             \"subtractStock\": 1,\n             \"stockStatusId\": 1,\n             \"quotationAvailable\": ,\n             \"image\": \"\",\n             \"imagePath\": \"\",\n             \"manufacturerId\": 1,\n             \"shipping\": \"\",\n             \"serviceCharges\": \"\",\n             \"taxType\": 1,\n             \"taxValue\": \"\",\n             \"price\": \"\",\n             \"priceUpdateFileLogId\": \"\",\n             \"dateAvailable\": \"\",\n             \"sortOrder\": 1,\n             \"name\": \"\",\n             \"description\": \"\",\n             \"amount\": \"\",\n             \"keywords\": \"\",\n             \"discount\": \"\"\n             \"deleteFlag\": \"\",\n             \"isFeatured\": \"\",\n             \"todayDeals\": \"\",\n             \"condition\": \"\",\n             \"rating\": \"\",\n             \"wishListStatus\": \"\",\n             \"productSlug\": \"\",\n             \"isActive\": 1,\n             \"width\": \"\",\n             \"height\": \"\",\n             \"length\": \"\",\n             \"weight\": \"\",\n             \"hasStock\": 1,\n             \"priceType\": \"\",\n             \"isSimplified\": 1,\n             \"owner\": \"\",\n             \"isCommon\": 1,\n             \"skuId\": \"\",\n             \"hasTirePrice\": \"\",\n             \"outOfStockThreshold\": 1,\n             \"notifyMinQuantity\": \"\",\n             \"minQuantityAllowedCart\": 1,\n             \"maxQuantityAllowedCart\": 10,\n             \"enableBackOrders\": 1,\n             \"pincodeBasedDelivery\": \"\",\n             \"attributeKeyword\": \"\",\n             \"settedAsCommonOn\": \"\",\n             \"productHighlights\": \"\",\n             \"productTranslation\": [],\n             \"productNameTrans\": \"\",\n             \"productDescriptionTrans\": \"\",\n             \"ratingCount\": \"\",\n             \"reviewCount\": \"\",\n             \"productImage\": [{\n                           \"productId\": 1,\n                           \"image\": \"\",\n                           \"containerName\": \"\",\n                           \"defaultImage\": \"\",\n                         }],\n             \"productOriginalImage\": [{\n                     \"productId\": 1,\n                     \"image\": \"\",\n                     \"containerName\": \"\",\n                     \"defaultImage\": \"\"\n                 }\n             ],\n             \"Category\": [\n                 {\n                     \"productId\": 1,\n                     \"categoryId\": 1,\n                     \"categoryName\": \"\",\n                     \"categorySlug\": \"\"\n                 }\n             ],\n             \"productOption\": [],\n             \"skuName\": \"\",\n             \"variantName\": \"\",\n             \"variantId\": 1,\n             \"stockStatus\": 1,\n             \"pricerefer\": \"\",\n             \"flag\": \"\",\n             \"productTirePrices\": [],\n             \"buyed\": ,\n             \"productVideo\": {\n                 \"id\": 1,\n                 \"productId\": \"\",\n                 \"name\": \"\",\n                 \"path\": \"\",\n                 \"type\": 1\n              }\n             }\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/product-store/order-product/:orderProductId"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "productDetail error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/store/controllers/ProductController.ts",
    "groupTitle": "Store",
    "name": "GetApiProductStoreOrderProductOrderproductid"
  },
  {
    "type": "get",
    "url": "/api/product-store/product-compare",
    "title": "Product Compare API",
    "group": "Store",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "productId",
            "description": "<p>productId</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "data",
            "description": "<p>data</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully Product Compared\",\n     \"status\": \"1\",\n     \"data\": {\n             \"createdBy\": \"\",\n             \"createdDate\": \"\",\n             \"modifiedBy\": \"\",\n             \"modifiedDate\": \"\"\",\n             \"productId\": 1,\n             \"sku\": \"\",\n             \"upc\": \"\",\n             \"hsn\": \"\",\n             \"location\": \"\",\n             \"quantity\": 1,\n             \"minimumQuantity\": \"\",\n             \"subtractStock\": \"\",\n             \"stockStatusId\": \"\",\n             \"quotationAvailable\": \"\",\n             \"image\": \"\",\n             \"imagePath\": ,\n             \"manufacturerId\": \"\",\n             \"shipping\": \"\",\n             \"serviceCharges\": \"\",\n             \"taxType\": \"\",\n             \"taxValue\": \"\",\n             \"price\": \"\",\n             \"priceUpdateFileLogId\": \"\",\n             \"dateAvailable\": \"\",\n             \"sortOrder\": \"\",\n             \"name\": \"\",\n             \"description\": \"\",\n             \"amount\": \"\",\n             \"keywords\": \"\",\n             \"discount\": \"\",\n             \"deleteFlag\": \"\",\n             \"isFeatured\": \"\",\n             \"todayDeals\": \"\",\n             \"condition\": \"\",\n             \"rating\": \"\",\n             \"wishListStatus\": \"\",\n             \"productSlug\": \"\",\n             \"isActive\": ,\n             \"width\": \"\",\n             \"height\": \"\",\n             \"length\": \"\",\n             \"weight\": \"\",\n             \"hasStock\": \"\",\n             \"priceType\": \"\",\n             \"isSimplified\": \"\",\n             \"owner\": \"\",\n             \"isCommon\": \"\",\n             \"skuId\": \"\",\n             \"hasTirePrice\": \"\",\n             \"outOfStockThreshold\": \"\",\n             \"notifyMinQuantity\": \"\",\n             \"minQuantityAllowedCart\": \"\",\n             \"maxQuantityAllowedCart\": \"\",\n             \"enableBackOrders\": \"\",\n             \"pincodeBasedDelivery\": \"\",\n             \"attributeKeyword\": \"\",\n             \"settedAsCommonOn\": \"\",\n             \"productHighlights\": \"\",\n             \"productTranslation\": [],\n             \"productNameTrans\": \"\",\n             \"productDescriptionTrans\": \"\",\n             \"ratingCount\": \"\",\n             \"reviewCount\": \"\",\n             \"skuName\": \"\",\n             \"pricerefer\": \"\",\n             \"flag\": \"\",\n             \"productImage\": {\n                 \"createdBy\": \"\",\n                 \"createdDate\": \"\",\n                 \"modifiedBy\": \"\",\n                 \"modifiedDate\": \"\",\n                 \"productImageId\": \"\",\n                 \"productId\": \"\",\n                 \"image\": \"\",\n                 \"containerName\": \"\",\n                 \"sortOrder\": \"\",\n                 \"defaultImage\": \"\",\n                 \"isActive\":\"\"\n             },\n      \"stockStatus\": \"\"\n  },\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/product-store/product-compare"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "product compare error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/store/controllers/ProductController.ts",
    "groupTitle": "Store",
    "name": "GetApiProductStoreProductCompare"
  },
  {
    "type": "get",
    "url": "/api/product-store/productdetail/:productslug",
    "title": "Product Detail API",
    "group": "Store",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "categorySlug",
            "description": "<p>categorySlug</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"status\": \"1\"\n     \"message\": \"Successfully get product Detail\",\n     \"data\": {\n             \"createdDate\": \"\"\",\n             \"productId\": 1,\n             \"sku\": \"\",\n             \"upc\": \"\",\n             \"hsn\": \"\",\n             \"location\": \"\",\n             \"quantity\": 1,\n             \"minimumQuantity\": 1,\n             \"subtractStock\": 1,\n             \"stockStatusId\": 1,\n             \"quotationAvailable\": ,\n             \"image\": \"\",\n             \"imagePath\": \"\",\n             \"manufacturerId\": 1,\n             \"shipping\": \"\",\n             \"serviceCharges\": \"\",\n             \"taxType\": 1,\n             \"taxValue\": \"\",\n             \"price\": \"\",\n             \"priceUpdateFileLogId\": \"\",\n             \"dateAvailable\": \"\",\n             \"sortOrder\": 1,\n             \"name\": \"\",\n             \"description\": \"\",\n             \"amount\": \"\",\n             \"keywords\": \"\",\n             \"discount\": \"\"\n             \"deleteFlag\": \"\",\n             \"isFeatured\": \"\",\n             \"todayDeals\": \"\",\n             \"condition\": \"\",\n             \"rating\": \"\",\n             \"wishListStatus\": \"\",\n             \"productSlug\": \"\",\n             \"isActive\": 1,\n             \"width\": \"\",\n             \"height\": \"\",\n             \"length\": \"\",\n             \"weight\": \"\",\n             \"hasStock\": 1,\n             \"priceType\": \"\",\n             \"isSimplified\": 1,\n             \"owner\": \"\",\n             \"isCommon\": 1,\n             \"skuId\": \"\",\n             \"hasTirePrice\": \"\",\n             \"outOfStockThreshold\": 1,\n             \"notifyMinQuantity\": \"\",\n             \"minQuantityAllowedCart\": 1,\n             \"maxQuantityAllowedCart\": 10,\n             \"enableBackOrders\": 1,\n             \"pincodeBasedDelivery\": \"\",\n             \"attributeKeyword\": \"\",\n             \"settedAsCommonOn\": \"\",\n             \"productHighlights\": \"\",\n             \"productTranslation\": [],\n             \"productNameTrans\": \"\",\n             \"productDescriptionTrans\": \"\",\n             \"ratingCount\": \"\",\n             \"reviewCount\": \"\",\n             \"productImage\": [{\n                           \"productId\": 1,\n                           \"image\": \"\",\n                           \"containerName\": \"\",\n                           \"defaultImage\": \"\",\n                         }],\n             \"productOriginalImage\": [{\n                     \"productId\": 1,\n                     \"image\": \"\",\n                     \"containerName\": \"\",\n                     \"defaultImage\": \"\"\n                 }\n             ],\n             \"Category\": [\n                 {\n                     \"productId\": 1,\n                     \"categoryId\": 1,\n                     \"categoryName\": \"\",\n                     \"categorySlug\": \"\"\n                 }\n             ],\n             \"productOption\": [],\n             \"skuName\": \"\",\n             \"variantName\": \"\",\n             \"variantId\": 1,\n             \"stockStatus\": 1,\n             \"pricerefer\": \"\",\n             \"flag\": \"\",\n             \"productTirePrices\": [],\n             \"buyed\": ,\n             \"productVideo\": {\n                 \"id\": 1,\n                 \"productId\": \"\",\n                 \"name\": \"\",\n                 \"path\": \"\",\n                 \"type\": 1\n              }\n             }\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/product-store/productdetail/:productslug"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "productDetail error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/store/controllers/ProductController.ts",
    "groupTitle": "Store",
    "name": "GetApiProductStoreProductdetailProductslug"
  },
  {
    "type": "Get",
    "url": "/api/product-store/rating-by-order",
    "title": "Customer Rating Detail By Order",
    "group": "Store",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "orderProductId",
            "description": "<p>orderProductId</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully show the Order Detail..!!\",\n     \"status\": \"1\",\n     \"data\": [{\n     \"orderedDate\": \"\",\n     \"orderProductPrefixId\": \"\",\n     \"total\": 1,\n     \"currencySymbolLeft\": \"\",\n     \"currencySymbolRight\": \"\",\n     \"discountAmount\": 1,\n     \"discountedAmount\": 1,\n     \"couponDiscountAmount\": 1,\n     \"orderProductPrefixId\": \"\",\n     \"productImage\": \"\",\n     \"basePrice\": \"\",\n     \"taxValue\": \"\",\n     \"taxType\": \"\",\n     \"orderId\": 1,\n     \"orderProductId\": 1,\n     \"productId\": 1,\n     \"productName\": \"\",\n     \"productQuantity\": 1,\n     \"productPrice\": 1,\n     \"skuName\": \"\",\n     \"rating\": 1,\n     \"review\": \"\",\n   }]\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/product-store/rating-by-order"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Order Detail error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/store/controllers/StoreRatingController.ts",
    "groupTitle": "Store",
    "name": "GetApiProductStoreRatingByOrder"
  },
  {
    "type": "Get",
    "url": "/api/product-store/rating-count/:skuId",
    "title": "Get product Rating Count API",
    "group": "Store",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "skuId",
            "description": "<p>skuId</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"successfully got the product rating.\",\n     \"data\": {\n     \"ratingCount\": 1,\n     \"reviewCount\": 1,\n     \"rating\": 1\n       },\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/product-store/rating-count/:skuId"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "GetProduct RatingCount error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/store/controllers/StoreRatingController.ts",
    "groupTitle": "Store",
    "name": "GetApiProductStoreRatingCountSkuid"
  },
  {
    "type": "Get",
    "url": "/api/product-store/rating/:skuId",
    "title": "Get product Rating API",
    "group": "Store",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "skuId",
            "description": "<p>skuId</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "customerId",
            "description": "<p>customerId</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>count in number</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"successfully got the product Rating.\",\n     \"data\": [{\n     \"review\": \"\",\n     \"rating\": 1,\n     \"createdDate\": \"\",\n     \"firstName\": \"\",\n     \"lastName\": \"\",\n     \"image\": \"\",\n     \"imagePath\": \"\",\n     \"video\": \"\",\n     \"videoPath\": \"\",\n     \"productId\": 1,\n     \"customerId\": 1,\n     \"isActive\": 1\n       }]\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/product-store/rating/:skuId"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "getProductRating error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/store/controllers/StoreRatingController.ts",
    "groupTitle": "Store",
    "name": "GetApiProductStoreRatingSkuid"
  },
  {
    "type": "Get",
    "url": "/api/product-store/rating-statistics/:skuId",
    "title": "Get Rating Statistics API",
    "group": "Store",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "skuId",
            "description": "<p>skuId</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"successfully got the product ratings & review count\",\n     \"data\":  [{\n     \"starsCount\": 1,\n     \"totalRatingReview\": 1\n      }]\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/product-store/rating-statistics/:skuId"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Product error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/store/controllers/StoreRatingController.ts",
    "groupTitle": "Store",
    "name": "GetApiProductStoreRatingStatisticsSkuid"
  },
  {
    "type": "Get",
    "url": "/api/product-store/vendor-product-rating-count",
    "title": "Get Product Rating And Review Based On Vendor API",
    "group": "Store",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "vendorId",
            "description": "<p>vendorId</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"successfully got the product Rating.\",\n     \"data\": {\n      \"totalRatings\": 1,\n      \"averageRating\": 1,\n        }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/product-store/vendor-product-rating-count"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "vendorBasedProductRatingCount error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/store/controllers/StoreRatingController.ts",
    "groupTitle": "Store",
    "name": "GetApiProductStoreVendorProductRatingCount"
  },
  {
    "type": "get",
    "url": "/api/:slugName",
    "title": "Page Details API",
    "group": "Store",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          },
          {
            "group": "Header",
            "type": "number",
            "optional": false,
            "field": "languageId",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get page Details\",\n     \"data\": {\n               \"createdBy\": \"\",\n               \"createdDate\": \"\",\n               \"modifiedBy\": \"\",\n               \"modifiedDate\": \"\",\n               \"pageId\": \"\",\n               \"title\": \"\",\n               \"intro\": \"\",\n               \"content\": \"\",\n               \"pageGroupId\": \"\",\n               \"sortOrder\": \"\",\n               \"slugName\": \"\",\n               \"viewPageCount\": \"\",\n               \"isActive\": \"\",\n               \"pageTranslation\": {}\n            }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/pages/:slugName"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "page error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/store/controllers/PageController.ts",
    "groupTitle": "Store",
    "name": "GetApiSlugname"
  },
  {
    "type": "Get",
    "url": "/api/store-list/gmap-key",
    "title": "Get Client Id",
    "group": "Store",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "string",
            "optional": false,
            "field": "pluginName",
            "description": "<p>pluginName</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 Ok\n {\n     \"status\": \"1\",\n     \"message\": \"Redirect to this url.\"\",\n     \"data\": {\n      \"routePath\": \"\",\n      \"clientId\": \"\"\n  }\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/store-list/gmap-key"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Error",
          "content": "HTTP/1.1 500 Internal server errorS",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/store/controllers/CommonListController.ts",
    "groupTitle": "Store",
    "name": "GetApiStoreListGmapKey"
  },
  {
    "type": "get",
    "url": "/api/store-list/orderLoglist",
    "title": "Order Log List API",
    "group": "Store",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "orderPrefixId",
            "description": "<p>orderPrefixId</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get order log list\",\n     \"data\":{\n             \"orderProductId\": 1\n             \"orderStatusId\" : 2,\n             \"total\": \"\",\n             \"createdDate\" : \"\",\n             \"modifiedDate\": \"\"\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/store-list/orderLoglist"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "order log error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/store/controllers/CommonListController.ts",
    "groupTitle": "Store",
    "name": "GetApiStoreListOrderloglist"
  },
  {
    "type": "post",
    "url": "/api/customer/change-password",
    "title": "Change Password API",
    "group": "Store",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "size": "5..",
            "optional": false,
            "field": "oldPassword",
            "description": "<p>Old Password</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "size": "8..128",
            "optional": false,
            "field": "newPassword",
            "description": "<p>New Password</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "     \"oldPassword\" : \"\",\n     \"newPassword\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Your password changed successfully\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/customer/change-password"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Change Password error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/store/controllers/CustomerController.ts",
    "groupTitle": "Store",
    "name": "PostApiCustomerChangePassword"
  },
  {
    "type": "post",
    "url": "/api/customer/edit-profile",
    "title": "Edit Profile API",
    "group": "Store",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "size": "..32",
            "optional": false,
            "field": "firstName",
            "description": "<p>First Name</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "size": "..32",
            "optional": true,
            "field": "lastName",
            "description": "<p>Last Name</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>password</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "size": "..96",
            "optional": false,
            "field": "emailId",
            "description": "<p>User Email Id</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "size": "..15",
            "optional": true,
            "field": "phoneNumber",
            "description": "<p>User Phone Number (Optional)</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": true,
            "field": "image",
            "description": "<p>Customer Image</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"firstName\" : \"\",\n     \"lastName\" : \"\",\n     \"password\" \"\",\n     \"emailId\" : \"\",\n     \"phoneNumber\" : \"\",\n     \"image\": \"\",\n     \"landmark\": \"\",\n     \"address2\": \"\",\n     \"address\": \"\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully updated your profile.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/customer/edit-profile"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Register error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/store/controllers/CustomerController.ts",
    "groupTitle": "Store",
    "name": "PostApiCustomerEditProfile"
  },
  {
    "type": "post",
    "url": "/api/customer/login",
    "title": "Login API",
    "group": "Store",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "languageKey",
            "description": ""
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "key",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": true,
            "field": "emailId",
            "description": "<p>User Email Id</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": true,
            "field": "password",
            "description": "<p>User Password</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>send as normal | facebook | gmail</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"emailId\" : \"\",\n     \"password\" : \"\",\n     \"type\" : \"\",\n     \"token\": \"\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Logged in Successfully.\",\n     \"status\": \"1\"\n     \"data\": {\n       \"token\": \"\",\n       \"user\": {\n           \"id\": \"\",\n           \"firstName\": \"\",\n           \"lastName\": \"\",\n           \"email\": \"\",\n           \"mobileNumber\": \"\",\n           \"avatar\": \"\",\n           \"avatarPath\": \"\",\n           \"lockedOn\": \"\"\n          }\n        }\n     }\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/customer/login"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Login error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/store/controllers/CustomerController.ts",
    "groupTitle": "Store",
    "name": "PostApiCustomerLogin"
  },
  {
    "type": "post",
    "url": "/api/customer/logout",
    "title": "Logout API",
    "group": "Store",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully Logout\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/customer/logout"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Logout error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/store/controllers/CustomerController.ts",
    "groupTitle": "Store",
    "name": "PostApiCustomerLogout"
  },
  {
    "type": "post",
    "url": "/api/customer/Oauth-login",
    "title": "Oauth login API",
    "group": "Store",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "emailId",
            "description": "<p>User Email Id</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": true,
            "field": "source",
            "description": "<p>source</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": true,
            "field": "oauthData",
            "description": "<p>oauthData</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"emailId\" : \"\",\n     \"source\" : \"\",\n     \"oauthData\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"data\": \"{\n        \"token\":\"\"\n        \"password\":\"\"\n     }\",\n     \"message\": \"Successfully login\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/customer/Oauth-login"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Login error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/store/controllers/CustomerController.ts",
    "groupTitle": "Store",
    "name": "PostApiCustomerOauthLogin"
  },
  {
    "type": "post",
    "url": "/api/customer/otp-verify",
    "title": "Register API",
    "group": "Store",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "size": "..32",
            "optional": false,
            "field": "otp",
            "description": "<p>otp</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "size": "..96",
            "optional": false,
            "field": "emailId",
            "description": "<p>User Email Id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"otp\"      : \"\",\n     \"emailId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Thank you for registering with us and please check your email\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/customer/otp-verify"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Register error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/store/controllers/CustomerController.ts",
    "groupTitle": "Store",
    "name": "PostApiCustomerOtpVerify"
  },
  {
    "type": "post",
    "url": "/api/customer/register",
    "title": "Register API",
    "group": "Store",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "size": "..32",
            "optional": false,
            "field": "name",
            "description": "<p>Name</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": true,
            "field": "lastName",
            "description": "<p>lastName</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "size": "8..128",
            "optional": false,
            "field": "password",
            "description": "<p>User Password</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "confirmPassword",
            "description": "<p>Confirm Password</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "size": "..96",
            "optional": false,
            "field": "emailId",
            "description": "<p>User Email Id</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "size": "..15",
            "optional": true,
            "field": "phoneNumber",
            "description": "<p>User Phone Number</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"firstName\" : \"\",\n     \"lastName\" : \"\",\n     \"password\" : \"\",\n     \"otp\"      : \"\",\n     \"emailId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Thank you for registering with us and please check your email\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/customer/register"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Register error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/store/controllers/CustomerController.ts",
    "groupTitle": "Store",
    "name": "PostApiCustomerRegister"
  },
  {
    "type": "post",
    "url": "/api/customer/send-otp",
    "title": "Send Otp API",
    "group": "Store",
    "parameter": {
      "examples": [
        {
          "title": "Input",
          "content": "{\n   \"emailId\": \"\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n   \"status\": 1,\n   \"message\": \"OTP successfully sent to the provided email address\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/customer/send-otp"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Register error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/store/controllers/CustomerController.ts",
    "groupTitle": "Store",
    "name": "PostApiCustomerSendOtp"
  },
  {
    "type": "put",
    "url": "/api/customer/change/mail",
    "title": "Change Mail API",
    "group": "Store",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "examples": [
        {
          "title": "Input",
          "content": "{\n   \"emailId\": \"\",\n   \"password\": \"\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Your OTP Send To Given Email Address.!\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/customer/change/mail"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Logout error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/store/controllers/CustomerController.ts",
    "groupTitle": "Store",
    "name": "PutApiCustomerChangeMail"
  },
  {
    "type": "put",
    "url": "/api/customer/mail/verify",
    "title": "Change Mail Verify API",
    "group": "Store",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "examples": [
        {
          "title": "Input",
          "content": "{\n   \"emailId\": \"\",\n   \"otp\": \"\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Email Updated Successfully.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/customer/change/mail/verify"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Logout error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/store/controllers/CustomerController.ts",
    "groupTitle": "Store",
    "name": "PutApiCustomerMailVerify"
  },
  {
    "type": "put",
    "url": "/api/customer/reset-password",
    "title": "Reset Password API",
    "group": "Store",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "newPassword",
            "description": "<p>newPassword</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "key",
            "description": "<p>key</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"key\": \"\",\n     \"newPassword\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully Password changed\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/customer/reset-password"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "store b2b error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/store/controllers/CustomerController.ts",
    "groupTitle": "Store",
    "name": "PutApiCustomerResetPassword"
  },
  {
    "type": "get",
    "url": "/api/list/blog/blog-detail/:blogSlug",
    "title": "Blog Detail API",
    "group": "Store_List",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get blog Detail\",\n     \"data\" : {\n     \"createdBy\": 1,\n     \"createdDate\": \"\",\n     \"modifiedBy\": 1,\n     \"modifiedDate\": \"\",\n     \"id\": 1,\n     \"title\": \"\",\n     \"categoryId\": 1,\n     \"description\": \"\",\n     \"imagePath\": \"\",\n     \"isActive\": 1,\n     \"blogSlug\": \"\",\n     \"categoryName\": \"\",\n     \"categoryTranslationName\": \"\",\n     \"createdByName\": \"\",\n     \"createdByImage\": \"\",\n     \"createdByImagePath\": \"\"\n  }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/list/blog/blog-detail/:blogSlug"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Blog error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/store/controllers/StoreBlogController.ts",
    "groupTitle": "Store_List",
    "name": "GetApiListBlogBlogDetailBlogslug"
  },
  {
    "type": "get",
    "url": "/api/list/blog/blog-list",
    "title": "Blog List API",
    "group": "Store_List",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>keyword</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>count should be number or boolean</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get blog list\",\n     \"data\" : {\n     \"createdBy\": 1,\n     \"createdDate\": \"\",\n     \"modifiedBy\": 1,\n     \"modifiedDate\": \"\",\n     \"id\": 1,\n     \"title\": \"\",\n     \"categoryId\": 1,\n     \"description\": \"\",\n     \"imagePath\": \"\",\n     \"isActive\": 1,\n     \"blogSlug\": \"\",\n     \"categoryName\": \"\",\n     \"categoryTranslationName\": \"\",\n     \"createdByName\": \"\",\n     \"createdByImage\": \"\",\n     \"createdByImagePath\": \"\"\n  },\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/list/blog/blog-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Blog error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/store/controllers/StoreBlogController.ts",
    "groupTitle": "Store_List",
    "name": "GetApiListBlogBlogList"
  },
  {
    "type": "get",
    "url": "/api/list/related-blog-list",
    "title": "Related Blog List",
    "group": "Store_List",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          },
          {
            "group": "Header",
            "type": "number",
            "optional": false,
            "field": "languageId",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "blogSlug",
            "description": "<p>Blog Slug</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"blogSlug\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Related Blog List Showing Successfully..!\",\n     \"status\": \"1\",\n     \"data\":   {\n      \"createdBy\":1 ,\n      \"createdDate\": \"\",\n      \"modifiedBy\": 1,\n      \"modifiedDate\": \"\",\n      \"relatedId\": 1,\n      \"blogId\": 1,\n      \"relatedBlogId\": 1,\n      \"isActive\": 1,\n      \"categoryName\": \"\",\n      \"categoryTranslationName\": \"\",\n      \"relatedBlog\": {\n          \"createdDate\": \"\",\n          \"id\": 1,\n          \"title\": \"\",\n          \"categoryId\": 1,\n          \"description\": \"\",\n          \"image\": \"\",\n          \"imagePath\": \"\",\n          \"isActive\": ,\n          \"blogSlug\": \"\",\n          \"relatedBlogTranslation\": {}\n      }\n  }\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/list/related-blog-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Related Blog List error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/store/controllers/StoreBlogController.ts",
    "groupTitle": "Store_List",
    "name": "GetApiListRelatedBlogList"
  },
  {
    "type": "get",
    "url": "/api/list/related-product-list",
    "title": "Related Product List",
    "group": "Store_List",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "productId",
            "description": "<p>Product Id</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"productId\" : 1,\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Related Product List Showing Successfully..!\",\n     \"status\": \"1\",\n     \"data\": {\n                      \"productId\": 1,\n                      \"id\": 1,\n                      \"taxType\": \"\",\n                      \"taxValue\": \"\",\n                      \"skuId\": 1,\n                      \"price\": \"\",\n                      \"name\": \"\",\n                      \"isSimplified\": 1,\n                      \"description\": \"\",\n                      \"quantity\": 1,\n                      \"rating\": 1,\n                      \"productSlug\": \"\",\n                      \"hasStock\": \"\",\n                      \"outOfStockThreshold\": \"\",\n                      \"containerName\": \"\",\n                      \"image\": \"\",\n                      \"defaultImage\": \"\",\n                      \"skuName\": \"\",\n                      \"productDiscount\": 1,\n                      \"productSpecial\": \"\",\n                      \"productNameTrans\": \"\",\n                      \"productDescriptionTrans\": \"\",\n                      \"categoryLevels\": [\n                        {\n                              \"createdDate\": \"\",\n                              \"productToCategoryId\": 1,\n                              \"categoryId\": 1,\n                              \"categoryName\": \"\",\n                              \"categorySlug\": \"\",\n                              \"parentInt\": 1,\n                              \"categoryDescription\": \"\"\n                        }\n                    ],\n                      \"pricerefer\": \"\",\n                      \"flag\": 1,\n                      \"stockStatus\": 1,\n                      \"wishListStatus\": 1\n        }\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/list/related-product-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Related Product List error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/store/controllers/StoreProductRelatedController.ts",
    "groupTitle": "Store_List",
    "name": "GetApiListRelatedProductList"
  },
  {
    "type": "get",
    "url": "/api/site-filter/:categorySlug",
    "title": "Get filter detail API",
    "group": "Store_List",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "categorySlug",
            "description": "<p>categorySlug</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     'message': 'Successfully get  Detail',\n     'data':{\n     \"id\": ,\n     \"filterId\": \"\",\n     \"sectionId\": \"\",\n     \"sectionName\": \"\",\n     \"sectionType\": \"\",\n     \"sectionSlug\": \"\",\n     \"sequence\": \"\",\n     \"sectionItem\": [\n          {\n              \"id\": \"\",\n              \"filterSectionId\": \"\",\n              \"itemName\": \"\",\n              \"itemSlug\": \"\"\n          }\n  ]\n     }\n     'status': '1'\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/site-filter/:categorySlug"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Store list error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/store/controllers/SiteFilterController.ts",
    "groupTitle": "Store_List",
    "name": "GetApiSiteFilterCategoryslug"
  },
  {
    "type": "get",
    "url": "/api/store-list/banner",
    "title": "Banner List",
    "group": "Store_List",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>Limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>Offset</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>count in number or boolean</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "keyword",
            "description": "<p>keyword</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"limit\" : \"\",\n     \"offset\": \"\",\n     \"keyword\": \"\",\n     \"count\": \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully got banner list..\",\n     \"status\": \"1\",\n     \"data\": {\n         \"bannerId\": 1,\n         \"title\": \"\",\n         \"link\": \"\",\n         \"content\": \"\",\n         \"position\": \"\",\n         \"image\": \"\",\n         \"imagePath\": \"\",\n         \"isActive\": \"\",\n         \"linkType\": \"\"\n     }\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/store-list/banner"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Banner List error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/store/controllers/CommonListController.ts",
    "groupTitle": "Store_List",
    "name": "GetApiStoreListBanner"
  },
  {
    "type": "get",
    "url": "/api/store-list/banner/position/:position",
    "title": "Banner Detail",
    "group": "Store_List",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "position",
            "description": "<p>position</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully got banner detail..\",\n     \"status\": \"1\",\n     \"data\": \"{\n              \"bannerId\": 1,\n              \"title\": \"\",\n              \"link\": \"\",\n              \"content\": \"\",\n              \"position\": \"\",\n              \"image\": \"\",\n              \"imagePath\": \"\",\n              \"isActive\": \"\",\n              \"linkType\": \"\"\n             }\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/store-list/banner/position/:position"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Banner Detail error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/store/controllers/CommonListController.ts",
    "groupTitle": "Store_List",
    "name": "GetApiStoreListBannerPositionPosition"
  },
  {
    "type": "get",
    "url": "/api/store-list/category",
    "title": "Category List Tree API",
    "group": "Store_List",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>Limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>Offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>keyword</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "sortOrder",
            "description": "<p>sortOrder</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>count in number or boolean</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"limit\" : \"\",\n     \"offset\": \"\",\n     \"keyorder\": \"\",\n     \"sortOrder\": \"\",\n     \"count\": \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"category list shown successfully..!\",\n     \"status\": \"1\",\n     \"data\": \"{\n              \"categoryId\": 1,\n              \"name\": \"\",\n              \"categoryDescription\": \"\"\n              \"image\": \"\",\n              \"imagePath\": \"\",\n              \"parentInt\": 1,\n              \"sortOrder\": \"\",\n              \"categorySlug\": \"\",\n              \"isActive\": 1\n             }\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/store-list/category"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Category List error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/store/controllers/CommonListController.ts",
    "groupTitle": "Store_List",
    "name": "GetApiStoreListCategory"
  },
  {
    "type": "get",
    "url": "/api/store-list/country-list",
    "title": "Country List API",
    "group": "Store_List",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>keyword</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>count should be number or boolean</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"status\": \"1\"\n     \"message\": \"Successfully get country list\",\n     \"data\":\"{\n             \"countryId\": \"\"\n             \"name\" : \"\"\n             \"isoCode2\": \"\"\n             \"isoCode3\": \"\"\n             \"addressFormat\": \"\"\n             \"postcodeRequired\": \"\"\n     }\"\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/store-list/country-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "countryFront error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/store/controllers/CommonListController.ts",
    "groupTitle": "Store_List",
    "name": "GetApiStoreListCountryList"
  },
  {
    "type": "get",
    "url": "/api/store-list/custom-product-list",
    "title": "Custom Product List API",
    "group": "Store_List",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "categorySlug",
            "description": "<p>categorySlug</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "priceFrom",
            "description": "<p>price from you want to list</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "priceTo",
            "description": "<p>price to you want to list</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "price",
            "description": "<p>ASC OR DESC</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>keyword</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"status\": \"1\"\n     \"message\": \"Successfully get product list\",\n     \"data\": \"{\n              \"productId\": 1,\n              \"taxType\": 1,\n              \"taxValue\": \"\",\n              \"name\": \"\",\n              \"price\": \"\",\n              \"description\": \"\",\n              \"dateAvailable\": \"\",\n              \"sku\": \"\",\n              \"skuId\": \"\",\n              \"isSimplified\": \"\",\n              \"upc\": \"\",\n              \"quantity\": 10,\n              \"rating\": \"\",\n              \"isActive\": 1,\n              \"productSlug\": \"\",\n              \"hasStock\": \"\",\n              \"outOfStockThreshold\": \"\",\n              \"stockStatusId\": \"\",\n              \"createdDate\": \"\",\n              \"keywords\": \"\",\n              \"attributeKeyword\": \"\",\n              \"vendorId\": 1,\n              \"vendorName\": \"\",\n              \"vendorCompanyName\": \"\",\n              \"vendorSlugName\": \"\",\n              \"maxQuantityAllowedCart\": 10,\n              \"minQuantityAllowedCart\": 1,\n              \"containerName\": \"\",\n              \"image\": \"\",\n              \"defaultImage\": \"\",\n              \"ratingCount\": \"\",\n              \"reviewCount\": \"\",\n              \"skuName\": \"\",\n              \"modifiedPrice\": \"\",\n              \"productDiscount\": \"\",\n              \"productSpecial\": \"\",\n              \"vcPrice\": \"\",\n              \"vcgPrice\": \"\",\n              \"pricerefer\": \"\",\n              \"flag\": 1,\n              \"stockStatus\": 1,\n              \"wishListStatus\": 1,\n              \"productNameTrans\": \"\",\n              \"productDescriptionTrans\": \"\"\n             },\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/store-list/custom-product-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "productList error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/store/controllers/CommonListController.ts",
    "groupTitle": "Store_List",
    "name": "GetApiStoreListCustomProductList"
  },
  {
    "type": "get",
    "url": "/api/store-list/language",
    "title": "Language List API",
    "group": "Store_List",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>keyword</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>count should be number or boolean</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"status\": \"1\"\n     \"message\": \"Successfully got language list\",\n     \"data\":{\n             \"languageId\": 1\n             \"name\": \"\"\n             \"status\": 1\n             \"code\": \"\"\n             \"sortOrder\": 1,\n             \"image\": \"\",\n             \"imagePath\": \"\"\n     }\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/store-list/language"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Language error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/store/controllers/CommonListController.ts",
    "groupTitle": "Store_List",
    "name": "GetApiStoreListLanguage"
  },
  {
    "type": "get",
    "url": "/api/store-list/payment",
    "title": "Get payment setting API",
    "group": "Store_List",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>keyword</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>count should be number or boolean</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully got payment setting\",\n     \"data\":{\n             \"plugin_name\": \"\"\n             \"plugin_avatar\": \"\"\n             \"plugin_avatar_path\": \"\"\n             \"plugin_type\" : \"\"\n             \"plugin_status\": \"\"\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/store-list/payment"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "get payment setting error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/store/controllers/CommonListController.ts",
    "groupTitle": "Store_List",
    "name": "GetApiStoreListPayment"
  },
  {
    "type": "get",
    "url": "/api/store-list/product-count",
    "title": "Product Count API",
    "group": "Store_List",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>keyword for search</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "categoryslug",
            "description": "<p>categoryslug</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "priceFrom",
            "description": "<p>price from you want to list</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "priceTo",
            "description": "<p>price to you want to list</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "variant",
            "description": ""
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "attribute",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get Product Count\",\n      \"data\": {\n      \"productCount\": 100,\n      \"maximumProductPrice\": \"100000.00\"\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/store-list/product-count"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "product count error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/store/controllers/CommonListController.ts",
    "groupTitle": "Store_List",
    "name": "GetApiStoreListProductCount"
  },
  {
    "type": "get",
    "url": "/api/store-list/product-detail/:slug",
    "title": "Product Details",
    "group": "Store_List",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "slug",
            "description": "<p>slug</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully got the complete list of products.\",\n     \"status\": \"1\",\n     \"data\":  {\n              \"createdDate\": \"2024-06-03T09:45:31.000Z\",\n              \"productId\": 1136,\n              \"sku\": \"cushion01\",\n              \"upc\": \"1\",\n              \"hsn\": \"\",\n              \"location\": \"\",\n              \"quantity\": 290,\n              \"minimumQuantity\": 1,\n              \"subtractStock\": 1,\n              \"stockStatusId\": 1,\n              \"quotationAvailable\": 0,\n              \"image\": \"\",\n              \"imagePath\": \"\",\n              \"manufacturerId\": \"\",\n              \"shipping\": \"\",\n              \"serviceCharges\": \"{\\\"productCost\\\":348,\\\"packingCost\\\":0,\\\"shippingCost\\\":0,\\\"tax\\\":0,\\\"others\\\":0}\",\n              \"taxType\": 1,\n              \"taxValue\": 40,\n              \"price\": \"455.00\",\n              \"priceUpdateFileLogId\": \"\",\n              \"dateAvailable\": \"2024-06-13T00:00:00.000Z\",\n              \"sortOrder\": 1,\n              \"name\": \"Polyester Cushion\",\n              \"description\": \"\",\n              \"amount\": \"\",\n              \"keywords\": \"~ Outdoor cushions~,~Polyester Cushion~\",\n              \"discount\": \"\",\n              \"deleteFlag\": 0,\n              \"isFeatured\": \"\",\n              \"todayDeals\": \"\",\n              \"condition\": \"\",\n              \"rating\": \"4.20\",\n              \"wishListStatus\": 0,\n              \"productSlug\": \"polyester-cushion\",\n              \"isActive\": 1,\n              \"width\": \"0.00\",\n              \"height\": \"0.00\",\n              \"length\": \"0.00\",\n              \"weight\": \"0.00\",\n              \"hasStock\": 1,\n              \"priceType\": 1,\n              \"isSimplified\": 0,\n              \"owner\": 2,\n              \"isCommon\": 0,\n              \"skuId\": 1231,\n              \"hasTirePrice\": 0,\n              \"outOfStockThreshold\": 1,\n              \"notifyMinQuantity\": 1,\n              \"minQuantityAllowedCart\": 1,\n              \"maxQuantityAllowedCart\": 5,\n              \"enableBackOrders\": \"\",\n              \"pincodeBasedDelivery\": 0,\n              \"attributeKeyword\": \"\",\n              \"settedAsCommonOn\": \"\",\n              \"productHighlights\": [\n                  {\n                      \"data\": \"\"\n                 }\n              ],\n              \"productTranslation\": [],\n              \"productNameTrans\": \"\",\n              \"productDescriptionTrans\": \"\",\n              \"ratingCount\": 0,\n              \"reviewCount\": \"null\",\n              \"productImage\": [\n                  {\n                      \"productId\": 1136,\n                      \"image\": \"cushion 2_1717407705308.jpeg\",\n                      \"containerName\": \"\",\n                      \"defaultImage\": 0\n                  },\n              ],\n              \"productOriginalImage\": [\n                  {\n                      \"productId\": 1136,\n                      \"image\": \"cushion 2_1717407705308.jpeg\",\n                      \"containerName\": \"\",\n                      \"defaultImage\": 0\n                  },\n              ],\n              \"Category\": [\n                  {\n                      \"productId\": 1136,\n                      \"categoryId\": 569,\n                      \"categoryName\": \" Outdoor cushions\",\n                      \"categorySlug\": \"outdoor-cushions1\"\n                  }\n              ],\n              \"productOption\": [],\n              \"skuName\": \"cushion01\",\n              \"variantName\": \"\",\n              \"variantId\": \"\",\n              \"stockStatus\": \"inStock\",\n              \"pricerefer\": \"\",\n              \"flag\": \"\",\n              \"productTirePrices\": [],\n              \"vendorId\": 9,\n              \"vendorName\": \"Stella Mechenzi\",\n              \"vendorCompanyName\": \"Van husen Ecommerce pvt lmtd\",\n              \"vendorPrefixId\": \"Ven0009\",\n              \"companyLogo\": \"Img_1722842102100.png\",\n              \"companyLogoPath\": \"logo/\",\n              \"vendorCompanyCity\": \"Chennai\",\n              \"vendorDisplayNameUrl\": \"fathimasilks\",\n              \"vendorSlugName\": \"stella-mechenzi-1\",\n              \"companyTaxNumber\": \"3556676888\",\n              \"vendorCompanyCountry\": \"India\",\n              \"buyed\": 0,\n              \"productVideo\": {\n                  \"id\": 1553,\n                  \"productId\": 1136,\n                  \"name\": \"\",\n                  \"path\": \"\",\n                  \"type\": 0\n              }\n }\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/store-list/product-detail/:slug"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Address error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/store/controllers/CommonListController.ts",
    "groupTitle": "Store_List",
    "name": "GetApiStoreListProductDetailSlug"
  },
  {
    "type": "get",
    "url": "/api/store-list/specific-category",
    "title": "Specific Category List",
    "group": "Store_List",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "categorySlug",
            "description": "<p>categorySlug</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"parentInt\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Category listed successfully..!\",\n     \"status\": \"1\",\n     \"data\" : {\n             \"createdBy\": \"\",\n             \"createdDate\": \"\",\n             \"modifiedBy\": \"\",\n             \"modifiedDate\": \"\",\n             \"categoryId\": 1,\n             \"name\": \"\",\n             \"image\": \"\",\n             \"imagePath\": \"\",\n             \"parentInt\": 1,\n             \"sortOrder\": 1,\n             \"categorySlug\": \"\",\n             \"isActive\": 1,\n             \"categoryDescription\": \"\",\n             \"categoryNameTrans\": \"\",\n             \"categoryDescriptionTrans\": \"\",\n             \"children\": [{\n                         \"createdBy\": \"\",\n                         \"createdDate\": \"\",\n                         \"modifiedBy\": \"\",\n                         \"modifiedDate\": \"\",\n                         \"categoryId\": 2,\n                         \"name\": \"\",\n                         \"image\": \"\",\n                         \"imagePath\": \"\",\n                         \"parentInt\": 1,\n                         \"sortOrder\": \"\",\n                         \"categorySlug\": \"\",\n                         \"isActive\": 1,\n                         \"categoryDescription\": \"\",\n                         \"categoryNameTrans\": \"\",\n                         \"categoryDescriptionTrans\": \"\"\n              }]\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/store-list/specific-category"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Category List error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/store/controllers/CommonListController.ts",
    "groupTitle": "Store_List",
    "name": "GetApiStoreListSpecificCategory"
  },
  {
    "type": "get",
    "url": "/api/store-list/zone",
    "title": "Zone List API",
    "group": "Store_List",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>keyword</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "countryId",
            "description": "<p>countryId</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>count should be number or boolean</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"status\": \"1\"\n     \"message\": \"Successfully get zone list\",\n     \"data\":{\n             \"zoneId\": 1\n             \"countryId\": 99\n             \"code\": \"\"\n             \"name\": \"\",\n             \"isActive\": 1\n            }\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/store-list/zone"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Zone error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/store/controllers/CommonListController.ts",
    "groupTitle": "Store_List",
    "name": "GetApiStoreListZone"
  },
  {
    "type": "Get",
    "url": "/api/store-widget/detail/:slug",
    "title": "Widget Detail API",
    "group": "Store_List",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>Limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>Offset</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>count in number or boolean</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"status\": \"1\"\n     \"message\": \"Successfully got widget detail\",\n     \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/store-widget/detail/:slug"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Widget Detail error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/store/controllers/StoreWidgetController.ts",
    "groupTitle": "Store_List",
    "name": "GetApiStoreWidgetDetailSlug"
  },
  {
    "type": "Get",
    "url": "/api/store-widget/list",
    "title": "Widget List",
    "group": "Store_List",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>Limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>Offset</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>count in number or boolean</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"status\": \"1\"\n     \"message\": \"Successfully got widget list\",\n     \"data\": {\n         \"productId\": 1,\n         \"taxType\": \"\",\n         \"taxValue\": \"\",\n         \"name\": \"\",\n         \"price\": 1,\n         \"taxType\": \"\",\n         \"description\": \"\",\n         \"sku\": \"\",\n         \"skuId\": 1,\n         \"isSimplified\": 1,\n         \"upc\": \"\",\n         \"quantity\": 1,\n         \"rating\": 1,\n         \"productSlug\": \"\",\n         \"hasStock\": \"\",\n         \"outOfStockThreshold\": \"\",\n         \"stockStatusId\": \"\",\n         \"createdDate\": \"\",\n         \"sortOrder\": 1,\n         \"containerName\": \"\",\n         \"image\": \"\",\n         \"defaultImage\": \"\",\n         \"taxValue\": \"\",\n         \"skuName\": \"\",\n         \"price\": 1,\n         \"productDiscount\": 1,\n         \"productSpecial\": \"\",\n     }\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/store-widget/list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Widget List error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/store/controllers/StoreWidgetController.ts",
    "groupTitle": "Store_List",
    "name": "GetApiStoreWidgetList"
  },
  {
    "type": "Get",
    "url": "/api/webhook-event",
    "title": "Get WebHook List API",
    "group": "Store_List",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>Limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>Offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>keyword</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>count in number or boolean</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully Got WebHook Event List\",\n     \"data\": \"\"\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/webhook-event"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "GetWebHookList error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "add-ons/WebHook/api/controllers/admin/WebHookEventController.ts",
    "groupTitle": "Store_List",
    "name": "GetApiWebhookEvent"
  },
  {
    "type": "post",
    "url": "/api/store-list/contact-us",
    "title": "Contact Us API",
    "group": "Store_List",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "size": "..255",
            "optional": false,
            "field": "name",
            "description": "<p>Name</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "size": "..96",
            "optional": false,
            "field": "email",
            "description": "<p>Email</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "size": "..15",
            "optional": false,
            "field": "phoneNumber",
            "description": "<p>Phone Number</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "size": "..6",
            "optional": false,
            "field": "message",
            "description": "<p>Message</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"name\" : \"\",\n     \"email\" : \"\",\n     \"phoneNumber\" : \"\",\n     \"message\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Your mail send to admin..!\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/store-list/contact-us"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Contact error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/store/controllers/CommonListController.ts",
    "groupTitle": "Store_List",
    "name": "PostApiStoreListContactUs"
  },
  {
    "type": "Post",
    "url": "/api/webhook-client",
    "title": "Client API",
    "group": "Store_List",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "templateContentDetails",
            "description": "<p>urls</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "event",
            "description": "<p>event</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "recipientMailId",
            "description": "<p>recipientMailId</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "mailSubject",
            "description": "<p>mailSubject</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "isAttachment",
            "description": "<p>isAttachment</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "attachmentDetails",
            "description": "<p>attachmentDetails</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "bcc",
            "description": "<p>bcc</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "/api/webhook-event/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "web HookUpdate error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "add-ons/WebHook/api/controllers/internal/WebHookClientController.ts",
    "groupTitle": "Store_List",
    "name": "PostApiWebhookClient"
  },
  {
    "type": "Put",
    "url": "/api/webhook-event/:id",
    "title": "Get WebHook List API",
    "group": "Store_List",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "urls",
            "description": "<p>urls</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "isActive",
            "description": "<p>isActive</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>keyword</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully Updated WebHook Event ..!\",\n      \"data\": {\n      \"id\": 1,\n      \"url\": \"\",\n      \"isActive\": 1\n      }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/webhook-event/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "web HookUpdate error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "add-ons/WebHook/api/controllers/admin/WebHookEventController.ts",
    "groupTitle": "Store_List",
    "name": "PutApiWebhookEventId"
  },
  {
    "type": "Get",
    "url": "/api/store-widget/menu-name",
    "title": "Widget Name List",
    "group": "Store_Widget",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Got widget name list successfully!\",\n     \"data\": {\n         \"widgetId\": 1,\n         \"widgetTitle\": \"\",\n         \"widgetSlugName\": \"\"\n     }\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/store-widget/menu-name"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Widget Name List error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/store/controllers/StoreWidgetController.ts",
    "groupTitle": "Store_Widget",
    "name": "GetApiStoreWidgetMenuName"
  },
  {
    "type": "get",
    "url": "/api/customer/wishlist-product-list",
    "title": "Wishlist Product List",
    "group": "Store_Wishlist",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>count in number or boolean</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully show the wishlist Product List\",\n     \"status\": \"1\",\n     \"data\": {\n             \"wishlistProductId\": \"\",\n             \"productId\": \"\",\n             \"taxType\": \"\",\n             \"taxValue\": \"\",\n             \"name\": \"\",\n             \"price\": \"\",\n             \"quantity\": \"\",\n             \"description\": \"\",\n             \"dateAvailable\": \"\",\n             \"sku\": \"\",\n             \"skuId\": \"\",\n             \"sortOrder\": \"\",\n             \"isSimplified\": \"\",\n             \"upc\": \"\",\n             \"rating\": \"\",\n             \"isActive\": \"\",\n             \"productSlug\": \"\",\n             \"hasStock\": \"\",\n             \"outOfStockThreshold\": \"\",\n             \"stockStatusId\": \"\",\n             \"createdDate\": \"\",\n             \"keywords\": \"\",\n             \"containerName\": \"\",\n             \"image\": \"\",\n             \"defaultImage\": \"\",\n             \"ratingCount\": \"\",\n             \"reviewCount\": \"\",\n             \"skuName\": \"\",\n             \"productDiscount\": \"\",\n             \"productSpecial\": \"\",\n             \"productNameTrans\": \"\",\n             \"productDescriptionTrans\": \"\",\n             \"pricerefer\": \"\",\n             \"flag\": \"\",\n             \"stockStatus\": \"\"\n  }\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/customer/wishlist-product-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Wishlist Product List error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/store/controllers/CustomerWishListController.ts",
    "groupTitle": "Store_Wishlist",
    "name": "GetApiCustomerWishlistProductList"
  },
  {
    "type": "get",
    "url": "/api/orders/get-order-payment-status",
    "title": "Get Payment Status",
    "group": "Store_order",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "orderPrefixId",
            "description": "<p>orderPrefixId</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"orderPrefixId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully got order payment status..!!\",\n     \"status\": \"1\",\n     \"data\": {\n     \"orderPrefixId\": \"\",\n     \"paymentStatus\": \"\",\n     \"paymentType\": \"\"\n     }\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/orders/get-order-payment-status"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Store order error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/store/controllers/CustomerOrderController.ts",
    "groupTitle": "Store_order",
    "name": "GetApiOrdersGetOrderPaymentStatus"
  },
  {
    "type": "get",
    "url": "/api/orders/order-cancel-reason-list",
    "title": "Order Cancel Reason List",
    "group": "Store_order",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>Limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>Offset</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>count in number or boolean</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"limit\" : \"\",\n     \"offset\": \"\",\n     \"count\": \"\",\n}",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully Listed..!\",\n     \"status\": \"1\",\n     \"data\": {\n     \"id\": \"\",\n     \"reason\": \"\"\n     }\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/orders/order-cancel-reason-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "order cancel reason List error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/store/controllers/CustomerOrderController.ts",
    "groupTitle": "Store_order",
    "name": "GetApiOrdersOrderCancelReasonList"
  },
  {
    "type": "get",
    "url": "/api/orders/order-export-pdf",
    "title": "Order Export PDF API",
    "group": "Store_order",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "orderProductId",
            "description": "<p>Order Product Id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"orderProductId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully show the Order Detail..!!\",\n     \"status\": \"1\",\n     \"data\": {},\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/orders/order-export-pdf"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Order Detail error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/store/controllers/CustomerOrderController.ts",
    "groupTitle": "Store_order",
    "name": "GetApiOrdersOrderExportPdf"
  },
  {
    "type": "get",
    "url": "/api/orders/track-order-product",
    "title": "Track Order",
    "group": "Store_order",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "orderProductId",
            "description": "<p>Order Product Id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"orderProductId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully show the Track Order..!!\",\n     \"status\": \"1\",\n     \"data\": {\n     \"basePrice\": \"\",\n     \"taxValue\": \"\",\n     \"taxType\": \"\",\n     \"orderProductId\": \"\",\n     \"orderId\": \"\",\n     \"productId\": ,\n     \"orderProductPrefixId\": \"\",\n     \"trackingId\": \"\",\n     \"trackingUrl\": \"\",\n     \"productName\": \"\",\n     \"productNameTrans\": \"\",\n     \"productDescriptionTrans\": \"\",\n     \"productPrice\": \"\",\n     \"discountAmount\": \"\",\n     \"discountedAmount\": \"\",\n     \"couponDiscountAmount\": \"\",\n     \"skuName\": \"\",\n     \"total\": \"\",\n     \"orderStatusDate\": \"\",\n     \"orderStatus\": \"\",\n     \"productQuantity\": ,\n     \"shippingAddress1\": \"\",\n     \"shippingAddress2\": \"\",\n     \"shippingCity\": \"\",\n     \"shippingPostcode\": \"\",\n     \"shippingZone\": \"\",\n     \"currencySymbolLeft\": \"\",\n     \"currencySymbolRight\": \"\",\n     \"orderPrefixId\": \"\",\n     \"productImage\": \"\",\n     \"containerName\": \"\",\n     \"deliveryStatus\": [\n      {\n          \"orderStatusId\": \"\",\n          \"name\": \"\",\n          \"createdDate\": \"\"\n      }]\n  }\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/orders/track-order-product"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Track Order error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/store/controllers/CustomerOrderController.ts",
    "groupTitle": "Store_order",
    "name": "GetApiOrdersTrackOrderProduct"
  },
  {
    "type": "get",
    "url": "/api/vendor-order/order",
    "title": "Put Update Order",
    "group": "Store_order",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "isBackOrder",
            "description": "<p>isBackOrder</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "vendorOrderIds",
            "description": "<p>vendorOrderIds</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"isBackOrder\" : \"\",\n     \"vendorOrderIds\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully Updated Order..!\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-order/order"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Store order error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/VendorOrderController.ts",
    "groupTitle": "Store_order",
    "name": "GetApiVendorOrderOrder"
  },
  {
    "type": "post",
    "url": "/api/orders/back-order-checkout",
    "title": "Back Order Checkout",
    "group": "Store_order",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "productDetail",
            "description": "<p>Product Details</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": true,
            "field": "paymentMethod",
            "description": "<p>paymentMethod</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "size": "1..32",
            "optional": false,
            "field": "shippingFirstName",
            "description": "<p>Shipping First name</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "size": "..32",
            "optional": false,
            "field": "shippingLastName",
            "description": "<p>Shipping Last Name</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "shippingCompany",
            "description": "<p>Shipping Company</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "size": "..128",
            "optional": false,
            "field": "shippingAddress_1",
            "description": "<p>Shipping Address 1</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "size": "..128",
            "optional": true,
            "field": "shippingAddress_2",
            "description": "<p>Shipping Address 2</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "size": "..128",
            "optional": false,
            "field": "shippingCity",
            "description": "<p>Shipping City</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "size": "..10",
            "optional": false,
            "field": "shippingPostCode",
            "description": "<p>Shipping PostCode</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "shippingCountryId",
            "description": "<p>ShippingCountryId</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "size": "..128",
            "optional": false,
            "field": "shippingZone",
            "description": "<p>Shipping Zone</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "shippingAddressFormat",
            "description": "<p>Shipping Address Format</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "paymentFirstName",
            "description": "<p>Payment First name</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "PaymentLastName",
            "description": "<p>Payment Last Name</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "PaymentCompany",
            "description": "<p>Payment Company</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "paymentAddress_1",
            "description": "<p>Payment Address 1</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "paymentAddress_2",
            "description": "<p>Payment Address 2</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "paymentCity",
            "description": "<p>Payment City</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "paymentPostCode",
            "description": "<p>Payment PostCode</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "paymentCountryId",
            "description": "<p>PaymentCountryId</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "paymentZone",
            "description": "<p>Payment Zone</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "phoneNumber",
            "description": "<p>Customer Phone Number</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "size": "..96",
            "optional": false,
            "field": "emailId",
            "description": "<p>Customer Email Id</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Customer password</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "couponCode",
            "description": "<p>couponCode</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "couponDiscountAmount",
            "description": "<p>couponDiscountAmount</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "couponData",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"productDetail\" :[\n     {\n     \"productId\" : \"\",\n     \"quantity\" : \"\",\n     \"price\" : \"\",\n     \"model\" : \"\",\n     \"name\" : \"\",\n     \"skuName\" : \"\",\n     }],\n     \"shippingFirstName\" : \"\",\n     \"shippingLastName\" : \"\",\n     \"shippingCompany\" : \"\",\n     \"shippingAddress_1\" : \"\",\n     \"shippingAddress_2\" : \"\",\n     \"shippingCity\" : \"\",\n     \"shippingPostCode\" : \"\",\n     \"shippingCountryId\" : \"\",\n     \"shippingZone\" : \"\",\n     \"shippingAddressFormat\" : \"\",\n     \"paymentFirstName\" : \"\",\n     \"paymentLastName\" : \"\",\n     \"paymentCompany\" : \"\",\n     \"paymentAddress_1\" : \"\",\n     \"paymentAddress_2\" : \"\",\n     \"paymentCity\" : \"\",\n     \"paymentPostCode\" : \"\",\n     \"paymentCountryId\" : \"\",\n     \"paymentZone\" : \"\",\n     \"phoneNumber\" : \"\",\n     \"emailId\" : \"\",\n     \"password\" : \"\",\n     \"paymentMethod\" : \"\",\n     \"vendorId\" : \"\",\n     \"couponCode\" : \"\",\n     \"couponDiscountAmount\" : \"\",\n     \"couponData\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Check Out the product successfully And Send order detail in your mail ..!!\",\n     \"status\": \"1\"\n     \"data\" : {\n      \"createdBy\": \"\",\n      \"createdDate\": \"\",\n      \"modifiedBy\": \"\",\n      \"modifiedDate\": \"\",\n      \"orderId\": \"\",\n      \"customerId\": \"\",\n      \"currencyId\": \"\",\n      \"shippingZoneId\": \"\",\n      \"paymentZoneId\": \"\",\n      \"shippingCountryId\": \"\",\n      \"paymentCountryId\": \"\",\n      \"invoiceNo\": \"\",\n      \"invoicePrefix\": \"\",\n      \"firstname\": \"\",\n      \"lastname\": \"\",\n      \"email\": \"\",\n      \"telephone\": \"\",\n      \"fax\": \"\",\n      \"shippingFirstname\": \"\",\n      \"shippingLastname\": \"\",\n      \"shippingCompany\": \"\",\n      \"shippingAddress1\": \"\",\n      \"shippingAddress2\": \"\",\n      \"shippingCity\": \"\",\n      \"shippingPostcode\": \"\",\n      \"shippingCountry\": \"\",\n      \"shippingZone\": \"\",\n      \"shippingAddressFormat\": \"\",\n      \"shippingMethod\": \"\",\n      \"paymentFirstname\": \"\",\n      \"paymentLastname\": \"\",\n      \"paymentCompany\": \"\",\n      \"paymentAddress1\": \"\",\n      \"paymentAddress2\": \"\",\n      \"paymentCity\": \"\",\n      \"paymentPostcode\": \"\",\n      \"paymentCountry\": \"\",\n      \"paymentZone\": \"\",\n      \"paymentAddressFormat\": \"\",\n      \"paymentMethod\": \"\",\n      \"comment\": \"\",\n      \"couponCode\": \"\",\n      \"discountAmount\": \"\",\n      \"amount\": \"\",\n      \"total\": \"\",\n      \"reward\": \"\",\n      \"orderStatusId\": \"\",\n      \"orderPrefixId\": \"\",\n      \"affiliateId\": \"\",\n      \"commision\": \"\",\n      \"currencyCode\": \"\",\n      \"currencyValue\": \"\",\n      \"currencySymbolLeft\": \"\",\n      \"currencySymbolRight\": \"\",\n      \"ip\": \"\",\n      \"paymentFlag\": \"\",\n      \"paymentStatus\": \"\",\n      \"trackingUrl\": \"\",\n      \"trackingNo\": \"\",\n      \"orderName\": \"\",\n      \"paymentType\": \"\",\n      \"paymentProcess\": \"\",\n      \"paymentDetails\": \"\",\n      \"backOrders\": \"\",\n      \"isActive\": \"\",\n      \"customerGstNo\": \"\",\n      \"productDetail\": [\n      {\n       \"createdBy\": \"\",\n       \"createdDate\": \"\",\n       \"modifiedBy\": \"\",\n       \"modifiedDate\": \"\",\n       \"orderProductId\": \"\",\n       \"productId\": \"\",\n       \"orderProductPrefixId\": \"\",\n       \"orderId\": \"\",\n       \"name\": \"\",\n       \"model\": \"\",\n       \"quantity\": \"\",\n      \"productPrice\": \"\",\n      \"discountAmount\": \"\",\n      \"basePrice\": \"\",\n      \"taxType\": \"\",\n      \"taxValue\": \"\",\n      \"total\": \"\",\n      \"discountedAmount\": \"\",\n      \"orderStatusId\": \"\",\n      \"trackingUrl\": \"\",\n      \"trackingNo\": \"\",\n      \"trace\": \"\",\n      \"tax\": \"\",\n      \"cancelRequest\": \"\",\n      \"cancelRequestStatus\": \"\",\n      \"cancelReason\": \"\",\n      \"cancelReasonDescription\": \"\",\n      \"isActive\": \"\",\n      \"skuName\": \"\",\n      \"couponDiscountAmount\": \"\",\n      \"image\": {\n          \"createdBy\": \"\",\n          \"createdDate\": \"\",\n          \"modifiedBy\": \"\",\n          \"modifiedDate\": \"\",\n          \"productImageId\": \"\",\n          \"productId\": \"\",\n          \"image\": \"\",\n          \"containerName\": \"\",\n          \"sortOrder\": \"\",\n          \"defaultImage\": \"\",\n          \"isActive\": \"\"\n      }\n   }\n  ]\n}\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/orders/back-order-checkout"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Checkout error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/store/controllers/CustomerOrderController.ts",
    "groupTitle": "Store_order",
    "name": "PostApiOrdersBackOrderCheckout"
  },
  {
    "type": "post",
    "url": "/api/orders/customer-checkout",
    "title": "Checkout",
    "group": "Store_order",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "productDetail",
            "description": "<p>Product Details</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "paymentMethod",
            "description": "<p>paymentMethod</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "size": "1..32",
            "optional": false,
            "field": "shippingFirstName",
            "description": "<p>Shipping First name</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "size": "..32",
            "optional": true,
            "field": "shippingLastName",
            "description": "<p>Shipping Last Name</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "size": "..32",
            "optional": true,
            "field": "shippingCompany",
            "description": "<p>Shipping Company</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "size": "..128",
            "optional": false,
            "field": "shippingAddress_1",
            "description": "<p>Shipping Address 1</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "size": "..128",
            "optional": true,
            "field": "shippingAddress_2",
            "description": "<p>Shipping Address 2</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "size": "..128",
            "optional": false,
            "field": "shippingCity",
            "description": "<p>Shipping City</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "size": "..10",
            "optional": false,
            "field": "shippingPostCode",
            "description": "<p>Shipping PostCode</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "shippingCountryId",
            "description": "<p>ShippingCountryId</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "size": "..128",
            "optional": false,
            "field": "shippingZone",
            "description": "<p>Shipping Zone</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": true,
            "field": "shippingAddressFormat",
            "description": "<p>Shipping Address Format</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "size": "..32",
            "optional": true,
            "field": "paymentFirstName",
            "description": "<p>Payment First name</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "size": "..32",
            "optional": true,
            "field": "PaymentLastName",
            "description": "<p>Payment Last Name</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "size": "..32",
            "optional": true,
            "field": "PaymentCompany",
            "description": "<p>Payment Company</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "size": "..128",
            "optional": true,
            "field": "paymentAddress_1",
            "description": "<p>Payment Address 1</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "size": "..128",
            "optional": true,
            "field": "paymentAddress_2",
            "description": "<p>Payment Address 2</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "size": "..10",
            "optional": true,
            "field": "paymentCity",
            "description": "<p>Payment City</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "size": "..10",
            "optional": true,
            "field": "paymentPostCode",
            "description": "<p>Payment PostCode</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": true,
            "field": "paymentCountryId",
            "description": "<p>PaymentCountryId</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "size": "..128",
            "optional": true,
            "field": "paymentZone",
            "description": "<p>Payment Zone</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "size": "..15",
            "optional": false,
            "field": "phoneNumber",
            "description": "<p>Customer Phone Number</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "size": "..96",
            "optional": false,
            "field": "emailId",
            "description": "<p>Customer Email Id</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": true,
            "field": "password",
            "description": "<p>Customer password</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "size": "..255",
            "optional": true,
            "field": "couponCode",
            "description": "<p>couponCode</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": true,
            "field": "couponDiscountAmount",
            "description": "<p>couponDiscountAmount</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": true,
            "field": "couponData",
            "description": ""
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": true,
            "field": "gstNo",
            "description": "<p>gstNo</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"productDetails\" :[\n     {\n     \"productId\" : \"\",\n     \"quantity\" : \"\",\n     \"price\" : \"\",\n     \"model\" : \"\",\n     \"name\" : \"\",\n     \"skuName\" : \"\",\n     \"vendorId\" : \"\",\n     \"skuId\":\"\"\n     }],\n     \"shippingFirstName\" : \"\",\n     \"shippingLastName\" : \"\",\n     \"shippingCompany\" : \"\",\n     \"shippingAddress_1\" : \"\",\n     \"shippingAddress_2\" : \"\",\n     \"shippingCity\" : \"\",\n     \"shippingPostCode\" : \"\",\n     \"shippingCountryId\" : \"\",\n     \"shippingZone\" : \"\",\n     \"paymentFirstName\" : \"\",\n     \"paymentLastName\" : \"\",\n     \"paymentRuleId\": \"\",\n     \"paymentCompany\" : \"\",\n     \"paymentAddress_1\" : \"\",\n     \"paymentAddress_2\" : \"\",\n     \"paymentCity\" : \"\",\n     \"paymentPostCode\" : \"\",\n     \"paymentCountryId\" : \"\",\n     \"paymentZone\" : \"\",\n     \"shippingAddressFormat\" : \"\",\n     \"phoneNumber\" : \"\",\n     \"emailId\" : \"\",\n     \"password\" : \"\",\n     \"paymentMethod\" : \"\",\n     \"vendorId\" : \"\",\n     \"couponCode\" : \"\",\n     \"couponDiscountAmount\" : \"\",\n     \"couponData\" : \"\",\n     \"orderSource\":\"\",\n     \"quoteRequestId\":\"\",\n     \"quoteId\":\"\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Check Out the product successfully And Send order detail in your mail ..!!\",\n     \"status\": \"1\".\n     \"data\": {\n             \"createdBy\": \"\",\n             \"createdDate\": \"\",\n             \"modifiedBy\": \"\",\n             \"modifiedDate\": \"\",\n             \"orderId\": \"\",\n             \"customerId\": \"\",\n             \"currencyId\": \"\",\n             \"shippingZoneId\": \"\",\n             \"paymentZoneId\": \"\",\n             \"shippingCountryId\": \"\",\n             \"paymentCountryId\": \"\",\n             \"invoiceNo\": \"\",\n             \"invoicePrefix\": \"\",\n             \"firstname\": \"\",\n             \"lastname\": \"\",\n             \"email\": \"\",\n             \"telephone\": \"\",\n             \"fax\": \"\",\n             \"shippingFirstname\": \"\",\n             \"shippingLastname\": \"\",\n             \"shippingCompany\": \"\",\n             \"shippingAddress1\": \"\",\n             \"shippingAddress2\": \"\",\n             \"shippingCity\": \"\",\n             \"shippingPostcode\": \"\",\n             \"shippingCountry\": \"\",\n             \"shippingZone\": \"\",\n             \"shippingAddressFormat\": \"\",\n             \"shippingMethod\": \"\",\n             \"paymentFirstname\": \"\",\n             \"paymentLastname\": \"\",\n             \"paymentCompany\": \"\",\n             \"paymentAddress1\": \"\",\n             \"paymentAddress2\": \"\",\n             \"paymentCity\": \"\",\n             \"paymentPostcode\": \"\",\n             \"paymentCountry\": ,\n             \"paymentZone\": \"\",\n             \"paymentAddressFormat\": \"\",\n             \"paymentMethod\": \"\",\n             \"comment\": \"\",\n             \"couponCode\": \"\",\n             \"discountAmount\": \"\",\n             \"amount\": \"\",\n             \"total\": \"\",\n             \"reward\": \"\",\n             \"orderStatusId\": \"\",\n             \"orderPrefixId\": \"\",\n             \"affiliateId\": \"\",\n             \"commision\": \"\",\n             \"currencyCode\": \"\",\n             \"currencyValue\": \"\",\n             \"currencySymbolLeft\": \"\",\n             \"currencySymbolRight\": \"\",\n             \"ip\": \"\",\n             \"paymentFlag\": \"\",\n             \"paymentStatus\": \"\",\n             \"trackingUrl\": \"\",\n             \"trackingNo\": \"\",\n             \"orderName\": \"\",\n             \"paymentType\": \"\",\n             \"paymentProcess\": \"\",\n             \"paymentDetails\": \"\",\n             \"backOrders\": \"\",\n             \"isActive\": \"\",\n             \"customerGstNo\": \"\",\n             \"productDetail\": [\n               {\n                   \"createdBy\": \"\",\n                   \"createdDate\": \"\",\n                   \"modifiedBy\": \"\",\n                   \"modifiedDate\": \"\",\n                   \"orderProductId\": \"\",\n                   \"productId\": \"\",\n                   \"orderProductPrefixId\": \"\",\n                   \"orderId\": \"\",\n                   \"name\": \"\",\n                   \"model\": \"\",\n                   \"quantity\": ,\n                   \"productPrice\": \"\",\n                   \"discountAmount\": \"\",\n                   \"basePrice\": \"\",\n                   \"taxType\": \"\",\n                   \"taxValue\": \"\",\n                   \"total\": \"\",\n                   \"discountedAmount\": \"\",\n                   \"orderStatusId\": \"\",\n                   \"cancelRequestStatus\": \"\",\n                   \"cancelReason\": \"\",\n                   \"cancelReasonDescription\": \"\",\n                   \"isActive\": \"\",\n                   \"skuName\": \"\",\n                   \"couponDiscountAmount\": \"\",\n                   \"image\": {\n                       \"createdBy\": \"\",\n                       \"createdDate\": \"\",\n                       \"modifiedBy\": \"\",\n                       \"modifiedDate\": \"\",\n                       \"productImageId\": \"\",\n                       \"productId\": \"\",\n                       \"image\": \"\",\n                       \"containerName\": \"\",\n                       \"sortOrder\": \"\",\n                       \"defaultImage\": \"\",\n                       \"isActive\":\"\"\n                   }\n                 }]\n               }\n }",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/orders/customer-checkout"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Checkout error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/store/controllers/CustomerOrderController.ts",
    "groupTitle": "Store_order",
    "name": "PostApiOrdersCustomerCheckout"
  },
  {
    "type": "post",
    "url": "/api/orders/order-cancel-request",
    "title": "Order Cancel Request API",
    "group": "Store_order",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": true,
            "field": "description",
            "description": ""
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "orderProductId",
            "description": ""
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "reasonId",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"description\" : \"\",\n     \"orderProductId\" : \"\",\n     \"reasonId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully posted your cancel request\",\n     \"status\": \"1\",\n     \"data\": {\n             \"createdBy\": \"\",\n             \"createdDate\": \"\",\n             \"modifiedBy\": \"\",\n             \"modifiedDate\": \"\",\n             \"orderProductId\": \"\",\n             \"productId\": '\"\",\n             \"orderProductPrefixId\": \"\",\n             \"orderId\": \"\",\n             \"name\": \"\",\n             \"model\": \"\",\n             \"quantity\": \"\",\n             \"productPrice\": \"\",\n             \"discountAmount\": \"\",\n             \"basePrice\": \"\",\n             \"taxType\": \"\",\n             \"taxValue\": \"\",\n             \"total\": \"\",\n             \"discountedAmount\": \"\",\n             \"orderStatusId\": \"\",\n             \"trackingUrl\": \"\",\n             \"trackingNo\": \"\",\n             \"trace\": \"\",\n             \"tax\": \"\",\n             \"cancelRequest\": \"\",\n             \"cancelRequestStatus\": \"\",\n             \"cancelReason\": \"\",\n             \"cancelReasonDescription\": \" \",\n             \"isActive\": \"\",\n             \"skuName\": \"\",\n             \"couponDiscountAmount\": \"\"\n }\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/orders/order-cancel-request"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Order Cancel Request error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/store/controllers/CustomerOrderController.ts",
    "groupTitle": "Store_order",
    "name": "PostApiOrdersOrderCancelRequest"
  },
  {
    "type": "Post",
    "url": "/api/product-store/rating",
    "title": "Add Rating  API",
    "group": "Store_order",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "productId",
            "description": ""
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "skuName",
            "description": ""
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "orderProductId",
            "description": ""
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "reviews",
            "description": "<p>productReviews</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "image",
            "description": "<p>image</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "rating",
            "description": "<p>productRatings</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"productId\": 1,\n     \"skuId\": 1,\n     \"orderProductId\": 1,\n     \"reviews\": \"\",\n     \"image\": \"\",\n     \"rating\": 1\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully created your ratings and reviews!!\",\n     \"status\": \"1\",\n     \"data\": {},\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/product-store/rating"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "rating error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/store/controllers/StoreRatingController.ts",
    "groupTitle": "Store_order",
    "name": "PostApiProductStoreRating"
  },
  {
    "type": "Post",
    "url": "/api/product-store/review",
    "title": "Add Reviews  API",
    "group": "Store_order",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "productId",
            "description": "<p>productId</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "skuName",
            "description": "<p>skuName</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "orderProductId",
            "description": ""
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "reviews",
            "description": "<p>productReviews</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"productId\": \"\",\n     \"orderProductId\": \"\",\n     \"reviews\": \"\",\n     \"skuId\": \"\",\n     \"rating\": \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully created your reviews.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/product-store/review"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "reviews error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/store/controllers/StoreRatingController.ts",
    "groupTitle": "Store_order",
    "name": "PostApiProductStoreReview"
  },
  {
    "type": "put",
    "url": "/api/orders/retry-payment",
    "title": "Put Retry Payment",
    "group": "Store_order",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "orderPrefixId",
            "description": "<p>orderPrefixId</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "paymentPluginId",
            "description": "<p>paymentPluginId</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "isMobile",
            "description": "<p>isMobile</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"orderPrefixId\" : \"\",\n     \"paymentPluginId\" : \"\",\n     \"isMobile\": \"\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Redirect to this url\",\n     \"status\": \"1\",\n     \"data\": {\n         \"route\": \"\",\n     }\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/orders/retry-payment"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Store order error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/store/controllers/CustomerOrderController.ts",
    "groupTitle": "Store_order",
    "name": "PutApiOrdersRetryPayment"
  },
  {
    "type": "delete",
    "url": "/api/customer/wishlist-product-delete/:id",
    "title": "Delete Product From Wishlist",
    "group": "Store_wishlist",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"wishlistProductId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Thank you deleted the product from wishlist successfully.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/customer/wishlist-product-delete/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Wishlist Product Delete error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/store/controllers/CustomerWishListController.ts",
    "groupTitle": "Store_wishlist",
    "name": "DeleteApiCustomerWishlistProductDeleteId"
  },
  {
    "type": "post",
    "url": "/api/customer/add-product-to-wishlist",
    "title": "Add Product To Wishlist",
    "group": "Store_wishlist",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "productId",
            "description": "<p>Product Id</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "productOptionValueId",
            "description": "<p>Product Option Value Id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"productId\" : \"\",\n     \"ProductOptionValueId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"You have Successfully add to wishlist.\",\n     \"status\": \"1\",\n     \"data\": {\n             \"wishlistProductId\": \"\",\n             \"product\": {\n             \"createdBy\": 1,\n             \"createdDate\": \"\",\n             \"modifiedBy\": 1,\n             \"modifiedDate\": \"\",\n             \"productId\": 1,\n             \"sku\": \"\",\n             \"upc\": \"\",\n             \"hsn\": \"\",\n             \"location\": \"\",\n             \"quantity\": 1,\n             \"minimumQuantity\": 1,\n             \"subtractStock\": \"\",\n             \"stockStatusId\": 1,\n             \"quotationAvailable\": 1,\n             \"image\": \"\",\n             \"imagePath\": \"\",\n             \"manufacturerId\": 1,\n             \"shipping\": \"\",\n             \"serviceCharges\": \"\",\n             \"taxType\": 1,\n             \"taxValue\": \"\",\n             \"price\": \"\",\n             \"priceUpdateFileLogId\": 1,\n             \"dateAvailable\": \"\",\n             \"sortOrder\": 1,\n             \"name\": \"\",\n             \"description\": \"\",\n             \"amount\": \"\",\n             \"keywords\": \"\",\n             \"discount\": \"\",\n             \"deleteFlag\": 0,\n             \"isFeatured\": 1,\n             \"todayDeals\": \"\",\n             \"condition\": \"\",\n             \"rating\": \"\",\n             \"wishListStatus\": 1,\n             \"productSlug\": \"\",\n             \"isActive\": 1,\n             \"width\": \"\",\n             \"height\": \"\",\n             \"length\": \"\",\n             \"weight\": \"\",\n             \"hasStock\": 1,\n             \"priceType\": \"\",\n             \"isSimplified\": 1,\n             \"owner\": \"\",\n             \"isCommon\": 1,\n             \"skuId\": \"\",\n             \"hasTirePrice\": 1,\n             \"outOfStockThreshold\": 1,\n             \"notifyMinQuantity\": \"\",\n             \"minQuantityAllowedCart\": \"\",\n             \"maxQuantityAllowedCart\": \"\",\n             \"enableBackOrders\": \"\",\n             \"pincodeBasedDelivery\": \"\",\n             \"attributeKeyword\": \"\",\n             \"settedAsCommonOn\": \"\",\n             \"productHighlights\":\"\",\n             },\n             \"productImage\": {\n                \"createdBy\": ,\n                \"createdDate\": \"\",\n                \"modifiedBy\": ,\n                \"modifiedDate\": \"\",\n                \"productImageId\": 1,\n                \"productId\": 1,\n                \"image\": \"\",\n                \"containerName\": \"\",\n                \"sortOrder\": ,\n                \"defaultImage\": ,\n                \"isActive\": 1\n    }\n  }\n }\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/customer/add-product-to-wishlist"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Add Product To Wishlist error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/store/controllers/CustomerWishListController.ts",
    "groupTitle": "Store_wishlist",
    "name": "PostApiCustomerAddProductToWishlist"
  },
  {
    "type": "post",
    "url": "/api/suggestion-keyword/create",
    "title": "Create Keyword Mapping",
    "group": "Suggestion_Keyword",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/api/store/controllers/StoreKeywordController.ts",
    "groupTitle": "Suggestion_Keyword",
    "name": "PostApiSuggestionKeywordCreate"
  },
  {
    "type": "Get",
    "url": "/api/variant-translation/variant",
    "title": "Variant Translation List API",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "group": "Variant_Translation",
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n \"status\": 1,\n \"message\": \"Successfully Got Variant Translations..!\",\n \"data\": [\n {\n   \"id\": 1,\n   \"name\": \"\",\n   \"variantTranslation\": [\n     {\n       \"id\": 1,\n       \"name\": \"\",\n       \"modifiedDate\": \"\"\n     }\n    ]\n }\n \"lastModifieDate\": \"\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/variant-translation/variant"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "AttributeTranslationList error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/MasterVariantTranslationController.ts",
    "groupTitle": "Variant_Translation",
    "name": "GetApiVariantTranslationVariant"
  },
  {
    "type": "Get",
    "url": "/api/variant-translation/variant/:id",
    "title": "Variant Language Detail API",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "group": "Variant_Translation",
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n \"status\": 1,\n \"message\": \"Successfully Got Variant Translation Detail..!\",\n \"data\": {\n     \"id\": 1,\n     \"name\": \"\",\n     \"variantTranslation\": [\n       {\n         \"id\": 1,\n         \"name\": \"\",\n         \"languageId\": 1\n       }\n     ]\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/variant-translation/variant/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "AttributeTranslationn error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/MasterVariantTranslationController.ts",
    "groupTitle": "Variant_Translation",
    "name": "GetApiVariantTranslationVariantId"
  },
  {
    "type": "Post",
    "url": "/api/variant-translation/variant/:id",
    "title": "Variant Language Create API",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "group": "Variant_Translation",
    "parameter": {
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"variantTranslation\": [\n         {\n             \"name\": \"\",\n             \"languageId\": 1,\n         }\n      ],\n     \"variantValues\": [\n         {\n             \"variantValueId\": 1,\n             \"variantValueTranslation\": [\n                 {\n                     \"languageId': 1,\n                     \"value\": \"\"\n                 }\n             ]\n         }\n     ]\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n \"status\": 1,\n \"message\": \"Successfully Saved Variant Translation..!\"\",\n  \"data\": {\n   \"attributeTranslation\": [\n     {\n       \"id\": 1,\n       \"variantId\": 1,\n       \"name\": \"\",\n       \"languageId\": 1\n     }\n   ],\n   \"variantValues\": [\n     {\n       \"variantValueId\": 1,\n       \"variantValueAliases\": [\n         {\n           \"id\": 1,\n           \"value\": \"\",\n           \"variantValueId\": 1,\n           \"languageId\": 1\n         }\n       ]\n     }\n    ]\n  }\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/variant-translation/variant/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Variant Translation error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/MasterVariantTranslationController.ts",
    "groupTitle": "Variant_Translation",
    "name": "PostApiVariantTranslationVariantId"
  },
  {
    "type": "Delete",
    "url": "/api/variants/:id",
    "title": "Delete Varient API",
    "group": "Variants",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully deleted variant.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/variants/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "deleteVariant error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/MasterVariantsController.ts",
    "groupTitle": "Variants",
    "name": "DeleteApiVariantsId"
  },
  {
    "type": "Get",
    "url": "/api/variants",
    "title": "Variant List API",
    "group": "Variants",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>count should be number or boolean</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get varient list\",\n     \"data\":{\n         \"id\" : 1,\n         \"name\" : \"\",\n         \"type\" : \"\",\n         \"sortOrder\" : 1,\n         \"variantValues\": []\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/variants"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Variantlist error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/MasterVariantsController.ts",
    "groupTitle": "Variants",
    "name": "GetApiVariants"
  },
  {
    "type": "Get",
    "url": "/api/variants/variant-detail",
    "title": "Variant Detail API",
    "group": "Variants",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully got variant detail.\",\n     \"data\": {\n         \"id\": 1,\n         \"name\": \"\",\n         \"sortOrder\": \"\",\n         \"type\": \"\",\n         \"variantValue\": [\n           {\n             \"id\": 1,\n             \"value\": \"\",\n             \"sortOrder\": \"\"\n           },\n           {\n             \"id\": 1,\n             \"value\": \"\",\n             \"sortOrder\": \"\"\n           }\n         ]\n     \"status\": 1\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/variants/variant-detail"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "variant Detail error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/MasterVariantsController.ts",
    "groupTitle": "Variants",
    "name": "GetApiVariantsVariantDetail"
  },
  {
    "type": "Get",
    "url": "/api/vendor-product-variant/variants",
    "title": "Varients List API",
    "group": "Variants",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>count should be number or boolean</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully got the complete list of varients. \",\n     \"data\":{\n     \"id\" : 1,\n     \"name\" : \"\",\n     \"type\" : \"\",\n     \"sortOrder\" : 1,\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-product-variant/variants"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Variantlist error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/VendorProductVariantController.ts",
    "groupTitle": "Variants",
    "name": "GetApiVendorProductVariantVariants"
  },
  {
    "type": "Post",
    "url": "/api/variants",
    "title": "Add Variant API",
    "group": "Variants",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": true,
            "field": "type",
            "description": "<p>type</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "size": "..255",
            "optional": false,
            "field": "name",
            "description": "<p>name</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "sortOrder",
            "description": "<p>sortOrder</p>"
          },
          {
            "group": "Request body",
            "type": "Object",
            "optional": true,
            "field": "variantValue",
            "description": "<p>variantValue</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "variantValue.valueName",
            "description": "<p>valueName</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "variantValue.sortOrder",
            "description": "<p>valueName</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"type\" : \"\",\n     \"name\" : \"\",\n     \"sortOrder\" : \"\",\n     \"variantValue\" : [\n         {\n              \"valueName\" : \"\",\n              \"sortOrder\" : \"\",\n         }\n     ]\n}",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"The vendor variant was created successfully.\",\n     \"data\": {\n         \"name\": \"\",\n         \"sortOrder\": \"\",\n         \"type\": \"\",\n         \"variantValue\": \"\"\n         \"isActive\": 1\n     }\n     \"status\": 1\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/variants"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "createPage error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/MasterVariantsController.ts",
    "groupTitle": "Variants",
    "name": "PostApiVariants"
  },
  {
    "type": "Put",
    "url": "/api/variants/:id",
    "title": "Update Variant API",
    "group": "Variants",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": true,
            "field": "type",
            "description": "<p>type</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>name</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "size": "..9999",
            "optional": false,
            "field": "sortOrder",
            "description": "<p>sortOrder</p>"
          },
          {
            "group": "Request body",
            "type": "Object",
            "optional": true,
            "field": "variantValue",
            "description": "<p>variantValue</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "variantValue.valueName",
            "description": "<p>valueName</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "variantValue.sortOrder",
            "description": "<p>sortOrder</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "variantValue.id",
            "description": "<p>varient value id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"type\" : \"\",\n     \"name\" : \"\",\n     \"sortOrder\" : \"\",\n     \"variantValue\" : [\n         {\n              \"id\" : 1,\n              \"valueName\" : \"\",\n              \"sortOrder\" : \"\",\n         }\n     ]\n}",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \" Variant are updated successfully\",\n     \"data\": {\n       \"id\": 1,\n       \"name\": \"\",\n       \"sortOrder\": 1,\n       \"type\": \"\",\n       \"variantValue\": [\n          {\n            \"id\": 1,\n            \"value\": \"\",\n            \"sortOrder\":\"\"\n          }\n        ]\n      }\n     \"status\": 1\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/variants/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "updateVariants error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/MasterVariantsController.ts",
    "groupTitle": "Variants",
    "name": "PutApiVariantsId"
  },
  {
    "type": "get",
    "url": "/api/vendor-specification/:id",
    "title": "Get Attribute API",
    "group": "Vendor",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>id (Required)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n   \"status\": 1,\n   \"message\": \"Successfully Got attribute\",\n   \"data\": {\n   \"createdBy\": 1,\n   \"createdDate\": \"\",\n   \"modifiedBy\": 1,\n   \"modifiedDate\": \"\",\n   \"id\": 1,\n   \"name\": \"\",\n   \"slug\": \"\",\n   \"isActive\": 1,\n   \"isDelete\": 0,\n   \"attributeGroups\": [\n       {\n           \"id\": 1,\n           \"specificationId\": 1,\n           \"attributeGroupId\": 1,\n           \"attributes\": [\n               {\n                   \"createdBy\": 1,\n                   \"createdDate\": \"\",\n                   \"modifiedBy\": 1,\n                   \"modifiedDate\": \"\",\n                   \"id\": 1,\n                   \"name\": \"\",\n                   \"type\": \"\",\n                   \"sortOrder\": 1,\n                   \"isMandatory\": 1,\n                   \"description\": \"\",\n                   \"label\": \"\",\n                   \"useAsFilter\": \"\",\n                   \"sectionName\": \"\",\n                   \"defaultValue\": \"\",\n                   \"isActive\": 1,\n                   \"isDelete\": 0,\n                   \"attributeValues\": [\n                       {\n                           \"createdBy\": 1,\n                           \"createdDate\": \"\",\n                           \"modifiedBy\": 0,\n                           \"modifiedDate\": \"\",\n                           \"id\": 1,\n                           \"attributeId\": 1,\n                           \"value\": \"\",\n                           \"isActive\": 1,\n                           \"isDelete\": 0\n                    }\n                ]\n             }\n           ]\n        }\n      ]\n   }\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "api/vendor-specification/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Attribute error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/SpecificationController.ts",
    "groupTitle": "Vendor",
    "name": "GetApiVendorSpecificationId"
  },
  {
    "type": "Delete",
    "url": "/api/vendor-product-specification/product/:id",
    "title": "Delete Specification Based on category API",
    "group": "VendorProductSpecification",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "categoryIds",
            "description": "<p>categoryIds</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n   \"categoryIds\": \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n   \"status\": 1,\n   \"message\": \"Categories related specifications deleted successfully.\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-product-specification/product/:id/specifications"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "product specification error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/ProductSpecificationController.ts",
    "groupTitle": "VendorProductSpecification",
    "name": "DeleteApiVendorProductSpecificationProductId"
  },
  {
    "type": "Get",
    "url": "/api/vendor-product-specification/products",
    "title": "Get All Product Attribute list API",
    "group": "VendorProductSpecification",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>keyword</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "productName",
            "description": "<p>productName</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "sku",
            "description": "<p>sku</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>count</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n   \"status\": 1,\n   \"message\": \"Successfully got Product List.\",\n   \"data\": [\n       {\n           \"productId\": 1,\n           \"productName\": \"\",\n           \"productSku\": \"\",\n           \"productPrice\": \"\",\n           \"totalSpecification\": \"\",\n           \"categoryIds\": [\n               {\n                   \"categoryId\": 1,\n                   \"name\": \"\"\n               }\n           ],\n           \"image\": \"\",\n           \"containerName\": \"\"\n       }\n   ]\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-product-specification/products"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "product specification error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/ProductSpecificationController.ts",
    "groupTitle": "VendorProductSpecification",
    "name": "GetApiVendorProductSpecificationProducts"
  },
  {
    "type": "Gets",
    "url": "/api/vendor-product-specification/product/:id",
    "title": "Get product Specification Detail API",
    "group": "VendorProductSpecification",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "productId",
            "description": "<p>productId</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n    {\n   \"status\": 1,\n   \"message\": \"Successfully Got product Detail\",\n   \"data\": {\n       \"createdBy\": 1,\n       \"createdDate\": \"\",\n       \"modifiedBy\": 1,\n       \"modifiedDate\": \"\",\n       \"productId\": 1,\n       \"sku\": \"\",\n       \"upc\": \"\",\n       \"hsn\": \"\",\n       \"location\": \"\",\n       \"quantity\": \"\",\n       \"minimumQuantity\": \"\",\n       \"subtractStock\": \"\",\n       \"stockStatusId\": 1,\n       \"quotationAvailable\": \"\",\n       \"image\": \"\",\n       \"imagePath\": \"\",\n       \"manufacturerId\": 1,\n       \"shipping\": \"\",\n       \"serviceCharges\": \"\",\n       \"taxType\": \"\",\n       \"taxValue\": \"\",\n       \"price\": \"\",\n       \"priceUpdateFileLogId\": \"\",\n       \"dateAvailable\": \"\",\n       \"sortOrder\": \"\",\n       \"name\": \"\",\n       \"description\": \"\"\n       \"keywords\": \"\",\n       \"discount\": \"\",\n       \"deleteFlag\": \"\",\n       \"isFeatured\": 1,\n       \"todayDeals\": \"\",\n       \"condition\": \"\",\n       \"rating\": \"\",\n       \"wishListStatus\": \"\",\n       \"productSlug\": \"\",\n       \"isActive\": 1,\n       \"width\": 1,\n       \"height\": 1,\n       \"length\": 1,\n       \"weight\": 1,\n       \"hasStock\": \"\",\n       \"priceType\": \"\",\n       \"isSimplified\": 1,\n       \"owner\": \"\",\n       \"isCommon\": 1,\n       \"skuId\": 1,\n       \"hasTirePrice\": \"\",\n       \"outOfStockThreshold\": \"\",\n       \"notifyMinQuantity\": 1,\n       \"minQuantityAllowedCart\": 1,\n       \"maxQuantityAllowedCart\": 1,\n       \"enableBackOrders\": \"\",\n       \"pincodeBasedDelivery\": \"\",\n       \"attributeKeyword\": \"\",\n       \"settedAsCommonOn\": \"\",\n       \"productHighlights\": \"\",\n       \"productSpecification\": [\n           {\n               \"id\": 1,\n               \"productId\": 1,\n               \"specificationId\": 1,\n               \"attributeGroups\": [\n                   {\n                       \"id\": 1,\n                       \"productSpecId\": 1,\n                       \"attributes\": [\n                           {\n                               \"id\": 1,\n                               \"productSpecAttrGrpId\": 1,\n                               \"attributeId\": 1,\n                               \"attributesValues\": [\n                                   {\n                                       \"id\": 1,\n                                       \"productSpecAttrGrpAttrId\": 1,\n                                       \"attributeValueId\": 1,\n                                       \"value\": \"\"\n                                   }\n                               ]\n                           }\n                       ]\n                   }\n               ]\n           }\n       ]\n   }\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-product-specification/product/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "product specification error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/ProductSpecificationController.ts",
    "groupTitle": "VendorProductSpecification",
    "name": "GetsApiVendorProductSpecificationProductId"
  },
  {
    "type": "Post",
    "url": "api/vendor-product-specification",
    "title": "create product Specification API",
    "group": "VendorProductSpecification",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "productId",
            "description": "<p>productId</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "productSpecifications",
            "description": "<p>productSpecifications</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "attributeGroups",
            "description": "<p>attributeGroups</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "attributes",
            "description": "<p>attributes</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "attributeValues",
            "description": "<p>attributeValues</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n   \"productId\": 1,\n   \"productSpecifications\": [\n       {\n           \"specificationId\": 1,\n           \"attributeGroups\": [\n               {\n                   \"attributes\": [\n                     {\n                           \"attributeId\": 1,\n                           \"attributeValues\": [\n                              {\n                                   \"attributeValueId\": 1,\n                                   \"value\": \"\"\n                              }\n                           ]\n                     }\n                   ]\n               }\n           ]\n       }\n   ]\n\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n    status: 1,\n    message: 'Successfully saved product specification.,\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "api/vendor-product-specification"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "product specification error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/ProductSpecificationController.ts",
    "groupTitle": "VendorProductSpecification",
    "name": "PostApiVendorProductSpecification"
  },
  {
    "type": "Put",
    "url": "api/vendor-product-specification/attribute-slug/product/:id",
    "title": "Update product Specification Slug API",
    "group": "VendorProductSpecification",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "productId",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n   \"status\": 1,\n   \"message\": \"Successfully Updated Attribute keyword.\",\n   \"data\": {\n       \"createdBy\": 1,\n       \"createdDate\": \"\",\n       \"modifiedBy\": 1,\n       \"modifiedDate\": \"\",\n       \"productId\": 1,\n       \"sku\": \"\",\n       \"upc\": \"\",\n       \"hsn\": \"\",\n       \"location\": \"\",\n       \"quantity\": 1,\n       \"minimumQuantity\": 1,\n       \"subtractStock\": \"\",\n       \"stockStatusId\": 1,\n       \"quotationAvailable\": \"\",\n       \"image\": \"\",\n       \"imagePath\": \"\",\n       \"manufacturerId\": 1,\n       \"shipping\": \"\",\n       \"serviceCharges\": \"\",\n       \"taxType\": \"\",\n       \"taxValue\": \"\",\n       \"price\": \"\",\n       \"priceUpdateFileLogId\": \"\",\n       \"dateAvailable\": \"\",\n       \"sortOrder\": 1\n       \"name\": \"\",\n       \"description\": \"\",\n       \"amount\": 1,\n       \"keywords\": \"\",\n       \"discount\": 1,\n       \"deleteFlag\": 1,\n       \"isFeatured\": 1,\n       \"todayDeals\": \"\",\n       \"condition\": \"\",\n       \"rating\": 1,\n       \"wishListStatus\": 1,\n       \"productSlug\": \"\",\n       \"isActive\": 1,\n       \"width\": 1,\n       \"height\": 1,\n       \"length\": 1,\n       \"weight\": 1,\n       \"hasStock\": \"\",\n       \"priceType\": \"\",\n       \"isSimplified\": 1,\n       \"owner\": \"\",\n       \"isCommon\": 1,\n       \"skuId\": 1,\n       \"hasTirePrice\": \"\",\n       \"outOfStockThreshold\": \"\",\n       \"notifyMinQuantity\": 1,\n       \"minQuantityAllowedCart\": 1,\n       \"maxQuantityAllowedCart\": 1,\n       \"enableBackOrders\": \"\",\n       \"pincodeBasedDelivery\": \"\",\n       \"attributeKeyword\": \"\",\n       \"settedAsCommonOn\": \"\",\n       \"productHighlights\": \"\"\n   }\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "api/vendor-product-specification/attribute-slug/product/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "product specification error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/ProductSpecificationController.ts",
    "groupTitle": "VendorProductSpecification",
    "name": "PutApiVendorProductSpecificationAttributeSlugProductId"
  },
  {
    "type": "Put",
    "url": "/api/vendor-product-specification/product/:id",
    "title": "Update Product Specification API",
    "group": "VendorProductSpecification",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "productId",
            "description": "<p>productId</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "deleteSpecificationIds",
            "description": "<p>deleteSpecificationIds</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "deleteAttributeGroupIds",
            "description": "<p>deleteAttributeGroupIds</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "deleteAttributeIds",
            "description": "<p>deleteAttributeIds</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "deleteAttributeValueIds",
            "description": "<p>deleteAttributeValueIds</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": true,
            "field": "productSpecifications",
            "description": "<p>productSpecifications</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": true,
            "field": "attributeGroups",
            "description": "<p>attributeGroups</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": true,
            "field": "attributes",
            "description": "<p>attributes</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": true,
            "field": "attributeValues",
            "description": "<p>attributeValues</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n   \"productId\": 1,\n   \"deleteSpecificationIds\": [],\n   \"deleteAttributeGroupIds\": [],\n   \"deleteAttributeIds\": [],\n   \"deleteAttributeValueIds\": [],\n   \"productSpecifications\": [\n       {\n           \"id\": 1,\n           \"specificationId\": 1,\n           \"attributeGroups\": [\n               {\n                   \"id\": 1,\n                   \"attributes\": [\n                     {\n                     \t  \"id\": 1,\n                           \"attributeId\": 1,\n                           \"attributeValues\": [\n                              {\n                              \t  \"id\": 1\n                                   \"attributeValueId\": 1,\n                                   \"value\": \"\"\n                              }\n                           ]\n                     }\n                   ]\n               }\n           ]\n       }\n   ]\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n   \"status\": 1,\n   \"message\": \"Successfully Saved Product Specification.\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-product-specification/product/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "product specification error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/ProductSpecificationController.ts",
    "groupTitle": "VendorProductSpecification",
    "name": "PutApiVendorProductSpecificationProductId"
  },
  {
    "type": "post",
    "url": "/api/vendor-blog",
    "title": "Create Vendor Blog",
    "group": "Vendor_Blog",
    "name": "CreateVendorBlog",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "body": [
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "title",
        "description": "<p>Blog title (max 255 chars)</p>"
      },
      {
        "group": "Body",
        "type": "Number",
        "optional": false,
        "field": "categoryId",
        "description": "<p>Blog category ID</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": true,
        "field": "description",
        "description": "<p>Blog content description</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": true,
        "field": "image",
        "description": "<p>Base64 encoded blog image</p>"
      },
      {
        "group": "Body",
        "type": "Number",
        "optional": false,
        "field": "status",
        "description": "<p>Active status (1: Active, 0: Inactive)</p>"
      },
      {
        "group": "Body",
        "type": "Number[]",
        "optional": true,
        "field": "relatedBlogId",
        "description": "<p>Array of related blog IDs</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": true,
        "field": "blogSlug",
        "description": "<p>Custom blog slug name</p>"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Successfully created new blog.\",\n    \"data\": {\n        \"id\": 1,\n        \"title\": \"Blog Title\",\n        \"categoryId\": 1,\n        \"description\": \"Blog description\",\n        \"isActive\": 1,\n        \"blogSlug\": \"blog-title\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Invalid-Category:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"status\": 0,\n    \"message\": \"Invalid Category Id.\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-blog"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/VendorBlogController.ts",
    "groupTitle": "Vendor_Blog"
  },
  {
    "type": "delete",
    "url": "/api/vendor-blog/:id",
    "title": "Delete Vendor Blog",
    "group": "Vendor_Blog",
    "name": "DeleteVendorBlog",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Path": [
          {
            "group": "Path",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Blog ID</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Successfully deleted Blog\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Blog-Not-Found:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"status\": 0,\n    \"message\": \"Please choose a blog that you want to delete. \"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-blog/:id"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/VendorBlogController.ts",
    "groupTitle": "Vendor_Blog"
  },
  {
    "type": "get",
    "url": "/api/vendor-blog/blog-detail",
    "title": "Get Vendor Blog Detail",
    "group": "Vendor_Blog",
    "name": "GetVendorBlogDetail",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "query": [
      {
        "group": "Query",
        "type": "Number",
        "optional": false,
        "field": "blogId",
        "description": "<p>Blog ID</p>"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Successfully got blog list.\",\n    \"data\": {\n        \"id\": 1,\n        \"title\": \"Blog Title\",\n        \"categoryId\": 1,\n        \"description\": \"Blog description\",\n        \"categoryName\": \"Technology\",\n        \"blogRelated\": []\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Blog-Not-Found:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"status\": 0,\n    \"message\": \"Invalid Blog ID\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-blog/blog-detail"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/VendorBlogController.ts",
    "groupTitle": "Vendor_Blog"
  },
  {
    "type": "put",
    "url": "/api/vendor-blog/:id",
    "title": "Update Vendor Blog",
    "group": "Vendor_Blog",
    "name": "UpdateVendorBlog",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Path": [
          {
            "group": "Path",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Blog ID</p>"
          }
        ]
      }
    },
    "body": [
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "title",
        "description": "<p>Blog title (max 255 chars)</p>"
      },
      {
        "group": "Body",
        "type": "Number",
        "optional": false,
        "field": "categoryId",
        "description": "<p>Blog category ID</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": true,
        "field": "description",
        "description": "<p>Blog content description</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": true,
        "field": "image",
        "description": "<p>Base64 encoded blog image</p>"
      },
      {
        "group": "Body",
        "type": "Number",
        "optional": false,
        "field": "status",
        "description": "<p>Active status (1: Active, 0: Inactive)</p>"
      },
      {
        "group": "Body",
        "type": "Number[]",
        "optional": true,
        "field": "relatedBlogId",
        "description": "<p>Array of related blog IDs</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": true,
        "field": "blogSlug",
        "description": "<p>Custom blog slug name</p>"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Successfully updated blog.\",\n    \"data\": {\n        \"id\": 1,\n        \"title\": \"Updated Blog Title\",\n        \"categoryId\": 1,\n        \"isActive\": 1\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Blog-Not-Found:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"status\": 0,\n    \"message\": \"Invalid blog Id.\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-blog/:id"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/VendorBlogController.ts",
    "groupTitle": "Vendor_Blog"
  },
  {
    "type": "get",
    "url": "/api/vendor-blog",
    "title": "List Vendor Blogs",
    "group": "Vendor_Blog",
    "name": "VendorBlogList",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "query": [
      {
        "group": "Query",
        "type": "Number",
        "optional": true,
        "field": "limit",
        "description": "<p>Number of records to return</p>"
      },
      {
        "group": "Query",
        "type": "Number",
        "optional": true,
        "field": "offset",
        "description": "<p>Pagination offset</p>"
      },
      {
        "group": "Query",
        "type": "String",
        "optional": true,
        "field": "keyword",
        "description": "<p>Keyword search for blog title</p>"
      },
      {
        "group": "Query",
        "type": "String",
        "optional": true,
        "field": "title",
        "description": "<p>Filter by blog title</p>"
      },
      {
        "group": "Query",
        "type": "String",
        "optional": true,
        "field": "categoryId",
        "description": "<p>Filter by blog category ID</p>"
      },
      {
        "group": "Query",
        "type": "String",
        "optional": true,
        "field": "status",
        "description": "<p>Filter by active status</p>"
      },
      {
        "group": "Query",
        "type": "Number",
        "optional": true,
        "field": "count",
        "description": "<p>Return count only if 1</p>"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Successfully got blog list.\",\n    \"data\": [\n        {\n            \"id\": 1,\n            \"title\": \"Blog Title\",\n            \"categoryId\": 1,\n            \"description\": \"Blog description\",\n            \"isActive\": 1,\n            \"blogSlug\": \"blog-title\",\n            \"categoryName\": \"Tech\"\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"status\": 0,\n    \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-blog"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/VendorBlogController.ts",
    "groupTitle": "Vendor_Blog"
  },
  {
    "type": "post",
    "url": "/api/vendor-import-datas/category",
    "title": "Vendor Bulk Category Import",
    "group": "Vendor_Bulk_Import",
    "name": "VendorBulkCategoryImport",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "body": [
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "buffer",
        "description": "<p>Comma-separated byte string representing Excel file</p>"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Categories successfully created\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"error\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-import-datas/category"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/VendorBulkImportController.ts",
    "groupTitle": "Vendor_Bulk_Import"
  },
  {
    "type": "post",
    "url": "/api/vendor-import-datas/import-image",
    "title": "Bulk Product Image Import",
    "group": "Vendor_Bulk_Import",
    "name": "VendorBulkImageImport",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "body": [
      {
        "group": "Body",
        "type": "File",
        "optional": false,
        "field": "file",
        "description": "<p>Zip file containing product images</p>"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Given images imported successfully\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Upload-Error:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"status\": 0,\n    \"message\": \"Unable to import given images\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-import-datas/import-image"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/VendorBulkImportController.ts",
    "groupTitle": "Vendor_Bulk_Import"
  },
  {
    "type": "post",
    "url": "/api/vendor-import-datas",
    "title": "Vendor Bulk Product Import",
    "group": "Vendor_Bulk_Import",
    "name": "VendorBulkProductImport",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "body": [
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "buffer",
        "description": "<p>Comma-separated byte string representing the Excel file</p>"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Products imported successfully\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Import-Error:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"status\": 0,\n    \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-import-datas"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/VendorBulkImportController.ts",
    "groupTitle": "Vendor_Bulk_Import"
  },
  {
    "type": "get",
    "url": "/api/vendor-import-datas/error-bulk-import",
    "title": "Download Bulk Import Error File",
    "group": "Vendor_Bulk_Import",
    "name": "VendorErrorBulkProductImport",
    "query": [
      {
        "group": "Query",
        "type": "String",
        "optional": false,
        "field": "fileName",
        "description": "<p>Name of the error file to download</p>"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\nContent-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          "type": "file"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"error\": \"Internal server error\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-import-datas/error-bulk-import"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/VendorBulkImportController.ts",
    "groupTitle": "Vendor_Bulk_Import"
  },
  {
    "type": "get",
    "url": "/api/vendor-list/addons",
    "title": "List Active Vendor Addons",
    "group": "Vendor_Common_List",
    "name": "VendorCommonAddonList",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "query": [
      {
        "group": "Query",
        "type": "Number",
        "optional": true,
        "field": "limit",
        "description": "<p>Number of records to return</p>"
      },
      {
        "group": "Query",
        "type": "Number",
        "optional": true,
        "field": "offset",
        "description": "<p>Pagination offset</p>"
      },
      {
        "group": "Query",
        "type": "Number",
        "optional": true,
        "field": "count",
        "description": "<p>Return count only if 1</p>"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Successfully get the plugin list\",\n    \"data\": {\n        \"paypal\": {\n            \"status\": 1,\n            \"additionalInfo\": {}\n        }\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"status\": 0,\n    \"message\": \"Unable to get the plugin list\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-list/addons"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/CommonListController.ts",
    "groupTitle": "Vendor_Common_List"
  },
  {
    "type": "get",
    "url": "/api/vendor-list/industry",
    "title": "List Industries",
    "group": "Vendor_Common_List",
    "name": "VendorCommonIndustryList",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Successfully got industry list\",\n    \"data\": [\n        {\n            \"id\": 1,\n            \"name\": \"Retail\",\n            \"slug\": \"retail\",\n            \"isActive\": 1\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"status\": 0,\n    \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-list/industry"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/CommonListController.ts",
    "groupTitle": "Vendor_Common_List"
  },
  {
    "type": "get",
    "url": "/api/vendor-list/language",
    "title": "List Vendor Languages",
    "group": "Vendor_Common_List",
    "name": "VendorCommonLanguageList",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "query": [
      {
        "group": "Query",
        "type": "Number",
        "optional": true,
        "field": "limit",
        "description": "<p>Number of records to return</p>"
      },
      {
        "group": "Query",
        "type": "Number",
        "optional": true,
        "field": "offset",
        "description": "<p>Pagination offset</p>"
      },
      {
        "group": "Query",
        "type": "String",
        "optional": true,
        "field": "keyword",
        "description": "<p>Keyword search for language name</p>"
      },
      {
        "group": "Query",
        "type": "String",
        "optional": true,
        "field": "status",
        "description": "<p>Filter by active status</p>"
      },
      {
        "group": "Query",
        "type": "String",
        "optional": true,
        "field": "defaultLanguage",
        "description": "<p>Exclude default language ID</p>"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"successfully got the complete language list\",\n    \"data\": [\n        {\n            \"id\": 1,\n            \"isActive\": 1,\n            \"language\": {\n                \"languageId\": 1,\n                \"name\": \"French\",\n                \"code\": \"fr\"\n            }\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"status\": 0,\n    \"message\": \"unable to show language list\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-list/language"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/CommonListController.ts",
    "groupTitle": "Vendor_Common_List"
  },
  {
    "type": "get",
    "url": "/api/vendor-list/master-country",
    "title": "List Master Countries",
    "group": "Vendor_Common_List",
    "name": "VendorCommonMasterCountryList",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "query": [
      {
        "group": "Query",
        "type": "Number",
        "optional": true,
        "field": "limit",
        "description": "<p>Number of records to return</p>"
      },
      {
        "group": "Query",
        "type": "Number",
        "optional": true,
        "field": "offset",
        "description": "<p>Pagination offset</p>"
      },
      {
        "group": "Query",
        "type": "String",
        "optional": true,
        "field": "keyword",
        "description": "<p>Keyword search for country name or ISO codes</p>"
      },
      {
        "group": "Query",
        "type": "Number",
        "optional": true,
        "field": "count",
        "description": "<p>Return count only if 1</p>"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Successfully get all country List\",\n    \"data\": [\n        {\n            \"countryId\": 1,\n            \"name\": \"United States\",\n            \"isoCode2\": \"US\",\n            \"isoCode3\": \"USA\",\n            \"isActive\": 1\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"status\": 0,\n    \"message\": \"Unable to get country List\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-list/master-country"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/CommonListController.ts",
    "groupTitle": "Vendor_Common_List"
  },
  {
    "type": "get",
    "url": "/api/vendor-list/master-language",
    "title": "List Master Languages",
    "group": "Vendor_Common_List",
    "name": "VendorCommonMasterLanguageList",
    "query": [
      {
        "group": "Query",
        "type": "Number",
        "optional": true,
        "field": "limit",
        "description": "<p>Number of records to return</p>"
      },
      {
        "group": "Query",
        "type": "Number",
        "optional": true,
        "field": "offset",
        "description": "<p>Pagination offset</p>"
      },
      {
        "group": "Query",
        "type": "String",
        "optional": true,
        "field": "keyword",
        "description": "<p>Keyword search for language name or code</p>"
      },
      {
        "group": "Query",
        "type": "Number",
        "optional": true,
        "field": "count",
        "description": "<p>Return count only if 1</p>"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Successfully got all vendor language list.\",\n    \"data\": [\n        {\n            \"languageId\": 1,\n            \"name\": \"English\",\n            \"code\": \"en\",\n            \"isActive\": 1\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"status\": 0,\n    \"message\": \"Unable to get language list.\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-list/master-language"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/CommonListController.ts",
    "groupTitle": "Vendor_Common_List"
  },
  {
    "type": "get",
    "url": "/api/vendor-list/zone",
    "title": "List Available Zones",
    "group": "Vendor_Common_List",
    "name": "VendorCommonZoneList",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "query": [
      {
        "group": "Query",
        "type": "Number",
        "optional": true,
        "field": "limit",
        "description": "<p>Number of records to return</p>"
      },
      {
        "group": "Query",
        "type": "Number",
        "optional": true,
        "field": "offset",
        "description": "<p>Pagination offset</p>"
      },
      {
        "group": "Query",
        "type": "Number",
        "optional": true,
        "field": "countryId",
        "description": "<p>Filter by country ID</p>"
      },
      {
        "group": "Query",
        "type": "String",
        "optional": true,
        "field": "keyword",
        "description": "<p>Keyword search for zone name</p>"
      },
      {
        "group": "Query",
        "type": "Number",
        "optional": true,
        "field": "count",
        "description": "<p>Return count only if 1</p>"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Successfully get all zone list\",\n    \"data\": [\n        {\n            \"zoneId\": 1,\n            \"countryId\": 99,\n            \"code\": \"CA\",\n            \"name\": \"California\",\n            \"isActive\": 1\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"status\": 0,\n    \"message\": \"unable to get zone list\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-list/zone"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/CommonListController.ts",
    "groupTitle": "Vendor_Common_List"
  },
  {
    "type": "post",
    "url": "/api/vendor-customer-group",
    "title": "Create Vendor Customer Group",
    "group": "Vendor_Customer_Group",
    "name": "CreateVendorCustomerGroup",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "body": [
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "name",
        "description": "<p>Customer group name</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": true,
        "field": "description",
        "description": "<p>Customer group description</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": true,
        "field": "colorCode",
        "description": "<p>Color tag code (hex)</p>"
      },
      {
        "group": "Body",
        "type": "Number",
        "optional": true,
        "field": "status",
        "description": "<p>Active status (1: Active, 0: Inactive)</p>"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Successfully created customer group\",\n    \"data\": {\n        \"id\": 1,\n        \"name\": \"VIP Group\",\n        \"description\": \"VIP Customers\",\n        \"colorCode\": \"#FF9900\",\n        \"isActive\": 1\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"status\": 0,\n    \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-customer-group"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/VendorCustomerGroupController.ts",
    "groupTitle": "Vendor_Customer_Group"
  },
  {
    "type": "delete",
    "url": "/api/vendor-customer-group/:id",
    "title": "Delete Vendor Customer Group",
    "group": "Vendor_Customer_Group",
    "name": "DeleteVendorCustomerGroup",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Path": [
          {
            "group": "Path",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Customer Group ID</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Successfully deleted customer group\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Invalid-Group:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"status\": 0,\n    \"message\": \"Invalid customer group id\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-customer-group/:id"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/VendorCustomerGroupController.ts",
    "groupTitle": "Vendor_Customer_Group"
  },
  {
    "type": "get",
    "url": "/api/vendor-customer-group/:id/customer",
    "title": "Get Customers in Customer Group",
    "group": "Vendor_Customer_Group",
    "name": "GetVendorCustomerGroupCustomers",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Path": [
          {
            "group": "Path",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Customer Group ID</p>"
          }
        ]
      }
    },
    "query": [
      {
        "group": "Query",
        "type": "Number",
        "optional": true,
        "field": "limit",
        "description": "<p>Number of records to return</p>"
      },
      {
        "group": "Query",
        "type": "Number",
        "optional": true,
        "field": "offset",
        "description": "<p>Pagination offset</p>"
      },
      {
        "group": "Query",
        "type": "String",
        "optional": true,
        "field": "keyword",
        "description": "<p>Keyword search for customer name/email</p>"
      },
      {
        "group": "Query",
        "type": "Number",
        "optional": true,
        "field": "status",
        "description": "<p>Customer status</p>"
      },
      {
        "group": "Query",
        "type": "Number",
        "optional": true,
        "field": "count",
        "description": "<p>Return count only if 1</p>"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Successfully got customer list for group\",\n    \"data\": [\n        {\n            \"id\": 1,\n            \"firstName\": \"John\",\n            \"lastName\": \"Doe\",\n            \"email\": \"john@example.com\",\n            \"mobileNumber\": \"1234567890\"\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Invalid-Group:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"status\": 0,\n    \"message\": \"Invalid customer group id\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-customer-group/:id/customer"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/VendorCustomerGroupController.ts",
    "groupTitle": "Vendor_Customer_Group"
  },
  {
    "type": "get",
    "url": "/api/vendor-customer-group/:id",
    "title": "Get Customer Group Detail",
    "group": "Vendor_Customer_Group",
    "name": "GetVendorCustomerGroupDetail",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Path": [
          {
            "group": "Path",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Customer Group ID</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Successfully got customer groups detail\",\n    \"data\": {\n        \"id\": 1,\n        \"name\": \"VIP Group\",\n        \"description\": \"VIP Customers\",\n        \"colorCode\": \"#FF9900\",\n        \"isActive\": 1\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Invalid-Group:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"status\": 0,\n    \"message\": \"Invalid group ID for customer\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-customer-group/:id"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/VendorCustomerGroupController.ts",
    "groupTitle": "Vendor_Customer_Group"
  },
  {
    "type": "get",
    "url": "/api/vendor-customer-group/customer/list",
    "title": "Get Available Customers List",
    "group": "Vendor_Customer_Group",
    "name": "GetVendorCustomerGroupMemberList",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Successfully got customer list.\",\n    \"data\": [\n        {\n            \"id\": 1,\n            \"firstName\": \"John\",\n            \"lastName\": \"Doe\",\n            \"email\": \"john@example.com\"\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"status\": 0,\n    \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-customer-group/customer/list"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/VendorCustomerGroupController.ts",
    "groupTitle": "Vendor_Customer_Group"
  },
  {
    "type": "put",
    "url": "/api/vendor-customer-group/:id",
    "title": "Update Vendor Customer Group",
    "group": "Vendor_Customer_Group",
    "name": "UpdateVendorCustomerGroup",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Path": [
          {
            "group": "Path",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Customer Group ID</p>"
          }
        ]
      }
    },
    "body": [
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "name",
        "description": "<p>Customer group name</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": true,
        "field": "description",
        "description": "<p>Customer group description</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": true,
        "field": "colorCode",
        "description": "<p>Color tag code (hex)</p>"
      },
      {
        "group": "Body",
        "type": "Number",
        "optional": true,
        "field": "status",
        "description": "<p>Active status (1: Active, 0: Inactive)</p>"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Successfully updated customer group\",\n    \"data\": {\n        \"id\": 1,\n        \"name\": \"Updated VIP Group\",\n        \"description\": \"Updated description\",\n        \"colorCode\": \"#FF9900\",\n        \"isActive\": 1\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Group-Exists:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"status\": 0,\n    \"message\": \"Group name already exist\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-customer-group/:id"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/VendorCustomerGroupController.ts",
    "groupTitle": "Vendor_Customer_Group"
  },
  {
    "type": "put",
    "url": "/api/vendor-customer-group/:id/customer",
    "title": "Update Customer Group Members",
    "group": "Vendor_Customer_Group",
    "name": "UpdateVendorCustomerGroupMembers",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Path": [
          {
            "group": "Path",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Customer Group ID</p>"
          }
        ]
      }
    },
    "body": [
      {
        "group": "Body",
        "type": "Number[]",
        "optional": false,
        "field": "customerIds",
        "description": "<p>Array of Customer IDs to assign to this group</p>"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Successfully updated customer groups\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Invalid-Group:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"status\": 0,\n    \"message\": \"Invalid customer group ID.\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-customer-group/:id/customer"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/VendorCustomerGroupController.ts",
    "groupTitle": "Vendor_Customer_Group"
  },
  {
    "type": "put",
    "url": "/api/vendor-customer-group/status/:id",
    "title": "Update Customer Group Status",
    "group": "Vendor_Customer_Group",
    "name": "UpdateVendorCustomerGroupStatus",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Path": [
          {
            "group": "Path",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Customer Group ID</p>"
          }
        ]
      }
    },
    "body": [
      {
        "group": "Body",
        "type": "Number",
        "optional": false,
        "field": "status",
        "description": "<p>Active status (1: Active, 0: Inactive)</p>"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Successfully update customer group status\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Invalid-Group:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"status\": 0,\n    \"message\": \"Invalid customer group id\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-customer-group/status/:id"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/VendorCustomerGroupController.ts",
    "groupTitle": "Vendor_Customer_Group"
  },
  {
    "type": "get",
    "url": "/api/vendor-customer-group",
    "title": "List Vendor Customer Groups",
    "group": "Vendor_Customer_Group",
    "name": "VendorCustomerGroupList",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "query": [
      {
        "group": "Query",
        "type": "Number",
        "optional": true,
        "field": "limit",
        "description": "<p>Number of records to return</p>"
      },
      {
        "group": "Query",
        "type": "Number",
        "optional": true,
        "field": "offset",
        "description": "<p>Pagination offset</p>"
      },
      {
        "group": "Query",
        "type": "String",
        "optional": true,
        "field": "keyword",
        "description": "<p>Keyword search for group name</p>"
      },
      {
        "group": "Query",
        "type": "String",
        "optional": true,
        "field": "groupName",
        "description": "<p>Filter by group name</p>"
      },
      {
        "group": "Query",
        "type": "Number",
        "optional": true,
        "field": "status",
        "description": "<p>Filter by active status (0 or 1)</p>"
      },
      {
        "group": "Query",
        "type": "Number",
        "optional": true,
        "field": "count",
        "description": "<p>Return count only if 1</p>"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Successfully got customer list.\",\n    \"data\": [\n        {\n            \"id\": 1,\n            \"name\": \"Wholesale Buyers\",\n            \"description\": \"Wholesale customer tier\",\n            \"colorCode\": \"#336699\",\n            \"isActive\": 1,\n            \"buyerCount\": 10\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"status\": 0,\n    \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-customer-group"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/VendorCustomerGroupController.ts",
    "groupTitle": "Vendor_Customer_Group"
  },
  {
    "type": "get",
    "url": "/api/product/dashboard-admin-totalvendor-totalproduct-count",
    "title": "Get Total Vendor Product Count",
    "group": "Vendor_Dashboard",
    "name": "VendorDashboardAdminCount",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Successfully got count.\",\n    \"data\": 100\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"status\": 0,\n    \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/product/dashboard-admin-totalvendor-totalproduct-count"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/ProductController.ts",
    "groupTitle": "Vendor_Dashboard"
  },
  {
    "type": "get",
    "url": "/api/product/average-conversion-ratio",
    "title": "Get Dashboard Conversion Ratio",
    "group": "Vendor_Dashboard",
    "name": "VendorDashboardAverageConversionRatio",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Successfully got average conversion ratio.\",\n    \"data\": 3.5\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"status\": 0,\n    \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/product/average-conversion-ratio"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/ProductController.ts",
    "groupTitle": "Vendor_Dashboard"
  },
  {
    "type": "get",
    "url": "/api/product/average-order-value",
    "title": "Get Dashboard Average Order Value",
    "group": "Vendor_Dashboard",
    "name": "VendorDashboardAverageOrderValue",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Successfully got average order value.\",\n    \"data\": 150.00\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"status\": 0,\n    \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/product/average-order-value"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/ProductController.ts",
    "groupTitle": "Vendor_Dashboard"
  },
  {
    "type": "get",
    "url": "/api/product/dashboard-count",
    "title": "Get Product Dashboard Summary Count",
    "group": "Vendor_Dashboard",
    "name": "VendorDashboardCount",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Successfully got dashboard count.\",\n    \"data\": {\n        \"totalProduct\": 50,\n        \"activeProduct\": 45,\n        \"inActiveProduct\": 5\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"status\": 0,\n    \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/product/dashboard-count"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/ProductController.ts",
    "groupTitle": "Vendor_Dashboard"
  },
  {
    "type": "get",
    "url": "/api/product/dashboard/admin-customers-count",
    "title": "Get Dashboard Customers Count",
    "group": "Vendor_Dashboard",
    "name": "VendorDashboardCustomerCount",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Successfully got customer count.\",\n    \"data\": 10\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"status\": 0,\n    \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/product/dashboard/admin-customers-count"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/ProductController.ts",
    "groupTitle": "Vendor_Dashboard"
  },
  {
    "type": "get",
    "url": "/api/product/orders-count",
    "title": "Get Dashboard Orders Count",
    "group": "Vendor_Dashboard",
    "name": "VendorDashboardOrderCount",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Successfully got orders count.\",\n    \"data\": 25\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"status\": 0,\n    \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/product/orders-count"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/ProductController.ts",
    "groupTitle": "Vendor_Dashboard"
  },
  {
    "type": "get",
    "url": "/api/product/recent-selling-product",
    "title": "Get Recent Selling Products",
    "group": "Vendor_Dashboard",
    "name": "VendorDashboardRecentSellingProduct",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Successfully got recent selling products.\",\n    \"data\": []\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"status\": 0,\n    \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/product/recent-selling-product"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/ProductController.ts",
    "groupTitle": "Vendor_Dashboard"
  },
  {
    "type": "get",
    "url": "/api/product/total-revenue",
    "title": "Get Dashboard Total Revenue",
    "group": "Vendor_Dashboard",
    "name": "VendorDashboardTotalRevenue",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Successfully got total revenue.\",\n    \"data\": 50000.00\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"status\": 0,\n    \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/product/total-revenue"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/ProductController.ts",
    "groupTitle": "Vendor_Dashboard"
  },
  {
    "type": "get",
    "url": "/api/product/dashboard/graph-weekly-saleslist",
    "title": "Get Dashboard Weekly Sales Graph",
    "group": "Vendor_Dashboard",
    "name": "VendorDashboardWeeklySalesGraph",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Successfully got weekly sales list.\",\n    \"data\": []\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"status\": 0,\n    \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/product/dashboard/graph-weekly-saleslist"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/ProductController.ts",
    "groupTitle": "Vendor_Dashboard"
  },
  {
    "type": "get",
    "url": "/api/vendor/order-graph",
    "title": "Get Vendor Order Graph Statistics",
    "group": "Vendor_Dashboard",
    "name": "VendorOrderGraphAPI",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "query": [
      {
        "group": "Query",
        "type": "Number",
        "optional": false,
        "field": "duration",
        "description": "<p>Filter duration (1: This Week, 2: This Month, 3: This Year)</p>"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Successfully get order count\",\n    \"data\": {\n        \"value\": [\n            {\n                \"orderStatusId\": 1,\n                \"name\": \"Processing\",\n                \"colorCode\": \"#FF0000\",\n                \"orderCount\": 5\n            }\n        ],\n        \"orderCount\": 5\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"status\": 0,\n    \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor/order-graph"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/VendorController.ts",
    "groupTitle": "Vendor_Dashboard"
  },
  {
    "type": "get",
    "url": "/api/product/top-five-repeatedly-purchased-customers",
    "title": "Get Top Repeated Customers",
    "group": "Vendor_Dashboard",
    "name": "VendorTopFiveRepeatedlyPurchasedCustomers",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Successfully got repeated customers.\",\n    \"data\": []\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"status\": 0,\n    \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/product/top-five-repeatedly-purchased-customers"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/ProductController.ts",
    "groupTitle": "Vendor_Dashboard"
  },
  {
    "type": "get",
    "url": "/api/product/top-performing-products",
    "title": "Get Top Performing Products",
    "group": "Vendor_Dashboard",
    "name": "VendorTopPerformingProducts",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Successfully got top performing products.\",\n    \"data\": []\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"status\": 0,\n    \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/product/top-performing-products"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/ProductController.ts",
    "groupTitle": "Vendor_Dashboard"
  },
  {
    "type": "get",
    "url": "/api/product/top-selling-productlist",
    "title": "Get Top Selling Products Dashboard",
    "group": "Vendor_Dashboard",
    "name": "VendorTopSellingProductListDashboard",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "query": [
      {
        "group": "Query",
        "type": "Number",
        "optional": true,
        "field": "duration",
        "description": "<p>Duration filter (1: This Week, 2: This Month, 3: This Year)</p>"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Successfully got top selling products.\",\n    \"data\": []\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"status\": 0,\n    \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/product/top-selling-productlist"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/ProductController.ts",
    "groupTitle": "Vendor_Dashboard"
  },
  {
    "type": "get",
    "url": "/api/vendor/total-dashboard-counts",
    "title": "Get Total Dashboard Counts",
    "group": "Vendor_Dashboard",
    "name": "VendorTotalDashboardCounts",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Successfully get Total Dashboard count\",\n    \"data\": {\n        \"inActiveVendorProductList\": 2,\n        \"activeProductCount\": 10,\n        \"totalProductCount\": 12,\n        \"totalOrderCount\": 25,\n        \"salesCount\": 20,\n        \"revenue\": 5000\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"status\": 0,\n    \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor/total-dashboard-counts"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/VendorController.ts",
    "groupTitle": "Vendor_Dashboard"
  },
  {
    "type": "post",
    "url": "/api/demo-vendor/login-new",
    "title": "Vendor Demo Login",
    "group": "Vendor_Demo",
    "name": "VendorDemoLoginNew",
    "body": [
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "emailId",
        "description": "<p>User email address</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "password",
        "description": "<p>User password</p>"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Logged In successfully\",\n    \"data\": {\n        \"token\": \"encrypted_token_string\",\n        \"user\": {\n            \"id\": 1,\n            \"firstName\": \"Demo\",\n            \"email\": \"vendor@spurtcommerce.com\"\n        },\n        \"permission\": {}\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Invalid-Credentials:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"status\": 0,\n    \"message\": \"Invalid Email or Password\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/demo-vendor/login-new"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/VendorDemoController.ts",
    "groupTitle": "Vendor_Demo"
  },
  {
    "type": "get",
    "url": "/api/vendor-export-log",
    "title": "List Vendor Export Logs",
    "group": "Vendor_Export_Log",
    "name": "VendorExportLogList",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "query": [
      {
        "group": "Query",
        "type": "Number",
        "optional": true,
        "field": "limit",
        "description": "<p>Number of records to return</p>"
      },
      {
        "group": "Query",
        "type": "Number",
        "optional": true,
        "field": "offset",
        "description": "<p>Pagination offset</p>"
      },
      {
        "group": "Query",
        "type": "String",
        "optional": true,
        "field": "moduleName",
        "description": "<p>Filter by exported module name</p>"
      },
      {
        "group": "Query",
        "type": "String",
        "optional": true,
        "field": "createdDate",
        "description": "<p>Filter by export date</p>"
      },
      {
        "group": "Query",
        "type": "Number",
        "optional": true,
        "field": "count",
        "description": "<p>Return count only if 1</p>"
      },
      {
        "group": "Query",
        "type": "String",
        "optional": true,
        "field": "keyword",
        "description": "<p>Keyword search</p>"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Successfully got the export log list !!\",\n    \"data\": [\n        {\n            \"id\": 1,\n            \"module\": \"Product\",\n            \"recordAvailable\": 10,\n            \"createdDate\": \"2024-01-01T00:00:00.000Z\",\n            \"vendorUserName\": \"Vendor User\"\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"status\": 0,\n    \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-export-log"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/VendorExportController.ts",
    "groupTitle": "Vendor_Export_Log"
  },
  {
    "type": "Get",
    "url": "/api/vendor-order/back-order-excel-list",
    "title": "Back order Excel list",
    "group": "Vendor_Order",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "orderProductId",
            "description": ""
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-order/back-order-excel-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Back Order Excel List error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/VendorOrderController.ts",
    "groupTitle": "Vendor_Order",
    "name": "GetApiVendorOrderBackOrderExcelList"
  },
  {
    "type": "get",
    "url": "/api/vendor-order/back-order-list",
    "title": "Back Order List",
    "group": "Vendor_Order",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>keyword</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>count in number or boolean</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully show the Back Order List..!!\",\n     \"status\": \"1\",\n     \"data\": {},\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-order/back-order-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "back order List error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/VendorOrderController.ts",
    "groupTitle": "Vendor_Order",
    "name": "GetApiVendorOrderBackOrderList"
  },
  {
    "type": "get",
    "url": "/api/vendor-order/bulk-back-order-excel-list",
    "title": "Bulk back order Excel list",
    "group": "Vendor_Order",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>keyword</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully download the Bulk Order Cancel Excel List..!!\",\n     \"status\": \"1\",\n     \"data\": {},\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/order/bulk-order-cancel-excel-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Order Cancel Excel List error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/VendorOrderController.ts",
    "groupTitle": "Vendor_Order",
    "name": "GetApiVendorOrderBulkBackOrderExcelList"
  },
  {
    "type": "Get",
    "url": "/api/vendor-order/order-detail/:vendorOrderId",
    "title": "Order Detail API",
    "group": "Vendor_Order",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"orderId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully show the Order Detail..!!\",\n     \"status\": \"1\",\n     \"data\": {\n         \"createdDate\": \"2024-08-01T10:28:17.000Z\",\n         \"vendorOrderId\": 702,\n         \"subOrderId\": \"INV-20240801612101\",\n         \"vendorId\": 10,\n         \"subOrderStatusId\": 5,\n         \"orderProductId\": 1150,\n         \"orderId\": 612,\n         \"total\": \"4100.00\",\n         \"trackingUrl\": \"\",\n         \"trackingNo\": \"\",\n         \"productList\": [\n             {\n                 \"orderProductId\": 1150,\n                 \"productId\": 928,\n                 \"orderProductPrefixId\": \"INV-202408016121\",\n                 \"name\": \"SONME ENTERPRISES Men\",\n                 \"quantity\": 1,\n                 \"discountAmount\": \"0.00\",\n                 \"basePrice\": \"4000.00\",\n                 \"taxType\": 1,\n                 \"taxValue\": 100,\n                 \"total\": \"4100.00\",\n                 \"discountedAmount\": \"0.00\",\n                 \"skuName\": \"SKU83838\",\n                 \"couponDiscountAmount\": \"\",\n                 \"image\": \"200608478556.jpeg\",\n                 \"containerName\": \"\"\n             }\n         ],\n         \"customerFirstName\": \"Henry \",\n         \"shippingAddress1\": \"34 pier\",\n         \"shippingAddress2\": \"Malitios street\",\n         \"shippingCity\": \"Chennai\",\n         \"shippingPostcode\": \"627005\",\n         \"shippingCountry\": \"India\",\n         \"shippingZone\": \"Tamil Nadu\",\n         \"orderPrefixId\": \"INV-20240801612\",\n         \"email\": \"example@gmail.com\",\n         \"mobileNumber\": \"9789929028\",\n         \"orderStatusName\": \"Order Delivered\",\n         \"statusColorCode\": \"#501332\",\n         \"paymentMethod\": \"CashOnDelivery\",\n         \"currencySymbolLeft\": \"\",\n         \"currencySymbolRight\": \"$\",\n         \"paymentStatus\": 0\n     },\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-order/order-detail/:vendorOrderId"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Order Detail error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/VendorOrderController.ts",
    "groupTitle": "Vendor_Order",
    "name": "GetApiVendorOrderOrderDetailVendororderid"
  },
  {
    "type": "Get",
    "url": "/api/vendor-order/vendor-order-status-list",
    "title": "OrderStatus List API",
    "group": "Vendor_Order",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "orderStatus",
            "description": "<p>orderStatus</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>keyword</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>status</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "count",
            "description": "<p>count</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully got the complete order status list\",\n     \"data\": [\n       {\n      \"createdBy\": 1,\n      \"createdDate\": \"\",\n      \"modifiedBy\": 1,\n      \"modifiedDate\": \"\",\n      \"orderStatusId\": 1,\n      \"name\": \"\",\n      \"isActive\": \"\",\n      \"priority\": \"\",\n      \"parentId\": 1,\n      \"defaultStatus\": 1,\n      \"isAdmin\": \"\",\n      \"isVendor\": 1,\n      \"isBuyer\": 1,\n      \"isApi\": 1,\n      \"colorCode\": \"\"\n        }]\n      \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-order/vendor-order-status-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "orderStatusList error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/VendorOrderController.ts",
    "groupTitle": "Vendor_Order",
    "name": "GetApiVendorOrderVendorOrderStatusList"
  },
  {
    "type": "Get",
    "url": "/api/vendor-order/vendor-order-status-list-based-on-parent",
    "title": "Getting A Child Order Status List Based On Parent List API",
    "group": "Vendor_Order",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "parentId",
            "description": "<p>parentId</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully got order status list based on parent\",\n     \"status\": 1\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-order/vendor-order-status-list-based-on-parent"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "OrderStatusListBasedOnParent error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/VendorOrderController.ts",
    "groupTitle": "Vendor_Order",
    "name": "GetApiVendorOrderVendorOrderStatusListBasedOnParent"
  },
  {
    "type": "Get",
    "url": "/api/vendor-order/vendorOrderLoglist",
    "title": "Vendor Order Log List API",
    "group": "Vendor_Order",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "vendorOrderId",
            "description": "<p>vendorOrderId</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully got the complete Vendor Order Status Log list\",\n     \"data\":{\n     \"orderId\" : \"\",\n     \"orderStatusId\" : \"\",\n     \"customerName\" : \"\",\n     \"totalAmount\" : \"\",\n     \"dateAdded\" : \"\",\n     \"dateModified\" : \"\",\n     \"status\" : \"\",\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-order/vendorOrderLoglist"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "orderLogList error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/VendorOrderController.ts",
    "groupTitle": "Vendor_Order",
    "name": "GetApiVendorOrderVendororderloglist"
  },
  {
    "type": "post",
    "url": "/api/order/create-order",
    "title": "Create Vendor Order",
    "group": "Vendor_Order",
    "name": "VendorCreateOrder",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "body": [
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "shippingFirstName",
        "description": "<p>Customer shipping first name</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "shippingLastName",
        "description": "<p>Customer shipping last name</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "shippingAddress1",
        "description": "<p>Customer shipping address line 1</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": true,
        "field": "shippingAddress2",
        "description": "<p>Customer shipping address line 2</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "shippingCity",
        "description": "<p>Customer shipping city</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "shippingPostCode",
        "description": "<p>Customer shipping postal code</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "shippingCountry",
        "description": "<p>Customer shipping country</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": true,
        "field": "shippingZone",
        "description": "<p>Customer shipping zone/state</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "email",
        "description": "<p>Customer email address</p>"
      },
      {
        "group": "Body",
        "type": "Number",
        "optional": false,
        "field": "phoneNumber",
        "description": "<p>Customer contact phone number</p>"
      },
      {
        "group": "Body",
        "type": "Object[]",
        "optional": false,
        "field": "productDetails",
        "description": "<p>Array of products to order</p>"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Order created successfully\",\n    \"data\": {\n        \"orderId\": 1,\n        \"orderPrefixId\": \"ORD-001\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Checkout-Error:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"status\": 0,\n    \"message\": \"item is Out of stock\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/order/create-order"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/OrderController.ts",
    "groupTitle": "Vendor_Order"
  },
  {
    "type": "delete",
    "url": "/api/order/delete-order/:id",
    "title": "Delete Vendor Order",
    "group": "Vendor_Order",
    "name": "VendorDeleteOrder",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Path": [
          {
            "group": "Path",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Order ID</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Order Deleted Successfully\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Invalid-Order:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"status\": 0,\n    \"message\": \"Invalid order Id\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/order/delete-order/:id"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/OrderController.ts",
    "groupTitle": "Vendor_Order"
  },
  {
    "type": "post",
    "url": "/api/order/order-change-status",
    "title": "Change Vendor Order Status",
    "group": "Vendor_Order",
    "name": "VendorOrderChangeStatus",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "body": [
      {
        "group": "Body",
        "type": "Number",
        "optional": false,
        "field": "orderId",
        "description": "<p>Order ID</p>"
      },
      {
        "group": "Body",
        "type": "Number",
        "optional": false,
        "field": "orderStatusId",
        "description": "<p>New order status ID</p>"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Successfully updated the order status\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Update-Error:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"status\": 0,\n    \"message\": \"Unable to update order status\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/order/order-change-status"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/OrderController.ts",
    "groupTitle": "Vendor_Order"
  },
  {
    "type": "get",
    "url": "/api/order/:orderId",
    "title": "Get Vendor Order Detail",
    "group": "Vendor_Order",
    "name": "VendorOrderDetail",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Path": [
          {
            "group": "Path",
            "type": "Number",
            "optional": false,
            "field": "orderId",
            "description": "<p>Order ID</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Successfully shown the order detail\",\n    \"data\": {\n        \"orderId\": 1,\n        \"orderPrefixId\": \"ORD-001\",\n        \"shippingFirstname\": \"John\",\n        \"shippingLastname\": \"Doe\",\n        \"total\": \"100.00\",\n        \"productList\": []\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Invalid-Order:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"status\": 0,\n    \"message\": \"Invalid Order Id\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/order/:orderId"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/OrderController.ts",
    "groupTitle": "Vendor_Order"
  },
  {
    "type": "get",
    "url": "/api/order/order-excel-list",
    "title": "Export Orders Excel",
    "group": "Vendor_Order",
    "name": "VendorOrderExcelExport",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "query": [
      {
        "group": "Query",
        "type": "String",
        "optional": true,
        "field": "dateFrom",
        "description": "<p>Filter orders from date (YYYY-MM-DD)</p>"
      },
      {
        "group": "Query",
        "type": "String",
        "optional": true,
        "field": "dateTo",
        "description": "<p>Filter orders to date (YYYY-MM-DD)</p>"
      },
      {
        "group": "Query",
        "type": "String",
        "optional": true,
        "field": "title",
        "description": "<p>Export report title</p>"
      },
      {
        "group": "Query",
        "type": "String",
        "optional": true,
        "field": "orderId",
        "description": "<p>Comma-separated list of order IDs</p>"
      },
      {
        "group": "Query",
        "type": "Number",
        "optional": true,
        "field": "failedOrder",
        "description": "<p>Failed orders flag</p>"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\nContent-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          "type": "file"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"status\": 0,\n    \"message\": \"Failed to generate Excel report\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/order/order-excel-list"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/OrderController.ts",
    "groupTitle": "Vendor_Order"
  },
  {
    "type": "get",
    "url": "/api/order/export-log-download/:id",
    "title": "Download Order Export From Log",
    "group": "Vendor_Order",
    "name": "VendorOrderExportLogDownload",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Path": [
          {
            "group": "Path",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Export Log ID</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\nContent-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          "type": "file"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Not-Found:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"status\": 0,\n    \"message\": \"Export log not found or contains no order data\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/order/export-log-download/:id"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/OrderController.ts",
    "groupTitle": "Vendor_Order"
  },
  {
    "type": "get",
    "url": "/api/order/order-export-pdf",
    "title": "Get Order Detail for PDF Export",
    "group": "Vendor_Order",
    "name": "VendorOrderExportPdf",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "query": [
      {
        "group": "Query",
        "type": "Number",
        "optional": false,
        "field": "orderId",
        "description": "<p>Order ID</p>"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Successfully show the Order Detail..!!\",\n    \"data\": {\n        \"orderId\": 1,\n        \"orderPrefixId\": \"ORD-001\",\n        \"total\": 100,\n        \"productList\": []\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Invalid-Order:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"status\": 0,\n    \"message\": \"Invalid Order Id\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/order/order-export-pdf"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/OrderController.ts",
    "groupTitle": "Vendor_Order"
  },
  {
    "type": "get",
    "url": "/api/order",
    "title": "List Vendor Orders",
    "group": "Vendor_Order",
    "name": "VendorOrderList",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "query": [
      {
        "group": "Query",
        "type": "Number",
        "optional": true,
        "field": "limit",
        "description": "<p>Number of records to return</p>"
      },
      {
        "group": "Query",
        "type": "Number",
        "optional": true,
        "field": "offset",
        "description": "<p>Pagination offset</p>"
      },
      {
        "group": "Query",
        "type": "String",
        "optional": true,
        "field": "orderId",
        "description": "<p>Filter by order prefix ID</p>"
      },
      {
        "group": "Query",
        "type": "String",
        "optional": true,
        "field": "orderDate",
        "description": "<p>Filter by order date</p>"
      },
      {
        "group": "Query",
        "type": "String",
        "optional": true,
        "field": "productCount",
        "description": "<p>Filter by number of products</p>"
      },
      {
        "group": "Query",
        "type": "String",
        "optional": true,
        "field": "customerName",
        "description": "<p>Filter by customer name</p>"
      },
      {
        "group": "Query",
        "type": "String",
        "optional": true,
        "field": "paymentStatus",
        "description": "<p>Filter by payment status</p>"
      },
      {
        "group": "Query",
        "type": "String",
        "optional": true,
        "field": "orderStatusId",
        "description": "<p>Filter by order status ID</p>"
      },
      {
        "group": "Query",
        "type": "String",
        "optional": true,
        "field": "totalAmount",
        "description": "<p>Filter by order total amount</p>"
      },
      {
        "group": "Query",
        "type": "String",
        "optional": true,
        "field": "dateAdded",
        "description": "<p>Filter by order date added</p>"
      },
      {
        "group": "Query",
        "type": "String",
        "optional": true,
        "field": "keyword",
        "description": "<p>Keyword search for customer name or order ID</p>"
      },
      {
        "group": "Query",
        "type": "String",
        "optional": true,
        "field": "paymentProcess",
        "description": "<p>Filter by payment process status</p>"
      },
      {
        "group": "Query",
        "type": "String",
        "optional": true,
        "field": "sortBy",
        "description": "<p>Field to sort by</p>"
      },
      {
        "group": "Query",
        "type": "String",
        "optional": true,
        "field": "sortOrder",
        "description": "<p>Sort order ('ASC' or 'DESC')</p>"
      },
      {
        "group": "Query",
        "type": "Number",
        "optional": true,
        "field": "count",
        "description": "<p>Return count only if 1</p>"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Successfully shown the order list\",\n    \"data\": [\n        {\n            \"orderId\": 1,\n            \"orderPrefixId\": \"ORD-001\",\n            \"customerName\": \"John Doe\",\n            \"total\": \"100.00\",\n            \"orderStatusId\": 1,\n            \"paymentStatus\": 1,\n            \"createdDate\": \"2024-01-01T00:00:00.000Z\"\n        }\n    ],\n    \"statusCount\": []\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"status\": 0,\n    \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/order"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/OrderController.ts",
    "groupTitle": "Vendor_Order"
  },
  {
    "type": "get",
    "url": "/api/order/orderLoglist",
    "title": "Get Order Status Log List",
    "group": "Vendor_Order",
    "name": "VendorOrderLogList",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "query": [
      {
        "group": "Query",
        "type": "Number",
        "optional": false,
        "field": "orderId",
        "description": "<p>Order ID</p>"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Successfully got the complete order Log list\",\n    \"data\": [\n        {\n            \"orderLogId\": 1,\n            \"orderId\": 1,\n            \"orderStatusId\": 1,\n            \"name\": \"Order Placed\",\n            \"createdDate\": \"2024-01-01T00:00:00.000Z\"\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"status\": 0,\n    \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/order/orderLoglist"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/OrderController.ts",
    "groupTitle": "Vendor_Order"
  },
  {
    "type": "get",
    "url": "/api/order/order-product-log-list",
    "title": "Get Order Product Fulfillment Log",
    "group": "Vendor_Order",
    "name": "VendorOrderProductLogList",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "query": [
      {
        "group": "Query",
        "type": "Number",
        "optional": false,
        "field": "orderProductId",
        "description": "<p>Order Product ID</p>"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Successfully got the complete Order Product Log list\",\n    \"data\": [\n        {\n            \"orderProductLogId\": 1,\n            \"orderProductId\": 1,\n            \"orderStatus\": \"Processing\",\n            \"createdDate\": \"2024-01-01T00:00:00.000Z\"\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"status\": 0,\n    \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/order/order-product-log-list"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/OrderController.ts",
    "groupTitle": "Vendor_Order"
  },
  {
    "type": "get",
    "url": "/api/vendor-order/revenue-overview",
    "title": "Get Vendor Revenue Overview",
    "group": "Vendor_Order",
    "name": "VendorOrderRevenueOverview",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "query": [
      {
        "group": "Query",
        "type": "Number",
        "optional": true,
        "field": "duration",
        "description": "<p>Duration filter (1: Last Month, 3: Last 3 Months, 6: Last 6 Months, 7: Last 7 Days)</p>"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Successfully got revenue overview\",\n    \"data\": [\n        {\n            \"revenue\": 5000,\n            \"orderCount\": 3,\n            \"month\": 1,\n            \"year\": 2026\n        }\n    ],\n    \"maxAmount\": 5000\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"status\": 0,\n    \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-order/revenue-overview"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/VendorOrderController.ts",
    "groupTitle": "Vendor_Order"
  },
  {
    "type": "get",
    "url": "/api/vendor-order/sales-report-export-list",
    "title": "Export Sales Report Excel",
    "group": "Vendor_Order",
    "name": "VendorOrderSalesReportExportList",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "query": [
      {
        "group": "Query",
        "type": "Number",
        "optional": true,
        "field": "limit",
        "description": "<p>Number of records to export</p>"
      },
      {
        "group": "Query",
        "type": "Number",
        "optional": true,
        "field": "offset",
        "description": "<p>Pagination offset</p>"
      },
      {
        "group": "Query",
        "type": "String",
        "optional": true,
        "field": "productId",
        "description": "<p>Filter by product ID</p>"
      },
      {
        "group": "Query",
        "type": "String",
        "optional": true,
        "field": "startDate",
        "description": "<p>Filter by start date (YYYY-MM-DD)</p>"
      },
      {
        "group": "Query",
        "type": "String",
        "optional": true,
        "field": "endDate",
        "description": "<p>Filter by end date (YYYY-MM-DD)</p>"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\nContent-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          "type": "file"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"status\": 0,\n    \"message\": \"Export failed\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-order/sales-report-export-list"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/VendorOrderController.ts",
    "groupTitle": "Vendor_Order"
  },
  {
    "type": "get",
    "url": "/api/vendor-order/sales-report-list",
    "title": "List Vendor Sales Report",
    "group": "Vendor_Order",
    "name": "VendorOrderSalesReportList",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "query": [
      {
        "group": "Query",
        "type": "Number",
        "optional": true,
        "field": "limit",
        "description": "<p>Number of records to return</p>"
      },
      {
        "group": "Query",
        "type": "Number",
        "optional": true,
        "field": "offset",
        "description": "<p>Pagination offset</p>"
      },
      {
        "group": "Query",
        "type": "String",
        "optional": true,
        "field": "startDate",
        "description": "<p>Filter by start date (YYYY-MM-DD)</p>"
      },
      {
        "group": "Query",
        "type": "String",
        "optional": true,
        "field": "endDate",
        "description": "<p>Filter by end date (YYYY-MM-DD)</p>"
      },
      {
        "group": "Query",
        "type": "String",
        "optional": true,
        "field": "productId",
        "description": "<p>Filter by product ID</p>"
      },
      {
        "group": "Query",
        "type": "Number",
        "optional": true,
        "field": "count",
        "description": "<p>Return count only if 1</p>"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Successfully got seller sales list\",\n    \"data\": [\n        {\n            \"productName\": \"Sneakers\",\n            \"buyers\": [\n                {\n                    \"vendorOrderId\": 363,\n                    \"orderId\": 361,\n                    \"quantity\": 1,\n                    \"name\": \"Sneakers\",\n                    \"price\": \"825.00\",\n                    \"total\": \"825.00\",\n                    \"orderStatusName\": \"Order Placed\"\n                }\n            ]\n        }\n    ],\n    \"total\": 825,\n    \"orderCount\": 1\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"status\": 0,\n    \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-order/sales-report-list"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/VendorOrderController.ts",
    "groupTitle": "Vendor_Order"
  },
  {
    "type": "get",
    "url": "/api/vendor-order/top-selling-productlist",
    "title": "Get Vendor Top Selling Products",
    "group": "Vendor_Order",
    "name": "VendorOrderTopSellingProductList",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "query": [
      {
        "group": "Query",
        "type": "Number",
        "optional": true,
        "field": "duration",
        "description": "<p>Duration filter (1: This Week, 2: This Month, 3: This Year)</p>"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Successfully got top selling product\",\n    \"data\": [\n        {\n            \"product\": {\n                \"productId\": 1,\n                \"name\": \"Sample Product\",\n                \"price\": 100\n            },\n            \"soldCount\": 15,\n            \"buyerCount\": 12,\n            \"totalAmount\": 1500,\n            \"soldPercentage\": 100\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"status\": 0,\n    \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-order/top-selling-productlist"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/VendorOrderController.ts",
    "groupTitle": "Vendor_Order"
  },
  {
    "type": "post",
    "url": "/api/order/update-payment-status",
    "title": "Update Order Payment Status",
    "group": "Vendor_Order",
    "name": "VendorOrderUpdatePaymentStatus",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "body": [
      {
        "group": "Body",
        "type": "Number",
        "optional": false,
        "field": "orderId",
        "description": "<p>Order ID</p>"
      },
      {
        "group": "Body",
        "type": "Number",
        "optional": false,
        "field": "paymentStatusId",
        "description": "<p>Payment status ID (1: Paid, 2: Pending/Failed)</p>"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Successfully updated the Payment Status\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Invalid-Order:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"status\": 0,\n    \"message\": \"Invalid order Id\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/order/update-payment-status"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/OrderController.ts",
    "groupTitle": "Vendor_Order"
  },
  {
    "type": "get",
    "url": "/api/vendor-payment-term/dropdown-list",
    "title": "Get Payment Term Dropdown List",
    "group": "Vendor_Payment_Term",
    "name": "VendorPaymentTermDropdownList",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Successfully got payment term dropdown list.\",\n    \"data\": [\n        {\n            \"id\": 1,\n            \"name\": \"Net 30\",\n            \"termDays\": 30,\n            \"isActive\": 1\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"status\": 0,\n    \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-payment-term/dropdown-list"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/VendorPaymentTermController.ts",
    "groupTitle": "Vendor_Payment_Term"
  },
  {
    "type": "get",
    "url": "/api/vendor-plugins/:id",
    "title": "Get Vendor Plugin Detail",
    "group": "Vendor_Plugin",
    "name": "GetVendorPluginDetail",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Path": [
          {
            "group": "Path",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Vendor Plugin ID</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Successfully got the plugin detail.\",\n    \"data\": {\n        \"id\": 1,\n        \"pluginAdditionalInfo\": \"{}\",\n        \"plugins\": {}\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Plugin-Not-Found:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Invalid Plugin ID\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-plugins/:id"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/VendorPluginController.ts",
    "groupTitle": "Vendor_Plugin"
  },
  {
    "type": "put",
    "url": "/api/vendor-plugins/additional-info/:id",
    "title": "Update Plugin Additional Info",
    "group": "Vendor_Plugin",
    "name": "UpdateVendorPluginAdditionalInfo",
    "parameter": {
      "fields": {
        "Path": [
          {
            "group": "Path",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Vendor Plugin ID</p>"
          }
        ]
      }
    },
    "body": [
      {
        "group": "Body",
        "type": "Object",
        "optional": false,
        "field": "payload",
        "description": "<p>Plugin additional info configuration object</p>"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Successfully updated plugin.\",\n    \"data\": {\n        \"id\": 1,\n        \"pluginAdditionalInfo\": \"{}\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Invalid-Plugin:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"status\": 0,\n    \"message\": \"Invalid plugin ID\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-plugins/additional-info/:id"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/VendorPluginController.ts",
    "groupTitle": "Vendor_Plugin"
  },
  {
    "type": "put",
    "url": "/api/vendor-plugins/logo/:id",
    "title": "Update Vendor Plugin Logo",
    "group": "Vendor_Plugin",
    "name": "UpdateVendorPluginLogo",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Path": [
          {
            "group": "Path",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Vendor Plugin ID</p>"
          }
        ]
      }
    },
    "body": [
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "image",
        "description": "<p>Base64 encoded plugin logo image</p>"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Successfully updated the plugin image\",\n    \"data\": {\n        \"id\": 1,\n        \"pluginAvatar\": \"Img_1680000000.png\",\n        \"pluginAvatarPath\": \"logo/\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Invalid-Plugin:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"status\": 0,\n    \"message\": \"Invalid Plugin ID\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-plugins/logo/:id"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/VendorPluginController.ts",
    "groupTitle": "Vendor_Plugin"
  },
  {
    "type": "put",
    "url": "/api/vendor-plugins/:id",
    "title": "Update Vendor Plugin Status",
    "group": "Vendor_Plugin",
    "name": "UpdateVendorPluginStatus",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Path": [
          {
            "group": "Path",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Vendor Plugin ID</p>"
          }
        ]
      }
    },
    "body": [
      {
        "group": "Body",
        "type": "Number",
        "optional": false,
        "field": "isActive",
        "description": "<p>Plugin active status (1: Active, 0: Inactive)</p>"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Plugin updated successfully.\",\n    \"data\": {\n        \"id\": 1,\n        \"isActive\": 1\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Invalid-Plugin:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"status\": 0,\n    \"message\": \"Invalid Plugin ID\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-plugins/:id"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/VendorPluginController.ts",
    "groupTitle": "Vendor_Plugin"
  },
  {
    "type": "get",
    "url": "/api/vendor-plugins",
    "title": "List Vendor Plugins",
    "group": "Vendor_Plugin",
    "name": "VendorPluginList",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "query": [
      {
        "group": "Query",
        "type": "String",
        "optional": true,
        "field": "module",
        "description": "<p>Filter plugins by module</p>"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Successfully got the plugin list\",\n    \"data\": [\n        {\n            \"id\": 1,\n            \"pluginName\": \"PayPal\",\n            \"pluginType\": \"Payment\",\n            \"slugName\": \"paypal\",\n            \"isActive\": 1\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"status\": 0,\n    \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-plugins"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/VendorPluginController.ts",
    "groupTitle": "Vendor_Plugin"
  },
  {
    "type": "post",
    "url": "/api/vendor-product",
    "title": "Create Vendor Product",
    "group": "Vendor_Product",
    "name": "CreateVendorProduct",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "body": [
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "productName",
        "description": "<p>Product name</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "sku",
        "description": "<p>Product SKU</p>"
      },
      {
        "group": "Body",
        "type": "Number",
        "optional": false,
        "field": "quantity",
        "description": "<p>Available product quantity</p>"
      },
      {
        "group": "Body",
        "type": "Number",
        "optional": false,
        "field": "price",
        "description": "<p>Product price</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "categoryId",
        "description": "<p>Comma-separated category IDs</p>"
      },
      {
        "group": "Body",
        "type": "Object[]",
        "optional": true,
        "field": "image",
        "description": "<p>Array of product image objects</p>"
      },
      {
        "group": "Body",
        "type": "Number",
        "optional": false,
        "field": "status",
        "description": "<p>Active status (1: Active, 0: Inactive)</p>"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Successfully created seller product.\",\n    \"data\": {\n        \"productId\": 1,\n        \"name\": \"Sample Product\",\n        \"sku\": \"SKU-001\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Validation-Error:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"status\": 0,\n    \"message\": \"Category should not be empty\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-product"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/VendorProductController.ts",
    "groupTitle": "Vendor_Product"
  },
  {
    "type": "delete",
    "url": "/api/vendor-product/:id",
    "title": "Delete Vendor Product",
    "group": "Vendor_Product",
    "name": "DeleteVendorProduct",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Path": [
          {
            "group": "Path",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Product ID</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Successfully deleted your product\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Product-Ordered:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"status\": 0,\n    \"message\": \"That product is ordered\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-product/:id"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/VendorProductController.ts",
    "groupTitle": "Vendor_Product"
  },
  {
    "type": "get",
    "url": "/api/vendor-product/download-product-sample",
    "title": "Download Product Sample File",
    "group": "Vendor_Product",
    "name": "DownloadVendorProductSample",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\nContent-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          "type": "file"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"status\": 0,\n    \"message\": \"Download failed\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-product/download-product-sample"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/VendorProductController.ts",
    "groupTitle": "Vendor_Product"
  },
  {
    "type": "Get",
    "url": "/api/vendor-product-rating",
    "title": "Vendor Product review List API",
    "group": "Vendor_Product",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limits</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "productName",
            "description": "<p>productName</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "startDate",
            "description": "<p>createDate</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "endDate",
            "description": "<p>createDate</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "starCount",
            "description": "<p>rating</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>count in number or boolean</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"status\": \"1\"\n     \"message\": \"Successfully got the vendor product review and rating list\",\n     \"data\": [{\n       \"ratingId\": 1,\n       \"review\": \"\",\n       \"rating\": 1,\n       \"reviewImage\": \"\",\n       \"reviewImagePath\": \"\",\n       \"reviewVideo\": \"\",\n       \"reviewVideoPath\": \"\",\n       \"createdDate\": \"\",\n       \"firstName\": \"\",\n       \"lastName\": \"\",\n       \"email\": \"\",\n       \"productId\": 1,\n       \"customerId\": 1,\n       \"orderProductId\": 1,\n       \"isActive\": 1,\n       \"productName\": \"\"\n       \"image\": \"\",\n       \"imagePath\": \"\",\n          }]\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-product-rating"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "VendorRatingList error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/VendorRatingController.ts",
    "groupTitle": "Vendor_Product",
    "name": "GetApiVendorProductRating"
  },
  {
    "type": "get",
    "url": "/api/vendor-product/:id",
    "title": "Get Vendor Product Detail",
    "group": "Vendor_Product",
    "name": "GetVendorProductDetail",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Path": [
          {
            "group": "Path",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Product ID</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Successfully get productDetail\",\n    \"data\": {\n        \"productId\": 1,\n        \"name\": \"Sample Product\",\n        \"sku\": \"SKU-001\",\n        \"price\": 100\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Invalid-Product:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"status\": 0,\n    \"message\": \"invalid productId\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-product/:id"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/VendorProductController.ts",
    "groupTitle": "Vendor_Product"
  },
  {
    "type": "get",
    "url": "/api/vendor-product/sku/:skuId",
    "title": "Get Product SKU Detail",
    "group": "Vendor_Product",
    "name": "GetVendorProductSkuDetail",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Path": [
          {
            "group": "Path",
            "type": "Number",
            "optional": false,
            "field": "skuId",
            "description": "<p>SKU ID</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Successfully got Sku detail..!\",\n    \"data\": {\n        \"id\": 1,\n        \"skuName\": \"SKU-001\",\n        \"price\": 100\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Invalid-SKU:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"status\": 0,\n    \"message\": \"Invalid Sku Id..!\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-product/sku/:skuId"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/VendorProductController.ts",
    "groupTitle": "Vendor_Product"
  },
  {
    "type": "get",
    "url": "/api/vendor-product/inventory-vendor-product-list",
    "title": "List Vendor Inventory Products",
    "group": "Vendor_Product",
    "name": "InventoryVendorProductList",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "query": [
      {
        "group": "Query",
        "type": "Number",
        "optional": true,
        "field": "limit",
        "description": "<p>Number of records to return</p>"
      },
      {
        "group": "Query",
        "type": "Number",
        "optional": true,
        "field": "offset",
        "description": "<p>Pagination offset</p>"
      },
      {
        "group": "Query",
        "type": "String",
        "optional": true,
        "field": "keyword",
        "description": "<p>Keyword search</p>"
      },
      {
        "group": "Query",
        "type": "String",
        "optional": true,
        "field": "sku",
        "description": "<p>Filter by SKU</p>"
      },
      {
        "group": "Query",
        "type": "String",
        "optional": true,
        "field": "status",
        "description": "<p>Filter by status</p>"
      },
      {
        "group": "Query",
        "type": "String",
        "optional": true,
        "field": "updatedDate",
        "description": "<p>Filter by update date</p>"
      },
      {
        "group": "Query",
        "type": "String",
        "optional": true,
        "field": "productName",
        "description": "<p>Filter by product name</p>"
      },
      {
        "group": "Query",
        "type": "String",
        "optional": true,
        "field": "price",
        "description": "<p>Filter by price</p>"
      },
      {
        "group": "Query",
        "type": "Number",
        "optional": true,
        "field": "count",
        "description": "<p>Return count only if 1</p>"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Successfully got seller product list.\",\n    \"data\": [\n        {\n            \"productId\": 1,\n            \"name\": \"Sample Product\",\n            \"sku\": \"SKU-001\",\n            \"quantity\": 50\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"status\": 0,\n    \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-product/inventory-vendor-product-list"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/VendorProductController.ts",
    "groupTitle": "Vendor_Product"
  },
  {
    "type": "Put",
    "url": "/api/vendor-product-rating/status",
    "title": "Vendor Product Rating Status API",
    "group": "Vendor_Product",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "body": [
      {
        "group": "Request body",
        "type": "Array",
        "optional": false,
        "field": "ids",
        "description": "<p>rating ids</p>"
      }
    ],
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>status should be 0-&gt; In-Active or 1-&gt; Active</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully Updated Vendor product Rating Status.\",\n     \"data\": {\n         \"ratingId\": 1,\n         \"status\": 1\n     },\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-product-rating/status"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "VendorProduct error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/VendorRatingController.ts",
    "groupTitle": "Vendor_Product",
    "name": "PutApiVendorProductRatingStatus"
  },
  {
    "type": "put",
    "url": "/api/vendor-product/:id",
    "title": "Update Vendor Product",
    "group": "Vendor_Product",
    "name": "UpdateVendorProduct",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Path": [
          {
            "group": "Path",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Product ID</p>"
          }
        ]
      }
    },
    "body": [
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "productName",
        "description": "<p>Product name</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "sku",
        "description": "<p>Product SKU</p>"
      },
      {
        "group": "Body",
        "type": "Number",
        "optional": false,
        "field": "quantity",
        "description": "<p>Available product quantity</p>"
      },
      {
        "group": "Body",
        "type": "Number",
        "optional": false,
        "field": "price",
        "description": "<p>Product price</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "categoryId",
        "description": "<p>Comma-separated category IDs</p>"
      },
      {
        "group": "Body",
        "type": "Object[]",
        "optional": true,
        "field": "image",
        "description": "<p>Array of product image objects</p>"
      },
      {
        "group": "Body",
        "type": "Number",
        "optional": false,
        "field": "status",
        "description": "<p>Active status (1: Active, 0: Inactive)</p>"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Successfully updated seller product.\",\n    \"data\": {\n        \"productId\": 1\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Invalid-Product:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"status\": 0,\n    \"message\": \"Invalid productId\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-product/:id"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/VendorProductController.ts",
    "groupTitle": "Vendor_Product"
  },
  {
    "type": "put",
    "url": "/api/vendor-product/product-status/:id",
    "title": "Update Vendor Product Status",
    "group": "Vendor_Product",
    "name": "UpdateVendorProductStatus",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Path": [
          {
            "group": "Path",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Product ID</p>"
          }
        ]
      }
    },
    "body": [
      {
        "group": "Body",
        "type": "Number",
        "optional": false,
        "field": "status",
        "description": "<p>Active status (1: Active, 0: Inactive)</p>"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Product status updated successfully.\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Invalid-Product:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"status\": 0,\n    \"message\": \"Invalid productId\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-product/product-status/:id"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/VendorProductController.ts",
    "groupTitle": "Vendor_Product"
  },
  {
    "type": "post",
    "url": "/api/vendor-product/update-stock",
    "title": "Update Vendor Product Stock",
    "group": "Vendor_Product",
    "name": "UpdateVendorProductStock",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "body": [
      {
        "group": "Body",
        "type": "Number",
        "optional": false,
        "field": "productId",
        "description": "<p>Product ID</p>"
      },
      {
        "group": "Body",
        "type": "Number",
        "optional": false,
        "field": "skuId",
        "description": "<p>SKU ID</p>"
      },
      {
        "group": "Body",
        "type": "Number",
        "optional": false,
        "field": "hasStock",
        "description": "<p>In-stock quantity</p>"
      },
      {
        "group": "Body",
        "type": "Number",
        "optional": true,
        "field": "outOfStockThreshold",
        "description": "<p>Out-of-stock notification threshold</p>"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Successfully updated stock\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Invalid-SKU:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"status\": 0,\n    \"message\": \"Invalid skuId\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-product/update-stock"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/VendorProductController.ts",
    "groupTitle": "Vendor_Product"
  },
  {
    "type": "post",
    "url": "/api/product",
    "title": "Add Product",
    "group": "Vendor_Product",
    "name": "VendorAddProduct",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "body": [
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "productName",
        "description": "<p>Product name</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "sku",
        "description": "<p>Product SKU</p>"
      },
      {
        "group": "Body",
        "type": "Number",
        "optional": false,
        "field": "quantity",
        "description": "<p>Available quantity</p>"
      },
      {
        "group": "Body",
        "type": "Number",
        "optional": false,
        "field": "price",
        "description": "<p>Product price</p>"
      },
      {
        "group": "Body",
        "type": "Number[]",
        "optional": false,
        "field": "categoryId",
        "description": "<p>Array of category IDs</p>"
      },
      {
        "group": "Body",
        "type": "Object[]",
        "optional": true,
        "field": "productImage",
        "description": "<p>Array of image objects</p>"
      },
      {
        "group": "Body",
        "type": "Number",
        "optional": false,
        "field": "status",
        "description": "<p>Active status (1: Active, 0: Inactive)</p>"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Successfully created new product.\",\n    \"data\": {\n        \"productId\": 1,\n        \"name\": \"Sample Product\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"status\": 0,\n    \"message\": \"Unable to create product\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/product"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/ProductController.ts",
    "groupTitle": "Vendor_Product"
  },
  {
    "type": "post",
    "url": "/api/product/add-tire-price",
    "title": "Add Product Tier Prices",
    "group": "Vendor_Product",
    "name": "VendorAddTierPrice",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "body": [
      {
        "group": "Body",
        "type": "Number",
        "optional": false,
        "field": "productId",
        "description": "<p>Product ID</p>"
      },
      {
        "group": "Body",
        "type": "Number",
        "optional": false,
        "field": "skuId",
        "description": "<p>SKU ID</p>"
      },
      {
        "group": "Body",
        "type": "Object[]",
        "optional": false,
        "field": "tierPrices",
        "description": "<p>Array of tier price rules</p>"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Successfully added tire price.\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"status\": 0,\n    \"message\": \"Unable to add tier price\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/product/add-tire-price"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/ProductController.ts",
    "groupTitle": "Vendor_Product"
  },
  {
    "type": "get",
    "url": "/api/product/allproduct-excel-list",
    "title": "Export All Products Excel",
    "group": "Vendor_Product",
    "name": "VendorAllProductsExcelExport",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\nContent-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          "type": "file"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"status\": 0,\n    \"message\": \"Export failed\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/product/allproduct-excel-list"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/ProductController.ts",
    "groupTitle": "Vendor_Product"
  },
  {
    "type": "get",
    "url": "/api/vendor-product/vendor-category-list",
    "title": "List Vendor Categories By Group",
    "group": "Vendor_Product",
    "name": "VendorCategoryListByGroup",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "query": [
      {
        "group": "Query",
        "type": "Number",
        "optional": true,
        "field": "limit",
        "description": "<p>Number of records to return</p>"
      },
      {
        "group": "Query",
        "type": "Number",
        "optional": true,
        "field": "offset",
        "description": "<p>Pagination offset</p>"
      },
      {
        "group": "Query",
        "type": "String",
        "optional": true,
        "field": "keyword",
        "description": "<p>Keyword search for category</p>"
      },
      {
        "group": "Query",
        "type": "Boolean",
        "optional": true,
        "field": "count",
        "description": "<p>Return count only if true</p>"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Successfully got the vendor category list\",\n    \"data\": [\n        {\n            \"categoryId\": 1,\n            \"name\": \"Electronics\"\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"status\": 0,\n    \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-product/vendor-category-list"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/VendorProductController.ts",
    "groupTitle": "Vendor_Product"
  },
  {
    "type": "get",
    "url": "/api/product/customerProductView-list/:id",
    "title": "Get Customer Product View Logs",
    "group": "Vendor_Product",
    "name": "VendorCustomerProductViewList",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Path": [
          {
            "group": "Path",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Customer ID</p>"
          }
        ]
      }
    },
    "query": [
      {
        "group": "Query",
        "type": "Number",
        "optional": true,
        "field": "limit",
        "description": "<p>Number of records to return</p>"
      },
      {
        "group": "Query",
        "type": "Number",
        "optional": true,
        "field": "offset",
        "description": "<p>Pagination offset</p>"
      },
      {
        "group": "Query",
        "type": "Number",
        "optional": true,
        "field": "count",
        "description": "<p>Return count only if 1</p>"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Successfully got customer product view logs.\",\n    \"data\": []\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"status\": 0,\n    \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/product/customerProductView-list/:id"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/ProductController.ts",
    "groupTitle": "Vendor_Product"
  },
  {
    "type": "post",
    "url": "/api/product/delete-product",
    "title": "Delete Multiple Products",
    "group": "Vendor_Product",
    "name": "VendorDeleteMultipleProducts",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "body": [
      {
        "group": "Body",
        "type": "Number[]",
        "optional": false,
        "field": "productIds",
        "description": "<p>Array of product IDs to delete</p>"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Successfully deleted products.\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"status\": 0,\n    \"message\": \"Unable to delete products.\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/product/delete-product"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/ProductController.ts",
    "groupTitle": "Vendor_Product"
  },
  {
    "type": "delete",
    "url": "/api/product/:id",
    "title": "Delete Product By ID",
    "group": "Vendor_Product",
    "name": "VendorDeleteProductById",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Path": [
          {
            "group": "Path",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Product ID</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Successfully deleted product.\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Invalid-Product:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"status\": 0,\n    \"message\": \"Cannot delete product that has existing orders\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/product/:id"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/ProductController.ts",
    "groupTitle": "Vendor_Product"
  },
  {
    "type": "delete",
    "url": "/api/product/delete-tire-price/:id",
    "title": "Delete Product Tier Price",
    "group": "Vendor_Product",
    "name": "VendorDeleteTierPrice",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Path": [
          {
            "group": "Path",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Tier price ID</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Successfully deleted tire price.\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"status\": 0,\n    \"message\": \"Unable to delete tier price\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/product/delete-tire-price/:id"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/ProductController.ts",
    "groupTitle": "Vendor_Product"
  },
  {
    "type": "get",
    "url": "/api/product/download-product-sample",
    "title": "Download Product Import Sample File",
    "group": "Vendor_Product",
    "name": "VendorDownloadProductSample",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\nContent-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          "type": "file"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"status\": 0,\n    \"message\": \"Download failed\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/product/download-product-sample"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/ProductController.ts",
    "groupTitle": "Vendor_Product"
  },
  {
    "type": "get",
    "url": "/api/vendor-product/allproduct-excel-list",
    "title": "Export All Vendor Products Excel",
    "group": "Vendor_Product",
    "name": "VendorExportAllProductsExcel",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "query": [
      {
        "group": "Query",
        "type": "String",
        "optional": true,
        "field": "dateFrom",
        "description": "<p>Filter products from date (YYYY-MM-DD)</p>"
      },
      {
        "group": "Query",
        "type": "String",
        "optional": true,
        "field": "dateTo",
        "description": "<p>Filter products to date (YYYY-MM-DD)</p>"
      },
      {
        "group": "Query",
        "type": "Number",
        "optional": true,
        "field": "productType",
        "description": "<p>Filter by product type</p>"
      },
      {
        "group": "Query",
        "type": "String",
        "optional": true,
        "field": "title",
        "description": "<p>Export title</p>"
      },
      {
        "group": "Query",
        "type": "Number",
        "optional": true,
        "field": "count",
        "description": "<p>Return count only if 1</p>"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\nContent-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          "type": "file"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"status\": 0,\n    \"message\": \"Products are empty\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-product/allproduct-excel-list"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/VendorProductController.ts",
    "groupTitle": "Vendor_Product"
  },
  {
    "type": "get",
    "url": "/api/vendor-product/product-excel-list/:logId",
    "title": "Export Selected Products From Log",
    "group": "Vendor_Product",
    "name": "VendorExportSelectedProductsExcel",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Path": [
          {
            "group": "Path",
            "type": "Number",
            "optional": false,
            "field": "logId",
            "description": "<p>Export log ID</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\nContent-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          "type": "file"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Not-Found:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"status\": 0,\n    \"message\": \"No product IDs found in export log.\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-product/product-excel-list/:logId"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/VendorProductController.ts",
    "groupTitle": "Vendor_Product"
  },
  {
    "type": "get",
    "url": "/api/product/product-detail/:id",
    "title": "Get Product Detail By ID",
    "group": "Vendor_Product",
    "name": "VendorGetProductDetailById",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Path": [
          {
            "group": "Path",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Product ID</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Successfully got product detail.\",\n    \"data\": {\n        \"productId\": 1,\n        \"name\": \"Sample Product\",\n        \"sku\": \"SKU-001\",\n        \"price\": 100\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Not-Found:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"status\": 0,\n    \"message\": \"Invalid product ID\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/product/product-detail/:id"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/ProductController.ts",
    "groupTitle": "Vendor_Product"
  },
  {
    "type": "get",
    "url": "/api/product",
    "title": "Get Vendor Product List",
    "group": "Vendor_Product",
    "name": "VendorGetProductList",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "query": [
      {
        "group": "Query",
        "type": "Number",
        "optional": true,
        "field": "limit",
        "description": "<p>Number of records to return</p>"
      },
      {
        "group": "Query",
        "type": "Number",
        "optional": true,
        "field": "offset",
        "description": "<p>Pagination offset</p>"
      },
      {
        "group": "Query",
        "type": "String",
        "optional": true,
        "field": "keyword",
        "description": "<p>Keyword search for product name</p>"
      },
      {
        "group": "Query",
        "type": "String",
        "optional": true,
        "field": "sku",
        "description": "<p>Filter by SKU</p>"
      },
      {
        "group": "Query",
        "type": "String",
        "optional": true,
        "field": "status",
        "description": "<p>Filter by status</p>"
      },
      {
        "group": "Query",
        "type": "Number",
        "optional": true,
        "field": "price",
        "description": "<p>Filter by price</p>"
      },
      {
        "group": "Query",
        "type": "Number",
        "optional": true,
        "field": "count",
        "description": "<p>Return count only if 1</p>"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Successfully got the complete list of products.\",\n    \"data\": [\n        {\n            \"productId\": 1,\n            \"productName\": \"Sample Product\",\n            \"sku\": \"SKU-001\",\n            \"price\": 100\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"status\": 0,\n    \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/product"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/ProductController.ts",
    "groupTitle": "Vendor_Product"
  },
  {
    "type": "get",
    "url": "/api/product/get-product-tire-price-list",
    "title": "Get Product Tier Price List",
    "group": "Vendor_Product",
    "name": "VendorGetTierPriceList",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "query": [
      {
        "group": "Query",
        "type": "Number",
        "optional": false,
        "field": "productId",
        "description": "<p>Product ID</p>"
      },
      {
        "group": "Query",
        "type": "Number",
        "optional": true,
        "field": "skuId",
        "description": "<p>SKU ID</p>"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Successfully got tier prices.\",\n    \"data\": []\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"status\": 0,\n    \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/product/get-product-tire-price-list"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/ProductController.ts",
    "groupTitle": "Vendor_Product"
  },
  {
    "type": "post",
    "url": "/api/product/import-product-data",
    "title": "Import Product Data File",
    "group": "Vendor_Product",
    "name": "VendorImportProductData",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "body": [
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "buffer",
        "description": "<p>Byte buffer representing Excel file</p>"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Products successfully imported\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"status\": 0,\n    \"message\": \"Import failed\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/product/import-product-data"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/ProductController.ts",
    "groupTitle": "Vendor_Product"
  },
  {
    "type": "get",
    "url": "/api/product/inventory-product-list",
    "title": "List Inventory Products",
    "group": "Vendor_Product",
    "name": "VendorInventoryProductList",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "query": [
      {
        "group": "Query",
        "type": "Number",
        "optional": true,
        "field": "limit",
        "description": "<p>Number of records to return</p>"
      },
      {
        "group": "Query",
        "type": "Number",
        "optional": true,
        "field": "offset",
        "description": "<p>Pagination offset</p>"
      },
      {
        "group": "Query",
        "type": "String",
        "optional": true,
        "field": "keyword",
        "description": "<p>Keyword search</p>"
      },
      {
        "group": "Query",
        "type": "String",
        "optional": true,
        "field": "sku",
        "description": "<p>Filter by SKU</p>"
      },
      {
        "group": "Query",
        "type": "String",
        "optional": true,
        "field": "status",
        "description": "<p>Filter by status</p>"
      },
      {
        "group": "Query",
        "type": "Number",
        "optional": true,
        "field": "count",
        "description": "<p>Return count only if 1</p>"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Successfully got inventory product list.\",\n    \"data\": []\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"status\": 0,\n    \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/product/inventory-product-list"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/ProductController.ts",
    "groupTitle": "Vendor_Product"
  },
  {
    "type": "post",
    "url": "/api/product/update-stock",
    "title": "Manage Product Stock",
    "group": "Vendor_Product",
    "name": "VendorManageProductStock",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "body": [
      {
        "group": "Body",
        "type": "Number",
        "optional": false,
        "field": "productId",
        "description": "<p>Product ID</p>"
      },
      {
        "group": "Body",
        "type": "Number",
        "optional": false,
        "field": "hasStock",
        "description": "<p>In-stock quantity</p>"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Successfully updated stock.\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"status\": 0,\n    \"message\": \"Unable to update stock\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/product/update-stock"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/ProductController.ts",
    "groupTitle": "Vendor_Product"
  },
  {
    "type": "get",
    "url": "/api/product/product-count",
    "title": "Get Total Products Count",
    "group": "Vendor_Product",
    "name": "VendorProductCount",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Successfully got product count.\",\n    \"data\": 50\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"status\": 0,\n    \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/product/product-count"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/ProductController.ts",
    "groupTitle": "Vendor_Product"
  },
  {
    "type": "get",
    "url": "/api/product/product-excel-list",
    "title": "Export Products Excel",
    "group": "Vendor_Product",
    "name": "VendorProductExcelExport",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "query": [
      {
        "group": "Query",
        "type": "String",
        "optional": true,
        "field": "productId",
        "description": "<p>Comma-separated product IDs to export</p>"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\nContent-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          "type": "file"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"status\": 0,\n    \"message\": \"Export failed\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/product/product-excel-list"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/ProductController.ts",
    "groupTitle": "Vendor_Product"
  },
  {
    "type": "get",
    "url": "/api/vendor-product",
    "title": "List Vendor Products",
    "group": "Vendor_Product",
    "name": "VendorProductList",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "query": [
      {
        "group": "Query",
        "type": "Number",
        "optional": true,
        "field": "limit",
        "description": "<p>Number of records to return</p>"
      },
      {
        "group": "Query",
        "type": "Number",
        "optional": true,
        "field": "offset",
        "description": "<p>Pagination offset</p>"
      },
      {
        "group": "Query",
        "type": "String",
        "optional": true,
        "field": "status",
        "description": "<p>Product active status</p>"
      },
      {
        "group": "Query",
        "type": "String",
        "optional": true,
        "field": "keyword",
        "description": "<p>Keyword search for product</p>"
      },
      {
        "group": "Query",
        "type": "String",
        "optional": true,
        "field": "price",
        "description": "<p>Filter by product price</p>"
      },
      {
        "group": "Query",
        "type": "String",
        "optional": true,
        "field": "approvalFlag",
        "description": "<p>Filter by approval flag</p>"
      },
      {
        "group": "Query",
        "type": "String",
        "optional": true,
        "field": "productName",
        "description": "<p>Filter by product name</p>"
      },
      {
        "group": "Query",
        "type": "String",
        "optional": true,
        "field": "vendorName",
        "description": "<p>Filter by vendor name</p>"
      },
      {
        "group": "Query",
        "type": "String",
        "optional": true,
        "field": "updatedOn",
        "description": "<p>Filter by updated date</p>"
      },
      {
        "group": "Query",
        "type": "String",
        "optional": true,
        "field": "sortBy",
        "description": "<p>Field to sort by</p>"
      },
      {
        "group": "Query",
        "type": "String",
        "optional": true,
        "field": "sortOrder",
        "description": "<p>Sort order ('ASC' or 'DESC')</p>"
      },
      {
        "group": "Query",
        "type": "Number",
        "optional": true,
        "field": "count",
        "description": "<p>Return count only if 1</p>"
      },
      {
        "group": "Query",
        "type": "String",
        "optional": true,
        "field": "sku",
        "description": "<p>Filter by SKU</p>"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Successfully got your product list.\",\n    \"data\": [\n        {\n            \"vendorProductId\": 1,\n            \"productId\": 1,\n            \"name\": \"Sample Product\",\n            \"sku\": \"SKU-001\",\n            \"price\": 100\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"status\": 0,\n    \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-product"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/VendorProductController.ts",
    "groupTitle": "Vendor_Product"
  },
  {
    "type": "get",
    "url": "/api/product/viewLog-list",
    "title": "List Product View Logs",
    "group": "Vendor_Product",
    "name": "VendorProductViewLogList",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "query": [
      {
        "group": "Query",
        "type": "Number",
        "optional": true,
        "field": "limit",
        "description": "<p>Number of records to return</p>"
      },
      {
        "group": "Query",
        "type": "Number",
        "optional": true,
        "field": "offset",
        "description": "<p>Pagination offset</p>"
      },
      {
        "group": "Query",
        "type": "Number",
        "optional": true,
        "field": "count",
        "description": "<p>Return count only if 1</p>"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Successfully got product view logs.\",\n    \"data\": []\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"status\": 0,\n    \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/product/viewLog-list"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/ProductController.ts",
    "groupTitle": "Vendor_Product"
  },
  {
    "type": "get",
    "url": "/api/product/update-owner-product-list",
    "title": "List Owner Products For Update",
    "group": "Vendor_Product",
    "name": "VendorUpdateOwnerProductList",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "query": [
      {
        "group": "Query",
        "type": "Number",
        "optional": true,
        "field": "limit",
        "description": "<p>Number of records to return</p>"
      },
      {
        "group": "Query",
        "type": "Number",
        "optional": true,
        "field": "offset",
        "description": "<p>Pagination offset</p>"
      },
      {
        "group": "Query",
        "type": "String",
        "optional": true,
        "field": "keyword",
        "description": "<p>Keyword search</p>"
      },
      {
        "group": "Query",
        "type": "Number",
        "optional": true,
        "field": "count",
        "description": "<p>Return count only if 1</p>"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Successfully got owner product list.\",\n    \"data\": []\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"status\": 0,\n    \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/product/update-owner-product-list"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/ProductController.ts",
    "groupTitle": "Vendor_Product"
  },
  {
    "type": "post",
    "url": "/api/product/update-product/:id",
    "title": "Update Product By ID",
    "group": "Vendor_Product",
    "name": "VendorUpdateProductById",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Path": [
          {
            "group": "Path",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Product ID</p>"
          }
        ]
      }
    },
    "body": [
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "productName",
        "description": "<p>Product name</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "sku",
        "description": "<p>Product SKU</p>"
      },
      {
        "group": "Body",
        "type": "Number",
        "optional": false,
        "field": "quantity",
        "description": "<p>Available quantity</p>"
      },
      {
        "group": "Body",
        "type": "Number",
        "optional": false,
        "field": "price",
        "description": "<p>Product price</p>"
      },
      {
        "group": "Body",
        "type": "Number[]",
        "optional": false,
        "field": "categoryId",
        "description": "<p>Array of category IDs</p>"
      },
      {
        "group": "Body",
        "type": "Object[]",
        "optional": true,
        "field": "productImage",
        "description": "<p>Array of image objects</p>"
      },
      {
        "group": "Body",
        "type": "Number",
        "optional": false,
        "field": "status",
        "description": "<p>Active status (1: Active, 0: Inactive)</p>"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Successfully updated product.\",\n    \"data\": {\n        \"productId\": 1\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Invalid-Product:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"status\": 0,\n    \"message\": \"Invalid product ID\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/product/update-product/:id"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/ProductController.ts",
    "groupTitle": "Vendor_Product"
  },
  {
    "type": "post",
    "url": "/api/product/update-sku",
    "title": "Update Product SKU Details",
    "group": "Vendor_Product",
    "name": "VendorUpdateProductSku",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "body": [
      {
        "group": "Body",
        "type": "Number",
        "optional": false,
        "field": "productId",
        "description": "<p>Product ID</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "sku",
        "description": "<p>SKU name</p>"
      },
      {
        "group": "Body",
        "type": "Number",
        "optional": false,
        "field": "price",
        "description": "<p>SKU price</p>"
      },
      {
        "group": "Body",
        "type": "Number",
        "optional": false,
        "field": "quantity",
        "description": "<p>Available quantity</p>"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Successfully updated SKU.\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"status\": 0,\n    \"message\": \"Unable to update SKU\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/product/update-sku"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/ProductController.ts",
    "groupTitle": "Vendor_Product"
  },
  {
    "type": "put",
    "url": "/api/product/update-product-slug",
    "title": "Update Product Slugs",
    "group": "Vendor_Product",
    "name": "VendorUpdateProductSlug",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Successfully updated product slug.\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"status\": 0,\n    \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/product/update-product-slug"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/ProductController.ts",
    "groupTitle": "Vendor_Product"
  },
  {
    "type": "get",
    "url": "/api/product/update-vendor-sku-list",
    "title": "List Vendor SKUs For Update",
    "group": "Vendor_Product",
    "name": "VendorUpdateVendorSkuList",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "query": [
      {
        "group": "Query",
        "type": "Number",
        "optional": true,
        "field": "limit",
        "description": "<p>Number of records to return</p>"
      },
      {
        "group": "Query",
        "type": "Number",
        "optional": true,
        "field": "offset",
        "description": "<p>Pagination offset</p>"
      },
      {
        "group": "Query",
        "type": "String",
        "optional": true,
        "field": "keyword",
        "description": "<p>Keyword search</p>"
      },
      {
        "group": "Query",
        "type": "Number",
        "optional": true,
        "field": "count",
        "description": "<p>Return count only if 1</p>"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Successfully got vendor SKU list.\",\n    \"data\": []\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"status\": 0,\n    \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/product/update-vendor-sku-list"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/ProductController.ts",
    "groupTitle": "Vendor_Product"
  },
  {
    "type": "get",
    "url": "/api/vendor/vendor-profile",
    "title": "Get Vendor Profile",
    "group": "Vendor_Profile",
    "name": "VendorGetProfile",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"successfully got seller profile\",\n    \"data\": {\n        \"id\": 1,\n        \"firstName\": \"Vendor\",\n        \"lastName\": \"User\",\n        \"email\": \"vendor@example.com\",\n        \"phoneNumber\": \"1234567890\",\n        \"isSuperVendor\": 1,\n        \"vendor\": {\n            \"vendorId\": 1,\n            \"companyName\": \"Acme Corp\"\n        }\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"status\": 0,\n    \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor/vendor-profile"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/VendorController.ts",
    "groupTitle": "Vendor_Profile"
  },
  {
    "type": "Get",
    "url": "/api/vendor-related-product/vendor-related-product-details/:id",
    "title": "Vendor Product Related Detail APIs",
    "group": "Vendor_Related_Product",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "success",
          "content": "HTTP/1.1 200 success\n{\n     \"status\": \"1\",\n     \"message\": \"Successfully got the vendor related product detail.\",\n     \"data\": {\n        \"productId\": 1,\n        \"description\": \"\",\n        \"sku\": \"\",\n        \"name\": \"\",\n        \"price\": 1,\n        \"vendorRelatedProduct\": [\n            {\n                \"vendorProductId\": \"1\n                \"productId\": 1,\n                \"name\": \"\",\n                \"sku\": \"\",\n                \"containerName\": \"\",\n                \"image\": \"\"\n            },\n            {\n                \"vendorProductId\":1,\n                \"productId\": 1,\n                \"name\": \"\",\n                \"sku\": \"\",\n                \"containerName\": \"\",\n                \"image\": \"\"\n            }\n        ]\n    },\n    \"category\": [\n        {\n            \"categoryId\": 1,\n            \"name\": \"\"\n        },\n        {\n            \"categoryId\": 1,\n            \"name\": \"\"\n        }\n     ]\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-related-product/vendor-related-product-details/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/VendorRelatedProductController.ts",
    "groupTitle": "Vendor_Related_Product",
    "name": "GetApiVendorRelatedProductVendorRelatedProductDetailsId"
  },
  {
    "type": "Get",
    "url": "/api/vendor-related-product/vendor-related-product-list",
    "title": "Vendor related Product List API",
    "group": "Vendor_Related_Product",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>0-&gt;inactive 1-&gt; active</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>keyword</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "productName",
            "description": "<p>productName</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "price",
            "description": "<p>price</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>count</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"status\": \"1\"\n     \"message\": \"Successfully got your product list\",\n     \"data\":{\n         \"vendorProductId\" : 1,\n         \"vendorProductCommission\" : \"\",\n         \"quotationAvailable\" : \"\",\n         \"approvalFlag\" : \"\",\n         \"vendorId\" : 1,\n         \"productId\" : 1,\n         \"pincodeBasedDelivery\" : \"\",\n         \"name\" : \"\",\n         \"sku\" : \"\",\n         \"skuId\" : 1,\n         \"productprice\" : \"\",\n         \"quantity\" : 1,\n         \"vendorName\" : \"\",\n         \"price\" : 1,\n         \"quantity\" : 1,\n         \"sortOrder\" : 1,\n         \"sku\" : \"\",\n         \"price\" : 1,\n         \"modifiedPrice\" : \"\",\n         \"productDiscount\" : 1,\n         \"productSpecial\" : \"\"\n     }\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-related-product/vendor-related-product-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "vendor error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/VendorRelatedProductController.ts",
    "groupTitle": "Vendor_Related_Product",
    "name": "GetApiVendorRelatedProductVendorRelatedProductList"
  },
  {
    "type": "Post",
    "url": "/api/vendor-related-product/update-vendor-related-product",
    "title": "Update Product Related API",
    "group": "Vendor_Related_Product",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "productId",
            "description": "<p>productId</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "relatedProductId",
            "description": "<p>relatedProductId</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"status\": 1,\n     \"message\": \"successfully updated the vendor related products\",\n      \"data\"  :   {\n         \"productId\": 1,\n         \"relatedProductId\": 1\n      }\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-related-product/update-vendor-related-product"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "ProductRelated error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/VendorRelatedProductController.ts",
    "groupTitle": "Vendor_Related_Product",
    "name": "PostApiVendorRelatedProductUpdateVendorRelatedProduct"
  },
  {
    "type": "get",
    "url": "/api/vendor-product-seo/:productId",
    "title": "Get Product SEO Details",
    "group": "Vendor_SEO",
    "name": "VendorProductSeoDetail",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Path": [
          {
            "group": "Path",
            "type": "Number",
            "optional": false,
            "field": "productId",
            "description": "<p>Product ID</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Successfully got Seo details.\",\n    \"data\": {\n        \"productId\": 1,\n        \"name\": \"Product Name\",\n        \"sku\": \"SKU001\",\n        \"productSlug\": \"product-name\",\n        \"price\": 100,\n        \"seo\": {\n            \"seoId\": 1,\n            \"metaTagTitle\": \"Meta Title\",\n            \"metaTagDescription\": \"Meta Description\",\n            \"metaTagKeyword\": \"keywords\",\n            \"refId\": 1,\n            \"seoType\": \"product\"\n        }\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Product-Not-Found:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"status\": 0,\n    \"message\": \"Invalid product ID.\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-product-seo/:productId"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/SeoVendorProductController.ts",
    "groupTitle": "Vendor_SEO"
  },
  {
    "type": "get",
    "url": "/api/vendor-product-seo",
    "title": "List Vendor SEO Products",
    "group": "Vendor_SEO",
    "name": "VendorSeoProductList",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "query": [
      {
        "group": "Query",
        "type": "Number",
        "optional": true,
        "field": "limit",
        "description": "<p>Number of records to return</p>"
      },
      {
        "group": "Query",
        "type": "Number",
        "optional": true,
        "field": "offset",
        "description": "<p>Pagination offset</p>"
      },
      {
        "group": "Query",
        "type": "String",
        "optional": true,
        "field": "status",
        "description": "<p>Product active status</p>"
      },
      {
        "group": "Query",
        "type": "String",
        "optional": true,
        "field": "keyword",
        "description": "<p>Keyword search for product/vendor</p>"
      },
      {
        "group": "Query",
        "type": "String",
        "optional": true,
        "field": "price",
        "description": "<p>Filter by product price</p>"
      },
      {
        "group": "Query",
        "type": "String",
        "optional": true,
        "field": "approvalFlag",
        "description": "<p>Product approval status</p>"
      },
      {
        "group": "Query",
        "type": "String",
        "optional": true,
        "field": "productName",
        "description": "<p>Filter by product name</p>"
      },
      {
        "group": "Query",
        "type": "String",
        "optional": true,
        "field": "vendorName",
        "description": "<p>Filter by vendor name</p>"
      },
      {
        "group": "Query",
        "type": "String",
        "optional": true,
        "field": "sortBy",
        "description": "<p>Field to sort by ('productName', 'stock', 'sku', 'modifiedDate', 'createdDate')</p>"
      },
      {
        "group": "Query",
        "type": "String",
        "optional": true,
        "field": "updatedOn",
        "description": "<p>Filter by modified date</p>"
      },
      {
        "group": "Query",
        "type": "String",
        "optional": true,
        "field": "sortOrder",
        "description": "<p>Sort order ('ASC' or 'DESC')</p>"
      },
      {
        "group": "Query",
        "type": "Number",
        "optional": true,
        "field": "count",
        "description": "<p>Return count only if 1</p>"
      },
      {
        "group": "Query",
        "type": "String",
        "optional": true,
        "field": "sku",
        "description": "<p>Filter by SKU</p>"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Successfully got your product list.\",\n    \"data\": [\n        {\n            \"vendorProductId\": 1,\n            \"productId\": 1,\n            \"name\": \"Product Name\",\n            \"sku\": \"SKU001\",\n            \"price\": 100,\n            \"isActive\": 1,\n            \"vendorCategory\": []\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"status\": 0,\n    \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-product-seo"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/SeoVendorProductController.ts",
    "groupTitle": "Vendor_SEO"
  },
  {
    "type": "post",
    "url": "/api/vendor-product-seo/:productId",
    "title": "Create or Update Product SEO",
    "group": "Vendor_SEO",
    "name": "VendorUpdateProductSeo",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Path": [
          {
            "group": "Path",
            "type": "Number",
            "optional": false,
            "field": "productId",
            "description": "<p>Product ID</p>"
          }
        ]
      }
    },
    "body": [
      {
        "group": "Body",
        "type": "String",
        "optional": true,
        "field": "metaTagTitle",
        "description": "<p>Meta title (max 140 chars)</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": true,
        "field": "metaTagDescription",
        "description": "<p>Meta description (max 160 chars)</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": true,
        "field": "metaTagKeyword",
        "description": "<p>Meta keywords (max 255 chars)</p>"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Seo Updated successfully\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Invalid-Product:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"status\": 0,\n    \"message\": \"Invalid product. \"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-product-seo/:productId"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/SeoVendorProductController.ts",
    "groupTitle": "Vendor_SEO"
  },
  {
    "type": "post",
    "url": "/api/vendor-settings",
    "title": "Create or Update Vendor Settings",
    "group": "Vendor_Settings",
    "name": "CreateOrUpdateVendorSettings",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "body": [
      {
        "group": "Body",
        "type": "String",
        "optional": true,
        "field": "settingSection",
        "description": "<p>Settings section name to update</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": true,
        "field": "siteUrl",
        "description": "<p>Store site URL</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": true,
        "field": "siteName",
        "description": "<p>Store site name</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": true,
        "field": "businessName",
        "description": "<p>Business name</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": true,
        "field": "storeOwner",
        "description": "<p>Store owner name</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": true,
        "field": "storeEmail",
        "description": "<p>Store contact email</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": true,
        "field": "storeTelephone",
        "description": "<p>Store contact phone</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": true,
        "field": "storeAddress1",
        "description": "<p>Store address line 1</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": true,
        "field": "storeAddress2",
        "description": "<p>Store address line 2</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": true,
        "field": "storeCity",
        "description": "<p>Store city</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": true,
        "field": "storePostalCode",
        "description": "<p>Store zip code</p>"
      },
      {
        "group": "Body",
        "type": "Number",
        "optional": true,
        "field": "countryId",
        "description": "<p>Store country ID</p>"
      },
      {
        "group": "Body",
        "type": "Number",
        "optional": true,
        "field": "zoneId",
        "description": "<p>Store zone ID</p>"
      },
      {
        "group": "Body",
        "type": "Number",
        "optional": true,
        "field": "storeCurrencyId",
        "description": "<p>Store currency ID</p>"
      },
      {
        "group": "Body",
        "type": "Number",
        "optional": true,
        "field": "storeLanguageId",
        "description": "<p>Store language ID</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": true,
        "field": "storeLogo",
        "description": "<p>Store logo base64 image</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": true,
        "field": "emailLogo",
        "description": "<p>Email logo base64 image</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": true,
        "field": "invoiceLogo",
        "description": "<p>Invoice logo base64 image</p>"
      },
      {
        "group": "Body",
        "type": "Number",
        "optional": true,
        "field": "maintenanceMode",
        "description": "<p>Maintenance mode flag (0: Off, 1: On)</p>"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Website details updated successfully.\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Validation-Error:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"status\": 0,\n    \"message\": \"Invalid setting ID.\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-settings"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/SettingController.ts",
    "groupTitle": "Vendor_Settings"
  },
  {
    "type": "get",
    "url": "/api/vendor-settings/:id",
    "title": "Get Vendor Settings Detail",
    "group": "Vendor_Settings",
    "name": "GetVendorSettingsDetail",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Path": [
          {
            "group": "Path",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Settings ID</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Successfully get vendor settings\",\n    \"data\": {\n        \"id\": 1,\n        \"siteName\": \"My Store\",\n        \"storeEmail\": \"vendor@example.com\",\n        \"currencyCode\": \"USD\",\n        \"symbolLeft\": \"$\",\n        \"vendor\": {}\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Invalid-Id:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"status\": 0,\n    \"message\": \"Invalid Setting Id\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-settings/:id"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/SettingController.ts",
    "groupTitle": "Vendor_Settings"
  },
  {
    "type": "get",
    "url": "/api/vendor-settings",
    "title": "List Vendor Settings",
    "group": "Vendor_Settings",
    "name": "GetVendorSettingsList",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Successfully got vendor settings\",\n    \"data\": [\n        {\n            \"id\": 1,\n            \"vendorId\": 1,\n            \"storeCurrencyId\": 1,\n            \"currencyCode\": \"USD\",\n            \"symbolLeft\": \"$\",\n            \"symbolRight\": \"\"\n        }\n    ],\n    \"id\": 1\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"status\": 0,\n    \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-settings"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/SettingController.ts",
    "groupTitle": "Vendor_Settings"
  },
  {
    "type": "post",
    "url": "/api/vendor-site-map",
    "title": "Generate Vendor Sitemap",
    "group": "Vendor_Site_Map",
    "name": "CreateVendorSiteMap",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Successfully created siteMap!\",\n    \"data\": {\n        \"siteMapId\": 1,\n        \"userId\": 1,\n        \"userName\": \"Vendor Admin\",\n        \"pathName\": \"sitemap/\",\n        \"fileName\": \"sitemap_1680000000.xml\",\n        \"tenantId\": 1\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Invalid-User:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"status\": 0,\n    \"message\": \"Invalid user!\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-site-map"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/SiteMapController.ts",
    "groupTitle": "Vendor_Site_Map"
  },
  {
    "type": "delete",
    "url": "/api/vendor-site-map/:id",
    "title": "Delete Vendor Sitemap",
    "group": "Vendor_Site_Map",
    "name": "DeleteVendorSiteMap",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Path": [
          {
            "group": "Path",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Sitemap ID</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Successfully Deleted the data !!\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Delete-Failed:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"status\": 0,\n    \"message\": \"Unable to Deleted the data !!\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-site-map/:id"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/SiteMapController.ts",
    "groupTitle": "Vendor_Site_Map"
  },
  {
    "type": "get",
    "url": "/api/vendor-site-map/get-sitemap",
    "title": "Download Vendor Sitemap File",
    "group": "Vendor_Site_Map",
    "name": "DownloadVendorSiteMap",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "query": [
      {
        "group": "Query",
        "type": "String",
        "optional": false,
        "field": "pathName",
        "description": "<p>Relative path to sitemap file</p>"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\nContent-Type: application/xml",
          "type": "file"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"status\": 0,\n    \"message\": \"File download failed\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-site-map/get-sitemap"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/SiteMapController.ts",
    "groupTitle": "Vendor_Site_Map"
  },
  {
    "type": "get",
    "url": "/api/vendor-site-map",
    "title": "List Vendor Sitemaps",
    "group": "Vendor_Site_Map",
    "name": "VendorSiteMapList",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "query": [
      {
        "group": "Query",
        "type": "Number",
        "optional": true,
        "field": "limit",
        "description": "<p>Number of records to return</p>"
      },
      {
        "group": "Query",
        "type": "Number",
        "optional": true,
        "field": "offset",
        "description": "<p>Pagination offset</p>"
      },
      {
        "group": "Query",
        "type": "Number",
        "optional": true,
        "field": "count",
        "description": "<p>Return count only if 1</p>"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Successfully got the list !!\",\n    \"data\": [\n        {\n            \"id\": 1,\n            \"fileName\": \"sitemap_1680000000.xml\",\n            \"pathName\": \"sitemap/\",\n            \"createdDate\": \"2024-01-01T00:00:00.000Z\"\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"status\": 0,\n    \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-site-map"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/SiteMapController.ts",
    "groupTitle": "Vendor_Site_Map"
  },
  {
    "type": "get",
    "url": "/api/vendor-specification",
    "title": "Specification list API",
    "group": "Vendor_Specification",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>count</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "keyword",
            "description": "<p>keyword</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "categoryIds",
            "description": "<p>categoryIds</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n   \"status\": 1,\n   \"messge\": \"Successfully got Specification List.\",\n   \"data\": [\n       {\n           \"createdBy\": 1,\n           \"createdDate\": \"\",\n           \"modifiedBy\": 1,\n           \"modifiedDate\": \"\",\n           \"id\": 1,\n           \"name\": \"\",\n           \"slug\": \"\",\n           \"isActive\": 1,\n           \"isDelete\": 0,\n           \"attributeGroups\": [\n               {\n                   \"createdBy\": 1,\n                   \"createdDate\": \"\",\n                   \"modifiedBy\": 1,\n                   \"modifiedDate\": \"\",\n                   \"id\": 1,\n                   \"name\": \"\",\n                   \"sortOrder\": 1,\n                   \"isActive\": 1,\n                   \"isDelete\": 1,\n                   \"attributes\": [\n                       {\n                           \"createdBy\": 1,\n                           \"createdDate\": \"\",\n                           \"modifiedDate\": \"\",\n                           \"modifiedBy\": 1,\n                           \"type\": \"\",\n                           \"sortOrder\": 1,\n                           \"isMandatory\": 1,\n                           \"description\": \"\",\n                           \"label\": \"\",\n                           \"useAsFilter\": \"\",\n                           \"sectionName\": \"\",\n                           \"defaultValue\": 1,\n                           \"isActive\": 1,\n                           \"isDelete\": 0,\n                           \"attributeValues\": [\n                               {\n                                   \"createdBy\": 1,\n                                   \"createdDate\": \"\",\n                                   \"modifiedBy\": 1,\n                                   \"modifiedDate\": \"\",\n                                   \"id\": 1,\n                                   \"attributeId\": 1,\n                                   \"value\": \"\",\n                                   \"isActive\": 1,\n                                   \"isDelete\": 0\n                               }\n                           ]\n                       }\n                   ]\n               }\n           ],\n           \"attributeCount\": 1,\n           \"attributeGroupCount\": 1\n       }\n   ]\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/specification"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Specification error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/SpecificationController.ts",
    "groupTitle": "Vendor_Specification",
    "name": "GetApiVendorSpecification"
  },
  {
    "type": "get",
    "url": "/api/vendor-specification/vendor-category-list",
    "title": "Get Vendor Category List API",
    "group": "Vendor_Specification",
    "description": "<p>This API retrieves a list of vendor categories with optional filters and pagination.</p>",
    "parameter": {
      "fields": {
        "Query Parameters": [
          {
            "group": "Query Parameters",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit.</p>"
          },
          {
            "group": "Query Parameters",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset.</p>"
          },
          {
            "group": "Query Parameters",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>Keyword.</p>"
          },
          {
            "group": "Query Parameters",
            "type": "Number",
            "optional": false,
            "field": "familyId",
            "description": "<p>familyId.</p>"
          },
          {
            "group": "Query Parameters",
            "type": "Boolean",
            "optional": false,
            "field": "count",
            "description": "<p>count.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request Example",
          "content": "/api/vendor-specification/vendor-category-list?limit=10&offset=0&keyword=mens&familyId=2&count=false",
          "type": "url"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer token is required.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success Response",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": 1,\n  \"message\": \"Successfully got the vendor category list\",\n  \"data\": [\n    {\n      \"categoryId\": \"\",\n      \"sortOrder\": \"\",\n      \"parentInt\": \"\",\n      \"categoryName\": \"\",\n      \"levels\": \"\"\n    }\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-specification/vendor-category-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Error Response",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"status\": 0,\n  \"message\": \"Failed to fetch vendor category list\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/SpecificationController.ts",
    "groupTitle": "Vendor_Specification",
    "name": "GetApiVendorSpecificationVendorCategoryList"
  },
  {
    "type": "get",
    "url": "/api/vendor-specification/vendor-family",
    "title": "Get Vendor Specification Family List API",
    "group": "Vendor_Specification",
    "description": "<p>This API retrieves a list of vendor specification families with optional pagination.</p>",
    "parameter": {
      "fields": {
        "Query Parameters": [
          {
            "group": "Query Parameters",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Query Parameters",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Query Parameters",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>count</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request Example",
          "content": "/api/vendor-specification/family?limit=10&offset=0&count=0",
          "type": "url"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer token is required.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success Response",
          "content": "HTTP/1.1 200 OK\n{\n  \"status\": 1,\n  \"message\": \"Successfully created family.\",\n  \"data\": [\n    {\n      \"createdBy\": \"\",\n      \"createdDate\": \"\",\n      \"modifiedBy\": \"\",\n      \"modifiedDate\": \"\",\n      \"id\": \"\",\n      \"familyName\": \"\",\n      \"isActive\": \"\",\n      \"isDelete\": \"\"\n    }\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-specification/vendor-family"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Error Response",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"status\": 0,\n  \"message\": \"Failed to fetch vendor specification family list\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/SpecificationController.ts",
    "groupTitle": "Vendor_Specification",
    "name": "GetApiVendorSpecificationVendorFamily"
  },
  {
    "type": "post",
    "url": "/api/vendor-tax",
    "title": "Update Vendor Tax Mapping",
    "group": "Vendor_Tax",
    "name": "MapVendorTax",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "body": [
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "taxIds",
        "description": "<p>Comma-separated list of tax IDs to map</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "deleteVendorTaxIds",
        "description": "<p>Comma-separated list of vendor tax IDs to remove</p>"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Successfully updated vendor tax.\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Invalid-Tax:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"status\": 0,\n    \"message\": \"Invalid vendor tax.\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-tax"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/TaxController.ts",
    "groupTitle": "Vendor_Tax"
  },
  {
    "type": "get",
    "url": "/api/vendor-tax/master-tax",
    "title": "List Master Taxes",
    "group": "Vendor_Tax",
    "name": "VendorMasterTaxList",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "query": [
      {
        "group": "Query",
        "type": "Number",
        "optional": true,
        "field": "limit",
        "description": "<p>Number of records to return</p>"
      },
      {
        "group": "Query",
        "type": "Number",
        "optional": true,
        "field": "offset",
        "description": "<p>Pagination offset</p>"
      },
      {
        "group": "Query",
        "type": "String",
        "optional": true,
        "field": "keyword",
        "description": "<p>Keyword search for tax name</p>"
      },
      {
        "group": "Query",
        "type": "String",
        "optional": true,
        "field": "status",
        "description": "<p>Tax status</p>"
      },
      {
        "group": "Query",
        "type": "Number",
        "optional": true,
        "field": "count",
        "description": "<p>Return count only if 1</p>"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Successfully get all tax list\",\n    \"data\": [\n        {\n            \"taxId\": 1,\n            \"taxName\": \"GST\",\n            \"taxPercentage\": \"18.00\",\n            \"taxStatus\": 1\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"status\": 0,\n    \"message\": \"Unable to fetch tax list\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-tax/master-tax"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/TaxController.ts",
    "groupTitle": "Vendor_Tax"
  },
  {
    "type": "get",
    "url": "/api/vendor-tax",
    "title": "List Vendor Taxes",
    "group": "Vendor_Tax",
    "name": "VendorTaxList",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "query": [
      {
        "group": "Query",
        "type": "Number",
        "optional": true,
        "field": "limit",
        "description": "<p>Number of records to return</p>"
      },
      {
        "group": "Query",
        "type": "Number",
        "optional": true,
        "field": "offset",
        "description": "<p>Pagination offset</p>"
      },
      {
        "group": "Query",
        "type": "String",
        "optional": true,
        "field": "status",
        "description": "<p>Tax active status ('0' or '1')</p>"
      },
      {
        "group": "Query",
        "type": "Number",
        "optional": true,
        "field": "count",
        "description": "<p>Return count only if 1</p>"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Successfully get all vendor tax list.\",\n    \"data\": [\n        {\n            \"id\": 1,\n            \"isActive\": 1,\n            \"tax\": {\n                \"taxId\": 1,\n                \"taxName\": \"VAT\",\n                \"taxPercentage\": \"5.00\",\n                \"taxStatus\": 1\n            }\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"status\": 0,\n    \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-tax"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/TaxController.ts",
    "groupTitle": "Vendor_Tax"
  },
  {
    "type": "put",
    "url": "/api/vendor-user/change-password",
    "title": "Change Vendor User Password",
    "group": "Vendor_User",
    "name": "VendorUserChangePassword",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "body": [
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "oldPassword",
        "description": "<p>Current user password</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "newPassword",
        "description": "<p>New password (8-128 chars, uppercase, lowercase, digit/special)</p>"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Your password changed successfully.\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Incorrect-Password:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"status\": 0,\n    \"message\": \"The old password you entered is incorrect.\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-user/change-password"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/VendorUsersController.ts",
    "groupTitle": "Vendor_User"
  },
  {
    "type": "post",
    "url": "/api/vendor-user/edit-profile",
    "title": "Edit Vendor User Profile",
    "group": "Vendor_User",
    "name": "VendorUserEditProfile",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "body": [
      {
        "group": "Body",
        "type": "String",
        "optional": true,
        "field": "username",
        "description": "<p>User username</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": true,
        "field": "email",
        "description": "<p>User email address</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": true,
        "field": "phoneNumber",
        "description": "<p>User contact phone number</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": true,
        "field": "address",
        "description": "<p>User address</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": true,
        "field": "avatar",
        "description": "<p>User avatar base64 string</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": true,
        "field": "avatarFileName",
        "description": "<p>Original avatar file name</p>"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Successfully updated the vendor user profile.\",\n    \"data\": {\n        \"id\": 1,\n        \"username\": \"vendoruser\",\n        \"email\": \"user@vendor.com\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "File-Too-Large:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"status\": 0,\n    \"message\": \"Not Able To Update as The File Size Is Too Large\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-user/edit-profile"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/VendorUsersController.ts",
    "groupTitle": "Vendor_User"
  },
  {
    "type": "get",
    "url": "/api/vendor-user/get-profile",
    "title": "Get Vendor User Profile",
    "group": "Vendor_User",
    "name": "VendorUserGetProfile",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Profile fetched successfully.\",\n    \"data\": {\n        \"id\": 1,\n        \"firstName\": \"John\",\n        \"lastName\": \"Doe\",\n        \"email\": \"john@vendor.com\",\n        \"phoneNumber\": \"1234567890\",\n        \"vendorPrefixId\": \"VND\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"status\": 0,\n    \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-user/get-profile"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/VendorUsersController.ts",
    "groupTitle": "Vendor_User"
  },
  {
    "type": "post",
    "url": "/api/vendor-widget",
    "title": "Create Vendor Widget",
    "group": "Vendor_Widget",
    "name": "CreateVendorWidget",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "body": [
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "title",
        "description": "<p>Widget title (max 255 chars)</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": true,
        "field": "widgetLongTitle",
        "description": "<p>Widget full/long title</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": true,
        "field": "content",
        "description": "<p>Widget description content</p>"
      },
      {
        "group": "Body",
        "type": "Number",
        "optional": false,
        "field": "ShowHomePageWidget",
        "description": "<p>Show on home page flag (1: Yes, 0: No)</p>"
      },
      {
        "group": "Body",
        "type": "Number",
        "optional": false,
        "field": "widgetLinkType",
        "description": "<p>Widget link type (1: Category, 2: Product)</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": true,
        "field": "metaTagTitle",
        "description": "<p>Meta tag title (max 70 chars)</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": true,
        "field": "metaTagDescription",
        "description": "<p>Meta tag description (max 160 chars)</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": true,
        "field": "metaTagKeyword",
        "description": "<p>Meta tag keyword (max 255 chars)</p>"
      },
      {
        "group": "Body",
        "type": "Number",
        "optional": true,
        "field": "position",
        "description": "<p>Widget position ordering</p>"
      },
      {
        "group": "Body",
        "type": "Number[]",
        "optional": true,
        "field": "refId",
        "description": "<p>Array of referenced item IDs (category or product IDs)</p>"
      },
      {
        "group": "Body",
        "type": "Number",
        "optional": false,
        "field": "status",
        "description": "<p>Active status (1: Active, 0: Inactive)</p>"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Widget created successfully.\",\n    \"data\": {\n        \"widgetId\": 1,\n        \"widgetTitle\": \"Featured Products\",\n        \"widgetSlugName\": \"featured-products\",\n        \"isActive\": 1\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Limit-Exceeded:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"status\": 0,\n    \"message\": \"Set-Home-Page Widget exceeds the Limit (MAX 10)..!\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-widget"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/VendorWidgetController.ts",
    "groupTitle": "Vendor_Widget"
  },
  {
    "type": "delete",
    "url": "/api/vendor-widget/:id",
    "title": "Delete Vendor Widget",
    "group": "Vendor_Widget",
    "name": "DeleteVendorWidget",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Path": [
          {
            "group": "Path",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Widget ID</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Widget deleted successfully.\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Widget-Not-Found:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"status\": 0,\n    \"message\": \"Invalid widget ID.\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-widget/:id"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/VendorWidgetController.ts",
    "groupTitle": "Vendor_Widget"
  },
  {
    "type": "get",
    "url": "/api/vendor-widget/widget-detail",
    "title": "Get Vendor Widget Detail",
    "group": "Vendor_Widget",
    "name": "GetVendorWidgetDetail",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "query": [
      {
        "group": "Query",
        "type": "Number",
        "optional": false,
        "field": "widgetId",
        "description": "<p>Widget ID</p>"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Successfully got widget detail.\",\n    \"data\": {\n        \"widgetId\": 1,\n        \"widgetTitle\": \"Featured Products\",\n        \"widgetLinkType\": 2,\n        \"position\": 1,\n        \"isActive\": 1,\n        \"refId\": []\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Widget-Not-Found:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"status\": 0,\n    \"message\": \"Invalid widget ID\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-widget/widget-detail"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/VendorWidgetController.ts",
    "groupTitle": "Vendor_Widget"
  },
  {
    "type": "put",
    "url": "/api/vendor-widget/:id",
    "title": "Update Vendor Widget",
    "group": "Vendor_Widget",
    "name": "UpdateVendorWidget",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Path": [
          {
            "group": "Path",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Widget ID</p>"
          }
        ]
      }
    },
    "body": [
      {
        "group": "Body",
        "type": "String",
        "optional": false,
        "field": "title",
        "description": "<p>Widget title (max 255 chars)</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": true,
        "field": "widgetLongTitle",
        "description": "<p>Widget full/long title</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": true,
        "field": "content",
        "description": "<p>Widget description content</p>"
      },
      {
        "group": "Body",
        "type": "Number",
        "optional": false,
        "field": "ShowHomePageWidget",
        "description": "<p>Show on home page flag (1: Yes, 0: No)</p>"
      },
      {
        "group": "Body",
        "type": "Number",
        "optional": false,
        "field": "widgetLinkType",
        "description": "<p>Widget link type (1: Category, 2: Product)</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": true,
        "field": "metaTagTitle",
        "description": "<p>Meta tag title (max 70 chars)</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": true,
        "field": "metaTagDescription",
        "description": "<p>Meta tag description (max 160 chars)</p>"
      },
      {
        "group": "Body",
        "type": "String",
        "optional": true,
        "field": "metaTagKeyword",
        "description": "<p>Meta tag keyword (max 255 chars)</p>"
      },
      {
        "group": "Body",
        "type": "Number",
        "optional": true,
        "field": "position",
        "description": "<p>Widget position ordering</p>"
      },
      {
        "group": "Body",
        "type": "Number[]",
        "optional": true,
        "field": "refId",
        "description": "<p>Array of referenced item IDs (category or product IDs)</p>"
      },
      {
        "group": "Body",
        "type": "Number",
        "optional": false,
        "field": "status",
        "description": "<p>Active status (1: Active, 0: Inactive)</p>"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Successfully updated the widget.\",\n    \"data\": {\n        \"widgetId\": 1,\n        \"widgetTitle\": \"Updated Featured Products\",\n        \"isActive\": 1\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Widget-Not-Found:",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"status\": 0,\n    \"message\": \"Invalid widget ID.\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-widget/:id"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/VendorWidgetController.ts",
    "groupTitle": "Vendor_Widget"
  },
  {
    "type": "get",
    "url": "/api/vendor-widget",
    "title": "List Vendor Widgets",
    "group": "Vendor_Widget",
    "name": "VendorWidgetList",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer Token</p>"
          }
        ]
      }
    },
    "query": [
      {
        "group": "Query",
        "type": "Number",
        "optional": true,
        "field": "limit",
        "description": "<p>Number of records to return</p>"
      },
      {
        "group": "Query",
        "type": "Number",
        "optional": true,
        "field": "offset",
        "description": "<p>Pagination offset</p>"
      },
      {
        "group": "Query",
        "type": "String",
        "optional": true,
        "field": "keyword",
        "description": "<p>Keyword search for widget title</p>"
      },
      {
        "group": "Query",
        "type": "String",
        "optional": true,
        "field": "status",
        "description": "<p>Filter by active status</p>"
      },
      {
        "group": "Query",
        "type": "Number",
        "optional": true,
        "field": "count",
        "description": "<p>Return count only if 1</p>"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"status\": 1,\n    \"message\": \"Successfully got Widget list.\",\n    \"data\": [\n        {\n            \"widgetId\": 1,\n            \"widgetTitle\": \"Featured Products\",\n            \"position\": 1,\n            \"isActive\": 1\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"status\": 0,\n    \"message\": \"Internal Server Error\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-widget"
      }
    ],
    "version": "0.0.0",
    "filename": "src/api/vendor/controllers/VendorWidgetController.ts",
    "groupTitle": "Vendor_Widget"
  },
  {
    "type": "get",
    "url": "/api/media/bucket-object-count",
    "title": "Bucket-object-count",
    "group": "media",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>list limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "marker",
            "description": "<p>from where to list</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "folderName",
            "description": "<p>Specific Folder Name</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"limit\" : \"\",\n     \"folderName\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get bucket object count!\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/media/bucket-object-count"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "media error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/core/controllers/MediaController.ts",
    "groupTitle": "media",
    "name": "GetApiMediaBucketObjectCount"
  },
  {
    "type": "get",
    "url": "/api/media/bucket-object-list",
    "title": "Bucket-object-list",
    "group": "media",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>list limit</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "marker",
            "description": "<p>from where to list</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "folderName",
            "description": "<p>Specific Folder Name</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"limit\" : \"\",\n     \"folderName\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get bucket object list!\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/media/bucket-object-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "media error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/core/controllers/MediaController.ts",
    "groupTitle": "media",
    "name": "GetApiMediaBucketObjectList"
  },
  {
    "type": "get",
    "url": "/api/media/delete-file",
    "title": "Delete file API",
    "group": "media",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "fileName",
            "description": "<p>File Name</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"fileName\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully Deleted file!\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/media/delete-file"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "media error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/core/controllers/MediaController.ts",
    "groupTitle": "media",
    "name": "GetApiMediaDeleteFile"
  },
  {
    "type": "get",
    "url": "/api/media/search-folder",
    "title": "Search Folder API",
    "group": "media",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "folderName",
            "description": "<p>folderName</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"FolderName\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get Folder!\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/media/search-folder"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "media error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/core/controllers/MediaController.ts",
    "groupTitle": "media",
    "name": "GetApiMediaSearchFolder"
  },
  {
    "type": "get",
    "url": "/api/media/vendor-bucket-object-list",
    "title": "bucket-object-list",
    "group": "media",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>list limit</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "marker",
            "description": "<p>from where to list</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "folderName",
            "description": "<p>Specific Folder Name</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"limit\" : \"\",\n     \"folderName\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get bucket object list!\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/media/bucket-object-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "media error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/core/controllers/MediaController.ts",
    "groupTitle": "media",
    "name": "GetApiMediaVendorBucketObjectList"
  },
  {
    "type": "get",
    "url": "/api/media/vendor-search-folder",
    "title": "search Folder API",
    "group": "media",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "folderName",
            "description": "<p>folderName</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"FolderName\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get Folder!\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/media/vendor-search-folder"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "media error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/core/controllers/MediaController.ts",
    "groupTitle": "media",
    "name": "GetApiMediaVendorSearchFolder"
  },
  {
    "type": "get",
    "url": "/api/media/video-preview-s3",
    "title": "Video-preview-s3 API",
    "group": "media",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>name</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "path",
            "description": "<p>path</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"name\" : \"\",\n     \"path\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get video preview!\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/media/video-preview-s3"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "media error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/core/controllers/MediaController.ts",
    "groupTitle": "media",
    "name": "GetApiMediaVideoPreviewS3"
  },
  {
    "type": "post",
    "url": "/api/media/create-folder",
    "title": "Create Folder",
    "group": "media",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "folderName",
            "description": "<p>Specific Folder Name</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"folderName\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully Created folder!\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/media/create-folder"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "media error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/core/controllers/MediaController.ts",
    "groupTitle": "media",
    "name": "PostApiMediaCreateFolder"
  },
  {
    "type": "post",
    "url": "/api/media/delete-folder",
    "title": "Delete folder API",
    "group": "media",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "folderName",
            "description": "<p>Specific Folder Name</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"folderName\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully Deleted folder!\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/media/delete-folder"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "media error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/core/controllers/MediaController.ts",
    "groupTitle": "media",
    "name": "PostApiMediaDeleteFolder"
  },
  {
    "type": "Post",
    "url": "/api/media/multiple-delete",
    "title": "Delete multiple image",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "group": "media",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "delete",
            "description": "<p>deleting image imgPath</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "{\n     \"status\": \"1\",\n     \"message\": \"successfully delete the multiple images\"\n}\nHTTP/1.1 200 OK",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/media/multiple-delete"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "media error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/core/controllers/MediaController.ts",
    "groupTitle": "media",
    "name": "PostApiMediaMultipleDelete"
  },
  {
    "type": "post",
    "url": "/api/media/upload-file",
    "title": "Upload File",
    "group": "media",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "image",
            "description": "<p>image</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": true,
            "field": "path",
            "description": "<p>Directory Name</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": true,
            "field": "fileName",
            "description": "<p>fileName</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"fileName\":\"\",\n  \"image\": \"\",\n  \"fileType\": \"\",\n  \"documentId\": \"\",\n  \"path\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n  \"message\": \"Successfully upload file\",\n  \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/media/upload-file"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "media error",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"message\": \"Unable to upload file\",\n    \"status\": 0,\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/core/controllers/MediaController.ts",
    "groupTitle": "media",
    "name": "PostApiMediaUploadFile"
  },
  {
    "type": "Post",
    "url": "/api/media/upload-multi-image",
    "title": "Multi image-upload",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "group": "media",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "image",
            "description": "<p>image</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "fileName",
            "description": "<p>fileName</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "{\n     \"status\": \"1\"\n     \"message\": \"successfully uploaded the multiple images\"\n}\nHTTP/1.1 200 OK",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/media/upload-multi-image"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "media error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/core/controllers/MediaController.ts",
    "groupTitle": "media",
    "name": "PostApiMediaUploadMultiImage"
  },
  {
    "type": "post",
    "url": "/api/media/upload-video",
    "title": "Upload video",
    "group": "media",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "file",
            "description": "<p>File</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"file\":\"\",\n}",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n  \"message\": \"Successfully upload file\",\n  \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/media/upload-video"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "media error",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n    \"message\": \"Unable to upload file\",\n    \"status\": 0,\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/core/controllers/MediaController.ts",
    "groupTitle": "media",
    "name": "PostApiMediaUploadVideo"
  },
  {
    "type": "post",
    "url": "/api/media/vendor-create-folder",
    "title": "Create Folder",
    "group": "media",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "folderName",
            "description": "<p>Specific Folder Name</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"folderName\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully Created folder!\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/media/vendor-create-folder"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "media error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/core/controllers/MediaController.ts",
    "groupTitle": "media",
    "name": "PostApiMediaVendorCreateFolder"
  },
  {
    "type": "Get",
    "url": "/api/seo/blog/:blogSlug",
    "title": "Blog Seo Detail API",
    "group": "seo_store",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "blogSlug",
            "description": "<p>blogSlug</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n   \"message\": \"Successfully got Seo details.\",\n    \"data\": {\n         \"seoId\": 1,\n         \"metaTagTitle\": \"\",\n         \"metaTagDescription\": \"\",\n         \"metaTagKeyword\": \"\"\n    }\n   \"status\": \"1\"\n }",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/seo/blog/:blogSlug"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "blogeodetail error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/store/controllers/StoreSeoController.ts",
    "groupTitle": "seo_store",
    "name": "GetApiSeoBlogBlogslug"
  },
  {
    "type": "Get",
    "url": "/api/seo/category/:categorySlug",
    "title": "Category Seo Detail API",
    "group": "seo_store",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "categorySlug",
            "description": "<p>categorySlug</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n   \"message\": \"Successfully get Seo detail. \",\n   \"data\": {\n     \"seoId\": 1,\n     \"metaTagTitle\": \"\",\n     \"metaTagDescription\": \"\",\n     \"metaTagKeyword\": \"\"\n   }\n   \"status\": \"1\"\n }",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/seo/category/:categorySlug"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "CategorySeo error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/store/controllers/StoreSeoController.ts",
    "groupTitle": "seo_store",
    "name": "GetApiSeoCategoryCategoryslug"
  },
  {
    "type": "Get",
    "url": "/api/seo/page/:pageSlug",
    "title": "Page Seo Detail API",
    "group": "seo_store",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "pageSlug",
            "description": "<p>pageSlug</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n   \"message\": \"Successfully got Seo details.\",\n    \"data\": {\n         \"seoId\": 1,\n         \"metaTagTitle\": \"\",\n         \"metaTagDescription\": \"\",\n         \"metaTagKeyword\": \"\"\n    }\n   \"status\": \"1\"\n }",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/seo/page/:pageSlug"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Page Seo error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/store/controllers/StoreSeoController.ts",
    "groupTitle": "seo_store",
    "name": "GetApiSeoPagePageslug"
  },
  {
    "type": "Get",
    "url": "/api/seo/product/:productSlug",
    "title": "Product Seo Detail API",
    "group": "seo_store",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "productSlug",
            "description": "<p>productSlug</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n   \"message\": \"Successfully got Seo details.\",\n   \"data\": {\n     \"seoId\": 1,\n     \"metaTagTitle\": \"\",\n     \"metaTagDescription\": \"\",\n     \"metaTagKeyword\": \"\"\n   }\n   \"status\": \"1\"\n }",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/seo/product/:productSlug"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Product Seo error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/store/controllers/StoreSeoController.ts",
    "groupTitle": "seo_store",
    "name": "GetApiSeoProductProductslug"
  },
  {
    "type": "delete",
    "url": "/api/customer/:id",
    "title": "Customer delete API",
    "group": "vendor_store",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>customer id</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     status: 1,\n     message: 'Customer has been delete successfully.',\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/customer/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "customer delete error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/store/controllers/CustomerController.ts",
    "groupTitle": "vendor_store",
    "name": "DeleteApiCustomerId"
  },
  {
    "type": "Get",
    "url": "/api/product-store/vendor-product-review",
    "title": "Vendor product review List",
    "group": "vendor_store",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "vendorId",
            "description": "<p>vendorId</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>Limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>Offset</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>count in number or boolean</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully got rating list\",\n     \"data\": [{\n      \"review\": \"\",\n       \"rating\": \"\",\n       \"productId\": 1,\n       \"createdDate\": \"\",\n       \"firstName\": \"\",\n       \"lastName\": \"\",\n       \"customerId\": 1,\n       \"isActive\": 1,\n       \"avatar\": \"\",\n       \"avatarPath\": \"\"\n     }]\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/product-store/vendor-product-review"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Vendor Product Review List error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/store/controllers/VendorStoreRatingController.ts",
    "groupTitle": "vendor_store",
    "name": "GetApiProductStoreVendorProductReview"
  },
  {
    "type": "get",
    "url": "/api/vendor-store/category-based-vendor-list",
    "title": "Vendor Details Based on Category API",
    "group": "vendor_store",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          },
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "languageKey",
            "description": ""
          },
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "key",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "count",
            "description": "<p>count</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "categorySlug",
            "description": "<p>categorySlug</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n\"message\": \"Successfully get vendor details based on category\",\n\"status\": \"1\",\n\"data\":        {\n      \"vendorId\": \"\",\n      \"vendorPrefixId\": \"\",\n      \"vendorGroupId\": \"\",\n      \"companyName\": \"\",\n      \"companyCountryId\": \"\",\n      \"companyLogo\": \"\",\n      \"companyLogoPath\": \"\",\n      \"approvalFlag\": \"\",\n      \"companyCoverImage\": \"\",\n      \"companyCoverImagePath\": \"\",\n      \"displayNameUrl\": \"\",\n      \"instagram\": \"\",\n      \"twitter\": \"\",\n      \"youtube\": \"\",\n      \"facebook\": \"\",\n      \"capabilities\": \"\",\n      \"customer\": {\n          \"email\": \"\"\n      },\n      \"vendorMedia\": [],\n      \"companyCountryName\": \"\",\n      \"productCount\": \"\",\n      \"activeProductCount\": \"\",\n      \"products\": [\n          {\n              \"productId\": \"\",\n              \"taxType\": \"\",\n              \"taxValue\": \"\",\n              \"name\": \"\",\n              \"skuId\": \"\",\n              \"quantity\": ,\n              \"rating\": \"\",\n              \"description\": \"\",\n              \"sortOrder\": \"\",\n              \"price\": \"\",\n              \"productSlug\": \"\",\n              \"isActive\": \"\",\n              \"hasStock\": \"\",\n              \"isSimplified\": \"\",\n              \"outOfStockThreshold\": \"\",\n              \"containerName\": \"\",\n              \"image\": \"\",\n              \"maxQuantityAllowedCart\": \"\",\n              \"defaultImage\": \"\",\n              \"skuName\": \"\",\n              \"productDiscount\": \"\",\n              \"productSpecial\": \"\",\n              \"pricerefer\": \"\",\n              \"flag\": \"\",\n              \"stockStatus\": \"\",\n              \"wishListStatus\": \"\"\n          }\n      ]\n  }\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-store/category-based-vendor-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "vendor error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/store/controllers/VendorController.ts",
    "groupTitle": "vendor_store",
    "name": "GetApiVendorStoreCategoryBasedVendorList"
  },
  {
    "type": "get",
    "url": "/api/vendor-store/vendor-details/:displayNameUrl",
    "title": "Vendor Details API",
    "group": "vendor_store",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully got vendor details.\",\n     \"data\":{\n         \"vendorId\" : 1,\n         \"firstName\" : \"\",\n         \"lastName\" : \"\",\n         \"email\" : \"\",\n         \"mobileNumber\" : \"\",\n         \"avatar\" : \"\",\n         \"avatarPath\" : \"\",\n         \"commission\" : \"\",\n         \"status\" : 1,\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-store/vendor-details/:displayNameUrl"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "vendor error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/store/controllers/VendorController.ts",
    "groupTitle": "vendor_store",
    "name": "GetApiVendorStoreVendorDetailsDisplaynameurl"
  },
  {
    "type": "get",
    "url": "/api/vendor-store/vendor-product-list",
    "title": "Vendor Product list API",
    "group": "vendor_store",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "limit",
            "description": "<p>limit</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>offset</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "count",
            "description": "<p>count</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "categorySlug",
            "description": "<p>categorySlug</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n\"message\": \"Successfully get vendor product list\",\n\"data\": {\n      \"productId\": 1,\n      \"taxType\": 1,\n      \"taxValue\": \"\",\n      \"name\": \"\",\n      \"skuId\": \"\",\n      \"quantity\": \"\",\n      \"rating\": \"\",\n      \"description\": \"\",\n      \"sortOrder\": \"\",\n      \"price\": \"\",\n      \"productSlug\": \"\",\n      \"isActive\": \"\",\n      \"hasStock\": \"\",\n      \"isSimplified\": ,\n      \"outOfStockThreshold\": \"\",\n      \"containerName\": \"\",\n      \"image\": \"\",\n      \"maxQuantityAllowedCart\": \"\",\n      \"defaultImage\": \"\",\n      \"skuName\": \"\",\n      \"productDiscount\": \"\",\n      \"productSpecial\": \"\",\n      \"pricerefer\": \"\",\n      \"flag\": \"\",\n      \"stockStatus\": \"\",\n      \"wishListStatus\": \"\"\n  }\n\"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-store/vendor-product-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "vendor error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/store/controllers/VendorController.ts",
    "groupTitle": "vendor_store",
    "name": "GetApiVendorStoreVendorProductList"
  },
  {
    "type": "post",
    "url": "/api/customer/admin-contact",
    "title": "Seller Contact API",
    "group": "vendor_store",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "firstName",
            "description": ""
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "lastName",
            "description": ""
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "emailId",
            "description": ""
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "files",
            "description": ""
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "userRequirements",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n    \"firstName\": \"\",\n    \"lastName\": \"\",\n    \"emailId\": \"\",\n    \"files\": [],\n    \"userRequirements\": \"\"\n}",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{Your email has been successfully sent to the seller\n     \"message\": \"Your email has been successfully sent to the seller\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/customer/admin-contact"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "contactSeller error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/store/controllers/CustomerController.ts",
    "groupTitle": "vendor_store",
    "name": "PostApiCustomerAdminContact"
  },
  {
    "type": "post",
    "url": "/api/vendor-store/contact-seller",
    "title": "Contact Seller API",
    "group": "vendor_store",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "vendorId",
            "description": ""
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": ""
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": ""
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "mobileNumber",
            "description": ""
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "country",
            "description": ""
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "requirement",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"vendorId\": \"\",\n     \"name\": \"\",\n     \"email\": \"\",\n     \"mobileNumber\": \"\",\n     \"country\": \"\",\n     \"requirement\": \"\",\n}",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Request has been sent successfully\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-store/contact-seller"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "contactSeller error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/store/controllers/VendorController.ts",
    "groupTitle": "vendor_store",
    "name": "PostApiVendorStoreContactSeller"
  },
  {
    "type": "post",
    "url": "/api/vendor-store/seller-contact",
    "title": "Seller Contact API",
    "group": "vendor_store",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "firstName",
            "description": ""
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "lastName",
            "description": ""
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "emailId",
            "description": ""
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "mobileNo",
            "description": ""
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "pincode",
            "description": ""
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "city",
            "description": ""
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "state",
            "description": ""
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "country",
            "description": ""
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "userRequirements",
            "description": ""
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "sellerEmailId",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n    \"firstName\": \"\",\n    \"lastName\": \"\",\n    \"emailId\": \"\",\n    \"userRequirements\": \"\",\n    \"sellerEmailId\": \"\"\n}",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{Your email has been successfully sent to the seller\n     \"message\": \"Your email has been successfully sent to the seller\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/vendor-store/seller-contact"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "contactSeller error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/store/controllers/VendorController.ts",
    "groupTitle": "vendor_store",
    "name": "PostApiVendorStoreSellerContact"
  }
] });
