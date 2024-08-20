@props(['url'])
<tr>
<td class="header">
<a href="{{ $url }}" style="display: inline-block; width: fit-content;">
@if (trim($slot) === 'Laravel')
<img src="https://penguins.nyc3.cdn.digitaloceanspaces.com/assets/GSP-header-no-background.png" alt="GSP Logo">
@else
{{ $slot }}
@endif
</a>
</td>
</tr>
