
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { AlertTriangle, ChevronDown, ChevronUp } from 'lucide-react';

const ImportantNotesCard = () => {
  const [isHindiOpen, setIsHindiOpen] = useState(false);

  return (
    <Card className="shadow-lg bg-gradient-to-r from-orange-50 to-yellow-50 border-orange-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl text-orange-800">
          <AlertTriangle className="w-5 h-5" />
          Important Notes / महत्वपूर्ण लेख
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* English Section */}
        <div className="space-y-4">
          <h3 className="font-semibold text-orange-900">English:</h3>
          <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
            <div className="flex items-start gap-2">
              <span className="text-orange-600 font-bold">•</span>
              <p>If you have any issue regarding payment then contact on Help-desk No.</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-orange-600 font-bold">•</span>
              <p>Do not raise unnecessary charge-backs or your admission will be cancelled.</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-orange-600 font-bold">•</span>
              <p>If the amount is deducted but not confirmed, wait for 48 hours before retrying.</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-orange-600 font-bold">•</span>
              <p>Keep your transaction receipts safe for future reference.</p>
            </div>
          </div>
        </div>

        {/* Hindi Section - Collapsible */}
        <Collapsible open={isHindiOpen} onOpenChange={setIsHindiOpen}>
          <CollapsibleTrigger asChild>
            <Button
              variant="outline"
              className="flex items-center justify-between w-full p-3 bg-white/50 hover:bg-white/70 border-orange-200"
            >
              <span className="font-medium text-orange-900">हिंदी में पढ़ें / Read in Hindi</span>
              {isHindiOpen ? (
                <ChevronUp className="w-4 h-4 text-orange-600" />
              ) : (
                <ChevronDown className="w-4 h-4 text-orange-600" />
              )}
            </Button>
          </CollapsibleTrigger>
          
          <CollapsibleContent className="mt-4">
            <div className="space-y-4 p-4 bg-white/30 rounded-lg border border-orange-200">
              <h3 className="font-semibold text-orange-900">हिंदी:</h3>
              <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
                <div className="flex items-start gap-2">
                  <span className="text-orange-600 font-bold">•</span>
                  <p>ऑनलाइन भुगतान के मामले में यदि भुगतान सफल नहीं होता है, तो 48 घंटे प्रतीक्षा करें।</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-orange-600 font-bold">•</span>
                  <p>अनावश्यक चार्ज-बैक न उठाएं, अन्यथा आपका प्रवेश रद्द कर दिया जाएगा।</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-orange-600 font-bold">•</span>
                  <p>भुगतान संबंधी किसी भी समस्या के लिए हेल्प-डेस्क नंबर पर संपर्क करें।</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-orange-600 font-bold">•</span>
                  <p>भविष्य के संदर्भ के लिए अपनी लेनदेन रसीदों को सुरक्षित रखें।</p>
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Contact Information */}
        <div className="mt-6 p-4 bg-white/50 rounded-lg border border-orange-200">
          <h4 className="font-semibold text-orange-900 mb-2">Contact Information:</h4>
          <div className="text-sm text-gray-700 space-y-1">
            <p><strong>Help Desk:</strong> +91-XXXX-XXXXXX</p>
            <p><strong>Email:</strong> support@university.edu</p>
            <p><strong>Office Hours:</strong> 9:00 AM - 5:00 PM (Mon-Fri)</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ImportantNotesCard;
