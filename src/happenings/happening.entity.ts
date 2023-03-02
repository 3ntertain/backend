import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';
import { Mode } from 'src/modes/mode.entity';
import {
  AfterLoad,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Happening {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Column()
  @Field()
  address: string;

  @Column()
  @Field({ defaultValue: false })
  public: boolean;

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

  @IsOptional()
  @Field((type) => Int)
  startIn: number;

  @IsOptional()
  @Field((type) => Int)
  endIn: number;

  @Column('decimal', { precision: 6, scale: 4 })
  @Field((type) => Float)
  price: number;

  @Column()
  @Field((type) => Int)
  slots: number;

  @Column()
  @Field((type) => Int)
  players: number;

  @IsOptional()
  @Field((type) => Int)
  availableSlots: number;

  @Column()
  @Field()
  creator: string;

  @Column()
  @Field()
  ticket: string;

  @IsOptional()
  @Field()
  status: string;

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

  @ManyToOne((type) => Mode, (mode) => mode.happenings, {
    onDelete: 'CASCADE',
  })
  @Field((type) => Mode)
  mode: Mode;

  @AfterLoad()
  generateStatus(): void {
    this.status = 'upcoming';
    if (new Date(this.start) < new Date()) {
      this.status = 'ongoing';
    }
    if (new Date(this.end) < new Date()) {
      this.status = 'ended';
    }

    this.availableSlots = this.slots - this.players;

    this.endIn = 0;
    this.startIn = 0;

    if (this.status !== 'ended') {
      this.endIn = Math.ceil(
        (new Date(this.end).getTime() - new Date().getTime()) / 1000,
      );
    }

    if (this.status == 'upcoming') {
      this.startIn = Math.ceil(
        (new Date(this.start).getTime() - new Date().getTime()) / 1000,
      );
    }
  }
}
