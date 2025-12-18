"use client"

import { Button } from "@/components/ui/button"
import { deleteCar } from "@/lib/actions-admin"
import { Trash2 } from "lucide-react"
import { useTransition } from "react"

export function DeleteCarButton({ id }: { id: string }) {
    const [isPending, startTransition] = useTransition()

    const handleDelete = () => {
        if (confirm("Apakah Anda yakin ingin menghapus mobil ini?")) {
            startTransition(async () => {
                await deleteCar(id)
            })
        }
    }

    return (
        <Button onClick={handleDelete} variant="destructive" size="sm" disabled={isPending}>
            <Trash2 className="h-4 w-4" />
        </Button>
    )
}
