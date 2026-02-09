package com.example.insurance_policy_management_system.service;

import com.example.insurance_policy_management_system.entity.Claim;
import com.example.insurance_policy_management_system.repository.ClaimRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;

@Service
public class ClaimService {
    @Autowired
    private ClaimRepository claimRepository;
    
    public Claim createClaim(Claim claim) {
        if (claim.getClaimDate() == null) {
            claim.setClaimDate(LocalDate.now());
        }
        if (claim.getClaimStatus() == null) {
            claim.setClaimStatus("PENDING");
        }
        return claimRepository.save(claim);
    }
    
    public List<Claim> getAllClaims() {
        return claimRepository.findAll();
    }
    
    public Claim getClaimById(Integer id) {
        return claimRepository.findById(id).orElse(null);
    }
    
    public Claim updateClaimStatus(Integer id, String status) {
        Claim claim = getClaimById(id);
        if (claim != null) {
            claim.setClaimStatus(status);
            return claimRepository.save(claim);
        }
        return null;
    }
    
    public boolean deleteClaim(Integer id) {
        if (claimRepository.existsById(id)) {
            claimRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
