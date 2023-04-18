import * as React from 'react';
import Slider, { Settings } from 'react-slick';
import { Box, Link, Typography } from '@mui/material';

import styled from '@emotion/styled';
import { css } from '@emotion/react';

import announcementIcon from '@assets/images/announcement_icon.svg';
import thumbnail from '@assets/images/thumbnail.png';
import youtubeIcon from '@assets/images/youtube_icon.svg';

const AnnouncementImage = styled.img(
	css({
		width: 60,
		marginRight: 5,
	})
);

const ThumbnailImage = styled.img(
	css({
		width: '100%',
	})
);

const YoutubelImage = styled.img(
	css({
		width: '20%',
		margin: 'auto',
	})
);

const NextArrow: React.FC<{
	className?: string;
	style?: React.CSSProperties;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
}> = (props) => {
	const { className, style, onClick } = props;
	return (
		<Box
			component="button"
			className={className}
			onClick={onClick}
			style={style}
			sx={{
				right: '0',
				'&::before': {
					color: 'var(--main)',
					// fontSize: '2rem',
				},
			}}
		/>
	);
};

const PrevtArrow: React.FC<{
	className?: string;
	style?: React.CSSProperties;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
}> = (props) => {
	const { className, style, onClick } = props;
	return (
		<Box
			component="button"
			className={className}
			onClick={onClick}
			style={style}
			sx={{
				left: '0',
				zIndex: 1,
				'&::before': {
					color: 'var(--main)',
					// fontSize: '2rem',
				},
			}}
		/>
	);
};

export const Announcement = () => {
	const settings: Settings = {
		autoplay: true,
		dots: false,
		infinite: true,
		speed: 500,
		slidesToShow: 3,
		slidesToScroll: 1,
		responsive: [
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 2,
				},
			},
			{
				breakpoint: 592,
				settings: {
					slidesToShow: 1,
				},
			},
		],
		prevArrow: <PrevtArrow />,
		nextArrow: <NextArrow />,
	};

	return (
		<Box sx={{ my: 2 }}>
			<Box display="flex" alignItems="center">
				<AnnouncementImage src={announcementIcon} />
				<Typography
					sx={{
						fontWeight: 500,
						fontSize: '1.4rem',
						lineHeight: '1.6rem',
						color: 'var(--main)',
					}}
				>
					Announcement
				</Typography>
			</Box>
			<Slider {...settings}>
				{[
					{
						link: 'https://google.com',
						desc: 'The EMP team hosts AMA’s on YouTube at 10:45pm UTC 🎤Check out our latest AMA featuring our main host AJ',
					},
					{
						link: 'https://google.com',
						desc: 'The EMP team hosts AMA’s on YouTube at 10:45pm UTC 🎤Check out our latest AMA featuring our main host AJ',
					},
					{
						link: 'https://google.com',
						desc: 'The EMP team hosts AMA’s on YouTube at 10:45pm UTC 🎤Check out our latest AMA featuring our main host AJ',
					},
					{
						link: 'https://google.com',
						desc: 'The EMP team hosts AMA’s on YouTube at 10:45pm UTC 🎤Check out our latest AMA featuring our main host AJ',
					},
				].map((item, index) => (
					<Link href={item.link} key={index} target="_blank">
						<Box
							sx={{
								position: 'relative',
								'&:hover .desc': {
									maxHeight: 100,
								},
								cursor: 'pointer',
							}}
						>
							<Box sx={{ p: 1 }}>
								<ThumbnailImage src={thumbnail} />
							</Box>
							<Box
								sx={{
									position: 'absolute',
									top: '50%',
									left: 0,
									width: '100%',
									transform: 'translateY(-50%)',
								}}
							>
								<YoutubelImage src={youtubeIcon} />
								<Typography
									sx={{
										paddingInline: 3,
										color: '#fff',
										lineHeight: 1,
										fontSize: '0.9rem',
										overflow: 'hidden',
										transition: 'max-height .3s ease',
										textAlign: 'center',
										maxHeight: 0,
									}}
									className="desc"
								>
									<br />
									The EMP team hosts AMA’s on YouTube at 10:45pm UTC 🎤Check out
									our latest AMA featuring our main host AJ
								</Typography>
							</Box>
						</Box>
					</Link>
				))}
			</Slider>
		</Box>
	);
};
