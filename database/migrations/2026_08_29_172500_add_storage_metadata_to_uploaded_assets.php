<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('news_items', function (Blueprint $table) {
            $table->string('image_disk')->nullable()->after('image_path');
            $table->string('image_original_name')->nullable()->after('image_cdn');
            $table->string('image_mime_type')->nullable()->after('image_original_name');
            $table->unsignedBigInteger('image_size')->nullable()->after('image_mime_type');
        });

        Schema::table('swimmer_bios', function (Blueprint $table) {
            $table->string('image_disk')->nullable()->after('body');
            $table->string('image_path')->nullable()->after('image_disk');
            $table->string('image_original_name')->nullable()->after('image_cdn');
            $table->string('image_mime_type')->nullable()->after('image_original_name');
            $table->unsignedBigInteger('image_size')->nullable()->after('image_mime_type');
            $table->string('image_cdn')->nullable()->change();
        });

        Schema::table('workouts', function (Blueprint $table) {
            $table->string('file_disk')->nullable()->after('file_path');
            $table->string('file_mime_type')->nullable()->after('file_cdn');
            $table->unsignedBigInteger('file_size')->nullable()->after('file_mime_type');
            $table->string('file_cdn')->nullable()->change();
        });
    }

    public function down(): void
    {
        Schema::table('news_items', function (Blueprint $table) {
            $table->dropColumn(['image_disk', 'image_original_name', 'image_mime_type', 'image_size']);
        });

        Schema::table('swimmer_bios', function (Blueprint $table) {
            $table->dropColumn(['image_disk', 'image_path', 'image_original_name', 'image_mime_type', 'image_size']);
            $table->string('image_cdn')->nullable(false)->change();
        });

        Schema::table('workouts', function (Blueprint $table) {
            $table->dropColumn(['file_disk', 'file_mime_type', 'file_size']);
            $table->string('file_cdn')->nullable(false)->change();
        });
    }
};
