define({ "api": [
  {
    "type": "delete",
    "url": "/api/address/delete-address/:id",
    "title": "Delete Address API",
    "group": "Address",
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
        "url": "/api/address/delete-address/:id"
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
    "filename": "src/api/admin/controllers/AddressController.ts",
    "groupTitle": "Address",
    "name": "DeleteApiAddressDeleteAddressId"
  },
  {
    "type": "get",
    "url": "/api/address/addresslist",
    "title": "Address List API",
    "group": "Address",
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
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get address list\",\n     \"data\":\"{}\"\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/address/addresslist"
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
    "filename": "src/api/admin/controllers/AddressController.ts",
    "groupTitle": "Address",
    "name": "GetApiAddressAddresslist"
  },
  {
    "type": "get",
    "url": "/api/address/get-address-list/:id",
    "title": "Get Customer Address  API",
    "group": "Address",
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
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get customer address list\",\n     \"data\":\"{}\"\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/address/get-address-list/:id"
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
    "filename": "src/api/admin/controllers/AddressController.ts",
    "groupTitle": "Address",
    "name": "GetApiAddressGetAddressListId"
  },
  {
    "type": "post",
    "url": "/api/address/add-address",
    "title": "Add Customer Address API",
    "group": "Address",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "customerId",
            "description": "<p>customerId</p>"
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
            "optional": false,
            "field": "state",
            "description": "<p>state</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "size": "..10",
            "optional": false,
            "field": "postcode",
            "description": "<p>postcode</p>"
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
            "type": "Number",
            "optional": false,
            "field": "countryId",
            "description": "<p>countryId</p>"
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
          "content": "{\n     \"customerId\" : \"\",\n     \"address1\" : \"\",\n     \"address2\" : \"\",\n     \"city\" : \"\",\n     \"state\" : \"\",\n     \"postcode\" : \"\",\n     \"addressType\" : \"\",\n     \"countryId\" : \"\",\n     \"company\" : \"\",\n}",
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
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"New Address is created successfully\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/address/add-address"
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
    "filename": "src/api/admin/controllers/AddressController.ts",
    "groupTitle": "Address",
    "name": "PostApiAddressAddAddress"
  },
  {
    "type": "put",
    "url": "/api/address/update-address/:id",
    "title": "Update Address API",
    "group": "Address",
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
            "field": "customerId",
            "description": "<p>customerId</p>"
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
            "size": "..10",
            "optional": false,
            "field": "postcode",
            "description": "<p>postcode</p>"
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
            "type": "Number",
            "optional": false,
            "field": "countryId",
            "description": "<p>countryId</p>"
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
          "content": "{\n     \"customerId\" : \"\",\n     \"address1\" : \"\",\n     \"address2\" : \"\",\n     \"city\" : \"\",\n     \"state\" : \"\",\n     \"postcode\" : \"\",\n     \"addressType\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully updated address.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/address/update-address/:id"
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
    "filename": "src/api/admin/controllers/AddressController.ts",
    "groupTitle": "Address",
    "name": "PutApiAddressUpdateAddressId"
  },
  {
    "type": "get",
    "url": "/api/auditlog/auditLog-list",
    "title": "Audit Log list API",
    "group": "Audit_Log",
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
            "field": "module",
            "description": "<p>module</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "actionBy",
            "description": "<p>actionBy</p>"
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
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get Attribute Group list API\",\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/auditlog/auditLog-list"
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
    "filename": "src/api/admin/controllers/AuditLogController.ts",
    "groupTitle": "Audit_Log",
    "name": "GetApiAuditlogAuditlogList"
  },
  {
    "type": "get",
    "url": "/api/auditlog/module-list",
    "title": "Module Log list API",
    "group": "Audit_Log",
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
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get Attribute Group list API\",\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/auditlog/module-list"
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
    "filename": "src/api/admin/controllers/AuditLogController.ts",
    "groupTitle": "Audit_Log",
    "name": "GetApiAuditlogModuleList"
  },
  {
    "type": "post",
    "url": "/api/auditlog/delete-auditlog",
    "title": "Delete Audit Log API",
    "group": "Audit_Log",
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
            "field": "fromDate",
            "description": "<p>createdDate</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "toDate",
            "description": "<p>createddate</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n \"fromDate\" : \"\",\n \"toDate\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n\"message\": \"Successfully deleted Audit log.\",\n\"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/auditlog/delete-auditlog"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "AuditLog error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/admin/controllers/AuditLogController.ts",
    "groupTitle": "Audit_Log",
    "name": "PostApiAuditlogDeleteAuditlog"
  },
  {
    "type": "delete",
    "url": "/api/auth/delete-user/:id",
    "title": "Delete User",
    "group": "Authentication",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>UserId</p>"
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
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"User is deleted successfully\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/auth/delete-user/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "updateUser error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/admin/controllers/UserController.ts",
    "groupTitle": "Authentication",
    "name": "DeleteApiAuthDeleteUserId"
  },
  {
    "type": "get",
    "url": "/api/auth/forgot-password-key-check",
    "title": "Forgot Password Key check API",
    "group": "Authentication",
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
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/auth/forgot-password-key-check"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "admin forget password error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/admin/controllers/UserController.ts",
    "groupTitle": "Authentication",
    "name": "GetApiAuthForgotPasswordKeyCheck"
  },
  {
    "type": "get",
    "url": "/api/auth/get-profile",
    "title": "Get User Profile API",
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
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully Get the Profile..!\",\n     \"status\": \"1\"\n      \"data\":{}\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/auth/get-profile"
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
    "filename": "src/api/admin/controllers/UserController.ts",
    "groupTitle": "Authentication",
    "name": "GetApiAuthGetProfile"
  },
  {
    "type": "get",
    "url": "/api/auth/get-sitemap",
    "title": "Get Sitemap API",
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
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully Get the Sitemap..!\",\n     \"status\": \"1\"\n      \"data\":{}\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/auth/get-sitemap"
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
    "filename": "src/api/admin/controllers/UserController.ts",
    "groupTitle": "Authentication",
    "name": "GetApiAuthGetSitemap"
  },
  {
    "type": "get",
    "url": "/api/auth/userlist",
    "title": "User List API",
    "group": "Authentication",
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
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get user list\",\n     \"data\":\"{}\"\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/auth/userlist"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "User Profile error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/admin/controllers/UserController.ts",
    "groupTitle": "Authentication",
    "name": "GetApiAuthUserlist"
  },
  {
    "type": "post",
    "url": "/api/auth/create-user",
    "title": "Create User API",
    "group": "Authentication",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "size": "..96",
            "optional": false,
            "field": "username",
            "description": "<p>userName</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "size": "8..128",
            "optional": false,
            "field": "password",
            "description": "<p>password</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "size": "..32",
            "optional": false,
            "field": "firstName",
            "description": "<p>User First Name</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "size": "..32",
            "optional": false,
            "field": "lastName",
            "description": "<p>User Last Name</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "size": "..96",
            "optional": false,
            "field": "email",
            "description": "<p>User Email-Id</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "userGroupId",
            "description": "<p>User GroupId</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"username\" : \"\",\n     \"password\" : \"\",\n     \"firstName\" : \"\",\n     \"lastName\" : \"\",\n     \"email\" : \"\",\n     \"userGroupId\" : \"\",\n}",
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
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"New User is created successfully\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/auth/create-user"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "createUser error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/admin/controllers/UserController.ts",
    "groupTitle": "Authentication",
    "name": "PostApiAuthCreateUser"
  },
  {
    "type": "post",
    "url": "/api/auth/edit-profile",
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
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully updated User.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/auth/edit-profile"
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
    "filename": "src/api/admin/controllers/UserController.ts",
    "groupTitle": "Authentication",
    "name": "PostApiAuthEditProfile"
  },
  {
    "type": "post",
    "url": "/api/auth/forgot-password",
    "title": "Forgot Password API",
    "group": "Authentication",
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
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Thank you. Your password send to your email\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/auth/forgot-password"
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
    "filename": "src/api/admin/controllers/UserController.ts",
    "groupTitle": "Authentication",
    "name": "PostApiAuthForgotPassword"
  },
  {
    "type": "post",
    "url": "/api/auth/forgot-password-link",
    "title": "Forgot Password Link API",
    "group": "Authentication",
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
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/auth/forgot-password-link"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "admin forgot password error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/admin/controllers/UserController.ts",
    "groupTitle": "Authentication",
    "name": "PostApiAuthForgotPasswordLink"
  },
  {
    "type": "post",
    "url": "/api/auth/login",
    "title": "Login",
    "group": "Authentication",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>User Username</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>User Password</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"username\" : \"\",\n     \"password\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"data\": \"{\n        \"token\":''\n     }\",\n     \"message\": \"Successfully login\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/auth/login"
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
    "filename": "src/api/admin/controllers/UserController.ts",
    "groupTitle": "Authentication",
    "name": "PostApiAuthLogin"
  },
  {
    "type": "post",
    "url": "/api/auth/logout",
    "title": "Log Out API",
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
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully logout\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/auth/logout"
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
    "filename": "src/api/admin/controllers/UserController.ts",
    "groupTitle": "Authentication",
    "name": "PostApiAuthLogout"
  },
  {
    "type": "put",
    "url": "/api/auth/change-password",
    "title": "Change Password API",
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
            "optional": false,
            "field": "oldPassword",
            "description": "<p>User oldPassword</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "newPassword",
            "description": "<p>User newPassword</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"oldPassword\" : \"\",\n     \"newPassword\" : \"\",\n}",
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
        "url": "/api/auth/change-password"
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
    "filename": "src/api/admin/controllers/UserController.ts",
    "groupTitle": "Authentication",
    "name": "PutApiAuthChangePassword"
  },
  {
    "type": "put",
    "url": "/api/auth/reset-password",
    "title": "Reset Password API",
    "group": "Authentication",
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
        "url": "/api/auth/reset-password"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "admin resetpassword error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/admin/controllers/UserController.ts",
    "groupTitle": "Authentication",
    "name": "PutApiAuthResetPassword"
  },
  {
    "type": "put",
    "url": "/api/auth/update-user/:id",
    "title": "Update User API",
    "group": "Authentication",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>userName</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": true,
            "field": "password",
            "description": "<p>password</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "size": "..32",
            "optional": false,
            "field": "firstName",
            "description": "<p>User First Name</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "size": "..32",
            "optional": false,
            "field": "lastName",
            "description": "<p>User Last Name</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User Email-Id</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "userGroupId",
            "description": "<p>User GroupId</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"username\" : \"\",\n     \"password\" : \"\",\n     \"firstName\" : \"\",\n     \"lastName\" : \"\",\n     \"email\" : \"\",\n     \"userGroupId\" : \"\",\n}",
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
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"User is updated successfully\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/auth/update-user/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "updateUser error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/admin/controllers/UserController.ts",
    "groupTitle": "Authentication",
    "name": "PutApiAuthUpdateUserId"
  },
  {
    "type": "delete",
    "url": "/api/category/:id",
    "title": "Delete Category API",
    "group": "Category",
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
            "field": "categoryId",
            "description": "<p>Category categoryId</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"categoryId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully deleted Category.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/category/:id"
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
    "filename": "src/api/admin/controllers/CategoryController.ts",
    "groupTitle": "Category",
    "name": "DeleteApiCategoryId"
  },
  {
    "type": "get",
    "url": "/api/category",
    "title": "Category List API",
    "group": "Category",
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
            "field": "sortOrder",
            "description": "<p>sortOrder</p>"
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
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"successfully got the complete category list.\",\n     \"data\":\"{ }\"\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/category"
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
    "filename": "src/api/admin/controllers/CategoryController.ts",
    "groupTitle": "Category",
    "name": "GetApiCategory"
  },
  {
    "type": "get",
    "url": "/api/category-count",
    "title": "Category Count API",
    "group": "Category",
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
            "field": "sortOrder",
            "description": "<p>sortOrder</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>status</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"successfully got the complete category count.\",\n     \"data\":\"{ }\"\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/category-count"
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
    "filename": "src/api/admin/controllers/CategoryController.ts",
    "groupTitle": "Category",
    "name": "GetApiCategoryCount"
  },
  {
    "type": "get",
    "url": "/api/category-detail",
    "title": "Category Detail API",
    "group": "Category",
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
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully got Category detail\",\n     \"data\": \"{}\"\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/category-detail"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "category error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/admin/controllers/CategoryController.ts",
    "groupTitle": "Category",
    "name": "GetApiCategoryDetail"
  },
  {
    "type": "get",
    "url": "/api/category-excel-list",
    "title": "Category Excel",
    "group": "Category",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "categoryId",
            "description": "<p>categoryId</p>"
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
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully download the Category Excel List..!!\",\n     \"status\": \"1\",\n     \"data\": {},\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/category-excel-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "category Excel List error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/admin/controllers/CategoryController.ts",
    "groupTitle": "Category",
    "name": "GetApiCategoryExcelList"
  },
  {
    "type": "get",
    "url": "/api/category-export-all",
    "title": "Category Export All API",
    "group": "Category",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>status</p>"
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
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully download the category Excel List..!!\",\n     \"status\": \"1\",\n     \"data\": {},\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/category-export-all"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Category Excel List error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/admin/controllers/CategoryController.ts",
    "groupTitle": "Category",
    "name": "GetApiCategoryExportAll"
  },
  {
    "type": "get",
    "url": "/api/category-list-intree",
    "title": "Category List InTree API",
    "group": "Category",
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
            "field": "sortOrder",
            "description": "<p>sortOrder</p>"
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
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"successfully got the complete category list.\",\n     \"data\":\"{}\"\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/category-list-intree"
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
    "filename": "src/api/admin/controllers/CategoryController.ts",
    "groupTitle": "Category",
    "name": "GetApiCategoryListIntree"
  },
  {
    "type": "post",
    "url": "/api/category",
    "title": "Add Category API",
    "group": "Category",
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
            "description": "<p>Category name</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": true,
            "field": "image",
            "description": "<p>Category image</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": true,
            "field": "parentInt",
            "description": "<p>Category  parentInt</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "size": "..9999",
            "optional": false,
            "field": "sortOrder",
            "description": "<p>Category sortOrder</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>Category status 1-&gt; Active 0-&gt; inactive</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "categorySlug",
            "description": ""
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": true,
            "field": "categoryDescription",
            "description": "<p>Category categoryDescription</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"name\" : \"\",\n     \"image\" : \"\",\n     \"parentInt\" : \"\",\n     \"sortOrder\" : \"\",\n     \"status\" : \"\",\n     \"categoryDescription\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully created new Category.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/category"
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
    "filename": "src/api/admin/controllers/CategoryController.ts",
    "groupTitle": "Category",
    "name": "PostApiCategory"
  },
  {
    "type": "put",
    "url": "/api/category/:id",
    "title": "Update Category API",
    "group": "Category",
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
            "field": "categoryId",
            "description": "<p>Category categoryId</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Category name</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": true,
            "field": "image",
            "description": "<p>Category image</p>"
          },
          {
            "group": "Request body",
            "type": "number",
            "optional": true,
            "field": "parentInt",
            "description": "<p>Category  parentInt</p>"
          },
          {
            "group": "Request body",
            "type": "number",
            "size": "..9999",
            "optional": false,
            "field": "sortOrder",
            "description": "<p>Category sortOrder</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "categorySlug",
            "description": ""
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": true,
            "field": "status",
            "description": "<p>Category status 1-&gt; Active 0-&gt; inactive</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": true,
            "field": "categoryDescription",
            "description": "<p>Category categoryDescription</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"categoryId\" : \"\",\n     \"name\" : \"\",\n     \"image\" : \"\",\n     \"imagePath\" : \"\",\n     \"parentInt\" : \"\",\n     \"sortOrder\" : \"\",\n     \"status\" : \"\",\n     \"categoryDescription\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully updated Category.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/category/:id"
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
    "filename": "src/api/admin/controllers/CategoryController.ts",
    "groupTitle": "Category",
    "name": "PutApiCategoryId"
  },
  {
    "type": "put",
    "url": "/api/update-category-slug",
    "title": "Update Category Slug API",
    "group": "Category",
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
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully updated Category Slug.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/update-category-slug"
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
    "filename": "src/api/admin/controllers/CategoryController.ts",
    "groupTitle": "Category",
    "name": "PutApiUpdateCategorySlug"
  },
  {
    "type": "delete",
    "url": "/api/country/delete-country/:id",
    "title": "Delete Country API",
    "group": "Country",
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
          "content": "{\n     \"countryId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully deleted Country.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/country/delete-country/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Country error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/admin/controllers/CountryController.ts",
    "groupTitle": "Country",
    "name": "DeleteApiCountryDeleteCountryId"
  },
  {
    "type": "get",
    "url": "/api/country/countrylist",
    "title": "Country List API",
    "group": "Country",
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
            "field": "status",
            "description": "<p>status</p>"
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
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully got country list\",\n     \"data\":{\n     \"countryId\"\n     \"name\"\n     \"isoCode2\"\n     \"isoCode3\"\n     \"addressFormat\"\n     \"postcodeRequired\"\n     \"status\"\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/country/countrylist"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Country error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/admin/controllers/CountryController.ts",
    "groupTitle": "Country",
    "name": "GetApiCountryCountrylist"
  },
  {
    "type": "post",
    "url": "/api/country/add-country",
    "title": "Add Country API",
    "group": "Country",
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
            "size": "..30",
            "optional": false,
            "field": "name",
            "description": "<p>Country name</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "size": "..2",
            "optional": false,
            "field": "isoCode2",
            "description": "<p>Country isoCode2</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "size": "..3",
            "optional": false,
            "field": "isoCode3",
            "description": "<p>Country isoCode3</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "postcodeRequired",
            "description": "<p>Country postcodeRequired</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>Country status field required</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"name\" : \"\",\n     \"isoCode2\" : \"\",\n     \"isoCode3\" : \"\",\n     \"addressFormat\" : \"\",\n     \"postcodeRequired\" : \"\",\n     \"status\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully created new Country.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/country/add-country"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Country error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/admin/controllers/CountryController.ts",
    "groupTitle": "Country",
    "name": "PostApiCountryAddCountry"
  },
  {
    "type": "put",
    "url": "/api/country/update-country/:id",
    "title": "Update Country API",
    "group": "Country",
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
            "field": "countryId",
            "description": "<p>Country countryId</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "size": "..30",
            "optional": false,
            "field": "name",
            "description": "<p>Country name</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "size": "..2",
            "optional": false,
            "field": "isoCode2",
            "description": "<p>Country isoCode2</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "size": "..3",
            "optional": false,
            "field": "isoCode3",
            "description": "<p>Country isoCode3</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "postcodeRequired",
            "description": "<p>Country postcodeRequired</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": true,
            "field": "status",
            "description": "<p>status</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"countryId\" : \"\",\n     \"name\" : \"\",\n     \"isoCode2\" : \"\",\n     \"isoCode3\" : \"\",\n     \"addressFormat\" : \"\",\n     \"postcodeRequired\" : \"\",\n     \"status\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully updated Country.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/country/update-country/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Country error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/admin/controllers/CountryController.ts",
    "groupTitle": "Country",
    "name": "PutApiCountryUpdateCountryId"
  },
  {
    "type": "delete",
    "url": "/api/currency/delete-currency/:id",
    "title": "Delete Currency API",
    "group": "Currency",
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
          "content": "{\n     \"currencyId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully deleted currency.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/currency/delete-currency/:id"
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
    "filename": "src/api/admin/controllers/CurrencyController.ts",
    "groupTitle": "Currency",
    "name": "DeleteApiCurrencyDeleteCurrencyId"
  },
  {
    "type": "get",
    "url": "/api/currency/currencylist",
    "title": "Currency List API",
    "group": "Currency",
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
            "field": "status",
            "description": "<p>status</p>"
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
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get currency list\",\n     \"data\":{\n      \"currencyId\" : \"\",\n      \"title\" : \"\",\n      \"code\" : \"\",\n      \"value\" : \"\",\n      \"update\" : \"\",\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/currency/currencylist"
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
    "filename": "src/api/admin/controllers/CurrencyController.ts",
    "groupTitle": "Currency",
    "name": "GetApiCurrencyCurrencylist"
  },
  {
    "type": "post",
    "url": "/api/currency/add-currency",
    "title": "Add Currency API",
    "group": "Currency",
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
            "size": "..30",
            "optional": false,
            "field": "title",
            "description": "<p>Currency title</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "size": "..4",
            "optional": false,
            "field": "code",
            "description": "<p>Currency code</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "size": "..4",
            "optional": false,
            "field": "symbolLeft",
            "description": "<p>Currency symbolLeft</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "size": "..4",
            "optional": false,
            "field": "symbolRight",
            "description": "<p>Currency  symbolRight</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>Currency status</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"title\" : \"\",\n     \"code\" : \"\",\n     \"symbolLeft\" : \"\",\n     \"symbolRight\" : \"\",\n     \"status\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully created new Currency.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/currency/add-currency"
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
    "filename": "src/api/admin/controllers/CurrencyController.ts",
    "groupTitle": "Currency",
    "name": "PostApiCurrencyAddCurrency"
  },
  {
    "type": "put",
    "url": "/api/currency/update-currency/:id",
    "title": "Update Currency API",
    "group": "Currency",
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
            "field": "currencyId",
            "description": "<p>Currency currencyId</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "size": "..30",
            "optional": false,
            "field": "title",
            "description": "<p>Currency title</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "size": "..3",
            "optional": true,
            "field": "code",
            "description": "<p>Currency code</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "size": "..4",
            "optional": false,
            "field": "symbolLeft",
            "description": "<p>Currency symbolLeft</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "size": "..4",
            "optional": false,
            "field": "symbolRight",
            "description": "<p>Currency  symbolRight</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>Currency status</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"currencyId\" : \"\",\n     \"title\" : \"\",\n     \"code\" : \"\",\n     \"symbolLeft\" : \"\",\n     \"symbolRight\" : \"\",\n     \"status\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully updated Currency.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/currency/update-currency/:id"
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
    "filename": "src/api/admin/controllers/CurrencyController.ts",
    "groupTitle": "Currency",
    "name": "PutApiCurrencyUpdateCurrencyId"
  },
  {
    "type": "delete",
    "url": "/api/admin-customer/:id",
    "title": "Delete Customer API",
    "group": "Customer",
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
          "content": "{\n     \"customerId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully deleted customer.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/admin-customer/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Customer error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/admin/controllers/CustomerController.ts",
    "groupTitle": "Customer",
    "name": "DeleteApiAdminCustomerId"
  },
  {
    "type": "get",
    "url": "/api/admin-customer",
    "title": "Customer List API",
    "group": "Customer",
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
            "field": "name",
            "description": "<p>search by name</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>search by email</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>0-&gt;inactive 1-&gt; active</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "customerGroup",
            "description": "<p>search by customerGroup</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "date",
            "description": "<p>search by date</p>"
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
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get customer list\",\n     \"data\":{\n     \"customerGroupId\" : \"\",\n     \"username\" : \"\",\n     \"email\" : \"\",\n     \"mobileNUmber\" : \"\",\n     \"password\" : \"\",\n     \"avatar\" : \"\",\n     \"avatarPath\" : \"\",\n     \"status\" : \"\",\n     \"safe\" : \"\",\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/admin-customer"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "customer error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/admin/controllers/CustomerController.ts",
    "groupTitle": "Customer",
    "name": "GetApiAdminCustomer"
  },
  {
    "type": "get",
    "url": "/api/admin-customer/allcustomer-excel-list",
    "title": "All Customer Excel",
    "group": "Customer",
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
            "field": "status",
            "description": "<p>status</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>email</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "customerGroup",
            "description": "<p>customerGroup</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "date",
            "description": "<p>date</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully download the All Customer Excel List..!!\",\n     \"status\": \"1\",\n     \"data\": {},\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/admin-customer/allcustomer-excel-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "All Customer Excel List error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/admin/controllers/CustomerController.ts",
    "groupTitle": "Customer",
    "name": "GetApiAdminCustomerAllcustomerExcelList"
  },
  {
    "type": "get",
    "url": "/api/admin-customer/customer-count",
    "title": "Customer Count API",
    "group": "Customer",
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
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get customer count\",\n     \"data\":{},\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/admin-customer/customer-count"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "customer error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/admin/controllers/CustomerController.ts",
    "groupTitle": "Customer",
    "name": "GetApiAdminCustomerCustomerCount"
  },
  {
    "type": "get",
    "url": "/api/admin-customer/customer-detail/:id",
    "title": "Customer Details API",
    "group": "Customer",
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
          "content": "HTTP/1.1 200 OK\n{\n\"message\": \"Successfully get customer Details\",\n\"data\":{\n\"customerGroupId\" : \"\",\n\"username\" : \"\",\n\"email\" : \"\",\n\"mobileNumber\" : \"\",\n\"password\" : \"\",\n\"avatar\" : \"\",\n\"avatarPath\" : \"\",\n\"newsletter\" : \"\",\n\"status\" : \"\",\n\"safe\" : \"\",\n}\n\"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/admin-customer/customer-detail/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "customer error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/admin/controllers/CustomerController.ts",
    "groupTitle": "Customer",
    "name": "GetApiAdminCustomerCustomerDetailId"
  },
  {
    "type": "get",
    "url": "/api/admin-customer/customer-excel-list",
    "title": "Customer Excel",
    "group": "Customer",
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
            "field": "customerId",
            "description": "<p>customerId</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully download the Customer Excel List..!!\",\n     \"status\": \"1\",\n     \"data\": {},\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/admin-customer/customer-excel-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Customer Excel List error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/admin/controllers/CustomerController.ts",
    "groupTitle": "Customer",
    "name": "GetApiAdminCustomerCustomerExcelList"
  },
  {
    "type": "get",
    "url": "/api/admin-customer/customer-visit-list",
    "title": "Dashboard Customer Visit List API",
    "group": "Customer",
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
            "field": "month",
            "description": "<p>month</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "year",
            "description": "<p>year</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"month\": \"\",\n     \"year\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"status\": \"1\"\n     \"message\": \"Successfully get customer visit list\",\n     \"data\":{\n     }\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/admin-customer/customer-visit-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "customer list error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/admin/controllers/CustomerController.ts",
    "groupTitle": "Customer",
    "name": "GetApiAdminCustomerCustomerVisitList"
  },
  {
    "type": "get",
    "url": "/api/admin-customer/order-product-list",
    "title": "Order Product List API",
    "group": "Customer",
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
            "field": "customerId",
            "description": "<p>customerId</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get order product list\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/admin-customer/order-product-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "OrderProductList error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/admin/controllers/CustomerController.ts",
    "groupTitle": "Customer",
    "name": "GetApiAdminCustomerOrderProductList"
  },
  {
    "type": "get",
    "url": "/api/admin-customer/product-view-log-list",
    "title": "Product View Log List API",
    "group": "Customer",
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
            "field": "customerId",
            "description": "<p>customerId</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get product view log list\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/admin-customer/product-view-log-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "ProductViewLogList error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/admin/controllers/CustomerController.ts",
    "groupTitle": "Customer",
    "name": "GetApiAdminCustomerProductViewLogList"
  },
  {
    "type": "get",
    "url": "/api/admin-customer/recent-customerlist",
    "title": "Recent Customer List API",
    "group": "Customer",
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
          "content": "HTTP/1.1 200 OK\n{\n     \"status\": \"1\"\n     \"message\": \"Successfully get customer list\",\n     \"data\":{\n     \"location\" : \"\",\n     \"name\" : \"\",\n     \"created date\" : \"\",\n     \"isActive\" : \"\",\n     }\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/admin-customer/recent-customerlist"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "customer error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/admin/controllers/CustomerController.ts",
    "groupTitle": "Customer",
    "name": "GetApiAdminCustomerRecentCustomerlist"
  },
  {
    "type": "get",
    "url": "/api/admin-customer/today-customercount",
    "title": "Today Customer Count API",
    "group": "Customer",
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
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get Today customer count\",\n     \"data\":{\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/admin-customer/today-customercount"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "order error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/admin/controllers/CustomerController.ts",
    "groupTitle": "Customer",
    "name": "GetApiAdminCustomerTodayCustomercount"
  },
  {
    "type": "delete",
    "url": "/api/customer-group/:id",
    "title": "Delete Customer Group API",
    "group": "CustomerGroup",
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
            "field": "groupId",
            "description": "<p>groupId</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"groupId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully deleted customerGroup.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/customer-group/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "CustomerGroup error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/admin/controllers/CustomerGroupController.ts",
    "groupTitle": "CustomerGroup",
    "name": "DeleteApiCustomerGroupId"
  },
  {
    "type": "get",
    "url": "/api/customer-group",
    "title": "customergroup-list API",
    "group": "CustomerGroup",
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
            "field": "status",
            "description": "<p>status</p>"
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
          "content": "HTTP/1.1 200 OK\n{\n   \"message\": \"Successfully get customer group list\",\n   \"data\":\"{}\"\n   \"status\": \"1\"\n }",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/customer-group"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "customergroup error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/admin/controllers/CustomerGroupController.ts",
    "groupTitle": "CustomerGroup",
    "name": "GetApiCustomerGroup"
  },
  {
    "type": "post",
    "url": "/api/customer-group",
    "title": "Create customer group API",
    "group": "CustomerGroup",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "size": "..30",
            "optional": false,
            "field": "name",
            "description": "<p>groupName</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": true,
            "field": "description",
            "description": "<p>groupDescription</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "colorcode",
            "description": "<p>colorcode</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>status</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"name\" : \"\",\n     \"description\" : \"\",\n     \"status\" : \"\",\n}",
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
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"New Customer group is created successfully\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/customer-group"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "createCustomer error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/admin/controllers/CustomerGroupController.ts",
    "groupTitle": "CustomerGroup",
    "name": "PostApiCustomerGroup"
  },
  {
    "type": "put",
    "url": "/api/customer-group/:id",
    "title": "Update Customer Group API",
    "group": "CustomerGroup",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "size": "..30",
            "optional": false,
            "field": "name",
            "description": "<p>groupName</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": true,
            "field": "description",
            "description": "<p>groupDescription</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "colorcode",
            "description": "<p>colorcode</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>status</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"name\" : \"\",\n     \"description\" : \"\",\n     \"colorcode\" : \"\",\n     \"status\" : \"\",\n}",
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
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \" Customer Group is updated successfully\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/customer-group/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "update-customer-group error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/admin/controllers/CustomerGroupController.ts",
    "groupTitle": "CustomerGroup",
    "name": "PutApiCustomerGroupId"
  },
  {
    "type": "post",
    "url": "/api/admin-customer",
    "title": "Add Customer API",
    "group": "Customer",
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
            "field": "customerGroupId",
            "description": "<p>Customer customerGroupId</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "size": "..32",
            "optional": false,
            "field": "username",
            "description": "<p>Customer username</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "size": "..96",
            "optional": false,
            "field": "email",
            "description": "<p>Customer email</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "size": "6..15",
            "optional": false,
            "field": "mobileNumber",
            "description": "<p>Customer mobileNumber</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "size": "8..128",
            "optional": false,
            "field": "password",
            "description": "<p>Customer password</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "size": "8..128",
            "optional": false,
            "field": "confirmPassword",
            "description": "<p>Customer confirmPassword</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "avatar",
            "description": "<p>Customer avatar</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "mailStatus",
            "description": "<p>Customer mailStatus should be 1 or 0</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>Customer status</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"customerGroupId\" : \"\",\n     \"userName\" : \"\",\n     \"email\" : \"\",\n     \"mobileNumber\" : \"\",\n     \"password\" : \"\",\n     \"confirmPassword\" : \"\",\n     \"avatar\" : \"\",\n     \"mailStatus\" : \"\",\n     \"status\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Customer Created successfully\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/admin-customer"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Customer error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/admin/controllers/CustomerController.ts",
    "groupTitle": "Customer",
    "name": "PostApiAdminCustomer"
  },
  {
    "type": "post",
    "url": "/api/admin-customer/delete-customer",
    "title": "Delete Multiple Customer API",
    "group": "Customer",
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
            "field": "customerId",
            "description": "<p>customerId</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n\"customerId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n\"message\": \"Successfully deleted customer.\",\n\"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/admin-customer/delete-customer"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "customerDelete error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/admin/controllers/CustomerController.ts",
    "groupTitle": "Customer",
    "name": "PostApiAdminCustomerDeleteCustomer"
  },
  {
    "type": "put",
    "url": "/api/admin-customer/:id",
    "title": "Update Customer API",
    "group": "Customer",
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
            "field": "customerGroupId",
            "description": "<p>Customer customerGroupId</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "size": "..96",
            "optional": false,
            "field": "username",
            "description": "<p>Customer username</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "size": "..96",
            "optional": false,
            "field": "email",
            "description": "<p>Customer email</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "size": "6..15",
            "optional": false,
            "field": "mobileNumber",
            "description": "<p>Customer mobileNumber</p>"
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
            "optional": true,
            "field": "confirmPassword",
            "description": "<p>Customer confirmPassword</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": true,
            "field": "avatar",
            "description": "<p>Customer avatar</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "mailStatus",
            "description": "<p>Customer mailStatus should be 1 or 0</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>Customer status</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"customerGroupId\" : \"\",\n     \"userName\" : \"\",\n     \"email\" : \"\",\n     \"mobileNumber\" : \"\",\n     \"password\" : \"\",\n     \"confirmPassword\" : \"\",\n     \"avatar\" : \"\",\n     \"mailStatus\" : \"\",\n     \"status\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \" Customer is updated successfully\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/admin-customer/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "updateCustomer error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/admin/controllers/CustomerController.ts",
    "groupTitle": "Customer",
    "name": "PutApiAdminCustomerId"
  },
  {
    "type": "delete",
    "url": "/api/CustomerAddress/delete-address/:id",
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
        "url": "/api/CustomerAddress/delete-address/:id"
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
    "name": "DeleteApiCustomeraddressDeleteAddressId"
  },
  {
    "type": "get",
    "url": "/api/CustomerAddress/get-address-list",
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
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get customer address list\",\n     \"data\":\"{}\"\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/CustomerAddress/get-address-list"
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
    "name": "GetApiCustomeraddressGetAddressList"
  },
  {
    "type": "post",
    "url": "/api/CustomerAddress/add-address",
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
          "content": "{\n     \"address1\" : \"\",\n     \"address2\" : \"\",\n     \"city\" : \"\",\n     \"state\" : \"\",\n     \"countryId\" : \"\",\n     \"postcode\" : \"\",\n     \"countryId\" : \"\",\n     \"addressType\" : \"\",\n     \"company\" : \"\",\n}",
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
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"New Address is created successfully\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/CustomerAddress/add-address"
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
    "name": "PostApiCustomeraddressAddAddress"
  },
  {
    "type": "put",
    "url": "/api/CustomerAddress/update-address/:id",
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
          "content": "{\n     \"address1\" : \"\",\n     \"address2\" : \"\",\n     \"city\" : \"\",\n     \"state\" : \"\",\n     \"postcode\" : \"\",\n     \"countryId\" : \"\",\n     \"addressType\" : \"\",\n     \"company\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully updated  customer address.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/CustomerAddress/update-address/:id"
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
    "name": "PutApiCustomeraddressUpdateAddressId"
  },
  {
    "type": "get",
    "url": "/api/customer-cart/customer-cart-list",
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
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get Customer Cart List\",\n     \"data\":{\n      \"productId\" : \"\",\n      \"name\" : \"\",\n      \"quantity\" : \"\",\n      \"productPrice\" : \"\",\n      \"total\" : \"\",\n      \"image\" : \"\",\n      \"containerName\" : \"\",\n      \"optionName\" : \"\",\n      \"optionValueName\" : \"\",\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/customer-cart/customer-cart-list"
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
    "name": "GetApiCustomerCartCustomerCartList"
  },
  {
    "type": "post",
    "url": "/api/customer-cart/add-cart",
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
            "type": "Number",
            "optional": false,
            "field": "productId",
            "description": "<p>productId</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": true,
            "field": "productPrice",
            "description": "<p>productPrice</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": true,
            "field": "quantity",
            "description": "<p>quantity</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": true,
            "field": "skuName",
            "description": "<p>skuName</p>"
          },
          {
            "group": "Request body",
            "type": "string",
            "optional": true,
            "field": "type",
            "description": "<p>type</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"productId\" : \"\",\n     \"productPrice\" : \"\",\n     \"quantity\" : \"\",\n     \"skuName\" : \"\",\n     \"type\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully added product to cart\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/customer-cart/add-cart"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "vendor category  error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/store/controllers/CustomerCartController.ts",
    "groupTitle": "Customer_Cart",
    "name": "PostApiCustomerCartAddCart"
  },
  {
    "type": "post",
    "url": "/api/customer-cart/delete-cart-item",
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
            "type": "number",
            "optional": false,
            "field": "cartId",
            "description": "<p>cartId</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n\"cartId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n\"message\": \"Successfully deleted items.\",\n\"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/customer-cart/delete-cart-item"
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
    "name": "PostApiCustomerCartDeleteCartItem"
  },
  {
    "type": "delete",
    "url": "/api/email-template/delete-email-template/:id",
    "title": "Delete EmailTemplate API",
    "group": "EmailTemplate",
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
          "content": "{\n     \"emailTemplateId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully deleted emailTemplate.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/email-template/delete-email-template/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "EmailTemplate error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/admin/controllers/EmailTemplateController.ts",
    "groupTitle": "EmailTemplate",
    "name": "DeleteApiEmailTemplateDeleteEmailTemplateId"
  },
  {
    "type": "get",
    "url": "/api/email-template/email-templatelist",
    "title": "EmailTemplate List API",
    "group": "EmailTemplate",
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
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get emailTemplate list\",\n     \"data\":{\n     \"id\" : \"\",\n     \"title\" : \"\",\n     \"subject\" : \"\",\n     \"content\" : \"\",\n     \"status\" : \"\",\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/email-template/email-templatelist"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "EmailTemplate error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/admin/controllers/EmailTemplateController.ts",
    "groupTitle": "EmailTemplate",
    "name": "GetApiEmailTemplateEmailTemplatelist"
  },
  {
    "type": "post",
    "url": "/api/email-template/add-email-template",
    "title": "Add Email Template API",
    "group": "EmailTemplate",
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
            "size": "..30",
            "optional": false,
            "field": "title",
            "description": "<p>EmailTemplate title</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "size": "..255",
            "optional": false,
            "field": "subject",
            "description": "<p>EmailTemplate subject</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "content",
            "description": "<p>EmailTemplate content</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>EmailTemplate status</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"title\" : \"\",\n     \"subject\" : \"\",\n     \"content\" : \"\",\n     \"status\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully created new emailTemplate.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/email-template/add-email-template"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "EmailTemplate error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/admin/controllers/EmailTemplateController.ts",
    "groupTitle": "EmailTemplate",
    "name": "PostApiEmailTemplateAddEmailTemplate"
  },
  {
    "type": "put",
    "url": "/api/email-template/update-email-template/:id",
    "title": "Update EmailTemplate API",
    "group": "EmailTemplate",
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
            "size": "..30",
            "optional": false,
            "field": "title",
            "description": "<p>EmailTemplate title</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "size": "..255",
            "optional": false,
            "field": "subject",
            "description": "<p>EmailTemplate subject</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "content",
            "description": "<p>EmailTemplate content</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>EmailTemplate status</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"title\" : \"\",\n     \"subject\" : \"\",\n     \"content\" : \"\",\n     \"status\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully updated emailTemplate.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/email-template/update-email-template/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "emailTemplate error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/admin/controllers/EmailTemplateController.ts",
    "groupTitle": "EmailTemplate",
    "name": "PutApiEmailTemplateUpdateEmailTemplateId"
  },
  {
    "type": "delete",
    "url": "/api/language/delete-language/:id",
    "title": "Delete Language API",
    "group": "Language",
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
          "content": "{\n     \"languageId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully deleted language.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/language/delete-language/:id"
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
    "filename": "src/api/admin/controllers/LanguageController.ts",
    "groupTitle": "Language",
    "name": "DeleteApiLanguageDeleteLanguageId"
  },
  {
    "type": "get",
    "url": "/api/language/languageList",
    "title": "Language List API",
    "group": "Language",
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
            "field": "status",
            "description": "<p>inactive-&gt; 0, active-&gt; 1</p>"
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
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get language list\",\n     \"data\":{\n     \"languageId\"\n     \"name\"\n     \"code\"\n     \"sortOrder\"\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/language/languagelist"
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
    "filename": "src/api/admin/controllers/LanguageController.ts",
    "groupTitle": "Language",
    "name": "GetApiLanguageLanguagelist"
  },
  {
    "type": "post",
    "url": "/api/language/add-language",
    "title": "Add Language API",
    "group": "Language",
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
            "field": "name",
            "description": "<p>Language name</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "size": "..5",
            "optional": false,
            "field": "code",
            "description": "<p>Language code</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": true,
            "field": "image",
            "description": "<p>Language image</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "size": "..9999",
            "optional": true,
            "field": "sortOrder",
            "description": "<p>Language sortOrder</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>Language status</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"name\" : \"\",\n     \"code\" : \"\",\n     \"image\" : \"\",\n     \"sortOrder\" : \"\",\n     \"status\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully created new Language.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/language/add-language"
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
    "filename": "src/api/admin/controllers/LanguageController.ts",
    "groupTitle": "Language",
    "name": "PostApiLanguageAddLanguage"
  },
  {
    "type": "put",
    "url": "/api/language/update-language/:id",
    "title": "Update Language API",
    "group": "Language",
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
            "field": "name",
            "description": "<p>Language name</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "size": "..5",
            "optional": false,
            "field": "code",
            "description": "<p>Language code</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": true,
            "field": "image",
            "description": "<p>Language image</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "size": "..9999",
            "optional": true,
            "field": "sortOrder",
            "description": "<p>Language sortOrder</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>Language status</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"name\" : \"\",\n     \"code\" : \"\",\n     \"image\" : \"\",\n     \"sortOrder\" : \"\",\n     \"status\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully updated language.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/language/update-language/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "language error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/admin/controllers/LanguageController.ts",
    "groupTitle": "Language",
    "name": "PutApiLanguageUpdateLanguageId"
  },
  {
    "type": "delete",
    "url": "/api/order/delete-order/:id",
    "title": "Delete Single Order API",
    "group": "Order",
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
          "content": "{\n     \"id\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n\"message\": \"Successfully deleted Order.\",\n\"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/order/delete-order/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "orderDelete error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/admin/controllers/OrderController.ts",
    "groupTitle": "Order",
    "name": "DeleteApiOrderDeleteOrderId"
  },
  {
    "type": "get",
    "url": "/api/order/bulk-order-cancel-excel-list",
    "title": "Bulk Order Cancel Excel list",
    "group": "Order",
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
            "field": "status",
            "description": "<p>status</p>"
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
    "filename": "src/api/admin/controllers/OrderController.ts",
    "groupTitle": "Order",
    "name": "GetApiOrderBulkOrderCancelExcelList"
  },
  {
    "type": "get",
    "url": "/api/order/order-cancel-excel-list",
    "title": "Order Cancel Excel list",
    "group": "Order",
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
            "description": "<p>orderProductId</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully download the Order Cancel Excel List..!!\",\n     \"status\": \"1\",\n     \"data\": {},\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/order/order-cancel-excel-list"
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
    "filename": "src/api/admin/controllers/OrderController.ts",
    "groupTitle": "Order",
    "name": "GetApiOrderOrderCancelExcelList"
  },
  {
    "type": "get",
    "url": "/api/order/order-cancel-request-list",
    "title": "Order Cancel Request List",
    "group": "Order",
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
            "field": "status",
            "description": "<p>status</p>"
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
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully show the Order List..!!\",\n     \"status\": \"1\",\n     \"data\": {},\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/order/order-cancel-request-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Order Cancel Request List error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/admin/controllers/OrderController.ts",
    "groupTitle": "Order",
    "name": "GetApiOrderOrderCancelRequestList"
  },
  {
    "type": "get",
    "url": "/api/order/order-count",
    "title": "Order Count API",
    "group": "Order",
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
          "content": "HTTP/1.1 200 OK\n{\n     \"status\": \"1\"\n     \"message\": \"Successfully get order count\",\n     \"data\":{\n     \"count\" : \"\",\n     }\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/order/order-count"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "order error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/admin/controllers/OrderController.ts",
    "groupTitle": "Order",
    "name": "GetApiOrderOrderCount"
  },
  {
    "type": "get",
    "url": "/api/order/order-count-for-list",
    "title": "Order Count For Order List API",
    "group": "Order",
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
            "field": "orderId",
            "description": "<p>search by orderId</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "orderStatusId",
            "description": "<p>search by orderStatusId</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "customerName",
            "description": "<p>search by customerName</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "totalAmount",
            "description": "<p>search by totalAmount</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "dateAdded",
            "description": "<p>search by dateAdded</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get order list\",\n     \"data\":{\n     \"orderId\" : \"\",\n     \"orderStatusId\" : \"\",\n     \"customerName\" : \"\",\n     \"totalAmount\" : \"\",\n     \"dateAdded\" : \"\",\n     \"dateModified\" : \"\",\n     \"status\" : \"\",\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/order/order-count-for-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "order error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/admin/controllers/OrderController.ts",
    "groupTitle": "Order",
    "name": "GetApiOrderOrderCountForList"
  },
  {
    "type": "get",
    "url": "/api/order/order-detail",
    "title": "Order Detail API",
    "group": "Order",
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
            "field": "orderId",
            "description": "<p>Order Id</p>"
          }
        ]
      },
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
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully show the Order Detail..!!\",\n     \"status\": \"1\",\n     \"data\": {},\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/order/order-detail"
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
    "filename": "src/api/admin/controllers/OrderController.ts",
    "groupTitle": "Order",
    "name": "GetApiOrderOrderDetail"
  },
  {
    "type": "get",
    "url": "/api/order/order-excel-list",
    "title": "Order Excel",
    "group": "Order",
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
            "field": "orderId",
            "description": "<p>orderId</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully download the Order Excel List..!!\",\n     \"status\": \"1\",\n     \"data\": {},\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/order/order-excel-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Order Excel List error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/admin/controllers/OrderController.ts",
    "groupTitle": "Order",
    "name": "GetApiOrderOrderExcelList"
  },
  {
    "type": "get",
    "url": "/api/order/order-export-pdf",
    "title": "Order Export PDF API",
    "group": "Order",
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
            "field": "orderId",
            "description": "<p>Order Id</p>"
          }
        ]
      },
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
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully show the Order Detail..!!\",\n     \"status\": \"1\",\n     \"data\": {},\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/order/order-export-pdf"
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
    "filename": "src/api/admin/controllers/OrderController.ts",
    "groupTitle": "Order",
    "name": "GetApiOrderOrderExportPdf"
  },
  {
    "type": "get",
    "url": "/api/order/order-product-log-list",
    "title": "Order Product Log List API",
    "group": "Order",
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
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully got order product log list\",\n     \"data\":{\n     \"orderProductLogId\" : \"\",\n     \"orderProductId\" : \"\",\n     \"productId\" : \"\",\n     \"orderId\" : \"\",\n     \"name\" : \"\",\n     \"model\" : \"\",\n     \"quantity\" : \"\",\n     \"trace\" : \"\",\n     \"total\" : \"\",\n     \"tax\" : \"\",\n     \"orderStatusId\" : \"\",\n     \"trackingUrl\" : \"\",\n     \"trackingNo\" : \"\",\n     \"isActive\" : \"\",\n     \"createdDate\" : \"\",\n     \"modifiedDate\" : \"\",\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/order/order-product-log-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "orderProductLog error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/admin/controllers/OrderController.ts",
    "groupTitle": "Order",
    "name": "GetApiOrderOrderProductLogList"
  },
  {
    "type": "get",
    "url": "/api/order/orderlist",
    "title": "Order List API",
    "group": "Order",
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
            "field": "orderId",
            "description": "<p>search by orderId</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "orderStatusId",
            "description": "<p>search by orderStatusId</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "customerName",
            "description": "<p>search by customerName</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "totalAmount",
            "description": "<p>search by totalAmount</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "dateAdded",
            "description": "<p>search by dateAdded</p>"
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
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get order list\",\n     \"data\":{\n     \"orderId\" : \"\",\n     \"orderStatusId\" : \"\",\n     \"customerName\" : \"\",\n     \"totalAmount\" : \"\",\n     \"dateAdded\" : \"\",\n     \"dateModified\" : \"\",\n     \"status\" : \"\",\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/order/orderlist"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "order error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/admin/controllers/OrderController.ts",
    "groupTitle": "Order",
    "name": "GetApiOrderOrderlist"
  },
  {
    "type": "get",
    "url": "/api/order/orderLoglist",
    "title": "Order Log List API",
    "group": "Order",
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
            "field": "orderId",
            "description": "<p>orderId</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get order list\",\n     \"data\":{\n     \"orderId\" : \"\",\n     \"orderStatusId\" : \"\",\n     \"customerName\" : \"\",\n     \"totalAmount\" : \"\",\n     \"dateAdded\" : \"\",\n     \"dateModified\" : \"\",\n     \"status\" : \"\",\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/order/orderLoglist"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "order error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/admin/controllers/OrderController.ts",
    "groupTitle": "Order",
    "name": "GetApiOrderOrderloglist"
  },
  {
    "type": "get",
    "url": "/api/order/product-list",
    "title": "Product list API",
    "group": "Order",
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
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Limit suggestion Showing Successfully..!\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/order/product-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Customer Limits error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/admin/controllers/OrderController.ts",
    "groupTitle": "Order",
    "name": "GetApiOrderProductList"
  },
  {
    "type": "get",
    "url": "/api/order/sales-graph-list",
    "title": "Sales Graph List API",
    "group": "Order",
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
            "field": "year",
            "description": "<p>year</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "month",
            "description": "<p>month</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"status\": \"1\"\n     \"message\": \"Successfully get sales graph list\",\n     \"data\":{\n     }\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/order/sales-graph-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "sales error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/admin/controllers/OrderController.ts",
    "groupTitle": "Order",
    "name": "GetApiOrderSalesGraphList"
  },
  {
    "type": "get",
    "url": "/api/order/sales-report-excel-list",
    "title": "Sales Report excel list API",
    "group": "Order",
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
            "field": "startDate",
            "description": "<p>search by startDate</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "endDate",
            "description": "<p>search by endDate</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "productId",
            "description": ""
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
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully got sales report list\",\n     \"data\":{\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/order/sales-report-excel-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "settlement error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/admin/controllers/OrderController.ts",
    "groupTitle": "Order",
    "name": "GetApiOrderSalesReportExcelList"
  },
  {
    "type": "get",
    "url": "/api/order/sales-report-list",
    "title": "Sales Report list API",
    "group": "Order",
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
            "field": "startDate",
            "description": "<p>search by startDate</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "endDate",
            "description": "<p>search by endDate</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "productId",
            "description": ""
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
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully got sales report list\",\n     \"data\":{\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/order/sales-report-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "settlement error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/admin/controllers/OrderController.ts",
    "groupTitle": "Order",
    "name": "GetApiOrderSalesReportList"
  },
  {
    "type": "get",
    "url": "/api/order/saleslist",
    "title": "Sales List API",
    "group": "Order",
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
          "content": "HTTP/1.1 200 OK\n{\n     \"status\": \"1\"\n     \"message\": \"Successfully get sales count list\",\n     \"data\":{\n     }\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/order/saleslist"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "sales error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/admin/controllers/OrderController.ts",
    "groupTitle": "Order",
    "name": "GetApiOrderSaleslist"
  },
  {
    "type": "get",
    "url": "/api/order/today-order-amount",
    "title": "today Order Amount API",
    "group": "Order",
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
          "content": "HTTP/1.1 200 OK\n{\n     \"status\": \"1\"\n     \"message\": \"Successfully get today order amount\",\n     \"data\":{\n     }\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/order/today-order-amount"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "order error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/admin/controllers/OrderController.ts",
    "groupTitle": "Order",
    "name": "GetApiOrderTodayOrderAmount"
  },
  {
    "type": "get",
    "url": "/api/order/today-order-count",
    "title": "Today OrderCount API",
    "group": "Order",
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
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get Today order count\",\n     \"data\":{\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/order/today-order-count"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "order error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/admin/controllers/OrderController.ts",
    "groupTitle": "Order",
    "name": "GetApiOrderTodayOrderCount"
  },
  {
    "type": "get",
    "url": "/api/order/total-order-amount",
    "title": "total Order Amount API",
    "group": "Order",
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
          "content": "HTTP/1.1 200 OK\n{\n     \"status\": \"1\"\n     \"message\": \"Successfully get total order amount\",\n     \"data\":{\n     \"count\" : \"\",\n     }\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/order/total-order-amount"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "order error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/admin/controllers/OrderController.ts",
    "groupTitle": "Order",
    "name": "GetApiOrderTotalOrderAmount"
  },
  {
    "type": "get",
    "url": "/api/order/transaction-list",
    "title": "Dashboard Transaction List API",
    "group": "Order",
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
            "field": "year",
            "description": "<p>year</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"status\": \"1\"\n     \"message\": \"Successfully get transaction list\",\n     \"data\":{\n     }\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/order/transaction-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "transaction list error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/admin/controllers/OrderController.ts",
    "groupTitle": "Order",
    "name": "GetApiOrderTransactionList"
  },
  {
    "type": "get",
    "url": "/api/order/update-bulk-order-cancel-request",
    "title": "Update bulk Order Cancel Request Status API",
    "group": "Order",
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
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "cancelStatusId",
            "description": "<p>send 1 -&gt; approved 2 -&gt;rejected</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"cancelStatusId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully updated Bulk order cancel status.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/order/update-bulk-order-cancel-request"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "OrderStatus error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/admin/controllers/OrderController.ts",
    "groupTitle": "Order",
    "name": "GetApiOrderUpdateBulkOrderCancelRequest"
  },
  {
    "type": "post",
    "url": "/api/order/delete-order",
    "title": "Delete Order API",
    "group": "Order",
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
            "field": "orderId",
            "description": "<p>orderId</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n\"orderId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n\"message\": \"Successfully deleted Order.\",\n\"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/order/delete-order"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "orderDelete error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/admin/controllers/OrderController.ts",
    "groupTitle": "Order",
    "name": "PostApiOrderDeleteOrder"
  },
  {
    "type": "post",
    "url": "/api/order/order-change-status",
    "title": "Change Order Status API",
    "group": "Order",
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
            "field": "orderId",
            "description": "<p>Order Id</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "orderStatusId",
            "description": "<p>order Status Id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"orderDetails\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully updated order change status.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/order/order-change-status"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "order error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/admin/controllers/OrderController.ts",
    "groupTitle": "Order",
    "name": "PostApiOrderOrderChangeStatus"
  },
  {
    "type": "post",
    "url": "/api/order/update-main-order",
    "title": "update FailedOrder into mainOrder API",
    "group": "Order",
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
            "field": "orderId",
            "description": "<p>Order Id</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "paymentStatus",
            "description": "<p>1-&gt;paid 2-&gt;unpaid</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "paymentMethod",
            "description": ""
          },
          {
            "group": "Request body",
            "type": "String",
            "size": "..255",
            "optional": false,
            "field": "paymentRefId",
            "description": ""
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": true,
            "field": "paymentDetail",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"orderId\" : \"\",\n  \"paymentStatus\" : \"\",\n  \"paymentMethod\" : \"\",\n  \"paymentRefId\" : \"\",\n  \"paymentDetail\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully updated your order.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/order/update-main-order"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "order error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/admin/controllers/OrderController.ts",
    "groupTitle": "Order",
    "name": "PostApiOrderUpdateMainOrder"
  },
  {
    "type": "post",
    "url": "/api/order/update-order-product-shipping-information",
    "title": "update order product shipping information API",
    "group": "Order",
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
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "trackingUrl",
            "description": "<p>shipping tracking url</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "trackingNo",
            "description": "<p>shipping tracking no</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"orderProductId\" : \"\",\n  \"trackingUrl\" : \"\",\n  \"trackingNo\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully updated shipping information.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/order/update-order-product-shipping-information"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "order error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/admin/controllers/OrderController.ts",
    "groupTitle": "Order",
    "name": "PostApiOrderUpdateOrderProductShippingInformation"
  },
  {
    "type": "post",
    "url": "/api/order/update-payment-status",
    "title": "update payment Status API",
    "group": "Order",
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
            "field": "orderId",
            "description": "<p>Order Id</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "paymentStatusId",
            "description": "<p>1-&gt;paid 2-&gt;fail 3-&gt; refund</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"orderId\" : \"\",\n  \"paymentStatusId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully updated payment status.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/order/update-payment-status"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "order error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/admin/controllers/OrderController.ts",
    "groupTitle": "Order",
    "name": "PostApiOrderUpdatePaymentStatus"
  },
  {
    "type": "post",
    "url": "/api/order/update-shipping-information",
    "title": "update shipping information API",
    "group": "Order",
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
            "field": "orderId",
            "description": "<p>Order Id</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "trackingUrl",
            "description": "<p>shipping tracking url</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "trackingNo",
            "description": "<p>shipping tracking no</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"orderId\" : \"\",\n  \"trackingUrl\" : \"\",\n  \"trackingNo\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully updated shipping information.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/order/update-shipping-information"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "order error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/admin/controllers/OrderController.ts",
    "groupTitle": "Order",
    "name": "PostApiOrderUpdateShippingInformation"
  },
  {
    "type": "put",
    "url": "/api/order/update-order-cancel-request/:orderProductId",
    "title": "Update Order Cancel Request Status API",
    "group": "Order",
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
            "field": "cancelStatusId",
            "description": "<p>send 1 -&gt; approved 2 -&gt;rejected</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"cancelStatusId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully updated order cancel status.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/order/update-order-cancel-request/:orderProductId"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "OrderStatus error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/admin/controllers/OrderController.ts",
    "groupTitle": "Order",
    "name": "PutApiOrderUpdateOrderCancelRequestOrderproductid"
  },
  {
    "type": "put",
    "url": "/api/order/update-order-product-status/:orderProductId",
    "title": "Update Order Product Status API",
    "group": "Order",
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
            "field": "orderStatusId",
            "description": "<p>OrderStatus orderStatusId</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"orderStatusId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully updated orderProductStatus.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/order/update-order-product-status/:orderProductId"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "OrderStatus error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/admin/controllers/OrderController.ts",
    "groupTitle": "Order",
    "name": "PutApiOrderUpdateOrderProductStatusOrderproductid"
  },
  {
    "type": "delete",
    "url": "/api/order-status/delete-order-status/:id",
    "title": "Delete OrderStatus API",
    "group": "OrderStatus",
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
          "content": "{\n     \"orderStatusId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully deleted orderStatus.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/order-status/delete-order-status/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "OrderStatus error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/admin/controllers/OrderStatusController.ts",
    "groupTitle": "OrderStatus",
    "name": "DeleteApiOrderStatusDeleteOrderStatusId"
  },
  {
    "type": "get",
    "url": "/api/order-status/order-fullfillment-status-list",
    "title": "Order Fullfillment Status List API",
    "group": "OrderStatus",
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
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get order fullfillmet status list\",\n     \"data\":\"{}\"\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/order-status/order-fullfillment-status-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "OrderFullFillmentStatus error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/admin/controllers/OrderStatusController.ts",
    "groupTitle": "OrderStatus",
    "name": "GetApiOrderStatusOrderFullfillmentStatusList"
  },
  {
    "type": "get",
    "url": "/api/order-status/order-status-list",
    "title": "OrderStatus List API",
    "group": "OrderStatus",
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
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get orderStatus list\",\n     \"data\":\"{}\"\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/order-status/order-status-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "OrderStatus error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/admin/controllers/OrderStatusController.ts",
    "groupTitle": "OrderStatus",
    "name": "GetApiOrderStatusOrderStatusList"
  },
  {
    "type": "get",
    "url": "/api/order-status/order-status-list-based-on-parent",
    "title": "Getting A Child Order Status List Based On Parent List API",
    "group": "OrderStatus",
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
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully got order status list based on parent\",\n     \"data\":\"{}\"\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/order-status/order-status-list-based-on-parent"
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
    "filename": "src/api/admin/controllers/OrderStatusController.ts",
    "groupTitle": "OrderStatus",
    "name": "GetApiOrderStatusOrderStatusListBasedOnParent"
  },
  {
    "type": "post",
    "url": "/api/order-status/create-order-status",
    "title": "Create OrderStatus API",
    "group": "OrderStatus",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "size": "..32",
            "optional": false,
            "field": "name",
            "description": "<p>name</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "size": "..255",
            "optional": false,
            "field": "colorCode",
            "description": "<p>colorCode</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": true,
            "field": "priority",
            "description": "<p>priority</p>"
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
            "optional": true,
            "field": "parentId",
            "description": "<p>parentId</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": true,
            "field": "isAdmin",
            "description": "<p>isAdmin</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": true,
            "field": "isBuyer",
            "description": "<p>isBuyer</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": true,
            "field": "isApi",
            "description": "<p>isApi</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"name\" : \"\",\n     \"colorCode\" : \"\",\n     \"priority\" : \"\",\n     \"status\" : \"\",\n     \"parentId\" : \"\",\n     \"isAdmin\" : \"\",\n     \"isBuyer\" : \"\",\n     \"isApi\" : \"\",\n}",
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
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"New OrderStatus is created successfully\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/order-status/create-order-status"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "createOrderStatus error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/admin/controllers/OrderStatusController.ts",
    "groupTitle": "OrderStatus",
    "name": "PostApiOrderStatusCreateOrderStatus"
  },
  {
    "type": "put",
    "url": "/api/order-status/update-order-fullfillment-status/:id",
    "title": "Update Fullfillment OrderStatus API",
    "group": "OrderStatus",
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
            "field": "status",
            "description": "<p>status</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"status\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully updated orderStatus.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/order-status/update-order-fullfillment-status/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "OrderStatus error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/admin/controllers/OrderStatusController.ts",
    "groupTitle": "OrderStatus",
    "name": "PutApiOrderStatusUpdateOrderFullfillmentStatusId"
  },
  {
    "type": "put",
    "url": "/api/order-status/update-order-status/:id",
    "title": "Update OrderStatus API",
    "group": "OrderStatus",
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
            "field": "name",
            "description": "<p>OrderStatus name</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "size": "..255",
            "optional": false,
            "field": "colorCode",
            "description": "<p>colorCode</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": true,
            "field": "priority",
            "description": "<p>priority</p>"
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
            "optional": true,
            "field": "parentId",
            "description": "<p>parentId</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": true,
            "field": "isAdmin",
            "description": "<p>isAdmin</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": true,
            "field": "isBuyer",
            "description": "<p>isBuyer</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": true,
            "field": "isApi",
            "description": "<p>isApi</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"name\" : \"\",\n     \"colorCode\" : \"\",\n     \"priority\" : \"\",\n     \"status\" : \"\",\n     \"parentId\" : \"\",\n     \"isAdmin\" : \"\",\n     \"isBuyer\" : \"\",\n     \"isApi\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully updated orderStatus.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/order-status/update-order-status/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "OrderStatus error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/admin/controllers/OrderStatusController.ts",
    "groupTitle": "OrderStatus",
    "name": "PutApiOrderStatusUpdateOrderStatusId"
  },
  {
    "type": "delete",
    "url": "/api/page/:id",
    "title": "Delete Page API",
    "group": "Page",
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
          "content": "{\n     \"pageId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully deleted page.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/page/:id"
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
    "filename": "src/api/admin/controllers/PageController.ts",
    "groupTitle": "Page",
    "name": "DeleteApiPageId"
  },
  {
    "type": "get",
    "url": "/api/page",
    "title": "Page List API",
    "group": "Page",
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
            "field": "status",
            "description": "<p>status</p>"
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
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get page list\",\n     \"data\":{\n     \"pageId\" : \"\",\n     \"title\" : \"\",\n     \"content\" : \"\",\n     \"active\" : \"\",\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/page"
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
    "filename": "src/api/admin/controllers/PageController.ts",
    "groupTitle": "Page",
    "name": "GetApiPage"
  },
  {
    "type": "get",
    "url": "/api/page/page-count",
    "title": "Page Count API",
    "group": "Page",
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
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get page count\",\n     \"data\":{},\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/page/page-count"
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
    "filename": "src/api/admin/controllers/PageController.ts",
    "groupTitle": "Page",
    "name": "GetApiPagePageCount"
  },
  {
    "type": "get",
    "url": "/api/page/page-detail",
    "title": "Page Detail API",
    "group": "Page",
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
            "field": "pageId",
            "description": "<p>pageId</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully got Page detail\",\n     \"data\": \"{}\"\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/page/page-detail"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "page Detail error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/admin/controllers/PageController.ts",
    "groupTitle": "Page",
    "name": "GetApiPagePageDetail"
  },
  {
    "type": "post",
    "url": "/api/page",
    "title": "Add Page API",
    "group": "Page",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "size": "..255",
            "optional": false,
            "field": "title",
            "description": "<p>title</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "content",
            "description": "<p>content</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "pageGroupId",
            "description": "<p>pageGroupId</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": true,
            "field": "pageSlug",
            "description": "<p>pageSlug</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "active",
            "description": "<p>active</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"title\" : \"\",\n     \"content\" : \"\",\n     \"pageGroupId\" : \"\",\n     \"pageSlug\" : \"\",\n     \"active\" : \"\",\n}",
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
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"New page is created successfully\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/page"
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
    "filename": "src/api/admin/controllers/PageController.ts",
    "groupTitle": "Page",
    "name": "PostApiPage"
  },
  {
    "type": "post",
    "url": "/api/page/delete-page",
    "title": "Delete Multiple Page API",
    "group": "Page",
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
            "field": "pageId",
            "description": "<p>pageId</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n\"pageId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n\"message\": \"Successfully deleted Page.\",\n\"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/page/delete-page"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "pageDelete error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/admin/controllers/PageController.ts",
    "groupTitle": "Page",
    "name": "PostApiPageDeletePage"
  },
  {
    "type": "put",
    "url": "/api/page/:id",
    "title": "Update Page API",
    "group": "Page",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "pageId",
            "description": "<p>pageId</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "size": "..255",
            "optional": false,
            "field": "title",
            "description": "<p>title</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "content",
            "description": "<p>content</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "pageGroupId",
            "description": "<p>pageGroupId</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "active",
            "description": "<p>active</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "pageSlug",
            "description": "<p>pageSlug</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"pageId\" : \"\",\n     \"title\" : \"\",\n     \"content\" : \"\",\n     \"pageGroupId\" : \"\",\n     \"active\" : \"\",\n     \"pageSlug\" : \"\",\n}",
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
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \" Page is updated successfully\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/page/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "updatePage error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/admin/controllers/PageController.ts",
    "groupTitle": "Page",
    "name": "PutApiPageId"
  },
  {
    "type": "delete",
    "url": "/api/page-group/:id",
    "title": "Delete Page group API",
    "group": "Page_Group",
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
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully deleted Page group.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/page-group/:id"
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
    "filename": "src/api/admin/controllers/PageGroupController.ts",
    "groupTitle": "Page_Group",
    "name": "DeleteApiPageGroupId"
  },
  {
    "type": "get",
    "url": "/api/page-group",
    "title": "Page Group list API",
    "group": "Page_Group",
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
            "description": "<p>count should be number or boolean</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get Page Group list API\",\n     \"data\":{\n      \"groupId\" : \"\",\n      \"pageGroupName\" : \"\",\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/page-group"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Page Group error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/admin/controllers/PageGroupController.ts",
    "groupTitle": "Page_Group",
    "name": "GetApiPageGroup"
  },
  {
    "type": "get",
    "url": "/api/page-group/get-page-group/:id",
    "title": "Get Page Group API",
    "group": "Page_Group",
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
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get page Group\",\n     \"data\":\"{}\"\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/page-group/get-page-group/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Page Group error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/admin/controllers/PageGroupController.ts",
    "groupTitle": "Page_Group",
    "name": "GetApiPageGroupGetPageGroupId"
  },
  {
    "type": "get",
    "url": "/api/page-group/pagegroup-count",
    "title": "Page Group Count API",
    "group": "Page_Group",
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
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get page group count\",\n     \"data\":{},\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/page-group/pagegroup-count"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Page Group error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/admin/controllers/PageGroupController.ts",
    "groupTitle": "Page_Group",
    "name": "GetApiPageGroupPagegroupCount"
  },
  {
    "type": "post",
    "url": "/api/page-group",
    "title": "Add Page group API",
    "group": "Page_Group",
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
            "field": "pageGroupName",
            "description": ""
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"pageGroupName\" : \"\",\n     \"status\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully created page group.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/page-group"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Page group error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/admin/controllers/PageGroupController.ts",
    "groupTitle": "Page_Group",
    "name": "PostApiPageGroup"
  },
  {
    "type": "put",
    "url": "/api/page-group/:id",
    "title": "Update Page Group API",
    "group": "Page_Group",
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
            "field": "pageGroupName",
            "description": "<p>pageGroupName</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>status</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"pageGroupName\" : \"\",\n     \"status\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully updated page group.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/page-group/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Page Group error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/admin/controllers/PageGroupController.ts",
    "groupTitle": "Page_Group",
    "name": "PutApiPageGroupId"
  },
  {
    "type": "get",
    "url": "/api/payment/archive-payment-list",
    "title": "Archive Payment List API",
    "group": "Payment",
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
            "field": "customerName",
            "description": "<p>search by customerName</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "startDate",
            "description": "<p>search by startDate</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "endDate",
            "description": "<p>search by endDate</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get Archive payment list\",\n     \"data\":{\n     \"orderId\" : \"\",\n     \"orderStatusId\" : \"\",\n     \"customerName\" : \"\",\n     \"totalAmount\" : \"\",\n     \"dateModified\" : \"\",\n     \"status\" : \"\",\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/payment/archive-payment-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "payment error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/admin/controllers/PaymentController.ts",
    "groupTitle": "Payment",
    "name": "GetApiPaymentArchivePaymentList"
  },
  {
    "type": "get",
    "url": "/api/payment/archive-payment-list-count",
    "title": "Archive Payment List Count API",
    "group": "Payment",
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
            "field": "customerName",
            "description": "<p>search by customerName</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "startDate",
            "description": "<p>search by startDate</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "endDate",
            "description": "<p>search by endDate</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get Archive payment count\",\n     \"data\":{\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/payment/archive-payment-list-count"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "payment error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/admin/controllers/PaymentController.ts",
    "groupTitle": "Payment",
    "name": "GetApiPaymentArchivePaymentListCount"
  },
  {
    "type": "get",
    "url": "/api/payment/bulk-export-payment-archive-list",
    "title": "Bulk Export Payment Archive List API",
    "group": "Payment",
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
            "field": "customerName",
            "description": "<p>customerName</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "startDate",
            "description": "<p>startDate</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "endDate",
            "description": "<p>endDate</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "/api/payment/bulk-export-payment-archive-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "payment error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/admin/controllers/PaymentController.ts",
    "groupTitle": "Payment",
    "name": "GetApiPaymentBulkExportPaymentArchiveList"
  },
  {
    "type": "get",
    "url": "/api/payment/bulk-export-payment-list",
    "title": "Bulk Export Payment List API",
    "group": "Payment",
    "parameter": {
      "fields": {
        "Request body": [
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
            "optional": false,
            "field": "customerName",
            "description": "<p>customerName</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "startDate",
            "description": "<p>startDate</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "endDate",
            "description": "<p>endDate</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get payment list\",\n     \"data\":{\n     \"orderId\" : \"\",\n     \"orderStatusId\" : \"\",\n     \"customerName\" : \"\",\n     \"totalAmount\" : \"\",\n     \"dateModified\" : \"\",\n     \"status\" : \"\",\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/payment/bulk-export-payment-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "payment error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/admin/controllers/PaymentController.ts",
    "groupTitle": "Payment",
    "name": "GetApiPaymentBulkExportPaymentList"
  },
  {
    "type": "get",
    "url": "/api/payment/export-payment-archive-list",
    "title": "Export Payment Archive List API",
    "group": "Payment",
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
            "field": "paymentArchiveId",
            "description": "<p>paymentArchiveId</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "/api/payment/export-payment-archive-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "payment error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/admin/controllers/PaymentController.ts",
    "groupTitle": "Payment",
    "name": "GetApiPaymentExportPaymentArchiveList"
  },
  {
    "type": "get",
    "url": "/api/payment/export-payment-list",
    "title": "Export Payment List API",
    "group": "Payment",
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
            "field": "paymentId",
            "description": "<p>paymentId</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get payment list\",\n     \"data\":{\n     \"orderId\" : \"\",\n     \"orderStatusId\" : \"\",\n     \"customerName\" : \"\",\n     \"totalAmount\" : \"\",\n     \"dateModified\" : \"\",\n     \"status\" : \"\",\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/payment/export-payment-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "payment error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/admin/controllers/PaymentController.ts",
    "groupTitle": "Payment",
    "name": "GetApiPaymentExportPaymentList"
  },
  {
    "type": "get",
    "url": "/api/payment/payment-list",
    "title": "Payment List API",
    "group": "Payment",
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
            "type": "String",
            "optional": false,
            "field": "paymentMethod",
            "description": "<p>search by paymentMethod</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "customerName",
            "description": "<p>search by customerName</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "startDate",
            "description": "<p>search by startDate</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "endDate",
            "description": "<p>search by endDate</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get payment list\",\n     \"data\":{\n     \"orderId\" : \"\",\n     \"orderStatusId\" : \"\",\n     \"customerName\" : \"\",\n     \"totalAmount\" : \"\",\n     \"dateModified\" : \"\",\n     \"status\" : \"\",\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/payment/payment-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "payment error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/admin/controllers/PaymentController.ts",
    "groupTitle": "Payment",
    "name": "GetApiPaymentPaymentList"
  },
  {
    "type": "get",
    "url": "/api/payment/payment-list-count",
    "title": "Payment List Count API",
    "group": "Payment",
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
            "field": "customerName",
            "description": "<p>search by customerName</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "startDate",
            "description": "<p>search by startDate</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "endDate",
            "description": "<p>search by endDate</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get payment list\",\n     \"data\":{\n     \"orderId\" : \"\",\n     \"orderStatusId\" : \"\",\n     \"customerName\" : \"\",\n     \"totalAmount\" : \"\",\n     \"dateModified\" : \"\",\n     \"status\" : \"\",\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/payment/payment-list-count"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "payment error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/admin/controllers/PaymentController.ts",
    "groupTitle": "Payment",
    "name": "GetApiPaymentPaymentListCount"
  },
  {
    "type": "post",
    "url": "/api/payment/make-payment-archive",
    "title": "Make Payment Archive API",
    "group": "Payment",
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
            "field": "paymentId",
            "description": "<p>paymentId</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"paymentId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully Archived this payment\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/payment/make-payment-archive"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "order error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/admin/controllers/PaymentController.ts",
    "groupTitle": "Payment",
    "name": "PostApiPaymentMakePaymentArchive"
  },
  {
    "type": "get",
    "url": "/api/permission-module/get-permission",
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
        "url": "/api/permission-module/get-permission"
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
    "filename": "src/api/admin/controllers/PermissionModuleController.ts",
    "groupTitle": "Permission_Module",
    "name": "GetApiPermissionModuleGetPermission"
  },
  {
    "type": "get",
    "url": "/api/permission-module/list",
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
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get page list\",\n     \"data\":{\n     \"pageId\" : \"\",\n     \"title\" : \"\",\n     \"content\" : \"\",\n     \"active\" : \"\"\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/permission-module/list"
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
    "filename": "src/api/admin/controllers/PermissionModuleController.ts",
    "groupTitle": "Permission_Module",
    "name": "GetApiPermissionModuleList"
  },
  {
    "type": "get",
    "url": "/api/permission-module/permission-me",
    "title": "Permission Me API",
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
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully got permission for user\",\n     \"data\":{\n     \"pageId\" : \"\",\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/permission-module/permission-me"
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
    "filename": "src/api/admin/controllers/PermissionModuleController.ts",
    "groupTitle": "Permission_Module",
    "name": "GetApiPermissionModulePermissionMe"
  },
  {
    "type": "post",
    "url": "/api/permission-module/add-permission",
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
          },
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
        "url": "/api/permission-module/add-permission"
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
    "filename": "src/api/admin/controllers/PermissionModuleController.ts",
    "groupTitle": "Permission_Module",
    "name": "PostApiPermissionModuleAddPermission"
  },
  {
    "type": "delete",
    "url": "/api/product/:id",
    "title": "Delete Single Product API",
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
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"id\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n\"message\": \"Successfully deleted Product.\",\n\"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/product/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "productDelete error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/admin/controllers/ProductController.ts",
    "groupTitle": "Product",
    "name": "DeleteApiProductId"
  },
  {
    "type": "get",
    "url": "/api/plugins/detail/:id",
    "title": "Plugin Detail API",
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
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Plugin Id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"status\": \"1\"\n     \"message\": \"Successfully get product list\",\n     \"data\":\"{}\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/plugins/detail/:id"
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
    "filename": "src/api/admin/controllers/PluginController.ts",
    "groupTitle": "Product",
    "name": "GetApiPluginsDetailId"
  },
  {
    "type": "get",
    "url": "/api/plugins/list",
    "title": "Plugin List API",
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
            "type": "String",
            "optional": false,
            "field": "module",
            "description": "<p>Module</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"status\": \"1\"\n     \"message\": \"Successfully get product list\",\n     \"data\":\"{}\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/plugins/list"
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
    "filename": "src/api/admin/controllers/PluginController.ts",
    "groupTitle": "Product",
    "name": "GetApiPluginsList"
  },
  {
    "type": "get",
    "url": "/api/product",
    "title": "Product List API",
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
          "content": "HTTP/1.1 200 OK\n{\n     \"status\": \"1\"\n     \"message\": \"Successfully get product list\",\n     \"data\":\"{}\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/product"
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
    "filename": "src/api/admin/controllers/ProductController.ts",
    "groupTitle": "Product",
    "name": "GetApiProduct"
  },
  {
    "type": "get",
    "url": "/api/product/allproduct-excel-list",
    "title": "AllProduct Excel sheet",
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
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully download the All Product Excel List..!!\",\n     \"status\": \"1\",\n     \"data\": {},\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/product/allproduct-excel-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Allproduct Excel List error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/admin/controllers/ProductController.ts",
    "groupTitle": "Product",
    "name": "GetApiProductAllproductExcelList"
  },
  {
    "type": "get",
    "url": "/api/product/customerProductView-list/:id",
    "title": "Customer product View List",
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
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully got Product view Log List..!!\",\n     \"status\": \"1\",\n     \"data\": {},\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/product/customerProductView-list/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "customerProductView List error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/admin/controllers/ProductController.ts",
    "groupTitle": "Product",
    "name": "GetApiProductCustomerproductviewListId"
  },
  {
    "type": "get",
    "url": "/api/product/dashboard/admin-customers-count",
    "title": "Dashboard Customer Count API",
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
            "field": "duration",
            "description": "<p>1-&gt; today 2-&gt; this week 3-&gt; this month 4-&gt; this year</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get dashboard customers count\",\n     \"status\": \"1\",\n     \"data\": {},\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/product/dashboard/admin-customers-count"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "dashboard customers count list error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/admin/controllers/ProductController.ts",
    "groupTitle": "Product",
    "name": "GetApiProductDashboardAdminCustomersCount"
  },
  {
    "type": "get",
    "url": "/api/product/dashboard-admin/orders-count",
    "title": "Dashboard Orders Count API",
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
            "field": "duration",
            "description": "<p>1-&gt; today 2-&gt; this week 3-&gt; this month 4-&gt; this year</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get dashboard orders count based on orders\",\n     \"status\": \"1\",\n     \"data\": {},\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/product/dashboard-admin/orders-count"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "dashboard orders count list error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/admin/controllers/ProductController.ts",
    "groupTitle": "Product",
    "name": "GetApiProductDashboardAdminOrdersCount"
  },
  {
    "type": "get",
    "url": "/api/product/dashboard-admin-totalvendor-totalproduct-count",
    "title": "Dashboard Admin Total Vendor and Total Product Count API",
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
          "content": "HTTP/1.1 200 OK\n{\n     \"status\": \"1\"\n     \"message\": \"Successfully get total vendor and total product count\",\n     \"data\":\"{}\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/product/dashboard-admin-totalvendor-totalproduct-count"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "dashboard admin total vendor and total product count error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/admin/controllers/ProductController.ts",
    "groupTitle": "Product",
    "name": "GetApiProductDashboardAdminTotalvendorTotalproductCount"
  },
  {
    "type": "get",
    "url": "/api/product/dashboard-average-conversion-ratio",
    "title": "Dashboard Average Conversion Ratio API",
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
            "field": "duration",
            "description": "<p>1-&gt; today 2-&gt; this week 3-&gt; this month 4-&gt; this year</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get average conversion ratio\",\n     \"status\": \"1\",\n     \"data\": {},\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/product/dashboard-average-conversion-ratio"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "average conversion ratio error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/admin/controllers/ProductController.ts",
    "groupTitle": "Product",
    "name": "GetApiProductDashboardAverageConversionRatio"
  },
  {
    "type": "get",
    "url": "/api/product/dashboard-average-order-value",
    "title": "Dashboard Average Order Value API",
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
            "field": "duration",
            "description": "<p>1-&gt; today 2-&gt; this week 3-&gt; this month 4-&gt; this year</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get average order value\",\n     \"status\": \"1\",\n     \"data\": {},\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/product/dashboard-average-order-value"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "average order value error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/admin/controllers/ProductController.ts",
    "groupTitle": "Product",
    "name": "GetApiProductDashboardAverageOrderValue"
  },
  {
    "type": "get",
    "url": "/api/product/dashboard-count",
    "title": "Dashboard Count API",
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
          "content": "HTTP/1.1 200 OK\n{\n     \"status\": \"1\"\n     \"message\": \"Successfully get dashboard count\",\n     \"data\":\"{}\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/product/dashboard-count"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "product error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/admin/controllers/ProductController.ts",
    "groupTitle": "Product",
    "name": "GetApiProductDashboardCount"
  },
  {
    "type": "get",
    "url": "/api/product/dashboard/graph-weekly-saleslist",
    "title": "Dashboard Graph Weekly Sales List API",
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
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get top ten weekly sales list\",\n     \"status\": \"1\",\n     \"data\": {},\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/product/dashboard/graph-weekly-saleslist"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "dashboard graph weekly sales list error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/admin/controllers/ProductController.ts",
    "groupTitle": "Product",
    "name": "GetApiProductDashboardGraphWeeklySaleslist"
  },
  {
    "type": "get",
    "url": "/api/product/dashboard-total-revenue",
    "title": "Dashboard Get Total Revenue API",
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
            "field": "duration",
            "description": "<p>1-&gt; today 2-&gt; this week 3-&gt; this month 4-&gt; this year</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get total revenue amount\",\n     \"status\": \"1\",\n     \"data\": {},\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/product/dashboard-total-revenue"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "total revenue error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/admin/controllers/ProductController.ts",
    "groupTitle": "Product",
    "name": "GetApiProductDashboardTotalRevenue"
  },
  {
    "type": "get",
    "url": "/api/product/product-count",
    "title": "Product Count API",
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
          "content": "HTTP/1.1 200 OK\n{\n     \"status\": \"1\"\n     \"message\": \"Successfully get product count\",\n     \"data\":\"{}\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/product/product-count"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "productCount error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/admin/controllers/ProductController.ts",
    "groupTitle": "Product",
    "name": "GetApiProductProductCount"
  },
  {
    "type": "get",
    "url": "/api/product/product-detail/:id",
    "title": "Product Detail API",
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
          "content": "HTTP/1.1 200 OK\n{\n     \"status\": \"1\"\n     \"message\": \"Successfully get product Detail\",\n     \"data\":\"{}\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/product/product-detail/:id"
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
    "filename": "src/api/admin/controllers/ProductController.ts",
    "groupTitle": "Product",
    "name": "GetApiProductProductDetailId"
  },
  {
    "type": "get",
    "url": "/api/product/product-excel-list",
    "title": "Product Excel",
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
            "type": "String",
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
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully download the Product Excel List..!!\",\n     \"status\": \"1\",\n     \"data\": {},\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/product/product-excel-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "product Excel List error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/admin/controllers/ProductController.ts",
    "groupTitle": "Product",
    "name": "GetApiProductProductExcelList"
  },
  {
    "type": "get",
    "url": "/api/product/recent-selling-product",
    "title": "Recent Selling Product List API",
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
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"successfully listed recent product selling!\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/product/recent-selling-product"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Selling Product List error",
          "content": "HTTP/1.1 500 Internal Server Errorproduct",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/admin/controllers/ProductController.ts",
    "groupTitle": "Product",
    "name": "GetApiProductRecentSellingProduct"
  },
  {
    "type": "get",
    "url": "/api/product/top-five-repeatedly-purchased-customers",
    "title": "Top Five Repeatedly Purchased Customer List API",
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
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get top 5 repeatedly purchased customer list!!\",\n     \"status\": \"1\",\n     \"data\": {},\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/product/top-five-repeatedly-purchased-customers"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "top five repeatedly purchased customer list error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/admin/controllers/ProductController.ts",
    "groupTitle": "Product",
    "name": "GetApiProductTopFiveRepeatedlyPurchasedCustomers"
  },
  {
    "type": "get",
    "url": "/api/product/top-performing-products",
    "title": "Top Performing Product List API",
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
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>count in number or boolean</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "duration",
            "description": "<p>1-&gt; today 2-&gt; this week 3-&gt; this month 4-&gt; this year</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get top performing product list!!\",\n     \"status\": \"1\",\n     \"data\": {},\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/product/top-performing-products"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "top performing product list error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/admin/controllers/ProductController.ts",
    "groupTitle": "Product",
    "name": "GetApiProductTopPerformingProducts"
  },
  {
    "type": "get",
    "url": "/api/product/top-selling-productlist",
    "title": "Top selling ProductList API",
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
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get top selling product..!!\",\n     \"status\": \"1\",\n     \"data\": {},\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/product/top-selling-productlist"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "top selling product error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/admin/controllers/ProductController.ts",
    "groupTitle": "Product",
    "name": "GetApiProductTopSellingProductlist"
  },
  {
    "type": "get",
    "url": "/api/product/update-owner-product-list",
    "title": "Invendory Product List API",
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
          "content": "HTTP/1.1 200 OK\n{\n     \"status\": \"1\"\n     \"message\": \"Successfully get product list\",\n     \"data\":\"{}\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/product/update-owner-product-list"
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
    "filename": "src/api/admin/controllers/ProductController.ts",
    "groupTitle": "Product",
    "name": "GetApiProductUpdateOwnerProductList"
  },
  {
    "type": "get",
    "url": "/api/product/viewLog-list",
    "title": "Product View Log List",
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
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully got Product view Log List..!!\",\n     \"status\": \"1\",\n     \"data\": {},\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/product/viewLog-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "ViewLog List error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/admin/controllers/ProductController.ts",
    "groupTitle": "Product",
    "name": "GetApiProductViewlogList"
  },
  {
    "type": "post",
    "url": "/api/product",
    "title": "Add Product API",
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
            "type": "String",
            "size": "..255",
            "optional": false,
            "field": "productName",
            "description": "<p>productName</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": true,
            "field": "productDescription",
            "description": "<p>productDescription</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "size": "..64",
            "optional": false,
            "field": "sku",
            "description": "<p>stock keeping unit</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "size": "..12",
            "optional": false,
            "field": "upc",
            "description": "<p>upc</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "size": "..64",
            "optional": false,
            "field": "hsn",
            "description": "<p>hsn</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "image",
            "description": "<p>product Image</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "size": "..255",
            "optional": true,
            "field": "productSlug",
            "description": "<p>productSlug</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "quantity",
            "description": "<p>quantity</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": true,
            "field": "packingCost",
            "description": "<p>packingCost</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": true,
            "field": "shippingCost",
            "description": "<p>shippingCost</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": true,
            "field": "tax",
            "description": "<p>tax</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": true,
            "field": "taxType",
            "description": "<p>taxType</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": true,
            "field": "others",
            "description": "<p>others</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "categoryId",
            "description": "<p>CategoryId</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": true,
            "field": "relatedProductId",
            "description": "<p>relatedProductId</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "price",
            "description": "<p>price</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": true,
            "field": "requiredShipping",
            "description": "<p>requiredShipping</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "dateAvailable",
            "description": "<p>dateAvailable</p>"
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
            "size": "..9999",
            "optional": false,
            "field": "sortOrder",
            "description": "<p>sortOrder</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": true,
            "field": "quotationAvailable",
            "description": "<p>quotationAvailable</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": true,
            "field": "productSpecial",
            "description": "<p>productSpecial</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": true,
            "field": "productDiscount",
            "description": "<p>productDiscount</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": true,
            "field": "height",
            "description": "<p>height</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": true,
            "field": "weight",
            "description": "<p>weight</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": true,
            "field": "length",
            "description": "<p>length</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": true,
            "field": "width",
            "description": "<p>width</p>"
          },
          {
            "group": "Request body",
            "type": "Object",
            "optional": true,
            "field": "productVideo",
            "description": "<p>video</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "productVideo.name",
            "description": "<p>video name</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "productVideo.path",
            "description": "<p>for embedded have to pass path only</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "productVideo.type",
            "description": "<p>1 -&gt; video 2 -&gt; embedded</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"productName\" : \"\",\n     \"productDescription\" : \"\",\n     \"sku\" : \"\",\n     \"image\" : \"\",\n     \"categoryId\" : [],\n     \"productSlug\" : \"\",\n     \"upc\" : \"\",\n     \"hsn\" : \"\",\n     \"price\" : \"\",\n     \"packingCost\" : \"\",\n     \"shippingCost\" : \"\",\n     \"tax\" : \"\",\n     \"taxType\" : \"\",\n     \"others\" : \"\",\n     \"requiredShipping\" : \"\",\n     \"dateAvailable\" : \"\",\n     \"status\" : \"\",\n     \"sortOrder\" : \"\",\n     \"quotationAvailable\" : \"\",\n     \"image\":[\n     {\n     \"image\":\"\"\n     \"containerName\":\"\"\n     \"defaultImage\":\"\"\n     }\n     ]\n    \"relatedProductId\":[ ]\n    \"productSpecial\":[\n     {\n    \"customerGroupId\":\"\"\n    \"specialPriority\":\"\"\n    \"specialPrice\":\"\"\n    \"specialDateStart\":\"\"\n    \"specialDateEnd\":\"\"\n     }],\n    \"productDiscount\":[\n     {\n        \"discountQuantity\":\"\"\n        \"discountPriority\":\"\"\n        \"discountPrice\":\"\"\n        \"discountDateStart\":\"\"\n        \"discountDateEnd\"\"\"\n     }],\n     \"productVideo\":{\n              \"name\": \"\",\n              \"path\": \"\",\n              \"type\": \"\"\n     }\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully created new product.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/product"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "AddProduct error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/admin/controllers/ProductController.ts",
    "groupTitle": "Product",
    "name": "PostApiProduct"
  },
  {
    "type": "post",
    "url": "/api/product/delete-product",
    "title": "Delete Product API",
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
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n\"productId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n\"message\": \"Successfully deleted Product.\",\n\"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/product/delete-product"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "productDelete error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/admin/controllers/ProductController.ts",
    "groupTitle": "Product",
    "name": "PostApiProductDeleteProduct"
  },
  {
    "type": "post",
    "url": "/api/product/update-product/:id",
    "title": "Update Product API",
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
            "size": "..255",
            "optional": false,
            "field": "productName",
            "description": "<p>productName</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": true,
            "field": "productDescription",
            "description": "<p>productDescription</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "size": "..64",
            "optional": false,
            "field": "sku",
            "description": "<p>stock keeping unit</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "size": "..12",
            "optional": false,
            "field": "upc",
            "description": "<p>upc</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "size": "..64",
            "optional": false,
            "field": "hsn",
            "description": "<p>hsn</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "image",
            "description": "<p>product Image</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "quantity",
            "description": "<p>quantity</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "size": ".255",
            "optional": true,
            "field": "productSlug",
            "description": "<p>productSlug</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "categoryId",
            "description": "<p>CategoryId</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": true,
            "field": "relatedProductId",
            "description": "<p>relatedProductId</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "price",
            "description": "<p>price</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": true,
            "field": "packingCost",
            "description": "<p>packingCost</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": true,
            "field": "shippingCost",
            "description": "<p>shippingCost</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": true,
            "field": "tax",
            "description": "<p>tax</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": true,
            "field": "taxType",
            "description": "<p>taxType</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": true,
            "field": "others",
            "description": "<p>others</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": true,
            "field": "requiredShipping",
            "description": "<p>requiredShipping</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": true,
            "field": "dateAvailable",
            "description": "<p>dateAvailable</p>"
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
            "size": "..9999",
            "optional": true,
            "field": "sortOrder",
            "description": "<p>sortOrder</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "quotationAvailable",
            "description": "<p>quotationAvailable</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": true,
            "field": "productSpecial",
            "description": "<p>productSpecial</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": true,
            "field": "productDiscount",
            "description": "<p>productDiscount</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": true,
            "field": "height",
            "description": "<p>height</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": true,
            "field": "weight",
            "description": "<p>weight</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": true,
            "field": "length",
            "description": "<p>length</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": true,
            "field": "width",
            "description": "<p>width</p>"
          },
          {
            "group": "Request body",
            "type": "Object",
            "optional": true,
            "field": "productVideo",
            "description": "<p>video</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "productVideo.name",
            "description": "<p>video name</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "productVideo.path",
            "description": "<p>for embedded have to pass path only</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "productVideo.type",
            "description": "<p>1 -&gt; video 2 -&gt; embedded</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"productName\" : \"\",\n     \"productDescription\" : \"\",\n     \"sku\" : \"\",\n     \"image\" : \"\",\n     \"categoryId\" : [],\n     \"upc\" : \"\",\n     \"hsn\" : \"\",\n     \"price\" : \"\",\n     \"packingCost\" : \"\",\n     \"shippingCost\" : \"\",\n     \"tax\" : \"\",\n     \"taxType\" : \"\",\n     \"others\" : \"\",\n     \"requiredShipping\" : \"\",\n     \"dateAvailable\" : \"\",\n     \"status\" : \"\",\n     \"sortOrder\" : \"\",\n     \"quotationAvailable\" : \"\",\n     \"image\":[\n     {\n     \"image\":\"\"\n     \"containerName\":\"\"\n     \"defaultImage\":\"\"\n     }\n     ],\n      \"relatedProductId\":[ \"\", \"\"],\n     \"productSpecial\":[\n     {\n    \"customerGroupId\":\"\"\n    \"specialPriority\":\"\"\n    \"skuName\":\"\"\n    \"specialPrice\":\"\"\n    \"specialDateStart\":\"\"\n    \"specialDateEnd\":\"\"\n     }],\n      \"productDiscount\":[\n     {\n        \"discountPriority\":\"\"\n        \"discountPrice\":\"\"\n        \"skuName\":\"\"\n        \"discountDateStart\":\"\"\n        \"discountDateEnd\"\"\"\n     }],\n      \"productVideo\":{\n              \"name\": \"\",\n              \"path\": \"\",\n              \"type\": \"\"\n     }\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully updated product.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/product/update-product/:id"
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
    "filename": "src/api/admin/controllers/ProductController.ts",
    "groupTitle": "Product",
    "name": "PostApiProductUpdateProductId"
  },
  {
    "type": "post",
    "url": "/api/product/update-sku",
    "title": "update sku API",
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
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully updated sku.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/product/update-sku"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "product error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/admin/controllers/ProductController.ts",
    "groupTitle": "Product",
    "name": "PostApiProductUpdateSku"
  },
  {
    "type": "put",
    "url": "/api/plugins/update/plugin-status/:id",
    "title": "Update Plugin Status API",
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
            "field": "pluginStatus",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"status\": \"1\"\n     \"message\": \"Successfully updated plugin status\",\n     \"data\":\"{}\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/plugins/update/plugin-status/:id"
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
    "filename": "src/api/admin/controllers/PluginController.ts",
    "groupTitle": "Product",
    "name": "PutApiPluginsUpdatePluginStatusId"
  },
  {
    "type": "put",
    "url": "/api/product/update-product-slug",
    "title": "Update Product Slug API",
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
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully updated Product Slug.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/product/update-product-slug"
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
    "filename": "src/api/admin/controllers/ProductController.ts",
    "groupTitle": "Product",
    "name": "PutApiProductUpdateProductSlug"
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
    "type": "delete",
    "url": "/api/role/delete-role/:id",
    "title": "Delete Role API",
    "group": "Role",
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
            "field": "groupId",
            "description": "<p>groupId</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"roleId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully deleted Role.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/role/delete-role/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Role error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/admin/controllers/RoleController.ts",
    "groupTitle": "Role",
    "name": "DeleteApiRoleDeleteRoleId"
  },
  {
    "type": "get",
    "url": "/api/role/rolelist",
    "title": "Role List API",
    "group": "Role",
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
            "field": "status",
            "description": "<p>status</p>"
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
          "content": "HTTP/1.1 200 OK\n{\n   \"message\": \"Successfully get role list\",\n   \"data\":\"{}\"\n   \"status\": \"1\"\n }",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/role/rolelist"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "role error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/admin/controllers/RoleController.ts",
    "groupTitle": "Role",
    "name": "GetApiRoleRolelist"
  },
  {
    "type": "post",
    "url": "/api/role/create-role",
    "title": "Create Role API",
    "group": "Role",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "size": "..64",
            "optional": false,
            "field": "name",
            "description": "<p>roleName</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>status</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"name\" : \"\",\n     \"status\" : \"\",\n}",
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
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"New Role is created successfully\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/role/create-role"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "createRole error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/admin/controllers/RoleController.ts",
    "groupTitle": "Role",
    "name": "PostApiRoleCreateRole"
  },
  {
    "type": "put",
    "url": "/api/role/update-role/:id",
    "title": "Update Role API",
    "group": "Role",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "size": "..64",
            "optional": false,
            "field": "name",
            "description": "<p>roleName</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>status</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"name\" : \"\",\n     \"slug\" : \"\",\n     \"status\" : \"\",\n}",
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
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \" Role is updated successfully\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/role/update-role/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "updateRole error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/admin/controllers/RoleController.ts",
    "groupTitle": "Role",
    "name": "PutApiRoleUpdateRoleId"
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
    "url": "/api/settings/get-settings",
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
          "content": "HTTP/1.1 200 OK\n{\n     \"status\": \"1\"\n     \"message\": \"Successfully get settings\",\n     \"data\":\"{}\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/settings/get-settings"
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
    "filename": "src/api/admin/controllers/SettingController.ts",
    "groupTitle": "Settings",
    "name": "GetApiSettingsGetSettings"
  },
  {
    "type": "post",
    "url": "/api/settings/create-settings",
    "title": "Create Settings API",
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
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "url",
            "description": "<p>store url</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "metaTagTitle",
            "description": "<p>metaTagTitle</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "metaTagDescription",
            "description": "<p>metaTagDescription</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "metaTagKeywords",
            "description": "<p>metaTagKeywords</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "storeName",
            "description": "<p>storeName</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "storeOwner",
            "description": "<p>storeOwner</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "storeAddress",
            "description": "<p>storeAddress</p>"
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
            "type": "String",
            "optional": false,
            "field": "zoneId",
            "description": "<p>zoneId</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "storeEmail",
            "description": "<p>storeEmail</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "storeTelephone",
            "description": "<p>storeTelephone</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "storeFax",
            "description": "<p>storeFax</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "storeLogo",
            "description": "<p>storeLogo</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "emailLogo",
            "description": "<p>emailLogo</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "invoiceLogo",
            "description": "<p>invoiceLogo</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "maintenanceMode",
            "description": "<p>maintenanceMode</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "storeLanguageName",
            "description": "<p>storeLanguageName</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "storeCurrencyId",
            "description": "<p>storeCurrencyId</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "storeImage",
            "description": "<p>storeImage</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "invoicePrefix",
            "description": "<p>invoicePrefix</p>"
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
            "type": "Number",
            "optional": false,
            "field": "categoryProductCount",
            "description": "<p>productCount should be 0 or 1</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "itemsPerPage",
            "description": "<p>ItemsPerPage</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "facebook",
            "description": "<p>facebook</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "twitter",
            "description": "<p>twitter</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "instagram",
            "description": "<p>instagram</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "google",
            "description": "<p>google</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>status</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"url\" : \"\",\n     \"metaTagTitle\" : \"\",\n     \"metaTagDescription\" : \"\",\n     \"metaTagKeywords\" : \"\",\n     \"storeName\" : \"\",\n     \"storeOwner\" : \"\",\n     \"storeAddress\" : \"\",\n     \"countryId\" : \"\",\n     \"zoneId\" : \"\",\n     \"storeEmail\" : \"\",\n     \"storeTelephone\" : \"\",\n     \"storeFax\" : \"\",\n     \"storeLogo\" : \"\",\n     \"invoiceLogo\" : \"\",\n     \"emailLogo\" : \"\",\n     \"maintenanceMode\" : \"\",\n     \"storeLanguageName\" : \"\",\n     \"storeCurrencyId\" : \"\",\n     \"storeImage\" : \"\",\n     \"invoicePrefix\" : \"\",\n     \"orderStatus\" : \"\",\n     \"categoryProductCount\" : \"\",\n     \"itemsPerPage\" : \"\",\n     \"google\" : \"\",\n     \"instagram\" : \"\",\n     \"facebook\" : \"\",\n     \"twitter\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully created setting.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/settings/create-settings"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "addSettings error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/admin/controllers/SettingController.ts",
    "groupTitle": "Settings",
    "name": "PostApiSettingsCreateSettings"
  },
  {
    "type": "put",
    "url": "/api/settings/update-maintainancemode",
    "title": "Update maintainance mode API",
    "group": "Settings",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "number",
            "optional": false,
            "field": "mode",
            "description": "<p>mode should be 0 or 1</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"mode\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully updated maintainance mode.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/settings/update-maintainancemode"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "isFeature error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/admin/controllers/SettingController.ts",
    "groupTitle": "Settings",
    "name": "PutApiSettingsUpdateMaintainancemode"
  },
  {
    "type": "",
    "url": "/api/list/get-addons",
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
          "content": "HTTP/1.1 200 Ok\n{\n     \"status\": \"1\",\n     \"message\": \"Successfully get the plugin list. \",\n     \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/list//get-addons"
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
    "name": "ApiListGetAddons"
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
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully\",\n     \"status\": \"1\"\n}",
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
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully\",\n     \"status\": \"1\"\n}",
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
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully Get the Profile..!\",\n     \"status\": \"1\"\n      \"data\":{}\n}",
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
    "title": "Login Log list API",
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
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get login log list\",\n     \"data\":{\n     \"id\"\n     \"customerId\"\n     \"emailId\"\n     \"firstName\"\n     \"ipAddress\"\n     \"createdDate\"\n     }\n}",
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
    "url": "/api/list/orderLoglist",
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
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get order log list\",\n     \"data\":{\n     \"orderStatus\" : \"\",\n     \"createdDate\" : \"\",\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/list/orderLoglist"
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
    "name": "GetApiListOrderloglist"
  },
  {
    "type": "get",
    "url": "/api/pages/get_pagedetails/:slugName",
    "title": "Page Details API",
    "group": "Store",
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get page Details\",\n     \"data\":{\n     \"pageId\" : \"\",\n     \"title\" : \"\",\n     \"content\" : \"\",\n     \"status\" : \"\",\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/pages/get_pagedetails/:slugName"
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
    "name": "GetApiPagesGet_pagedetailsSlugname"
  },
  {
    "type": "get",
    "url": "/api/pages/pagelist",
    "title": "Page List API",
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
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get page list\",\n     \"data\":{\n     \"pageId\" : \"\",\n     \"title\" : \"\",\n     \"content\" : \"\",\n     \"active\" : \"\",\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/pages/pagelist"
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
    "name": "GetApiPagesPagelist"
  },
  {
    "type": "get",
    "url": "/api/product-store/Get-Category",
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
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"successfully got the category.\",\n     \"data\":\"{ }\"\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/product-store/Get-Category"
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
    "name": "GetApiProductStoreGetCategory"
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
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully Product Compared\",\n     \"status\": \"1\",\n     \"data\": {},\n}",
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
    "title": "Product detail API",
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
          "content": "HTTP/1.1 200 OK\n{\n     \"status\": \"1\"\n     \"message\": \"Successfully get product Detail\",\n     \"data\":\"{}\"\n}",
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
    "type": "get",
    "url": "/api/product-store/productSearchList",
    "title": "Product Search List API",
    "group": "Store",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>Product Name</p>"
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
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"status\": \"1\"\n     \"message\": \"Successfully get product list\",\n     \"data\":\"{}\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/product-store/productSearchList"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "productSearchList error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/store/controllers/ProductController.ts",
    "groupTitle": "Store",
    "name": "GetApiProductStoreProductsearchlist"
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
          "content": "{\n     \"firstName\" : \"\",\n     \"lastName\" : \"\",\n     \"password\" \"\",\n     \"emailId\" : \"\",\n     \"phoneNumber\" : \"\",\n     \"image\": \"\",\n}",
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
    "title": "login API",
    "group": "Store",
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
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"emailId\" : \"\",\n     \"password\" : \"\",\n     \"type\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"data\": \"{\n        \"token\":''\n     }\",\n     \"message\": \"Successfully login\",\n     \"status\": \"1\"\n}",
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
    "title": "Log Out API",
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
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully logout\",\n     \"status\": \"1\"\n}",
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
          "content": "HTTP/1.1 200 OK\n{\n     \"data\": \"{\n        \"token\":''\n        \"password\":''\n     }\",\n     \"message\": \"Successfully login\",\n     \"status\": \"1\"\n}",
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
    "url": "/api/customer/register",
    "title": "register API",
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
          "content": "{\n     \"name\" : \"\",\n     \"lastName\" : \"\",\n     \"password\" : \"\",\n     \"confirmPassword\" : \"\",\n     \"emailId\" : \"\",\n     \"phoneNumber\" : \"\",\n}",
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
    "url": "/api/list/category-list",
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
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"category list shown successfully..!\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/list/category-list"
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
    "name": "GetApiListCategoryList"
  },
  {
    "type": "get",
    "url": "/api/list/country-list",
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
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get country list\",\n     \"data\":{\n     \"countryId\"\n     \"name\"\n     \"isoCode2\"\n     \"isoCode3\"\n     \"addressFormat\"\n     \"postcodeRequired\"\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/list/country-list"
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
    "name": "GetApiListCountryList"
  },
  {
    "type": "get",
    "url": "/api/list/custom-product-list",
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
          "content": "HTTP/1.1 200 OK\n{\n     \"status\": \"1\"\n     \"message\": \"Successfully get product list\",\n     \"data\":\"{}\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/list/custom-product-list"
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
    "name": "GetApiListCustomProductList"
  },
  {
    "type": "get",
    "url": "/api/list/get-payment-setting",
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
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully got payment setting\",\n     \"data\":{\n     \"plugin_name\"\n     \"plugin_avatar\"\n     \"plugin_avatar_path\"\n     \"plugin_type\"\n     \"plugin_status\"\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/list/get-payment-setting"
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
    "name": "GetApiListGetPaymentSetting"
  },
  {
    "type": "get",
    "url": "/api/list/language-list",
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
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully got language list\",\n     \"data\":{\n     \"languageId\"\n     \"name\"\n     \"status\"\n     \"code\"\n     \"sortOrder\"\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/list/language-list"
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
    "name": "GetApiListLanguageList"
  },
  {
    "type": "get",
    "url": "/api/list/product-count",
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
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get Product Count\",\n     \"data\":{\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/list/product-count"
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
    "name": "GetApiListProductCount"
  },
  {
    "type": "get",
    "url": "/api/list/specific-category-list",
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
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Category listed successfully..!\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/list/specific-category-list"
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
    "name": "GetApiListSpecificCategoryList"
  },
  {
    "type": "get",
    "url": "/api/list/widget-detail/:widgetId",
    "title": "get widget detail API",
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
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get  Detail\",\n     \"data\":{\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/list/widget-detail/:widgetId"
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
    "filename": "add-ons/Widget/controllers/store/StoreWidgetController.ts",
    "groupTitle": "Store_List",
    "name": "GetApiListWidgetDetailWidgetid"
  },
  {
    "type": "get",
    "url": "/api/list/widget-list",
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
            "type": "String",
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
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Thank you Widget list show successfully..!\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/list/widget-list"
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
    "filename": "add-ons/Widget/controllers/store/StoreWidgetController.ts",
    "groupTitle": "Store_List",
    "name": "GetApiListWidgetList"
  },
  {
    "type": "get",
    "url": "/api/list/zone-list",
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
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get zone list\",\n     \"data\":{\n     \"countryId\"\n     \"code\"\n     \"name\"\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/list/zone-list"
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
    "name": "GetApiListZoneList"
  },
  {
    "type": "post",
    "url": "/api/list/contact-us",
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
        "url": "/api/list/contact-us"
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
    "name": "PostApiListContactUs"
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
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully got order payment status..!!\",\n     \"status\": \"1\",\n     \"data\": {},\n}",
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
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully Listed..!\",\n     \"status\": \"1\"\n}",
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
    "url": "/api/orders/order-detail",
    "title": "My OrderDetail",
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
            "description": "<p>orderProductId</p>"
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
        "url": "/api/orders/order-detail"
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
    "name": "GetApiOrdersOrderDetail"
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
    "url": "/api/orders/order-list",
    "title": "My Order List",
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
            "field": "status",
            "description": "<p>status -&gt; closed, open, cancel</p>"
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
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully show the Order List..!!\",\n     \"status\": \"1\",\n     \"data\": {},\n}",
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
          "title": "Order List error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/store/controllers/CustomerOrderController.ts",
    "groupTitle": "Store_order",
    "name": "GetApiOrdersOrderList"
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
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully show the Track Order..!!\",\n     \"status\": \"1\",\n     \"data\": {},\n}",
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
    "type": "post",
    "url": "/api/orders/back-order-checkout",
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
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"productDetail\" :[\n     {\n     \"productId\" : \"\",\n     \"quantity\" : \"\",\n     \"price\" : \"\",\n     \"model\" : \"\",\n     \"name\" : \"\",\n     \"skuName\" : \"\",\n     }],\n     \"shippingFirstName\" : \"\",\n     \"shippingLastName\" : \"\",\n     \"shippingCompany\" : \"\",\n     \"shippingAddress_1\" : \"\",\n     \"shippingAddress_2\" : \"\",\n     \"shippingCity\" : \"\",\n     \"shippingPostCode\" : \"\",\n     \"shippingCountryId\" : \"\",\n     \"shippingZone\" : \"\",\n     \"shippingAddressFormat\" : \"\",\n     \"paymentFirstName\" : \"\",\n     \"paymentLastName\" : \"\",\n     \"paymentCompany\" : \"\",\n     \"paymentAddress_1\" : \"\",\n     \"paymentAddress_2\" : \"\",\n     \"paymentCity\" : \"\",\n     \"paymentPostCode\" : \"\",\n     \"paymentCountryId\" : \"\",\n     \"paymentZone\" : \"\",\n     \"phoneNumber\" : \"\",\n     \"emailId\" : \"\",\n     \"password\" : \"\",\n     \"paymentMethod\" : \"\",\n     \"vendorId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Check Out the product successfully And Send order detail in your mail ..!!\",\n     \"status\": \"1\"\n}",
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
            "optional": true,
            "field": "gstNo",
            "description": "<p>gstNo</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"productDetails\" :[\n     {\n     \"productId\" : \"\",\n     \"quantity\" : \"\",\n     \"price\" : \"\",\n     \"model\" : \"\",\n     \"name\" : \"\",\n     \"skuName\" : \"\",\n     \"vendorId\" : \"\",\n     }],\n     \"shippingFirstName\" : \"\",\n     \"shippingLastName\" : \"\",\n     \"shippingCompany\" : \"\",\n     \"shippingAddress_1\" : \"\",\n     \"shippingAddress_2\" : \"\",\n     \"shippingCity\" : \"\",\n     \"shippingPostCode\" : \"\",\n     \"shippingCountryId\" : \"\",\n     \"shippingZone\" : \"\",\n     \"paymentFirstName\" : \"\",\n     \"paymentLastName\" : \"\",\n     \"paymentCompany\" : \"\",\n     \"paymentAddress_1\" : \"\",\n     \"paymentAddress_2\" : \"\",\n     \"paymentCity\" : \"\",\n     \"paymentPostCode\" : \"\",\n     \"paymentCountryId\" : \"\",\n     \"paymentZone\" : \"\",\n     \"shippingAddressFormat\" : \"\",\n     \"phoneNumber\" : \"\",\n     \"emailId\" : \"\",\n     \"password\" : \"\",\n     \"paymentMethod\" : \"\",\n     \"vendorId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Check Out the product successfully And Send order detail in your mail ..!!\",\n     \"status\": \"1\"\n}",
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
    "title": "order cancel request API",
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
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully posted your cancel request\",\n     \"status\": \"1\"\n}",
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
    "type": "get",
    "url": "/api/customer/wishlist-product-list",
    "title": "WishList Product List",
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
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully show the wishlist Product List\",\n     \"status\": \"1\",\n     \"data\": \"{}\"\n}",
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
    "groupTitle": "Store_wishlist",
    "name": "GetApiCustomerWishlistProductList"
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
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Thank you product added to the wishlist successfully.\",\n     \"status\": \"1\"\n}",
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
    "type": "delete",
    "url": "/api/tax/delete-tax/:taxId",
    "title": "Delete Tax API",
    "group": "Tax",
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
          "content": "{\n     \"taxId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully deleted Tax.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/tax/delete-tax/:taxId"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Tax error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/admin/controllers/TaxController.ts",
    "groupTitle": "Tax",
    "name": "DeleteApiTaxDeleteTaxTaxid"
  },
  {
    "type": "get",
    "url": "/api/tax/tax-list",
    "title": "Tax List API",
    "group": "Tax",
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
            "field": "status",
            "description": "<p>status</p>"
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
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get tax list\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/tax/tax-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Tax error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/admin/controllers/TaxController.ts",
    "groupTitle": "Tax",
    "name": "GetApiTaxTaxList"
  },
  {
    "type": "post",
    "url": "/api/tax/add-tax",
    "title": "Add Tax API",
    "group": "Tax",
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
            "field": "taxName",
            "description": "<p>Tax taxName</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": true,
            "field": "taxPercentage",
            "description": "<p>Tax taxPercentage</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "taxStatus",
            "description": "<p>Tax taxStatus</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"taxName\" : \"\",\n     \"taxPercentage\" : \"\",\n     \"taxStatus\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully created new tax.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/tax/add-tax"
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
    "filename": "src/api/admin/controllers/TaxController.ts",
    "groupTitle": "Tax",
    "name": "PostApiTaxAddTax"
  },
  {
    "type": "put",
    "url": "/api/tax/update-tax/:taxId",
    "title": "Update Tax API",
    "group": "Tax",
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
            "field": "taxName",
            "description": "<p>Tax taxName</p>"
          },
          {
            "group": "Request body",
            "type": "string",
            "optional": true,
            "field": "taxPercentage",
            "description": "<p>Tax taxPercentage</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "taxStatus",
            "description": "<p>Tax taxStatus</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"taxName\" : \"\",\n     \"taxPercentage\" : \"\",\n     \"taxStatus\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully updated Tax.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/tax/update-tax/:taxId"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Tax error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/admin/controllers/TaxController.ts",
    "groupTitle": "Tax",
    "name": "PutApiTaxUpdateTaxTaxid"
  },
  {
    "type": "delete",
    "url": "/api/widget/:id",
    "title": "Delete widget API",
    "group": "Widget",
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
          "content": "{\n     \"widgetId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully deleted Widget.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/widget/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "widget error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "add-ons/Widget/controllers/admin/WidgetController.ts",
    "groupTitle": "Widget",
    "name": "DeleteApiWidgetId"
  },
  {
    "type": "get",
    "url": "/api/widget",
    "title": "Widget List API",
    "group": "Widget",
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
            "field": "status",
            "description": "<p>status</p>"
          },
          {
            "group": "Request body",
            "type": "number",
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
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully got Widget list\",\n     \"data\":\"{\n     \"widgetId\": \"\",\n     \"title\": \"\",\n     \"content\": \"\",\n     \"metaTagTitle\": \"\",\n     \"metaTagDescription\": \"\",\n     \"metaTagKeyword\": \"\",\n     \"widgetlinkType\": \"\",\n     \"position\": \"\",\n     }\"\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/widget"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "widget error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "add-ons/Widget/controllers/admin/WidgetController.ts",
    "groupTitle": "Widget",
    "name": "GetApiWidget"
  },
  {
    "type": "get",
    "url": "/api/widget/productlist",
    "title": "Product List for widget API",
    "group": "Widget",
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
          "content": "HTTP/1.1 200 OK\n{\n     \"status\": \"1\"\n     \"message\": \"Successfully get product list\",\n     \"data\":\"{}\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/widget/productlist"
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
    "filename": "add-ons/Widget/controllers/admin/WidgetController.ts",
    "groupTitle": "Widget",
    "name": "GetApiWidgetProductlist"
  },
  {
    "type": "get",
    "url": "/api/widget/widget-count",
    "title": "Widget Count API",
    "group": "Widget",
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
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully got widget count\",\n     \"data\":{},\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/widget/widget-count"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "widget error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "add-ons/Widget/controllers/admin/WidgetController.ts",
    "groupTitle": "Widget",
    "name": "GetApiWidgetWidgetCount"
  },
  {
    "type": "get",
    "url": "/api/widget/widget-detail",
    "title": "Widget Detail API",
    "group": "Widget",
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
            "field": "widgetId",
            "description": "<p>widgetId</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully got widget detail\",\n     \"data\": \"{}\"\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/widget/widget-detail"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "widget Detail error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "add-ons/Widget/controllers/admin/WidgetController.ts",
    "groupTitle": "Widget",
    "name": "GetApiWidgetWidgetDetail"
  },
  {
    "type": "post",
    "url": "/api/widget",
    "title": "Add Widget API",
    "group": "Widget",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "size": "..255",
            "optional": false,
            "field": "title",
            "description": "<p>title</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": true,
            "field": "content",
            "description": "<p>content</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "widgetLinkType",
            "description": "<p>widgetLinkType 1-&gt; catgeory 2-&gt; product</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "size": "..70",
            "optional": true,
            "field": "metaTagTitle",
            "description": "<p>metaTagTitle</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "size": "..160",
            "optional": true,
            "field": "metaTagDescription",
            "description": "<p>metaTagDescription</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "size": "..255",
            "optional": true,
            "field": "metaTagKeyword",
            "description": "<p>metaTagKeyword</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": true,
            "field": "refId",
            "description": "<p>refId</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": true,
            "field": "position",
            "description": "<p>position</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>status</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"title\" : \"\",\n     \"content\" : \"\",\n     \"widgetLinkType\" : \"\",\n     \"metaTagTitle\" : \"\",\n     \"metaTagDescription\" : \"\",\n     \"metaTagKeyword\" : \"\",\n     \"position\" : \"\",\n     \"refId\" : [],\n     \"status\" : \"\",\n}",
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
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Widget is created successfully\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/widget"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Banner error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "add-ons/Widget/controllers/admin/WidgetController.ts",
    "groupTitle": "Widget",
    "name": "PostApiWidget"
  },
  {
    "type": "put",
    "url": "/api/widget/:id",
    "title": "Update widget API",
    "group": "Widget",
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
            "field": "title",
            "description": "<p>widget title</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": true,
            "field": "content",
            "description": "<p>widget content</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "size": "..70",
            "optional": true,
            "field": "metaTagTitle",
            "description": "<p>metaTagTitle</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "size": "..160",
            "optional": true,
            "field": "metaTagDescription",
            "description": "<p>metaTagDescription</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "size": "..255",
            "optional": true,
            "field": "metaTagKeyword",
            "description": "<p>metaTagkeyword</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "widgetLinkType",
            "description": "<p>widgetLinkType</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": true,
            "field": "position",
            "description": "<p>widget position</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": true,
            "field": "refId",
            "description": "<p>refId</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>status</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"title\" : \"\",\n     \"content\" : \"\",\n     \"widgetLinkType\" : \"\",\n     \"metaTagTitle\" : \"\",\n     \"metaTagKeyword\" : \"\",\n     \"metaTagDescription\" : \"\",\n     \"position\" : \"\",\n     \"refId\" : \"\",\n     \"status\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully updated widget.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/widget/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "widget error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "add-ons/Widget/controllers/admin/WidgetController.ts",
    "groupTitle": "Widget",
    "name": "PutApiWidgetId"
  },
  {
    "type": "delete",
    "url": "/api/zone/delete-zone/:id",
    "title": "Delete Zone API",
    "group": "Zone",
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
          "content": "{\n     \"zoneId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully deleted Zone.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/zone/delete-zone/:id"
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
    "filename": "src/api/admin/controllers/ZoneController.ts",
    "groupTitle": "Zone",
    "name": "DeleteApiZoneDeleteZoneId"
  },
  {
    "type": "get",
    "url": "/api/zone/zone-list",
    "title": "Zone List API",
    "group": "Zone",
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
            "field": "status",
            "description": "<p>status</p>"
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
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get zone list\",\n     \"data\":{\n     \"countryId\"\n     \"code\"\n     \"name\"\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/zone/zone-list"
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
    "filename": "src/api/admin/controllers/ZoneController.ts",
    "groupTitle": "Zone",
    "name": "GetApiZoneZoneList"
  },
  {
    "type": "post",
    "url": "/api/zone/add-zone",
    "title": "Add Zone API",
    "group": "Zone",
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
            "field": "countryId",
            "description": "<p>Zone countryId</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "size": "..30",
            "optional": false,
            "field": "code",
            "description": "<p>Zone code</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "size": "..128",
            "optional": false,
            "field": "name",
            "description": "<p>Zone name</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>Zone status</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"countryId\" : \"\",\n     \"code\" : \"\",\n     \"name\" : \"\",\n     \"status\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully created new zone.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/zone/add-zone"
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
    "filename": "src/api/admin/controllers/ZoneController.ts",
    "groupTitle": "Zone",
    "name": "PostApiZoneAddZone"
  },
  {
    "type": "put",
    "url": "/api/zone/update-zone/:id",
    "title": "Update Zone API",
    "group": "Zone",
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
            "field": "countryId",
            "description": "<p>Zone countryId</p>"
          },
          {
            "group": "Request body",
            "type": "string",
            "optional": false,
            "field": "code",
            "description": "<p>Zone code</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Zone name</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>Zone status</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"zoneId\" : \"\",\n     \"countryId\" : \"\",\n     \"code\" : \"\",\n     \"name\" : \"\",\n     \"status\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully updated Zone.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/zone/update-zone/:id"
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
    "filename": "src/api/admin/controllers/ZoneController.ts",
    "groupTitle": "Zone",
    "name": "PutApiZoneUpdateZoneId"
  },
  {
    "type": "get",
    "url": "/api/media/bucket-object-count",
    "title": "bucket-object-count",
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
    "name": "GetApiMediaBucketObjectList"
  },
  {
    "type": "get",
    "url": "/api/media/delete-file",
    "title": "delete file API",
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
    "url": "/api/media/video-preview-s3",
    "title": "video-preview-s3 API",
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
    "title": "delete folder API",
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
    "title": "delete multiple image",
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
          "content": "{\n  \"file\":\"\",\n  \"path\" : \"\",\n}",
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
    "title": "multi image-upload",
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
  }
] });
