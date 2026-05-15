export type Book = {
  id: string;
  title: string;
  author: string;
  description: string;
  price: string;
  badge?: string;
  category: "Devotional" | "Bible Study" | "Memoir" | "Children" | "Theology";
  palette: number;
  featured?: boolean;
};

export const books: Book[] = [
  {
    id: "anchored-hope",
    title: "Anchored in Hope",
    author: "Pastor Elena Reyes",
    description:
      "A 40-day devotional journey to stand firm when the storms of life rage. Rooted in Scripture, watered with prayer.",
    price: "$18.00",
    badge: "New",
    category: "Devotional",
    palette: 0,
    featured: true,
  },
  {
    id: "kingdom-builders",
    title: "Kingdom Builders",
    author: "Dr. Marcus J. Ellison",
    description:
      "A practical handbook for leaders called to plant, grow, and steward Kingdom work in their cities.",
    price: "$22.00",
    badge: "Bestseller",
    category: "Theology",
    palette: 1,
    featured: true,
  },
  {
    id: "wholeness",
    title: "Wholeness",
    author: "Jessica Tan",
    description:
      "Healing the heart, mind, and soul through the gospel. A memoir-meets-Bible study you'll return to often.",
    price: "$16.50",
    category: "Memoir",
    palette: 2,
    featured: true,
  },
  {
    id: "lions-and-lambs",
    title: "Lions & Lambs",
    author: "Ava & Noah Brooks",
    description:
      "A beautifully illustrated children's book retelling Daniel's bravery and Jesus' gentleness.",
    price: "$14.00",
    badge: "Kids",
    category: "Children",
    palette: 3,
  },
  {
    id: "study-of-james",
    title: "A Study of James",
    author: "Theodore Hwang",
    description:
      "Eight weeks of inductive study through the book of James. Workbook included for groups or solo.",
    price: "$20.00",
    category: "Bible Study",
    palette: 4,
  },
  {
    id: "morning-mercies",
    title: "Morning Mercies",
    author: "Hannah Okafor",
    description:
      "Start each day rooted in the unfailing love of God. Short, soulful readings paired with Scripture.",
    price: "$15.00",
    category: "Devotional",
    palette: 5,
  },
  {
    id: "city-on-a-hill",
    title: "City on a Hill",
    author: "Rev. Daniel Park",
    description:
      "How local churches can shape their cities through justice, mercy, and the proclamation of the gospel.",
    price: "$24.00",
    badge: "Featured",
    category: "Theology",
    palette: 1,
  },
  {
    id: "psalms-for-tired-souls",
    title: "Psalms for Tired Souls",
    author: "Marisol Vega",
    description:
      "A poetic walk through the Psalms for the weary, the worn, and the wondering.",
    price: "$17.00",
    category: "Devotional",
    palette: 2,
  },
];

export type Newsletter = {
  id: string;
  issue: number;
  title: string;
  date: string;
  excerpt: string;
};

export const newsletters: Newsletter[] = [
  {
    id: "n-024",
    issue: 24,
    title: "Of Quiet Mornings and Bold Mercies",
    date: "March 2026",
    excerpt:
      "Stories from three pastors planting churches in unreached cities — and how you helped fund their first 90 days.",
  },
  {
    id: "n-023",
    issue: 23,
    title: "A Year of Faithfulness in Numbers",
    date: "February 2026",
    excerpt:
      "Looking back at twelve months of publishing, ministry, and the readers who carried it with us.",
  },
  {
    id: "n-022",
    issue: 22,
    title: "Behind the Pages: How a Manuscript Becomes a Mission",
    date: "January 2026",
    excerpt:
      "A walkthrough of our editorial process, and why we choose every author with prayer and purpose.",
  },
  {
    id: "n-021",
    issue: 21,
    title: "Advent Notes — Hope, Peace, Joy, Love",
    date: "December 2025",
    excerpt:
      "Four short readings from our newest devotional, plus a free downloadable Advent calendar for families.",
  },
  {
    id: "n-020",
    issue: 20,
    title: "The Quiet Power of the Local Church",
    date: "November 2025",
    excerpt:
      "A long-form essay on why your neighborhood congregation is still the hope of the world.",
  },
  {
    id: "n-019",
    issue: 19,
    title: "What We Read This Summer",
    date: "October 2025",
    excerpt:
      "Twelve book recommendations from our editorial team — old saints, new voices, and a few surprises.",
  },
];

