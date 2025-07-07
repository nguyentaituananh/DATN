import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    quote:
      "Eco Decore transformed our living room beautifully. The quality of the furniture and the customer service exceeded all our expectations.",
    author: "Hanh Nguyen",
    position: "Homeowner, District 7",
    image:
      "data:image/jpeg;base64,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",
  },
  {
    id: 2,
    quote:
      "Thanks to Eco Decore, our furniture showroom now looks sleek and modern. The consultation team was professional and truly understood our vision.",
    author: "Minh Tuan Tran",
    position: "Furniture Showroom Owner",
    image:
      "data:image/jpeg;base64,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",
  },
  {
    id: 3,
    quote:
      "I had been searching for the perfect dining set for weeks until I found Eco Decore. The design and quality were exactly what I wanted.",
    author: "Thao Vy Le",
    position: "Loyal Customer",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJjPGvIcN1xmPb3rKdhBxE3lj5b5v8fkvZ9w&s",
  },
];

const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((current + 1) % testimonials.length);
  const prev = () =>
    setCurrent((current - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-16 md:py-24 bg-gray-600 text-white">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12">
          <h2 className="section-title text-white">Customer Feedback</h2>
          <p className="section-subtitle text-gray-300 mx-auto">
            What our customers say about choosing our furniture
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative px-6 py-10 md:p-12 bg-gray-800 rounded-xl">
            <Quote className="absolute top-6 left-6 text-corporate-500 opacity-30 h-12 w-12" />

            <div
              key={testimonials[current].id}
              className="flex flex-col md:flex-row gap-8 items-center"
            >
              <div className="w-full md:w-1/3">
                <div className="w-28 h-28 md:w-full md:h-auto rounded-full md:rounded-lg overflow-hidden aspect-square mx-auto md:mx-0">
                  <img
                    src={testimonials[current].image}
                    alt={testimonials[current].author}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="w-full md:w-2/3 flex flex-col">
                <blockquote className="text-lg md:text-xl mb-6 italic">
                  "{testimonials[current].quote}"
                </blockquote>
                <div>
                  <p className="font-medium text-lg">
                    {testimonials[current].author}
                  </p>
                  <p className="text-gray-400">
                    {testimonials[current].position}
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 flex space-x-2 bg-gray-900 px-3 py-2 rounded-full">
              <button
                onClick={prev}
                className="p-1 rounded-full hover:bg-gray-700 transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={`w-2 h-2 rounded-full ${
                    index === current ? "bg-corporate-500" : "bg-gray-600"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}

              <button
                onClick={next}
                className="p-1 rounded-full hover:bg-gray-700 transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
