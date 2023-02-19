export class Nft {
  id: string;
  uri: string;
  name: string;
  symbol: string;
  description: string;
  image: string;
  external_url: string;
  properties: {
    name: string;
    value: string;
  }[];

  constructor(nft: any) {
    this.id = nft.metadata.id;
    this.uri = nft.metadata.uri;
    this.name = nft.metadata.name;
    this.symbol = nft.metadata.symbol;
    this.description = nft.metadata.description;
    this.image = nft.metadata.image;
    this.external_url = nft.metadata.external_url;

    this.properties = nft.metadata.properties;
  }

  getMetadata(k: string) {
    return this.properties.find((p) => p.name.clean() === k.clean());
  }

  getMetadataValue(k: string) {
    return this.getMetadata(k)?.value;
  }
}
