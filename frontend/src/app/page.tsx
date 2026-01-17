import FeatureSection from "@/components/base/FeatureSection";
import Footer from "@/components/base/Footer";
import HeroSection from "@/components/base/HeroSection";
import Navbar from "@/components/base/Navbar";
import UserReviews from "@/components/base/UserReviews";
import Image from "next/image";

export default function Home() {
  return (
		<div className="min-h-screen flex flex-col ">
			{/* Header */}
			{/* <Navbar user={session?.user ?? null} /> */}
			<Navbar />
			{/* Hero Section */}
			<HeroSection />

			{/* Features Section */}
			<FeatureSection />

			{/* User Reviews Section */}
			<UserReviews />

			{/* Footer */}
			<Footer />
		</div>
	);
}
