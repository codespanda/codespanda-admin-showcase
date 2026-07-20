export interface Shot {
  id: string;
  title: string;
  category: string;
  tags: string[];
  dribbbleUrl: string;
  imgUrl: string;         // thumbnail (400×300)
  fullImgUrl: string;     // full-quality shot image from Dribbble
  gallery?: string[];     // additional full-res images for multi-image shots
  description?: string;   // shot description / case study text
}

export const SHOTS: Shot[] = [
  {
    id: "homefinder",
    title: "HomeFinder – Real Estate App UI",
    category: "Mobile App",
    tags: ["Real Estate", "Mobile", "iOS", "Property"],
    dribbbleUrl: "https://dribbble.com/shots/27570937-HomeFinder-Real-Estate-App-UI",
    imgUrl: "https://cdn.dribbble.com/userupload/48428945/file/007a381ab43254d9a40ffde8369916a5.png?format=webp&resize=400x300&vertical=center",
    fullImgUrl: "https://cdn.dribbble.com/userupload/48428946/file/9c1a253f9271ca2eef40f13fcd738c2f.png?resize=1600x&vertical=center",
    gallery: [
      "https://cdn.dribbble.com/userupload/48428947/file/78ffd09add910bce0ae55755c8a607b4.png?resize=1600x&vertical=center",
      "https://cdn.dribbble.com/userupload/48428948/file/c1fc65d1c302d4915984cf98d8e05472.png?resize=1600x&vertical=center",
      "https://cdn.dribbble.com/userupload/48428949/file/5c216d8476685ca51d573f70fa57ff72.png?resize=1600x&vertical=center",
    ],
    description: `Introducing HomeFinder, a modern real estate app designed to help users discover, compare, and book property visits with ease. The UI combines elegant visuals, intuitive navigation, and a premium user experience for buying, renting, or selling homes.

✨ Features

• Advanced Property Search
• Interactive Map View
• Buy, Rent & Sell Listings
• Property Details with Photo Gallery
• Virtual 3D Home Tours
• AI Property Recommendations
• Mortgage & EMI Calculator
• Save Favorites & Compare Properties
• Schedule Property Visits
• Chat with Agents
• Secure Document Management
• Light & Dark Mode

Designed with a clean layout, premium cards, immersive imagery, and responsive interactions to make property hunting simple and enjoyable.

Looking to build a real estate platform or property management solution?

CodesPanda creates premium UI/UX for real estate, SaaS, fintech, AI products, dashboards, and mobile applications.

🌐 https://codespanda.com

Appreciate this design if you like it, and share your feedback!`,
  },
  {
    id: "taxi",
    title: "Taxi Booking App – Modern Ride-Hailing UI",
    category: "Mobile App",
    tags: ["Transport", "Mobile", "Maps", "Booking"],
    dribbbleUrl: "https://dribbble.com/shots/27570927-Taxi-Booking-App-Modern-Ride-Hailing-UI",
    imgUrl: "https://cdn.dribbble.com/userupload/48428915/file/562e4d15b7907764481ed5a363bd31f5.png?format=webp&resize=400x300&vertical=center",
    fullImgUrl: "https://cdn.dribbble.com/userupload/48428916/file/d5d9c0a771f354fa844f94e03777624b.png?resize=1600x&vertical=center",
    gallery: [
      "https://cdn.dribbble.com/userupload/48428917/file/678ee60149f388d8ce1c274adcdcda6e.png?resize=1600x&vertical=center",
      "https://cdn.dribbble.com/userupload/48428918/file/1790a94cf88d856237995adcdc43e114.png?resize=1600x&vertical=center",
      "https://cdn.dribbble.com/userupload/48428919/file/af27151452ac8626a3a2c817a136a881.png?resize=1600x&vertical=center",
    ],
    description: `Introducing a sleek and intuitive Taxi Booking App designed to make commuting faster, safer, and more convenient. From booking a ride in seconds to tracking your driver in real time, every screen is crafted for a seamless user experience.

✨ Features

• Instant Ride Booking
• Live Driver Tracking
• Interactive Maps & Route Navigation
• Multiple Ride Categories
• Fare Estimation
• Schedule a Ride
• Secure Cashless Payments
• Saved Places & Trip History
• Promo Codes & Rewards
• Driver Ratings & Reviews
• SOS & Emergency Contact
• Light & Dark Mode

Designed with a modern design system, premium UI components, smooth user flows, and responsive layouts for both iOS and Android.

Looking to build a ride-hailing, logistics, or on-demand service app?

CodeSpanda creates premium UI/UX for startups, SaaS platforms, mobile applications, dashboards, and enterprise software.

🌐 https://codespanda.com

If you like this design, don't forget to appreciate it and share your feedback!`,
  },
  {
    id: "music",
    title: "Music Streaming App – Premium Mobile UI",
    category: "Mobile App",
    tags: ["Music", "Streaming", "Mobile", "Audio"],
    dribbbleUrl: "https://dribbble.com/shots/27570919-Music-Streaming-App-Premium-Mobile-UI-Design",
    imgUrl: "https://cdn.dribbble.com/userupload/48428887/file/32c7e194726aa5f05a714a769d63e5b7.png?format=webp&resize=400x300&vertical=center",
    fullImgUrl: "https://cdn.dribbble.com/userupload/48428888/file/2208c59023903cfdbd8a770858bf85c2.png?resize=1600x&vertical=center",
    gallery: [
      "https://cdn.dribbble.com/userupload/48428889/file/61db6763ec13e66d13d35b5c7222de38.png?resize=1600x&vertical=center",
    ],
    description: `Experience music like never before with this modern Music Streaming App concept, crafted to deliver a smooth, immersive, and visually engaging listening experience. Designed with premium UI components, vibrant gradients, and seamless navigation for music lovers.

✨ Features

• Personalized Home Feed
• Trending Songs & Albums
• Smart AI Recommendations
• Curated Playlists
• Artist Profiles
• Lyrics with Real-Time Sync
• High-Quality Audio Streaming
• Offline Downloads
• Favorites & Library
• Podcasts & Audiobooks
• Equalizer Settings
• Light & Dark Mode

Designed with elegant typography, fluid animations, and a clean design system to create an enjoyable music experience across iOS and Android.

Looking to build a music, entertainment, or streaming platform?

CodeSpanda creates premium UI/UX for mobile apps, SaaS platforms, dashboards, AI products, and modern web applications.

🌐 https://codespanda.com

If you enjoyed this design, don't forget to appreciate it and share your feedback!`,
  },
  {
    id: "medicare",
    title: "Medicare Clinic App – Healthcare Mobile UI",
    category: "Mobile App",
    tags: ["Healthcare", "Mobile", "Clinic", "Medical"],
    dribbbleUrl: "https://dribbble.com/shots/27570916-Medicare-Clinic-App-Healthcare-Mobile-UI",
    imgUrl: "https://cdn.dribbble.com/userupload/48428873/file/08dc80fd09d37bab9005fa432f0b4cbf.png?format=webp&resize=400x300&vertical=center",
    fullImgUrl: "https://cdn.dribbble.com/userupload/48428874/file/305c7cc46a2dd7c01b4505a827cba30a.png?resize=1600x&vertical=center",
    gallery: [
      "https://cdn.dribbble.com/userupload/48428875/file/47406e4511c34164a1c0a2752a3bdc8e.png?resize=1600x&vertical=center",
    ],
  },
  {
    id: "carwash",
    title: "Car Wash App – Premium Mobile UI Design",
    category: "Mobile App",
    tags: ["Automotive", "Mobile", "Services", "Booking"],
    dribbbleUrl: "https://dribbble.com/shots/27570910-Car-Wash-App-Premium-Mobile-UI-Design",
    imgUrl: "https://cdn.dribbble.com/userupload/48428855/file/38417a4205c335711f45b5d6dadc0906.png?format=webp&resize=400x300&vertical=center",
    fullImgUrl: "https://cdn.dribbble.com/userupload/48428856/file/b1692d2eac5b2d971efef9d70050516c.png?resize=1600x&vertical=center",
    gallery: [
      "https://cdn.dribbble.com/userupload/48428857/file/22deec58a8fc6a5ff15d62d29ed7f2e8.png?resize=1600x&vertical=center",
    ],
    description: `Introducing a sleek and modern Car Wash App designed to make booking professional car cleaning services fast and hassle-free. The UI focuses on a seamless booking experience, real-time service tracking, and secure payments with a premium visual aesthetic.

✨ Features

• Instant Car Wash Booking
• Doorstep Car Wash Services
• Service Packages & Pricing
• Live Booking Status
• Schedule & Recurring Washes
• Membership & Subscription Plans
• Secure Online Payments
• Service History
• Ratings & Reviews
• Exclusive Offers & Coupons
• Push Notifications
• Light & Dark Mode

Designed with clean layouts, smooth interactions, premium gradients, and a user-friendly experience for both customers and service providers.

Looking to build a custom mobile app or SaaS platform?

CodeSpanda creates premium UI/UX for startups, automotive businesses, SaaS products, dashboards, and mobile applications.

🌐 https://codespanda.com

If you like this design, don't forget to appreciate it and share your feedback!`,
  },
  {
    id: "kids-learning",
    title: "Kids Learning App – Fun & Interactive Education UI",
    category: "Mobile App",
    tags: ["Education", "Kids", "Mobile", "Interactive"],
    dribbbleUrl: "https://dribbble.com/shots/27570908-Kids-Learning-App-Fun-Interactive-Education-UI",
    imgUrl: "https://cdn.dribbble.com/userupload/48428848/file/ad536a86275f4a7c8e06d9a264795070.png?format=webp&resize=400x300&vertical=center",
    fullImgUrl: "https://cdn.dribbble.com/userupload/48428849/file/b15590f053e36906e3c326e8b0037929.png?resize=1600x&vertical=center",
    gallery: [
      "https://cdn.dribbble.com/userupload/48428850/file/3ecddb94ac669d5e85e6bd4bedd587b9.png?resize=1600x&vertical=center",
      "https://cdn.dribbble.com/userupload/48428851/file/2aa25aef0625f19feb26c25b36372f7d.png?resize=1600x&vertical=center",
    ],
    description: `Introducing a colorful and engaging Kids Learning App designed to make learning exciting through interactive lessons, educational games, quizzes, and rewards. The interface combines playful illustrations with an intuitive user experience that's perfect for young learners.

✨ Features

• Interactive Learning Modules
• Alphabet, Numbers & Phonics
• Math & Science Activities
• Educational Games & Quizzes
• Daily Learning Goals
• Progress Tracking
• Achievement Badges & Rewards
• Read-Along Storybooks
• Parent Dashboard
• Teacher Assignments
• Safe Child-Friendly Interface
• Light & Dark Mode Support

Designed with vibrant colors, playful animations, rounded UI components, and accessibility in mind to create a delightful learning experience for children.

Looking for a custom education platform or mobile app?

CodesPanda designs premium UI/UX for EdTech platforms, SaaS products, mobile apps, dashboards, and websites.

🌐 https://codespanda.com

If you enjoyed this design, don't forget to appreciate it and share your feedback!`,
  },
  {
    id: "nexora-crm",
    title: "Nexora CRM – Customer Relationship Management Dashboard",
    category: "Web Dashboard",
    tags: ["CRM", "Dashboard", "SaaS", "Business"],
    dribbbleUrl: "https://dribbble.com/shots/27570895-Nexora-CRM-Modern-Customer-Relationship-Management-Dashboard",
    imgUrl: "https://cdn.dribbble.com/userupload/48428809/file/dd59ecd16de5b38a04913ae3e3a41d84.png?format=webp&resize=400x300&vertical=center",
    fullImgUrl: "https://cdn.dribbble.com/userupload/48428810/file/8a000ead5780d0f70b22404e0bf705a4.png?resize=1600x&vertical=center",
    gallery: [
      "https://cdn.dribbble.com/userupload/48428811/file/be15ca0b12ff0f2d85788fdfbfc71c8b.png?resize=1600x&vertical=center",
    ],
    description: `Meet Nexora CRM, a clean and powerful CRM dashboard designed to help sales teams manage leads, customers, deals, and business performance from a single workspace.

Built with a modern SaaS design language, intuitive navigation, and data-driven components to improve productivity and streamline customer relationships.

✨ Features

• Sales Dashboard & KPIs
• Lead Management
• Customer Profiles
• Deal & Pipeline Tracking
• Contact Management
• Task & Activity Timeline
• Calendar & Meeting Scheduler
• Email & Communication Center
• Sales Analytics & Reports
• Team Performance Insights
• Notifications & Reminders
• Light & Dark Mode

Designed with reusable components, responsive layouts, and a scalable design system for startups and enterprise businesses alike.

Looking for a custom CRM, ERP, SaaS platform, or enterprise dashboard?

CodesPanda creates premium UI/UX for web applications, mobile apps, AI products, and business management software.

🌐 https://codespanda.com

Appreciate the design if you like it, and share your feedback!`,
  },
  {
    id: "nexora-admin",
    title: "Nexora – Modern Admin Dashboard UI",
    category: "Web Dashboard",
    tags: ["Admin", "Dashboard", "Web", "Analytics"],
    dribbbleUrl: "https://dribbble.com/shots/27570880-Nexora-Modern-Admin-Dashboard-UI",
    imgUrl: "https://cdn.dribbble.com/userupload/48428771/file/b8a48af6185f892a43f98727c988c171.png?format=webp&resize=400x300&vertical=center",
    fullImgUrl: "https://cdn.dribbble.com/userupload/48428772/file/5dfff752d4ba735ab12e7fb1596b4bfb.png?resize=1600x&vertical=center",
    gallery: [
      "https://cdn.dribbble.com/userupload/48428773/file/34ed077cf02ccb5a0bc475a23849dcd4.png?resize=1600x&vertical=center",
    ],
    description: `Introducing Nexora, a premium admin dashboard designed for modern SaaS platforms, analytics, CRM systems, and enterprise applications. The interface focuses on clarity, performance, and scalability with a clean visual hierarchy and data-driven components.

✨ Highlights

• Analytics Overview
• Interactive Charts & Reports
• User & Role Management
• Sales & Revenue Insights
• Project & Task Tracking
• Orders & Transactions
• Calendar & Scheduling
• Notifications & Activity Feed
• Responsive Layout
• Light & Dark Mode
• Reusable Design System
• Modern Data Tables & Forms

Built with consistency, accessibility, and productivity in mind to help teams manage complex workflows with ease.

Need a custom dashboard or SaaS platform?

CodesPanda builds premium UI/UX for admin panels, CRM, ERP, AI products, finance platforms, and mobile applications.

🌐 https://codespanda.com

If you like this design, leave an appreciation and let me know your thoughts!`,
  },
  {
    id: "interior",
    title: "Interior Decoration Mobile App UI",
    category: "Mobile App",
    tags: ["Interior", "Lifestyle", "Mobile", "Design"],
    dribbbleUrl: "https://dribbble.com/shots/27561784-Interior-Decoration-Mobile-App-UI",
    imgUrl: "https://cdn.dribbble.com/userupload/48395766/file/ddcadd8b0251dcc24a0c806af4add348.png?format=webp&resize=400x300&vertical=center",
    fullImgUrl: "https://cdn.dribbble.com/userupload/48395767/file/50dd5768db3499015f2c47129e095b95.png?resize=1600x&vertical=center",
    gallery: [
      "https://cdn.dribbble.com/userupload/48395768/file/9d97a4f48b5b46b0472c9f1775d28c49.png?resize=1600x&vertical=center",
    ],
    description: `A modern Interior Design & Home Decoration App crafted to help users discover inspiration, visualize spaces, and connect with professional designers—all through a clean and elegant mobile experience.

✨ Features

• Browse Interior Design Ideas
• AI Room Inspiration
• Furniture & Decor Catalog
• Mood Boards & Collections
• 3D Room Visualization
• Designer Profiles
• Book Interior Consultations
• Wishlist & Saved Designs
• Smart Search & Filters
• Modern Minimal UI

Designed with a premium aesthetic, smooth interactions, and a visually rich interface to inspire beautiful living spaces.

Looking to build a stunning mobile app or web platform?

CodesPanda designs high-quality UI/UX for startups, SaaS products, mobile apps, dashboards, and websites.

🌐 https://codespanda.com

If you enjoyed this concept, don't forget to appreciate and share your feedback!`,
  },
  {
    id: "ebooks",
    title: "eBooks App UI Design",
    category: "Mobile App",
    tags: ["Books", "Reading", "Mobile", "Library"],
    dribbbleUrl: "https://dribbble.com/shots/27561762-eBooks-App-UI-Design",
    imgUrl: "https://cdn.dribbble.com/userupload/48395665/file/2280d34aae0d94ad41842ea56195dff6.png?crop=0x0-1448x1086&format=webp&resize=400x300&vertical=center",
    fullImgUrl: "https://cdn.dribbble.com/userupload/48395666/file/38090b0578dc2c0a8c116eba6f574b42.png?resize=1600x&vertical=center",
    gallery: [
      "https://cdn.dribbble.com/userupload/48395667/file/816bc594203de032011d95402e274bad.png?resize=1600x&vertical=center",
    ],
    description: `A modern and immersive eBooks Reading App designed to provide a seamless reading experience with a clean interface, intuitive navigation, and personalized recommendations.

✨ Features

• Personalized Book Recommendations
• Explore by Categories & Genres
• Beautiful Book Details
• Reading Progress Tracking
• Bookmarks & Highlights
• Dark & Light Reading Modes
• Offline Reading
• Audiobook Support
• Smart Search & Filters
• Wishlist & Favorites

Designed with a minimalist aesthetic, smooth interactions, and a reader-first experience to make discovering and enjoying books effortless.

Looking for a custom mobile app or SaaS product?

CodesPanda creates premium UI/UX for startups, SaaS platforms, mobile apps, dashboards, and websites.

🌐 https://codespanda.com

If you like this design, don't forget to like and share your feedback!`,
  },
  {
    id: "school",
    title: "Modern School Management System UI",
    category: "Web Dashboard",
    tags: ["Education", "ERP", "Dashboard", "Management"],
    dribbbleUrl: "https://dribbble.com/shots/27561743-Modern-School-Management-System-UI",
    imgUrl: "https://cdn.dribbble.com/userupload/48395620/file/086413a064eeecc3df96c0de6dce7aeb.png?crop=1x0-1366x1024&format=webp&resize=400x300&vertical=center",
    fullImgUrl: "https://cdn.dribbble.com/userupload/48395621/file/ed5385bc1b9d14a920740e2ab1e639de.png?resize=1600x&vertical=center",
    description: `Designed a clean, intuitive, and scalable School Management Dashboard that simplifies school administration with a modern user experience.

✨ Features

• Student Management
• Teacher & Staff Portal
• Attendance Tracking
• Timetable Management
• Fee & Payment Management
• Exam & Result Analytics
• Parent Communication
• Library & Transport Management
• Responsive Dashboard
• Light & Dark UI Support

Built with a focus on usability, accessibility, and data visualization to help schools manage daily operations efficiently.

Need a custom web or mobile app for your business?

CodesPanda specializes in modern UI/UX design, web applications, SaaS products, dashboards, and mobile apps.

🌐 https://codespanda.com

Your feedback is always appreciated!`,
  },
  {
    id: "hairaura",
    title: "HairAura — Hair Salon Mobile App UI",
    category: "Mobile App",
    tags: ["Beauty", "Salon", "Booking", "Mobile"],
    dribbbleUrl: "https://dribbble.com/shots/27558538-HairAura-Hair-Salon-Mobile-App-UI-Design",
    imgUrl: "https://cdn.dribbble.com/userupload/48384064/file/3ea40e0302256ac0e76ddbd4b75ef161.png?format=webp&resize=400x300&vertical=center",
    fullImgUrl: "https://cdn.dribbble.com/userupload/48384065/file/14bb3f1a7cfa72ed3ece60059d18efa3.png?resize=1600x&vertical=center",
    description: `Introducing HairAura, a modern mobile app concept crafted for salons, barbershops, and beauty studios. The design focuses on effortless appointment booking, premium aesthetics, and a seamless user experience.

✨ Features

• Online appointment booking
• Browse services & pricing
• Hairstylist profiles
• Real-time availability
• Beauty packages & offers
• Loyalty rewards
• Secure online payments
• Appointment reminders
• Reviews & ratings
• Elegant light & dark UI

Designed with a clean, premium interface to help salons provide a smooth digital experience for their customers while maintaining a luxurious brand identity.

Designed by CodesPanda

🌐 https://codespanda.com

If you enjoyed this design, please appreciate it and follow for more UI/UX inspiration.`,
  },
  {
    id: "harmony",
    title: "Harmony — Music Streaming Mobile App UI",
    category: "Mobile App",
    tags: ["Music", "Streaming", "Dark UI", "Mobile"],
    dribbbleUrl: "https://dribbble.com/shots/27558401-Harmony-Music-Streaming-Mobile-App-UI-Design",
    imgUrl: "https://cdn.dribbble.com/userupload/48383665/file/0905ac32058bb8c3b8720d030b0e8793.png?crop=76x25-1364x990&format=webp&resize=400x300&vertical=center",
    fullImgUrl: "https://cdn.dribbble.com/userupload/48383666/file/658944124789cb45ea88f101d40e90dd.png?resize=1600x&vertical=center",
    description: `Turn up the volume with Harmony, a modern music streaming mobile app designed for an immersive listening experience.

✨ Features

• Clean and premium UI
• Personalized recommendations
• Trending playlists
• Album & artist discovery
• Lyrics support
• Music player with smooth animations
• Dark mode interface
• Seamless navigation

Designed with a focus on simplicity, usability, and a premium user experience. Perfect inspiration for music streaming platforms, entertainment apps, and modern mobile UI.

Designed by CodesPanda

🌐 https://codespanda.com

If you like this design, don't forget to appreciate and follow for more UI/UX inspiration!`,
  },
  {
    id: "foodiego",
    title: "FoodieGo – Food Delivery Mobile App UI",
    category: "Mobile App",
    tags: ["Food", "Delivery", "Mobile", "eCommerce"],
    dribbbleUrl: "https://dribbble.com/shots/27558165-FoodieGo-Food-Delivery-Mobile-App-UI",
    imgUrl: "https://cdn.dribbble.com/userupload/48382845/file/5d0fa90b32817e57c87ba0e296221ef7.png?crop=5x0-1371x1024&format=webp&resize=400x300&vertical=center",
    fullImgUrl: "https://cdn.dribbble.com/userupload/48382846/file/64573c11b8b0a1be7152f6aca031e266.png?resize=1600x&vertical=center",
    description: `Excited to share my latest UI/UX concept for FoodieGo, a modern food delivery app designed to provide a fast, seamless, and enjoyable ordering experience. The app features restaurant discovery, smart search, personalized recommendations, live order tracking, multiple payment options, exclusive offers, favorites, reviews, and a streamlined checkout flow.

The design focuses on vibrant visuals, intuitive navigation, clean layouts, and a scalable design system that enhances usability while creating an engaging food ordering experience. Every screen is crafted to balance aesthetics with functionality, making it easy for users to discover, order, and enjoy their favorite meals.

Looking to build a custom website, mobile app, SaaS platform, or digital product?

🌐 Visit https://codespanda.com for professional UI/UX design and full-stack development support.

Your feedback and appreciation are always welcome!`,
  },
  {
    id: "beauty",
    title: "Beauty – Skincare & Cosmetics Mobile App UI",
    category: "Mobile App",
    tags: ["Beauty", "eCommerce", "Mobile", "Skincare"],
    dribbbleUrl: "https://dribbble.com/shots/27558126-Beauty-Skincare-Cosmetics-Mobile-App-UI",
    imgUrl: "https://cdn.dribbble.com/userupload/48382647/file/df8f648a9b58daf5bec3672d81da93ca.png?crop=1x55-1219x969&format=webp&resize=400x300&vertical=center",
    fullImgUrl: "https://cdn.dribbble.com/userupload/48382648/file/0a5d636721be2f19f249d8e619b25e1d.png?resize=1600x&vertical=center",
    description: `Excited to share my latest UI/UX exploration for a modern Beauty App designed to deliver a premium and personalized beauty experience. The app features skincare recommendations, makeup discovery, personalized beauty routines, product collections, virtual try-on concepts, appointment booking, wishlist, secure checkout, and order tracking.

The interface combines elegant typography, soft color palettes, clean layouts, and intuitive interactions to create a luxurious yet user-friendly experience. Every screen is crafted with attention to detail, ensuring effortless navigation and an engaging shopping journey.

Looking to build a custom website, mobile app, SaaS platform, or digital product?

🌐 Visit https://codespanda.com for professional UI/UX design and full-stack development support.

Your feedback and appreciation are always welcome!`,
  },
  {
    id: "waygo",
    title: "WayGo – Smart Car Travel & Road Trip App UI",
    category: "Mobile App",
    tags: ["Travel", "Maps", "Mobile", "Navigation"],
    dribbbleUrl: "https://dribbble.com/shots/27558077-WayGo-Smart-Car-Travel-Road-Trip-App-UI",
    imgUrl: "https://cdn.dribbble.com/userupload/48382527/file/24e2135e2ef0b106f03dcce61b92e4bb.png?format=webp&resize=400x300&vertical=center",
    fullImgUrl: "https://cdn.dribbble.com/userupload/48382528/file/aa6a0e741643075677007509e84962f7.png?resize=1600x&vertical=center",
    description: `Introducing WayGo, a modern car travel app designed to make every journey smoother, safer, and more enjoyable. The experience features intuitive trip planning, real-time navigation, route optimization, nearby fuel stations, EV charging locations, hotel and restaurant discovery, travel history, expense tracking, and personalized travel recommendations.

The interface blends clean layouts, interactive maps, elegant typography, and a contemporary design system to create a seamless experience for both daily commuters and road trip enthusiasts. Every screen is crafted with usability, accessibility, and visual consistency in mind.

Looking to build a custom website, mobile app, SaaS platform, or digital product?

🌐 Visit https://codespanda.com for professional UI/UX design and full-stack development support.

Your feedback and appreciation are always welcome!`,
  },
  {
    id: "lumiere",
    title: "Lumière – Luxury Jewellery Shopping App UI",
    category: "Mobile App",
    tags: ["Luxury", "eCommerce", "Mobile", "Jewellery"],
    dribbbleUrl: "https://dribbble.com/shots/27558047-Lumi-re-Luxury-Jewellery-Shopping-App-UI",
    imgUrl: "https://cdn.dribbble.com/userupload/48382450/file/d2d97e5fd0fccbfa83a13006ef8bdadb.png?format=webp&resize=400x300&vertical=center",
    fullImgUrl: "https://cdn.dribbble.com/userupload/48382451/file/29030de9676a10220bc00fd11425a8c0.png?resize=1600x&vertical=center",
    gallery: [
      "https://cdn.dribbble.com/userupload/48382476/file/884fa7ae4dba3abd3c3abc6d635e75a5.png?resize=1600x&vertical=center",
    ],
    description: `Presenting Lumière, a premium jewellery shopping app crafted to deliver an elegant and seamless luxury shopping experience. The design combines sophisticated typography, refined layouts, immersive product galleries, wishlists, secure checkout, personalized recommendations, order tracking, and a smooth user journey.

The interface embraces a clean, modern aesthetic with premium visual hierarchy, creating a shopping experience that reflects the timeless beauty of fine jewellery. Every screen is designed to inspire trust, elegance, and effortless browsing.

Looking to build a premium website, mobile app, SaaS platform, or custom digital product?

🌐 Visit https://codespanda.com for professional UI/UX design and full-stack development support.

Your feedback and appreciation are always welcome!`,
  },
  {
    id: "nutrifit",
    title: "NutriFit – Healthy Products Marketplace & Nutrition App",
    category: "Mobile App",
    tags: ["Health", "Marketplace", "Mobile", "Nutrition"],
    dribbbleUrl: "https://dribbble.com/shots/27558023-NutriFit-Healthy-Products-Marketplace-Nutrition-App",
    imgUrl: "https://cdn.dribbble.com/userupload/48382383/file/95f4d46958f18967169881d0c35b8f7f.png?crop=0x0-1448x1086&format=webp&resize=400x300&vertical=center",
    fullImgUrl: "https://cdn.dribbble.com/userupload/48382384/file/ca37eb18d8162ee6e60fa86ff1765587.png?resize=1600x&vertical=center",
    description: `A premium mobile app concept designed to make healthy living simple. NutriFit combines a modern e-commerce experience with personalized nutrition, allowing users to discover, compare, and purchase healthy food, supplements, protein, vitamins, organic products, and wellness essentials—all from one intuitive platform.

The design focuses on clean layouts, vibrant visuals, seamless shopping, AI-powered recommendations, smart search, product categories, secure checkout, subscription plans, and personalized wellness journeys.

✨ Highlights

• Modern & Minimal UI
• Product Discovery
• Healthy Food Marketplace
• AI Recommendations
• Nutrition Insights
• Secure Checkout
• Wishlist & Cart
• Order Tracking
• Responsive Design

🌐 Visit https://codespanda.com for professional design and development solutions.

Feedback and appreciation are always welcome!`,
  },
  {
    id: "cornerstone-concept",
    title: "Cornerstone — Modern SaaS Landing Page Concept",
    category: "Web Design",
    tags: ["SaaS", "Landing Page", "Web", "Marketing"],
    dribbbleUrl: "https://dribbble.com/shots/27555844-Cornerstone-Modern-SaaS-Landing-Page-Concept",
    imgUrl: "https://cdn.dribbble.com/userupload/48374252/file/ab74d5a0b6603db80b317f093d387282.png?crop=4x3-2660x1995&format=webp&resize=400x300&vertical=center",
    fullImgUrl: "https://cdn.dribbble.com/userupload/48374253/file/02b3fb23eca26da995334122e0312616.png?resize=1600x&vertical=center",
    description: `Designed a clean, conversion-focused landing page for Cornerstone, blending modern UI aesthetics with intuitive UX. The interface emphasizes clarity, strong visual hierarchy, premium typography, subtle gradients, glassmorphism accents, and responsive layouts to create a polished digital experience.

The goal was to build a landing page that feels fast, trustworthy, and enterprise-ready while maintaining excellent readability and accessibility.

✨ Highlights

• Modern Hero Section
• Premium UI Components
• Responsive Grid System
• Glassmorphism Elements
• Clean Typography
• High Conversion Layout
• CTA-Focused Design
• Performance-Oriented UX
• Dark & Light Ready
• Pixel Perfect Design

Feedback is always welcome!

🌐 Live Preview: https://cornerstone.codespanda.com/

Also visit https://codespanda.com/ for more`,
  },
  {
    id: "jewellery-pos",
    title: "Luxury Jewellery POS System UI",
    category: "Web Dashboard",
    tags: ["POS", "Retail", "Luxury", "Dashboard"],
    dribbbleUrl: "https://dribbble.com/shots/27549892-Luxury-Jewellery-POS-System-UI",
    imgUrl: "https://cdn.dribbble.com/userupload/48352741/file/d793edb97b0e4e9f9cdff79e7af38b2d.png?crop=215x48-1280x847&format=webp&resize=400x300&vertical=center",
    fullImgUrl: "https://cdn.dribbble.com/userupload/48352742/file/eabdff5b900405caebff8966aab75c11.png?resize=1600x&vertical=center",
    gallery: [
      "https://cdn.dribbble.com/userupload/48352743/file/0342ab480ee31ddd9484e3e0b847021f.png?resize=1600x&vertical=center",
    ],
    description: `A premium Jewellery Point of Sale (POS) interface designed for modern gold, diamond, and luxury jewellery retailers. This concept combines elegant visuals with enterprise-grade functionality, enabling faster billing, inventory tracking, customer management, and real-time gold rate integration.

Designed with a clean luxury aesthetic, the dashboard delivers a seamless experience for high-end retail environments while keeping workflows efficient for sales staff.

✨ Highlights

• Premium Jewellery Product Catalog
• Fast Billing & Checkout Workflow
• Live Gold Rate Widget
• Weight-Based Pricing (22K / 24K)
• Inventory & Stock Management
• Customer & Supplier Management
• Order & Invoice Management
• Offers & Discount Management
• Sales Reports & Analytics
• Barcode Scanning Support
• Touch-Friendly POS Interface
• Modern Luxury UI with Golden Theme

Looking for a custom POS, ERP, CRM, Inventory System, or SaaS Dashboard?

CodesPanda helps startups and businesses build modern digital products with world-class UI/UX.

Our Expertise

• POS Systems
• Jewellery ERP Solutions
• Restaurant & Retail POS
• SaaS Dashboard Design
• CRM & ERP Platforms
• React & Next.js Development
• Flutter Mobile Apps
• UI/UX Design Systems
• AI-Powered Business Applications

🌐 https://codespanda.com

Have a project in mind? Let's build something exceptional together.`,
  },
  {
    id: "cafe-pos",
    title: "Modern Cafe POS Dashboard UI",
    category: "Web Dashboard",
    tags: ["POS", "Cafe", "Dashboard", "Restaurant"],
    dribbbleUrl: "https://dribbble.com/shots/27549817-Modern-Cafe-POS-Dashboard-UI",
    imgUrl: "https://cdn.dribbble.com/userupload/48352510/file/80981154068851e0919cf9d4c043c787.png?crop=228x144-1198x872&format=webp&resize=400x300&vertical=center",
    fullImgUrl: "https://cdn.dribbble.com/userupload/48352511/file/dc1d653eb8fca924ae59ed3b9a9e50de.png?resize=1600x&vertical=center",
    gallery: [
      "https://cdn.dribbble.com/userupload/48352512/file/d54d10e2fc994d74be7b2d4a44f7574a.png?resize=1600x&vertical=center",
    ],
    description: `A modern Point of Sale (POS) interface crafted for cafés, coffee shops, bakeries, and restaurants. Designed with a clean dark theme, intuitive product browsing, real-time order management, and a seamless checkout experience to help staff serve customers faster.

The dashboard focuses on speed, usability, and beautiful visual hierarchy while maintaining an enterprise-ready workflow for high-volume businesses.

✨ Key Features

• Product Catalog with Categories
• Live Order Management
• Fast & Secure Checkout
• Inventory Integration
• Customer Management
• Sales & Reports
• Instant Product Search
• Modern Dark UI
• Responsive Design
• Optimized for Touchscreen POS Devices

Need a Custom SaaS, POS, CRM, ERP, or Mobile App?

We design and develop high-performance digital products that help businesses grow.

🌐 https://codespanda.com

Our Services

• UI/UX Design
• SaaS Dashboard Design
• POS Systems
• CRM & ERP Solutions
• Mobile Apps (iOS & Android)
• Web Applications
• React, Next.js & Flutter Development
• Branding & Product Design

Let's build your next digital product with CodesPanda.`,
  },
  {
    id: "posymart",
    title: "PosyMart – Modern Cafe POS Dashboard UI",
    category: "Web Dashboard",
    tags: ["POS", "Retail", "Dashboard", "Cafe"],
    dribbbleUrl: "https://dribbble.com/shots/27548893-PosyMart-Modern-Cafe-POS-Dashboard-UI",
    imgUrl: "https://cdn.dribbble.com/userupload/48348854/file/1ca69ebd22c0a91c3feca98e7dd5dccf.png?format=webp&resize=400x300&vertical=center",
    fullImgUrl: "https://cdn.dribbble.com/userupload/48348855/file/d2cbadf714e1d580584e9cf4c18ca64b.png?resize=1600x&vertical=center",
    gallery: [
      "https://cdn.dribbble.com/userupload/48348856/file/a3c97f284fa05017509ed882e04d7948.png?resize=1600x&vertical=center",
    ],
    description: `Designed a clean and intuitive Point of Sale dashboard tailored for cafés, coffee shops, bakeries, and quick-service restaurants. The goal was to create a fast, distraction-free checkout experience while giving business owners instant access to sales, orders, customers, and inventory.

This concept combines modern aesthetics with practical workflows to help staff serve customers faster and manage daily operations effortlessly.

✨ Highlights

• Real-time Sales Dashboard
• Smart Order & Cart Management
• Product Categories & Menu Grid
• Quick Add-to-Cart Experience
• Customer & Order Analytics
• Average Order Value Tracking
• Inventory Ready Architecture
• Multi-User Support
• Modern SaaS Design System
• Responsive & Scalable UI

Every component was crafted with usability, consistency, and speed in mind—perfect for modern hospitality businesses.

Need a Custom SaaS or POS Solution?

At CodesPanda, we design and develop modern digital products that help businesses grow.

• SaaS Platforms
• POS Systems
• CRM & ERP Dashboards
• AI-Powered Applications
• Mobile Apps (iOS & Android)
• Enterprise Web Applications
• UI/UX Design & Frontend Development

🌐 https://codespanda.com

Available for freelance projects, startups, and long-term product partnerships.`,
  },
  {
    id: "ecommerce-admin",
    title: "Modern E-commerce Admin Dashboard UI",
    category: "Web Dashboard",
    tags: ["eCommerce", "Admin", "Dashboard", "Retail"],
    dribbbleUrl: "https://dribbble.com/shots/27547992-Modern-E-commerce-Admin-Dashboard-UI",
    imgUrl: "https://cdn.dribbble.com/userupload/48345043/file/6cd58e618bd997f5ddd81ee1ed9a1505.png?crop=1x4-1611x1212&format=webp&resize=400x300&vertical=center",
    fullImgUrl: "https://cdn.dribbble.com/userupload/48345044/file/8c846958df5b8380504e514909da26fc.png?resize=1600x&vertical=center",
  },
  {
    id: "greenerp",
    title: "GreenERP – Modern ERP Dashboard | Finance & Business Management",
    category: "Web Dashboard",
    tags: ["ERP", "Finance", "Dashboard", "Business"],
    dribbbleUrl: "https://dribbble.com/shots/27547980-GreenERP-Modern-ERP-Dashboard-Finance-Business-Management",
    imgUrl: "https://cdn.dribbble.com/userupload/48345009/file/2549f699604211aa243470251f05faa1.png?crop=2x2-1833x1375&format=webp&resize=400x300&vertical=center",
    fullImgUrl: "https://cdn.dribbble.com/userupload/48345010/file/5926d17423734369f3b1b96fcd14ba00.png?resize=1600x&vertical=center",
    description: `GreenERP is a modern ERP dashboard focused on readability, data visualization, and productivity. The interface covers revenue analytics, expense tracking, cash flow, accounts receivable, product sales, and recent activities.

Built using a minimal design system with spacious layouts, soft shadows, and green accent colors for a professional enterprise experience.

Looking to build a custom ERP, CRM, or business management platform?

CodesPanda creates premium UI/UX for enterprise dashboards, SaaS platforms, finance tools, and web applications.

🌐 https://codespanda.com`,
  },
];

export function getShotById(id: string): Shot | undefined {
  return SHOTS.find((s) => s.id === id);
}
