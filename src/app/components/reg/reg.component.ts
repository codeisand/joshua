import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-reg',
  standalone:true,
  imports: [CommonModule,FormsModule,IonicModule,],
  templateUrl: './reg.component.html',
  styleUrls: ['./reg.component.scss'],
})
export class RegComponent implements OnInit {

  atribute0:string = '';
  atribute1:string = '';
  atribute2:string = '';
  atribute3:string = '';
  atribute4:any = {};
  atribute5:string = '';
  atribute6:string = '';
  atribute7:string = '';

  storeData:any [] = [];
  constructor(private modal:ModalController, private storage:LocalStorageService) { }

  ngOnInit() {}

  pop =(data:any,state:string)=>{
    this.modal.dismiss(data,state);
  }

  date0 = (ev:any)=>{
    this.atribute4.date0 = ev.detail.value;
  }

  date1 = (ev:any)=>{
    this.atribute4.date1 = ev.detail.value;
  }

  att0 = (ev:any)=>{
    this.atribute0 = ev.detail.value;
  }

  save =async()=>{
    if(this.atribute0 && this.atribute1 &&this.atribute2 &&this.atribute3 &&this.atribute5 &&this.atribute6 &&this.atribute7 && this.atribute4.date0 && this.atribute4.date1){
      let data = {
        atribute0 :this.atribute0,
        atribute1 :this.atribute1,
        atribute2 :this.atribute2,
        atribute3 :this.atribute3,
        atribute4 :{
          date0:this.atribute4.date0,
          date1:this.atribute4.date1
        },
        atribute5 :this.atribute5,
        atribute6 :this.atribute6,
        atribute7 :this.atribute7,
      }
      let oldData = await this.storage.get('resistrationData');
      if(oldData){
        this.storeData = oldData;
      }
      this.storeData.push(data)
    await this.storage.set('resistrationData', this.storeData);
    this.pop(true, 'confirm');
    }
    
  }

}
