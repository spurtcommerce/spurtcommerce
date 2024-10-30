import { EntityRepository, Repository } from 'typeorm';
import { VendorProductAdditionalFile } from '../models/VendorProductAdditionalFileModel';

@EntityRepository(VendorProductAdditionalFile)
export class VendorProductAdditionalFileRepository extends Repository<VendorProductAdditionalFile>  {

}
