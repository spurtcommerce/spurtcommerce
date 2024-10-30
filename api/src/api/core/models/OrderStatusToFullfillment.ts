import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
// import { OrderStatus } from './OrderStatus';
// import { OrderFullfillmentStatus } from './OrderFullfillmentStatus';

@Entity('order_status_to_fulfillment')
export class OrderStatusToFullfillment {

    @PrimaryGeneratedColumn({ name: 'id' })
    public id: number;

    // @ManyToOne(() => OrderStatus, orderStatus => orderStatus)
    // public orderStatus: OrderStatus;

    // @ManyToOne(() => OrderFullfillmentStatus, orderFulfillmentStatus => orderFulfillmentStatus)
    // public orderFulfillmentStatus: OrderFullfillmentStatus;

    @Column({ name: 'order_status_id' })
    public orderStatusId: number;

    @Column({ name: 'order_fulfillment_status_id' })
    public orderFulfillmentStatusId: number;
}
