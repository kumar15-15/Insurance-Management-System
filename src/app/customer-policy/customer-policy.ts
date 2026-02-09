import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatbotComponent } from '../chatbot/chatbot';

@Component({
  selector: 'app-customer-policy',
  standalone: true,
  imports: [CommonModule, FormsModule, ChatbotComponent],
  templateUrl: './customer-policy.html',
  styleUrls: ['./customer-policy.css']
})
export class CustomerPolicyComponent {

  @ViewChild(ChatbotComponent) chatbot!: ChatbotComponent;

  customerPolicy = {
    id: '',
    customerId: '',
    policyId: '',
    startDate: '',
    status: 'ACTIVE'
  };

  customerPolicies: any[] = [];
  successMessage: string = '';
  errorMessage: string = '';
  showSuccess: boolean = false;
  showError: boolean = false;

  assignPolicy() {
    // Validation
    if (!this.customerPolicy.customerId || !this.customerPolicy.policyId || !this.customerPolicy.startDate) {
      this.errorMessage = 'Please fill all required fields (Customer ID, Policy ID, Start Date)';
      this.showError = true;
      this.showSuccess = false;
      return;
    }

    if (!Number.isInteger(Number(this.customerPolicy.customerId)) || Number(this.customerPolicy.customerId) <= 0) {
      this.errorMessage = 'Customer ID must be a valid positive number';
      this.showError = true;
      this.showSuccess = false;
      return;
    }

    if (!Number.isInteger(Number(this.customerPolicy.policyId)) || Number(this.customerPolicy.policyId) <= 0) {
      this.errorMessage = 'Policy ID must be a valid positive number';
      this.showError = true;
      this.showSuccess = false;
      return;
    }

    this.showError = false;

    // Auto-generate ID
    const newAssignment = {
      ...this.customerPolicy,
      id: Date.now().toString()
    };

    // Save mapping
    this.customerPolicies.push(newAssignment);

    this.successMessage = `Policy assigned to Customer #${this.customerPolicy.customerId} successfully!`;
    this.showSuccess = true;

    // Reset form
    this.customerPolicy = {
      id: '',
      customerId: '',
      policyId: '',
      startDate: '',
      status: 'ACTIVE'
    };

    setTimeout(() => {
      this.showSuccess = false;
    }, 4000);
  }

  deleteAssignment(index: number) {
    const deleted = this.customerPolicies.splice(index, 1)[0];
    this.successMessage = `Assignment deleted successfully`;
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