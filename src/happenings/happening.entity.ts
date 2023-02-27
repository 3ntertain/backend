import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { Mode } from 'src/modes/mode.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Happening {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Column()
  @Field()
  name: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  description?: string;

  @Column()
  @Field((type) => Date)
  start: Date;

  @Column()
  @Field((type) => Date)
  end: Date;

  @Column('decimal', { precision: 6, scale: 4 })
  @Field((type) => Float)
  price: number;

  @Column()
  @Field((type) => Int)
  slots: number;

  @Column()
  @Field((type) => Int)
  creatorFee: number;

  @Column({ nullable: true })
  @Field({ nullable: true })
  configuration: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  token?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  rewards?: string;

  @Column()
  @Field((type) => Int)
  modeId: number;

  @ManyToOne((type) => Mode, (mode) => mode.pricings, {
    onDelete: 'CASCADE',
  })
  @Field((type) => Mode)
  mode: Mode;
}
