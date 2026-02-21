import React, { ReactNode } from 'react';
import { FolderOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderContentProps {
    titleIcon: ReactNode;
    buttonIcon: ReactNode;
    sectionTitle: string;
    onOpenModal: () => void;
    onCategories?: () => void;
}

export default function HeaderContent({ titleIcon, buttonIcon, sectionTitle, onOpenModal, onCategories }: HeaderContentProps) {

    return (
        <div className="w-full">
            <div className="flex md:justify-between items-center rounded-xl">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
                        {titleIcon}
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Gestión de {sectionTitle}</h1>
                        <p className="text-gray-600 dark:text-gray-400">Administra la disponibilidad de tus {sectionTitle}.</p>
                    </div>
                </div>

                <div className="flex justify-center">
                    <Button variant="default" onClick={onOpenModal}>
                        {buttonIcon}
                        Agregar {sectionTitle}
                    </Button>

                    {onCategories && sectionTitle === "Servicios" && (
                        <Button
                            onClick={onCategories}
                            variant="outline"
                            className="ml-4 border-purple-200 text-purple-700 hover:bg-purple-50 dark:border-purple-700 dark:text-purple-300 dark:hover:bg-purple-900/20"
                        >
                            <FolderOpen className="w-4 h-4 mr-2" />
                            Gestionar Categorías
                        </Button>
                    )}
                </div>
            </div>
        </div>
    )
}