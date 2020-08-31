import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GarmentDetailFormValue } from './garment-detail-contents';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { GarmentManagementContent } from './garment-management-content';

@Injectable({
  providedIn: 'root'
})
export class GarmentApiService {

  private baseUrl = 'http://localhost:8083/garment-management/api';

  constructor(private http: HttpClient) { }

  insertGarmentDetail(garmentDetailFormValue: GarmentDetailFormValue): Observable<string> {
    const option = { responseType: 'text' as 'json'};
    return this.http.post<string>(this.baseUrl + '/create', garmentDetailFormValue, option)
    .pipe(tap((transactStatus: string) => {
      console.log(transactStatus);
    }));
  }

  viewAllGarments(filter: string, sortOrder: string, pageIndex: number, pageSize: number): Observable<GarmentManagementContent> {
    const params = { 
      'filter': filter,
      'sortOrder': sortOrder,
      'pageIndex': pageIndex + '',
      'pageSize': pageSize + '',
    };
    return this.http.get<GarmentManagementContent>(this.baseUrl + '/viewAll', {params: params});
  }
}
