export const subscriptionPlans = [
  {
    name: "Half Year",
    description: "Perfect for mid-term projects and growing businesses.",
    price: "Rp. 1.250.000",
    duration: "6 months",
    features: [
      "All features included",
    ],
  },
  {
    name: "1 Year",
    description: "Our best value for a long-term commitment.",
    price: "Rp. 1.800.000",
    duration: "12 months",
    features: [
      "All features included",
    ],
  },
  {
    name: "Custom",
    description: "Tailored solutions for large-scale operations.",
    price: null,
    duration: "12 months",
    features: [
      "All features included",
      "Custom development solutions",
    ],
  },
];

export type SubscriptionPlan = (typeof subscriptionPlans)[0];