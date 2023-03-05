import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Mode } from '../modes/mode.entity';
import {
  AfterInsert,
  AfterLoad,
  AfterUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsOptional } from 'class-validator';
import { awsUrl } from '../common/aws-path';

@Entity()
@ObjectType()
export class Game {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  symbol: string;

  @IsOptional()
  @Field()
  logo: string;

  @IsOptional()
  @Field()
  banner: string;

  @IsOptional()
  @Field()
  background: string;

  @Column()
  @Field()
  type: string;

  @Column()
  @Field()
  url: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  description?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  twitter?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  discord?: string;

  @OneToMany((type) => Mode, (mode) => mode.game)
  @Field((type) => [Mode])
  modes: Mode[];

  @AfterLoad()
  generateAwsUrls(): void {
    this.logo = awsUrl(`game-${this.id}-logo`);
    this.banner = awsUrl(`game-${this.id}-banner`);
    this.background = awsUrl(`game-${this.id}-background`);
  }
}
