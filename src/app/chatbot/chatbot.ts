import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ChatMessage {
  text: string;
  isBot: boolean;
  timestamp: Date;
}

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot.html',
  styleUrls: ['./chatbot.css']
})
export class ChatbotComponent {
  isOpen: boolean = false;
  messages: ChatMessage[] = [];
  userMessage: string = '';
  isLoading: boolean = false;

  private botResponses: { [key: string]: string } = {
    'hello': 'Hello! 👋 Welcome to our support center. How can I help you today?',
    'hi': 'Hi there! 👋 How can I assist you with your insurance claims?',
    'claim': 'For claim assistance: Please provide your policy number and claim details. Our team will process your claim within 24-48 hours.',
    'policy': 'Regarding policies: You can view your active policies, renew, or purchase new ones through the Manage Policies section.',
    'payment': 'For payments: You can make premium payments through the Manage Payments section or contact our billing team.',
    'contact': 'You can reach us at:\n📞 Phone: 1-800-INSURANCE\n📧 Email: support@insurance.com\n⏰ Hours: Mon-Fri 9AM-6PM',
    'help': 'I can assist you with:\n• Claim status inquiries\n• Policy information\n• Payment assistance\n• General support\n\nWhat would you like help with?',
    'status': 'To check your claim status, please provide your claim ID or policy number.',
    'thank': 'You\'re welcome! 😊 Is there anything else I can help you with?',
    'bye': 'Goodbye! 👋 Thank you for contacting us. Have a great day!',
    'default': 'I understand. Please provide more details, or ask to speak with a support representative. 😊'
  };

  toggleChat(): void {
    this.isOpen = !this.isOpen;
    if (this.isOpen && this.messages.length === 0) {
      this.addBotMessage('Hello! 👋 Welcome to our insurance support. How can I help you today?');
    }
  }

  closeChat(): void {
    this.isOpen = false;
  }

  sendMessage(): void {
    if (!this.userMessage.trim()) {
      return;
    }

    // Add user message
    this.messages.push({
      text: this.userMessage,
      isBot: false,
      timestamp: new Date()
    });

    this.isLoading = true;

    // Simulate bot response delay
    setTimeout(() => {
      const response = this.getBotResponse(this.userMessage.toLowerCase());
      this.addBotMessage(response);
      this.isLoading = false;
    }, 500);

    this.userMessage = '';
  }

  private getBotResponse(userMessage: string): string {
    const lowerMessage = userMessage.toLowerCase();

    // Check for keyword matches
    for (const [key, value] of Object.entries(this.botResponses)) {
      if (lowerMessage.includes(key)) {
        return value;
      }
    }

    return this.botResponses['default'];
  }

  private addBotMessage(text: string): void {
    this.messages.push({
      text: text,
      isBot: true,
      timestamp: new Date()
    });

    // Auto scroll to bottom
    setTimeout(() => {
      const chatContainer = document.querySelector('.chat-messages');
      if (chatContainer) {
        chatContainer.scrollTop = chatContainer.scrollHeight;
      }
    }, 100);
  }

  handleKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.sendMessage();
    }
  }
}
