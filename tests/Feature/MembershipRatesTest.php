<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Tests\TestCase;

class MembershipRatesTest extends TestCase
{
    protected function setUp(): void
    {
        parent::setUp();

        config()->set('database.default', 'sqlite');
        config()->set('database.connections.sqlite.database', ':memory:');
        DB::purge('sqlite');
        DB::connection('sqlite')->getPdo();

        Schema::create('membership_rates', function (Blueprint $table): void {
            $table->id();
            $table->decimal('quarterly', 8, 2);
            $table->decimal('monthly', 8, 2);
            $table->decimal('drop_in', 8, 2);
            $table->timestamps();
        });
    }

    public function test_admin_can_update_membership_rates(): void
    {
        $admin = new User;
        $admin->forceFill(['id' => 1, 'is_admin' => true]);

        $this->actingAs($admin)
            ->putJson(route('membership.rates.update'), [
                'quarterly' => 140,
                'monthly' => 55,
                'drop_in' => 12,
            ])
            ->assertOk()
            ->assertJsonPath('rates.quarterly', '140.00')
            ->assertJsonPath('rates.monthly', '55.00')
            ->assertJsonPath('rates.drop_in', '12.00');

        $this->assertDatabaseHas('membership_rates', [
            'quarterly' => 140,
            'monthly' => 55,
            'drop_in' => 12,
        ]);
    }

    public function test_regular_member_cannot_update_membership_rates(): void
    {
        $member = new User;
        $member->forceFill(['id' => 2, 'is_admin' => false]);

        $this->actingAs($member)
            ->putJson(route('membership.rates.update'), [
                'quarterly' => 1,
                'monthly' => 1,
                'drop_in' => 1,
            ])
            ->assertForbidden();
    }
}
