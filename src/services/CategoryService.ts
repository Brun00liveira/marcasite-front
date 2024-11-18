import APITOKEN from "@/config/http-common"; 
import { type ApiCategoryResponse, type Category } from "@/interfaces/CategoryInterface";

class CategoryService {
    
    getAllCategory(): Promise<ApiCategoryResponse> {
        return APITOKEN.get('/categories').then(response => response.data);
    }

    create(categoryData: Category): Promise<Category> {
        return APITOKEN.post('/categories', categoryData )
          .then(response => response.data);
    }

    findById(id: number): Promise<ApiCategoryResponse> {
        return APITOKEN.get(`/categories/${id}`).then(response => response.data);
    }

 
}
export default new CategoryService();
