
import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Products } from 'src/app/Products';

@Component({
  selector: 'app-details-dialog',
  templateUrl: './details-dialog.component.html',
  styleUrls: ['./details-dialog.component.css']
})
export class DetailsDialogComponent implements OnInit {

  product!: Products;
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: Products,
    public dialogRef: MatDialogRef<DetailsDialogComponent>,
    ){}

  ngOnInit(): void {
  }

  onCloseClick(): void{
    this.dialogRef.close();
  }

}
