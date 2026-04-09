import React, { ReactNode } from 'react';
import { FolderOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderContentProps {
    titleIcon: ReactNode;
    buttonIcon: ReactNode;
    sectionTitle: string;
    onOpenModal: () => void;
    onCategories?: () => void;
    showActionButtons?: boolean;
}

export default function HeaderContent({ titleIcon, buttonIcon, sectionTitle, onOpenModal, onCategories, showActionButtons }: HeaderContentProps) {
    const title = sectionTitle === "Notificaciones" ? "Notificaciones" : `Gestión de ${sectionTitle}`;
    const description = sectionTitle === "Notificaciones" ? "Revisa avisos operativos y novedades importantes del salón." : `Administra la disponibilidad de tus ${sectionTitle}.`;
    const buttonText = sectionTitle === "Notificaciones" ? "Marcar todas como leídas" : `Agregar ${sectionTitle}`;
    return (
        <div className="w-full">
            <div className="flex flex-col lg:flex-row md:justify-between items-center rounded-xl gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
                        {titleIcon}
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">{title}</h1>
                        <p className="text-gray-600 dark:text-gray-400">{description}</p>
                    </div>
                </div>

                {
                    showActionButtons && (
                        <div className="flex flex-col md:flex-row justify-center gap-2">
                            <Button variant="default" onClick={onOpenModal}>
                                {buttonIcon}
                                {buttonText}
                            </Button>

                            {onCategories && sectionTitle === "Servicios" && (
                                <Button
                                    onClick={onCategories}
                                    variant="outline"
                                    className="border-purple-200 text-purple-700 hover:bg-purple-50 dark:border-purple-700 dark:text-purple-300 dark:hover:bg-purple-900/20"
                                >
                                    <FolderOpen className="w-4 h-4 mr-2" />
                                    Gestionar Categorías
                                </Button>
                            )}
                        </div>
                    )
                }
            </div>
        </div>
    )
}