<?php

namespace Tests\Feature\Promotions;

use App\Models\Category;
use App\Models\Promotion;
use App\Models\Service;
use App\Services\UpdatePromotion;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UpdatePromotionTest extends TestCase
{
    use RefreshDatabase;

    public function test_it_syncs_removed_added_services_and_discounts_when_updating_an_individual_promotion(): void
    {
        $category = Category::create([
            'name' => 'Cabello',
            'active' => true,
        ]);

        $serviceA = Service::create([
            'name' => 'Corte',
            'description' => 'Corte basico',
            'price' => 100,
            'total_price' => 100,
            'discount' => 0,
            'duration' => '30',
            'category_id' => $category->id,
            'active' => true,
        ]);

        $serviceB = Service::create([
            'name' => 'Lavado',
            'description' => 'Lavado basico',
            'price' => 50,
            'total_price' => 50,
            'discount' => 0,
            'duration' => '15',
            'category_id' => $category->id,
            'active' => true,
        ]);

        $serviceC = Service::create([
            'name' => 'Peinado',
            'description' => 'Peinado sencillo',
            'price' => 80,
            'total_price' => 80,
            'discount' => 0,
            'duration' => '20',
            'category_id' => $category->id,
            'active' => true,
        ]);

        $promotion = Promotion::create([
            'name' => 'Promo inicial',
            'description' => 'Promo individual',
            'duration' => '45',
            'subtotal' => 150,
            'discount' => 0,
            'total' => 140,
            'promotion_type' => 'Individual',
            'expire_date' => '2026-12-31',
            'main' => false,
        ]);

        $promotion->services()->attach([
            $serviceA->id => [
                'service_price' => 100,
                'service_discount' => 10,
            ],
            $serviceB->id => [
                'service_price' => 50,
                'service_discount' => 0,
            ],
        ]);

        app(UpdatePromotion::class)->updatePromotion($promotion, [
            'name' => 'Promo editada',
            'description' => 'Promo individual actualizada',
            'promotion_type' => 'Individual',
            'discount' => 0,
            'expire_date' => '2026-12-31',
            'duration' => '50',
            'main' => false,
            'services' => [
                [
                    'service_id' => $serviceA->id,
                    'service_discount' => 20,
                ],
                [
                    'service_id' => $serviceC->id,
                    'service_discount' => 15,
                ],
            ],
        ]);

        $promotion->refresh()->load('services');

        $this->assertCount(2, $promotion->services);
        $this->assertEqualsCanonicalizing(
            [$serviceA->id, $serviceC->id],
            $promotion->services->pluck('id')->all()
        );
        $this->assertDatabaseMissing('promotions_services', [
            'promotion_id' => $promotion->id,
            'service_id' => $serviceB->id,
        ]);
        $this->assertDatabaseHas('promotions_services', [
            'promotion_id' => $promotion->id,
            'service_id' => $serviceA->id,
            'service_discount' => 20.00,
        ]);
        $this->assertDatabaseHas('promotions_services', [
            'promotion_id' => $promotion->id,
            'service_id' => $serviceC->id,
            'service_discount' => 15.00,
        ]);
    }
}
