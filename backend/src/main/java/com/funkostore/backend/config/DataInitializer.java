package com.funkostore.backend.config;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.funkostore.backend.auth.UserAccount;
import com.funkostore.backend.auth.UserRepository;
import com.funkostore.backend.comingsoon.ComingSoonItem;
import com.funkostore.backend.comingsoon.ComingSoonRepository;
import com.funkostore.backend.product.Product;
import com.funkostore.backend.product.ProductRepository;

@Component
public class DataInitializer implements CommandLineRunner {

    private final ProductRepository productRepository;
    private final ComingSoonRepository comingSoonRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(ProductRepository productRepository,
            ComingSoonRepository comingSoonRepository,
            UserRepository userRepository,
            PasswordEncoder passwordEncoder) {
        this.productRepository = productRepository;
        this.comingSoonRepository = comingSoonRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        if (productRepository.count() == 0) {
            Product homer = buildProduct("Homer Donut", "Series", new BigDecimal("18.90"),
                    "/assets/homer-donut.png", 20, true);
            Product hatbox = buildProduct("Hatbox Ghost Glow", "Parks", new BigDecimal("29.50"),
                    "/assets/hatbox-ghost-glow.png", 12, true);
            Product diablo = buildProduct("Diablo Tyrael Gold", "Gaming", new BigDecimal("26.00"),
                    "/assets/diablo-tyrael-gold.jpg", 15, false);
            Product itachi = buildProduct("Itachi Akatsuki", "Anime", new BigDecimal("22.75"),
                    "/assets/itachi-akatsuki.jpg", 30, true);
            Product jigsaw = buildProduct("Jigsaw Saw", "Movies", new BigDecimal("24.90"),
                    "/assets/jigsaw-saw.png", 18, false);
            Product godzilla = buildProduct("Godzilla Chibi", "Movies", new BigDecimal("19.99"),
                    "/assets/godzilla-chibi.jpg", 25, true);
            Product kuromi = buildProduct("Kuromi Bow", "Sanrio", new BigDecimal("16.50"),
                    "/assets/kuromi-bow.jpg", 35, false);
            Product spiderCat = buildProduct("Spider-Cat Plush", "Marvel", new BigDecimal("21.40"),
                    "/assets/spider-cat-plush.jpg", 22, true);
            productRepository.saveAll(List.of(homer, hatbox, diablo, itachi, jigsaw, godzilla, kuromi, spiderCat));
        }

        if (comingSoonRepository.count() == 0) {
            ComingSoonItem helloKittyRace = buildComingSoon("Hello Kitty Racecar", "Sanrio", new BigDecimal("27.99"),
                    "Q1 2026", "/assets/coming-hello-kitty-racecar.png");
            ComingSoonItem louRaymond = buildComingSoon("Lou Raymond MLB", "Sports", new BigDecimal("23.50"),
                    "Q2 2026", "/assets/coming-lou-raymond.png");
            ComingSoonItem cinnamoroll = buildComingSoon("Cinnamoroll Bunny", "Sanrio", new BigDecimal("25.00"),
                    "Q3 2026", "/assets/coming-cinnamoroll-bunny.png");
            ComingSoonItem pompompurin = buildComingSoon("Pompompurin Egg", "Sanrio", null,
                    "Q3 2026", "/assets/coming-pompompurin-egg.png");
            ComingSoonItem poohBalloon = buildComingSoon("Pooh Balloon", "Disney", new BigDecimal("24.99"),
                    "Q4 2026", "/assets/coming-pooh-balloon.png");
            comingSoonRepository.saveAll(List.of(helloKittyRace, louRaymond, cinnamoroll, pompompurin, poohBalloon));
        }

        if (!userRepository.existsByEmailIgnoreCase("demo@funkostore.com")) {
            UserAccount demo = new UserAccount();
            demo.setName("Demo");
            demo.setEmail("demo@funkostore.com");
            demo.setPasswordHash(passwordEncoder.encode("demo123"));
            userRepository.save(demo);
        }
    }

    private Product buildProduct(String name, String category, BigDecimal price, String imageUrl, int stock, boolean onSale) {
        Product p = new Product();
        p.setName(name);
        p.setCategory(category);
        p.setPrice(price);
        p.setImageUrl(imageUrl);
        p.setStock(stock);
        p.setOnSale(onSale);
        p.setActive(true);
        return p;
    }

    private ComingSoonItem buildComingSoon(String name, String category, BigDecimal price, String eta, String imageUrl) {
        ComingSoonItem item = new ComingSoonItem();
        item.setName(name);
        item.setCategory(category);
        item.setPrice(price);
        item.setEta(eta);
        item.setImageUrl(imageUrl);
        return item;
    }
}
