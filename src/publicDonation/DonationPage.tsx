// DonationPage.tsx

import DonationForm from "./DonationForm";
import DonationMethod from "./DonationMethode";


export default function DonationPage() {
  return (
    <div className="container mx-auto px-6 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* LEFT */}
        <DonationForm />


        {/* RIGHT */}
        <DonationMethod/>

      </div>
    </div>
  )
}