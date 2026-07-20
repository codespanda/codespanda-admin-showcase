export interface Shot {
  id: string;
  title: string;
  category: string;
  tags: string[];
  dribbbleUrl: string;
  imgUrl: string;         // thumbnail (400×300)
  fullImgUrl?: string;    // full-quality shot image from Dribbble
  gallery?: string[];     // additional full-res images for multi-image shots
  description?: string;   // shot description / case study text
}

export const SHOTS: Shot[] = [
  {
    id: "stayease",
    title: "StayEase – Premium Hotel & Stay Booking App UI/UX",
    category: "Mobile App",
    tags: ["Hotel", "Travel", "Booking", "Mobile"],
    dribbbleUrl: "https://dribbble.com/shots/27572253-StayEase-Premium-Hotel-Stay-Booking-App-UI-UX",
    imgUrl: "https://cdn.dribbble.com/userupload/48433589/file/2d85cad03c44980fd3711a71602404fe.png?format=webp&resize=400x300&vertical=center",
    fullImgUrl: "https://cdn.dribbble.com/userupload/48433590/file/9bd80b3352265065b4e8fd55c2c1718b.png?resize=1600x&vertical=center",
    description: `Designed a modern accommodation booking experience that makes discovering, comparing, and reserving stays effortless. The interface focuses on premium visuals, intuitive navigation, seamless booking, and a delightful user experience across mobile and tablet devices.

The design blends elegant typography, immersive imagery, clean layouts, and smooth interactions to create a trustworthy travel platform.

✨ Highlights

• Beautiful Home Screen
• Smart Destination Search
• Hotel & Apartment Listings
• Interactive Maps
• Wishlist & Saved Stays
• Booking & Payment Flow
• Trip Management
• Premium Minimal UI
• Responsive Design System

Designed in Figma with a focus on usability, accessibility, and conversion-driven booking experiences.

🌐 codespanda.com`,
  },
  {
    id: "fittrack",
    title: "FitTrack – Fitness Dashboard UI/UX Design",
    category: "Web Dashboard",
    tags: ["Fitness", "Health", "Dashboard", "Analytics"],
    dribbbleUrl: "https://dribbble.com/shots/27572134-FitTrack-Fitness-Dashboard-UI-UX-Design",
    imgUrl: "https://cdn.dribbble.com/userupload/48433193/file/b46c2fcb9c8d1ca9d549aa498c424904.png?format=webp&resize=400x300&vertical=center",
    fullImgUrl: "https://cdn.dribbble.com/userupload/48433194/file/54dafd1d122b2959c85cdb50a456714d.png?resize=1600x&vertical=center",
    gallery: [
      "https://cdn.dribbble.com/userupload/48433195/file/3d3bc599970d4ababf8991f719b8eea9.png?resize=1600x&vertical=center",
    ],
    description: `Designed a clean, modern fitness tracking dashboard that helps users stay motivated with real-time activity insights, step tracking, calorie monitoring, distance analytics, and goal progress — all in one intuitive interface.

The design emphasizes clarity, motivation, and usability through bold visualizations, minimal layouts, and a vibrant orange color palette that reflects energy and movement.

✨ Highlights

• Fitness Dashboard
• Goal Progress Tracking
• Step Counter
• Calories Burned Analytics
• Distance & Active Time Monitoring
• Activity Charts & Insights
• Tablet-Optimized Interface
• Minimal & Modern UI
• Responsive Design System

Designed in Figma with a focus on accessibility, visual hierarchy, and an engaging fitness experience.

🌐 codespanda.com`,
  },
  {
    id: "glowskin",
    title: "GlowSkin – Premium Skincare E-commerce UI/UX Design",
    category: "Mobile App",
    tags: ["Skincare", "eCommerce", "Mobile", "Shopping"],
    dribbbleUrl: "https://dribbble.com/shots/27572084-GlowSkin-Premium-Skincare-E-commerce-UI-UX-Design",
    imgUrl: "https://cdn.dribbble.com/userupload/46072598/file/8eee915fe3e6aeed25eac1c0f399f8a5.png?format=webp&resize=400x300&vertical=center",
    fullImgUrl: "https://cdn.dribbble.com/userupload/46091577/file/79918e64f741559cfa384073bf7d1f67.png?resize=1600x&vertical=center",
    gallery: [
      "https://cdn.dribbble.com/userupload/46151987/file/e87e1e325f2fbe6d62250368b3f2242d.png?resize=1600x&vertical=center",
      "https://cdn.dribbble.com/userupload/48433047/file/f927d13c79712b7976d036194b7f9c0e.png?resize=1600x&vertical=center",
      "https://cdn.dribbble.com/userupload/48433048/file/f5cacdf17689e52740c7a5fd52143f02.png?resize=1600x&vertical=center",
    ],
    description: `A modern skincare shopping experience designed with a clean, minimal, and premium aesthetic. The interface focuses on effortless product discovery, seamless shopping, and an elegant checkout flow across both mobile and desktop.

✨ Highlights

• Responsive Mobile & Desktop Experience
• Soft Lavender Luxury Color Palette
• Modern Product Discovery
• Clean Shopping Cart & Checkout
• Premium Card-Based Layout
• Consistent 8px Design System
• Minimal, Elegant & User-Friendly UI

Designed with attention to spacing, typography, accessibility, and conversion-focused UX to create a delightful skincare shopping experience.

🌐 codespanda.com`,
  },
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
    description: `Presenting Medicare Clinic, a modern healthcare app designed to simplify the patient journey—from booking appointments to managing prescriptions and accessing medical records—all in one intuitive experience.

Built with a clean, accessible, and user-friendly interface that helps patients connect with healthcare providers anytime, anywhere.

✨ Features

• Doctor Appointment Booking
• Find Doctors by Specialty
• Video & In-Person Consultations
• Electronic Health Records (EHR)
• Digital Prescriptions
• Lab Test Booking & Reports
• Medicine Reminders
• Health Dashboard & Vital Tracking
• Secure Payments & Insurance Support
• Notifications & Follow-ups
• Patient Profile Management
• Light & Dark Mode

Designed with a calming color palette, modern UI components, clear information hierarchy, and accessibility-focused interactions for a seamless healthcare experience.

Looking to build a healthcare platform, patient portal, or telemedicine solution?

CodesPanda designs premium UI/UX for healthcare, SaaS, fintech, AI products, dashboards, and mobile applications.

🌐 https://codespanda.com

Appreciate this design if you like it, and share your feedback!`,
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
    description: `A modern e-commerce admin dashboard UI designed for managing online stores with clarity and efficiency. The interface covers sales analytics, product management, order tracking, customer data, and inventory — all in a clean, scalable layout built for high-volume retail operations.

✨ Highlights

• Sales & Revenue Dashboard
• Product Catalog Management
• Order & Shipment Tracking
• Customer Management
• Inventory & Stock Alerts
• Discount & Coupon Management
• Analytics Charts & KPIs
• Role-Based Access Control
• Dark & Light Theme Ready
• Responsive Grid Layout

Designed with a focus on usability, visual hierarchy, and enterprise-grade UX for modern e-commerce teams.

Looking to build a custom e-commerce platform, admin panel, or SaaS dashboard?

CodesPanda creates premium UI/UX for retail, SaaS, fintech, and enterprise web applications.

🌐 https://codespanda.com`,
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
  {
    id: "pos-system",
    title: "Modern POS System Dashboard UI | Retail & Inventory Management",
    category: "Web Dashboard",
    tags: ["POS", "Retail", "Inventory", "Dashboard"],
    dribbbleUrl: "https://dribbble.com/shots/27545827-Modern-POS-System-Dashboard-UI-Retail-Inventory-Management",
    imgUrl: "https://cdn.dribbble.com/userupload/48337334/file/3516d78ded90812a9dfc4f0bb352bec9.png?format=webp&resize=400x300&vertical=center",
    fullImgUrl: "https://cdn.dribbble.com/userupload/48337334/file/3516d78ded90812a9dfc4f0bb352bec9.png?resize=1600x&vertical=center",
    gallery: [
      "https://cdn.dribbble.com/userupload/48337335/file/37edbf6e085e7ccfd248ee0053caad12.png?resize=1600x&vertical=center",
    ],
    description: `A modern Point of Sale (POS) system UI designed to simplify retail operations with an intuitive and scalable user experience.

The concept includes everything businesses need to manage sales efficiently — from billing and payments to inventory, customer management, and real-time analytics. Built with a clean layout, reusable components, and a modern design system suitable for retail stores, restaurants, supermarkets, pharmacies, and cafés.

✨ Highlights

• Sales Dashboard & KPIs
• Fast Billing & Checkout
• Inventory Management
• Customer Management
• Product Catalog
• Real-time Analytics
• Receipt & Invoice Generation
• Multi-category Support
• Modern Scalable UI

🌐 codespanda.com`,
  },
  {
    id: "lumia",
    title: "Lumia — Photo Editor & Camera Mobile App UI",
    category: "Mobile App",
    tags: ["Photography", "Mobile", "Editor", "Camera"],
    dribbbleUrl: "https://dribbble.com/shots/27545676-Lumia-Photo-Editor-Camera-Mobile-App-UI",
    imgUrl: "https://cdn.dribbble.com/userupload/48336808/file/77dd9bc508039e6f9dec8aeff69025e1.png?format=webp&resize=400x300&vertical=center",
    fullImgUrl: "https://cdn.dribbble.com/userupload/48336808/file/77dd9bc508039e6f9dec8aeff69025e1.png?resize=1600x&vertical=center",
    description: `Lumia is a sleek photo editor and camera app UI designed for mobile photographers. The dark-themed interface offers intuitive controls for filters, color grading, adjustments, and creative tools — all in a minimal, premium layout that keeps the focus on your photos.

✨ Highlights

• Camera Capture Interface
• One-Tap Filter Gallery
• Advanced Color Grading
• Crop, Rotate & Transform
• Exposure & Contrast Controls
• Layer & Blend Modes
• Export & Share Workflows
• Dark Premium UI
• Smooth Micro-interactions

🌐 codespanda.com`,
  },
  {
    id: "hireai",
    title: "HireAI – AI Recruitment Platform Landing Page | HR Tech SaaS UI",
    category: "Web App",
    tags: ["AI", "HR", "SaaS", "Recruitment"],
    dribbbleUrl: "https://dribbble.com/shots/27545541-HireAI-AI-Recruitment-Platform-Landing-Page-HR-Tech-SaaS-UI",
    imgUrl: "https://cdn.dribbble.com/userupload/48336424/file/9ca36d05aa64805a2064e64500de0955.png?format=webp&resize=400x300&vertical=center",
    fullImgUrl: "https://cdn.dribbble.com/userupload/48336424/file/9ca36d05aa64805a2064e64500de0955.png?resize=1600x&vertical=center",
    description: `HireAI is an AI-powered recruitment platform landing page concept. The design showcases modern HR tech with clean sections for job discovery, AI candidate matching, automated screening, and seamless onboarding workflows.

✨ Highlights

• AI Candidate Matching
• Job Listing & Search
• Automated Resume Screening
• Hiring Pipeline Management
• Team Collaboration Tools
• Analytics & Reporting
• Onboarding Workflows
• Modern SaaS Landing Page
• Conversion-Focused Layout

🌐 codespanda.com`,
  },
  {
    id: "sprout",
    title: "Fitness App – Sprout",
    category: "Mobile App",
    tags: ["Fitness", "Health", "Nutrition", "Mobile"],
    dribbbleUrl: "https://dribbble.com/shots/27545328-Fitness-App-Sprout",
    imgUrl: "https://cdn.dribbble.com/userupload/48335728/file/9c4b869034b496df839f8d1afbedea5b.png?format=webp&resize=400x300&vertical=center",
    fullImgUrl: "https://cdn.dribbble.com/userupload/48335728/file/9c4b869034b496df839f8d1afbedea5b.png?resize=1600x&vertical=center",
    description: `Sprout is a fitness and nutrition mobile app focused on healthy habit building, meal tracking, and workout planning. The interface combines fresh green tones with clean data visualizations for a motivating and encouraging fitness experience.

✨ Highlights

• Daily Activity Tracker
• Meal & Nutrition Logging
• Workout Planner
• Calorie & Macro Breakdown
• Hydration Reminders
• Progress Charts
• Goal Setting & Streaks
• Clean Green-Accented UI
• Mobile-First Design

🌐 codespanda.com`,
  },
  {
    id: "dashboard-app",
    title: "Dashboard App",
    category: "Web Dashboard",
    tags: ["Dashboard", "Analytics", "SaaS", "Admin"],
    dribbbleUrl: "https://dribbble.com/shots/27539544-Dashboard-App",
    imgUrl: "https://cdn.dribbble.com/userupload/48314457/file/2452e5212803865172c1a5b0ba1d4ad7.png?format=webp&resize=400x300&vertical=center",
    description: `A modern analytics dashboard UI featuring clean data visualizations, KPI cards, activity feeds, and responsive layouts. Designed for SaaS applications requiring at-a-glance business intelligence and real-time metrics.

✨ Highlights

• KPI Summary Cards
• Revenue & Growth Charts
• User Activity Feeds
• Data Tables & Filters
• Sidebar Navigation
• Responsive Grid Layout
• Dark & Light Themes
• Modern Component System

🌐 codespanda.com`,
  },
  {
    id: "kanban",
    title: "Kanban System",
    category: "Web App",
    tags: ["Kanban", "Project Management", "Productivity", "SaaS"],
    dribbbleUrl: "https://dribbble.com/shots/27535365-Kanban-System",
    imgUrl: "https://cdn.dribbble.com/userupload/48299474/file/d7c979f1dd88c3802a076cd42d14d360.jpg?format=webp&resize=400x300&vertical=center",
    fullImgUrl: "https://cdn.dribbble.com/userupload/48299475/file/280fb3a7d107ab4e28c715e2cd0a56bd.jpg?resize=1600x&vertical=center",
    gallery: [
      "https://cdn.dribbble.com/userupload/48299476/file/6ece33256b0a986337ca86d841072b26.jpg?resize=1600x&vertical=center",
      "https://cdn.dribbble.com/userupload/48299477/file/ded1237777753f3e886f52b3a5ceed77.jpg?resize=1600x&vertical=center",
      "https://cdn.dribbble.com/userupload/48299478/file/f199b1f0a74985660cc402ac98fd3e1a.jpg?resize=1600x&vertical=center",
      "https://cdn.dribbble.com/userupload/48299479/file/089c31e671b7b7acb7d1b7bf767d065a.jpg?resize=1600x&vertical=center",
      "https://cdn.dribbble.com/userupload/48299632/file/a3db6d4caac273fc767fbde184144c23.png?resize=1600x&vertical=center",
    ],
    description: `A clean Kanban board UI for project and task management. The interface features drag-and-drop columns, card-based tasks, priority labels, due dates, and team assignment workflows designed for agile teams and project managers.

✨ Highlights

• Drag-and-Drop Board
• Task Cards with Priority Labels
• Due Date & Assignee Management
• Column Customization
• Quick Add Task
• Filter & Search
• Progress Tracking
• Team Collaboration View
• Clean Minimal UI

🌐 codespanda.com`,
  },
  {
    id: "portfolio-web",
    title: "Portfolio Website",
    category: "Web App",
    tags: ["Portfolio", "Personal", "Design", "Website"],
    dribbbleUrl: "https://dribbble.com/shots/27525767-Portfolio-Website",
    imgUrl: "https://cdn.dribbble.com/userupload/48263819/file/9ffebd98b41c2474852ea03998a984c2.jpg?format=webp&resize=400x300&vertical=center",
    fullImgUrl: "https://cdn.dribbble.com/userupload/48263820/file/96e3e8b728e63303ae21058a57539e78.jpg?resize=1600x&vertical=center",
    description: `A minimal portfolio website design showcasing creative work with a clean grid layout, project thumbnails, smooth navigation, and an elegant personal brand aesthetic. Built for designers and developers looking to present their work with clarity and style.

✨ Highlights

• Clean Hero Section
• Project Grid Gallery
• About & Skills Section
• Contact Form
• Minimal Typography
• Smooth Scroll Animations
• Mobile-Responsive Layout
• Personal Branding Focus

🌐 codespanda.com`,
  },
  {
    id: "design-system",
    title: "Design System",
    category: "UI Design",
    tags: ["Design System", "Components", "UI Kit", "Figma"],
    dribbbleUrl: "https://dribbble.com/shots/27501192-Design-System",
    imgUrl: "https://cdn.dribbble.com/userupload/48171734/file/38287293392a1b8809ad6bc2433b11d1.png?format=webp&resize=400x300&vertical=center",
    fullImgUrl: "https://cdn.dribbble.com/userupload/48171736/file/5e36dc51773c761ecec3de901459e8c9.png?resize=1600x&vertical=center",
    gallery: [
      "https://cdn.dribbble.com/userupload/48171737/file/d8a97b3ea0c3986b83e1ceca1f8b1ddf.png?resize=1600x&vertical=center",
      "https://cdn.dribbble.com/userupload/48171738/file/609eb08e055c63e62a7d592bca19544f.png?resize=1600x&vertical=center",
      "https://cdn.dribbble.com/userupload/48171740/file/cdc7d3a3456e3208d70cae554a3c2a2b.png?resize=1600x&vertical=center",
      "https://cdn.dribbble.com/userupload/48178098/file/698d241ca4c5f769021e7c1792a538be.png?resize=1600x&vertical=center",
    ],
    description: `A comprehensive UI design system featuring design tokens, reusable components, typography scales, color palettes, spacing systems, and interaction patterns. Built to ensure visual consistency and development velocity across large-scale digital products.

✨ Highlights

• Color Token System
• Typography Scale
• Button & Form Components
• Icon Library
• Card & Layout Patterns
• Spacing & Grid System
• Dark & Light Themes
• Figma-Ready Components
• Developer Handoff Specs

🌐 codespanda.com`,
  },
  {
    id: "dating-app",
    title: "Dating Mobile App",
    category: "Mobile App",
    tags: ["Dating", "Social", "Mobile", "Matching"],
    dribbbleUrl: "https://dribbble.com/shots/26930031-Dating-Mobile-App",
    imgUrl: "https://cdn.dribbble.com/userupload/48141694/file/3b51d9f8552b85887dfcc705901742e4.png?format=webp&resize=400x300&vertical=center",
    fullImgUrl: "https://cdn.dribbble.com/userupload/48141694/file/3b51d9f8552b85887dfcc705901742e4.png?resize=1600x&vertical=center",
    gallery: [
      "https://cdn.dribbble.com/userupload/48141695/file/a2372e687226a969a229f5e82ae156f2.png?resize=1600x&vertical=center",
    ],
    description: `A modern dating mobile app UI with a card-based swipe interface, match discovery, real-time messaging, and profile management. Designed with warm tones and clean layouts for an engaging and trustworthy social experience.

✨ Highlights

• Swipe-to-Match Interface
• Profile Discovery Cards
• Match Notifications
• Real-time Chat
• Interest Tags & Filters
• Photo Gallery Profiles
• Safety & Privacy Controls
• Warm, Inviting Color Palette
• Smooth Animations

🌐 codespanda.com`,
  },
  {
    id: "calories-app",
    title: "Calories Calculator App",
    category: "Mobile App",
    tags: ["Health", "Nutrition", "Calories", "Mobile"],
    dribbbleUrl: "https://dribbble.com/shots/26925953-Calories-Calculator-App",
    imgUrl: "https://cdn.dribbble.com/userupload/48141845/file/944f45928663280a0275f5e2f5c8d5f6.png?format=webp&resize=400x300&vertical=center",
    fullImgUrl: "https://cdn.dribbble.com/userupload/48141845/file/944f45928663280a0275f5e2f5c8d5f6.png?resize=1600x&vertical=center",
    gallery: [
      "https://cdn.dribbble.com/userupload/48141846/file/6cb65da72be3445067fdd5c1035f2bb3.png?resize=1600x&vertical=center",
    ],
    description: `A calories calculator mobile app with meal logging, macro breakdowns, daily calorie targets, and progress tracking. Clean and intuitive UI built to make healthy eating habits effortless and enjoyable.

✨ Highlights

• Daily Calorie Target Tracker
• Meal & Food Logging
• Macro Breakdown (Protein / Carbs / Fat)
• Search & Add Foods
• Progress Bar & Ring Charts
• Weekly History View
• Water Intake Tracking
• Clean Minimalist UI
• Health-Focused Color Palette

🌐 codespanda.com`,
  },
  {
    id: "ecommerce-app",
    title: "Ecommerce App Design",
    category: "Mobile App",
    tags: ["eCommerce", "Shopping", "Mobile", "Retail"],
    dribbbleUrl: "https://dribbble.com/shots/26918933-Ecommerce-App-Design",
    imgUrl: "https://cdn.dribbble.com/userupload/48141928/file/57da89a9ebb6a94671a36c0d061d0935.png?format=webp&resize=400x300&vertical=center",
    fullImgUrl: "https://cdn.dribbble.com/userupload/48141928/file/57da89a9ebb6a94671a36c0d061d0935.png?resize=1600x&vertical=center",
    gallery: [
      "https://cdn.dribbble.com/userupload/48141929/file/f3f0a9d57dd414988a5c9fe89854132d.png?resize=1600x&vertical=center",
    ],
    description: `A clean e-commerce mobile app design featuring product discovery, category browsing, cart management, and a smooth checkout flow. Built with a modern card-based layout and conversion-focused UX for a delightful shopping experience.

✨ Highlights

• Product Discovery Feed
• Category Browsing
• Search & Filters
• Product Detail Pages
• Add to Cart & Wishlist
• Smooth Checkout Flow
• Order Tracking
• Clean Card-Based Layout
• Mobile-First UX

🌐 codespanda.com`,
  },
  {
    id: "car-app",
    title: "Car Design App",
    category: "Mobile App",
    tags: ["Automotive", "Car", "Mobile", "Configurator"],
    dribbbleUrl: "https://dribbble.com/shots/26912669-Car-Design-App",
    imgUrl: "https://cdn.dribbble.com/userupload/48142602/file/13424fd8b2ca9dbaf5c0671c109a39d3.png?format=webp&resize=400x300&vertical=center",
    fullImgUrl: "https://cdn.dribbble.com/userupload/48142602/file/13424fd8b2ca9dbaf5c0671c109a39d3.png?resize=1600x&vertical=center",
    gallery: [
      "https://cdn.dribbble.com/userupload/48142768/file/a63ac7ed17cd0f5b04abd3a62a04e777.png?resize=1600x&vertical=center",
      "https://cdn.dribbble.com/userupload/48142769/file/96f0e8e5906b6cd58ddec8d643e8cde6.png?resize=1600x&vertical=center",
    ],
    description: `A car design and showcase app with immersive vehicle imagery, specification cards, color selection, and booking flows. Premium dark UI built for automotive brands, car configurator experiences, and vehicle dealership platforms.

✨ Highlights

• Immersive Car Showcase
• 360° Vehicle Preview
• Color & Trim Selector
• Spec Comparison Cards
• Performance Stats
• Test Drive Booking
• Finance Calculator
• Premium Dark Theme
• Cinematic Imagery Layout

🌐 codespanda.com`,
  },
  {
    id: "cricket-app",
    title: "Cricket Scoring App",
    category: "Mobile App",
    tags: ["Cricket", "Sports", "Scoring", "Mobile"],
    dribbbleUrl: "https://dribbble.com/shots/26912589-Cricket-Scoring-App",
    imgUrl: "https://cdn.dribbble.com/userupload/48143098/file/1ecbcd78318fc3e35528a689b4382c78.png?format=webp&resize=400x300&vertical=center",
    fullImgUrl: "https://cdn.dribbble.com/userupload/48143099/file/7d89fe1b9846995b7b6b86b248a3c13f.png?resize=1600x&vertical=center",
    gallery: [
      "https://cdn.dribbble.com/userupload/48143100/file/8a3ae272cf8efc86229a980c3639fdcb.png?resize=1600x&vertical=center",
      "https://cdn.dribbble.com/userupload/48143101/file/9cf539f7dcdd5e09930eb3a6b710f49e.png?resize=1600x&vertical=center",
    ],
    description: `A cricket scoring app UI for tracking live match scores, player statistics, innings breakdowns, and detailed scorecards. Clean and data-rich interface designed for cricket fans, amateur leagues, and professional scorekeepers.

✨ Highlights

• Live Score Ticker
• Ball-by-Ball Commentary Feed
• Innings & Over Summary
• Batting & Bowling Scorecards
• Player Performance Stats
• Match Timeline
• Team Management
• Tournament Bracket View
• Cricket-Themed UI

🌐 codespanda.com`,
  },
  {
    id: "crypto-app",
    title: "Crypto App",
    category: "Mobile App",
    tags: ["Crypto", "Finance", "Trading", "Mobile"],
    dribbbleUrl: "https://dribbble.com/shots/26893519-Crypto-App",
    imgUrl: "https://cdn.dribbble.com/userupload/48143469/file/4be7333553aa5cb2779ef8ebdecdc674.png?format=webp&resize=400x300&vertical=center",
    fullImgUrl: "https://cdn.dribbble.com/userupload/48143470/file/fe2f35a8a38c63be8c1dced0e466e791.png?resize=1600x&vertical=center",
    gallery: [
      "https://cdn.dribbble.com/userupload/48143471/file/0bf20e32d83b0a3e21f91ed3bfa1373e.png?resize=1600x&vertical=center",
      "https://cdn.dribbble.com/userupload/48143472/file/df40f8e21a1223e363bc92894916a724.png?resize=1600x&vertical=center",
    ],
    description: `A cryptocurrency tracking app with portfolio overview, live price charts, market cap data, and watchlist management. Dark-themed UI with vibrant accent colors for a modern fintech experience that makes managing digital assets intuitive.

✨ Highlights

• Portfolio Overview Dashboard
• Live Price Charts (Candlestick & Line)
• Market Cap Rankings
• Watchlist Management
• Coin Detail Pages
• Buy & Sell Flows
• Transaction History
• Price Alerts
• Dark Premium UI

🌐 codespanda.com`,
  },
  {
    id: "employee-mgmt",
    title: "Employee Management Dashboard",
    category: "Web Dashboard",
    tags: ["HR", "Employee", "Dashboard", "Management"],
    dribbbleUrl: "https://dribbble.com/shots/26887384-Employee-Management-Dashboard",
    imgUrl: "https://cdn.dribbble.com/userupload/48146937/file/072bd0c4872b3a1755f7e9274ab26a1f.png?format=webp&resize=400x300&vertical=center",
    fullImgUrl: "https://cdn.dribbble.com/userupload/48146939/file/e8382ebfa6660d6f821ee0ab290602fe.png?resize=1600x&vertical=center",
    gallery: [
      "https://cdn.dribbble.com/userupload/48146940/file/bb045f0f3679dd8727104e871091061d.png?resize=1600x&vertical=center",
      "https://cdn.dribbble.com/userupload/48146941/file/f1eb02c11a3ee4fe2bdbe54cc2be6905.png?resize=1600x&vertical=center",
      "https://cdn.dribbble.com/userupload/48146943/file/b30ceff1716383c197e4cc038a800530.png?resize=1600x&vertical=center",
      "https://cdn.dribbble.com/userupload/48146944/file/6839167b05717ef44348e7b132fc82e8.png?resize=1600x&vertical=center",
      "https://cdn.dribbble.com/userupload/48146945/file/19c31a7aeb126f492fd845e0a4de09f2.png?resize=1600x&vertical=center",
    ],
    description: `An employee management dashboard with comprehensive HR workflows covering attendance tracking, payroll management, leave requests, department analytics, and performance reviews. Clean enterprise UI built for modern HR teams managing growing organizations.

✨ Highlights

• Employee Directory & Profiles
• Attendance & Time Tracking
• Leave Request Management
• Payroll Overview
• Department Analytics
• Performance Reviews
• Recruitment Pipeline
• Org Chart View
• HR Reports & Exports
• Role-Based Access Control

🌐 codespanda.com`,
  },
];

export function getShotById(id: string): Shot | undefined {
  return SHOTS.find((s) => s.id === id);
}
