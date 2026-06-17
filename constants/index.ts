import { HandHeart, Sprout, Users, Building2, Globe2 } from "lucide-react";


export const tiers = [
  { amount: "$5", trees: "1 tree", note: "A perfect first step." },
  { amount: "$25", trees: "5 trees", popular: true, note: "Plant a small grove in a community forest." },
  { amount: "$100", trees: "20 trees", note: "Sponsor a hillside for a year." },
  { amount: "$500", trees: "100 trees", note: "Fund a school's outdoor classroom." },
];

export const ways = [
  { icon: HandHeart, title: "Donate", text: "100% of your donation funds a named project — track its growth for ten years." },
  { icon: Sprout, title: "Plant with us", text: "Join a planting day near you. No experience needed, just good boots." },
  { icon: Users, title: "Volunteer", text: "Lend your skills — from photography to soil science to social media." },
  { icon: Building2, title: "Partner", text: "For businesses ready to embed real, traceable nature investment." },
];

export const stats = [
  { value: "2.4M", label: "Trees Planted" },
  { value: "48", label: "Countries" },
  { value: "12k+", label: "Volunteers" },
  { value: "320", label: "Active Projects" },
];

export const pillars = [
  { icon: Sprout, title: "Reforestation", text: "Restoring native woodlands on degraded land with the right tree in the right place." },
  { icon: Users, title: "Community", text: "Partnering with local growers, schools, and tribes to lead long-term stewardship." },
  { icon: Globe2, title: "Climate", text: "Drawing down carbon while protecting biodiversity, soil, and freshwater systems." },
];


export const projectsy = [
  { img: '/aerial-forest.jpg', place: "Atlantic Forest", country: "Brazil", goal: 500000, planted: 312400, tag: "Reforestation", desc: "Restoring one of the world's most biodiverse and most threatened rainforests." },
  { img: '/volunteers.jpg', place: "Rift Valley", country: "Kenya", goal: 120000, planted: 98200, tag: "Community", desc: "Indigenous-led agroforestry returning shade, soil, and harvests to highland farms." },
  { img: '/sapling-hands.jpg', place: "Cascadia", country: "Pacific NW, USA", goal: 80000, planted: 41100, tag: "Restoration", desc: "Replanting after wildfire with fire-resilient, climate-ready native conifers." },
  { img: '/canopy.jpg', place: "Borneo Lowlands", country: "Indonesia", goal: 250000, planted: 142000, tag: "Reforestation", desc: "Reconnecting fragmented orangutan habitat across degraded peatland." },
  { img: '/hero-planting.jpg', place: "Highlands", country: "Scotland", goal: 60000, planted: 22500, tag: "Rewilding", desc: "Bringing back native broadleaf woodland to barren glens." },
  { img: '/aerial-forest.jpg', place: "Sahel Belt", country: "Senegal", goal: 200000, planted: 88300, tag: "Community", desc: "A living wall against desertification, grown by women's cooperatives." },
];


export const values = [
  { title: "Native first", text: "We plant species that belong, not just what grows fast." },
  { title: "People-led", text: "Local communities design and steward every project." },
  { title: "Radically transparent", text: "Open data, open books, open forests." },
  { title: "Long horizon", text: "We commit to ten years on every site we plant." },
];