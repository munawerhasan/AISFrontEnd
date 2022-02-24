import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusConversion'
})
export class StatusConversionPipe implements PipeTransform {

  transform(value: any): string {
    status = "";

    if (value === 1) {
      status = "Active";
    }
    else if (value === 2) {
      status = "InActive";
    }
    else if (value === 3) {
      status = "Suspended";
    }
    else if (value === 4) {
      status = "Promoted"; 
    }
    else if (value === 5) {
      status = "Deleted";
    }
    else
    {
      status = "Unknown";
    }

    return status;
  }


}
