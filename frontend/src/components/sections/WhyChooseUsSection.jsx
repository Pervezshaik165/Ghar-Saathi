import React from "react";
import { WHY_CHOOSE_US } from "../../constants/data";
import helperImage from "../../assets/helpers.png";
export const WhyChooseUsSection = () => {
  return (
    <section className="bg-white py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* Image */}
        <div className="order-2 md:order-1">
          <img
            src={helperImage}
            alt="Professional domestic service team"
            className="rounded-3xl shadow-lg w-full h-auto object-cover"
            loading="lazy"
          />
        </div>

        {/* Content */}
        <div className="order-1 md:order-2 space-y-6">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
            Why Choose Gharsaathi?
          </h2>

          <div className="space-y-4">
            {WHY_CHOOSE_US.map((item, index) => (
              <div
                key={index}
                className="bg-gradient-to-r from-blue-50 to-green-50 p-5 sm:p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-blue-100"
              >
                <div className="flex items-start gap-4">
                  <span className="text-3xl flex-shrink-0">{item.icon}</span>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg mb-1">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm sm:text-base">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
