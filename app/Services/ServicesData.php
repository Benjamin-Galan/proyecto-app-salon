<?php

namespace App\Services;

use Illuminate\Support\Collection;

class ServicesData
{
    public function __construct(
        public Collection $servicesIds,
        public Collection $services
    ) {}
}
