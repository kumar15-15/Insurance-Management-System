package com.example.insurance_policy_management_system.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "customer_policies")
public class CustomerPolicy {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer customerPolicyId;
    
    @ManyToOne
    @JoinColumn(name = "customer_id", nullable = false)
    private Customer customer;
    
    @ManyToOne
    @JoinColumn(name = "policy_id", nullable = false)
    private Policy policy;
    
    private LocalDate startDate;
    private LocalDate endDate;
    private String policyStatus;
    
    // Constructors
    public CustomerPolicy() {}
    
    public CustomerPolicy(Customer customer, Policy policy) {
        this.customer = customer;
        this.policy = policy;
        this.policyStatus = "ACTIVE";
        this.startDate = LocalDate.now();
    }
    
    // Getters and Setters
    public Integer getCustomerPolicyId() { return customerPolicyId; }
    public void setCustomerPolicyId(Integer customerPolicyId) { this.customerPolicyId = customerPolicyId; }
    
    public Customer getCustomer() { return customer; }
    public void setCustomer(Customer customer) { this.customer = customer; }
    
    public Policy getPolicy() { return policy; }
    public void setPolicy(Policy policy) { this.policy = policy; }
    
    public LocalDate getStartDate() { return startDate; }
    public void setStartDate(LocalDate startDate) { this.startDate = startDate; }
    
    public LocalDate getEndDate() { return endDate; }
    public void setEndDate(LocalDate endDate) { this.endDate = endDate; }
    
    public String getPolicyStatus() { return policyStatus; }
    public void setPolicyStatus(String policyStatus) { this.policyStatus = policyStatus; }
}
