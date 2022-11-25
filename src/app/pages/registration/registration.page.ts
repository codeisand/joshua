import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RegComponent } from 'src/app/components/reg/reg.component';
import { LocalStorageService } from 'src/app/services/local-storage.service';

import * as XLXS from 'xlsx';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {
  localData:any [] = [];
  deleteItem:any [] = [];

  constructor(private modal:ModalController, private storage:LocalStorageService) { }

  async ngOnInit() {
    this.getdata();
  }

  getdata = async()=>{
    let storeData = await this.storage.get('resistrationData');
    if(storeData){
      this.localData = storeData
    }
  }


  registerNow = async()=>{
    let modal = await this.modal.create({
      component:RegComponent,
      backdropDismiss:false,
      cssClass:'css-modal',
      showBackdrop:true,
    })
   await modal.present();
   const { data, role } = await modal.onWillDismiss();
    console.log(data,role)
    if (role === 'confirm') {
      this.getdata()
    }
  } 

  selectAll =()=>{

  }

  // select =(i:number)=>{
  //   if(i)
  //   this.deleteItem.push()
  // }

  setClick =(ev:any,i:number) =>{
    console.log(ev.detail.checked,i)
    if(ev.detail.checked) this.deleteItem.push(i)
    else{
     let index = this.deleteItem.findIndex(x => x==i);
     console.log(index);
     this.deleteItem.splice(index,1)
    } 
    console.log(this.deleteItem)
  }

  delete = async()=>{
    for(let ele of this.deleteItem){
      this.localData.splice(ele,1);
    }  
    await this.storage.set('resistrationData',  this.localData);
    this.getdata();
  }

  export =()=>{
    let ele = document.getElementById('table');
    console.log(ele)
    const ws: XLXS.WorkSheet = XLXS.utils.table_to_sheet(ele);
    const wb:XLXS.WorkBook = XLXS.utils.book_new();
    XLXS.utils.book_append_sheet(wb,ws, 'sheet1');
    
    XLXS.writeFile(wb, 'registation List.xlsx')  
  }

}
