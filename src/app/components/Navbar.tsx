'use client';

import React, { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

// Define the type for the nav items
interface NavItem {
  name: string;
  href: string;
}

// Define the navigation items
const navItems: NavItem[] = [
  { name: "Home", href: "/#home" },
  { name: "Services", href: "/#services" },
  { name: "Portfolio", href: "/#portfolio" },
  { name: "About", href: "/#about" },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Toggle mobile menu visibility
  const toggleMenu = useCallback(() => setIsOpen((prev) => !prev), []);

  // Scroll to the target section or scroll to top if section doesn't exist
  const scrollToSection = useCallback((sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const yOffset = -80;
      const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  // Handle link navigation and smooth scroll
  const handleNavigation = useCallback(
    async (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      setIsOpen(false);

      if (href.startsWith("/#")) {
        const sectionId = href.slice(2);
        if (pathname === "/") {
          scrollToSection(sectionId);
        } else {
          await router.push("/");
          setTimeout(() => scrollToSection(sectionId), 100);
        }
      } else {
        await router.push(href);
      }
    },
    [pathname, router, scrollToSection]
  );

  // Memoized navigation items for performance
  const renderNavItems = useMemo(
    () =>
      navItems.map((item) => (
        <motion.div
          key={item.name}
          className={`text-white hover:bg-purple-700 px-3 py-2 rounded-md text-md font-bold ${
            pathname === item.href || (pathname === "/" && item.href.startsWith("/#"))
              ? "bg-[#472151]"
              : ""
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <a href={item.href} onClick={(e) => handleNavigation(e, item.href)}>
            {item.name}
          </a>
        </motion.div>
      )),
    [pathname, handleNavigation]
  );

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-transparent via-black to-[#301934] backdrop-blur-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image src="/" width={100} height={100} alt="Logo" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {renderNavItems}
            <motion.button
              className="bg-yellow-400 text-purple-900 px-4 py-2 rounded-lg text-sm font-medium"
              whileHover={{ scale: 1.05, backgroundColor: "#fbbf24" }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => handleNavigation(e as any, "/contact")}
            >
              Contact Us
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <motion.button
                  className="p-2 rounded-full bg-purple-950 text-white"
                  whileHover={{ scale: 1.05, backgroundColor: "#6d28d9" }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Menu size={24} />
                </motion.button>
              </SheetTrigger>

              {/* Mobile Navigation Menu */}
              <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-gradient-to-b from-[#301934] via-black to-[#301934]">
                <SheetHeader>
                  <SheetTitle className="text-white">Menu</SheetTitle>
                  <SheetDescription className="text-gray-300">Navigate through our site</SheetDescription>
                </SheetHeader>

                <nav className="flex flex-col h-full mt-4">
                  {/* Contact Us button at the top of the mobile menu */}
                  <motion.button
                    className="bg-yellow-400 text-purple-900 px-4 py-2 rounded-lg text-sm font-medium mb-4 mx-4"
                    whileHover={{ scale: 1.05, backgroundColor: "#fbbf24" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => handleNavigation(e as any, "/contact")}
                  >
                    Contact Us
                  </motion.button>

                  <AnimatePresence>
                    {navItems.map((item, index) => (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30, delay: index * 0.1 }}
                      >
                        <a
                          href={item.href}
                          onClick={(e) => handleNavigation(e, item.href)}
                          className="text-white hover:bg-purple-700 px-4 py-2 rounded-md block"
                        >
                          {item.name}
                        </a>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default React.memo(Navbar);
