import { IsNotEmpty } from 'class-validator';

export class VendorDocumentRequest {
    @IsNotEmpty()
    public documentId: number;

    @IsNotEmpty()
    public fileName: string;

    @IsNotEmpty()
    public filePath: string;

    public status: number;

    @IsNotEmpty()
    public vendorId: number;

    public certificate: Certificate;
}

interface Certificate {
    certificationType: string;
    refrenceNo: string;
    name: string;
    issuedBy: string;
    validFrom: string;
    validTo: string;
}
