import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductDialogComponent } from '../product-dialog/product-dialog.component';
import { Products } from 'src/app/Products';
import { ProductsService } from '../../Products.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ProductsService]
})
export class HomeComponent implements OnInit {

  @ViewChild(MatTable)
  table!:MatTable<any>;
  displayedColumns: string[] = ['nome', 'estoque', 'status', 'preco', 'action'];
  dataSource!: Products[];

  searchValue!: string;

  constructor(
    public dialog: MatDialog,
    public productsService: ProductsService
    ) {
      this.productsService.getProducts()
      .subscribe((data:Products[]) => {
        this.dataSource = data;
      })
    }

  ngOnInit(): void {
  }

  openDialog(product: Products | null): void{
      const dialogRef = this.dialog.open(ProductDialogComponent, {
        width: '400px',
        data: product === null ? {
          nome: null,
          imagem: null,
          descricao: null,
          estoque: null,
          status: null,
          preco: null,
        } : {
          id: product.id,
          nome: product.nome,
          imagem: product.imagem,
          descricao: product.descricao,
          estoque: product.estoque,
          status: product.status,
          preco: product.preco.replace(".", ","),
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        if(result !== undefined){
          if(this.dataSource.map(n => n.id).includes(result.id)){
            if(product!.imagem ==result.imagem){
              this.productsService.patchProducts(result.id, result)
              .subscribe((data: Products ) => {
                this.productsService.getProducts()
                  .subscribe((data:Products[]) => {
                     this.dataSource = data;
                  })
                this.table.renderRows();
              })
            }else{
              this.productsService.patchProductsImage(result.imagem, result.id, result)
              .subscribe(( ) => {
                this.productsService.getProducts()
                  .subscribe((data:Products[]) => {
                     this.dataSource = data;
                  })
                this.table.renderRows();
              })

            }
          }else{
            this.productsService.postProductsImage(result.imagem, result)
            .subscribe(( ) => {
              this.productsService.getProducts()
                .subscribe((data:Products[]) => {
                   this.dataSource = data;
                })
              this.table.renderRows();
            });
          }
        }

      });
  }

  deleteProductClick(product: Products): void{
    this.productsService.delProducts(product.id)
    .subscribe(() => {
      this.productsService.getProducts()
        .subscribe((data:Products[]) => {
          this.dataSource = data;
        })
        this.table.renderRows();
    })
  }

  editProductClick(product: Products): void{
    this.openDialog(product);
  }

  onPesquisaClick(): void{
    if(this.searchValue){
      this.productsService.getProdut(this.searchValue)
      .subscribe((data:Products[]) => {
        this.dataSource = data;
      })
      this.table.renderRows();
    }
    this.searchValue='';
  }

}
