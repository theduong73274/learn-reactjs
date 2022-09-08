import React from 'react';
import AlbumList from './components/AlbumList';

AlbumFeature.propTypes = {};

function AlbumFeature(props) {
	const albumList = [
		{
			id: 1,
			name: 'Sai cách yêu',
			thumbnailUrl:
				'https://photo-resize-zmp3.zadn.vn/w240_r16x9_jpeg/thumb_video/4/d/b/f/4dbf769079e956c3d104130af83ae2c5.jpg',
		},
		{
			id: 2,
			name: 'Chỉ muốn bên em lúc này',
			thumbnailUrl:
				'https://photo-resize-zmp3.zadn.vn/w240_r16x9_jpeg/thumb_video/0/e/1/6/0e16e5af7a5209005fac0e145be09f88.jpg',
		},
		{
			id: 3,
			name: 'Cô Liêu',
			thumbnailUrl:
				'https://photo-resize-zmp3.zadn.vn/w240_r1x1_jpeg/cover/0/e/b/d/0ebd1cf67ec51b3c5cbd02c038179c75.jpg',
		},
	];

	return (
		<div>
			<h2>Có thể bạn sẽ thích</h2>
			<AlbumList albumList={albumList} />
		</div>
	);
}

export default AlbumFeature;
