import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { EmitType, detach, enableRipple } from '@syncfusion/ej2-base';
import { isNullOrUndefined } from 'util';
import { ListViewComponent } from '@syncfusion/ej2-angular-lists';
import { DataManager, Query, ODataV4Adaptor } from '@syncfusion/ej2-data';


@Component({
  selector: 'app-secciones',
  templateUrl: './secciones.component.html',
  styleUrls: ['./secciones.component.scss']
})
export class SeccionesComponent implements OnInit {
  @ViewChild('ejDialog') ejDialog: DialogComponent;
   // The Dialog shows within the target element.
  @ViewChild('container', { read: ElementRef }) container: ElementRef;
  // The Dialog shows within the target element.
  public targetElement: HTMLElement;

  // To get all element of the dialog component after component get initialized.
  public listData: Array<any> = [
    { text: 'Hennessey Venom', id: 'list-01' },
    { text: 'Bugatti Chiron', id: 'list-02' },
    { text: 'Bugatti Veyron Super Sport', id: 'list-03' },
    { text: 'SSC Ultimate Aero', id: 'list-04' },
    { text: 'Koenigsegg CCR', id: 'list-05' },
    { text: 'McLaren F1', id: 'list-06' }
  ];

  public fields: Object = { text: 'text', id: 'id' };
  @ViewChild('list') listObj: ListViewComponent;
  @ViewChild('textbox')textboxEle: any;

  ngOnInit() {
    this.initilaizeTarget();
  }

  onkeyup(event) {
    let value = this.textboxEle.nativeElement.value;
    let data: any = new DataManager(this.listData).executeLocal(new Query().where('text', 'startswith', value, true));
    if (!value) {
      this.listObj.dataSource = this.listData.slice();
    } else {
      this.listObj.dataSource = data;
    }
    this.listObj.dataBind();
  }

  selectItem(e) {
    console.log(e);
    alert(e.data.id + '-' + e.data.text);
  }

  // #region DIALOG
  public focusIn(target: HTMLElement): void {
    let parent: HTMLElement = target.parentElement;
    if (parent.classList.contains('e-input-in-wrap')) {
        parent.parentElement.classList.add('e-input-focus');
    } else {
        parent.classList.add('e-input-focus');
    }
  }

  public focusOut(target: HTMLElement): void {
      let parent: HTMLElement = target.parentElement;
      if (parent.classList.contains('e-input-in-wrap')) {
          parent.parentElement.classList.remove('e-input-focus');
      } else {
          parent.classList.remove('e-input-focus');
      }
  }
    // Hide the Dialog when click the footer button.
    public hideDialog: EmitType<object> = () => {
        this.ejDialog.hide();
    }
    // Enables the footer buttons
    public buttons: Object = [
      {
        'click': this.hideDialog.bind(this),
          buttonModel:{
          content:'Seleccionar',
          isPrimary: true
        }
      }
    ];

    // Initialize the Dialog component target element.
    public initilaizeTarget: EmitType<object> = () => {
      this.targetElement = this.container.nativeElement.parentElement;
    }

    public validation (event: any): void {
        let text = (<HTMLInputElement>document.getElementById('textvalue'));
        let text1 = (<HTMLInputElement>document.getElementById('textvalue2'));
        if (text.value === '' && text1.value === '') {
            event.cancel = true;
            alert('Enter the username and password');
        } else if (text.value === '') {
            event.cancel = true;
            alert('Enter the username');
        } else if (text1.value === '') {
            event.cancel = true;
            alert('Enter the password');
        } else if (text.value.length < 4) {
            event.cancel = true;
            alert('Username must be minimum 4 characters');
        } else {
            event.cancel = false;
            (<HTMLInputElement>document.getElementById('textvalue')).value = '';
            (<HTMLInputElement>document.getElementById('textvalue2')).value = '';
        }
    }
    // Sample level code to handle the button click action
    public onOpenDialog = function(event: any): void {
        // Call the show method to open the Dialog
        this.ejDialog.show();
    }
}
