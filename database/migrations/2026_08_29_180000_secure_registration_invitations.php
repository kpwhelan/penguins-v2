<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('registration_tokens', function (Blueprint $table) {
            $table->char('token_hash', 64)->nullable()->unique()->after('registration_token');
            $table->timestamp('expires_at')->nullable()->after('token_hash');
            $table->timestamp('completed_at')->nullable()->after('expires_at');
            $table->foreignId('invited_by')->nullable()->after('email')->constrained('users')->nullOnDelete();
        });

        DB::table('registration_tokens')
            ->where('successfully_registered', false)
            ->update(['is_expired' => true]);
    }

    public function down(): void
    {
        Schema::table('registration_tokens', function (Blueprint $table) {
            $table->dropForeign(['invited_by']);
            $table->dropUnique(['token_hash']);
            $table->dropColumn(['token_hash', 'expires_at', 'completed_at', 'invited_by']);
        });
    }
};
