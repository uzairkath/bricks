import * as React from 'react';
import {
	Box,
	Button,
	Divider,
	IconButton,
	InputBase,
	Link,
	Paper,
	Typography,
} from '@mui/material';
import {
	ContentCopy as ContentCopyIcon,
	Facebook as FacebookIcon,
	LinkedIn as LinkedInIcon,
	Send as SendIcon,
	Twitter as TwitterIcon,
} from '@mui/icons-material';

import { Swal } from 'utils';

export const ShareRefferal: React.FC = () => {
	const handleSendEmail = React.useCallback<
		React.FormEventHandler<HTMLFormElement>
	>((e) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const email = formData.get('email') as string;
		const isValidEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email);
		if (isValidEmail) {
			const subject = 'MyBricks 2.0 Referral Link';
			const body = '';
			const tempLink = document.createElement('a');
			tempLink.href = `mailto:${email}?subject=${subject}&body=${body}`;
			tempLink.target = '_blank';
			tempLink.click();
		} else {
			Swal.fire({
				icon: 'error',
				title: 'Email Error',
				text: 'Please type a valid email.',
			});
		}
	}, []);
	return (
		<Box>
			<Typography
				sx={{
					fontWeight: 700,
					fontSize: '1.8rem',
					lineHeight: '2.5rem',
					color: 'var(--main)',
				}}
			>
				Referrals
			</Typography>
			<Typography
				sx={{
					fontSize: '1.2rem',
					lineHeight: '1.4rem',
					color: 'var(--main)',
					mb: 5,
				}}
			>
				Invite your friends to MyBricks 2.0 and earn $50 per NFT they purchase.{' '}
				<Link href="#">Click here</Link>&nbsp;to know more!
			</Typography>
			<Typography
				sx={{
					fontSize: '1.2rem',
					lineHeight: '1.4rem',
					color: 'var(--main)',
					mb: 1,
				}}
			>
				Spread the word and send your friends invitations to join MyBricks 2.0
			</Typography>
			<Paper
				component="form"
				sx={{
					display: 'flex',
					alignItems: 'center',
					width: '100%',
					mb: 5,
					overflow: 'hidden',
				}}
				onSubmit={handleSendEmail}
			>
				<InputBase
					sx={{ ml: 1, flex: 1, p: '2px 4px' }}
					placeholder="Email Address"
					inputProps={{ 'aria-label': 'email address' }}
					type="email"
					name="email"
				/>
				<Button
					type="submit"
					sx={{
						p: 1,
						borderRadius: 0,
						minWidth: 0,
					}}
					color="info"
					variant="contained"
				>
					<SendIcon />
				</Button>
			</Paper>
			<Typography
				sx={{
					fontWeight: 500,
					fontSize: '1.2rem',
					lineHeight: '1.4rem',
					color: 'var(--main)',
				}}
			>
				Share the referral link
			</Typography>
			<Typography
				sx={{
					fontSize: '1.2rem',
					lineHeight: '1.4rem',
					color: 'var(--main)',
					mb: 1,
				}}
			>
				You can also share your referral link by copying and sending it or
				sharing it on your social media.
			</Typography>
			<Box sx={{ display: 'flex', mb: 5 }}>
				<Paper
					sx={{
						flex: 1,
						display: 'flex',
						alignItems: 'stretch',
						overflow: 'hidden',
						width: '100%',
					}}
				>
					<Typography
						sx={{
							ml: 1,
							flex: 1,
							p: '2px 4px',
							display: 'flex',
							alignItems: 'center',
						}}
					>
						Referral Link
					</Typography>
					<Button
						type="submit"
						color="info"
						sx={{ p: 1, borderRadius: 0, minWidth: 0 }}
						variant="contained"
					>
						<ContentCopyIcon />
					</Button>
				</Paper>
				<IconButton sx={{ p: '10px', color: '#20519e' }}>
					<FacebookIcon />
				</IconButton>
				<IconButton sx={{ p: '10px', color: '#00abf1' }}>
					<TwitterIcon />
				</IconButton>
				<IconButton sx={{ p: '10px', color: '#006699' }}>
					<LinkedInIcon />
				</IconButton>
			</Box>
		</Box>
	);
};
