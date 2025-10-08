import { Repository } from 'typeorm';
import { VendorProductAdditionalFile } from '../models/VendorProductAdditionalFileModel';
import { getDataSource } from '../../../loaders/typeormLoader';
import { Service } from 'typedi';

@Service()
export class VendorProductAdditionalFileRepository {
    public repository: Repository<VendorProductAdditionalFile>;
    constructor() {
        this.repository = getDataSource().getRepository(VendorProductAdditionalFile);
    }
}
