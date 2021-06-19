import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class VehicleService {
    constructor(private http: HttpClient) {

    }
    createVehicle(body): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            const apiUrl = `${environment.apiUrl}/vehicleCreate`;
            this.http.post(apiUrl, body).toPromise().then((rea) => {

                resolve(rea)
            }).catch((error) => {
                reject(error);
            })
        })
    }
    getVehicle(parms): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            const apiUrl = `${environment.apiUrl}/get_vehicle_data?PageNumber=${parms.PageNumber}&PageSize=${parms.PageSize}&search=${parms.search}`;
            this.http.get(apiUrl).toPromise().then((res) => {
                resolve(res)
            }).catch((error) => {
                reject(error)
            })
        })
    }
    deleteVehicle(id): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            const apiUrl = `${environment.apiUrl}/vehicleDelete/${id}`;
            this.http.delete(apiUrl).toPromise().then((rea) => {

                resolve(rea)
            }).catch((error) => {
                reject(error);
            })
        })
    }
    updateVehicle(body): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            const apiUrl = `${environment.apiUrl}/updatevehicle/${body.id}`;
            this.http.put(apiUrl, body).toPromise().then((rea) => {

                resolve(rea)
            }).catch((error) => {
                reject(error);
            })
        })
    }
}