import { Products } from './Products';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class ProductsService{
  ApiUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  getProducts(): Observable<Products[]> {
    return this.http.get<Products[]>(`${this.ApiUrl}/adm/produtos`);
  }

  getProductsShopp(): Observable<Products[]> {
    return this.http.get<Products[]>(`${this.ApiUrl}/produtos`);
  }

  getProdut(search: string): Observable<any> {
    return this.http.get<Products[]>(`${this.ApiUrl}/adm/produtos/${search}`);
  }

  postProductsImage(foto: any, product: Products){
    let formData: any = new FormData();
    formData.append('foto', foto);
    formData.append('nome', product.nome );
    formData.append('descricao', product.descricao );
    formData.append('estoque', product.estoque );
    formData.append('status', product.status );
    formData.append('preco', product.preco );
    return this.http.post(`${this.ApiUrl}/adm/produtos`, formData);
  }

  patchProductsImage(foto: any, id: number, product: Products){
    let formData: any = new FormData();
    formData.append('foto', foto);
    formData.append('nome', product.nome );
    formData.append('descricao', product.descricao );
    formData.append('estoque', product.estoque );
    formData.append('status', product.status );
    formData.append('preco', product.preco );
    return this.http.patch(`${this.ApiUrl}/adm/produtos/imagem/${id}`, formData);
  }

  patchProducts(id: number, product: Products): Observable<Products>{
    return this.http.patch<Products>(`${this.ApiUrl}/adm/produtos/${id}`, product);
  }

  delProducts(id: number): Observable<any>{
    return this.http.delete<Products>(`${this.ApiUrl}/adm/produtos/${id}`);
  }

}
