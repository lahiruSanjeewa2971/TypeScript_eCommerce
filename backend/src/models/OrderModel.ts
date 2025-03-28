import {
  modelOptions,
  prop,
  getModelForClass,
  Ref,
} from "@typegoose/typegoose";
import mongoose from "mongoose";
import { Product } from "./ProductModel";
import { User } from "./UserModels";

class ShippingAddress {
  //   public _id?: mongoose.Types.ObjectId;
  //   public _id!: string;
  @prop()
  public fullName?: string;
  @prop()
  public address?: string;
  @prop()
  public city?: string;
  @prop()
  public postalCode?: string;
  @prop()
  public lat?: number;
  @prop()
  public lng?: number;
}

class Item {
  @prop({ required: true })
  public name!: string;
  @prop({ required: true })
  public quantity!: number;
  @prop({ required: true })
  public image!: string;
  @prop({ required: true })
  public price!: number;
  @prop({ ref: Product })
  public product?: Ref<Product>;
}

class PaymentResult {
  @prop()
  public paymentId!: string;
  @prop()
  public status!: string;
  @prop()
  public update_time!: string;
  @prop()
  public email_address!: string;
}

@modelOptions({ schemaOptions: { timestamps: true } })
export class Order {
  public _id?: mongoose.Types.ObjectId;
  @prop()
  public orderItems!: Item[];
  @prop()
  public shippingAddress?: ShippingAddress;

  @prop({ ref: User })
  public user?: Ref<User>;

  @prop({ required: true })
  public paymentMethod!: string;
  @prop()
  public paymentResult?: PaymentResult;

  @prop({ required: true, default: 0 })
  public itemsPrice!: number;
  @prop({ required: true, default: 0 })
  public shippingPrice!: number;
  @prop({ required: true, default: 0 })
  public taxPrice!: number;
  @prop({ required: true, default: 0 })
  public totalPrice!: number;

  @prop({ required: true, default: false })
  public isPaid!: boolean;
  @prop()
  public paidAt!: string;
  @prop({ required: true, default: false })
  public isDelivered!: boolean;
  @prop()
  public deliveredAt!: Date;
}

export const OrdertModel = getModelForClass(Order);
