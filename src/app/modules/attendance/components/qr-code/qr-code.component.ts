import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.scss']
})
export class QrCodeComponent implements OnInit {
  public qrdata: string = null;
  public level: "L" | "M" | "Q" | "H";
  public width: number;
  constructor() {
    this.level = "M";
    this.qrdata = "Initial QR code data string";
    this.width = 256;
  }

  ngOnInit(): void {

  }
  // data = [{
  //   'name': 'Jolly',
  //   'address': 'Mars',
  //   'email': 'example@abc.com'
  // }]

  // dataString = JSON.stringify(this.data);
  changeLevel(newValue: "L" | "M" | "Q" | "H"): void {
    this.level = newValue;
  }

  changeQrdata(newValue: string): void {
    this.qrdata = newValue;
  }

  changeWidth(newValue: number): void {
    this.width = newValue;
  }
}
