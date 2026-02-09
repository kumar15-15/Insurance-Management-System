import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatbotComponent } from '../chatbot/chatbot';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, FormsModule, ChatbotComponent],
  templateUrl: './payment.html',
  styleUrls: ['./payment.css']
})
export class PaymentComponent {

  @ViewChild(ChatbotComponent) chatbot!: ChatbotComponent;

  payment = {
    paymentId: '',
    customerId: '',
    policyId: '',
    amount: '',
    paymentDate: '',
    paymentStatus: 'SUCCESS'
  };

  payments: any[] = [];
  successMessage: string = '';
  errorMessage: string = '';
  showSuccess: boolean = false;
  showError: boolean = false;

  makePayment() {
    // Validation
    if (!this.payment.customerId || !this.payment.policyId || !this.payment.amount) {
      this.errorMessage = 'Please fill all required fields (Customer ID, Policy ID, Amount)';
      this.showError = true;
      this.showSuccess = false;
      return;
    }

    // Validate IDs
    if (!Number.isInteger(Number(this.payment.customerId)) || Number(this.payment.customerId) <= 0) {
      this.errorMessage = 'Customer ID must be a valid positive number';
      this.showError = true;
      this.showSuccess = false;
      return;
    }

    if (!Number.isInteger(Number(this.payment.policyId)) || Number(this.payment.policyId) <= 0) {
      this.errorMessage = 'Policy ID must be a valid positive number';
      this.showError = true;
      this.showSuccess = false;
      return;
    }

    // Validate amount
    const amount = parseFloat(this.payment.amount.toString());
    if (isNaN(amount) || amount <= 0) {
      this.errorMessage = 'Payment amount must be a positive number';
      this.showError = true;
      this.showSuccess = false;
      return;
    }

    this.showError = false;

    // Auto-set date
    this.payment.paymentDate = new Date().toISOString().split('T')[0];

    const newPayment = {
      ...this.payment,
      paymentId: Date.now().toString()
    };

    // Save payment
    this.payments.push(newPayment);

    this.successMessage = `Payment of ₹ ${this.payment.amount} received successfully!`;
    this.showSuccess = true;

    // Reset form
    this.payment = {
      paymentId: '',
      customerId: '',
      policyId: '',
      amount: '',
      paymentDate: '',
      paymentStatus: 'SUCCESS'
    };

    setTimeout(() => {
      this.showSuccess = false;
    }, 4000);
  }

  deletePayment(index: number) {
    const deleted = this.payments.splice(index, 1)[0];
    this.successMessage = `Payment record deleted successfully`;
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