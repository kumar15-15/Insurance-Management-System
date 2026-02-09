-- Create database if not exists
CREATE DATABASE IF NOT EXISTS insurance_db;
USE insurance_db;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    full_name VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert Default Admin User
INSERT INTO users (username, password, email, full_name) VALUES ('admin', 'admin123', 'admin@insurance.com', 'Administrator');

-- Create customers table
CREATE TABLE IF NOT EXISTS customers (
    customer_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(15),
    address VARCHAR(255),
    date_of_birth DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert Sample Customers
INSERT INTO customers (first_name, last_name, email, phone, address) VALUES 
('John', 'Doe', 'john.doe@example.com', '9876543210', '123 Main Street'),
('Jane', 'Smith', 'jane.smith@example.com', '9876543211', '456 Oak Avenue'),
('Robert', 'Johnson', 'robert.johnson@example.com', '9876543212', '789 Pine Road'),
('Emily', 'Williams', 'emily.williams@example.com', '9876543213', '321 Elm Street');

-- Create policies table
CREATE TABLE IF NOT EXISTS policies (
    policy_id INT PRIMARY KEY AUTO_INCREMENT,
    policy_name VARCHAR(100) NOT NULL,
    policy_type VARCHAR(50) NOT NULL,
    premium_amount DECIMAL(10, 2) NOT NULL,
    duration_months INT,
    coverage_amount DECIMAL(12, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert Sample Policies
INSERT INTO policies (policy_name, policy_type, premium_amount, duration_months, coverage_amount) VALUES 
('Term Life Insurance', 'Life', 5000.00, 12, 1000000.00),
('Health Insurance Plus', 'Health', 12000.00, 12, 500000.00),
('Vehicle Comprehensive', 'Vehicle', 8500.00, 12, 2000000.00),
('Home Safety Plus', 'Home', 15000.00, 12, 5000000.00),
('Travel Guard', 'Travel', 2500.00, 1, 1000000.00);

-- Create customer_policies table
CREATE TABLE IF NOT EXISTS customer_policies (
    customer_policy_id INT PRIMARY KEY AUTO_INCREMENT,
    customer_id INT NOT NULL,
    policy_id INT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE,
    policy_status VARCHAR(20) DEFAULT 'ACTIVE',
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id) ON DELETE CASCADE,
    FOREIGN KEY (policy_id) REFERENCES policies(policy_id) ON DELETE CASCADE
);

-- Insert Sample Customer-Policy Mappings
INSERT INTO customer_policies (customer_id, policy_id, start_date, policy_status) VALUES 
(1, 1, CURDATE(), 'ACTIVE'),
(1, 3, CURDATE(), 'ACTIVE'),
(2, 2, CURDATE(), 'ACTIVE'),
(3, 4, CURDATE(), 'ACTIVE'),
(4, 5, CURDATE(), 'ACTIVE');

-- Create payments table
CREATE TABLE IF NOT EXISTS payments (
    payment_id INT PRIMARY KEY AUTO_INCREMENT,
    customer_policy_id INT,
    payment_date DATE DEFAULT CURDATE(),
    amount DECIMAL(10, 2) NOT NULL,
    payment_mode VARCHAR(50),
    payment_status VARCHAR(20) DEFAULT 'PENDING',
    FOREIGN KEY (customer_policy_id) REFERENCES customer_policies(customer_policy_id) ON DELETE SET NULL
);

-- Insert Sample Payments
INSERT INTO payments (customer_policy_id, amount, payment_mode, payment_status) VALUES 
(1, 5000.00, 'Online', 'SUCCESS'),
(2, 8500.00, 'Bank Transfer', 'SUCCESS'),
(3, 12000.00, 'Credit Card', 'SUCCESS'),
(4, 15000.00, 'Online', 'PENDING'),
(5, 2500.00, 'Online', 'SUCCESS');

-- Create claims table
CREATE TABLE IF NOT EXISTS claims (
    claim_id INT PRIMARY KEY AUTO_INCREMENT,
    customer_policy_id INT,
    claim_date DATE DEFAULT CURDATE(),
    claim_amount DECIMAL(12, 2) NOT NULL,
    claim_status VARCHAR(20) DEFAULT 'PENDING',
    description TEXT,
    FOREIGN KEY (customer_policy_id) REFERENCES customer_policies(customer_policy_id) ON DELETE SET NULL
);

-- Insert Sample Claims
INSERT INTO claims (customer_policy_id, claim_amount, claim_status, description) VALUES 
(1, 50000.00, 'PENDING', 'Medical emergency claim'),
(2, 150000.00, 'APPROVED', 'Vehicle accident claim'),
(3, 100000.00, 'PROCESSING', 'Health insurance claim'),
(4, 200000.00, 'REJECTED', 'House damage claim'),
(5, 25000.00, 'APPROVED', 'Travel accident claim');

-- Create indexes for better query performance
CREATE INDEX idx_customer_email ON customers(email);
CREATE INDEX idx_customer_policies_customer ON customer_policies(customer_id);
CREATE INDEX idx_customer_policies_policy ON customer_policies(policy_id);
CREATE INDEX idx_payments_status ON payments(payment_status);
CREATE INDEX idx_claims_status ON claims(claim_status);

-- Display confirmation message
SELECT 'Database initialized successfully!' as status;
