import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-premium',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './premium.component.html',
  styleUrls: ['./premium.component.css']
})
export class PremiumComponent {

  message: string = '';
  showDashboard = false;

  selectPlan(
    planName: string,
    price: number,
    playerLimit: number,
    editDays: number
  ) {
    this.message = `არჩეულია ${planName} პაკეტი ($${price}/თვე)`;
    this.showDashboard = true;

    console.log({
      planName,
      price,
      playerLimit,
      editDays
    });

    // აქ მერე API-ს მიაბამ
  }
}
