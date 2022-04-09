import { Column, DeleteDateColumn, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { OrderItemOrmEntity } from './order-item.entity';

@Entity({ name: 'orders' })
export class OrderOrmEntity {
  @PrimaryColumn('uuid')
      id: Guid;

  @Column()
      customerId: Guid;

  @OneToMany((type) => OrderItemOrmEntity, (orderItem) => orderItem.order, {
      { eager: true, cascade: true, onDelete: 'CASCADE' }
  })
      orderItems: OrderItemOrmEntity[];

  @DeleteDateColumn()
      deletedAt?: Date;
}
