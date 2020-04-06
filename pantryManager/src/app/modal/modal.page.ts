import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

  recipeInfo


  constructor(public modalController: ModalController,
  navParams: NavParams) {
console.log(navParams.get('recipeInfo'));
this.recipeInfo = navParams.get('recipeInfo');
  }

  ngOnInit() {
  }


closeModal() { this.modalController.dismiss(); }
}
