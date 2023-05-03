import Croppie from 'croppie/croppie.min'

document.addEventListener('alpine:init', () => {
    Alpine.data('imageCropper', (config) => ({
        showCroppie: false,
        hasImage: config.imageUrl.length > 0,
        filename: '',
        filetype: '',
        originalSrc: config.imageUrl,
        viewportWidth: config.viewportWidth,
        viewportHeight: config.viewportHeight,
        boundaryWidth: config.boundaryWidth,
        boundaryHeight: config.boundaryHeight,
        shape: config.shape,
        statePath: config.statePath,
        showZoomer: config.showZoomer,
        format: config.format,
        quality: config.quality,

        croppie: {},
        init() {
            this.$nextTick(
                () => {
                    this.initCroppie()
                }
            )
            this.$watch('files', (value) => {
                this.showCroppie = false
                this.updatePreview()
            })
        },
        async updatePreview()  {
            let reader, files = this.files
            if( files == null || files[0] === undefined ) {
                return;
            }
            this.filename = files[0].name;
            this.filetype = files[0].type

            reader = new FileReader()
            reader.onload = (e) => {
                this.originalSrc = e.target.result
                this.bindCroppie(e.target.result)
            }
            await reader.readAsDataURL(files[0])
        },
        initCroppie() {

            this.croppie = new Croppie(
                this.$refs.croppie, {
                    viewport: {width: this.viewportWidth, height: this.viewportHeight, type: this.shape}, //circle or square
                    boundary: {width: this.boundaryWidth, height: this.boundaryHeight}, //default boundary container
                    showZoomer: this.showZoomer,
                    enableResize: false,
                    mouseWheelZoom: 'ctrl',
                    enforceBoundary: true,
                    enableOrientation: true,
                    enableExif: true,
                    format: this.format,
                    quality: this.quality
                })
        },

        rotateLeft(){
            this.croppie.rotate(90);
        },

        rotateRight(){
            this.croppie.rotate(-90);
        },

        saveCroppie() {
            this.croppie.result({
                type: "blob",
                size: "original",
                format: this.filetype,
                quality: 1
            }).then((croppedImage) => {
                this.showCroppie = false
                this.hasImage = true
                let input = document.getElementById(this.statePath).getElementsByTagName('input')[0]
                let event = new Event('change');
                let fileName = this.filename;
                let filetype = this.filetype;
                let file = new File(
                    [croppedImage],
                    fileName,
                    {type:filetype, lastModified:new Date().getTime()},
                    'utf-8'
                );
                let container = new DataTransfer();
                container.items.add(file);

                input.files = container.files;
                this.$dispatch("close-modal", {id: "croppie-modal-"+this.statePath, files: null})
                input.dispatchEvent(event);
            })
        },
        bindCroppie(src) {
            //avoid problems with croppie container not being visible when binding
            setTimeout(() => {
                this.croppie.bind({url: src, orientation: 1})
                setTimeout(() => {
                    this.showCroppie = true
                }, 200)
            }, 200)
        }
    }))
})
