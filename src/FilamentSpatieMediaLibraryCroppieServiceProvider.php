<?php

namespace JosefBehr\FilamentSpatieMediaLibraryCroppie;

use Filament\PluginServiceProvider;
use Spatie\LaravelPackageTools\Package;

class FilamentSpatieMediaLibraryCroppieServiceProvider extends PluginServiceProvider
{
    public static string $name = 'filament-croppie';

    protected array $styles = [
        'filament-spatie-media-library-croppie-style' =>
            __DIR__ . '/../resources/dist/css/filament-spatie-media-library-croppie.css',
    ];

    protected array $beforeCoreScripts = [
        'filament-spatie-media-library-croppie-component-script' =>
            __DIR__ . '/../resources/dist/js/filament-spatie-media-library-croppie.js',
    ];

    public function configurePackage(Package $package): void
    {
        $package->name(static::$name)
            ->hasAssets()
            ->hasViews('filament-spatie-media-library-croppie')
            ->hasTranslations();
    }
}
