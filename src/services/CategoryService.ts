import APITOKEN from "@/config/http-common"; 
import { type ApiCategoryResponse, type Category, type CategoryIdResponse } from "@/interfaces/CategoryInterface";

class CategoryService {
    
    getAllCategory(): Promise<ApiCategoryResponse> {
        return APITOKEN.get('/categories').then(response => response.data);
    }

    create(categoryData: Category): Promise<Category> {
        return APITOKEN.post('/categories', categoryData )
          .then(response => response.data);
    }

    findById(id: number): Promise<CategoryIdResponse> {
        return APITOKEN.get(`/categories/${id}`).then(response => response.data);
    }

    update(id: number, updateData: Partial<Category>): Promise<Category> {
        return APITOKEN.put(`/categories/${id}`, updateData).then(response => response.data);
    }

    delete(id: number): Promise<Category> {
       return APITOKEN.delete(`/categories/${id}`).then(response => response.data);
    }

}
export default new CategoryService();
