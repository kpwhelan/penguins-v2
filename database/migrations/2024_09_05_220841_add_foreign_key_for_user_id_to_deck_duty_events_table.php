<?php

use App\Models\DeckDutyEvent;
use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('deck_duty_events', function (Blueprint $table) {
            $table->bigInteger('user_id')->unsigned()->change();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });

        // Schema::table('deck_duty_events', function (Blueprint $table) {
            // $table->bigInteger('user_id')->unsigned()->change();

        //     $table->foreignIdFor(User::class, 'user_id')->constrained()->cascadeOnDelete();
        // });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('deck_duty_events', function (Blueprint $table) {
            $table->dropForeignIdFor(User::class, 'user_id');
        });
    }
};
