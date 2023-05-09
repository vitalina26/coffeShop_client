import { Coffe } from "../models/Coffe";
import { Strategy } from "./strategy";

export class OrderByFilterStrategy implements Strategy {
    public customFilter(res: Coffe[], enteredValue:string): Coffe[] {
        if (enteredValue === 'asc') {
            return res.sort((a, b) => a.price - b.price);
        }
        if  (enteredValue === 'desc') {
            return res.sort((a, b) => b.price - a.price);
        }
        return res;
    }
}

export class SearchFilterStrategy implements Strategy {
    public customFilter(res: Coffe[], enteredValue:string): Coffe[] {
        return res.filter(item => {
            return item.name.toLowerCase().match(enteredValue.toLowerCase())? true : false;
        });
    }
}
export class BeansClassFilterStrategy implements Strategy {
    public customFilter(res: Coffe[], enteredValue:string): Coffe[] {
        return res.filter(item => {
            return item.beansClass === enteredValue;
        });
    }
}

export class CookingMethodFilterStrategy implements Strategy {
    public customFilter(res: Coffe[], enteredValue:string): Coffe[] {
        return res.filter(item => {
            return item.cookingMethod === enteredValue;
        });
    }
}
export class RoastingFilterStrategy implements Strategy {
    public customFilter(res: Coffe[], enteredValue:string): Coffe[] {
        return res.filter(item => {
            return item.degreeOfRoasting === enteredValue;
        });
    }
}

export class ProcessingFilterStrategy implements Strategy {
    public customFilter(res: Coffe[], enteredValue:string): Coffe[] {
        return  res.filter(item => {
            return item.processingType === enteredValue;
        });
    }
}
export class CountryFilterStrategy implements Strategy {
    public customFilter(res: Coffe[], enteredValue:string): Coffe[] {
        return res.filter(item => {
            return item.country === enteredValue;
        });
    }
}