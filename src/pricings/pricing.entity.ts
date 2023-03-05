import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { Mode } from 'src/modes/mode.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PricingType } from '../common/enums';

@Entity()
@ObjectType()
export class Pricing {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Column()
  @Field()
  name: string;

  @Column('decimal', { precision: 6, scale: 4 })
  @Field((type) => Float)
  price: number;

  @Column({
    type: 'enum',
    enum: PricingType,
  })
  @Field((type) => PricingType)
  type: PricingType;

  @Column()
  @Field({ nullable: true })
  condition?: string;

  @Column()
  @Field((type) => Int)
  modeId: number;

  @ManyToOne((type) => Mode, (mode) => mode.pricings, {
    onDelete: 'CASCADE',
  })
  @Field((type) => Mode)
  mode: Mode;
}
