import { BaseEntity } from 'typeorm/repository/BaseEntity';
import { Column } from 'typeorm/decorator/columns/Column';
import { CreateDateColumn } from 'typeorm/decorator/columns/CreateDateColumn';
import { Entity } from 'typeorm/decorator/entity/Entity';
import { OneToMany } from 'typeorm/decorator/relations/OneToMany';
import { PrimaryGeneratedColumn } from 'typeorm/decorator/columns/PrimaryGeneratedColumn';
import { UpdateDateColumn } from 'typeorm/decorator/columns/UpdateDateColumn';
import { status } from '../../shared/entity_status.enum';
import { Product_i18n } from '../product_i18n/product_i18n.entity';

@Entity('product_name')
export class ProductName extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  product_name_id: number;

  @Column({ type: 'varchar', length: 255 })
  product_name: string;

  @Column({ type: 'varchar', default: status.ACTIVE, length: 8 })
  status: string;

  @Column({ type: 'numeric' })
  product_id: number;

  @OneToMany(() => Product_i18n, (product_i18n) => product_i18n.customer)
  product_i18n: Product_i18n[];
}
