import { registerEnumType } from '@nestjs/graphql';

export enum SettingsType {
  SELECT,
  CHECKBOX,
}

export enum PricingType {
  FLAT,
  PERPLAYER,
}

registerEnumType(SettingsType, {
  name: 'SettingsType',
});

registerEnumType(PricingType, {
  name: 'PricingType',
});
