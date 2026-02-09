package com.example.insurance_policy_management_system.service;

import com.example.insurance_policy_management_system.entity.Payment;
import com.example.insurance_policy_management_system.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;

@Service
public class PaymentService {
    @Autowired
    private PaymentRepository paymentRepository;
    
    public Payment createPayment(Payment payment) {
        if (payment.getPaymentDate() == null) {
            payment.setPaymentDate(LocalDate.now());
        }
        if (payment.getPaymentStatus() == null) {
            payment.setPaymentStatus("PENDING");
        }
        return paymentRepository.save(payment);
    }
    
    public List<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }
    
    public Payment getPaymentById(Integer id) {
        return paymentRepository.findById(id).orElse(null);
    }
    
    public Payment updatePaymentStatus(Integer id, String status) {
        Payment payment = getPaymentById(id);
        if (payment != null) {
            payment.setPaymentStatus(status);
            return paymentRepository.save(payment);
        }
        return null;
    }
    
    public boolean deletePayment(Integer id) {
        if (paymentRepository.existsById(id)) {
            paymentRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
