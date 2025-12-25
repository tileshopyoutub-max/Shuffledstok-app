import { useTypedSelector, useTypedDispatch } from "../../shared/hooks/redux";
import { setSettingsWatermark } from "../../store/slices/watermarkSlice";
import { toggleLoopWatermark } from "../../store/slices/watermarkSlice";

interface AddWatermarkProps {
    selectedFile?: File | null;
    watermarkFile?: Blob | null;
    selectedFilesArr?: File[];
    watermarkFilesArr?: Blob[];
}
export default function AddWatermark({ selectedFile, watermarkFile, selectedFilesArr, watermarkFilesArr }: AddWatermarkProps) {

    const settings = useTypedSelector(state => state.watermark);
    const dispatch = useTypedDispatch();

    const positions = [
        { value: "tl", justify: "justify-start", align: "items-start", label: "Top Left" },
        { value: "tc", justify: "justify-center", align: "items-start", label: "Top Center" },
        { value: "tr", justify: "justify-end", align: "items-start", label: "Top Right" },
        { value: "ml", justify: "justify-start", align: "items-center", label: "Middle Left" },
        { value: "mc", justify: "justify-center", align: "items-center", label: "Middle Center" },
        { value: "mr", justify: "justify-end", align: "items-center", label: "Middle Right" },
        { value: "bl", justify: "justify-start", align: "items-end", label: "Bottom Left" },
        { value: "bc", justify: "justify-center", align: "items-end", label: "Bottom Center" },
        { value: "br", justify: "justify-end", align: "items-end", label: "Bottom Right" },
    ];

    return (
        <>
            <div className="relative inline-flex items-start rounded-lg border border-border bg-background p-4">
                <div className="flex h-6 items-center">
                    <input aria-describedby="watermark-standard-description" className="h-4 w-4 rounded border-border bg-surface text-primary-DEFAULT focus:ring-primary-DEFAULT focus:ring-offset-background"
                        id="watermark-standard"
                        name="watermark"
                        type="checkbox"
                        checked={settings.enabled}
                        disabled={!selectedFile && (!selectedFilesArr || selectedFilesArr.length === 0)}
                        onChange={(e) => dispatch(setSettingsWatermark({ enabled: e.target.checked }))} />
                </div>
                <div className="ml-3 text-sm leading-6">
                    <label className="font-medium text-text-primary" htmlFor="watermark-standard">Standard Watermark</label>
                    <p className="text-text-secondary" id="watermark-standard-description">Apply default logo to image.</p>
                </div>
            </div>
            {settings.enabled && (
                <div className="lg:col-span-1">
                    <div className="sticky top-6 rounded-xl border border-border bg-surface-accent/20 p-6">
                        <div className="flex items-center gap-2 mb-6 border-b border-border pb-4">
                            <span
                                className="material-symbols-outlined text-primary-DEFAULT">branding_watermark</span>
                            <h3 className="text-lg font-semibold text-text-primary">Watermark Settings</h3>
                        </div>
                        <div className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-text-secondary mb-2"
                                    htmlFor="watermark-text">Watermark Text</label>
                                <input
                                    className="block w-full rounded-md border-0 py-2 bg-background text-text-primary shadow-sm ring-1 ring-inset ring-border placeholder:text-text-placeholder focus:ring-2 focus:ring-inset focus:ring-primary-DEFAULT sm:text-sm sm:leading-6"
                                    id="watermark-text" placeholder="e.g. © ShuffledStock" type="text" onChange={(e) => dispatch(setSettingsWatermark({ text: e.target.value }))} value={settings.text} />
                            </div>
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <label className="block text-sm font-medium text-text-secondary"
                                        htmlFor="opacity">Opacity</label>
                                    <span className="text-xs font-mono text-text-placeholder">{settings.opacity}%</span>
                                </div>
                                <input
                                    className="w-full h-2 bg-background rounded-lg appearance-none cursor-pointer accent-[#3B82F6]"
                                    id="opacity" max="100" min="0" type="range" onChange={(e) => dispatch(setSettingsWatermark({ opacity: Number(e.target.value) }))} value={settings.opacity} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-text-secondary mb-2"
                                    htmlFor="font-size">Font Size</label>
                                <div className="relative">
                                    <input
                                        className="block w-full rounded-md border-0 py-2 bg-background text-text-primary shadow-sm ring-1 ring-inset ring-border placeholder:text-text-placeholder focus:ring-2 focus:ring-inset focus:ring-primary-DEFAULT sm:text-sm sm:leading-6"
                                        id="font-size" placeholder="24" type="number" onChange={(e) => dispatch(setSettingsWatermark({ fontSize: e.target.value === "" ? "" : Number(e.target.value) }))} value={settings.fontSize} />
                                    <span
                                        className="absolute right-3 top-2 text-text-placeholder text-sm pointer-events-none">px</span>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-text-secondary mb-3">Watermark
                                    Position</label>

                                <div className="flex items-center justify-between p-4 border border-border rounded-lg bg-background w-full max-w-sm mb-4">
                                    <label className="text-sm font-medium text-text-secondary">
                                        Loop the watermark
                                    </label>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={settings.loopWatermark}
                                            onChange={() => dispatch(toggleLoopWatermark())}
                                            className="w-5 h-5 accent-primary-DEFAULT"
                                        />
                                    </label>
                                </div>
                                {settings.loopWatermark && (
                                    <>
                                        <div className="flex justify-between items-center mb-2">
                                            <label className="block text-sm font-medium text-text-secondary"
                                                htmlFor="padding-x">Padding X</label>
                                            <span className="text-xs font-mono text-text-placeholder">{settings.paddingX}</span>
                                        </div>
                                        <input
                                            className="w-full h-2 bg-background rounded-lg appearance-none cursor-pointer accent-[#3B82F6]"
                                            id="padding-x" max="300" min="0" type="range" onChange={(e) => dispatch(setSettingsWatermark({ paddingX: Number(e.target.value) }))} value={settings.paddingX} />

                                        <div className="flex justify-between items-center mb-2">
                                            <label className="block text-sm font-medium text-text-secondary"
                                                htmlFor="padding-y">Padding Y</label>
                                            <span className="text-xs font-mono text-text-placeholder">{settings.paddingY}</span>
                                        </div>
                                        <input
                                            className="w-full h-2 bg-background rounded-lg appearance-none cursor-pointer accent-[#3B82F6]"
                                            id="padding-y" max="300" min="0" type="range" onChange={(e) => dispatch(setSettingsWatermark({ paddingY: Number(e.target.value) }))} value={settings.paddingY} />
                                    </>
                                )}

                                <div className="grid grid-cols-3 gap-2 w-max mx-auto">
                                    {!settings.loopWatermark && positions.map(pos => {
                                        const isSelected = settings.position === pos.value;
                                        return (
                                            <label key={pos.value} className="cursor-pointer group">
                                                <input className="peer sr-only" name="wm-position" type="radio" value={pos.value}
                                                    checked={isSelected}
                                                    onChange={() => dispatch(setSettingsWatermark({ position: pos.value }))} />
                                                <div className={`w-10 h-10 rounded border ${isSelected ? 'bg-primary-DEFAULT border-primary-DEFAULT' : 'bg-background border-border'} hover:border-text-secondary transition-all flex ${pos.align} ${pos.justify} p-1.5`}>
                                                    <div className={`w-2 h-2 rounded-full ${isSelected ? 'bg-white' : 'bg-text-secondary'}`}></div>
                                                </div>
                                            </label>
                                        )
                                    })}
                                </div>

                                {watermarkFile && (
                                    <div className="flex justify-center items-center mt-4">
                                        <img src={URL.createObjectURL(watermarkFile)} className="max-w-full max-h-[500px] object-contain rounded-lg shadow-md" />
                                    </div>
                                )}

                                {watermarkFilesArr && selectedFilesArr && selectedFilesArr.length > 0 && (
                                    <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                        {watermarkFilesArr.map((file, index) => (
                                            <div key={index} className="w-full aspect-square">
                                                <img src={URL.createObjectURL(file)} className="w-full h-full object-cover rounded-lg shadow-md" />
                                            </div>
                                        ))}
                                    </div>
                                )}

                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}