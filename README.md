# Filament Croppie Plugin

[![Latest Version on Packagist](https://img.shields.io/packagist/v/nuhel/filament-croppie.svg?style=flat-square)](https://packagist.org/packages/nuhel/filament-croppie)
[![Total Downloads](https://img.shields.io/packagist/dt/nuhel/filament-croppie.svg?style=flat-square)](https://packagist.org/packages/nuhel/filament-croppie)


## Installation

You can install the package via composer and don't forget to install croppie itself, if you have not done so already:

```bash
composer require josefbehr/filament-spatie-media-library-croppie
npm install croppie
```

To use outside filament (e.g. with just the forms package), add the js and css to your vite (or mix) config:
```html
@vite([
    'vendor/josefbehr/filament-spatie-media-library-croppie/resources/dist/js/filament-spatie-media-library-croppie.js',
    'vendor/josefbehr/filament-spatie-media-library-croppie/resources/dist/css/filament-spatie-media-library-croppie.css',
    ...
])
```

This field extends and therefore has all the functionality of the [Filament Spatie Media Library Plugin](https://filamentphp.com/docs/2.x/spatie-laravel-media-library-plugin/installation) field.

```php
SpatieMediaLibraryCroppie::make('image')
    ->boundaryWidth('800')
    ->boundaryHeight('800'),
```
Use `boundaryWidth` and `boundaryHeight` to set width and height of the image area in the modal. The values above are the defaults.

```php
SpatieMediaLibraryCroppie::make('image')
    ->viewportWidth('400')
    ->viewportHeight('400'),
```
Use `viewportWidth` and `viewportHeight` to set width and height of the cropper itself. Values above are the defaults.

```
SpatieMediaLibraryCroppie::make('image')
    ->showZoomer(),
```

`showZoomer` can be called to show the zoom bar below the image in the modal.

```php
SpatieMediaLibraryCroppie::make('avatar')
    ->avatar(),
```
We can make croppie circular using `avater` method.
```php
Croppie::make('background')
    ->modalSize('6xl')
    ->modalHeading("Crop Background Image")
```

Modal size can be customized using `modalSize` method.
For setting the heading use `modalHeading`.

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.

## Acknowldgements

This if a fork of [nuhel/FilamentCroppie](https://github.com/nuhel/FilamentCroppie) extended and adapted to use spatie/media-library and install croppie via npm.

## Changelog
2023-03-16
* fork `nuhel/filament-croppie` and rename everything, extend spatie plugin form filed
* remove croppie css and js and re-import them from `node_modules`
* add viewportWidth/Height and boundaryWidth/Height methods
