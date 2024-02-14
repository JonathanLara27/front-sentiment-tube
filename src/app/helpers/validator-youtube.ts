import { AbstractControl } from "@angular/forms";

// Custom validator function for YouTube link format
export function youtubeLinkValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  
    if (control.value && !youtubeRegex.test(control.value)) {
      return { 'invalidYoutubeLink': true };
    }
  
    return null;
  }