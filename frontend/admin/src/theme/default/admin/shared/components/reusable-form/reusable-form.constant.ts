//array of object
export function getFormControlsFields(model: any) {
    const formGroupFields: any = {};
    model.forEach((element: any) => {

      if (['multiplecheckbox'].includes(element.type)) {

      } else {
        formGroupFields[element.name] = [null, element.validatiors ?? []];
      }
    });
    return formGroupFields;
  }

  //object
  export function getFormControlsFieldsObj(val: any) {
    const obj: any= {};
    Object.keys(val).forEach((element: any) => {
      if (['multiplecheckbox'].includes(element.type)) {
        
      } else {
        obj[val[element].name] = [null, val[element].validatiors ?? []];
      }
    });
    return obj;
  }
  
  export function getTypes(key: any, dynamicFormGroup: any) {
    let val: any = {
      control: dynamicFormGroup.controls[key.name],
      submitted: key.submitted ?? false,
      label: key.label ?? key.name,
      inputId: key.name ?? key.name,
      aliasName: key.aliasName,
      type: key.type,
      optionalErrorMessage: key.optionalErrorMessage ?? {},
      mandatory: key.mandatory,
      toolTip: key.toolTip,
      isDisabled: key.isDisabled,
      placeholder:key.placeholder
    };
    if (['radio', 'select', 'multiplecheckbox','ngSelect','password','toggle'].includes(key.type)) {
      val.customData = key.customData;
    }
    return val;
  }