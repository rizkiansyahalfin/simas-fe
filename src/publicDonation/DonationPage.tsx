// DonationPage.tsx

import DonationForm from "./DonationForm";
import DonationMethod from "./DonationMethode";
import Seo from "@/lib/Seo";

export default function DonationPage() {
  return (
    <>
      <Seo
        title="Donasi"
        description="Bantu kegiatan masjid dan program sosial dengan donasi mudah melalui SIMAS."
        image="https://images.unsplash.com/photo-1495710853257-34eb5f031c58?w=1200&q=80"
      />
      <div className="container mx-auto px-6 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* LEFT */}
        <DonationForm />


        {/* RIGHT */}
        <DonationMethod/>

      </div>
    </div>
    </>
  )
}