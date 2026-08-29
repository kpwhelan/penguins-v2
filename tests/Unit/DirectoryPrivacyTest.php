<?php

namespace Tests\Unit;

use App\Models\User;
use PHPUnit\Framework\TestCase;

class DirectoryPrivacyTest extends TestCase
{
    public function test_only_approved_contact_fields_are_shared_in_the_member_directory(): void
    {
        $this->assertSame([
            'id',
            'first_name',
            'last_name',
            'email',
            'phone_number',
            'street_address',
            'city',
            'state',
            'zipcode',
        ], User::DIRECTORY_FIELDS);

        $this->assertEmpty(array_intersect(User::DIRECTORY_FIELDS, [
            'password',
            'remember_token',
            'is_admin',
            'masters_number',
            'sex',
            'dob',
            'emergency_contact',
            'emergency_contact_phone',
        ]));
    }
}
