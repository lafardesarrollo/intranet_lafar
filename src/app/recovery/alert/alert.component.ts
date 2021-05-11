import { Component } from '@angular/core';
import { MzBaseModal } from 'ngx-materialize';
import { Router, CanActivate } from '@angular/router';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent extends MzBaseModal {
  private route: Router;
  modalOptions: Materialize.ModalOptions = {
    dismissible: false, // Modal can be dismissed by clicking outside of the modal
    opacity: .5, // Opacity of modal background
    inDuration: 300, // Transition in duration
    outDuration: 200, // Transition out duration
    startingTop: '100%', // Starting top style attribute
    endingTop: '10%', // Ending top style attribute
    ready: (modal, trigger) => { // Callback for Modal open. Modal and trigger parameters available.
      //alert('Ready');
      // console.log(modal, trigger);
    },
    complete: () => {
      window.location.href = '/';
    },
  };
}
