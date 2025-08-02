import { CountryBanner } from "./country-banner"
import { Navigation } from "./navigation"
import { IPhoneSection } from "./iphone-section"
import { ProductGrid } from "./product-grid"
import { AppleTVSection } from "./apple-tv-section"
import { Footer } from "./footer"

export function WebsiteContent() {
  return (
    <div className="website-content">
      <CountryBanner />
      <Navigation />
      <IPhoneSection />
      <ProductGrid />
      <AppleTVSection />
      <Footer />
    </div>
  )
} 