import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
//import { Products } from '../home/home.component';
import { Products } from 'src/app/Products';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.css']
})
export class ProductDialogComponent implements OnInit {

  @ViewChild('UploadFileInput')
  uploadFileInput!: ElementRef;
  myfilename!: string;
  product!: Products;
  isChange!: boolean;
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: Products,
    public dialogRef: MatDialogRef<ProductDialogComponent>,
    ){}

  ngOnInit(): void {
    if(this.data.id != null){
      this.isChange = true;
    }else{
      this.isChange = false;
    }
  }

  fileChangeEvent(fileInput: any) {
    if (fileInput.target.files && fileInput.target.files[0]) {

      const file = fileInput.target.files[0];

      this.data.imagem = file;

      this.myfilename = file.name;

    }

  }

  onCancelClick(): void{
    this.dialogRef.close();
  }

  onCadastroClick(): void{
    this.dialogRef.close(this.data);
  }

}
