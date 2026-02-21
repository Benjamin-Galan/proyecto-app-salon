import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useForm } from '@inertiajs/react'
import type { Category } from '@/types'
import React from 'react'
import { route } from 'ziggy-js'

interface Props {
    category?: Category | null
    onClose: () => void
}

export function CategoryForm({ category, onClose }: Props) {
    const { data, setData, post, put, processing, errors } = useForm({
        name: category?.name ?? '',
    })

    const submit = (e: React.FormEvent) => {
        e.preventDefault()

        if (category) {
            put(route('admin.categories.update', category.id), {
                onSuccess: onClose,
            })
        } else {
            post(route('admin.categories.store'), {
                onSuccess: onClose,
            })
        }
    }

    return (
        <form onSubmit={submit} className="space-y-4">
            <div>
                <Label htmlFor="name">Nombre</Label>
                <Input
                    id="name"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                />
                {errors.name && (
                    <p className="text-sm text-red-500 mt-1">{errors.name}</p>
                )}
            </div>

            {/* Botón de envío */}
            <div className="flex justify-end gap-3 pt-4">
                <Button type="submit" disabled={processing}>
                    {category ? 'Actualizar' : 'Crear'}
                </Button>
            </div>
        </form>
    )
}