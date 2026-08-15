export interface Leader {
  name: string;
  position: string;
  bio: string;
  photo: string;
}

export interface ServiceTime {
  day: string;
  name: string;
  time: string;
}

export interface Ministry {
  name: string;
  description: string;
  icon: string;
}

export interface Assembly {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  location: string;
  address: string;
  phone: string;
  email: string;
  established: string;
  heroImage: string;
  cardImage: string;
  leaders: Leader[];
  serviceTimes: ServiceTime[];
  ministries: Ministry[];
  gallery: string[];
}

export const assemblies: Assembly[] = [
  {
    id: "2",
    slug: "shiloh",
    name: "Shiloh Assembly",
    tagline: "Where God's Presence Dwells",
    description: "A house of prayer and worship where believers encounter the tangible presence of God and lives are transformed.",
    location: "Jalandhar, Punjab",
    address: "Shiloh auditorium near Pizza world basement, Jalandhar, Punjab 144001",
    phone: "+91 98765 43211",
    email: "shiloh@afmindia.org",
    established: "29 December 2024",
    heroImage: "/shiloh01.jpg",
    cardImage: "shiloh02.jpg",
    leaders: [
      {
        name: "Minister Chiwara",
        position: "Preceeding Minister",
        bio: "Minister carries a deep burden for revival and leads the assembly with prophetic vision and pastoral care.",
        photo: "/abide.jpg",
      },
    ],
    serviceTimes: [
      { day: "Sunday", name: "Morning Worship", time: "10:00 AM" },
      { day: "Tuesday", name: "Prayer Meeting", time: "18:30 AM" },
      { day: "Friday", name: "Bible Study", time: "18:30 PM" },
      { day: "Saturday", name: "Praise and worship", time: "15:00 PM" },
    ],
    ministries: [
      { name: "Youth Ministry", description: "Igniting passion for God in the hearts of young people.", icon: "Users" },
      { name: "Women's Fellowship", description: "A sisterhood rooted in prayer and the Word.", icon: "Heart" },
      { name: "Men's Fellowship", description: "Iron sharpening iron for the Kingdom.", icon: "Shield" },
      { name: "Praise Team", description: "Ministering through song and worship.", icon: "Music" },
      { name: "Evangelism Team", description: "Reaching the lost with the message of salvation.", icon: "Globe" },
    ],
    gallery: [
      "/shiloh06.jpg",
      "/shiloh03.jpg",
      "/shiloh05.jpg",
      "/shiloh04.jpg",
    ],
  },
  
  {
    id: "1",
    slug: "philadelphia",
    name: "Philadelphia Assembly",
    tagline: "The Church of Brotherly Love",
    description: "A vibrant community of believers committed to worship, fellowship, and spreading the love of Christ throughout the region.",
    location: "Dehli, Haryana",
    address: "Philadelphia Auditorium , Annuparna dhaba, palwal",
    phone: "+91 8059846797",
    email: "philadelphia@afmindia.org",
    established: "31 August 2025",
    heroImage: "/phila02.jpg",
    cardImage: "/phila01.jpg",
    leaders: [
      {
        name: "Minister Bertha",
        position: "Preceeding Minister",
        bio: "Minster  has served the Lord faithfully for over a decade, leading with a heart for evangelism and discipleship.",
        photo: "/bertha.jpg",
      },
      
    ],
    serviceTimes: [
      { day: "Sunday", name: "Morning Worship", time: "10:00 AM" },
      { day: "Wednesday", name: "Midweek Service", time: "18:30 PM" },
      { day: "Friday", name: "Bible Study", time: "18:30 PM" },
      { day: "Saturday", name: "Praise n Worship", time: "16:00 PM" },
    ],
    ministries: [
      { name: "Youth Ministry", description: "Raising the next generation of Spirit-filled believers.", icon: "Users" },
      { name: "Women's Fellowship", description: "Empowering women to walk boldly in their calling.", icon: "Heart" },
      { name: "Men's Fellowship", description: "Building men of integrity, faith, and purpose.", icon: "Shield" },
      { name: "Children's Ministry", description: "Planting seeds of faith in our youngest members.", icon: "Star" },
      { name: "Choir", description: "Leading the congregation in Spirit-filled worship.", icon: "Music" },
      { name: "Evangelism Team", description: "Taking the Gospel beyond the four walls of the church.", icon: "Globe" },
    ],
    gallery: [
      "/phila04.jpg",
      "/phila03.jpg",
      "/phila02.jpg",
      "/phila01.jpg",
    ],
  },
  {
    id: "3",
    slug: "peniel",
    name: "Peniel Assembly",
    tagline: "Face to Face with God",
    description: "Named after the place where Jacob wrestled with God, Peniel Assembly is a community that pursues God with wholehearted devotion.",
    location: " Punjab , Jalandar Rama Mandi 144001",
    address: "Peneil Auditorium near amarpalace , Punjab 143001",
    phone: "+263 7746 12846",
    email: "peniel@afmindia.org",
    established: "22 November 2025",
    heroImage: "/peniel1.9.jpg",
    cardImage: "/peniel2.0.jpg",
    leaders: [
      {
        name: "Nathaniel",
        position: "Preceeding Minister",
        bio: "Pastor Emmanuel is an anointed teacher of the Word with a passion for seeing every believer grow to spiritual maturity.",
        photo: "/nath.jpg",
      },
    ],
    serviceTimes: [
      { day: "Sunday", name: "Morning Worship", time: "10:00 AM" },
      { day: "Wednesday", name: "Midweek Service", time: "18:30 PM" },
      { day: "Friday", name: "Prayer & Worship", time: "18:30 PM" },
      { day: "Saturday", name: "Youth Fellowship", time: "18:00 PM" },
    ],
    ministries: [
      { name: "Youth Ministry", description: "Transforming young lives through the power of the Gospel.", icon: "Users" },
      { name: "Women's Fellowship", description: "Women walking in grace, truth, and purpose.", icon: "Heart" },
      { name: "Men's Fellowship", description: "Men anchored in faith and servant leadership.", icon: "Shield" },
      { name: "Praise Team", description: "Exalting the name of Jesus through anointed music.", icon: "Music" },
      { name: "Evangelism Team", description: "Going into every corner with the Good News.", icon: "Globe" },
    ],
    gallery: [
      "/peniel1.3.jpg",
      "/peniel1.4.jpg",
      "/peniel1.5.jpg",
      "/peniel1.6.jpg",
    ],
  },
  {
    id: "5",
    slug: "rehoboth",
    name: "Rehoboth Assembly",
    tagline: "God Has Made Room for Us",
    description: "Rehoboth — meaning 'broad places' — is an assembly where God continues to expand His work and make room for every soul to encounter Him.",
    location: "Bathinda, Punjab",
    address: "56 Revival Road, Bathinda, Punjab 151001",
    phone: "+91 98765 43214",
    email: "rehoboth@afmindia.org",
    established: "15 Febrauary 2026",
    heroImage: "/reho08.jpg",
    cardImage: "/reho2.jpg",
    leaders: [
      {
        name: "Nyashadzashe Chibwe ",
        position: "Precceeding Minister",
        bio: "Pastor Andrew is a passionate evangelist who believes God wants to pour out His Spirit on all flesh in this generation.",
        photo: "/nyasha.jpg",
      },
    ],
    serviceTimes: [
      { day: "Sunday", name: "Morning Worship", time: "10:00 AM" },
      { day: "Tuesday", name: "Prayer Meeting", time: "18:00 AM" },
      { day: "Friday", name: "Bible Study", time: "18:30 PM" },
      { day: "Saturday", name: "Youth Fellowship", time: "17:00 PM" },
    ],
    ministries: [
      { name: "Youth Ministry", description: "Youth ablaze with the fire of the Holy Spirit.", icon: "Users" },
      { name: "Women's Fellowship", description: "Women of faith lifting one another higher.", icon: "Heart" },
      { name: "Men's Fellowship", description: "Men rooted in the Word and active in service.", icon: "Shield" },
      { name: "Praise Team", description: "Music that glorifies God and stirs the Spirit.", icon: "Music" },
      { name: "Evangelism Team", description: "Fulfilling the Great Commission one soul at a time.", icon: "Globe" },
    ],
    gallery: [
      "/reho01.jpg",
      "/reho07.jpg",
      "/reho05.jpg",
      "/reho02.jpg",
    ],
  },
  {
    id: "4",
    slug: "koinonia",
    name: "Koinonia Assembly",
    tagline: "Fellowship in the Spirit",
    description: "Koinonia means fellowship — and at the heart of this assembly is a deep, authentic community built on love, prayer, and the Word.",
    location: "Delhi, Greater Noida, Uttar Pradesh",
    address: "Supertech Golf Country, Greater Noida, Uttar Pradesh 201308",
    phone: "+263 78099 1610",
    email: "koinonia@afmindia.org",
    established: "1 March 2026",
    heroImage: "/fam.jpg",
    cardImage: "/ko03.jpg",
    leaders: [
      {
        name: "Faith ",
        position: "Preceeding Minister",
        bio: "Minister brings a heart of compassion and a gift for building community wherever he ministers.",
        photo: "/faith.jpg",
      },
    ],
    serviceTimes: [
      { day: "Sunday", name: "Morning Worship", time: "10:00 AM" },
      { day: "Wednesday", name: "Midweek Service", time: "18:30 PM" },
      { day: "Friday", name: "Bible Study", time: "18:00 PM" },
      { day: "Saturday", name: "Youth Fellowship", time: "16:00 PM" },
    ],
    ministries: [
      { name: "Youth Ministry", description: "A generation on fire for God.", icon: "Users" },
      { name: "Women's Fellowship", description: "Virtuous women growing together in Christ.", icon: "Heart" },
      { name: "Men's Fellowship", description: "Kingdom men standing firm in faith.", icon: "Shield" },
      { name: "Praise Team", description: "Songs of praise that usher in God's presence.", icon: "Music" },
      { name: "Evangelism Team", description: "Sharing the love of Christ in our communities.", icon: "Globe" },
    ],
    gallery: [
      "/ko.jpg",
      "/ko1.jpg",
      "/ko07.jpg",
      "/ko05.jpg",
    ],
  },
  


{
    id: "6",
    slug: "Bethel;",
    name: "Bethel Assembly",
    tagline: "House Of God",
    description: "Bethel acob slept at this location while fleeing from his brother Esau and saw a vision of a ladder or stairway reaching to heaven with angels ascending and descending. He named the place Bethel because he felt it was the gate of heaven.",
    location: "Limda, Waghodia, Vadodara, Gujarat, India",
    address: " Vadodara , near Parul University Fusion cinema",
    phone: ". +91 81417 66854",
    email: "bethel@afmindia.org",
    established: "18 July 2026",
    heroImage: "/bethel.jpeg",
    cardImage: "/bethel.jpeg",
    leaders: [
      {
        name: "T.Nkala ",
        position: "Preceeding Minister",
        bio: "Minister brings a heart of compassion and a gift for building community wherever he ministers.",
        photo: "/bethel.jpeg",
      },
    ],
    serviceTimes: [
      { day: "Sunday", name: "Morning Worship", time: "10:00 AM" },
      { day: "Wednesday", name: "Midweek Service", time: "18:30 PM" },
      { day: "Friday", name: "Bible Study", time: "18:00 PM" },
      { day: "Saturday", name: "Youth Fellowship", time: "16:00 PM" },
    ],
    ministries: [
      { name: "Youth Ministry", description: "A generation on fire for God.", icon: "Users" },
      { name: "Women's Fellowship", description: "Virtuous women growing together in Christ.", icon: "Heart" },
      { name: "Men's Fellowship", description: "Kingdom men standing firm in faith.", icon: "Shield" },
      { name: "Praise Team", description: "Songs of praise that usher in God's presence.", icon: "Music" },
      { name: "Evangelism Team", description: "Sharing the love of Christ in our communities.", icon: "Globe" },
    ],
    gallery: [
      "/ko.jpg",
      "/ko1.jpg",
      "/ko07.jpg",
      "/ko05.jpg",
    ],
  },
  
];