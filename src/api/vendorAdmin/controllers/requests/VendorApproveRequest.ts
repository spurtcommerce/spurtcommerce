import { KycStatus } from '../../../core/models/Vendor';

export class VendorApproveRequest {

    public companyDetail: number;

    public businessAddress: number;

    public gstPan: number;

    public document: number;

    public bankAccount: number;

    public bankAddress: number;

    public policy: number;

    public subscriptionPlan: number;

    public category: number;

    public storeFront: number;

    public deliveryMethod: number;

    public distributionPoint: number;

    public paymentInfo: number;

    public approvalFlag: number;

    public comment: string;

    public commentFor: string;

    public emailVerify: number;

    public vendorGroupId: number;

    public kycStatus: KycStatus;

}
