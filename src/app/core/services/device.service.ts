import { Injectable } from '@angular/core';
import { Device } from '@capacitor/device';

@Injectable({
  providedIn: 'root',
})
export class DeviceService {
  device: any;
  constructor() {
    this.getDeviceInfo().then((res) => {
      this.device = res;
    });
  }

  async getDeviceInfo() {
    return await Device.getInfo();
  }

  async getBatteryInfo() {
    return await Device.getBatteryInfo();
  }

  isMobile() {
    return (
      this.device.operatingSystem == 'android' ||
      this.device.operatingSystem == 'ios'
    );
  }
}
