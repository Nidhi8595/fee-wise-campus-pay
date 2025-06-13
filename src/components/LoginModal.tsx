
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { GraduationCap, Shield, User, Phone, Lock, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
  loginType: 'student' | 'admin';
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLoginSuccess, loginType }) => {
  const [formData, setFormData] = useState({
    studentId: '',
    phoneNumber: '',
    otp: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    if (!showOtp) {
      if (formData.studentId && formData.phoneNumber) {
        setShowOtp(true);
        toast({
          title: "OTP Sent",
          description: "Please enter the OTP sent to your phone (Use: 123)",
        });
      } else {
        toast({
          title: "Error",
          description: "Please fill in all fields",
          variant: "destructive",
        });
      }
    } else {
      if (formData.otp === '123') {
        toast({
          title: "Login Successful",
          description: "Welcome to the Fee Payment Portal",
        });
        onLoginSuccess();
        setFormData({ studentId: '', phoneNumber: '', otp: '' });
        setShowOtp(false);
      } else {
        toast({
          title: "Invalid OTP",
          description: "Please enter the correct OTP (123)",
          variant: "destructive",
        });
      }
    }

    setIsLoading(false);
  };

  const icon = loginType === 'student' ? GraduationCap : Shield;
  const IconComponent = icon;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md mx-auto">
        <DialogHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className={`p-3 rounded-full ${loginType === 'student' ? 'bg-blue-100' : 'bg-green-100'}`}>
              <IconComponent className={`w-8 h-8 ${loginType === 'student' ? 'text-blue-600' : 'text-green-600'}`} />
            </div>
          </div>
          <DialogTitle className="text-2xl font-bold">
            {loginType === 'student' ? 'Student Login' : 'Admin Login'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          {!showOtp ? (
            <>
              <div className="space-y-2">
                <Label htmlFor="studentId" className="text-sm font-medium text-gray-700">
                  {loginType === 'student' ? 'Student ID' : 'Admin ID'}
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="studentId"
                    type="text"
                    value={formData.studentId}
                    onChange={(e) => handleInputChange('studentId', e.target.value)}
                    className="pl-10 h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    placeholder={loginType === 'student' ? 'Enter Student ID' : 'Enter Admin ID'}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phoneNumber" className="text-sm font-medium text-gray-700">
                  Phone Number
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="phoneNumber"
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                    className="pl-10 h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Enter Phone Number"
                  />
                </div>
              </div>
            </>
          ) : (
            <div className="space-y-2">
              <Label htmlFor="otp" className="text-sm font-medium text-gray-700">
                Enter OTP
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="otp"
                  type="text"
                  value={formData.otp}
                  onChange={(e) => handleInputChange('otp', e.target.value)}
                  className="pl-10 h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-center text-lg tracking-widest"
                  placeholder="123"
                  maxLength={6}
                />
              </div>
              <p className="text-sm text-gray-500 text-center">
                For demo purposes, use OTP: <span className="font-mono font-bold">123</span>
              </p>
            </div>
          )}

          <Button
            type="submit"
            disabled={isLoading}
            className={`w-full h-12 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ${
              loginType === 'student' 
                ? 'bg-blue-600 hover:bg-blue-700' 
                : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                {showOtp ? 'Verifying...' : 'Sending OTP...'}
              </div>
            ) : (
              showOtp ? 'Verify & Login' : 'Send OTP'
            )}
          </Button>

          {showOtp && (
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowOtp(false)}
              className="w-full h-12 text-gray-700 border-gray-300 hover:bg-gray-50"
            >
              Back to Login
            </Button>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
