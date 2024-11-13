export class UpdateStockModel {
  public productId: number;
  public hasStock: string;
  public productStock: any;



  constructor(updateModel: any) {
    this.productId = updateModel.productId || '';
    this.hasStock = updateModel.hasStock || 0;
    this.productStock = updateModel.productStock || [];
  }
}
