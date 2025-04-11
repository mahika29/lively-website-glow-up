
import React from 'react';
import { AlertTriangle, LogOut, Maximize } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface ExitWarningDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEndExam: () => void;
  onReturnToFullscreen: () => void;
}

const ExitWarningDialog: React.FC<ExitWarningDialogProps> = ({
  open,
  onOpenChange,
  onEndExam,
  onReturnToFullscreen
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Warning: Fullscreen Mode Exited</DialogTitle>
          <DialogDescription>
            Leaving fullscreen mode during an exam may be considered a violation. Please return to fullscreen mode to continue.
          </DialogDescription>
        </DialogHeader>
        <div className="bg-yellow-50 p-3 rounded-md text-yellow-800 text-sm mt-2">
          <AlertTriangle className="h-5 w-5 inline-block mr-2 text-yellow-600" />
          This event has been logged. Repeated violations may result in your exam being terminated.
        </div>
        <DialogFooter className="sm:justify-center">
          <Button 
            variant="destructive" 
            className="gap-1"
            onClick={onEndExam}
          >
            <LogOut size={16} /> End Exam
          </Button>
          <Button
            onClick={onReturnToFullscreen}
          >
            <Maximize size={16} className="mr-2" />
            Return to Fullscreen
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ExitWarningDialog;
