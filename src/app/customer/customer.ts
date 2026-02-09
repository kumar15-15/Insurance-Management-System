import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatbotComponent } from '../chatbot/chatbot';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [CommonModule, FormsModule, ChatbotComponent],
  templateUrl: './customer.html',
  styleUrls: ['./customer.css']
})
export class CustomerComponent {

  @ViewChild(ChatbotComponent) chatbot!: ChatbotComponent;

  customer = {
    customerId: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: ''
  };

  customers: any[] = [];
  successMessage: string = '';
  errorMessage: string = '';
  showSuccess: boolean = false;
  showError: boolean = false;

  addCustomer() {
    // Validation
    if (!this.customer.firstName.trim() || !this.customer.lastName.trim() || !this.customer.email.trim() || !this.customer.phone.trim() || !this.customer.address.trim()) {
      this.errorMessage = 'Please fill all required fields (First Name, Last Name, Email, Phone, Address)';
      this.showError = true;
      this.showSuccess = false;
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.customer.email)) {
      this.errorMessage = 'Please enter a valid email address';
      this.showError = true;
      this.showSuccess = false;
      return;
    }

    // Phone validation - must be exactly 10 digits
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(this.customer.phone.replace(/\s/g, ''))) {
      this.errorMessage = 'Phone number must be exactly 10 digits (numbers only)';
      this.showError = true;
      this.showSuccess = false;
      return;
    }

    this.showError = false;
    
    // Auto-generate ID
    const newCustomer = {
      ...this.customer,
      customerId: Date.now().toString()
    };

    this.customers.push(newCustomer);
    
    this.successMessage = `Customer "${this.customer.firstName} ${this.customer.lastName}" added successfully!`;
    this.showSuccess = true;

    // Reset form
    this.customer = {
      customerId: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: ''
    };

    // Hide success message after 4 seconds
    setTimeout(() => {
      this.showSuccess = false;
    }, 4000);
  }

  deleteCustomer(index: number) {
    const deleted = this.customers.splice(index, 1)[0];
    this.successMessage = `Customer "${deleted.firstName}" deleted successfully`;
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