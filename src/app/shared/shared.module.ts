import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusConversionPipe } from './pipes/status-conversion.pipe';
import { ShortenTextPipe } from './pipes/shorten-text.pipe';

@NgModule({
  declarations: [StatusConversionPipe, ShortenTextPipe],
  imports: [
    CommonModule,
    
  ],
  exports: [
    StatusConversionPipe,
    ShortenTextPipe
  ],
})
export class SharedModule { }
