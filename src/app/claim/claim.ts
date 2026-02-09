import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatbotComponent } from '../chatbot/chatbot';

@Component({
  selector: 'app-claim',
  standalone: true,
  imports: [CommonModule, FormsModule, ChatbotComponent],
  templateUrl: './claim.html',
  styleUrls: ['./claim.css']
})
export class ClaimComponent {

  @ViewChild(ChatbotComponent) chatbot!: ChatbotComponent;

  claim = {
    claimId: '',
    customerId: '',
    policyId: '',
    claimAmount: '',
    claimReason: '',
    claimDate: '',
    claimStatus: 'PENDING'
  };

  claims: any[] = [];
  successMessage: string = '';
  errorMessage: string = '';
  showSuccess: boolean = false;
  showError: boolean = false;

  submitClaim() {
    // Validation
    if (
      !this.claim.customerId ||
      !this.claim.policyId ||
      !this.claim.claimAmount ||
      !this.claim.claimReason.trim()
    ) {
      this.errorMessage = 'Please fill all required fields';
      this.showError = true;
      this.showSuccess = false;
      return;
    }

    // Validate IDs
    if (!Number.isInteger(Number(this.claim.customerId)) || Number(this.claim.customerId) <= 0) {
      this.errorMessage = 'Customer ID must be a valid positive number';
      this.showError = true;
      this.showSuccess = false;
      return;
    }

    if (!Number.isInteger(Number(this.claim.policyId)) || Number(this.claim.policyId) <= 0) {
      this.errorMessage = 'Policy ID must be a valid positive number';
      this.showError = true;
      this.showSuccess = false;
      return;
    }

    // Validate claim amount
    const claimAmount = parseFloat(this.claim.claimAmount.toString());
    if (isNaN(claimAmount) || claimAmount <= 0) {
      this.errorMessage = 'Claim amount must be a positive number';
      this.showError = true;
      this.showSuccess = false;
      return;
    }

    if (this.claim.claimReason.length < 10) {
      this.errorMessage = 'Claim reason must be at least 10 characters';
      this.showError = true;
      this.showSuccess = false;
      return;
    }

    this.showError = false;

    // Auto set claim date
    this.claim.claimDate = new Date().toISOString().split('T')[0];

    const newClaim = {
      ...this.claim,
      claimId: Date.now().toString()
    };

    // Save claim
    this.claims.push(newClaim);

    this.successMessage = `Claim of ₹ ${this.claim.claimAmount} submitted successfully! Status: PENDING`;
    this.showSuccess = true;

    // Reset form
    this.claim = {
      claimId: '',
      customerId: '',
      policyId: '',
      claimAmount: '',
      claimReason: '',
      claimDate: '',
      claimStatus: 'PENDING'
    };

    setTimeout(() => {
      this.showSuccess = false;
    }, 4000);
  }

  deleteClaim(index: number) {
    const deleted = this.claims.splice(index, 1)[0];
    this.successMessage = `Claim deleted successfully`;
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