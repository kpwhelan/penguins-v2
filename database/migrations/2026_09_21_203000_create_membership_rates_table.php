<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('membership_rates', function (Blueprint $table): void {
            $table->id();
            $table->decimal('quarterly', 8, 2);
            $table->decimal('monthly', 8, 2);
            $table->decimal('drop_in', 8, 2);
            $table->timestamps();
        });

        DB::table('membership_rates')->insert([
            'quarterly' => 135,
            'monthly' => 50,
            'drop_in' => 10,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }

    public function down(): void
    {
        Schema::dropIfExists('membership_rates');
    }
};
