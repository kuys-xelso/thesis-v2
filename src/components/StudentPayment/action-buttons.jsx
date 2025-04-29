import React from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

const ActionButtons = ({ onCancel, onProcess, disabled, isProcessing }) => {
  return (
    <div className="flex justify-end gap-4">
      <Button variant="outline" onClick={onCancel}>
        Cancel
      </Button>
      <Button disabled={disabled} onClick={onProcess}>
        {isProcessing ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          'Process Payment'
        )}
      </Button>
    </div>
  );
};

export default ActionButtons;