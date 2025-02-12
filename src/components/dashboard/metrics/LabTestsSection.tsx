
import { Button } from "@/components/ui/button";
import { Upload, ShoppingCart, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useIsMobile } from "@/hooks/use-mobile";

export const LabTestsSection = () => {
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState({
    bloodwork: false,
    genetic: false
  });
  const isMobile = useIsMobile();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>, type: 'bloodwork' | 'genetic') => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF file",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(prev => ({ ...prev, [type]: true }));

    try {
      // First, upload the file to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `${type}_results/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('health_files')
        .upload(filePath, file);

      if (uploadError) {
        throw new Error('Failed to upload file');
      }

      // Now call the process-lab-results function
      const { data: session } = await supabase.auth.getSession();
      if (!session?.session?.access_token) {
        throw new Error('No authentication session found');
      }

      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', type);

      const response = await supabase.functions.invoke('process-lab-results', {
        body: formData,
      });

      if (response.error) {
        throw new Error(response.error.message);
      }

      toast({
        title: "Results uploaded successfully",
        description: "Your results are being processed and will be available shortly.",
      });

    } catch (error: any) {
      console.error('Upload error:', error);
      toast({
        title: "Upload failed",
        description: error.message || "There was an error uploading your results.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(prev => ({ ...prev, [type]: false }));
    }
  };

  const handlePurchase = () => {
    toast({
      title: "Redirecting to lab test purchase",
      description: "You'll be redirected to our partner's website to purchase your lab test.",
    });
    window.open("/purchase-tests", "_blank");
  };

  const buttonClasses = `
    w-full bg-gradient-to-r from-[#0EA5E9]/20 to-[#10B981]/20 
    hover:from-[#0EA5E9]/30 hover:to-[#10B981]/30 
    border-2 border-[#0EA5E9]/50 
    hover:border-[#0EA5E9] 
    transition-all duration-300 
    active:from-[#0EA5E9] active:to-[#10B981] active:text-white
    shadow-lg hover:shadow-xl hover:scale-[1.01]
    disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
  `;

  const tileClasses = "flex flex-col items-center justify-between h-full p-3 md:p-4 bg-background rounded-lg border";
  const iconClasses = "h-6 w-6 md:h-8 md:w-8 mb-2 text-primary";
  const titleClasses = "font-medium mb-2 text-sm md:text-base text-center";
  const descriptionClasses = "text-xs md:text-sm text-muted-foreground text-center mb-3 md:mb-4";
  const buttonWrapperClasses = "w-full mt-auto";

  return (
    <div className="mt-4 md:mt-6 p-4 md:p-6 border-2 border-dashed rounded-lg bg-muted/50">
      <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4">Tests</h3>
      <div className={`grid grid-cols-1 ${isMobile ? 'gap-3' : 'md:grid-cols-3 gap-4'}`}>
        <div className={tileClasses}>
          <div>
            <Upload className={iconClasses} />
            <h4 className={titleClasses}>Upload your Bloodwork</h4>
            <p className={descriptionClasses}>
              Drop your lab test results here or click to upload
            </p>
          </div>
          <div className={buttonWrapperClasses}>
            <label className="w-full">
              <input
                type="file"
                className="hidden"
                accept=".pdf"
                onChange={(e) => handleFileUpload(e, 'bloodwork')}
                disabled={isUploading.bloodwork}
              />
              <Button 
                variant="outline" 
                className={`${buttonClasses} flex items-center justify-center gap-2 text-xs md:text-sm`}
                disabled={isUploading.bloodwork}
              >
                {isUploading.bloodwork ? (
                  <>
                    <Loader2 className="h-3 w-3 md:h-4 md:w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Upload className="h-3 w-3 md:h-4 md:w-4" />
                    Choose File
                  </>
                )}
              </Button>
            </label>
          </div>
        </div>

        <div className={tileClasses}>
          <div>
            <Upload className={iconClasses} />
            <h4 className={titleClasses}>Upload your Genetic Test</h4>
            <p className={descriptionClasses}>
              Drop your genetic test results here or click to upload
            </p>
          </div>
          <div className={buttonWrapperClasses}>
            <label className="w-full">
              <input
                type="file"
                className="hidden"
                accept=".pdf"
                onChange={(e) => handleFileUpload(e, 'genetic')}
                disabled={isUploading.genetic}
              />
              <Button 
                variant="outline" 
                className={`${buttonClasses} flex items-center justify-center gap-2 text-xs md:text-sm`}
                disabled={isUploading.genetic}
              >
                {isUploading.genetic ? (
                  <>
                    <Loader2 className="h-3 w-3 md:h-4 md:w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Upload className="h-3 w-3 md:h-4 md:w-4" />
                    Choose File
                  </>
                )}
              </Button>
            </label>
          </div>
        </div>
        
        <div className={tileClasses}>
          <div>
            <ShoppingCart className={iconClasses} />
            <h4 className={titleClasses}>Purchase a Lab Test</h4>
            <p className={descriptionClasses}>
              Get comprehensive lab testing through our trusted partners
            </p>
          </div>
          <div className={buttonWrapperClasses}>
            <Button 
              onClick={handlePurchase} 
              className={`${buttonClasses} text-xs md:text-sm`}
            >
              Order Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
