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
  showMessage: boolean = false;

  // WhatsApp configurations
  whatsappNumber: string = '995551009844';
  whatsappMessage: string = 'გამარჯობა, მინდა 1 მოთამაშის დამატება 25 ლარად';

  constructor() {}

  /**
   * Buy player slot functionality
   */
  buyPlayerSlot(): void {
    this.showMessage = true;
    this.message = 'თქვენი მოთხოვნა მუშავდება... გთხოვთ დაელოდოთ!';
    
    // After 2 seconds, show success message
    setTimeout(() => {
      this.message = '✅ წარმატებით! WhatsApp-ზე დაგვიკავშირდით გადახდისთვის.';
    }, 2000);

    // Hide message after 7 seconds
    setTimeout(() => {
      this.showMessage = false;
      this.message = '';
    }, 7000);
  }

  /**
   * Get WhatsApp link
   */
  getWhatsAppLink(): string {
    const encodedMessage = encodeURIComponent(this.whatsappMessage);
    return `https://wa.me/${this.whatsappNumber}?text=${encodedMessage}`;
  }
}


