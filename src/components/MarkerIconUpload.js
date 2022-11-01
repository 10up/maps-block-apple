import { __ } from '@wordpress/i18n';
import { Button } from '@wordpress/components';
import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';

export default function MarkerIconUpload(props) {
	const { marker, update } = props;
	const ALLOWED_MEDIA_TYPES = ['image'];
	const onUpdateImage = (media) => {
		update({
			...marker,
			glyphImageId: media.id,
			glyphImage: media.url,
		});
	};
	const onRemoveImage = () => {
		update({
			...marker,
			glyphImageId: undefined,
			glyphImage: undefined,
		});
	};

	return (
		<div className="maps-block-apple-marker-uploader">
			<MediaUploadCheck>
				<label htmlFor="marker-icon-control">
					{__('Marker Icon', 'maps-block-apple')}
				</label>
				<MediaUpload
					allowedTypes={ALLOWED_MEDIA_TYPES}
					render={({ open }) => (
						<Button
							className={
								!marker.glyphImageId
									? 'editor-post-featured-image__toggle'
									: 'editor-post-featured-image__preview'
							}
							onClick={open}
						>
							{!marker.glyphImageId &&
								__('Choose an icon', 'maps-block-apple')}
							{marker.glyphImageId && marker.glyphImage && (
								<img
									src={marker.glyphImage}
									alt={__('Marker icon', 'maps-block-apple')}
								/>
							)}
						</Button>
					)}
					onSelect={onUpdateImage}
					value={marker.glyphImageId}
				/>
			</MediaUploadCheck>
			{!!marker.glyphImageId && (
				<MediaUploadCheck>
					{marker.glyphImage && (
						<MediaUpload
							onSelect={onUpdateImage}
							allowedTypes={ALLOWED_MEDIA_TYPES}
							render={({ open }) => (
								<Button
									onClick={open}
									variant="secondary"
									className="replace-marker-icon"
								>
									{__('Replace icon', 'maps-block-apple')}
								</Button>
							)}
						/>
					)}
					<Button
						className="remove-marker-icon"
						onClick={onRemoveImage}
						variant="link"
						isDestructive
					>
						{__('Remove icon', 'maps-block-apple')}
					</Button>
				</MediaUploadCheck>
			)}
		</div>
	);
}
