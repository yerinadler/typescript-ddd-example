import { Column, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { OrderOrmEntity } from "./order.entity";

@Entity({ name: 'order_items' })
export class OrderItemOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: Guid;

  @Column()
  sku: string;

  @Column()
  quantity: number;

  @Column()
  unitPrice: number;

  @ManyToOne(type => OrderOrmEntity, order => order.orderItems, { onDelete: 'CASCADE' })
  order: OrderOrmEntity;

  @DeleteDateColumn()
  deletedAt?: Date;
}