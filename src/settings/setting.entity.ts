import { ObjectType, Field, Int, registerEnumType } from '@nestjs/graphql';
import { Mode } from '../modes/mode.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { SettingsType } from '../common/enums';

@Entity()
@ObjectType()
export class Setting {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  label: string;

  @Column()
  @Field({ nullable: true })
  description?: string;

  @Column({
    type: 'enum',
    enum: SettingsType,
  })
  @Field((type) => SettingsType)
  type: SettingsType;

  @Column()
  @Field({ nullable: true })
  options?: string;

  @Column()
  @Field((type) => Int)
  modeId: number;

  @ManyToOne((type) => Mode, (mode) => mode.settings, {
    onDelete: 'CASCADE',
  })
  @Field((type) => Mode)
  mode: Mode;
}
