
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CreditCard, TrendingUp } from 'lucide-react';

interface FeeSummaryCardProps {
  onMakePayment: (amount: number) => void;
}

const FeeSummaryCard: React.FC<FeeSummaryCardProps> = ({ onMakePayment }) => {
  const totalFee = 283400;
  const paidAmount = 233400;
  const dueAmount = 50000;
  const progressPercent = (paidAmount / totalFee) * 100;

  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gradient-to-br from-blue-50 to-indigo-100">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-xl">
          <CreditCard className="w-5 h-5 text-blue-600" />
          Fee Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Total Amounts */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-white rounded-lg shadow-sm">
            <p className="text-sm text-gray-600 mb-1">Total Payable</p>
            <p className="text-2xl font-bold text-gray-900">₹{totalFee.toLocaleString()}</p>
          </div>
          <div className="text-center p-4 bg-white rounded-lg shadow-sm">
            <p className="text-sm text-gray-600 mb-1">Amount Due Now</p>
            <p className="text-2xl font-bold text-red-600">₹{dueAmount.toLocaleString()}</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Fee Payment Progress</span>
            <span className="font-medium">{Math.round(progressPercent)}% Paid</span>
          </div>
          <Progress value={progressPercent} className="h-3" />
          <div className="flex justify-between text-xs text-gray-500">
            <span>₹{paidAmount.toLocaleString()} Paid</span>
            <span>₹{dueAmount.toLocaleString()} Remaining</span>
          </div>
        </div>

        {/* Fee Breakdown */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-700 mb-3">Fee Breakdown</p>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              Academic: ₹2,00,000
            </Badge>
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              Hostel: ₹60,000
            </Badge>
            <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
              Fine: ₹23,400
            </Badge>
          </div>
        </div>

        {/* Payment Button */}
        <Button
          onClick={() => onMakePayment(dueAmount)}
          className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
        >
          <div className="flex items-center justify-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Make Payment - ₹{dueAmount.toLocaleString()}
          </div>
        </Button>
      </CardContent>
    </Card>
  );
};

export default FeeSummaryCard;
