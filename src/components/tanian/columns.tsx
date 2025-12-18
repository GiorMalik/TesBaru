'use client';

import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal, ArrowUpDown, CheckCircle, XCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';

import type { Car } from '@/lib/definitions';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '../ui/badge';
import { cn } from '@/lib/utils';

type ActionsCellProps = {
  car: Car;
  onEdit: (car: Car) => void;
  onDelete: (id: string) => void;
};

function ActionsCell({ car, onEdit, onDelete }: ActionsCellProps) {
  const t = useTranslations('Admin');
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{t('table_header_actions')}</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => onEdit(car)}>{t('editCar')}</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-destructive" onClick={() => onDelete(car.id)}>
          {t('deleteCar')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export const getColumns = (
    onEdit: (car: Car) => void,
    onDelete: (id: string) => void
): ColumnDef<Car>[] => {
  const t = useTranslations('Admin');

  return [
    {
      accessorKey: 'name',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          {t('table_header_name')}
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorKey: 'capacity',
      header: t('table_header_capacity'),
    },
    {
      accessorKey: 'transmission',
      header: t('table_header_transmission'),
      cell: ({ row }) => {
        const transmission = row.getValue('transmission') as string;
        return <span>{t(`transmission_${transmission}` as any)}</span>;
      }
    },
    {
      accessorKey: 'price',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          {t('table_header_price')}
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue('price'));
        const formatted = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(amount);
        return <div className="font-medium">{formatted}</div>;
      },
    },
    {
      accessorKey: 'is_available',
      header: t('table_header_availability'),
      cell: ({ row }) => {
        const isAvailable = row.getValue('is_available');
        return (
          <Badge variant={isAvailable ? 'default' : 'destructive'} 
            className={cn(isAvailable ? 'bg-green-700 hover:bg-green-600' : 'bg-red-700 hover:bg-red-600', 'text-white')}>
            {isAvailable ? <CheckCircle className="mr-2 h-4 w-4" /> : <XCircle className="mr-2 h-4 w-4" />}
            {isAvailable ? 'Yes' : 'No'}
          </Badge>
        );
      },
    },
    {
      id: 'actions',
      header: t('table_header_actions'),
      cell: ({ row }) => (
        <ActionsCell car={row.original} onEdit={onEdit} onDelete={onDelete} />
      ),
    },
  ];
}
