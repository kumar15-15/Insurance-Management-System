import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatbotComponent } from '../chatbot/chatbot';

@Component({
  selector: 'app-policy',
  standalone: true,
  imports: [CommonModule, FormsModule, ChatbotComponent],
  templateUrl: './policy.html',
  styleUrls: ['./policy.css']
})
export class PolicyComponent {

  @ViewChild(ChatbotComponent) chatbot!: ChatbotComponent;

  policy = {
    policyId: '',
    policyName: '',
    policyType: '',
    premiumAmount: '',
    durationMonths: ''
  };

  policies: any[] = [];
  successMessage: string = '';
  errorMessage: string = '';
  showSuccess: boolean = false;
  showError: boolean = false;

  addPolicy() {
    // Validation
    if (!this.policy.policyName.trim() || !this.policy.policyType || !this.policy.premiumAmount || !this.policy.durationMonths) {
      this.errorMessage = 'Please fill all required fields (Policy Name, Type, Premium Amount, Duration)';
      this.showError = true;
      this.showSuccess = false;
      return;
    }

    // Validate premium amount
    const premium = parseFloat(this.policy.premiumAmount.toString());
    if (isNaN(premium) || premium <= 0) {
      this.errorMessage = 'Premium amount must be a positive number';
      this.showError = true;
      this.showSuccess = false;
      return;
    }

    // Validate duration
    const duration = parseInt(this.policy.durationMonths.toString());
    if (isNaN(duration) || duration <= 0) {
      this.errorMessage = 'Please select a valid duration';
      this.showError = true;
      this.showSuccess = false;
      return;
    }

    this.showError = false;

    // Auto-generate ID
    const newPolicy = {
      ...this.policy,
      policyId: Date.now().toString()
    };

    this.policies.push(newPolicy);

    this.successMessage = `Policy "${this.policy.policyName}" created successfully!`;
    this.showSuccess = true;

    // Reset form
    this.policy = {
      policyId: '',
      policyName: '',
      policyType: '',
      premiumAmount: '',
      durationMonths: ''
    };

    // Hide success message after 4 seconds
    setTimeout(() => {
      this.showSuccess = false;
    }, 4000);
  }

  deletePolicy(index: number) {
    const deleted = this.policies.splice(index, 1)[0];
    this.successMessage = `Policy "${deleted.policyName}" deleted successfully`;
    this.showSuccess = true;
    setTimeout(() => {
      this.showSuccess = false;
    }, 3000);
  }

  openSupportChat() {
    if (this.chatbot) {
      this.chatbot.toggleChat();
    }
  }
}