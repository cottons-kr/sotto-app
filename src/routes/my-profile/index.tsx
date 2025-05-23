import { Column } from '@/components/layout/column';
import { Container } from '@/components/layout/container';
import { Row } from '@/components/layout/row';
import { MyProfileChangeName } from '@/components/pages/my-profile/change-name';
import { MyProfileResetConfirm } from '@/components/pages/my-profile/reset-confirm';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button/group';
import { TopNavigator } from '@/components/ui/top-navigator';
import { GoBack } from '@/components/ui/top-navigator/go-back';
import { Typo } from '@/components/ui/typography';
import { useDrawer } from '@/hooks/use-drawer';
import { diaryManager } from '@/lib/managers/diary';
import { friendManager } from '@/lib/managers/friend';
import { color } from '@/styles/color.css';
import { Pencil } from 'lucide-react';
import { useCallback } from 'react';
import { avatar, avatarContainer, edit, stat } from './page.css';

export default function MyProfilePage() {
	const { toggleDrawer: toggleChangeName } = useDrawer('change-name');
	const { toggleDrawer: toggleResetConfirm } = useDrawer('reset-confirm');

	const onClickLock = useCallback(() => {
		location.reload();
	}, []);

	return (
		<>
			<Column>
				<TopNavigator trailingArea={<GoBack />} />
				<Container className={avatarContainer}>
					<label className={avatar}>
						<Avatar size={72} src={localStorage.getItem('profileImage')} />
						<div className={edit}>
							<Pencil size={12} color={color.milk} />
						</div>
						<input type='file' accept='image/*' hidden />
					</label>
				</Container>
				<Column align='center' gap={8}>
					<Typo.Lead weight='strong'>{localStorage.getItem('name')}</Typo.Lead>
					<Typo.Body>@{localStorage.getItem('username')}</Typo.Body>
				</Column>
				<Container vertical='large' horizontal='large'>
					<Button variant='secondary' fill onClick={toggleChangeName}>
						Change name
					</Button>
				</Container>
				<Container vertical='none'>
					<Row>
						<Stat name='Diary' value={diaryManager.getDiaries().length} />
						<Stat name='Friend' value={friendManager.getFriends().length} />
					</Row>
				</Container>
				<ButtonGroup direction='vertical' float>
					<Button variant='text' fill onClick={toggleResetConfirm}>
						Reset
					</Button>
					<Button fill onClick={onClickLock}>
						Lock the app
					</Button>
				</ButtonGroup>
			</Column>
			<MyProfileChangeName />
			<MyProfileResetConfirm />
		</>
	);
}

interface StatProps {
	name: string;
	value: string | number;
}

function Stat(props: StatProps) {
	const { name, value } = props;

	return (
		<Column className={stat} align='center' gap={8}>
			<Typo.Body>{name}</Typo.Body>
			<Typo.Title weight='strong'>{value.toString()}</Typo.Title>
		</Column>
	);
}
