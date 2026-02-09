package com.example.insurance_policy_management_system.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "claims")
public class Claim {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer claimId;
    
    @ManyToOne
    @JoinColumn(name = "customer_policy_id")
    private CustomerPolicy customerPolicy;
    
    private LocalDate claimDate;
    private BigDecimal claimAmount;
    private String claimStatus;
    private String description;
    
    // Constructors
    public Claim() {}
    
    public Claim(CustomerPolicy customerPolicy, BigDecimal claimAmount) {
        this.customerPolicy = customerPolicy;
        this.claimAmount = claimAmount;
        this.claimStatus = "PENDING";
        this.claimDate = LocalDate.now();
    }
    
    // Getters and Setters
    public Integer getClaimId() { return claimId; }
    public void setClaimId(Integer claimId) { this.claimId = claimId; }
    
    public CustomerPolicy getCustomerPolicy() { return customerPolicy; }
    public void setCustomerPolicy(CustomerPolicy customerPolicy) { this.customerPolicy = customerPolicy; }
    
    public LocalDate getClaimDate() { return claimDate; }
    public void setClaimDate(LocalDate claimDate) { this.claimDate = claimDate; }
    
    public BigDecimal getClaimAmount() { return claimAmount; }
    public void setClaimAmount(BigDecimal claimAmount) { this.claimAmount = claimAmount; }
    
    public String getClaimStatus() { return claimStatus; }
    public void setClaimStatus(String claimStatus) { this.claimStatus = claimStatus; }
    
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
}
