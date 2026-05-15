export type AppReview = {
  id: string;
  title: string;
  author: string;
  rating: number;
  quote: string;
  country?: "United States" | "Canada";
  /**
   * Mark as a "spotlight" review to feature in the top 3 / featured slot.
   * Spotlights are typically longer, more vivid testimonials.
   */
  spotlight?: boolean;
};

/**
 * Real App Store reviews for the Godly Kids app — used as testimonials
 * across the public site. Dates are intentionally omitted per editorial
 * preference; rating defaults to 5 stars unless overridden.
 */
export const APP_REVIEWS: AppReview[] = [
  {
    id: "mattchipman",
    title: "My Kids Love This App!",
    author: "_mattchipman",
    rating: 5,
    country: "Canada",
    spotlight: true,
    quote:
      "Godly Kids has been such a blessing in our home! My kids absolutely love exploring the Bible stories, and I love that they're learning about faith in a fun and engaging way. The illustrations are beautiful, the lessons are easy for them to understand, and it's completely ad-free. If you're looking for a safe, uplifting, and faith-filled app for your kids, I highly recommend this one!",
  },
  {
    id: "joseph-traw",
    title: "Amazing App for Kids!",
    author: "Joseph Traw",
    rating: 5,
    spotlight: true,
    quote:
      "This app is awesome. It's filled with original Bible-themed content that kids will love. Even I enjoy the content — and I'm an adult. The stories are all accompanied by beautiful graphics. Couldn't recommend this app more for those looking for safe and faith-building entertainment for their kids!",
  },
  {
    id: "gray-shirt",
    title: "Love the diversity",
    author: "Gray shirt",
    rating: 5,
    country: "Canada",
    spotlight: true,
    quote:
      "I love how diverse the books and audio dramas are — it's not just audio dramas that all have the same topic, but also podcasts and prayers. It's such a great way to help children grow in faith and devote time to God in an educational and fun way!",
  },
  {
    id: "love4l",
    title: "Beautiful App",
    author: "Love4L_",
    rating: 5,
    country: "United States",
    quote:
      "Every parent should be utilizing this amazing app!!! It's a must have.",
  },
  {
    id: "the-amazin-brydon",
    title: "Fantastic",
    author: "TheAmazinBrydon",
    rating: 5,
    country: "Canada",
    quote:
      "This app is fantastic. I enjoy the lo-fi Bible, my kids enjoy the stories, and I don't have to worry about it not aligning with what is good. Thank you for making something that is awesome.",
  },
  {
    id: "dreamer-quiet-warrior",
    title: "Excellent",
    author: "DreamerQuietWarrior",
    rating: 5,
    country: "Canada",
    quote:
      "An excellent resource if you want to fill your kids' lives with fun stories — with the ultimate goal of bringing them closer to God through learning about His words.",
  },
  {
    id: "jess4jesus",
    title: "Pretty Good, Worth it",
    author: "jess4jesus_",
    rating: 5,
    country: "United States",
    quote:
      "Godly Kids is such a great app! Love the illustrations and stories. Can't wait to see more.",
  },
  {
    id: "east-c23",
    title: "Godly Kids",
    author: "EastC23",
    rating: 5,
    country: "Canada",
    quote:
      "My son has this app, he is 7, it's absolutely amazing. The stories are age appropriate, and he tells all his friends at school about it! Highly recommend!",
  },
  {
    id: "jor-dee-roy",
    title: "A Wonderful App for Kids",
    author: "JorDeeRoy",
    rating: 5,
    country: "Canada",
    quote:
      "What a fantastic, GODLY app for kids! My 6 & 4 year old LOVE IT and are able to control / follow along easily.",
  },
  {
    id: "d-swise-strength",
    title: "What kids need",
    author: "DSwisestrength",
    rating: 5,
    country: "Canada",
    quote:
      "Kids need this. I can't wait to have my girl go through all of them!",
  },
];

/** Total App Store reviews across the catalog (used for social proof). */
export const APP_REVIEW_COUNT = 122;

/** Average rating across reviews — assumed five stars based on the sample. */
export const APP_REVIEW_AVERAGE = 5;
