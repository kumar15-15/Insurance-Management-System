package repository;

import entity.CustomerPolicy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerPolicyRepository extends JpaRepository<CustomerPolicy, Integer> {
}