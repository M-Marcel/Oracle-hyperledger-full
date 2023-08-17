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

@Id("vin")
export class Car extends OchainModel<Car> {
    
  public readonly assetType = "car";

  @Mandatory()
  @Validate(yup.string().min(17).max(17))
  public vin: string;
  
  @Validate(yup.string().matches(/^\s*(cheverolet|ford|general\smotors|toyota|hyundai|tesla|tata|fiat|volkswagen|peugeot)\s*$/i))
  public make: string;
  
  @Validate(yup.string())
  public model: string;
  
  @Mandatory()
  @Validate(yup.number().min(1910).max(2020))
  public year: number;
  
  @Mandatory()
  @Validate(yup.string())
  public color: string;
  
  @Validate(yup.string())
  public ownerId: string;
  
  @Validate(yup.number().positive())
  public price: number;
  
  @Validate(yup.date())
  public lastSold: Date;
  
}

@Id("dealerId")
export class Dealer extends OchainModel<Dealer> {
    
  public readonly assetType = "dealer";

  @Mandatory()
  @Validate(yup.string())
  public dealerId: string;
  
  @Mandatory()
  @Validate(yup.string())
  public name: string;
  
  @Validate(yup.string().url())
  public website: string;
  
  @Mandatory()
  @Validate(yup.string().matches(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/))
  public phone: string;
  
  @Validate(yup.string().email())
  public email: string;
  
  @Validate(yup.array().of(yup.string()))
  public inventory: string[];
  
}

@Id("ownerId")
export class Owner extends OchainModel<Owner> {
    
  public readonly assetType = "owner";

  @Mandatory()
  @Validate(yup.string())
  public ownerId: string;
  
  @Mandatory()
  @Validate(yup.string())
  public name: string;
  
  @Mandatory()
  @Validate(yup.string().matches(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/))
  public phone: string;
  
  @Validate(yup.string().email())
  public email: string;
  
  @Validate(yup.array().of(yup.string()))
  public cars: string[];
  
}

