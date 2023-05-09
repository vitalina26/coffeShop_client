import { Coffe } from "../models/Coffe";

export interface Strategy {
    customFilter(res: Coffe[], enteredValue:string): Coffe[];
}