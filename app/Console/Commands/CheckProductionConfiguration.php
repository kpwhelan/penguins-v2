<?php

namespace App\Console\Commands;

use App\Support\ProductionConfiguration;
use Illuminate\Console\Command;

class CheckProductionConfiguration extends Command
{
    protected $signature = 'production:check';

    protected $description = 'Check that required production services and settings are configured';

    public function handle(ProductionConfiguration $configuration): int
    {
        $issues = $configuration->issues();

        if ($issues === []) {
            $this->info('Production configuration looks ready.');

            return self::SUCCESS;
        }

        $this->error('Production configuration has unresolved issues:');

        foreach ($issues as $issue) {
            $this->line(" - {$issue}");
        }

        return self::FAILURE;
    }
}
