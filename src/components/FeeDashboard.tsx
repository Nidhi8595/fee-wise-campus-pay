
import React, { useState } from 'react';
import StudentProfileCard from './StudentProfileCard';
import FeeSummaryCard from './FeeSummaryCard';
import FeeDetailsSection from './FeeDetailsSection';
import PaymentSection from './PaymentSection';
import ImportantNotesCard from './ImportantNotesCard';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface FeeDashboardProps {
  onBackToLanding: () => void;
}

const FeeDashboard: React.FC<FeeDashboardProps> = ({ onBackToLanding }) => {
  const [showPayment, setShowPayment] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(0);

  const handleMakePayment = (amount: number) => {
    setSelectedAmount(amount);
    setShowPayment(true);
  };

  const handlePaymentComplete = () => {
    setShowPayment(false);
    setSelectedAmount(0);
  };

  if (showPayment) {
    return (
      <PaymentSection
        amount={selectedAmount}
        onBack={() => setShowPayment(false)}
        onComplete={handlePaymentComplete}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button
            onClick={onBackToLanding}
            variant="outline"
            className="mb-4 flex items-center gap-2 hover:bg-gray-100"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Login
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">Fee Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage your fee payments and view details</p>
        </div>

        {/* Top Grid - Profile and Summary */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <StudentProfileCard />
          <FeeSummaryCard onMakePayment={handleMakePayment} />
        </div>

        {/* Fee Details Section */}
        <div className="mb-8">
          <FeeDetailsSection />
        </div>

        {/* Important Notes */}
        <ImportantNotesCard />
      </div>
    </div>
  );
};

export default FeeDashboard;
