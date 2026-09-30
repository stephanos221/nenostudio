import type { Testimonial, TestimonialScore } from "./types";

export const testimonialScore: TestimonialScore = {
  value: "4.8",
  max: "/5",
  text: "Across 120+ launches since 2017, rated by the teams we shipped with.",
  faces: [
    "/assets/images/image-444d71aa.avif",
    "/assets/images/image-3b42bdf9.avif",
    "/assets/images/image-c6be4925.avif",
    "/assets/images/image-d2914b57.avif",
  ],
  facesLabel: "Trusted by clients worldwide",
};

export const testimonials: Testimonial[] = [
  {
    avatar: "/assets/images/image-f6f99334.avif",
    name: "James Carter",
    role: "Wilson & Co",
    quote: "Incredible team. They delivered exactly what we needed, on time and beyond expectations.",
  },
  {
    avatar: "/assets/images/image-3b42bdf9.avif",
    name: "Emily Davis",
    role: "StartUp Hub",
    quote: "A smooth process from start to finish, and a highly professional team throughout.",
    alternate: true,
  },
  {
    avatar: "/assets/images/image-d2914b57.avif",
    name: "Anna Martinez",
    role: "Marketing director",
    quote: "Our new branding is exactly what we envisioned — clean, modern, and unmistakably ours.",
  },
];
