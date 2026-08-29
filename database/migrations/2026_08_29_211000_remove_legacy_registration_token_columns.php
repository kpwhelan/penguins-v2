<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('registration_tokens', function (Blueprint $table): void {
            $table->dropColumn(['registration_token', 'has_been_resent']);
        });
    }

    public function down(): void
    {
        Schema::table('registration_tokens', function (Blueprint $table): void {
            $table->text('registration_token')->nullable()->after('email');
            $table->boolean('has_been_resent')->default(false)->after('successfully_registered');
        });
    }
};
