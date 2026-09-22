<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateMembershipRatesRequest;
use App\Models\MembershipRate;
use Illuminate\Http\JsonResponse;

class MembershipRateController extends Controller
{
    public function update(UpdateMembershipRatesRequest $request): JsonResponse
    {
        $rates = MembershipRate::query()->firstOrNew();
        $rates->fill($request->validated())->save();

        return response()->json([
            'message' => 'Membership rates updated successfully.',
            'rates' => $rates->forDisplay(),
        ]);
    }
}
