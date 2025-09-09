import ShamsiCalendar from "@/components/ShamsiCalendar";
import { Button } from "@/components/ui/button";
import type { ExercisesMutateProps } from "@/types/types";
import { Link } from "react-router-dom";
import { Menu, X, Home, BarChart3, Dumbbell } from "lucide-react";
import { useState } from "react";

const Navbar: React.FC<ExercisesMutateProps> = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      {/* Main Navbar */}
      <nav className="w-full h-16 bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200/20 fixed top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-full">
          <div className="flex items-center justify-between h-full">
            {/* Logo/Brand Section - Right side for RTL */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">
                  <Dumbbell />
                </span>
              </div>
              <span className="font-bold text-gray-800 text-lg sm:block">
                رهگیر ورزشی
              </span>
            </div>

            {/* Desktop Navigation - Left side for RTL */}
            <div className="hidden md:flex items-center gap-2">
              <Button
                variant="ghost"
                className="relative overflow-hidden group hover:bg-blue-50 transition-all duration-300"
                asChild
              >
                <Link to="/" className="flex items-center gap-2 px-4 py-2">
                  <Home size={18} />
                  <span>خانه</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
              </Button>

              <Button
                variant="ghost"
                className="relative overflow-hidden group hover:bg-green-50 transition-all duration-300"
                asChild
              >
                <Link
                  to="/workoutchart/week"
                  className="flex items-center gap-2 px-4 py-2"
                >
                  <BarChart3 size={18} />
                  <span>نمودار کالری</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
              </Button>

              <div className="w-px h-6 bg-gray-300 mx-2" />

              <div className="relative">
                <ShamsiCalendar />
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              aria-label="منوی موبایل"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={toggleMenu}
        />
      )}

      {/* Mobile Menu */}
      <div
        className={`
        fixed top-16 right-0 w-72 h-screen bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out md:hidden
        ${isMenuOpen ? "translate-x-0" : "translate-x-full"}
      `}
      >
        <div className="p-6 space-y-4">
          {/* Mobile Navigation Links */}
          <div className="space-y-3">
            <Button
              variant="ghost"
              className="w-full justify-start text-right hover:bg-blue-50 transition-all duration-300 h-12"
              asChild
              onClick={toggleMenu}
            >
              <Link to="/" className="flex items-center gap-3 px-4">
                <span>خانه</span>
                <Home size={20} />
              </Link>
            </Button>

            <Button
              variant="ghost"
              className="w-full justify-start text-right hover:bg-green-50 transition-all duration-300 h-12"
              asChild
              onClick={toggleMenu}
            >
              <Link
                to="/workoutchart/week"
                className="flex items-center gap-3 px-4"
              >
                <span>نمودار کالری</span>
                <BarChart3 size={20} />
              </Link>
            </Button>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-gradient-to-l from-gray-300 to-transparent my-6" />

          {/* Mobile Calendar */}
          <div className="flex items-center justify-between">
            <span className="text-gray-700 font-medium">تقویم</span>
            <ShamsiCalendar />
          </div>
        </div>

        {/* Bottom Decoration */}
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-blue-500/10 to-transparent rounded-tl-full" />
      </div>

      {/* Spacer for fixed navbar */}
      <div className="h-16" />
    </>
  );
};

export default Navbar;
