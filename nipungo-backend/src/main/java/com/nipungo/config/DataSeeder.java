package com.nipungo.config;

import com.nipungo.entity.Destination;
import com.nipungo.entity.Hotel;
import com.nipungo.entity.TravelPackage;
import com.nipungo.entity.User;
import com.nipungo.enums.RoleName;
import com.nipungo.repository.DestinationRepository;
import com.nipungo.repository.HotelRepository;
import com.nipungo.repository.PackageRepository;
import com.nipungo.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Slf4j
@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final DestinationRepository destinationRepository;
    private final HotelRepository hotelRepository;
    private final PackageRepository packageRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        seedUsers();
        seedDestinations();
        seedHotels();
        seedPackages();
    }

    private void seedUsers() {
        if (userRepository.existsByEmail("admin@nipungo.com")) return;

        User admin = User.builder()
                .firstName("Admin")
                .lastName("Nipungo")
                .email("admin@nipungo.com")
                .password(passwordEncoder.encode("Admin123@"))
                .phone("+94112345678")
                .role(RoleName.ROLE_ADMIN)
                .build();
        userRepository.save(admin);

        User demo = User.builder()
                .firstName("John")
                .lastName("Traveler")
                .email("user@nipungo.com")
                .password(passwordEncoder.encode("User123@"))
                .phone("+94777123456")
                .role(RoleName.ROLE_USER)
                .build();
        userRepository.save(demo);

        log.info("Users seeded: admin@nipungo.com / user@nipungo.com");
    }

    private void seedDestinations() {
        if (destinationRepository.count() > 0) return;

        String[][] data = {
            {"Sigiriya","Central Province","The iconic Lion Rock fortress, a UNESCO World Heritage Site rising 200m above the jungle. Built by King Kashyapa in the 5th century AD, featuring stunning frescoes, mirror walls and panoramic views.","https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80","Heritage","The Eighth Wonder of the World","December to April","1-2 days","4.9","2847","true"},
            {"Ella","Uva Province","A small hill-country town famous for misty mountains, lush tea plantations, the iconic Nine Arch Bridge, and stunning waterfalls. The perfect destination for hikers and nature lovers.","https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?w=800&q=80","Nature","Heaven in the Hills","December to March","2-4 days","4.8","3201","true"},
            {"Nuwara Eliya","Central Province","Sri Lanka's highest city at 1,868m, known as 'Little England'. Surrounded by manicured tea estates, scenic waterfalls and a serene lake. Perfect for a cool highland retreat.","https://images.unsplash.com/photo-1609766934878-b540dea56f3c?w=800&q=80","Hill Country","Little England of Sri Lanka","January to April","2-3 days","4.7","1923","false"},
            {"Kandy","Central Province","Sri Lanka's cultural capital and last royal city. Home to the sacred Temple of the Tooth Relic, surrounded by mountains and the scenic Kandy Lake. Heart of traditional Kandyan culture.","https://images.unsplash.com/photo-1566559532949-f82d6e0e6b3c?w=800&q=80","Culture","The Cultural Capital of Sri Lanka","December to April","2-3 days","4.8","4102","true"},
            {"Mirissa","Southern Province","Sri Lanka's premier beach destination with a crescent-shaped bay fringed with coconut palms. Famous for world-class whale watching, surfing, fresh seafood and spectacular sunsets.","https://images.unsplash.com/photo-1602002418082-a4443978a11c?w=800&q=80","Beach","Tropical Beach Paradise","November to April","3-5 days","4.7","2651","true"},
            {"Galle","Southern Province","A city where centuries of history meet contemporary cool. The Galle Fort, a UNESCO World Heritage Site, features cobblestone streets, boutique hotels and fine restaurants inside Portuguese and Dutch ramparts.","https://images.unsplash.com/photo-1567766338168-4a28de7af72f?w=800&q=80","Heritage","Historic Charm Meets Coastal Elegance","December to April","2-3 days","4.8","3456","false"},
            {"Yala","Southern Province","Sri Lanka's most visited national park and one of the best places to spot leopards in the wild. Spanning 979 sq km of dry-zone forest, home to elephants, sloth bears, crocodiles and 200+ bird species.","https://images.unsplash.com/photo-1561553873-e8491a564fd0?w=800&q=80","Wildlife","Sri Lanka's Premier Wildlife Safari","February to July","2-3 days","4.9","1876","true"},
            {"Arugam Bay","Eastern Province","Sri Lanka's east-coast gem and a world-renowned surfing destination. The legendary point break, laid-back vibe, stunning lagoons and incredible wildlife make it the ultimate adventure escape.","https://images.unsplash.com/photo-1531722569936-825d4ebd4fa5?w=800&q=80","Beach","Surfer's Paradise on the East Coast","May to October","3-7 days","4.7","1432","false"}
        };

        for (String[] d : data) {
            Destination dest = Destination.builder()
                    .name(d[0]).district(d[1]).description(d[2]).imageUrl(d[3])
                    .category(d[4]).tagline(d[5]).bestTime(d[6]).duration(d[7])
                    .rating(Double.parseDouble(d[8])).reviewCount(Integer.parseInt(d[9]))
                    .featured(Boolean.parseBoolean(d[10]))
                    .build();
            destinationRepository.save(dest);
        }
        log.info("8 destinations seeded");
    }

    private void seedHotels() {
        if (hotelRepository.count() > 0) return;

        Destination sigiriya = destinationRepository.findAll().stream()
                .filter(d -> d.getName().equals("Sigiriya")).findFirst().orElse(null);
        Destination ella = destinationRepository.findAll().stream()
                .filter(d -> d.getName().equals("Ella")).findFirst().orElse(null);
        Destination galle = destinationRepository.findAll().stream()
                .filter(d -> d.getName().equals("Galle")).findFirst().orElse(null);
        Destination kandy = destinationRepository.findAll().stream()
                .filter(d -> d.getName().equals("Kandy")).findFirst().orElse(null);
        Destination mirissa = destinationRepository.findAll().stream()
                .filter(d -> d.getName().equals("Mirissa")).findFirst().orElse(null);
        Destination yala = destinationRepository.findAll().stream()
                .filter(d -> d.getName().equals("Yala")).findFirst().orElse(null);
        Destination nuwara = destinationRepository.findAll().stream()
                .filter(d -> d.getName().equals("Nuwara Eliya")).findFirst().orElse(null);
        Destination arugam = destinationRepository.findAll().stream()
                .filter(d -> d.getName().equals("Arugam Bay")).findFirst().orElse(null);

        Object[][] hotels = {
            {"Heritance Kandalama","Dambulla","Central Province","A Geoffrey Bawa masterpiece carved into a cliff face overlooking Kandalama Lake. Eco-certified luxury with unparalleled jungle views.","https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80",new BigDecimal("280.00"),4.9,1247,5,"Luxury Resort","14:00","12:00",true,sigiriya},
            {"98 Acres Resort & Spa","Ella","Uva Province","Boutique luxury resort spread across rolling tea estate hills with breathtaking views of the Ella Gap and plunge pools.","https://images.unsplash.com/photo-1439130490301-25e322d88054?w=800&q=80",new BigDecimal("195.00"),4.8,892,5,"Boutique Resort","14:00","11:00",true,ella},
            {"Jetwing Lighthouse","Galle","Southern Province","Geoffrey Bawa masterpiece perched on a dramatic rock promontory overlooking the Indian Ocean, combining colonial charm with luxury.","https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",new BigDecimal("245.00"),4.8,1103,5,"Luxury Hotel","14:00","12:00",true,galle},
            {"Amangalla","Galle Fort","Southern Province","Intimate ultra-luxury hotel set within an 18th-century Dutch building inside the historic Galle Fort walls.","https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?w=800&q=80",new BigDecimal("650.00"),4.9,678,5,"Ultra Luxury","15:00","12:00",false,galle},
            {"Amanwella","Tangalle","Southern Province","Extraordinary beach resort on a private crescent cove with plunge pool terraces and impeccable barefoot luxury service.","https://images.unsplash.com/photo-1610641818989-c2051b5e2cfd?w=800&q=80",new BigDecimal("750.00"),4.9,543,5,"Beach Resort","15:00","12:00",true,mirissa},
            {"Cinnamon Lodge Habarana","Habarana","North Central Province","Set in a 28-acre nature reserve, perfect base for exploring the Cultural Triangle with safari access.","https://images.unsplash.com/photo-1617195737496-bc30194e3a19?w=800&q=80",new BigDecimal("145.00"),4.6,1567,4,"Jungle Resort","14:00","12:00",false,sigiriya},
            {"Hotel Sigiriya","Sigiriya","Central Province","The only hotel in Sri Lanka with a direct view of the iconic Sigiriya Rock Fortress from your own garden.","https://images.unsplash.com/photo-1601918774946-25832a4be0d6?w=800&q=80",new BigDecimal("95.00"),4.5,893,4,"Heritage Hotel","14:00","11:00",false,sigiriya},
            {"Wild Coast Tented Lodge","Yala","Southern Province","Unique eco-luxury with 30 cocoon-like pods nestled along a lagoon adjacent to Yala National Park.","https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=800&q=80",new BigDecimal("495.00"),4.9,412,5,"Eco-Luxury","15:00","11:00",true,yala},
            {"Earl's Regency Hotel","Kandy","Central Province","Dramatically perched on a steep hillside above Kandy with panoramic views, award-winning restaurants and Ayurveda spa.","https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800&q=80",new BigDecimal("165.00"),4.7,1102,5,"City Luxury","14:00","12:00",false,kandy},
            {"Jetwing Surf Arugam Bay","Arugam Bay","Eastern Province","Arugam Bay's premier boutique resort positioned steps from the famous Main Point surf break with lagoon pool.","https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=800&q=80",new BigDecimal("125.00"),4.6,567,4,"Beach Boutique","14:00","11:00",false,arugam},
            {"Tea Trails Bogawantalawa","Bogawantalawa","Central Province","Five restored colonial tea planters' bungalows set in a private tea estate, exclusively yours with butler and private chef.","https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&q=80",new BigDecimal("420.00"),4.9,389,5,"Exclusive Bungalow","14:00","11:00",true,nuwara},
            {"Mirissa Hills","Mirissa","Southern Province","Spectacular hilltop boutique villa resort overlooking Mirissa Bay with only 12 rooms and a cantilevered infinity pool.","https://images.unsplash.com/photo-1596386461350-326ccb383e9f?w=800&q=80",new BigDecimal("310.00"),4.8,634,5,"Boutique Villa","14:00","11:00",true,mirissa}
        };

        for (Object[] h : hotels) {
            Hotel hotel = Hotel.builder()
                    .name((String) h[0]).location((String) h[1]).province((String) h[2])
                    .description((String) h[3]).imageUrl((String) h[4])
                    .pricePerNight((BigDecimal) h[5]).rating((Double) h[6])
                    .reviewCount((Integer) h[7]).stars((Integer) h[8])
                    .category((String) h[9]).checkIn((String) h[10]).checkOut((String) h[11])
                    .featured((Boolean) h[12]).destination((Destination) h[13])
                    .build();
            hotelRepository.save(hotel);
        }
        log.info("12 hotels seeded");
    }

    private void seedPackages() {
        if (packageRepository.count() > 0) return;

        Object[][] packages = {
            {"Cultural Triangle Explorer","Uncover 2,500 Years of Civilization","Journey through Sri Lanka's ancient Cultural Triangle — Sigiriya Rock, Dambulla Cave Temple, Polonnaruwa and the Elephant Gathering at Minneriya.",5,"days",new BigDecimal("549.00"),new BigDecimal("720.00"),"https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80","Heritage","Easy","2-12 people","Best Seller",4.9,342,true,true},
            {"South Coast Beach Escape","Sun, Sea & Sri Lanka's Finest Shores","Relax along Sri Lanka's spectacular southern coastline from historic Galle Fort to whale-watching Mirissa and uncrowded Tangalle beaches.",7,"days",new BigDecimal("699.00"),new BigDecimal("899.00"),"https://images.unsplash.com/photo-1602002418082-a4443978a11c?w=800&q=80","Beach","Easy","2-8 people","Most Popular",4.8,289,true,true},
            {"Hill Country Tea Trail","Where Clouds Touch the Tea Fields","Sri Lanka's legendary hill country — misty peaks, waterfalls, colonial bungalows and the world's most beautiful train journey from Kandy to Ella.",6,"days",new BigDecimal("620.00"),new BigDecimal("799.00"),"https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?w=800&q=80","Nature","Moderate","2-10 people","Scenic Route",4.8,201,false,true},
            {"Wildlife Safari Adventure","Track Leopards, Elephants & More","Sri Lanka's extraordinary wildlife packed into thrilling safari drives at Yala and Udawalawe with expert naturalist guides.",5,"days",new BigDecimal("795.00"),new BigDecimal("995.00"),"https://images.unsplash.com/photo-1561553873-e8491a564fd0?w=800&q=80","Wildlife","Easy","2-6 people","Adventure Pick",4.9,178,true,true},
            {"Complete Sri Lanka Grand Tour","From Peak to Shore — The Ultimate Journey","Experience everything Sri Lanka has to offer — ancient ruins, colonial forts, lush hill country, pristine beaches and incredible wildlife.",14,"days",new BigDecimal("1499.00"),new BigDecimal("1950.00"),"https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80","Grand Tour","Easy to Moderate","2-12 people","Epic Journey",4.9,412,true,true},
            {"Sri Lanka Honeymoon Paradise","Begin Your Forever in Paradise","A romantically curated journey through luxury boutique hotels, private beach dinners, couples spa retreats and breathtaking scenery.",10,"days",new BigDecimal("1850.00"),new BigDecimal("2400.00"),"https://images.unsplash.com/photo-1439130490301-25e322d88054?w=800&q=80","Romantic","Easy","2 people","Romantic",4.9,267,true,true},
            {"Ayurveda & Wellness Retreat","Heal, Restore & Rejuvenate","Authentic Ayurveda treatments combined with yoga, meditation, organic food and the serene beauty of Sri Lanka's countryside.",8,"days",new BigDecimal("980.00"),new BigDecimal("1250.00"),"https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=800&q=80","Wellness","Easy","1-4 people","Wellness",4.8,156,false,true},
            {"Surf & Adventure Sri Lanka","Ride Waves, Chase Thrills","World-class surfing, white-water rafting, zip-lining and jungle trekking across Sri Lanka's best adventure destinations.",9,"days",new BigDecimal("750.00"),new BigDecimal("950.00"),"https://images.unsplash.com/photo-1531722569936-825d4ebd4fa5?w=800&q=80","Adventure","Moderate to Challenging","2-8 people","Thrill Seeker",4.7,198,false,true},
            {"Family Fun Sri Lanka","Adventures the Whole Family Will Love","Sri Lanka is a fantastic family destination — wildlife safaris, ancient ruins, beaches and friendly elephants for kids and adults alike.",10,"days",new BigDecimal("1100.00"),new BigDecimal("1450.00"),"https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80","Family","Easy","4-8 people","Family Choice",4.8,223,false,true},
            {"Sri Lanka Photography Expedition","Capture the Pearl of the Indian Ocean","Expert-guided tour to Sri Lanka's most photogenic locations at golden hours — from Sigiriya silhouettes to Nine Arch Bridge sunrise.",12,"days",new BigDecimal("1350.00"),new BigDecimal("1700.00"),"https://images.unsplash.com/photo-1566559532949-f82d6e0e6b3c?w=800&q=80","Photography","Moderate","4-8 people","Expert Led",4.9,134,true,false}
        };

        for (Object[] p : packages) {
            TravelPackage pkg = TravelPackage.builder()
                    .title((String) p[0]).tagline((String) p[1]).description((String) p[2])
                    .duration((Integer) p[3]).durationUnit((String) p[4])
                    .price((BigDecimal) p[5]).originalPrice((BigDecimal) p[6])
                    .imageUrl((String) p[7]).category((String) p[8]).difficulty((String) p[9])
                    .groupSize((String) p[10]).badge((String) p[11])
                    .rating((Double) p[12]).reviewCount((Integer) p[13])
                    .featured((Boolean) p[14]).popular((Boolean) p[15])
                    .build();
            packageRepository.save(pkg);
        }
        log.info("10 packages seeded");
    }
}
