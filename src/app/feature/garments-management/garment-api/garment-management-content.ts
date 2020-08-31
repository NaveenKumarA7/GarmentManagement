import { GarmentDetailFormValue } from './garment-detail-contents';

export interface GarmentManagementContent {
    garmentManagementDtoList: GarmentDetailFormValue[];
    totalLength: number;
}