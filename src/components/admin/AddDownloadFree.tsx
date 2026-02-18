interface AddDownloadFreeProps {
  selectedFile: File | null;
  checked: boolean;
  onChange: (value: boolean) => void;
}

export default function AddDownloadFree({
  checked,
  onChange,
}: AddDownloadFreeProps) {
  return (
    <>
      <div className="relative inline-flex items-start rounded-lg border border-border bg-background p-4">
        <div className="flex h-6 items-center">
          <input
            aria-describedby="watermark-standard-description"
            className="h-4 w-4 rounded border-border bg-surface text-primary-DEFAULT focus:ring-primary-DEFAULT focus:ring-offset-background"
            id="download-free"
            name="watermark"
            type="checkbox"
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
          />
        </div>
        <div className="ml-3 text-sm leading-6">
          <label
            className="font-medium text-text-primary"
            htmlFor="download-free"
          >
            Download Free
          </label>
          <p className="text-text-secondary" id="download-free-description">
            Apply download free to image.
          </p>
        </div>
      </div>
    </>
  );
}
