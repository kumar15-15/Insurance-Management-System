package service;

import entity.CustomerPolicy;
import repository.CustomerPolicyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class CustomerPolicyService {
    @Autowired
    private CustomerPolicyRepository customerPolicyRepository;
    
    public CustomerPolicy assignPolicy(CustomerPolicy customerPolicy) {
        if (customerPolicy.getStartDate() == null) {
            customerPolicy.setStartDate(LocalDate.now());
        }
        if (customerPolicy.getPolicyStatus() == null) {
            customerPolicy.setPolicyStatus("ACTIVE");
        }
        return customerPolicyRepository.save(customerPolicy);
    }
    
    public List<CustomerPolicy> getAllCustomerPolicies() {
        return customerPolicyRepository.findAll();
    }
    
    public CustomerPolicy getCustomerPolicyById(Integer id) {
        return customerPolicyRepository.findById(id).orElse(null);
    }
    
    public CustomerPolicy updatePolicyStatus(Integer id, String status) {
        CustomerPolicy policy = getCustomerPolicyById(id);
        if (policy != null) {
            policy.setPolicyStatus(status);
            return customerPolicyRepository.save(policy);
        }
        return null;
    }
    
    public boolean deleteCustomerPolicy(Integer id) {
        if (customerPolicyRepository.existsById(id)) {
            customerPolicyRepository.deleteById(id);
            return true;
        }
        return false;
    }
}