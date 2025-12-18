'use client';

import React, { useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { useTranslations } from 'next-intl';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

import { saveCar } from '@/lib/actions';
import type { Car } from '@/lib/definitions';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

type CarFormDialogProps = {
  car?: Car | null;
  isOpen: boolean;
  onClose: () => void;
};

function SubmitButton({ isEditing }: { isEditing: boolean }) {
  const { pending } = useFormStatus();
  const t = useTranslations('Admin');

  return (
    <Button type="submit" disabled={pending}>
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {t('save')}
    </Button>
  );
}

export function CarFormDialog({ car, isOpen, onClose }: CarFormDialogProps) {
  const t = useTranslations('Admin');
  const { toast } = useToast();
  const isEditing = !!car;

  const [state, dispatch] = useFormState(saveCar, { success: false, message: '' });

  useEffect(() => {
    if (state?.message) {
      toast({
        title: state.success ? 'Success' : 'Error',
        description: state.message,
        variant: state.success ? 'default' : 'destructive',
      });
      if (state.success) {
        onClose();
      }
    }
  }, [state, toast, onClose]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? t('editCar') : t('addCar')}</DialogTitle>
          <DialogDescription>{t('description')}</DialogDescription>
        </DialogHeader>
        <form action={dispatch} className="grid gap-4 py-4">
          {isEditing && <input type="hidden" name="id" value={car.id} />}
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">{t('carNameLabel')}</Label>
            <Input id="name" name="name" defaultValue={car?.name} className="col-span-3" required />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="image" className="text-right">{t('carImageLabel')}</Label>
            <Input id="image" name="image" type="url" defaultValue={car?.image} className="col-span-3" required />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="capacity" className="text-right">{t('carCapacityLabel')}</Label>
            <Input id="capacity" name="capacity" type="number" defaultValue={car?.capacity} className="col-span-3" required />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right">{t('carPriceLabel')}</Label>
            <Input id="price" name="price" type="number" step="0.01" defaultValue={car?.price} className="col-span-3" required />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="transmission" className="text-right">{t('carTransmissionLabel')}</Label>
            <Select name="transmission" defaultValue={car?.transmission || 'manual'}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select transmission" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="manual">{t('transmission_manual')}</SelectItem>
                <SelectItem value="automatic">{t('transmission_automatic')}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="is_available" className="text-right">{t('carAvailableLabel')}</Label>
            <Switch id="is_available" name="is_available" defaultChecked={car?.is_available ?? true} />
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={onClose} type="button">{t('cancel')}</Button>
            <SubmitButton isEditing={isEditing} />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
