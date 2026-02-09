package controller;

import dto.ApiResponse;
import entity.Payment;
import service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/payments")
@CrossOrigin(origins = "*")
public class PaymentController {
    @Autowired
    private PaymentService paymentService;
    
    @PostMapping
    public ResponseEntity<ApiResponse> createPayment(@RequestBody Payment payment) {
        Payment created = paymentService.createPayment(payment);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Payment created successfully", created));
    }
    
    @GetMapping
    public ResponseEntity<ApiResponse> getAllPayments() {
        List<Payment> payments = paymentService.getAllPayments();
        return ResponseEntity.ok(ApiResponse.success("Payments retrieved successfully", payments));
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> getPaymentById(@PathVariable Integer id) {
        Payment payment = paymentService.getPaymentById(id);
        if (payment != null) {
            return ResponseEntity.ok(ApiResponse.success("Payment found", payment));
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(ApiResponse.error("Payment not found"));
    }
    
    @PatchMapping("/{id}/status")
    public ResponseEntity<ApiResponse> updatePaymentStatus(@PathVariable Integer id, 
                                                           @RequestParam String status) {
        Payment updated = paymentService.updatePaymentStatus(id, status);
        if (updated != null) {
            return ResponseEntity.ok(ApiResponse.success("Payment status updated successfully", updated));
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(ApiResponse.error("Payment not found"));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deletePayment(@PathVariable Integer id) {
        boolean deleted = paymentService.deletePayment(id);
        if (deleted) {
            return ResponseEntity.ok(ApiResponse.success("Payment deleted successfully"));
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(ApiResponse.error("Payment not found"));
    }
}