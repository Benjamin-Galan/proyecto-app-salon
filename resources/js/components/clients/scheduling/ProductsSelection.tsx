import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { ProductType } from "@/hooks/useCart";
import type { ClientScreen, Package, Promotion, Service } from "@/types";
import { Calendar, ShoppingCart } from "lucide-react";
import { ProductsCard } from "./ProductsCard";

interface Props {
    handleScheduleScreenChange: (screen: ClientScreen) => void;
    services: Service[];
    packages: Package[];
    promotions: Promotion[];
    cartItemsCount: number;
    onAddItem: (
        item: Service | Package | Promotion,
        type: ProductType,
    ) => void;
}

export default function ProductsSelection({
    handleScheduleScreenChange,
    services,
    packages,
    promotions,
    cartItemsCount,
    onAddItem,
}: Props) {
    const handleAddService = (
        item: Service | Package | Promotion,
        type: ProductType,
    ) => {
        console.log("Agregando al carrito:", item, "Tipo:", type);
        onAddItem(item, type);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="font-bold sm:text-2xl">Servicios</h1>
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleScheduleScreenChange("cart")}
                        className="relative"
                    >
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Carrito
                        {cartItemsCount > 0 && (
                            <Badge className="absolute -top-2 -right-2 h-5 min-w-5 rounded-full px-1 text-xs">
                                {cartItemsCount}
                            </Badge>
                        )}
                    </Button>

                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                            handleScheduleScreenChange("appointments")
                        }
                    >
                        <Calendar className="mr-2 h-4 w-4" />
                        Mis Citas
                    </Button>
                </div>
            </div>

            <Tabs defaultValue="services" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="services">Servicios</TabsTrigger>
                    <TabsTrigger value="promotions">Promociones</TabsTrigger>
                    <TabsTrigger value="packages">Paquetes</TabsTrigger>
                </TabsList>

                <TabsContent value="services" className="space-y-4">
                    <div className="grid gap-4">
                        {services.map((service) => (
                            <ProductsCard
                                key={service.id}
                                item={service}
                                type="service"
                                onAdd={() =>
                                    handleAddService(service, "service")
                                }
                            />
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="packages" className="space-y-4">
                    <div className="grid gap-4">
                        {packages.map((pkg) => (
                            <ProductsCard
                                key={pkg.id}
                                item={pkg}
                                type="package"
                                onAdd={() =>
                                    handleAddService(pkg, "package")
                                }
                            />
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="promotions" className="space-y-4">
                    <div className="grid gap-4">
                        {promotions.map((promotion) => (
                            <ProductsCard
                                key={promotion.id}
                                item={promotion}
                                type="promotion"
                                onAdd={() =>
                                    handleAddService(promotion, "promotion")
                                }
                            />
                        ))}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
