package controller;

import dto.ApiResponse;
import entity.Claim;
import service.ClaimService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/claims")
@CrossOrigin(origins = "*")
public class ClaimController {
    @Autowired
    private ClaimService claimService;
    
    @PostMapping
    public ResponseEntity<ApiResponse> createClaim(@RequestBody Claim claim) {
        Claim created = claimService.createClaim(claim);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Claim created successfully", created));
    }
    
    @GetMapping
    public ResponseEntity<ApiResponse> getAllClaims() {
        List<Claim> claims = claimService.getAllClaims();
        return ResponseEntity.ok(ApiResponse.success("Claims retrieved successfully", claims));
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> getClaimById(@PathVariable Integer id) {
        Claim claim = claimService.getClaimById(id);
        if (claim != null) {
            return ResponseEntity.ok(ApiResponse.success("Claim found", claim));
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(ApiResponse.error("Claim not found"));
    }
    
    @PatchMapping("/{id}/status")
    public ResponseEntity<ApiResponse> updateClaimStatus(@PathVariable Integer id, 
                                                         @RequestParam String status) {
        Claim updated = claimService.updateClaimStatus(id, status);
        if (updated != null) {
            return ResponseEntity.ok(ApiResponse.success("Claim status updated successfully", updated));
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(ApiResponse.error("Claim not found"));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteClaim(@PathVariable Integer id) {
        boolean deleted = claimService.deleteClaim(id);
        if (deleted) {
            return ResponseEntity.ok(ApiResponse.success("Claim deleted successfully"));
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(ApiResponse.error("Claim not found"));
    }
}