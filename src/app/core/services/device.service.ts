import { Injectable } from '@angular/core';
import { Device } from '@capacitor/device';


@Injectable({
    providedIn: "root",
  })
export class DeviceService {

    constructor(){}

    async getDeviceInfo(){
        return await Device.getInfo();
    }


    async getBatteryInfo (){
        return await Device.getBatteryInfo();
    };
}