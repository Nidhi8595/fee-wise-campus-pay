
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, CreditCard, Smartphone, Building, CheckCircle, Loader2 } from 'lucide-react';

interface PaymentSectionProps {
  amount: number;
  onBack: () => void;
  onComplete: () => void;
}

const PaymentSection: React.FC<PaymentSectionProps> = ({ amount, onBack, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedMethod, setSelectedMethod] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const paymentMethods = [
    { id: 'upi', name: 'UPI Payment', icon: Smartphone, description: 'Pay using Google Pay, PhonePe, Paytm' },
    { id: 'netbanking', name: 'Net Banking', icon: Building, description: 'Pay using your bank account' },
    { id: 'card', name: 'Credit/Debit Card', icon: CreditCard, description: 'Pay using Visa, Mastercard, RuPay' },
  ];

  const handleMethodSelect = (methodId: string) => {
    setSelectedMethod(methodId);
    setCurrentStep(2);
  };

  const handleConfirmPayment = () => {
    setCurrentStep(3);
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setCurrentStep(4);
    }, 3000);
  };

  const handleComplete = () => {
    onComplete();
  };

  const steps = [
    'Choose Payment Method',
    'Confirm Details',
    'Processing Payment',
    'Payment Successful'
  ];

  const progressValue = (currentStep / steps.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button
            onClick={onBack}
            variant="outline"
            className="mb-4 flex items-center gap-2 hover:bg-gray-100"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">Payment Gateway</h1>
          <p className="text-gray-600 mt-2">Complete your fee payment securely</p>
        </div>

        {/* Progress Bar */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex justify-between text-sm font-medium">
                <span>Step {currentStep} of {steps.length}</span>
                <span>{Math.round(progressValue)}% Complete</span>
              </div>
              <Progress value={progressValue} className="h-2" />
              <div className="flex justify-between text-xs text-gray-500">
                {steps.map((step, index) => (
                  <span key={index} className={index + 1 <= currentStep ? 'text-blue-600 font-medium' : ''}>
                    {step}
                  </span>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Step Content */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl">{steps[currentStep - 1]}</CardTitle>
          </CardHeader>
          <CardContent>
            {currentStep === 1 && (
              <div className="space-y-4">
                <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-700 mb-2">Payment Amount</p>
                  <p className="text-2xl font-bold text-blue-900">₹{amount.toLocaleString()}</p>
                </div>

                <div className="space-y-3">
                  {paymentMethods.map((method) => {
                    const IconComponent = method.icon;
                    return (
                      <button
                        key={method.id}
                        onClick={() => handleMethodSelect(method.id)}
                        className="w-full p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 text-left"
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-gray-100 rounded-lg">
                            <IconComponent className="w-5 h-5 text-gray-700" />
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900">{method.name}</h3>
                            <p className="text-sm text-gray-600">{method.description}</p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Payment Method</p>
                    <p className="font-medium">{paymentMethods.find(m => m.id === selectedMethod)?.name}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Amount</p>
                    <p className="font-medium">₹{amount.toLocaleString()}</p>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h3 className="font-medium text-blue-900 mb-2">Payment Summary</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-blue-700">Fee Amount:</span>
                      <span className="font-medium">₹{amount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-700">Processing Fee:</span>
                      <span className="font-medium">₹0</span>
                    </div>
                    <div className="border-t border-blue-200 pt-2 flex justify-between font-medium">
                      <span className="text-blue-900">Total Amount:</span>
                      <span className="text-blue-900">₹{amount.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handleConfirmPayment}
                  className="w-full h-12 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl"
                >
                  Confirm & Pay ₹{amount.toLocaleString()}
                </Button>
              </div>
            )}

            {currentStep === 3 && (
              <div className="text-center py-12">
                <div className="mb-6">
                  {isProcessing ? (
                    <Loader2 className="w-16 h-16 text-blue-600 animate-spin mx-auto" />
                  ) : (
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                      <CreditCard className="w-8 h-8 text-blue-600" />
                    </div>
                  )}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {isProcessing ? 'Processing Payment...' : 'Redirecting to Payment Gateway'}
                </h3>
                <p className="text-gray-600">
                  {isProcessing 
                    ? 'Please wait while we process your payment securely.'
                    : 'You will be redirected to complete your payment.'
                  }
                </p>
                <div className="mt-6">
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    🔒 Secure Payment Gateway
                  </Badge>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="text-center py-12">
                <div className="mb-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-green-900 mb-2">Payment Successful!</h3>
                <p className="text-gray-600 mb-6">
                  Your payment of ₹{amount.toLocaleString()} has been processed successfully.
                </p>
                
                <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200 text-left">
                  <h4 className="font-medium text-green-900 mb-2">Transaction Details</h4>
                  <div className="space-y-1 text-sm text-green-700">
                    <p>Transaction ID: TXN{Date.now()}</p>
                    <p>Date: {new Date().toLocaleDateString()}</p>
                    <p>Time: {new Date().toLocaleTimeString()}</p>
                    <p>Amount: ₹{amount.toLocaleString()}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    Download Receipt
                  </Button>
                  <Button
                    onClick={handleComplete}
                    variant="outline"
                    className="w-full"
                  >
                    Return to Dashboard
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PaymentSection;
