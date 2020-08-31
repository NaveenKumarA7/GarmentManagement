import { FormGroup } from '@angular/forms';

export class GarmentDetailContents {
    purchaseNumber?: string;
    garmentName: string;
    purchaseDate: Date;
    materialName: string;
    materialColor: string;
    materialWeight: number;
    materialPrice: number;
    totalAmount?: number;
    amountPaid?: number;
    balanceAmount?: number;

    public constructor(appContent: FormGroup) {
        if (appContent) {
            for (const fieldName in appContent.controls) {
                if (fieldName === 'garmentName') {
                    this.garmentName = appContent.controls[fieldName].value;
                } else if (fieldName === 'purchaseDate') {
                    this.purchaseDate = appContent.controls[fieldName].value;
                } else if (fieldName === 'materialName') {
                    this.materialName = appContent.controls[fieldName].value;
                } else if (fieldName === 'materialColor') {
                    this.materialColor = appContent.controls[fieldName].value;
                } else if (fieldName === 'materialWeight') {
                    this.materialWeight = appContent.controls[fieldName].value;
                } else if (fieldName === 'materialPrice') {
                    this.materialPrice = appContent.controls[fieldName].value;
                } else if (fieldName === 'totalAmount') {
                    this.totalAmount = appContent.controls[fieldName].value;
                } else if (fieldName === 'amountPaid') {
                    this.amountPaid = appContent.controls[fieldName].value;
                } else if (fieldName === 'balanceAmount') {
                    this.balanceAmount = appContent.controls[fieldName].value;
                }
            }
        }
    }

    getFormValue(): GarmentDetailFormValue {
        return {
            purchaseNumber: this.purchaseNumber,
            garmentName: this.garmentName,
            purchaseDate: this.purchaseDate,
            materialName: this.materialName,
            materialColor: this.materialColor,
            materialWeight: this.materialWeight,
            materialPrice: this.materialPrice,
            totalAmount: this.totalAmount,
            amountPaid: this.amountPaid,
            balanceAmount: this.balanceAmount
        };
    }

    patchFormValue(appContent: FormGroup) {
        this.garmentName = appContent.controls['garmentName'].value;
        this.purchaseDate = appContent.controls['purchaseDate'].value;
        this.materialName = appContent.controls['materialName'].value;
        this.materialColor = appContent.controls['materialColor'].value;
        this.materialWeight = appContent.controls['materialWeight'].value;
        this.materialPrice = appContent.controls['materialPrice'].value;
        this.totalAmount = appContent.controls['totalAmount'].value;
        this.amountPaid = appContent.controls['amountPaid'].value;
        this.balanceAmount = appContent.controls['balanceAmount'].value;
    }        
}

export interface GarmentDetailFormValue {
    purchaseNumber?: string;
    garmentName: string;
    purchaseDate: Date;
    materialName: string;
    materialColor: string;
    materialWeight: number;
    materialPrice: number;
    totalAmount?: number;
    amountPaid?: number;
    balanceAmount?: number;
}

