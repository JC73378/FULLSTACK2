package com.funkostore.auth.config;

import com.funkostore.auth.model.Role;
import com.funkostore.auth.model.User;
import com.funkostore.auth.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataLoader {

    @Bean
    CommandLineRunner initUsers(UserRepository userRepository, PasswordEncoder encoder) {
        return args -> {
            if (userRepository.count() == 0) {
                User admin = new User();
                admin.setEmail("admin@funkostore.com");
                admin.setPasswordHash(encoder.encode("Admin123"));
                admin.setRole(Role.ADMIN);
                admin.setEnabled(true);
                userRepository.save(admin);

                User seller = new User();
                seller.setEmail("seller@funkostore.com");
                seller.setPasswordHash(encoder.encode("Seller123"));
                seller.setRole(Role.SELLER);
                seller.setEnabled(true);
                userRepository.save(seller);

                User demo = new User();
                demo.setEmail("demo@funkostore.com");
                demo.setPasswordHash(encoder.encode("Demo1234"));
                demo.setRole(Role.CUSTOMER);
                demo.setEnabled(true);
                userRepository.save(demo);
            }
        };
    }
}
