/**
 *
 * Copyright (c) 2022, Oracle and/or its affiliates. All rights reserved.
 *
 */

import * as yup from "yup";
import { Id, Mandatory, Validate, Default, Embedded, Derived, ReadOnly } from "../../lib/decorators";
import { OchainModel } from "../../lib/ochain-model";
import { STRATEGY } from "../../lib/utils";
import { EmbeddedModel } from "../../lib/ochain-embedded-model";

export class ArtCollectionMetadata extends EmbeddedModel<ArtCollectionMetadata> {
  @Validate(yup.string())
  public painting_name: string;

  @Validate(yup.string())
  public description: string;

  @Validate(yup.string())
  public image: string;

  @Validate(yup.string())
  public painter_name: string;

}
    
@Id("tokenId")
export class ArtCollection extends OchainModel<ArtCollection> {
  public readonly assetType = "otoken";

  @Mandatory()
  @Validate(
    yup
      .string()
      .required()
      .matches(/^[A-Za-z0-9][A-Za-z0-9_-]*$/)
      .max(16)
  )
  public tokenId: string;

  @ReadOnly("artcollection")
  public tokenName: string;

  @Validate(yup.string().trim().max(256))
  public tokenDesc: string;


  @ReadOnly("erc1155+")
  public tokenStandard: string;

  @ReadOnly("nonfungible")
  public tokenType: string;

  @ReadOnly("whole")
  public tokenUnit: string;

  @ReadOnly(["indivisible","singleton","mintable","transferable","burnable","roles"])
  public behaviors: string[];

  @ReadOnly({ minter_role_name: "minter" })
  public roles: object;

  @ReadOnly({ max_mint_quantity: 20000 })
  public mintable: object;

  @Validate(yup.string())
  public owner: string;

  @Validate(yup.string())
  public createdBy: string;

  @Validate(yup.string())
  public transferredBy: string;

  @Validate(yup.string())
  public creationDate: string;

  @Validate(yup.string())
  public transferredDate: string;

  @Validate(yup.bool())
  public isBurned: boolean;

  @Validate(yup.string())
  public burnedBy: string;

  @Validate(yup.string())
  public burnedDate: string;

  @Mandatory()
  @Validate(yup.string().required().max(2000)) 
  public tokenUri: string;

  @Embedded(ArtCollectionMetadata)
  public metadata: ArtCollectionMetadata;

  @Validate(yup.number())
  public price: number;
  
  @Validate(yup.boolean())
  public on_sale_flag: boolean;
  
}

@Id("tokenId")
export class Loyalty extends OchainModel<Loyalty> {
  public readonly assetType = "otoken";

  @Mandatory()
  @Validate(
    yup
      .string()
      .required()
      .matches(/^[A-Za-z0-9][A-Za-z0-9_-]*$/)
      .max(16)
  )
  public tokenId: string;

  @ReadOnly("loyalty")
  public tokenName: string;

  @Validate(yup.string().trim().max(256))
  public tokenDesc: string;

  @ReadOnly("erc1155+")
  public tokenStandard: string;

  @ReadOnly("fungible")
  public tokenType: string;

  @ReadOnly("fractional")
  public tokenUnit: string;

  @ReadOnly(["divisible","mintable","transferable","burnable","roles"])
  public behaviors: string[];

  @ReadOnly({ minter_role_name: "minter" })
  public roles: object;

  @ReadOnly({ max_mint_quantity: 10000 })
  public mintable: object;

  @ReadOnly({ decimal: 2 })
  public divisible: object;

  @Validate(yup.string())
  public currency_name: string;
  
  @Validate(yup.number())
  public token_to_currency_ratio: number;
  
}

