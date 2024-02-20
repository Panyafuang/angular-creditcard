import { FormControl } from '@angular/forms';

export class DateFormControl extends FormControl {
  /**
   *
   * @param value ที่ต้องเป็น string | null เพราะกรณีปุ่ม reset กดแล้วจะเรียก method form.reset() method reset() นั้นจะพยายาม ทำให้ทุด formControl มีค่าเป็น null ดังนั้นจึงต้องใส่ | null เพื่อไม่ให้เกิด error
   * @param options
   * @returns
   */
  override setValue(value: string | null, options: any) {
    if (!value) {
      super.setValue('', { ...options, emitModelToViewChange: true });
      return;
    }

    /** /[^0-9|\/]/gi คือ 1-9 กับ / */
    if (value.match(/[^0-9|\/]/gi)) {
      /**
       * value is just function argument and this.value is property of FormControl class instance
       * ความแตกต่างที่ต้องใส่ this.value เพราะว่าหาก user พิมพ์ 2[หรืออะไรก็ตามที่ match กับ regex] แล้วตามด้วยตัวอักษร[หรืออะไรก็ตามที่ไม่ match กับ regex] มันจะเอาค่าล่าสุดที่ถูกต้องตาม regex มาใส่เป็นค่าของ formControl นั้นก็คือ 2
       *
       * */
      super.setValue(this.value, { ...options, emitModelToViewChange: true });
      return;
    }

    if (value.length > 5) {
      super.setValue(this.value, { ...options, emitModelToViewChange: true });
      return;
    }

    /** handle user can delete / */
    if (value.length === 2 && this.value.length === 3) {
      super.setValue(value, { ...options, emitModelToViewChange: true });
      return;
    }

    if (value.length === 2) {
      super.setValue(value + '/', { ...options, emitModelToViewChange: true });
      return;
    }
    return super.setValue(value, { ...options, emitModelToViewChange: true });
  }
}

// import { FormControl } from "@angular/forms";

// export class DateFormControl extends FormControl {

//   override setValue(value: string | null, options: any) {
//     if (!value) {
//       super.setValue('', { ...options, emitModelToViewChange: true });
//       return;
//     }

//     /** /[^0-9|\/]/gi คือ 1-9 กับ / */
//     if (value.match(/[^0-9|\/]/gi)) {
//       console.log(value.match(/[^0-9|\/]/gi))
//       console.log('this.value -> ', this.value)
//       console.log('value -> ', value)

//       super.setValue(this.value, { ...options, emitModelToViewChange: true });
//       return;
//     }

//     if (value.length > 5) {
//       super.setValue(this.value, { ...options, emitModelToViewChange: true });
//       return;
//     }

//     /**
//      * this.value.length === 3 คือ 12/
//      * this.value คือ ค่าที่เก็บไว้ (this.cardFrom.get('expiration').value)
//      * value คือ ค่าที่ input เข้ามา realtime
//      */
//     if (value.length === 2 && this.value.length === 3) {
//       super.setValue(value, { ...options, emitModelToViewChange: true });
//       return;
//     }

//     if (value.length === 2) {
//       super.setValue(value + '/', { ...options, emitModelToViewChange: true });
//       return;
//     }

//     super.setValue(value, options);
//   }
// }
