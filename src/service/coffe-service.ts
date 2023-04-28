import api from '../api';
import { CoffeDto } from '../dto/CoffeDto';
import { CoffeUpdateDto } from '../dto/CoffeUpdateDto';
import { Coffe } from '../models/Coffe';
const getCoffe = async (id: string) => {
    const response = await api.get(
      `coffe/${id})`
    );
    const coffe: Coffe = response.data;
    return coffe;
}
const updateCoffe = async (coffe_updated: CoffeUpdateDto , id: string) => {
      const response = await api.put(
        `coffe/${id}`, coffe_updated
      );
      const coffe: Coffe = response.data;
      return coffe;
}
  
const getAllCoffes = async () => {
      const response = await api.get(
       `coffe/`,
      );
      const coffes: Coffe[] = response.data;
      return coffes;
}
const deleteCoffe = async (id: string) => {
    await api.put(`coffe/${id}`);
}    
const createCoffe = async (coffeDto: CoffeDto) => {
      const response = await api.post(
        `coffe/`, coffeDto
      );
       const { creator_id, coffe} = response.data;
      return coffe;
}

  
const coffeService = {
      getAllCoffes,
      getCoffe,
      updateCoffe,
      deleteCoffe,
      createCoffe
  };
  
  export default coffeService;