/**
 *
 * Copyright (c) 2022, Oracle and/or its affiliates. All rights reserved.
 *
 */
import * as yup from "yup";
import { Validator } from "../../lib/decorators";
import { OchainController } from "../../lib/ochain-controller";
import { Car } from "../model/FabCar.model";
import { Dealer } from "../model/FabCar.model";
import { Owner } from "../model/FabCar.model";
import { Context } from "../../lib/ochain-transaction-context";

export class FabCarController extends OchainController {
  private Ctx: Context;

  constructor(ctx: Context) {
    super(ctx.Stub);
    this.Ctx = ctx;
  }

    @Validator()
    public async init() {
        return;
    }

  //-----------------------------------------------------------------------------
  //Car
  //-----------------------------------------------------------------------------
  @Validator(Car)
  public async createCar(asset: Car) {
      return await this.Ctx.Model.save(asset);
  }
    
  @Validator(yup.string())
  public async getCarById(id: string) {
      const asset = await this.Ctx.Model.get(id, Car);
      return asset;
  }
  
  @Validator(Car)
  public async updateCar(asset: Car) {
      return await this.Ctx.Model.update(asset);
  }
    
  @Validator(yup.string())
  public async deleteCar(id: string) {
      const result = await this.Ctx.Model.delete(id);
      return result;
  }
  
  @Validator(yup.string())
  public async getCarHistoryById(id: string) {
      const result = await this.Ctx.Model.history(id);
      return result;
  }
  
  @Validator(yup.string(), yup.string())
  public async getCarByRange(startId: string, endId: string) {
      const result = await this.Ctx.Model.getByRange(startId, endId, Car);
      return result;
  }


  //-----------------------------------------------------------------------------
  //Dealer
  //-----------------------------------------------------------------------------
  @Validator(Dealer)
  public async createDealer(asset: Dealer) {
      return await this.Ctx.Model.save(asset);
  }
    
  @Validator(yup.string())
  public async getDealerById(id: string) {
      const asset = await this.Ctx.Model.get(id, Dealer);
      return asset;
  }
  
  @Validator(Dealer)
  public async updateDealer(asset: Dealer) {
      return await this.Ctx.Model.update(asset);
  }
    
  @Validator(yup.string())
  public async deleteDealer(id: string) {
      const result = await this.Ctx.Model.delete(id);
      return result;
  }
  
  @Validator(yup.string())
  public async getDealerHistoryById(id: string) {
      const result = await this.Ctx.Model.history(id);
      return result;
  }
  
  @Validator(yup.string(), yup.string())
  public async getDealerByRange(startId: string, endId: string) {
      const result = await this.Ctx.Model.getByRange(startId, endId, Dealer);
      return result;
  }


  //-----------------------------------------------------------------------------
  //Owner
  //-----------------------------------------------------------------------------
  @Validator(Owner)
  public async createOwner(asset: Owner) {
      return await this.Ctx.Model.save(asset);
  }
    
  @Validator(yup.string())
  public async getOwnerById(id: string) {
      const asset = await this.Ctx.Model.get(id, Owner);
      return asset;
  }
  
  @Validator(Owner)
  public async updateOwner(asset: Owner) {
      return await this.Ctx.Model.update(asset);
  }
    
  @Validator(yup.string())
  public async deleteOwner(id: string) {
      const result = await this.Ctx.Model.delete(id);
      return result;
  }
  
  @Validator(yup.string())
  public async getOwnerHistoryById(id: string) {
      const result = await this.Ctx.Model.history(id);
      return result;
  }
  
  @Validator(yup.string(), yup.string())
  public async getOwnerByRange(startId: string, endId: string) {
      const result = await this.Ctx.Model.getByRange(startId, endId, Owner);
      return result;
  }

  //-----------------------------------------------------------------------------
    
  /**
   *
   * BDB sql rich queries can be executed in OBP CS/EE.
   * This method can be invoked only when connected to remote OBP CS/EE network.
   *
   */
  @Validator(yup.string())
  public async executeQuery(query: string) {
    const result = await this.query(query);
    return result;
  }
  
  @Validator(yup.string(), yup.string(), yup.string(), yup.number(), yup.date())
    public async buyCar(vin: string, buyerId: string, sellerId: string, price: number, date: Date) {
        if (buyerId === sellerId) {
            throw new Error(`Buyer and seller cannot be same`);
        }
    
        try {
            const car = await this.Ctx.Model.get(vin, Car);
            const owner: Owner = await this.Ctx.Model.get(buyerId, Owner);
            
            let seller: Dealer | Owner;
    
            if (!car.ownerId || (car.ownerId && car.ownerId !== sellerId)) {
                throw new Error(`Car with vin '${vin}' does not belong to the seller '${sellerId}'`);
            }
            if (car.ownerId && car.ownerId === buyerId) {
                throw new Error(`Car with vin '${vin}' already exist with owner '${buyerId}'`);
            }
    
            car.ownerId = buyerId;
            car.price = price;
            car.lastSold = date;
    
            if (!owner.cars) {
                owner.cars = [];
            }
            owner.cars.push(vin);
            const asset: Owner | Dealer = await this.Ctx.Model.get(sellerId);
            if (asset.assetType && asset.assetType === 'dealer') {
                seller = new Dealer(asset);
                const index = seller.inventory.indexOf(vin);
                if (index > -1) {
                    seller.inventory.splice(index, 1);
                }
    
                await this.Ctx.Model.update(seller);
            } else if (
                asset.assetType && asset.assetType === 'owner') {
                seller = new Owner(asset);
                const index = seller.cars.indexOf(vin);
                if (index > -1) {
                    seller.cars.splice(index, 1);
                }
    
                await this.Ctx.Model.update(seller);
            } else {
                throw new Error(`Seller type did not match with either dealer or owner.`);
            }
    
            await this.Ctx.Model.update(owner);
            await this.Ctx.Model.update(car);
            let msg = `Car with vin '${vin}' has been bought by buyer with id '${buyerId}' from seller with id '${sellerId}'`;
            return {msg}
        } catch(error) {
            throw new Error(error.message);
        }
    }

    @Validator(yup.string(), yup.string(), yup.number(), yup.date())
    public async addCar(vin: string, dealerId: string, price: number, date: Date) {
        try {
            const car = await this.Ctx.Model.get(vin, Car);
            const dealer = await this.Ctx.Model.get(dealerId, Dealer)
    
            if (car.ownerId) {
                throw new Error(`Car with '${vin}' cannot be added to the dealer system as the car already has an ownerId`);
            }
            if (car.ownerId === dealerId) {
                throw new Error(`Car with '${vin}' is already with the dealer '${dealerId}'`);
            }
    
            car.ownerId = dealerId;
            car.price = price;
            car.lastSold = date;
    
            if (!dealer.inventory) {
                dealer.inventory = [];
            }
    
            dealer.inventory.push(vin);
    
            await this.Ctx.Model.update(car);
            await this.Ctx.Model.update(dealer);
            let msg = `Car with vin '${vin}' has been added to dealer with id '${dealerId}'`;
            return {msg}
        } catch(error) {
            throw new Error(error.message);
        }
    }
}

