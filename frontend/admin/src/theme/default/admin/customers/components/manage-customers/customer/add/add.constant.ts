import { Validators } from "@angular/forms";
import { CustomValidators } from "src/theme/default/admin/shared/components/interface/custom-password-validation";

export const formFields = {
  SiteName: {
    section: "buyer",
    label: "Customers.Customer.SiteId",
    name: "siteName",
    aliasName: "",
    validatiors: [],
    type: "ngSelect",
    placeholder: "Customers.Customer.SelectSiteIdIsRequired",
    customData: {
      data: [],
      key: "storeName",
      value: "id",
      disabled: true,
    },
  },
  BuyerGroup: {
    section: "buyer",
    label: "Customers.Customer.CustomerGroup",
    name: "buyerGroup",
    aliasName: "",
    validatiors: [Validators.required],
    type: "ngSelect",
    placeholder: "Customers.Customer.SelectCustomerGroup",
    mandatory: true,
    customData: {
      data: [],
      key: "name",
      value: "id",
    },
  },
  BuyerName: {
    section: "buyer",
    label: "Sales.Orders.CustomerName",
    name: "buyerName",
    aliasName: "",
    validatiors: [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(32),
      Validators.pattern(/^[a-zA-Z\s]*$/),
    ],
    type: "text",
    placeholder: "Customers.CustomerPlaceholder.CustomerName",
    mandatory: true,
    optionalErrorMessage: { pattern: "ValidationsErrorMessage.Allowonlyalphabetsspaces" },
  },
  Email: {
    section: "buyer",
    label: "Customers.Customer.Email",
    name: "email",
    aliasName: "",
    validatiors: [
      Validators.required,
      Validators.maxLength(96),
      Validators.pattern(
        "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@" +
          "[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$"
      ),
    ],
    type: "text",
    placeholder: "Customers.CustomerPlaceholder.Email",
    mandatory: true,
    optionalErrorMessage: {
      pattern: "Customers.Error.EmailMustBeAValidEmailAddress",
    },
  },
  Telephone: {
    section: "buyer",
    label: "Customers.Customer.Telephone",
    name: "telephone",
    aliasName: "",
    validatiors: [
      Validators.required,
      Validators.maxLength(15),
    ],
    type: "number",
    placeholder: "Customers.CustomerPlaceholder.Telephone",
    mandatory: true,
  },
  Password: {
    section: "moreInfo",
    label: "Customers.Customer.Password",
    name: "password",
    aliasName: "",
    validatiors: [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(50),
      // check whether the entered password has a number
      CustomValidators.patternValidator(/((?=.*\d)|(?=.*[#$^+=!*()@%&]))/, { hasNumber: true }),
      // check whether the entered password has upper case letter
      CustomValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
      // check whether the entered password has a lower-case letter
      CustomValidators.patternValidator(/[a-z]/, { hasSmallCase: true }),
    ],
    type: "password",
    placeholder: "Customers.CustomerPlaceholder.Password",
    mandatory: true,
    optionalErrorMessage: {
        hasNumber: "Customers.Error.MustHave1NumberOrSymbol",
        hasCapitalCase: "Customers.Error.MustContain1CapitalCase",
        hasSmallCase: "Customers.Error.MustContain1SmallCase"
    },
  },
  ConfirmPassword: {
    section: "moreInfo",
    label: "Customers.Customer.ConfirmPassword",
    name: "confirmPassword",
    aliasName: "",
    validatiors: [Validators.required],
    type: "password",
    placeholder: "Customers.Customer.ConfirmPassword",
    mandatory: true,
    optionalErrorMessage: {
        NoPassswordMatch: 'Customers.Error.ConfirmpasswordIsMismatch'
    }
  },
  Status: {
    section: "moreInfo",
    label: "Customers.Customer.Status",
    name: "status",
    aliasName: "",
    validatiors: [Validators.required],
    type: "ngSelect",
    placeholder: "Customers.Customer.SelectStatus",
    customData: {
      data: [
        { id: "1", name: "Enabled" },
        { id: "0", name: "Disabled" },
      ],
      key: "name",
      value: "id",
    },
    mandatory: true,

  },
  MailStatus: {
    label: "Customers.Customer.MailStatus",
    name: "mailStatus",
    aliasName: "",
    validatiors: [],
    type: "checkbox",
    placeholder: "",
    customStyle: {
      trow: {
        class: 'check-table'
      },
      tbody: {
        class: 'check-table'
      }
    }
  }
};
