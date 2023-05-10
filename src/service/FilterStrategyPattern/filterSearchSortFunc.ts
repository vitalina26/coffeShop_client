import { FiltersInterface } from "../../components/CS-filter/CS-filter";
import { Coffe } from "../../models/Coffe";
import { BeansClassFilterStrategy, CookingMethodFilterStrategy, CountryFilterStrategy, OrderByFilterStrategy, ProcessingFilterStrategy, RoastingFilterStrategy, SearchFilterStrategy } from "./ConcreteStrategies";
import { Context } from "./context";
interface FilterValues {
    filtersValue: FiltersInterface,
    searchValue: string,
    orderValue:string
}
export const filterSearchSortMyCoffeItems = (coffeItems:Coffe[], filterValues :FilterValues) => {
    let res = [...coffeItems];
    const context = new Context(new SearchFilterStrategy());
    if (filterValues.filtersValue.beansClass !== '') {
       context.setStrategy(new BeansClassFilterStrategy()) 
       res = context.applyStrategy(res, filterValues.filtersValue.beansClass)
    }
    if (filterValues.filtersValue.cookingMethod !== '') {
        context.setStrategy(new CookingMethodFilterStrategy()) 
        res = context.applyStrategy(res, filterValues.filtersValue.cookingMethod)
    }
    if (filterValues.filtersValue.country !== '') {
        context.setStrategy(new CountryFilterStrategy()) 
        res = context.applyStrategy(res, filterValues.filtersValue.country)
    }
    if (filterValues.filtersValue.degreeOfRoasting !== '') {
        context.setStrategy(new RoastingFilterStrategy()) 
        res = context.applyStrategy(res, filterValues.filtersValue.degreeOfRoasting)
    }
    if (filterValues.filtersValue.processingType !== '') {
        context.setStrategy(new ProcessingFilterStrategy()) 
        res = context.applyStrategy(res, filterValues.filtersValue.processingType)
    }

    if (filterValues.orderValue !== '') {
        context.setStrategy(new OrderByFilterStrategy()) 
        res = context.applyStrategy(res, filterValues.orderValue)
    }
    if (filterValues.searchValue !== '') {
        context.setStrategy(new SearchFilterStrategy()) 
        res = context.applyStrategy(res, filterValues.searchValue)
    }

    return res;
}