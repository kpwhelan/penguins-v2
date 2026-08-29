@props(['url'])
<tr>
<td class="header">
<a href="{{ $url }}" style="display: inline-block; width: fit-content;">
@if (trim($slot) === 'Laravel')
<img src="{{ asset('assets/gsp-logo-navbar-480w@2x.png') }}" alt="Granite State Penguins">
@else
{{ $slot }}
@endif
</a>
</td>
</tr>
