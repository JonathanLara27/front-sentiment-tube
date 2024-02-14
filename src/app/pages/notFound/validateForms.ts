import { FormGroup } from "@angular/forms";

export function isValidField(field: string, fg: FormGroup): boolean | null {
    return fg.controls[field].errors && fg.controls[field].touched;
  }

export function getFieldErrors(field: string, fg:FormGroup): string | null{
    if(!fg.controls[field]) return '';
    const errors = fg.controls[field].errors || {};
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';
        case 'email':
          return 'El email no es válido';
        case 'minlength':
          return `El mínimo de carácteres es ${errors[key].requiredLength}`;
        case'maxlength':
          return `El máximo de carácteres es ${errors[key].requiredLength}`;
        case 'pattern':
          return 'El campo no tiene el formato correcto';
        case 'invalidYoutubeLink':
          return 'El campo no tiene el formato correcto';
        case 'min':
          return `El mínimo es ${errors[key].min}`;
        case 'max':
          return `El máximo es ${errors[key].max}`;
        default:
          return 'Error no identificado'
      }
    }
    return null;
  }