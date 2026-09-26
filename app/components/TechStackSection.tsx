"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Technology {
  id: string;
  name: string;
  category: string;
  description: string;
  icon: string;
  rating: number;
  difficulty: string;
  badge: string;
}

export default function TechStackSection() {
  const [technologies, setTechnologies] = useState<Technology[]>([]);
  const [stack, setStack] = useState<Technology[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("./data/technologies.json");
        const data = await res.json();
        setTechnologies(data);
      } catch (error) {
        console.error("Failed to load technologies:", error);
        toast.error("Failed to load technologies");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const addToStack = (tech: Technology) => {
    const alreadyAdded = stack.some((item) => item.id === tech.id);

    if (alreadyAdded) {
      toast.warning(`${tech.name} is already in your stack!`);
      return;
    }

    setStack((prev) => [...prev, tech]);
    toast.success(`${tech.name} added to your stack!`);
  };

  // Remove all from stack
  const removeAll = () => {
    if (stack.length === 0) {
      toast.info("Your stack is already empty");
      return;
    }
    setStack([]);
    toast.info("All technologies removed from stack");
  };

  const removeFromStack = (id: string) => {
    setStack((prev) => prev.filter((item) => item.id !== id));
    toast.info("Removed from stack");
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[400px] gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <p className="text-gray-500 text-sm">Loading technologies...</p>
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 ">
      <div className="mb-10 text-center">
        <h2 className="text-3xl md:text-4xl text-brand-gradient font-bold text-gray-900 mb-3">
          Build Your Tech Stack
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Click on any technology card to add it to your stack. You can only add each technology once.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {technologies.map((tech) => {
              const isSelected = stack.some((item) => item.id === tech.id);

              return (
                <div
                  key={tech.id}
                  className={`
                    relative bg-white rounded-2xl border p-5
                    transition-all duration-300 hover:shadow-xl hover:-translate-y-1
                    ${isSelected 
                      ? "border-blue-500 ring-2 ring-blue-200 bg-blue-50" 
                      : "border-gray-200 hover:border-blue-300"
                    }
                  `}
                >
                  <span className="absolute top-4 right-4 text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-100 text-blue-700">
                    {tech.badge}
                  </span>

                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 flex-shrink-0 bg-gray-50 rounded-xl p-2 flex items-center justify-center">
                      <Image
                        src={tech.icon}
                        alt={tech.name}
                        height={40}
                        width={40}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900">{tech.name}</h3>
                      <p className="text-sm text-gray-500">{tech.category}</p>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {tech.description}
                  </p>

                  <div className="flex items-center justify-between text-xs text-gray-500 mb-5">
                    <span className="flex items-center gap-1">
                       {tech.rating}
                    </span>
                    <span className="px-2 py-1 bg-gray-100 rounded-md">
                      {tech.difficulty}
                    </span>
                  </div>

                  {/* Add to Stack Button */}
                  <button
                    onClick={() => addToStack(tech)}
                    disabled={isSelected}
                    className={`
                      w-full py-2.5 rounded-xl text-sm font-medium transition-all
                      ${isSelected
                        ? "bg-blue-100 text-blue-600 cursor-not-allowed"
                        : "bg-[#d91b7e] text-white hover:bg-[#c2166d] active:scale-[0.98]"
                      }
                    `}
                  >
                    {isSelected ? "✓ Added to Stack" : "Add to Stack"}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-15 bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">

            <div className="bg-brand-gradient px-5 py-4">
              <h3 className="text-white font-bold text-lg flex items-center gap-2">
                <span></span> Your Stack
              </h3>
              <p className="text-white text-sm mt-1">
                {stack.length} technolog{stack.length === 1 ? "y" : "ies"} selected
              </p>
            </div>

            <div className="p-4 max-h-[480px] overflow-y-auto">
              {stack.length === 0 ? (
                <div className="text-center py-10 text-gray-400">
                  <p className="text-sm">Your Stack is empty</p>
                </div>
              ) : (
                <ul className="space-y-3">
                  {stack.map((tech) => (
                    <li
                      key={tech.id}
                      className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl group"
                    >
                      <img
                        src={tech.icon}
                        alt={tech.name}
                        className="w-8 h-8 object-contain"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm text-gray-900 truncate">
                          {tech.name}
                        </p>
                        <p className="text-xs text-gray-500">{tech.category}</p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFromStack(tech.id);
                        }}
                        className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 transition-opacity text-sm"
                        title="Remove"
                      >
                        ✕
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="p-4 border-t border-gray-100">
              <button
                onClick={removeAll}
                disabled={stack.length === 0}
                className={`
                  w-full py-2.5 rounded-xl font-medium text-sm transition-all
                  ${stack.length === 0
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-red-50 text-red-600 hover:bg-red-100 active:scale-[0.98]"
                  }
                `}
              >
                Remove All
              </button>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer
        position="bottom-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </section>
  );
}