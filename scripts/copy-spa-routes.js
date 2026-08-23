// Run after vite build: node scripts/copy-spa-routes.js
// Copies dist/index.html to BOTH dist/<route>.html and dist/<route>/index.html
// for each known SPA route, so GitHub Pages serves real content directly for
// either URL form (with or without a trailing slash) instead of 404.
import { mkdirSync, existsSync, readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = resolve(__dirname, "../dist");
const BASE = "https://codespanda.com";

// ------------------------------------------------------------
// Shot metadata — kept in sync with src/lib/portfolio-data.ts
// ------------------------------------------------------------
const SHOTS = [
  { id: "mobile-onboarding",  title: "Modern Mobile App Onboarding UI Design",                                    ogImage: "https://cdn.dribbble.com/userupload/48605293/file/46f9fb352f436c8fbca61d7c90bede00.png?resize=1600x&vertical=center",  desc: "A modern mobile app onboarding UI to welcome new users — welcome & splash screens, multi-step flow, illustrated highlights, sign up / log in, and smooth micro-interactions." },
  { id: "review-ratings",     title: "Review & Ratings Mobile App UI Design",                                     ogImage: "https://cdn.dribbble.com/userupload/48552476/file/349597aa213f6e59d69c16758dcf6673.png?resize=1600x&vertical=center",  desc: "A clean Review & Ratings mobile app UI — product reviews, star ratings, photo uploads, verified badges, voting, filters and community-driven discovery." },
  { id: "eyewear-app",        title: "Eyewear Shopping App UI with AI Virtual Try-On",                             ogImage: "https://cdn.dribbble.com/userupload/48552346/file/2f8b76fd7b205b7396f2c1a0fed42536.png?resize=1600x&vertical=center",  desc: "A sleek Eyewear Shopping App UI with AI-powered Virtual Try-On — browse frames, try on in real time, prescription upload, wishlist, and smooth checkout flow." },
  { id: "lingora",            title: "Lingora — Language Learning Dashboard UI",                                   ogImage: "https://cdn.dribbble.com/userupload/48552171/file/c2ca1b58a550287f7426a5c9cf1d6563.png?resize=1600x&vertical=center",  desc: "Lingora is a modern language learning dashboard UI — lesson progress, vocabulary, speaking practice, streaks, XP, leaderboard and structured learning paths." },
  { id: "coupon-deals",       title: "Coupon & Deals Mobile App UI Design",                                        ogImage: "https://cdn.dribbble.com/userupload/48552004/file/43391c824d13b2a88d34343f0a5ba296.png?resize=1600x&vertical=center",  desc: "A modern Coupon & Deals mobile app UI to discover, save, and redeem the best offers from favourite brands — deal browsing, coupon wallet, QR redemption and more." },
  { id: "empty-states",       title: "Modern Empty States & System Feedback UI",                                  ogImage: "https://cdn.dribbble.com/userupload/48542587/file/3460c2294f94cea59f9147c2763bb9a8.png?resize=1600x&vertical=center",  desc: "A comprehensive Empty States & System Feedback UI kit for admin dashboards — no data, empty inbox, search results, loading skeletons, and error states with CTAs." },
  { id: "error-state-ui",     title: "Admin Dashboard UI Design — Error State Screens & Feedback Components",   ogImage: "https://cdn.dribbble.com/userupload/48528847/file/bc22abc4c1f525fd7962f2dd012ec48a.png?resize=1600x&vertical=center",  desc: "A polished set of admin dashboard UI screens covering system feedback states — page not found, server unavailable, access restricted, maintenance mode, and more." },
  { id: "auth-ui",            title: "Modern Authentication UI — Sign In & Sign Up Admin Dashboard",             ogImage: "https://cdn.dribbble.com/userupload/48527992/file/d596976a5101c15c2c4d6e7af0b0e6be.png?resize=1600x&vertical=center",  desc: "A clean and modern Authentication UI kit — Sign In, Sign Up, Forgot Password, OTP Verification, and 2FA screens for any admin dashboard." },
  { id: "kids-learning-2",    title: "Kids Learning App UI — Designed for Curious Minds",                          ogImage: "https://cdn.dribbble.com/userupload/48516430/file/a850b9b23faa669b28f6ec25133e16c4.png?resize=1600x&vertical=center",  desc: "A fun, colorful Kids Learning App UI designed to spark curiosity — interactive lessons, quizzes, stories, and rewards for young learners." },
  { id: "gaming-streaming",   title: "Gaming Streaming Platform UI Design",                                        ogImage: "https://cdn.dribbble.com/userupload/48516145/file/522ff3393087c14a0ab23694f453ca9d.png?resize=1600x&vertical=center",  desc: "A bold and immersive Gaming Streaming Platform UI for gamers, streamers, and gaming communities — live stream discovery, channel browsing, and a content-first layout." },
  { id: "vista-streaming",    title: "Vista — Streaming Platform Dashboard UI",                                    ogImage: "https://cdn.dribbble.com/userupload/48511949/file/70b8c1ab59a4f8bcfa02415f4e01c397.png?resize=1600x&vertical=center",  desc: "Vista is a modern streaming platform admin dashboard to manage content libraries, track viewer analytics, and monitor subscription revenue." },
  { id: "digital-wellbeing",  title: "Digital Wellbeing Dashboard UI — Mobile App Design",                        ogImage: "https://cdn.dribbble.com/userupload/48511733/file/1fcec917b62d81a3e7a09c41b965a671.png?resize=1600x&vertical=center",                                                               desc: "A modern Digital Wellbeing mobile app to track screen time, manage app usage, build healthy digital habits, and achieve a better work-life balance." },
  { id: "fundora",            title: "Fundora — Fundraising Admin Dashboard UI",                                   ogImage: "https://cdn.dribbble.com/userupload/48511577/file/e5691675ccb60c962a99ba19a0e2dc0a.png?resize=1600x&vertical=center",                                                               desc: "Fundora is a modern fundraising admin dashboard for nonprofits, NGOs, and campaign managers to track donations, manage campaigns, and monitor fundraising performance in real time." },
  { id: "shopsphere",         title: "ShopSphere — Modern eCommerce Admin Dashboard UI",                           ogImage: "https://cdn.dribbble.com/userupload/48511326/file/527e48f50abb9a114d0f6e4f38ae4763.png?resize=1600x&vertical=center",                                                               desc: "ShopSphere is a modern eCommerce admin dashboard to manage products, orders, customers, and revenue analytics from a single, clean interface." },
  { id: "invoice-hub",         title: "InvoiceHub — Modern Invoice Management Admin Dashboard UI",                   ogImage: "https://cdn.dribbble.com/userupload/48511047/file/3a62b06e2d0514e597b3f2a6f1f7ae08.png?resize=1600x&vertical=center",  desc: "InvoiceHub is a modern invoice management admin dashboard for freelancers, agencies, and SaaS businesses to manage billing, track payments, and generate professional invoices." },
  { id: "vpn-app",            title: "Modern VPN App UI Design | Secure & Fast VPN Experience",                     ogImage: "https://cdn.dribbble.com/userupload/48458598/file/58700554c9882ea6b10bd4913cfdd9a5.png?resize=1600x&vertical=center",  desc: "A clean and modern VPN App UI designed to provide a seamless experience for users who value online privacy, security, and speed." },
  { id: "sos-app",            title: "SOS Emergency Mobile App UI Design | Modern Safety App UI/UX",                ogImage: "https://cdn.dribbble.com/userupload/48458324/file/eeadefcbfa7e353c7956b1f6f14cbb28.png?resize=1600x&vertical=center",  desc: "Designed a modern SOS Emergency Mobile App focused on user safety, instant emergency response, and a clean mobile experience." },
  { id: "parkease",           title: "ParkEase - Smart Parking Mobile App UI",                                      ogImage: "/images/parkease/parkease-screens.png",                                                                               desc: "Designed a clean and premium parking booking experience focused on speed, simplicity, and usability — from spot discovery to booking management." },
  { id: "stayease",           title: "StayEase – Premium Hotel & Stay Booking App UI/UX",                           ogImage: "https://cdn.dribbble.com/userupload/48433590/file/9bd80b3352265065b4e8fd55c2c1718b.png?resize=1600x&vertical=center",  desc: "Designed a modern accommodation booking experience that makes discovering, comparing, and reserving stays effortless across mobile and tablet." },
  { id: "fittrack",           title: "FitTrack – Fitness Dashboard UI/UX Design",                                   ogImage: "https://cdn.dribbble.com/userupload/48433194/file/54dafd1d122b2959c85cdb50a456714d.png?resize=1600x&vertical=center",  desc: "Designed a clean, modern fitness tracking dashboard with real-time activity insights, step tracking, calorie monitoring, and goal progress." },
  { id: "glowskin",           title: "GlowSkin – Premium Skincare E-commerce UI/UX Design",                         ogImage: "/images/glowskin/glowskin-app.png",                                                                                  desc: "A modern skincare shopping experience designed with a clean, minimal, and premium aesthetic focused on product discovery and seamless checkout." },
  { id: "homefinder",         title: "HomeFinder – Real Estate App UI",                                             ogImage: "https://cdn.dribbble.com/userupload/48428946/file/9c1a253f9271ca2eef40f13fcd738c2f.png?resize=1600x&vertical=center",  desc: "Introducing HomeFinder, a modern real estate app designed to help users discover, compare, and book property visits with ease." },
  { id: "taxi",               title: "Taxi Booking App – Modern Ride-Hailing UI",                                   ogImage: "https://cdn.dribbble.com/userupload/48428916/file/d5d9c0a771f354fa844f94e03777624b.png?resize=1600x&vertical=center",  desc: "Introducing a sleek and intuitive Taxi Booking App designed to make commuting faster, safer, and more convenient." },
  { id: "music",              title: "Music Streaming App – Premium Mobile UI",                                     ogImage: "https://cdn.dribbble.com/userupload/48428888/file/2208c59023903cfdbd8a770858bf85c2.png?resize=1600x&vertical=center",  desc: "A modern Music Streaming App concept crafted to deliver a smooth, immersive, and visually engaging listening experience for music lovers." },
  { id: "medicare",           title: "Medicare Clinic App – Healthcare Mobile UI",                                  ogImage: "https://cdn.dribbble.com/userupload/48428874/file/305c7cc46a2dd7c01b4505a827cba30a.png?resize=1600x&vertical=center",  desc: "Presenting Medicare Clinic, a modern healthcare app to simplify patient journeys — appointments, prescriptions, and medical records in one place." },
  { id: "carwash",            title: "Car Wash App – Premium Mobile UI Design",                                     ogImage: "https://cdn.dribbble.com/userupload/48428856/file/b1692d2eac5b2d971efef9d70050516c.png?resize=1600x&vertical=center",  desc: "Introducing a sleek and modern Car Wash App designed to make booking professional car cleaning services fast and hassle-free." },
  { id: "kids-learning",      title: "Kids Learning App – Fun & Interactive Education UI",                          ogImage: "https://cdn.dribbble.com/userupload/48428849/file/b15590f053e36906e3c326e8b0037929.png?resize=1600x&vertical=center",  desc: "A colorful and engaging Kids Learning App designed to make learning exciting through interactive lessons, educational games, quizzes, and rewards." },
  { id: "nexora-crm",         title: "Nexora CRM – Customer Relationship Management Dashboard",                     ogImage: "https://cdn.dribbble.com/userupload/48428810/file/8a000ead5780d0f70b22404e0bf705a4.png?resize=1600x&vertical=center",  desc: "Meet Nexora CRM, a clean and powerful CRM dashboard for sales teams — manage leads, customers, deals, and business performance in one workspace." },
  { id: "nexora-admin",       title: "Nexora – Modern Admin Dashboard UI",                                          ogImage: "https://cdn.dribbble.com/userupload/48428772/file/5dfff752d4ba735ab12e7fb1596b4bfb.png?resize=1600x&vertical=center",  desc: "Introducing Nexora, a premium admin dashboard designed for modern SaaS platforms, analytics, CRM systems, and enterprise applications." },
  { id: "interior",           title: "Interior Decoration Mobile App UI",                                           ogImage: "https://cdn.dribbble.com/userupload/48395767/file/50dd5768db3499015f2c47129e095b95.png?resize=1600x&vertical=center",  desc: "A modern Interior Design & Home Decoration App crafted to help users discover inspiration, visualize spaces, and connect with professional designers." },
  { id: "ebooks",             title: "eBooks App UI Design",                                                        ogImage: "https://cdn.dribbble.com/userupload/48395666/file/38090b0578dc2c0a8c116eba6f574b42.png?resize=1600x&vertical=center",  desc: "A modern and immersive eBooks Reading App designed to provide a seamless reading experience with intuitive navigation and personalized recommendations." },
  { id: "school",             title: "Modern School Management System UI",                                          ogImage: "https://cdn.dribbble.com/userupload/48395621/file/ed5385bc1b9d14a920740e2ab1e639de.png?resize=1600x&vertical=center",  desc: "Designed a clean, intuitive, and scalable School Management Dashboard that simplifies school administration with a modern user experience." },
  { id: "hairaura",           title: "HairAura — Hair Salon Mobile App UI",                                         ogImage: "https://cdn.dribbble.com/userupload/48384065/file/14bb3f1a7cfa72ed3ece60059d18efa3.png?resize=1600x&vertical=center",  desc: "Introducing HairAura, a modern mobile app concept crafted for salons, barbershops, and beauty studios — effortless appointment booking and premium UX." },
  { id: "harmony",            title: "Harmony — Music Streaming Mobile App UI",                                     ogImage: "https://cdn.dribbble.com/userupload/48383666/file/658944124789cb45ea88f101d40e90dd.png?resize=1600x&vertical=center",  desc: "Turn up the volume with Harmony, a modern music streaming mobile app designed for an immersive listening experience with a dark premium UI." },
  { id: "foodiego",           title: "FoodieGo – Food Delivery Mobile App UI",                                      ogImage: "https://cdn.dribbble.com/userupload/48382846/file/64573c11b8b0a1be7152f6aca031e266.png?resize=1600x&vertical=center",  desc: "A modern food delivery app designed for a fast, seamless ordering experience — restaurant discovery, live tracking, and smooth checkout flow." },
  { id: "beauty",             title: "Beauty – Skincare & Cosmetics Mobile App UI",                                 ogImage: "https://cdn.dribbble.com/userupload/48382648/file/0a5d636721be2f19f249d8e619b25e1d.png?resize=1600x&vertical=center",  desc: "A modern Beauty App designed to deliver a premium and personalized beauty experience with skincare recommendations and virtual try-on concepts." },
  { id: "waygo",              title: "WayGo – Smart Car Travel & Road Trip App UI",                                 ogImage: "https://cdn.dribbble.com/userupload/48382528/file/aa6a0e741643075677007509e84962f7.png?resize=1600x&vertical=center",  desc: "Introducing WayGo, a modern car travel app designed to make every journey smoother, safer, and more enjoyable with real-time navigation and trip planning." },
  { id: "lumiere",            title: "Lumière – Luxury Jewellery Shopping App UI",                                  ogImage: "https://cdn.dribbble.com/userupload/48382451/file/29030de9676a10220bc00fd11425a8c0.png?resize=1600x&vertical=center",  desc: "Presenting Lumière, a premium jewellery shopping app crafted to deliver an elegant and seamless luxury shopping experience." },
  { id: "nutrifit",           title: "NutriFit – Healthy Products Marketplace & Nutrition App",                     ogImage: "https://cdn.dribbble.com/userupload/48382384/file/ca37eb18d8162ee6e60fa86ff1765587.png?resize=1600x&vertical=center",  desc: "A premium mobile app to make healthy living simple — e-commerce marketplace for healthy food, supplements, vitamins, and personalized nutrition." },
  { id: "cornerstone-concept",title: "Cornerstone — Modern SaaS Landing Page Concept",                             ogImage: "https://cdn.dribbble.com/userupload/48374253/file/02b3fb23eca26da995334122e0312616.png?resize=1600x&vertical=center",  desc: "Designed a clean, conversion-focused SaaS landing page for Cornerstone — modern UI aesthetics, strong visual hierarchy, and responsive layouts." },
  { id: "jewellery-pos",      title: "Luxury Jewellery POS System UI",                                              ogImage: "https://cdn.dribbble.com/userupload/48352742/file/eabdff5b900405caebff8966aab75c11.png?resize=1600x&vertical=center",  desc: "A premium Jewellery POS interface for modern gold, diamond, and luxury jewellery retailers with billing, inventory, and live gold rate widgets." },
  { id: "cafe-pos",           title: "Modern Cafe POS Dashboard UI",                                                ogImage: "https://cdn.dribbble.com/userupload/48352511/file/dc1d653eb8fca924ae59ed3b9a9e50de.png?resize=1600x&vertical=center",  desc: "A modern POS interface crafted for cafés, coffee shops, bakeries, and restaurants with real-time order management and seamless checkout." },
  { id: "posymart",           title: "PosyMart – Modern Cafe POS Dashboard UI",                                     ogImage: "https://cdn.dribbble.com/userupload/48348855/file/d2cbadf714e1d580584e9cf4c18ca64b.png?resize=1600x&vertical=center",  desc: "Designed a clean and intuitive POS dashboard for cafés, coffee shops, and quick-service restaurants — fast checkout, order management, and analytics." },
  { id: "ecommerce-admin",    title: "Modern E-commerce Admin Dashboard UI",                                        ogImage: "https://cdn.dribbble.com/userupload/48345044/file/8c846958df5b8380504e514909da26fc.png?resize=1600x&vertical=center",  desc: "A modern e-commerce admin dashboard for managing online stores — sales analytics, product catalog, order tracking, customers, and inventory." },
  { id: "greenerp",           title: "GreenERP – Modern ERP Dashboard | Finance & Business Management",             ogImage: "https://cdn.dribbble.com/userupload/48345010/file/5926d17423734369f3b1b96fcd14ba00.png?resize=1600x&vertical=center",  desc: "GreenERP is a modern ERP dashboard focused on readability and data visualization — revenue analytics, expense tracking, accounts, and cash flow." },
  { id: "pos-system",         title: "Modern POS System Dashboard UI | Retail & Inventory Management",              ogImage: "https://cdn.dribbble.com/userupload/48337334/file/3516d78ded90812a9dfc4f0bb352bec9.png?resize=1600x&vertical=center",  desc: "A modern POS system UI designed to simplify retail operations — billing, payments, inventory, customer management, and real-time analytics." },
  { id: "lumia",              title: "Lumia — Photo Editor & Camera Mobile App UI",                                 ogImage: "https://cdn.dribbble.com/userupload/48336808/file/77dd9bc508039e6f9dec8aeff69025e1.png?resize=1600x&vertical=center",  desc: "Lumia is a sleek photo editor and camera app UI designed for mobile photographers with intuitive controls for filters, color grading, and adjustments." },
  { id: "hireai",             title: "HireAI – AI Recruitment Platform Landing Page | HR Tech SaaS UI",            ogImage: "https://cdn.dribbble.com/userupload/48336424/file/9ca36d05aa64805a2064e64500de0955.png?resize=1600x&vertical=center",  desc: "HireAI is an AI-powered recruitment platform landing page showcasing HR tech with job discovery, AI candidate matching, and automated screening." },
  { id: "sprout",             title: "Fitness App – Sprout",                                                        ogImage: "https://cdn.dribbble.com/userupload/48335728/file/9c4b869034b496df839f8d1afbedea5b.png?resize=1600x&vertical=center",  desc: "Sprout is a fitness and nutrition mobile app focused on healthy habit building, meal tracking, and workout planning with a fresh green UI." },
  { id: "dashboard-app",      title: "Dashboard App",                                                               ogImage: "https://cdn.dribbble.com/userupload/48314457/file/2452e5212803865172c1a5b0ba1d4ad7.png?resize=1600x&vertical=center",  desc: "A modern analytics dashboard UI featuring clean data visualizations, KPI cards, activity feeds, and responsive layouts for SaaS applications." },
  { id: "kanban",             title: "Kanban System",                                                               ogImage: "https://cdn.dribbble.com/userupload/48299475/file/280fb3a7d107ab4e28c715e2cd0a56bd.jpg?resize=1600x&vertical=center",  desc: "A clean Kanban board UI for project and task management with drag-and-drop columns, card-based tasks, priority labels, and team workflows." },
  { id: "portfolio-web",      title: "Portfolio Website",                                                           ogImage: "https://cdn.dribbble.com/userupload/48263820/file/96e3e8b728e63303ae21058a57539e78.jpg?resize=1600x&vertical=center",  desc: "A minimal portfolio website design showcasing creative work with a clean grid layout, project thumbnails, and an elegant personal brand aesthetic." },
  { id: "design-system",      title: "Design System",                                                               ogImage: "https://cdn.dribbble.com/userupload/48171736/file/5e36dc51773c761ecec3de901459e8c9.png?resize=1600x&vertical=center",  desc: "A comprehensive UI design system featuring design tokens, reusable components, typography scales, color palettes, spacing systems, and interaction patterns." },
  { id: "dating-app",         title: "Dating Mobile App",                                                           ogImage: "https://cdn.dribbble.com/userupload/48141694/file/3b51d9f8552b85887dfcc705901742e4.png?resize=1600x&vertical=center",  desc: "A modern dating mobile app UI with a card-based swipe interface, match discovery, real-time messaging, and profile management." },
  { id: "calories-app",       title: "Calories Calculator App",                                                     ogImage: "https://cdn.dribbble.com/userupload/48141845/file/944f45928663280a0275f5e2f5c8d5f6.png?resize=1600x&vertical=center",  desc: "A calories calculator mobile app with meal logging, macro breakdowns, daily calorie targets, and progress tracking for healthy eating habits." },
  { id: "ecommerce-app",      title: "Ecommerce App Design",                                                        ogImage: "https://cdn.dribbble.com/userupload/48141928/file/57da89a9ebb6a94671a36c0d061d0935.png?resize=1600x&vertical=center",  desc: "A clean e-commerce mobile app design featuring product discovery, category browsing, cart management, and a smooth checkout flow." },
  { id: "car-app",            title: "Car Design App",                                                              ogImage: "https://cdn.dribbble.com/userupload/48142602/file/13424fd8b2ca9dbaf5c0671c109a39d3.png?resize=1600x&vertical=center",  desc: "A car design and showcase app with immersive vehicle imagery, specification cards, color selection, and booking flows — premium dark UI." },
  { id: "cricket-app",        title: "Cricket Scoring App",                                                         ogImage: "https://cdn.dribbble.com/userupload/48143099/file/7d89fe1b9846995b7b6b86b248a3c13f.png?resize=1600x&vertical=center",  desc: "A cricket scoring app UI for tracking live match scores, player statistics, innings breakdowns, and detailed scorecards." },
  { id: "crypto-app",         title: "Crypto App",                                                                  ogImage: "https://cdn.dribbble.com/userupload/48143470/file/fe2f35a8a38c63be8c1dced0e466e791.png?resize=1600x&vertical=center",  desc: "A cryptocurrency tracking app with portfolio overview, live price charts, market cap data, and watchlist management — modern dark fintech UI." },
  { id: "employee-mgmt",      title: "Employee Management Dashboard",                                               ogImage: "https://cdn.dribbble.com/userupload/48146939/file/e8382ebfa6660d6f821ee0ab290602fe.png?resize=1600x&vertical=center",  desc: "An employee management dashboard with comprehensive HR workflows — attendance, payroll, leave requests, department analytics, and performance reviews." },
  { id: "fresh-grocery",      title: "Fresh Grocery App – Mobile UI Design",                                        ogImage: "https://cdn.dribbble.com/userupload/48656188/file/21b60f15ddd2c4f01ff495c7ecfef30c.png?resize=1600x&vertical=center",  desc: "A fresh, intuitive, and conversion-focused grocery shopping experience — product discovery, smart categories, cart, offers, and a quick checkout flow." },
  { id: "carwash-pro",        title: "CarWash Pro – A Smarter Way to Manage Your Car Wash Business",               ogImage: "https://cdn.dribbble.com/userupload/48692893/file/337f13a3c835810a6c61b69a2a914aa0.png?resize=1600x&vertical=center",  desc: "A clean, modern car wash management dashboard — appointments, customers, vehicles, services, staff, inventory, and revenue in one place." },
  { id: "logistics-driver-management", title: "Modern Logistics Driver Management UI",                             ogImage: "https://cdn.dribbble.com/userupload/48702701/file/9546cb2c1ce09c077066f67e7d6a0b8e.png?resize=1600x&vertical=center",  desc: "A mobile driver app and tablet operations dashboard concept — real-time load visibility, route tracking, earnings, and fleet activity." },
  { id: "messaging-calling-app", title: "Modern Messaging & Calling App UI/UX Concept",                             ogImage: "https://cdn.dribbble.com/userupload/48702804/file/50e19800c02353aa77306d8101f9f5dd.png?resize=1600x&vertical=center",  desc: "A clean, modern communication app concept — messaging, voice and video calls, contacts, and call history in a simple mobile experience." },
  { id: "furniture-app",      title: "Furniture App UI Design",                                                    ogImage: "https://cdn.dribbble.com/userupload/48720201/file/2cc1c9ff529e649dba24103bd6e12fe0.png?resize=1600x&vertical=center",  desc: "A modern furniture shopping app concept — product discovery, categories, filters, wishlist, and a conversion-focused checkout flow." },
  { id: "ancient-wisdom",     title: "Ancient Wisdom, Reimagined for Mobile",                                      ogImage: "https://cdn.dribbble.com/userupload/48733928/file/349dae96794aafc45a0167d77a672556.png?resize=1600x&vertical=center",  desc: "A clean and calming Ayurvedic wellness app UI bringing traditional remedies into a modern digital experience." },
  { id: "healthcare-appointment", title: "Healthcare Appointment App – Mobile UI",                                 ogImage: "https://cdn.dribbble.com/userupload/48749322/file/29e4904871659abc8c10b9b2e753a375.png?resize=1600x&vertical=center",  desc: "A clean mobile UI concept for a healthcare appointment experience — doctor discovery, availability, and visit management." },
  { id: "food-delivery-concept", title: "Food Delivery App – Mobile UI Concept",                                   ogImage: "https://cdn.dribbble.com/userupload/48763336/file/ff32b57e4631bbb24c85a0feb1efa81e.png?resize=1600x&vertical=center",  desc: "A clean, modern food delivery experience — restaurant discovery, menu exploration, and a minimal, conversion-focused checkout." },
  { id: "fitequip",           title: "FitEquip – Fitness Equipment Shopping App",                                  ogImage: "https://cdn.dribbble.com/userupload/48774788/file/619bd3427cfb0151200fd5ed8bfb3a93.png?resize=1600x&vertical=center",  desc: "A clean, modern mobile e-commerce experience for discovering and purchasing fitness equipment." },
  { id: "event-management",   title: "Event Management Mobile App UI/UX Concept",                                  ogImage: "https://cdn.dribbble.com/userupload/48786630/file/5fc33c67c5a78ec4b02ebc7beea3cd47.png?resize=1600x&vertical=center",  desc: "A clean, modern mobile experience for event management — attendees, schedules, tickets, and revenue in one place." },
  { id: "personal-finance-crypto-dashboard", title: "Personal Finance & Crypto Dashboard UI",                        ogImage: "https://cdn.dribbble.com/userupload/48790917/file/4eddc5f1f6cff5f5f93fffbbf3f281d2.png?resize=1600x&vertical=center",  desc: "A clean mobile finance experience for portfolio tracking, crypto assets, spending insights, and everyday transactions." },
  { id: "fitflow",            title: "FitFlow — Modern Fitness App UI",                                            ogImage: "https://cdn.dribbble.com/userupload/48797805/file/ec0964f9cb2409c10f8298070f50d8d0.png?resize=1600x&vertical=center",  desc: "A clean, premium dual-theme fitness dashboard — workout streaks, water intake, mindful minutes, and weekly progress." },
];

// Static routes (non-shot pages)
const STATIC_ROUTES = [
  "/templates",
  "/templates/ca-firm",
  "/templates/finovo",
  "/templates/hamara-bharat",
  "/templates/eva-autocare",
  "/templates/deepcity-care",
  "/templates/cornerstone",
  "/templates/flowers",
  "/templates/brisk-admin",
  "/templates/alpine-admin-react",
  "/templates/portfolio-template",
  "/portfolio",
  "/blog",
  "/legal/privacy",
  "/legal/terms",
  "/legal/security",
];

// Blog post metadata — kept in sync with src/lib/blog-data.ts
const BLOG_POSTS = [
  { slug: "will-ai-replace-junior-developers", title: "Will AI Replace Junior Developers?", desc: "AI can now generate components, write functions, and debug errors in minutes. AI may replace some junior-level tasks, but it won't eliminate the need for junior developers.", ogImage: `${BASE}/images/blogs/will-ai-replace-junior-developers.webp` },
  { slug: "ai-powered-saas-development-2026", title: "AI-Powered SaaS Development: Building Smarter Software for 2026", desc: "Adding a chatbot to an existing app is no longer enough. Businesses want AI-native SaaS platforms that understand data, automate workflows, and help users decide faster.", ogImage: `${BASE}/images/blogs/ai-powered-saas-development-2026.webp` },
  { slug: "vibe-coding-future-of-software-development", title: "Vibe Coding: The Future of Software Development?", desc: "AI-powered coding tools are changing how developers write, test, and ship software. Is vibe coding a passing trend, or a fundamental shift in how software gets built?", ogImage: `${BASE}/images/blogs/vibe-coding-future-of-software-development.webp` },
  { slug: "signs-your-business-needs-custom-web-application", title: "7 Signs Your Business Needs a Custom Web Application", desc: "Off-the-shelf software is a great starting point, but as operations get more complex, generic tools start creating limitations instead of solving problems.", ogImage: `${BASE}/images/blogs/signs-your-business-needs-custom-web-application.webp` },
  { slug: "ai-powered-web-application-from-scratch", title: "How to Build an AI-Powered Web Application From Scratch", desc: "Building an AI-powered web application is not just about connecting an AI API to a website. A practical roadmap covering UX, architecture, models, RAG, security, and cost control.", ogImage: `${BASE}/images/blogs/ai-powered-web-application-from-scratch.webp` },
  { slug: "why-we-built-codespanda",             title: "Why We Built CodesPanda: Free Admin Dashboards That Don't Feel Free", desc: "There are plenty of free admin dashboard templates on the internet. But 'free' often doesn't mean production-ready — here's the frustration that became the starting point for CodesPanda.", ogImage: `${BASE}/images/blogs/why-we-built-codespanda.webp` },
  { slug: "shadcn-vs-mui-vs-antd",                title: "shadcn/ui vs Material UI vs Ant Design: Picking a Component Library in 2026", desc: "The honest trade-offs between the three component approaches we get asked about most — and why most of our templates ended up on shadcn/ui." },
  { slug: "admin-dashboard-design-mistakes",      title: "10 Mistakes to Avoid When Designing an Admin Dashboard", desc: "Dense data screens forgive bad decisions less than marketing pages do. Here's what we've had to walk back across a dozen dashboard builds." },
  { slug: "figma-to-production-workflow",         title: "From Figma to Production: Our Design-to-Code Workflow", desc: "How a template goes from a Figma file to a shipped, typed, responsive React page — and where we deliberately skip \"pixel-perfect\" for speed." },
  { slug: "why-vite-for-admin-panels",            title: "Why Vite Is the Right Call for a Modern React Admin Panel", desc: "Cold start, HMR speed, and a build output that doesn't fight you — the practical reasons every CodesPanda template is built on Vite." },
  { slug: "theme-shadcn-dashboard-in-10-minutes", title: "How to Theme a shadcn/ui Dashboard in Under 10 Minutes", desc: "A practical walkthrough of swapping every CodesPanda template's color system to your own brand — one CSS file, no component edits." },
];

// Shot & blog routes derived from their data arrays
const SHOT_ROUTES = SHOTS.map((s) => `/portfolio/${s.id}`);
const BLOG_ROUTES = BLOG_POSTS.map((p) => `/blog/${p.slug}`);

const ROUTES = [...STATIC_ROUTES, ...SHOT_ROUTES, ...BLOG_ROUTES];

// Per-route static meta injected into the pre-rendered HTML so crawlers and
// social scrapers see correct title/description/canonical before JS runs.
const PAGE_META = {
  "/": {
    title: "Admin Dashboard Templates & UI Kits | CodesPanda",
    description: "Premium & free admin dashboard templates built with React, Vite & Tailwind. Modern dashboard design for SaaS, CRM, HR, POS & more — ship faster.",
    ogImage: `${BASE}/og-image.png`,
  },
  "/templates": {
    title: "Browse Admin Dashboard Templates | CodesPanda",
    description: "Explore our full library of admin dashboard templates — SaaS, HR, CRM, healthcare, auto-service & POS. Every template is free, React + Tailwind ready.",
    ogImage: `${BASE}/og-image.png`,
  },
  "/templates/ca-firm": {
    title: "Your CA Firm — Financial & Advisory Landing Page | CodesPanda",
    description: "Your CA Firm is a free React template for chartered accountants and financial advisory firms — services, industries, engagement models, testimonials, Careers and Contact pages.",
    ogImage: `${BASE}/images/ca-firm/hero.webp`,
  },
  "/templates/finovo": {
    title: "Finovo — Accounting & ERP Admin Dashboard | CodesPanda",
    description: "Finovo is a free accounting/ERP admin dashboard template — invoicing, purchases, banking, payroll, inventory & GST/TDS tax filing. React, Vite & Tailwind CSS.",
    ogImage: `${BASE}/images/finovo/dashboard.webp`,
  },
  "/templates/hamara-bharat": {
    title: "Hamara Bharat — Travel Landing Page Template | CodesPanda",
    description: "Hamara Bharat is a free React travel landing page template — cinematic hero, interactive map, trip planner, festivals and food trails.",
    ogImage: `${BASE}/images/hamarabharat/hero.png`,
  },
  "/templates/eva-autocare": {
    title: "Eva AutoCare — Auto-Service Admin Dashboard | CodesPanda",
    description: "Eva AutoCare is a free auto-service admin dashboard template — appointments, work orders, vehicles, technicians & invoicing. React, Vite & Tailwind CSS.",
    ogImage: `${BASE}/images/eva-autocare/dashboard.png`,
  },
  "/templates/deepcity-care": {
    title: "DeepCity Care — Healthcare Dashboard Template | CodesPanda",
    description: "DeepCity Care is a free hospital admin dashboard template — appointments, patients, billing, pharmacy & inventory. React, Vite & Tailwind CSS.",
    ogImage: `${BASE}/images/deepcity-care/dashboard.png`,
  },
  "/templates/cornerstone": {
    title: "Cornerstone — SaaS Admin Dashboard Template | CodesPanda",
    description: "Cornerstone is a free SaaS admin dashboard template — 30+ pages for customers, orders, billing & analytics. Built with React, Vite, Tailwind CSS & TypeScript.",
    ogImage: `${BASE}/images/cornerstone-dashboard-2.png`,
  },
  "/templates/flowers": {
    title: "Flowers POS — Retail POS Dashboard Template | CodesPanda",
    description: "Flowers POS is a free retail POS admin dashboard template — product grid, cart, coupons, orders, customers & reports. React, Vite & Tailwind CSS.",
    ogImage: `${BASE}/images/flowers/pos-counter.png`,
  },
  "/templates/brisk-admin": {
    title: "Brisk Admin — Free CRM Dashboard Template | CodesPanda",
    description: "Brisk Admin is a free CRM admin dashboard template — clean layouts with shadcn/ui components, enterprise UI polish, fully responsive. React, Vite & Tailwind CSS.",
    ogImage: `${BASE}/images/brisk/dashboard.png`,
  },
  "/templates/alpine-admin-react": {
    title: "Alpine Admin React — HR Dashboard Template | CodesPanda",
    description: "Alpine Admin React is a free HR admin dashboard template — 30+ pages for employees, payroll, attendance & leave management. React, Vite & Tailwind CSS.",
    ogImage: `${BASE}/images/alpine/dashboard.webp`,
  },
  "/templates/portfolio-template": {
    title: "Portfolio Template — Free React Portfolio | CodesPanda",
    description: "Portfolio Template is a free React developer portfolio built with Vite & Tailwind CSS. Showcase your work, experience & projects — fully customizable.",
    ogImage: `${BASE}/images/portfolio/portfolio.jpg`,
  },
  "/portfolio": {
    title: "UI/UX Portfolio — Dashboard & Product Design | CodesPanda",
    description: "Case studies in dashboard design, admin dashboard UI, and product design — from SaaS admin panels to mobile app UX. See the design thinking behind CodesPanda templates.",
    ogImage: "https://cdn.dribbble.com/userupload/48428945/file/007a381ab43254d9a40ffde8369916a5.png?format=webp&resize=400x300&vertical=center",
  },
  "/blog": {
    title: "Blog — Admin Dashboard Design & React Engineering | CodesPanda",
    description: "Notes on admin dashboard design, React engineering, and shadcn/ui theming from the team building CodesPanda's free React templates.",
  },
  "/legal/privacy": {
    title: "Privacy Policy — CodesPanda",
    description: "Privacy policy for CodesPanda — how we collect, use and protect your data.",
  },
  "/legal/terms": {
    title: "Terms of Service — CodesPanda",
    description: "Terms of service for CodesPanda React templates.",
  },
  "/legal/security": {
    title: "Security — CodesPanda",
    description: "Security policy for CodesPanda.",
  },
};

// Auto-populate PAGE_META for all shot pages
for (const shot of SHOTS) {
  PAGE_META[`/portfolio/${shot.id}`] = {
    title: `${shot.title} — CodesPanda Portfolio`,
    description: shot.desc,
    ogImage: shot.ogImage,
  };
}

// Auto-populate PAGE_META for all blog posts. Most posts use a
// gradient+icon cover (no photo asset) and fall back to the site-wide
// og-image.png already baked into the base HTML; posts with a real
// cover photo set `ogImage` above and it's used here instead.
for (const post of BLOG_POSTS) {
  PAGE_META[`/blog/${post.slug}`] = {
    title: `${post.title} — CodesPanda Blog`,
    description: post.desc,
    ...(post.ogImage ? { ogImage: post.ogImage } : {}),
  };
}

// Each page's eager/fetchPriority=high hero <img> src
const HERO_IMAGE = {
  "/": "/images/alpine-dashboard.webp",
  "/templates": "/images/hamarabharat/hero.webp",
  "/templates/finovo": "/images/finovo/dashboard.webp",
  "/templates/alpine-admin-react": "/images/alpine/dashboard.webp",
  "/templates/brisk-admin": "/images/brisk/dashboard.webp",
  "/templates/portfolio-template": "/images/portfolio/portfolio.webp",
  "/templates/cornerstone": "/images/cornerstone-dashboard-2.webp",
  "/templates/flowers": "/images/flowers/pos-counter.webp",
  "/templates/deepcity-care": "/images/deepcity-care/dashboard.webp",
  "/templates/eva-autocare": "/images/eva-autocare/dashboard.webp",
  "/templates/hamara-bharat": "/images/hamarabharat/hero.webp",
  "/templates/ca-firm": "/images/ca-firm/hero.webp",
  "/blog/vibe-coding-future-of-software-development": "/images/blogs/vibe-coding-future-of-software-development.webp",
  "/blog/signs-your-business-needs-custom-web-application": "/images/blogs/signs-your-business-needs-custom-web-application.webp",
  "/blog/ai-powered-web-application-from-scratch": "/images/blogs/ai-powered-web-application-from-scratch.webp",
  "/blog/ai-powered-saas-development-2026": "/images/blogs/ai-powered-saas-development-2026.webp",
  "/blog/will-ai-replace-junior-developers": "/images/blogs/will-ai-replace-junior-developers.webp",
  "/blog/why-we-built-codespanda": "/images/blogs/why-we-built-codespanda.webp",
};

// Route → JSON-LD @type for the structured-data block injected statically
// into <head> below, so crawlers/tools that don't execute JS still see
// valid schema (the richer per-page schema some components inject via
// react-helmet-async — e.g. Alpine's FAQPage — still layers on top once JS
// runs; this is a baseline that's always present).
const SCHEMA_TYPE = {
  "/templates": "collection",
  "/portfolio": "collection",
  "/blog": "blog",
  "/templates/ca-firm": "software",
  "/templates/finovo": "software",
  "/templates/hamara-bharat": "software",
  "/templates/eva-autocare": "software",
  "/templates/deepcity-care": "software",
  "/templates/cornerstone": "software",
  "/templates/flowers": "software",
  "/templates/brisk-admin": "software",
  "/templates/alpine-admin-react": "software",
  "/templates/portfolio-template": "software",
};

function schemaTypeFor(route) {
  if (SCHEMA_TYPE[route]) return SCHEMA_TYPE[route];
  if (route.startsWith("/portfolio/") && route !== "/portfolio") return "creativework";
  if (route.startsWith("/blog/") && route !== "/blog") return "blogpost";
  return null;
}

function buildStructuredData(route, meta) {
  const type = schemaTypeFor(route);
  if (!type || !meta) return null;
  const canonical = `${BASE}${route}`;
  const name = meta.title.split(" — ")[0].split(" | ")[0].trim();

  if (type === "software") {
    return {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name,
      description: meta.description,
      image: meta.ogImage,
      url: canonical,
      applicationCategory: "DesignApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      aggregateRating: { "@type": "AggregateRating", ratingValue: "5", reviewCount: "1", bestRating: "5", worstRating: "1" },
    };
  }
  if (type === "collection") {
    return {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: meta.title,
      description: meta.description,
      url: canonical,
    };
  }
  if (type === "creativework") {
    return {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      name,
      description: meta.description,
      image: meta.ogImage,
      url: canonical,
      author: { "@type": "Person", name: "Deepak Kumar" },
    };
  }
  if (type === "blog") {
    return {
      "@context": "https://schema.org",
      "@type": "Blog",
      name: meta.title,
      description: meta.description,
      url: canonical,
    };
  }
  if (type === "blogpost") {
    return {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: name,
      description: meta.description,
      url: canonical,
      ...(meta.ogImage ? { image: meta.ogImage } : {}),
      author: { "@type": "Organization", name: "CodesPanda" },
      publisher: { "@type": "Organization", name: "CodesPanda" },
    };
  }
  return null;
}

// Minimal escaping for text dropped into the static <noscript> fallback —
// our own authored copy, not user input, but escaped defensively anyway.
function escapeHtml(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// Where the noscript fallback's "back" link should point, per route shape.
function backLinkFor(route) {
  if (route.startsWith("/portfolio/") && route !== "/portfolio") {
    return { href: `${BASE}/portfolio`, label: "← Back to Portfolio" };
  }
  if (route.startsWith("/blog/") && route !== "/blog") {
    return { href: `${BASE}/blog`, label: "← Back to Blog" };
  }
  if (route.startsWith("/templates/")) {
    return { href: `${BASE}/templates`, label: "← Back to Templates" };
  }
  if (route.startsWith("/legal/")) {
    return { href: BASE, label: "← Back to Home" };
  }
  return null; // "/", "/templates", "/portfolio", "/blog" — no back link needed
}

function withHeroPreload(html, route) {
  const heroSrc = HERO_IMAGE[route];
  if (!heroSrc) return html;
  const tag = `<link rel="preload" as="image" fetchpriority="high" href="${heroSrc}" />\n    `;
  return html.replace("<meta name=\"viewport\"", tag + "<meta name=\"viewport\"");
}

// Inject per-page title, description, canonical and og tags into the <head>
// before React boots, so crawlers and social scrapers see correct metadata.
function withPageMeta(html, route) {
  const meta = PAGE_META[route];
  if (!meta) return html;

  const canonical = `${BASE}${route}`;
  const isArticlePage =
    (route.startsWith("/portfolio/") && route !== "/portfolio") ||
    (route.startsWith("/blog/") && route !== "/blog");
  const ogType = isArticlePage ? "article" : "website";

  // Replace <title>
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${meta.title}</title>`);

  // Strip generic fallback og:image / twitter:image from base HTML so the
  // per-route injection below wins and crawlers don't pick up the wrong image.
  if (meta.ogImage) {
    html = html.replace(/[ \t]*<!-- Social fallback[^\n]*\n/g, "");
    html = html.replace(/[ \t]*<meta property="og:image" content="https:\/\/codespanda\.com\/og-image\.png"[^>]*>\r?\n/g, "");
    html = html.replace(/[ \t]*<meta property="og:image:width"[^>]*>\r?\n/g, "");
    html = html.replace(/[ \t]*<meta property="og:image:height"[^>]*>\r?\n/g, "");
    html = html.replace(/[ \t]*<meta property="og:image:alt"[^>]*>\r?\n/g, "");
    html = html.replace(/[ \t]*<meta name="twitter:image" content="https:\/\/codespanda\.com\/og-image\.png"[^>]*>\r?\n/g, "");
    html = html.replace(/[ \t]*<meta name="twitter:image:alt"[^>]*>\r?\n/g, "");
  }

  // Build the injection block (goes right after <meta name="viewport">)
  const inject = [
    `<meta name="description" content="${meta.description}" />`,
    `<meta name="robots" content="index, follow" />`,
    `<link rel="canonical" href="${canonical}" />`,
    `<meta property="og:type" content="${ogType}" />`,
    `<meta property="og:title" content="${meta.title}" />`,
    `<meta property="og:description" content="${meta.description}" />`,
    `<meta property="og:url" content="${canonical}" />`,
    meta.ogImage ? `<meta property="og:image" content="${meta.ogImage}" />` : "",
    meta.ogImage ? `<meta property="og:image:alt" content="${meta.title}" />` : "",
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${meta.title}" />`,
    `<meta name="twitter:description" content="${meta.description}" />`,
    meta.ogImage ? `<meta name="twitter:image" content="${meta.ogImage}" />` : "",
    meta.ogImage ? `<meta name="twitter:image:alt" content="${meta.title}" />` : "",
  ].filter(Boolean).join("\n    ");

  // Insert after viewport meta
  html = html.replace(
    /(<meta name="viewport"[^/]*\/>)/,
    `$1\n    ${inject}`
  );

  // Static structured data (in addition to whatever a page's own
  // react-helmet-async schema adds once JS runs) — see buildStructuredData.
  const structuredData = buildStructuredData(route, meta);
  if (structuredData) {
    const script = `\n    <script type="application/ld+json">${JSON.stringify(structuredData)}</script>`;
    html = html.replace("</head>", `${script}\n  </head>`);
  }

  // Inject a <noscript> body block with real text content so crawlers/tools
  // that don't execute JS see meaningful content — prevents soft-404
  // detection and gives every route a text fallback, not just shot pages.
  if (meta.description) {
    const back = backLinkFor(route);
    const links = [
      back ? `<a href="${back.href}">${escapeHtml(back.label)}</a>` : "",
      back && back.href === BASE ? "" : `<a href="${BASE}">CodesPanda — React Admin Templates</a>`,
    ].filter(Boolean).join(" | ");
    const noscript = `\n    <noscript>\n      <article style="font-family:sans-serif;max-width:800px;margin:40px auto;padding:0 20px">\n        <h1>${escapeHtml(meta.title)}</h1>\n        <p>${escapeHtml(meta.description)}</p>\n        <p>${links}</p>\n      </article>\n    </noscript>`;
    html = html.replace('<div id="root"></div>', `<div id="root"></div>${noscript}`);
  }

  return html;
}

const indexHtml = resolve(DIST, "index.html");
if (!existsSync(indexHtml)) {
  console.error("dist/index.html not found — run vite build first");
  process.exit(1);
}

const baseHtml = readFileSync(indexHtml, "utf-8");

// Patch the root index.html in place
writeFileSync(indexHtml, withPageMeta(withHeroPreload(baseHtml, "/"), "/"));

let written = 0;
for (const route of ROUTES) {
  let html = withHeroPreload(baseHtml, route);
  html = withPageMeta(html, route);

  const flatTarget = resolve(DIST, "." + route + ".html");
  mkdirSync(dirname(flatTarget), { recursive: true });
  writeFileSync(flatTarget, html);

  const dirTarget = resolve(DIST, "." + route, "index.html");
  mkdirSync(dirname(dirTarget), { recursive: true });
  writeFileSync(dirTarget, html);
  written++;
}
console.log(`✓ wrote index.html to ${written * 2 + 1} SPA route paths (with per-route meta + hero preload)`);
