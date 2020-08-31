import { DataSource, CollectionViewer } from '@angular/cdk/collections';
import { GarmentDetailFormValue } from './garment-detail-contents';
import { from, Observable, BehaviorSubject, of } from 'rxjs';
import { GarmentApiService } from './garment-api.service';
import { catchError, finalize } from 'rxjs/operators';

export class GarmentDataSource implements DataSource<GarmentDetailFormValue> {

    private garmentDetailSubject = new BehaviorSubject<GarmentDetailFormValue[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    garmentLength: number;

    public loading$ = this.loadingSubject.asObservable();

    constructor(private garmentApiService: GarmentApiService) {}

    connect(collectionViewer: CollectionViewer): Observable<GarmentDetailFormValue[]> {
        return this.garmentDetailSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.garmentDetailSubject.complete();
        this.loadingSubject.complete();
    }

    loadAllGarmentValues(filter: string, sortOrder: string, pageIndex: number, pageSize: number) {
        this.loadingSubject.next(true);
        this.garmentApiService.viewAllGarments(filter, sortOrder, pageIndex, pageSize).pipe(
            catchError(() => of([])),
            finalize(()=> this.loadingSubject.next(false))
        ).subscribe(garmentManagementContent => {
            var seqNo = 1;
            garmentManagementContent['garmentManagementDtoList'].forEach(row => {
                row['purchaseNumber'] = seqNo++;
            });
            this.garmentLength = garmentManagementContent['totalLength'];
            this.garmentDetailSubject.next(garmentManagementContent['garmentManagementDtoList']);
        });
    }

}