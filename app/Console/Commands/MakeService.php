<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;

class MakeService extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'make:service {name}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a new service class';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $name = $this->argument('name');

        $servicesPath = app_path('Services');
        $filePath = "{$servicesPath}/{$name}.php";

        // Crear carpeta Services si no existe
        if (!File::exists($servicesPath)) {
            File::makeDirectory($servicesPath, 0755, true);
        }

        // Evitar sobrescribir
        if (File::exists($filePath)) {
            $this->error('El Service ya existe.');
            return Command::FAILURE;
        }

        File::put($filePath, $this->getStub($name));

        $this->info("Service {$name} creado correctamente.");

        return Command::SUCCESS;
    }

    protected function getStub(string $name): string
    {
        return <<<PHP
<?php

namespace App\Services;

class {$name}
{
    //
}

PHP;
    }
}
