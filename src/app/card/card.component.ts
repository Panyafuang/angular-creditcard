import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() cardNumber!: string | null | undefined;
  @Input() name!: string | null | undefined;
  @Input() expiration!: string | null | undefined;


}
