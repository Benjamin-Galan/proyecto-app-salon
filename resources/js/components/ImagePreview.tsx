export default function imagePreview({ imagePreview, imgPath }: { imagePreview: string | null, imgPath: string | null }) {
    if (!imagePreview && !imgPath) {
        return (
            <div className="rounded-lg border-2 border-dashed bg-gray-50 p-3 flex items-center justify-center h-48 md:h-56">
                <p className="text-sm text-gray-500 text-center">Vista previa de la imagen</p>
            </div>
        )
    }

    if (!imagePreview && imgPath) {
        return (
            <div className="rounded-lg border bg-gray-50 p-3 flex items-center justify-center h-48 md:h-56 overflow-hidden">
                <img
                    src={imgPath || "/placeholder.svg"}
                    alt="Preview"
                    className="w-full h-full object-cover rounded-md"
                />
            </div>
        )
    }

    if (imagePreview) {
        return (
            <div className="rounded-lg border bg-gray-50 p-3 flex items-center justify-center h-48 md:h-56 overflow-hidden">
                <img
                    src={imagePreview || "/placeholder.svg"}
                    alt="Preview"
                    className="w-full h-full object-cover rounded-md"
                />
            </div>
        )
    }
}