import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DateFormControl } from '../date-form-control';

@Component({
  selector: 'app-card-form',
  templateUrl: './card-form.component.html',
  styleUrls: ['./card-form.component.css'],
})
export class CardFormComponent implements OnInit {
  cardForm = new FormGroup({
    name: new FormControl('', [
      Validators.required
      // Validators.pattern(/\s/) // แอดได้เฉพาะ space
    ]),
    cardNumber: new FormControl('', [
      Validators.required,
      Validators.minLength(16),
      Validators.maxLength(16)
    ]),
    expiration: new DateFormControl('', [
      Validators.required,
      /** 0[1-9] คือ 01, 09, ...
       *  1[1-2] คือ 11, 12
       *  \d{2} คือ เลขสองหลัก
      */
      Validators.pattern(/^(0[1-9]|1[1-2])\/\d{2}$/)
    ]),
    securityCode: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(3),
    ])
  });

  constructor() {
    console.log(this.cardForm.get('name'));
  }

  ngOnInit(): void {}

  getFormValidatorError() {
    // Object.keys(this.cardForm.controls).forEach((key) => {
    //   const controlError: any = this.cardForm.get(key)?.errors;
    //   if (controlError != null) {
    //     Object.keys(controlError).forEach((keyError) => {
    //       console.info(
    //         `💥 Key control: ${key}, keyError: ${keyError}, err value: `,
    //         controlError[keyError]
    //       );
    //     });
    //   }
    // });
  }

  onSubmit() {

  }

  onReset() {
    /** reset() try to set all formControl to null */
    this.cardForm.reset();
  }
}
