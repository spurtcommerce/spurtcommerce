define({ "api": [
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
    "filename": "src/api/controllers/UserController.ts",
    "groupTitle": "Authentication",
    "name": "DeleteApiAuthDeleteUserId"
  },
  {
    "type": "get",
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
    "filename": "src/api/controllers/UserController.ts",
    "groupTitle": "Authentication",
    "name": "GetApiAuthLogout"
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
    "filename": "src/api/controllers/UserController.ts",
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
            "optional": false,
            "field": "username",
            "description": "<p>userName</p>"
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
            "optional": false,
            "field": "firstName",
            "description": "<p>User First Name</p>"
          },
          {
            "group": "Request body",
            "type": "String",
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
    "filename": "src/api/controllers/UserController.ts",
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
            "optional": false,
            "field": "username",
            "description": "<p>User username</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User email</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "phoneNumber",
            "description": "<p>User phoneNumber</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "address",
            "description": "<p>User address</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
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
    "filename": "src/api/controllers/UserController.ts",
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
    "filename": "src/api/controllers/UserController.ts",
    "groupTitle": "Authentication",
    "name": "PostApiAuthForgotPassword"
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
    "filename": "src/api/controllers/UserController.ts",
    "groupTitle": "Authentication",
    "name": "PostApiAuthLogin"
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
    "filename": "src/api/controllers/UserController.ts",
    "groupTitle": "Authentication",
    "name": "PutApiAuthChangePassword"
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
            "optional": false,
            "field": "password",
            "description": "<p>password</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "firstName",
            "description": "<p>User First Name</p>"
          },
          {
            "group": "Request body",
            "type": "String",
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
    "filename": "src/api/controllers/UserController.ts",
    "groupTitle": "Authentication",
    "name": "PutApiAuthUpdateUserId"
  },
  {
    "type": "delete",
    "url": "/api/banner/delete-banner/:id",
    "title": "Delete Banner API",
    "group": "Banner",
    "header": {
      "fields": {
        "Header": [
          {
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
          "content": "{\n     \"bannerId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully deleted Banner.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/banner/delete-banner/:id"
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
    "filename": "src/api/controllers/BannerController.ts",
    "groupTitle": "Banner",
    "name": "DeleteApiBannerDeleteBannerId"
  },
  {
    "type": "get",
    "url": "/api/banner/bannerlist",
    "title": "Banner List API",
    "group": "Banner",
    "header": {
      "fields": {
        "Header": [
          {
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
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully got banner list\",\n     \"data\":\"{\n     \"bannerId\": \"\",\n     \"title\": \"\",\n     \"content\": \"\",\n     \"image\": \"\",\n     \"imagePath\": \"\",\n     \"link\": \"\",\n     \"position\": \"\",\n     }\"\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/banner/bannerlist"
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
    "filename": "src/api/controllers/BannerController.ts",
    "groupTitle": "Banner",
    "name": "GetApiBannerBannerlist"
  },
  {
    "type": "post",
    "url": "/api/banner/add-banner",
    "title": "Add Banner API",
    "group": "Banner",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
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
            "field": "image",
            "description": "<p>image</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "link",
            "description": "<p>link</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
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
          "content": "{\n     \"title\" : \"\",\n     \"content\" : \"\",\n     \"image\" : \"\",\n     \"link\" : \"\",\n     \"position\" : \"\",\n     \"status\" : \"\",\n}",
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
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"New banner is created successfully\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/banner/add-banner"
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
    "filename": "src/api/controllers/BannerController.ts",
    "groupTitle": "Banner",
    "name": "PostApiBannerAddBanner"
  },
  {
    "type": "post",
    "url": "/api/banner/delete-banner",
    "title": "Delete Multiple Banner API",
    "group": "Banner",
    "header": {
      "fields": {
        "Header": [
          {
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
            "field": "bannerId",
            "description": "<p>bannerId</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n\"bannerId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n\"message\": \"Successfully deleted Banner.\",\n\"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/banner/delete-banner"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "bannerDelete error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/BannerController.ts",
    "groupTitle": "Banner",
    "name": "PostApiBannerDeleteBanner"
  },
  {
    "type": "put",
    "url": "/api/banner/update-banner/:id",
    "title": "Update Banner API",
    "group": "Banner",
    "header": {
      "fields": {
        "Header": [
          {
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
            "field": "bannerId",
            "description": "<p>Banner bannerId</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Banner title</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "image",
            "description": "<p>Banner image</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "content",
            "description": "<p>Banner content</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "link",
            "description": "<p>Banner link</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "position",
            "description": "<p>Banner position</p>"
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
          "content": "{\n     \"bannerId\" : \"\",\n     \"title\" : \"\",\n     \"image\" : \"\",\n     \"content\" : \"\",\n     \"link\" : \"\",\n     \"position\" : \"\",\n     \"status\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully updated banner.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/banner/update-banner/:id"
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
    "filename": "src/api/controllers/BannerController.ts",
    "groupTitle": "Banner",
    "name": "PutApiBannerUpdateBannerId"
  },
  {
    "type": "delete",
    "url": "/api/delete-category/:id",
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
        "url": "/api/delete-category/:id"
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
    "filename": "src/api/controllers/CategoryController.ts",
    "groupTitle": "Category",
    "name": "DeleteApiDeleteCategoryId"
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
    "filename": "src/api/controllers/CategoryController.ts",
    "groupTitle": "Category",
    "name": "GetApiCategoryListIntree"
  },
  {
    "type": "get",
    "url": "/api/categorylist",
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
        "url": "/api/categorylist"
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
    "filename": "src/api/controllers/CategoryController.ts",
    "groupTitle": "Category",
    "name": "GetApiCategorylist"
  },
  {
    "type": "post",
    "url": "/api/add-category",
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
            "optional": false,
            "field": "name",
            "description": "<p>Category name</p>"
          },
          {
            "group": "Request body",
            "type": "number",
            "optional": false,
            "field": "parentInt",
            "description": "<p>Category  parentInt</p>"
          },
          {
            "group": "Request body",
            "type": "number",
            "optional": false,
            "field": "sortOrder",
            "description": "<p>Category sortOrder</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "metaTagTitle",
            "description": "<p>Category metaTagTitle</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "metaTagDescription",
            "description": "<p>Category metaTagDescription</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "metaTagKeyword",
            "description": "<p>Category metaTagKeyword</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>Category status 1-&gt; Active 0-&gt; inactive</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"name\" : \"\",\n     \"parentInt\" : \"\",\n     \"sortOrder\" : \"\",\n     \"metaTagTitle\" : \"\",\n     \"metaTagDescription\" : \"\",\n     \"metaTagKeyword\" : \"\",\n     \"status\" : \"\",\n}",
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
        "url": "/api/add-category"
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
    "filename": "src/api/controllers/CategoryController.ts",
    "groupTitle": "Category",
    "name": "PostApiAddCategory"
  },
  {
    "type": "put",
    "url": "/api/update-category/:id",
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
            "type": "number",
            "optional": false,
            "field": "parentInt",
            "description": "<p>Category  parentInt</p>"
          },
          {
            "group": "Request body",
            "type": "number",
            "optional": false,
            "field": "sortOrder",
            "description": "<p>Category sortOrder</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "metaTagTitle",
            "description": "<p>Category metaTagTitle</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "metaTagDescription",
            "description": "<p>Category metaTagDescription</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "metaTagKeyword",
            "description": "<p>Category metaTagKeyword</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>Category status 1-&gt; Active 0-&gt; inactive</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"categoryId\" : \"\",\n     \"name\" : \"\",\n     \"parentInt\" : \"\",\n     \"sortOrder\" : \"\",\n     \"metaTagTitle\" : \"\",\n     \"metaTagDescription\" : \"\",\n     \"metaTagKeyword\" : \"\",\n     \"status\" : \"\",\n}",
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
        "url": "/api/update-category/:id"
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
    "filename": "src/api/controllers/CategoryController.ts",
    "groupTitle": "Category",
    "name": "PutApiUpdateCategoryId"
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
    "filename": "src/api/controllers/CountryController.ts",
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
    "filename": "src/api/controllers/CountryController.ts",
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
            "optional": false,
            "field": "name",
            "description": "<p>Country name</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "isoCode2",
            "description": "<p>Country isoCode2</p>"
          },
          {
            "group": "Request body",
            "type": "String",
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
    "filename": "src/api/controllers/CountryController.ts",
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
            "optional": false,
            "field": "name",
            "description": "<p>Country name</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "isoCode2",
            "description": "<p>Country isoCode2</p>"
          },
          {
            "group": "Request body",
            "type": "String",
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
    "filename": "src/api/controllers/CountryController.ts",
    "groupTitle": "Country",
    "name": "PutApiCountryUpdateCountryId"
  },
  {
    "type": "delete",
    "url": "/api/customer/delete-customer/:id",
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
        "url": "/api/customer/delete-customer/:id"
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
    "filename": "src/api/controllers/CustomerController.ts",
    "groupTitle": "Customer",
    "name": "DeleteApiCustomerDeleteCustomerId"
  },
  {
    "type": "get",
    "url": "/api/customer/customer-details/:id",
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
        "url": "/api/customer/customer-details/:id"
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
    "filename": "src/api/controllers/CustomerController.ts",
    "groupTitle": "Customer",
    "name": "GetApiCustomerCustomerDetailsId"
  },
  {
    "type": "get",
    "url": "/api/customer/customer-excel-list",
    "title": "Customer Excel",
    "group": "Customer",
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
        "url": "/api/customer/customer-excel-list"
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
    "filename": "src/api/controllers/CustomerController.ts",
    "groupTitle": "Customer",
    "name": "GetApiCustomerCustomerExcelList"
  },
  {
    "type": "get",
    "url": "/api/customer/customerlist",
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
            "description": "<p>search bu email</p>"
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
        "url": "/api/customer/customerlist"
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
    "filename": "src/api/controllers/CustomerController.ts",
    "groupTitle": "Customer",
    "name": "GetApiCustomerCustomerlist"
  },
  {
    "type": "get",
    "url": "/api/customer/recent-customerlist",
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
        "url": "/api/customer/recent-customerlist"
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
    "filename": "src/api/controllers/CustomerController.ts",
    "groupTitle": "Customer",
    "name": "GetApiCustomerRecentCustomerlist"
  },
  {
    "type": "get",
    "url": "/api/customer/today-customercount",
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
        "url": "/api/customer/today-customercount"
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
    "filename": "src/api/controllers/CustomerController.ts",
    "groupTitle": "Customer",
    "name": "GetApiCustomerTodayCustomercount"
  },
  {
    "type": "post",
    "url": "/api/customer/add-customer",
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
            "optional": false,
            "field": "username",
            "description": "<p>Customer username</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Customer email</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "mobileNumber",
            "description": "<p>Customer mobileNumber</p>"
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
        "url": "/api/customer/add-customer"
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
    "filename": "src/api/controllers/CustomerController.ts",
    "groupTitle": "Customer",
    "name": "PostApiCustomerAddCustomer"
  },
  {
    "type": "post",
    "url": "/api/product/delete-customer",
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
        "url": "/api/customer/delete-customer"
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
    "filename": "src/api/controllers/CustomerController.ts",
    "groupTitle": "Customer",
    "name": "PostApiProductDeleteCustomer"
  },
  {
    "type": "put",
    "url": "/api/customer/update-customer/:id",
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
            "optional": false,
            "field": "username",
            "description": "<p>Customer username</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Customer email</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "mobileNumber",
            "description": "<p>Customer mobileNumber</p>"
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
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \" Customer is updated successfully\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/customer/update-customer/:id"
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
    "filename": "src/api/controllers/CustomerController.ts",
    "groupTitle": "Customer",
    "name": "PutApiCustomerUpdateCustomerId"
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
    "filename": "src/api/controllers/EmailTemplateController.ts",
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
    "filename": "src/api/controllers/EmailTemplateController.ts",
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
            "optional": false,
            "field": "title",
            "description": "<p>EmailTemplate title</p>"
          },
          {
            "group": "Request body",
            "type": "String",
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
    "filename": "src/api/controllers/EmailTemplateController.ts",
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
            "optional": false,
            "field": "title",
            "description": "<p>EmailTemplate title</p>"
          },
          {
            "group": "Request body",
            "type": "String",
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
    "filename": "src/api/controllers/EmailTemplateController.ts",
    "groupTitle": "EmailTemplate",
    "name": "PutApiEmailTemplateUpdateEmailTemplateId"
  },
  {
    "type": "delete",
    "url": "/api/manufacturer/delete-manufacturer/:id",
    "title": "Delete Manufacturer API",
    "group": "Manufacturer",
    "header": {
      "fields": {
        "Header": [
          {
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
          "content": "{\n     \"manufacturerId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully deleted Manufacturer.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/manufacturer/delete-manufacturer/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Manufacturer error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/ManufacturerController.ts",
    "groupTitle": "Manufacturer",
    "name": "DeleteApiManufacturerDeleteManufacturerId"
  },
  {
    "type": "get",
    "url": "/api/manufacturer/manufacturerlist",
    "title": "Manufacturer List API",
    "group": "Manufacturer",
    "header": {
      "fields": {
        "Header": [
          {
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
            "description": "<p>0-&gt;active 1-&gt;inactive</p>"
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
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get manufacturer list\",\n     \"data\":\"{}\"\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/manufacturer/manufacturerlist"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Manufacturer error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/ManufacturerController.ts",
    "groupTitle": "Manufacturer",
    "name": "GetApiManufacturerManufacturerlist"
  },
  {
    "type": "post",
    "url": "/api/manufacturer/create-manufacturer",
    "title": "Create Manufacturer API",
    "group": "Manufacturer",
    "header": {
      "fields": {
        "Header": [
          {
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
            "description": "<p>Manufacturer name</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "image",
            "description": "<p>Manufacturer image</p>"
          },
          {
            "group": "Request body",
            "type": "number",
            "optional": false,
            "field": "sortOrder",
            "description": "<p>Manufacturer sortOrder</p>"
          },
          {
            "group": "Request body",
            "type": "number",
            "optional": false,
            "field": "status",
            "description": "<p>status</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"name\" : \"\",\n     \"image\" : \"\",\n     \"imagePath\" : \"\",\n     \"sortOrder\" : \"\",\n     \"status\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully created new Manufacturer.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/manufacturer/create-manufacturer"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Manufacturer error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/ManufacturerController.ts",
    "groupTitle": "Manufacturer",
    "name": "PostApiManufacturerCreateManufacturer"
  },
  {
    "type": "post",
    "url": "/api/manufacturer/delete-manufacturer",
    "title": "Delete Multiple manufacturer API",
    "group": "Manufacturer",
    "header": {
      "fields": {
        "Header": [
          {
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
            "field": "manufacturerId",
            "description": "<p>manufacturerId</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n\"manufacturerId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n\"message\": \"Successfully deleted manufacturer.\",\n\"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/manufacturer/delete-manufacturer"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "manufacturerDelete error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/ManufacturerController.ts",
    "groupTitle": "Manufacturer",
    "name": "PostApiManufacturerDeleteManufacturer"
  },
  {
    "type": "put",
    "url": "/api/manufacturer/update-manufacturer/:id",
    "title": "Update Manufacturer API",
    "group": "Manufacturer",
    "header": {
      "fields": {
        "Header": [
          {
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
            "field": "manufacturerId",
            "description": "<p>Manufacturer manufacturerId</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Manufacturer name</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "image",
            "description": "<p>Manufacturer image</p>"
          },
          {
            "group": "Request body",
            "type": "number",
            "optional": false,
            "field": "sortOrder",
            "description": "<p>Manufacturer sortOrder</p>"
          },
          {
            "group": "Request body",
            "type": "number",
            "optional": false,
            "field": "status",
            "description": "<p>Manufacturer status</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"manufacturerId\" : \"\",\n     \"name\" : \"\",\n     \"image\" : \"\",\n     \"sortOrder\" : \"\",\n     \"status\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully updated Manufacturer.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/manufacturer/update-manufacturer/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Manufacturer error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/ManufacturerController.ts",
    "groupTitle": "Manufacturer",
    "name": "PutApiManufacturerUpdateManufacturerId"
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
    "filename": "src/api/controllers/OrderController.ts",
    "groupTitle": "Order",
    "name": "DeleteApiOrderDeleteOrderId"
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
    "filename": "src/api/controllers/OrderController.ts",
    "groupTitle": "Order",
    "name": "GetApiOrderOrderDetail"
  },
  {
    "type": "get",
    "url": "/api/order/order-excel-list",
    "title": "Order Excel",
    "group": "Order",
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
    "filename": "src/api/controllers/OrderController.ts",
    "groupTitle": "Order",
    "name": "GetApiOrderOrderExcelList"
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
            "type": "Number",
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
            "type": "Number",
            "optional": false,
            "field": "totalAmount",
            "description": "<p>search by totalAmount</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
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
    "filename": "src/api/controllers/OrderController.ts",
    "groupTitle": "Order",
    "name": "GetApiOrderOrderlist"
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
    "filename": "src/api/controllers/OrderController.ts",
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
    "filename": "src/api/controllers/OrderController.ts",
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
    "filename": "src/api/controllers/OrderController.ts",
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
    "filename": "src/api/controllers/OrderController.ts",
    "groupTitle": "Order",
    "name": "GetApiOrderTotalOrderAmount"
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
    "filename": "src/api/controllers/OrderController.ts",
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
    "filename": "src/api/controllers/OrderController.ts",
    "groupTitle": "Order",
    "name": "PostApiOrderOrderChangeStatus"
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
    "filename": "src/api/controllers/OrderStatusController.ts",
    "groupTitle": "OrderStatus",
    "name": "DeleteApiOrderStatusDeleteOrderStatusId"
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
    "filename": "src/api/controllers/OrderStatusController.ts",
    "groupTitle": "OrderStatus",
    "name": "GetApiOrderStatusOrderStatusList"
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
            "optional": false,
            "field": "name",
            "description": "<p>name</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "colorCode",
            "description": "<p>colorCode</p>"
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
          "content": "{\n     \"name\" : \"\",\n     \"colorCode\" : \"\",\n}",
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
    "filename": "src/api/controllers/OrderStatusController.ts",
    "groupTitle": "OrderStatus",
    "name": "PostApiOrderStatusCreateOrderStatus"
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
            "optional": false,
            "field": "name",
            "description": "<p>OrderStatus name</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "colorCode",
            "description": "<p>colorCode</p>"
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
          "content": "{\n     \"name\" : \"\",\n     \"colorCode\" : \"\",\n}",
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
    "filename": "src/api/controllers/OrderStatusController.ts",
    "groupTitle": "OrderStatus",
    "name": "PutApiOrderStatusUpdateOrderStatusId"
  },
  {
    "type": "delete",
    "url": "/api/page/delete-page/:id",
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
        "url": "/api/page/delete-page/:id"
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
    "filename": "src/api/controllers/PageController.ts",
    "groupTitle": "Page",
    "name": "DeleteApiPageDeletePageId"
  },
  {
    "type": "get",
    "url": "/api/page/pagelist",
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
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get page list\",\n     \"data\":{\n     \"pageId\" : \"\",\n     \"title\" : \"\",\n     \"content\" : \"\",\n     \"active\" : \"\",\n     \"metaTagTitle\" : \"\",\n     \"metaTagContent\" : \"\",\n     \"metaTagKeyword\" : \"\",\n     }\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/page/pagelist"
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
    "filename": "src/api/controllers/PageController.ts",
    "groupTitle": "Page",
    "name": "GetApiPagePagelist"
  },
  {
    "type": "post",
    "url": "/api/page/add-page",
    "title": "Add Page API",
    "group": "Page",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
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
            "field": "metaTagTitle",
            "description": "<p>metaTagTitle</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "metaTagContent",
            "description": "<p>metaTagContent</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "metaTagKeyword",
            "description": "<p>metaTagKeyword</p>"
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
          "content": "{\n     \"title\" : \"\",\n     \"content\" : \"\",\n     \"metaTagTitle\" : \"\",\n     \"metaTagContent\" : \"\",\n     \"metaTagKeyword\" : \"\",\n     \"active\" : \"\",\n}",
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
        "url": "/api/page/add-page"
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
    "filename": "src/api/controllers/PageController.ts",
    "groupTitle": "Page",
    "name": "PostApiPageAddPage"
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
    "filename": "src/api/controllers/PageController.ts",
    "groupTitle": "Page",
    "name": "PostApiPageDeletePage"
  },
  {
    "type": "put",
    "url": "/api/page/update-page/:id",
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
            "field": "active",
            "description": "<p>active</p>"
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
            "field": "metaTagContent",
            "description": "<p>metaTagContent</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "metaTagKeyword",
            "description": "<p>metaTagKeyword</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"pageId\" : \"\",\n     \"title\" : \"\",\n     \"content\" : \"\",\n     \"active\" : \"\",\n     \"metaTagTitle\" : \"\",\n     \"metaTagContent\" : \"\",\n     \"metaTagKeyword\" : \"\",\n}",
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
        "url": "/api/page/update-page/:id"
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
    "filename": "src/api/controllers/PageController.ts",
    "groupTitle": "Page",
    "name": "PutApiPageUpdatePageId"
  },
  {
    "type": "delete",
    "url": "/api/product/delete-product/:id",
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
        "url": "/api/product/delete-product/:id"
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
    "filename": "src/api/controllers/ProductController.ts",
    "groupTitle": "Product",
    "name": "DeleteApiProductDeleteProductId"
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
    "filename": "src/api/controllers/ProductController.ts",
    "groupTitle": "Product",
    "name": "GetApiProductCustomerproductviewListId"
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
    "filename": "src/api/controllers/ProductController.ts",
    "groupTitle": "Product",
    "name": "GetApiProductProductDetailId"
  },
  {
    "type": "get",
    "url": "/api/product/product-excel-list",
    "title": "Product Excel",
    "group": "Product",
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
    "filename": "src/api/controllers/ProductController.ts",
    "groupTitle": "Product",
    "name": "GetApiProductProductExcelList"
  },
  {
    "type": "get",
    "url": "/api/product/productlist",
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
        "url": "/api/product/productlist"
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
    "filename": "src/api/controllers/ProductController.ts",
    "groupTitle": "Product",
    "name": "GetApiProductProductlist"
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
    "filename": "src/api/controllers/ProductController.ts",
    "groupTitle": "Product",
    "name": "GetApiProductRecentSellingProduct"
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
    "filename": "src/api/controllers/ProductController.ts",
    "groupTitle": "Product",
    "name": "GetApiProductTopSellingProductlist"
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
    "filename": "src/api/controllers/ProductController.ts",
    "groupTitle": "Product",
    "name": "GetApiProductViewlogList"
  },
  {
    "type": "post",
    "url": "/api/product/add-product",
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
            "optional": false,
            "field": "productName",
            "description": "<p>productName</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "productDescription",
            "description": "<p>productDescription</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "sku",
            "description": "<p>stock keeping unit</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "upc",
            "description": "<p>upc</p>"
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
            "field": "metaTagTitle",
            "description": "<p>metaTagTitle</p>"
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
            "type": "Number",
            "optional": false,
            "field": "model",
            "description": "<p>model</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "location",
            "description": "<p>location</p>"
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
            "field": "outOfStockStatus",
            "description": "<p>outOfStockStatus</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
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
            "field": "condition",
            "description": "<p>1-&gt;new 2-&gt;used</p>"
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
            "field": "sortOrder",
            "description": "<p>sortOrder</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"productName\" : \"\",\n     \"productDescription\" : \"\",\n     \"sku\" : \"\",\n     \"image\" : \"\",\n     \"metaTagTitle\" : \"\",\n     \"categoryId\" : \"\",\n     \"upc\" : \"\",\n     \"model\" : \"\",\n     \"price\" : \"\",\n     \"location\" : \"\",\n     \"outOfStockStatus\" : \"\",\n     \"requiredShipping\" : \"\",\n     \"dateAvailable\" : \"\",\n     \"status\" : \"\",\n     \"outOfStockStatus\" : \"\",\n     \"sortOrder\" : \"\",\n     \"condition\" : \"\",\n     \"image\":[\n     {\n     \"image\":\"\"\n     \"containerName\":\"\"\n     \"defaultImage\":\"\"\n     }\n     ]",
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
        "url": "/api/product/add-product"
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
    "filename": "src/api/controllers/ProductController.ts",
    "groupTitle": "Product",
    "name": "PostApiProductAddProduct"
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
    "filename": "src/api/controllers/ProductController.ts",
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
            "optional": false,
            "field": "productName",
            "description": "<p>productName</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "productDescription",
            "description": "<p>productDescription</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "sku",
            "description": "<p>stock keeping unit</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "upc",
            "description": "<p>upc</p>"
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
            "field": "metaTagTitle",
            "description": "<p>metaTagTitle</p>"
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
            "type": "Number",
            "optional": false,
            "field": "model",
            "description": "<p>model</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "location",
            "description": "<p>location</p>"
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
            "field": "outOfStockStatus",
            "description": "<p>outOfStockStatus</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
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
            "type": "String",
            "optional": false,
            "field": "condition",
            "description": "<p>1-&gt;new 2-&gt;used</p>"
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
            "field": "sortOrder",
            "description": "<p>sortOrder</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"productName\" : \"\",\n     \"productDescription\" : \"\",\n     \"sku\" : \"\",\n     \"image\" : \"\",\n     \"metaTagTitle\" : \"\",\n     \"categoryId\" : \"\",\n     \"upc\" : \"\",\n     \"model\" : \"\",\n     \"price\" : \"\",\n     \"location\" : \"\",\n     \"outOfStockStatus\" : \"\",\n     \"requiredShipping\" : \"\",\n     \"dateAvailable\" : \"\",\n     \"status\" : \"\",\n     \"outOfStockStatus\" : \"\",\n     \"condition\" : \"\",\n     \"sortOrder\" : \"\",\n     \"image\":[\n     {\n     \"image\":\"\"\n     \"containerName\":\"\"\n     \"defaultImage\":\"\"\n     }\n     ],\n}",
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
    "filename": "src/api/controllers/ProductController.ts",
    "groupTitle": "Product",
    "name": "PostApiProductUpdateProductId"
  },
  {
    "type": "put",
    "url": "/api/product/update-todayDeals/:id",
    "title": "Update Today Deals API",
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
            "field": "todayDeals",
            "description": "<p>TodayDeals should be 0 or 1</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"todayDeals\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully updated product to today Deals.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/product/update-todayDeals/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "todayDeals error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/ProductController.ts",
    "groupTitle": "Product",
    "name": "PutApiProductUpdateTodaydealsId"
  },
  {
    "type": "get",
    "url": "/api/media/image-resize",
    "title": "Resize Image On The Fly",
    "group": "Resize_Image",
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
    "filename": "src/api/controllers/MediaController.ts",
    "groupTitle": "Resize_Image",
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
    "filename": "src/api/controllers/RoleController.ts",
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
    "header": {
      "fields": {
        "Header": [
          {
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
    "filename": "src/api/controllers/RoleController.ts",
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
    "filename": "src/api/controllers/RoleController.ts",
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
    "filename": "src/api/controllers/RoleController.ts",
    "groupTitle": "Role",
    "name": "PutApiRoleUpdateRoleId"
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
    "filename": "src/api/controllers/SettingController.ts",
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
            "description": "<p>storeLog</p>"
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
          "content": "{\n     \"url\" : \"\",\n     \"metaTagTitle\" : \"\",\n     \"metaTagDescription\" : \"\",\n     \"metaTagKeywords\" : \"\",\n     \"storeName\" : \"\",\n     \"storeOwner\" : \"\",\n     \"storeAddress\" : \"\",\n     \"countryId\" : \"\",\n     \"zoneId\" : \"\",\n     \"storeEmail\" : \"\",\n     \"storeTelephone\" : \"\",\n     \"storeFax\" : \"\",\n     \"storeLogo\" : \"\",\n     \"maintenanceMode\" : \"\",\n     \"storeImage\" : \"\",\n     \"invoicePrefix\" : \"\",\n     \"orderStatus\" : \"\",\n     \"categoryProductCount\" : \"\",\n     \"itemsPerPage\" : \"\",\n     \"google\" : \"\",\n     \"instagram\" : \"\",\n     \"facebook\" : \"\",\n     \"twitter\" : \"\",\n}",
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
    "filename": "src/api/controllers/SettingController.ts",
    "groupTitle": "Settings",
    "name": "PostApiSettingsCreateSettings"
  },
  {
    "type": "delete",
    "url": "/api/stock-status/delete-stock-status/:id",
    "title": "Delete Stock Status API",
    "group": "StockStatus",
    "header": {
      "fields": {
        "Header": [
          {
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
          "content": "{\n     \"stockStatusId\" : \"\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully deleted stockStatus.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/stock-status/delete-stock-status/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "StockStatus error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/StockStatusController.ts",
    "groupTitle": "StockStatus",
    "name": "DeleteApiStockStatusDeleteStockStatusId"
  },
  {
    "type": "get",
    "url": "/api/stock-status/stock-status-list",
    "title": "Stock Status List",
    "group": "StockStatus",
    "header": {
      "fields": {
        "Header": [
          {
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
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get stockStatus list\",\n     \"data\":\"{}\"\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/stock-status/stock-status-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "StockStatus error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/StockStatusController.ts",
    "groupTitle": "StockStatus",
    "name": "GetApiStockStatusStockStatusList"
  },
  {
    "type": "post",
    "url": "/api/stock-status/create-stock-status",
    "title": "Create Stock Status API",
    "group": "StockStatus",
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
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"New StockStatus is created successfully\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/stock-status/create-stock-status"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "createStockStatus error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/StockStatusController.ts",
    "groupTitle": "StockStatus",
    "name": "PostApiStockStatusCreateStockStatus"
  },
  {
    "type": "put",
    "url": "/api/stock-status/update-stock-status/:id",
    "title": "Update Stock Status API",
    "group": "StockStatus",
    "header": {
      "fields": {
        "Header": [
          {
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
            "description": "<p>StockStatus name</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>StockStatus status</p>"
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
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully updated stockStatus.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/stock-status/update-stock-status/:id"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "StockStatus error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/StockStatusController.ts",
    "groupTitle": "StockStatus",
    "name": "PutApiStockStatusUpdateStockStatusId"
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
    "filename": "src/api/controllers/store/CustomerController.ts",
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
    "filename": "src/api/controllers/store/CustomerController.ts",
    "groupTitle": "Store",
    "name": "GetApiCustomerLoginLogList"
  },
  {
    "type": "get",
    "url": "/api/manufacturers/manufacturerlist",
    "title": "Manufacturer List API",
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
            "description": "<p>count in number</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get manufacturer list\",\n     \"data\":\"{\n     \"manufacturerId\" : \"\",\n     \"name\" : \"\",\n     \"image\" : \"\",\n     \"imagePath\" : \"\",\n     \"sortOrder\" : \"\",\n     }\"\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/manufacturers/manufacturerlist"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Manufacturer error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/store/ManufacturerController.ts",
    "groupTitle": "Store",
    "name": "GetApiManufacturersManufacturerlist"
  },
  {
    "type": "get",
    "url": "/api/pages/get_pagedetails/:id",
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
        "url": "/api/pages/get_pagedetails/:id"
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
    "filename": "src/api/controllers/store/PageController.ts",
    "groupTitle": "Store",
    "name": "GetApiPagesGet_pagedetailsId"
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
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get page list\",\n     \"data\":{\n     \"pageId\" : \"\",\n     \"title\" : \"\",\n     \"content\" : \"\",\n     \"active\" : \"\",\n     \"metaTagTitle\" : \"\",\n     \"metaTagContent\" : \"\",\n     \"metaTagKeyword\" : \"\",\n     }\n     \"status\": \"1\"\n}",
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
    "filename": "src/api/controllers/store/PageController.ts",
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
    "filename": "src/api/controllers/store/ProductController.ts",
    "groupTitle": "Store",
    "name": "GetApiProductStoreGetCategory"
  },
  {
    "type": "get",
    "url": "/api/product-store/productdetail/:id",
    "title": "Product Detail API",
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
          "content": "HTTP/1.1 200 OK\n{\n     \"status\": \"1\"\n     \"message\": \"Successfully get product Detail\",\n     \"data\":\"{}\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/product-store/productdetail/:id"
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
    "filename": "src/api/controllers/store/ProductController.ts",
    "groupTitle": "Store",
    "name": "GetApiProductStoreProductdetailId"
  },
  {
    "type": "get",
    "url": "/api/product-store/todayDeals-list",
    "title": "Today Deals List",
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
            "description": "<p>keyword search by name</p>"
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
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Successfully get today deals product List..!!\",\n     \"status\": \"1\",\n     \"data\": {},\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/product-store/todayDeals-list"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "TodayDeals List error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/store/ProductController.ts",
    "groupTitle": "Store",
    "name": "GetApiProductStoreTodaydealsList"
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
            "optional": false,
            "field": "oldPassword",
            "description": "<p>Old Password</p>"
          },
          {
            "group": "Request body",
            "type": "String",
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
    "filename": "src/api/controllers/store/CustomerController.ts",
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
            "optional": false,
            "field": "firstName",
            "description": "<p>First Name</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
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
            "optional": false,
            "field": "emailId",
            "description": "<p>User Email Id</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "phoneNumber",
            "description": "<p>User Phone Number (Optional)</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
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
    "filename": "src/api/controllers/store/CustomerController.ts",
    "groupTitle": "Store",
    "name": "PostApiCustomerEditProfile"
  },
  {
    "type": "post",
    "url": "/api/customer/forgot-password",
    "title": "Forgot Password API",
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
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"emailId\" : \"\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Thank you,Your password send to your mail id please check your email.\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/customer/forgot-password"
      }
    ],
    "error": {
      "examples": [
        {
          "title": "Forgot Password error",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/api/controllers/store/CustomerController.ts",
    "groupTitle": "Store",
    "name": "PostApiCustomerForgotPassword"
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
            "optional": false,
            "field": "emailId",
            "description": "<p>User Email Id</p>"
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
          "content": "{\n     \"emailId\" : \"\",\n     \"password\" : \"\",\n}",
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
    "filename": "src/api/controllers/store/CustomerController.ts",
    "groupTitle": "Store",
    "name": "PostApiCustomerLogin"
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
            "optional": false,
            "field": "name",
            "description": "<p>Name</p>"
          },
          {
            "group": "Request body",
            "type": "String",
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
            "optional": false,
            "field": "emailId",
            "description": "<p>User Email Id</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "phoneNumber",
            "description": "<p>User Phone Number (Optional)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"name\" : \"\",\n     \"password\" : \"\",\n     \"confirmPassword\" : \"\",\n     \"emailId\" : \"\",\n     \"phoneNumber\" : \"\",\n}",
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
    "filename": "src/api/controllers/store/CustomerController.ts",
    "groupTitle": "Store",
    "name": "PostApiCustomerRegister"
  },
  {
    "type": "get",
    "url": "/api/list/banner-list",
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
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"Thank you Banner list show successfully..!\",\n     \"status\": \"1\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/api/list/banner-list"
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
    "filename": "src/api/controllers/store/CommonListController.ts",
    "groupTitle": "Store_List",
    "name": "GetApiListBannerList"
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
    "filename": "src/api/controllers/store/CommonListController.ts",
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
    "filename": "src/api/controllers/store/CommonListController.ts",
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
            "type": "Number",
            "optional": false,
            "field": "manufacturerId",
            "description": "<p>manufacturerId</p>"
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
            "type": "Number",
            "optional": false,
            "field": "condition",
            "description": "<p>1-&gt;new 2-&gt;used</p>"
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
    "filename": "src/api/controllers/store/CommonListController.ts",
    "groupTitle": "Store_List",
    "name": "GetApiListCustomProductList"
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
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>keyword for search</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "manufacturerId",
            "description": "<p>manufacturerId</p>"
          },
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
            "field": "priceFrom",
            "description": "<p>price from you want to list</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "priceTo",
            "description": "<p>price to you want to list</p>"
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
    "filename": "src/api/controllers/store/CommonListController.ts",
    "groupTitle": "Store_List",
    "name": "GetApiListProductCount"
  },
  {
    "type": "get",
    "url": "/api/list/productlist",
    "title": "Product List API",
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
            "field": "manufacturerId",
            "description": "<p>manufacturerId</p>"
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
            "type": "Number",
            "optional": false,
            "field": "price",
            "description": "<p>orderBy 0-&gt;desc 1-&gt;asc</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "condition",
            "description": "<p>1-&gt;new 2-&gt;used</p>"
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
            "field": "count",
            "description": "<p>count in boolean or number</p>"
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
        "url": "/api/list/productlist"
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
    "filename": "src/api/controllers/store/CommonListController.ts",
    "groupTitle": "Store_List",
    "name": "GetApiListProductlist"
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
            "type": "Number",
            "optional": false,
            "field": "categoryId",
            "description": "<p>categoryId</p>"
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
    "filename": "src/api/controllers/store/CommonListController.ts",
    "groupTitle": "Store_List",
    "name": "GetApiListSpecificCategoryList"
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
    "filename": "src/api/controllers/store/CommonListController.ts",
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
            "optional": false,
            "field": "name",
            "description": "<p>Name</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "phoneNumber",
            "description": "<p>Phone Number</p>"
          },
          {
            "group": "Request body",
            "type": "String",
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
    "filename": "src/api/controllers/store/CommonListController.ts",
    "groupTitle": "Store_List",
    "name": "PostApiListContactUs"
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
    "filename": "src/api/controllers/store/CustomerOrderController.ts",
    "groupTitle": "Store_order",
    "name": "GetApiOrdersOrderDetail"
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
    "filename": "src/api/controllers/store/CustomerOrderController.ts",
    "groupTitle": "Store_order",
    "name": "GetApiOrdersOrderList"
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
            "type": "String",
            "optional": false,
            "field": "shippingFirstName",
            "description": "<p>Shipping First name</p>"
          },
          {
            "group": "Request body",
            "type": "String",
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
            "optional": false,
            "field": "shippingAddress_1",
            "description": "<p>Shipping Address 1</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "shippingAddress_2",
            "description": "<p>Shipping Address 2</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "shippingCity",
            "description": "<p>Shipping City</p>"
          },
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "shippingPostCode",
            "description": "<p>Shipping PostCode</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "shippingCountry",
            "description": "<p>Shipping Country</p>"
          },
          {
            "group": "Request body",
            "type": "String",
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
            "type": "Number",
            "optional": false,
            "field": "phoneNumber",
            "description": "<p>Customer Phone Number</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "emailId",
            "description": "<p>Customer Email Id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n     \"productDetail\" :[\n     {\n     \"productId\" : \"\",\n     \"quantity\" : \"\",\n     \"price\" : \"\",\n     \"model\" : \"\",\n     \"name\" : \"\",\n     \"shippingFirstName\" : \"\",\n     \"shippingLastName\" : \"\",\n     \"shippingCompany\" : \"\",\n     \"shippingAddress_1\" : \"\",\n     \"shippingAddress_2\" : \"\",\n     \"shippingCity\" : \"\",\n     \"shippingPostCode\" : \"\",\n     \"shippingCountry\" : \"\",\n     \"shippingZone\" : \"\",\n     \"shippingAddressFormat\" : \"\",\n     \"phoneNumber\" : \"\",\n     \"emailId\" : \"\",\n}",
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
    "filename": "src/api/controllers/store/CustomerOrderController.ts",
    "groupTitle": "Store_order",
    "name": "PostApiOrdersCustomerCheckout"
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
    "filename": "src/api/controllers/store/CustomerWishListController.ts",
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
    "filename": "src/api/controllers/store/CustomerWishListController.ts",
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
    "filename": "src/api/controllers/store/CustomerWishListController.ts",
    "groupTitle": "Store_wishlist",
    "name": "PostApiCustomerAddProductToWishlist"
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
    "filename": "src/api/controllers/ZoneController.ts",
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
    "filename": "src/api/controllers/ZoneController.ts",
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
    "filename": "src/api/controllers/ZoneController.ts",
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
    "filename": "src/api/controllers/ZoneController.ts",
    "groupTitle": "Zone",
    "name": "PutApiZoneUpdateZoneId"
  },
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
    "group": "_home_veerapandi_picco_Documents_communityv3_0_1_revisedVersion_spurtcommerce_community_api_src_public_apidoc_main_js",
    "groupTitle": "_home_veerapandi_picco_Documents_communityv3_0_1_revisedVersion_spurtcommerce_community_api_src_public_apidoc_main_js",
    "name": ""
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
    "filename": "src/api/controllers/MediaController.ts",
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
    "filename": "src/api/controllers/MediaController.ts",
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
    "filename": "src/api/controllers/MediaController.ts",
    "groupTitle": "media",
    "name": "GetApiMediaSearchFolder"
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
    "filename": "src/api/controllers/MediaController.ts",
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
    "filename": "src/api/controllers/MediaController.ts",
    "groupTitle": "media",
    "name": "PostApiMediaDeleteFolder"
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
            "optional": false,
            "field": "path",
            "description": "<p>Directory Name</p>"
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
    "filename": "src/api/controllers/MediaController.ts",
    "groupTitle": "media",
    "name": "PostApiMediaUploadFile"
  }
] });
