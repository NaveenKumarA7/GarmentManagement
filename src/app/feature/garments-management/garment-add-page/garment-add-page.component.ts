import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GarmentDetailContents } from '../garment-api/garment-detail-contents';
import { GarmentApiService } from './../garment-api/garment-api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription, Subject, interval } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-garment-add-page',
  templateUrl: './garment-add-page.component.html',
  styleUrls: ['./garment-add-page.component.css']
})
export class GarmentAddPageComponent implements OnInit, OnDestroy {

  garment_detail_form_group: FormGroup;
  garmentDetailContents: GarmentDetailContents;
  isTotalAmountCalculated: boolean;

  private $autosave: Subscription;
  private $destroyed: Subject<boolean> = new Subject();
  
  constructor(
    private formBuilder: FormBuilder, 
    private garmentApiService: GarmentApiService, 
    private router: Router,
    private activeRouter: ActivatedRoute) 
    { }

  ngOnInit(): void {
    this.setInitialValue();
    this.setAutoSave();
  }

  ngOnDestroy(): void {
    this.$destroyed.next(true);
    this.$destroyed.complete();
    if(this.$autosave) {
      this.$autosave.unsubscribe();
    }
  }

  private setInitialValue() {
    this.garment_detail_form_group = this.formBuilder.group({
      garmentName: new FormControl(null, Validators.required),
      purchaseDate: new FormControl(new Date(), Validators.required),
      materialName: new FormControl(null, Validators.required),
      materialColor: new FormControl(null, Validators.required),
      materialWeight: new FormControl(null, Validators.required),
      materialPrice: new FormControl(null, Validators.required),
      totalAmount: new FormControl({ value: 0, disabled: true}),
      amountPaid: new FormControl(0),
      balanceAmount: new FormControl({ value: 0, disabled: true})
    });
    this.garmentDetailContents = new GarmentDetailContents(this.garment_detail_form_group);
  }

  private setAutoSave() {
    if (!this.$autosave) {
      interval(30000).pipe(takeUntil(this.$destroyed))
        .subscribe(() => this.garmentDetailContents.patchFormValue(this.garment_detail_form_group));
    }
  }

  onWeightChange(event: any) {
    if (event.target.value) {
      if ( this.garment_detail_form_group.controls.materialPrice.value && (this.garment_detail_form_group.controls.materialPrice.value !== 0)) {
        this.garment_detail_form_group.controls.totalAmount.setValue(event.target.value * this.garment_detail_form_group.controls.materialPrice.value);
        this.garment_detail_form_group.controls.amountPaid.setValue(0);
        this.garment_detail_form_group.controls.balanceAmount.setValue(0);
      } else {
        this.garment_detail_form_group.controls.totalAmount.setValue(0);
        this.isTotalAmountCalculated = false;
      }
    }
  }

  onPriceChange(event: any) {
    if (event.target.value) {
      this.garment_detail_form_group.controls.totalAmount.setValue(this.garment_detail_form_group.value.materialWeight * event.target.value);
      this.isTotalAmountCalculated = true;
      this.garment_detail_form_group.controls.amountPaid.setValue(0);
      this.garment_detail_form_group.controls.balanceAmount.setValue(0);
    }
  }

  onPaymentChanges(event: any) {
    this.garment_detail_form_group.controls.balanceAmount.setValue(this.garment_detail_form_group.controls.totalAmount.value - event.target.value);
  }

  onClearForm(event: any) {
    alert("Clearing Data");
    this.setInitialValue();
  }

  onSave(event: any) {
    alert("Saving Data");
    this.garmentDetailContents.patchFormValue(this.garment_detail_form_group);
    this.garmentApiService.insertGarmentDetail(this.garmentDetailContents.getFormValue())
      .subscribe(transactionStatus => {
        alert(transactionStatus + ' / Data Inserted....');
        if (transactionStatus === 'Inserted') {
          this.router.navigate(['../success-page'], { replaceUrl: true, relativeTo: this.activeRouter });
        }
    });
  }
}
