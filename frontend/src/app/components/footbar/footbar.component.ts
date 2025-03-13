import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-footbar',
  imports: [],
  templateUrl: './footbar.component.html',
  styleUrl: './footbar.component.css'
})
export class FootbarComponent {

  @ViewChild('modal', {static:true}) modal!: ElementRef;
  @ViewChild('cover', {static:true}) cover!: ElementRef;
  @ViewChild('search', {static:true}) search!: ElementRef;

  isModalOpen: boolean = false;

  closeModal(){
    const coverElement = this.cover.nativeElement;
    coverElement.style.display = "none";
    const modalElement = this.modal.nativeElement;
    modalElement.style.display = "none";
    const searchElement = this.search.nativeElement;
    searchElement.style.display = "none";
  }

  openModal(){
    const coverElement = this.cover.nativeElement;
    coverElement.style.display = "flex";
    const modalElement = this.modal.nativeElement;
    modalElement.style.display = "flex";
  }

  openSearch(){
    const searchElement = this.search.nativeElement;
    searchElement.style.display = "flex";
    const modalElement = this.modal.nativeElement;
    modalElement.style.display = "none";
  }

}
