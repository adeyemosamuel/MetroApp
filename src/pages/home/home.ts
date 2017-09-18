import { Component, ViewChild } from '@angular/core';
import { NavController, Slides } from 'ionic-angular';

import * as WC from 'woocommerce-api';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  WooCommerce: any;
  products: any[];
  moreProducts: any[]
  page: number;


  @ViewChild('productSlides') productSlides: Slides;

  constructor(public navCtrl: NavController) {
    this.page = 2;

    this.WooCommerce = WC({
      url: "http://samarth.cloudapp.net",
      consumerKey: "ck_98def17ffa4f32048cb5906d1de4fb35a2cc646a",
      consumerSecret: "cs_858089ad34205ced8dd85f91e28ad88677c85644"

    });

    this.loadMoreProducts();

    this.WooCommerce.getAsync("products").then( (data) => {
      console.log(JSON.parse(data.body));
      this.moreProducts = JSON.parse(data.body).products;
    }, (err) => {
      console.log(err)
      })
  }

ionViewDidLoad(){
  setInterval(()=> {

    if(this.productSlides.getActiveIndex() == this.productSlides.length() -1)
this.productSlides.slideNext();
    this.productSlides.slideTo(0);

  }, 3000)

}

loadMoreProducts(){
  this.WooCommerce.getAsync("products?page=" + this.page).then( (data) => {
      console.log(JSON.parse(data.body));
      this.products = JSON.parse(data.body).products;
    }, (err) => {
      console.log(err)
      })
}

}
