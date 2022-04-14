import { Component, OnInit } from '@angular/core';

import { DetailsDialogComponent } from './../details-dialog/details-dialog.component';
import { Products } from 'src/app/Products';
import { ProductsService } from '../../Products.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-shopp',
  templateUrl: './shopp.component.html',
  styleUrls: ['./shopp.component.css'],
  providers: [ProductsService]
})
export class ShoppComponent implements OnInit {

  dataSource!: Products[];


  constructor(
    public dialog: MatDialog,
    public productsService: ProductsService
    ) {
      this.productsService.getProductsShopp()
      .subscribe((data:Products[]) => {
        this.dataSource = data;
      })
   }

  ngOnInit(): void {
  }

  detailsProductClick(product: Products): void{
    const dialogRef = this.dialog.open(DetailsDialogComponent, {
      width: '475px',
      data: {
        id: product.id,
        nome: product.nome,
        imagem: product.imagem,
        descricao: product.descricao,
        estoque: product.estoque,
        status: product.status,
        preco: product.preco.replace(".", ","),
      }
    });
  }

}
