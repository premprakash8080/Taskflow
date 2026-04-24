import { AbstractControl, ValidatorFn } from "@angular/forms";

export function strongPasswordValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      if (!value) {
        return null;
      }
  
      const hasUpperCase = /[A-Z]+/.test(value);
      const hasLowerCase = /[a-z]+/.test(value);
      const hasNumeric = /[0-9]+/.test(value);
      const hasSpecial = /[!@#$%^&*(),.?":{}|<>]+/.test(value);
      const isLengthValid = value.length >= 8;
  
      const passwordValid = hasUpperCase && hasLowerCase && hasNumeric && hasSpecial && isLengthValid;
  
      return !passwordValid ? { strongPassword: true } : null;
    };
  }
  
  export function passwordMatchValidator(control: AbstractControl) {
    const password = control.get('newPassword');
    const confirmPassword = control.get('confirmPassword');
    if (!password || !confirmPassword) {
      return null;
    }
  
    return password.value === confirmPassword.value ? null : { passwordsNotMatch: true };
  }