import packageJson from '@/../package.json';
import { Column } from '@/components/layout/column';
import { Container } from '@/components/layout/container';
import { Row } from '@/components/layout/row';
import { MyProfileChangeNameDrawer } from '@/components/pages/my-profile/change-name';
import { MyProfileExplorerItem } from '@/components/pages/my-profile/explorer-item';
import { MyProfileImage } from '@/components/pages/my-profile/image';
import { MyProfileResetConfirmDrawer } from '@/components/pages/my-profile/reset-confirm';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button/group';
import { PaddingDivider } from '@/components/ui/divider/padding';
import { TopNavigator } from '@/components/ui/top-navigator';
import { GoBack } from '@/components/ui/top-navigator/go-back';
import { Typo } from '@/components/ui/typography';
import { useDrawer } from '@/hooks/use-drawer';
import { diaryManager } from '@/lib/managers/diary';
import { friendManager } from '@/lib/managers/friend';
import { color } from '@/styles/color.css';
import { ChevronRight, MapPin } from 'lucide-react';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { avatarContainer, stat } from './page.css';

export default function MyProfilePage() {
	const { show: openChangeName } = useDrawer(MyProfileChangeNameDrawer);
	const { show: openResetConfirm } = useDrawer(MyProfileResetConfirmDrawer);
	const navigate = useNavigate();

	const onClickLock = useCallback(() => {
		location.reload();
	}, []);

	return (
		<>
			<Column>
				<TopNavigator trailingArea={<GoBack />} />
				<Container className={avatarContainer}>
					<MyProfileImage />
				</Container>
				<Column align='center' gap={8}>
					<Typo.Lead weight='strong'>{localStorage.getItem('name')}</Typo.Lead>
					<Typo.Body>@{localStorage.getItem('username')}</Typo.Body>
				</Column>
				<Container vertical='large' horizontal='large'>
					<Button fill onClick={openChangeName}>
						Change name
					</Button>
				</Container>
				<Container vertical='none'>
					<Row gap={8}>
						<Stat
							name='Diary'
							value={diaryManager.getAllDiaries().length}
							onClick={() => navigate('/explorer/diaries')}
						/>
						<Stat
							name='Friend'
							value={friendManager.getFriends().length}
							onClick={() => navigate('/explorer/friends')}
						/>
					</Row>
				</Container>
				<PaddingDivider />
				<MyProfileExplorerItem
					icon={<MapPin size={20} />}
					name='Location alias'
					path='/explorer/location-alias'
				/>
				<Container vertical='large'>
					<Typo.Caption color={color.sand}>
						Version {packageJson.version} {import.meta.env.MODE}
					</Typo.Caption>
				</Container>
				<ButtonGroup direction='vertical' float>
					<Button variant='text' fill onClick={openResetConfirm}>
						Reset
					</Button>
					<Button fill variant='secondary' onClick={onClickLock}>
						Lock the app
					</Button>
				</ButtonGroup>
			</Column>
		</>
	);
}

interface StatProps {
	name: string;
	value: string | number;
	onClick?: () => void;
}

function Stat(props: StatProps) {
	const { name, value, onClick } = props;

	return (
		<Container className={stat} onClick={onClick}>
			<Column gap={8}>
				<Row justify='space-between' align='center'>
					<Typo.Body weight='medium'>{name}</Typo.Body>
					<ChevronRight size={20} />
				</Row>
				<Typo.Title weight='strong'>{value.toString()}</Typo.Title>
			</Column>
		</Container>
	);
}
