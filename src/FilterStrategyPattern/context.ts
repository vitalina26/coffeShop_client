import { Coffe } from "../models/Coffe";
import { Strategy } from "./strategy";

export class Context {

    constructor(private strategy: Strategy) {
        this.strategy = strategy;
    }

    public setStrategy(strategy: Strategy) {
        this.strategy = strategy;
    }

    public applyStrategy(res: Coffe[], enteredValue:string): Coffe[] {
        return this.strategy.customFilter(res, enteredValue);
    }
}
